<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StudyProgram;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudyProgramController extends Controller
{
    /**
     * Display list of study programs
     */
    public function index()
    {
        $programs = StudyProgram::query()
            ->orderBy('faculty')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/StudyProgram/Index', [
            'programs' => $programs,
        ]);
    }

    /**
     * Store a new study program
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:10', 'unique:study_programs,code'],
            'faculty' => ['required', 'string', 'max:255'],
            'quota' => ['required', 'integer', 'min:1'],
            'description' => ['nullable', 'string'],
            'is_active' => ['boolean'],
        ], [
            'name.required' => 'Nama prodi harus diisi.',
            'code.required' => 'Kode prodi harus diisi.',
            'code.unique' => 'Kode prodi sudah digunakan.',
            'faculty.required' => 'Nama fakultas harus diisi.',
            'quota.required' => 'Kuota harus diisi.',
            'quota.min' => 'Kuota minimal 1.',
        ]);

        StudyProgram::create($validated);

        return redirect()->route('admin.study-programs.index')
            ->with('success', 'Program studi berhasil ditambahkan.');
    }

    /**
     * Update a study program
     */
    public function update(Request $request, StudyProgram $studyProgram)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:10', 'unique:study_programs,code,' . $studyProgram->id],
            'faculty' => ['required', 'string', 'max:255'],
            'quota' => ['required', 'integer', 'min:1'],
            'description' => ['nullable', 'string'],
            'is_active' => ['boolean'],
        ], [
            'name.required' => 'Nama prodi harus diisi.',
            'code.required' => 'Kode prodi harus diisi.',
            'code.unique' => 'Kode prodi sudah digunakan.',
            'faculty.required' => 'Nama fakultas harus diisi.',
            'quota.required' => 'Kuota harus diisi.',
            'quota.min' => 'Kuota minimal 1.',
        ]);

        $studyProgram->update($validated);

        return redirect()->route('admin.study-programs.index')
            ->with('success', 'Program studi berhasil diperbarui.');
    }

    /**
     * Delete a study program
     */
    public function destroy(StudyProgram $studyProgram)
    {
        // Cek apakah prodi sudah digunakan di pilihan peserta
        if ($studyProgram->studyProgramChoices()->exists()) {
            return redirect()->route('admin.study-programs.index')
                ->with('error', 'Prodi ini sudah dipilih oleh peserta dan tidak bisa dihapus.');
        }

        $studyProgram->delete();

        return redirect()->route('admin.study-programs.index')
            ->with('success', 'Program studi berhasil dihapus.');
    }
}
