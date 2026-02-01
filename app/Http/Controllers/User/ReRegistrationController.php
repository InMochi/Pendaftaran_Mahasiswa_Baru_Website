<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ReRegistration;
use App\Models\ReRegistrationDocument;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ReRegistrationController extends Controller
{
    /**
     * Show re-registration dashboard
     */
    public function index()
    {
    $registration = Auth::user()->getActiveRegistration();

    if (!$registration) {
        return redirect()->route('dashboard')
            ->with('error', 'Belum ada pendaftaran aktif.');
    }

   
    $announcement = $registration->announcement()->with('study_program')->first();

    
    $registration->load('biodata');

    if (!$announcement || $announcement->status !== 'accepted') {
        return redirect()->route('announcement.index')
            ->with('error', 'Anda tidak berhak melakukan daftar ulang.');
    }

    $reRegistration = $registration->reRegistration()
    ->with('documents')
    ->first();

    return Inertia::render('User/ReRegistration/Index', [
        'registration' => $registration,
        'announcement' => $announcement,
        'reRegistration' => $reRegistration,
    ]);
    }

    /**
     * Create re-registration record
     */
    public function create()
    {
        $registration = Auth::user()->getActiveRegistration();

        

        if (!$registration) {
            return redirect()->route('dashboard');
        }

        $announcement = $registration->announcement;

        if (!$announcement || $announcement->status !== 'accepted') {
            return redirect()->back()
                ->with('error', 'Anda tidak berhak melakukan daftar ulang.');
        }

        if ($registration->reRegistration) {
            return redirect()->route('re-registration.index');
        }

        ReRegistration::create([
            'registration_id' => $registration->id,
            'announcement_id' => $announcement->id,
            'status' => 'pending',
        ]);

        return redirect()->route('re-registration.index')
            ->with('success', 'Daftar ulang dimulai. Silakan lengkapi dokumen yang diperlukan.');
    }

    /**
     * Upload re-registration document
     */
    public function uploadDocument(Request $request)
    {
        // Cari ReRegistration milik user yang login
        $reRegistration = ReRegistration::whereHas('registration', function ($q) {
            $q->where('user_id', auth()->id());
        })->first();

        if (!$reRegistration) {
            return response()->json(['message' => 'Re-registration tidak ditemukan.'], 404);
        }

        $validated = $request->validate([
            'type' => ['required', 'in:surat_pernyataan,pas_foto,surat_kesehatan,kartu_keluarga'],
            'file' => ['required', 'file', 'max:2048', 'mimes:pdf,jpg,jpeg,png'],
        ]);

        $registrationId = $reRegistration->registration_id;

        // Hapus dokumen lama jika ada
        $oldDoc = \App\Models\Document::where('registration_id', $registrationId)
            ->where('document_type', $validated['type'])
            ->first();

        if ($oldDoc) {
            if ($oldDoc->file_path) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldDoc->file_path);
            }
            $oldDoc->delete();
        }

        // Simpan file baru
        $file = $request->file('file');
        $filename = time() . '_' . $validated['type'] . '.' . $file->extension();
        $path = $file->storeAs('re-registration/' . $reRegistration->id, $filename, 'public');

        // Buat record dokumen baru
        \App\Models\Document::create([
            'registration_id' => $registrationId,
            'document_type' => $validated['type'],
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'file_size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'uploaded_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Dokumen berhasil diupload.');
    }


    /**
     * Submit re-registration
     */
    public function submit()
    {
        $registration = Auth::user()->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('dashboard');
        }

        $reRegistration = $registration->reRegistration;

        if (!$reRegistration) {
            return redirect()->route('re-registration.index');
        }

        // Check if all required documents uploaded
        $requiredTypes = ['surat_pernyataan', 'pas_foto', 'surat_kesehatan'];
        $uploadedTypes = $reRegistration->documents()->pluck('document_type')->toArray();
        
        $missing = array_diff($requiredTypes, $uploadedTypes);
        if (!empty($missing)) {
            return redirect()->back()
                ->with('error', 'Lengkapi semua dokumen yang diperlukan.');
        }

        $reRegistration->update([
            'status' => 'submitted',
            'submitted_at' => now(),
        ]);

        return redirect()->route('re-registration.index')
            ->with('success', 'Daftar ulang berhasil disubmit! Menunggu verifikasi admin.');
    }

    /**
     * Print acceptance letter
     */
    public function printLetter()
    {
        $registration = Auth::user()->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('dashboard');
        }
        
        $registration->load(['biodata', 'announcement.study_program']);
        $announcement = $registration->announcement;
        $reRegistration = $registration->reRegistration;

        if (!$announcement || !$reRegistration || $reRegistration->status !== 'verified') {
            return redirect()->back()
                ->with('error', 'Surat belum dapat dicetak.');
        }

        return Inertia::render('User/ReRegistration/Letter', [
            'registration' => $registration,
            'announcement' => $announcement,
            'reRegistration' => $reRegistration,
        ]);
    }
}
