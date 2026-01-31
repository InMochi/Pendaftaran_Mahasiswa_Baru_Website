<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TestCategory;
use App\Models\TestQuestion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestQuestionController extends Controller
{
    /**
     * Display list of test questions
     */
    public function index()
    {
        $questions = TestQuestion::query()
            ->with('testCategory')
            ->orderBy('test_category_id')
            ->orderByDesc('created_at')
            ->get();

        $categories = TestCategory::active()->orderBy('name')->get();

        return Inertia::render('Admin/TestQuestion/Index', [
            'questions' => $questions,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a new test question
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'test_category_id' => ['required', 'integer', 'exists:test_categories,id'],
            'question_text' => ['required', 'string'],
            'question_type' => ['required', 'in:multiple_choice,essay'],
            'option_a' => ['nullable', 'string'],
            'option_b' => ['nullable', 'string'],
            'option_c' => ['nullable', 'string'],
            'option_d' => ['nullable', 'string'],
            'option_e' => ['nullable', 'string'],
            'correct_answer' => ['nullable', 'in:a,b,c,d,e'],
            'points' => ['required', 'integer', 'min:1'],
            'is_active' => ['boolean'],
        ], [
            'test_category_id.required' => 'Kategori harus dipilih.',
            'test_category_id.exists' => 'Kategori tidak ditemukan.',
            'question_text.required' => 'Pertanyaan harus diisi.',
            'question_type.required' => 'Tipe soal harus dipilih.',
            'points.required' => 'Bobot nilai harus diisi.',
            'points.min' => 'Bobot nilai minimal 1.',
        ]);

        // Validate options for multiple choice
        if ($validated['question_type'] === 'multiple_choice') {
            if (empty($validated['option_a']) || empty($validated['option_b'])) {
                return redirect()->back()
                    ->with('error', 'Pilihan ganda harus memiliki setidaknya 2 opsi.')
                    ->withInput();
            }
            if (empty($validated['correct_answer'])) {
                return redirect()->back()
                    ->with('error', 'Jawaban benar harus dipilih untuk soal pilihan ganda.')
                    ->withInput();
            }
        }

        TestQuestion::create($validated);

        return redirect()->route('admin.test-questions.index')
            ->with('success', 'Soal berhasil ditambahkan.');
    }

    /**
     * Update a test question
     */
    public function update(Request $request, TestQuestion $testQuestion)
    {
        $validated = $request->validate([
            'test_category_id' => ['required', 'integer', 'exists:test_categories,id'],
            'question_text' => ['required', 'string'],
            'question_type' => ['required', 'in:multiple_choice,essay'],
            'option_a' => ['nullable', 'string'],
            'option_b' => ['nullable', 'string'],
            'option_c' => ['nullable', 'string'],
            'option_d' => ['nullable', 'string'],
            'option_e' => ['nullable', 'string'],
            'correct_answer' => ['nullable', 'in:a,b,c,d,e'],
            'points' => ['required', 'integer', 'min:1'],
            'is_active' => ['boolean'],
        ], [
            'test_category_id.required' => 'Kategori harus dipilih.',
            'test_category_id.exists' => 'Kategori tidak ditemukan.',
            'question_text.required' => 'Pertanyaan harus diisi.',
            'question_type.required' => 'Tipe soal harus dipilih.',
            'points.required' => 'Bobot nilai harus diisi.',
            'points.min' => 'Bobot nilai minimal 1.',
        ]);

        // Validate options for multiple choice
        if ($validated['question_type'] === 'multiple_choice') {
            if (empty($validated['option_a']) || empty($validated['option_b'])) {
                return redirect()->back()
                    ->with('error', 'Pilihan ganda harus memiliki setidaknya 2 opsi.')
                    ->withInput();
            }
            if (empty($validated['correct_answer'])) {
                return redirect()->back()
                    ->with('error', 'Jawaban benar harus dipilih untuk soal pilihan ganda.')
                    ->withInput();
            }
        }

        // Clear options if type changed to essay
        if ($validated['question_type'] === 'essay') {
            $validated['option_a'] = null;
            $validated['option_b'] = null;
            $validated['option_c'] = null;
            $validated['option_d'] = null;
            $validated['option_e'] = null;
            $validated['correct_answer'] = null;
        }

        $testQuestion->update($validated);

        return redirect()->route('admin.test-questions.index')
            ->with('success', 'Soal berhasil diperbarui.');
    }

    /**
     * Delete a test question
     */
    public function destroy(TestQuestion $testQuestion)
    {
        // Cek apakah soal sudah dijawab
        if ($testQuestion->testAnswers()->exists()) {
            return redirect()->route('admin.test-questions.index')
                ->with('error', 'Soal ini sudah dijawab oleh peserta dan tidak bisa dihapus.');
        }

        $testQuestion->delete();

        return redirect()->route('admin.test-questions.index')
            ->with('success', 'Soal berhasil dihapus.');
    }
}
