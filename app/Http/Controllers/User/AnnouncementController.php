<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ReRegistration;
use App\Models\Announcement;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    /**
     * Show announcement result
     */
    public function index()
    {
        $user = Auth::user();
        $registration = $user->getActiveRegistration()
        ->load(['biodata','announcement','user']);

        if (!$registration) {
            return redirect()->route('dashboard')
                ->with('error', 'Anda belum memiliki pendaftaran.');
        }

        // ❗ WAJIB: test harus selesai
        if (!$registration->testSession || 
            !in_array($registration->testSession->status, ['completed', 'timeout'])) {
            return redirect()->route('test.index')
                ->with('error', 'Selesaikan tes terlebih dahulu.');
        }

        // ambil pengumuman
        $announcement = Announcement::with('studyProgram')
            ->where('registration_id', $registration->id)
            ->first();

        // ❗ pengumuman belum di-generate admin
        if (!$announcement) {
            return Inertia::render('User/Announcement/NotReady', [
                'message' => 'Pengumuman belum tersedia. Silakan menunggu.',
                 'registration'   => $registration,
            ]);
        }

        return Inertia::render('User/Announcement/Index', [
        'registration'   => $registration,
        'announcement'   => $announcement,
        'reRegistration' => $registration->reRegistration,
        ]);
    }

    /**
     * Start re-registration
     */
    public function reRegister(Request $request)
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
            return redirect()->route('announcement.index')
                ->with('info', 'Anda sudah melakukan daftar ulang.');
        }

        $validated = $request->validate([
            'confirm' => ['required', 'boolean', 'accepted'],
        ], [
            'confirm.accepted' => 'Anda harus menyetujui untuk melakukan daftar ulang.',
        ]);

        ReRegistration::create([
            'registration_id' => $registration->id,
            'status' => 'completed',
            'notes' => 'Daftar ulang berhasil dilakukan pada ' . now()->format('d M Y H:i'),
        ]);

        return redirect()->route('announcement.index')
            ->with('success', 'Daftar ulang berhasil! Silakan tunggu informasi lebih lanjut.');
    }
}
