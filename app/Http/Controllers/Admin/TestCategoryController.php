<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TestCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestCategoryController extends Controller
{
    /**
     * Display list of test categories
     */
    public function index()
    {
        $categories = TestCategory::query()
            ->withCount('testQuestions')
            ->withCount('activeQuestions')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/TestCategory/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a new test category
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:test_categories,name'],
            'description' => ['nullable', 'string'],
            'duration_minutes' => ['required', 'integer', 'min:5'],
            'is_active' => ['boolean'],
        ], [
            'name.required' => 'Nama kategori harus diisi.',
            'name.unique' => 'Nama kategori sudah ada.',
            'duration_minutes.required' => 'Durasi harus diisi.',
            'duration_minutes.min' => 'Durasi minimal 5 menit.',
        ]);

        TestCategory::create($validated);

        return redirect()->route('admin.test-categories.index')
            ->with('success', 'Kategori tes berhasil ditambahkan.');
    }

    /**
     * Update a test category
     */
    public function update(Request $request, TestCategory $testCategory)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:test_categories,name,' . $testCategory->id],
            'description' => ['nullable', 'string'],
            'duration_minutes' => ['required', 'integer', 'min:5'],
            'is_active' => ['boolean'],
        ], [
            'name.required' => 'Nama kategori harus diisi.',
            'name.unique' => 'Nama kategori sudah ada.',
            'duration_minutes.required' => 'Durasi harus diisi.',
            'duration_minutes.min' => 'Durasi minimal 5 menit.',
        ]);

        $testCategory->update($validated);

        return redirect()->route('admin.test-categories.index')
            ->with('success', 'Kategori tes berhasil diperbarui.');
    }

    /**
     * Delete a test category
     */
    public function destroy(TestCategory $testCategory)
    {
        // Cek apakah kategori sudah memiliki soal
        if ($testCategory->testQuestions()->exists()) {
            return redirect()->route('admin.test-categories.index')
                ->with('error', 'Kategori ini sudah memiliki soal. Hapus soalnya terlebih dahulu.');
        }

        $testCategory->delete();

        return redirect()->route('admin.test-categories.index')
            ->with('success', 'Kategori tes berhasil dihapus.');
    }
}
