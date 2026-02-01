<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ReRegistration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReRegistrationController extends Controller
{
    public function index()
    {
        $reRegistrations = ReRegistration::with([
            'registration.user',
            'registration.biodata',
            'registration.announcement.studyProgram',
            'documents'
        ])->orderBy('created_at', 'desc')->get();

        $stats = [
            'pending' => $reRegistrations->where('status', 'pending')->count(),
            'submitted' => $reRegistrations->where('status', 'submitted')->count(),
            'verified' => $reRegistrations->where('status', 'verified')->count(),
        ];

        return Inertia::render('Admin/ReRegistration/Index', [
            'reRegistrations' => $reRegistrations,
            'stats' => $stats,
        ]);
    }

    public function verify(ReRegistration $reRegistration)
    {
        if ($reRegistration->status !== 'submitted') {
            return redirect()->back()
                ->with('error', 'Hanya daftar ulang yang sudah disubmit yang dapat diverifikasi.');
        }

        $reRegistration->update([
            'status' => 'verified',
            'verified_at' => now(),
            'verified_by' => auth()->id(),
        ]);

        return redirect()->route('admin.re-registrations.index')
            ->with('success', 'Daftar ulang berhasil diverifikasi.');
    }

    public function reject(Request $request, ReRegistration $reRegistration)
    {
        $validated = $request->validate([
            'notes' => ['required', 'string'],
        ], [
            'notes.required' => 'Alasan penolakan harus diisi.',
        ]);

        $reRegistration->update([
            'status' => 'rejected',
            'notes' => $validated['notes'],
        ]);

        return redirect()->route('admin.re-registrations.index')
            ->with('success', 'Daftar ulang ditolak.');
    }
}
