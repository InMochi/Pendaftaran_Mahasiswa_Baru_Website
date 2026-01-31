<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RegistrationPeriod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrationPeriodController extends Controller
{
    /**
     * Display list of registration periods
     */
    public function index()
    {
        $periods = RegistrationPeriod::query()
            ->withCount('registrations')
            ->orderByDesc('registration_start')
            ->get();

        return Inertia::render('Admin/RegistrationPeriod/Index', [
            'periods' => $periods,
        ]);
    }

    /**
     * Store a new registration period
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'academic_year' => ['required', 'string', 'max:20'],
            'registration_start' => ['required', 'date'],
            'registration_end' => ['required', 'date', 'after:registration_start'],
            'test_date' => ['nullable', 'date', 'after:registration_end'],
            'announcement_date' => ['nullable', 'date'],
            'is_active' => ['boolean'],
        ], [
            'name.required' => 'Nama periode harus diisi.',
            'academic_year.required' => 'Tahun akademik harus diisi.',
            'registration_start.required' => 'Tanggal mulai pendaftaran harus diisi.',
            'registration_end.required' => 'Tanggal akhir pendaftaran harus diisi.',
            'registration_end.after' => 'Tanggal akhir harus setelah tanggal mulai.',
            'test_date.after' => 'Tanggal tes harus setelah pendaftaran ditutup.',
        ]);

        RegistrationPeriod::create($validated);

        return redirect()->route('admin.registration-periods.index')
            ->with('success', 'Periode pendaftaran berhasil ditambahkan.');
    }

    /**
     * Update a registration period
     */
    public function update(Request $request, RegistrationPeriod $registrationPeriod)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'academic_year' => ['required', 'string', 'max:20'],
            'registration_start' => ['required', 'date'],
            'registration_end' => ['required', 'date', 'after:registration_start'],
            'test_date' => ['nullable', 'date', 'after:registration_end'],
            'announcement_date' => ['nullable', 'date'],
            'is_active' => ['boolean'],
        ], [
            'name.required' => 'Nama periode harus diisi.',
            'academic_year.required' => 'Tahun akademik harus diisi.',
            'registration_start.required' => 'Tanggal mulai pendaftaran harus diisi.',
            'registration_end.required' => 'Tanggal akhir pendaftaran harus diisi.',
            'registration_end.after' => 'Tanggal akhir harus setelah tanggal mulai.',
            'test_date.after' => 'Tanggal tes harus setelah pendaftaran ditutup.',
        ]);

        $registrationPeriod->update($validated);

        return redirect()->route('admin.registration-periods.index')
            ->with('success', 'Periode pendaftaran berhasil diperbarui.');
    }

    /**
     * Delete a registration period
     */
    public function destroy(RegistrationPeriod $registrationPeriod)
    {
        // Cek apakah periode sudah ada pendaftaran
        if ($registrationPeriod->registrations()->exists()) {
            return redirect()->route('admin.registration-periods.index')
                ->with('error', 'Periode ini sudah memiliki pendaftaran dan tidak bisa dihapus.');
        }

        $registrationPeriod->delete();

        return redirect()->route('admin.registration-periods.index')
            ->with('success', 'Periode pendaftaran berhasil dihapus.');
    }
}

