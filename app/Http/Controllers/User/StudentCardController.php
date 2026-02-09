<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class StudentCardController extends Controller
{
    /**
     * Show student card
     */
    public function index()
    {
        $user = Auth::user()->load([
            'registrations.biodata',
            'registrations.announcement.studyProgram',
            'registrations.reRegistration'
        ]);

        $registration = $user->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('dashboard')
                ->with('error', 'Belum ada pendaftaran aktif.');
        }

        $announcement = $registration->announcement;

        // Check if eligible for student card
        if (!$announcement || $announcement->status !== 'accepted') {
            return redirect()->route('dashboard')
                ->with('error', 'Kartu mahasiswa hanya untuk yang diterima.');
        }

        $reRegistration = $registration->reRegistration;

        if (!$reRegistration || $reRegistration->status !== 'verified') {
            return redirect()->route('re-registration.index')
                ->with('error', 'Selesaikan daftar ulang terlebih dahulu.');
        }

        // Generate student number if not exists
        if (!$registration->student_number) {
            $studentNumber = $this->generateStudentNumber($registration);
            $registration->update(['student_number' => $studentNumber]);
            $registration->refresh();
        }

        // Generate QR Code
        $qrCode = $this->generateQrCode($registration);

        return Inertia::render('User/StudentCard/Index', [
            'user' => $user,
            'registration' => $registration,
            'announcement' => $announcement,
            'qrCode' => $qrCode,
        ]);
    }

    /**
     * Print student card
     */
    public function print()
    {
        $user = Auth::user()->load([
            'registrations.biodata',
            'registrations.announcement.studyProgram',
            'registrations.reRegistration'
        ]);

        $registration = $user->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('dashboard')
                ->with('error', 'Belum ada pendaftaran aktif.');
        }

        $announcement = $registration->announcement;

        if (!$announcement || $announcement->status !== 'accepted') {
            return redirect()->route('dashboard')
                ->with('error', 'Kartu mahasiswa hanya untuk yang diterima.');
        }

        $reRegistration = $registration->reRegistration;

        if (!$reRegistration || $reRegistration->status !== 'verified') {
            return redirect()->route('dashboard')
                ->with('error', 'Selesaikan daftar ulang terlebih dahulu.');
        }

        // Generate student number if not exists
        if (!$registration->student_number) {
            $studentNumber = $this->generateStudentNumber($registration);
            $registration->update(['student_number' => $studentNumber]);
            $registration->refresh();
        }

        // Generate QR Code
        $qrCode = $this->generateQrCode($registration);

        return Inertia::render('User/StudentCard/Print', [
            'user' => $user,
            'registration' => $registration,
            'announcement' => $announcement,
            'qrCode' => $qrCode,
        ]);
    }

    /**
     * Generate student number
     */
    private function generateStudentNumber($registration)
    {
        $year = date('Y');
        $programCode = str_pad($registration->announcement->studyProgram->id, 2, '0', STR_PAD_LEFT);
        
        // Get last student number for this year and program
        $lastNumber = \App\Models\Registration::where('student_number', 'like', $year . $programCode . '%')
            ->orderBy('student_number', 'desc')
            ->value('student_number');

        if ($lastNumber) {
            $sequence = intval(substr($lastNumber, -4)) + 1;
        } else {
            $sequence = 1;
        }

        $studentNumber = $year . $programCode . str_pad($sequence, 4, '0', STR_PAD_LEFT);

        return $studentNumber;
    }

    /**
     * Generate QR Code
     */
    private function generateQrCode($registration)
    {
        $data = json_encode([
            'student_number' => $registration->student_number,
            'name' => $registration->biodata->full_name,
            'program' => $registration->announcement->studyProgram->name,
            'year' => date('Y'),
        ]);

        // Use SVG format to avoid imagick dependency
        $qrCode = (string) QrCode::format('svg')
            ->size(200)
            ->margin(1)
            ->generate($data);

        return $qrCode;
    }
}
