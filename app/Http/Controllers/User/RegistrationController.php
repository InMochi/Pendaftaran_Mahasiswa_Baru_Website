<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Models\Biodata;
use App\Models\StudyProgram;
use App\Models\StudyProgramChoice;
use App\Models\Document;
use App\Models\RegistrationPeriod;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RegistrationController extends Controller
{
    /**
     * Show registration dashboard/status
     */
    public function index()
    {
        $user = Auth::user();
        $activePeriod = RegistrationPeriod::open()->first();
        
        // Get or create registration for active period
        $registration = $user->registrations()
            ->where('registration_period_id', $activePeriod?->id)
            ->with(['biodata', 'studyProgramChoices.studyProgram', 'documents'])
            ->first();

        return Inertia::render('User/Index', [
            'registration' => $registration,
            'activePeriod' => $activePeriod,
            'completionPercentage' => $registration?->getCompletionPercentage() ?? 0,
        ]);
    }

    /**
     * Start new registration
     */
    public function create()
    {
        $activePeriod = RegistrationPeriod::open()->first();

        if (!$activePeriod) {
            return redirect()->route('dashboard')
                ->with('error', 'Tidak ada periode pendaftaran yang dibuka.');
        }

        // Check if user already has registration for this period
        $existing = Auth::user()->registrations()
            ->where('registration_period_id', $activePeriod->id)
            ->first();

        if ($existing) {
            return redirect()->route('registration.biodata');
        }

        // Create new registration
        $registration = Registration::create([
            'user_id' => Auth::id(),
            'registration_period_id' => $activePeriod->id,
            'status' => 'draft',
        ]);

        ActivityLog::log(
            Auth::id(),
            ActivityLog::TYPE_REGISTER,
            'Started new registration: ' . $registration->registration_number
        );

        return redirect()->route('registration.biodata')
            ->with('success', 'Pendaftaran dimulai. Silakan lengkapi biodata Anda.');
    }

    /**
     * Show biodata form
     */
    public function showBiodata()
    {
        $registration = Auth::user()->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('registration.index');
        }

        // Ensure user relation is loaded so frontend can read registration.user.email
        $registration->load('user');

        return Inertia::render('User/Biodata', [
            'registration' => $registration,
            'biodata' => $registration->biodata,
        ]);
    }

    /**
     * Save biodata
     */
    public function storeBiodata(Request $request)
    {
        $registration = Auth::user()->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('registration.index');
        }

        $validated = $request->validate([
            'nik' => ['required', 'string', 'size:16', 'regex:/^[0-9]+$/'],
            'full_name' => ['required', 'string', 'max:255'],
            'birth_place' => ['required', 'string', 'max:100'],
            'birth_date' => ['required', 'date'],
            'gender' => ['required', 'in:male,female'],
            'religion' => ['required', 'string', 'max:50'],
            'phone' => ['required', 'string', 'max:20'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,' . Auth::id()],
            'address' => ['required', 'string'],
            'province' => ['required', 'string', 'max:100'],
            'city' => ['required', 'string', 'max:100'],
            'postal_code' => ['required', 'string', 'max:10'],
            'school_origin' => ['required', 'string', 'max:255'],
            'graduation_year' => ['required', 'integer', 'min:1990', 'max:' . (date('Y') + 1)],
            'father_name' => ['required', 'string', 'max:255'],
            'father_occupation' => ['required', 'string', 'max:100'],
            'parent_phone' => ['required', 'string', 'max:20'],
        ], [
            'nik.required' => 'NIK harus diisi.',
            'nik.size' => 'NIK harus 16 digit.',
            'nik.regex' => 'NIK harus berupa angka.',
            'full_name.required' => 'Nama lengkap harus diisi.',
            'birth_place.required' => 'Tempat lahir harus diisi.',
            'birth_date.required' => 'Tanggal lahir harus diisi.',
            'gender.required' => 'Jenis kelamin harus dipilih.',
            'phone.required' => 'Nomor HP harus diisi.',
            'email.required' => 'Email harus diisi.',
            'address.required' => 'Alamat harus diisi.',
            'school_origin.required' => 'Asal sekolah harus diisi.',
            'graduation_year.required' => 'Tahun lulus harus diisi.',
            'father_name.required' => 'Nama ayah harus diisi.',
            'mother_name.required' => 'Nama ibu harus diisi.',
            'parent_phone.required' => 'Nomor HP orang tua harus diisi.',
        ]);

        // Map father/mother fields to the existing biodata columns
        // (database has `parent_name` and `parent_job` columns)
        // Persist email to user model
        if (!empty($validated['email'])) {
            Auth::user()->update(['email' => $validated['email']]);
        }

        $validated['parent_name'] = $validated['father_name'] ?? $validated['mother_name'];
        $validated['parent_job'] = $validated['father_occupation'] ?? $validated['mother_occupation'] ?? null;

        // Remove unused keys that are not part of the biodata table
        unset($validated['father_name'], $validated['father_occupation'], $validated['mother_name'], $validated['mother_occupation']);

        $validated['registration_id'] = $registration->id;

        if ($registration->biodata) {
            $registration->biodata->update($validated);
        } else {
            Biodata::create($validated);
        }

        return redirect()->route('registration.study-programs')
            ->with('success', 'Biodata berhasil disimpan.');
    }

    /**
     * Show study program selection
     */
    public function showStudyPrograms()
    {
        $registration = Auth::user()->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('registration.index');
        }

        $studyPrograms = StudyProgram::active()->get();
        $choices = $registration->studyProgramChoices()->with('studyProgram')->get();

        return Inertia::render('User/StudyPrograms', [
            'registration' => $registration,
            'studyPrograms' => $studyPrograms,
            'choices' => $choices,
        ]);
    }

    /**
     * Save study program choices
     */
    public function storeStudyPrograms(Request $request)
    {
        $registration = Auth::user()->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('registration.index');
        }

        $validated = $request->validate([
            'choices' => ['required', 'array', 'min:1', 'max:3'],
            'choices.*.study_program_id' => ['required', 'exists:study_programs,id'],
            'choices.*.priority' => ['required', 'integer', 'min:1', 'max:3'],
        ], [
            'choices.required' => 'Pilih minimal 1 program studi.',
            'choices.min' => 'Pilih minimal 1 program studi.',
            'choices.max' => 'Maksimal 3 program studi.',
        ]);

        // Delete existing choices
        $registration->studyProgramChoices()->delete();

        // Create new choices
        foreach ($validated['choices'] as $choice) {
            StudyProgramChoice::create([
                'registration_id' => $registration->id,
                'study_program_id' => $choice['study_program_id'],
                'priority' => $choice['priority'],
            ]);
        }

        return redirect()->route('registration.documents')
            ->with('success', 'Pilihan program studi berhasil disimpan.');
    }

    /**
     * Show document upload
     */
    public function showDocuments()
    {
        $registration = Auth::user()->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('registration.index');
        }

        $documents = $registration->documents;

        return Inertia::render('User/Documents', [
            'registration' => $registration,
            'documents' => $documents,
        ]);
    }

    /**
     * Upload document
     */
    public function uploadDocument(Request $request)
    {
        $registration = Auth::user()->getActiveRegistration();

        if (!$registration) {
            return response()->json(['message' => 'Registration not found'], 404);
        }

        $validated = $request->validate([
            'type' => ['required', 'in:ktp,ijazah,foto,raport,sertifikat'],
            'file' => ['required', 'file', 'max:2048', 'mimes:pdf,jpg,jpeg,png'],
        ]);

        // Delete old document if exists (DB column is `document_type`)
        $oldDoc = $registration->documents()->where('document_type', $validated['type'])->first();
        if ($oldDoc) {
            $oldDoc->deleteFile();
            $oldDoc->delete();
        }

        // Store new file
        $file = $request->file('file');
        $filename = time() . '_' . $validated['type'] . '.' . $file->extension();
        $path = $file->storeAs('documents/' . $registration->id, $filename, 'public');

        // Create document record
        Document::create([
            'registration_id' => $registration->id,
            'document_type' => $validated['type'],
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'file_size' => $file->getSize(),
            'mime_type' => $file->getClientMimeType(),
            'uploaded_at' => now(),
        ]);

        ActivityLog::log(
            Auth::id(),
            ActivityLog::TYPE_UPLOAD_DOCUMENT,
            'Uploaded ' . $validated['type'] . ' document'
        );

        return response()->json([
            'message' => 'Dokumen berhasil diupload.',
        ]);
    }

    /**
     * Show review page
     */
    public function showReview()
    {
        $registration = Auth::user()->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('registration.index');
        }

        $registration->load(['user', 'biodata', 'studyProgramChoices.studyProgram', 'documents']);

        return Inertia::render('User/Review', [
            'registration' => $registration,
        ]);
    }

    /**
     * Submit registration
     */
    public function submit()
    {
        $registration = Auth::user()->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('registration.index');
        }

        // Validate completion
        if (!$registration->isComplete()) {
            return redirect()->back()
                ->with('error', 'Lengkapi semua data terlebih dahulu.');
        }

        if (!$registration->hasRequiredDocuments()) {
            return redirect()->back()
                ->with('error', 'Upload semua dokumen yang diperlukan.');
        }

        $registration->submit();

        ActivityLog::log(
            Auth::id(),
            ActivityLog::TYPE_SUBMIT_REGISTRATION,
            'Submitted registration: ' . $registration->registration_number
        );

        return redirect()->route('registration.index')
            ->with('success', 'Pendaftaran berhasil disubmit! Silakan lakukan pembayaran.');
    }
}
