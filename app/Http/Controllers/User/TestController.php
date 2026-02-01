<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\TestSession;
use App\Models\TestCategory;
use App\Models\TestQuestion;
use App\Models\TestAnswer;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TestController extends Controller
{
    /**
     * Show test dashboard
     */
    public function index()
    {
        $registration = Auth::user()->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('dashboard')
                ->with('error', 'Belum ada pendaftaran aktif.');
        }

        // Check if payment is verified
        if (!in_array($registration->status, ['payment_verified', 'test_completed', 'passed', 'failed'])) {
            return redirect()->route('payment.index')
                ->with('error', 'Selesaikan pembayaran terlebih dahulu.');
        }

        $testSession = $registration->testSession;
        $categories = TestCategory::active()
            ->withCount('activeQuestions')
            ->get();

        return Inertia::render('User/Test/Index', [
            'registration' => $registration,
            'testSession' => $testSession,
            'categories' => $categories,
        ]);
    }

    /**
     * Start test session
     */
    public function start()
    {
        $registration = Auth::user()->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('dashboard')
                ->with('error', 'Belum ada pendaftaran aktif.');
        }

        if ($registration->status !== 'payment_verified') {
            return redirect()->route('test.index')
                ->with('error', 'Status tidak valid untuk memulai tes.');
        }

        // Check if already has test session
        if ($registration->testSession) {
            return redirect()->route('test.take');
        }

        // Create test session
        $testSession = TestSession::create([
            'registration_id' => $registration->id,
            'status' => 'not_started',
        ]);

        $testSession->start();

        ActivityLog::log(
            Auth::id(),
            ActivityLog::TYPE_START_TEST,
            'Started test session for registration: ' . $registration->registration_number
        );

        return redirect()->route('test.take');
    }

    /**
     * Show test interface
     */
    public function take()
    {
        $registration = Auth::user()->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('dashboard');
        }

        $testSession = $registration->testSession;

        if (!$testSession) {
            return redirect()->route('test.index');
        }

        // Check if already completed or timeout
        if (in_array($testSession->status, ['completed', 'timeout'])) {
            return redirect()->route('test.result');
        }

        // Get all questions
        $questions = TestQuestion::active()
            ->with('testCategory')
            ->get();

        // Get existing answers
        $answers = $testSession->testAnswers()
            ->get()
            ->keyBy('test_question_id');

        return Inertia::render('User/Test/Take', [
            'registration' => $registration,
            'testSession' => $testSession,
            'questions' => $questions,
            'answers' => $answers,
            'timeRemaining' => $testSession->getTimeElapsed(), // seconds elapsed
        ]);
    }

    /**
     * Submit answer (auto-save)
     */
    public function answer(Request $request)
    {
        $validated = $request->validate([
            'test_session_id' => ['required', 'exists:test_sessions,id'],
            'test_question_id' => ['required', 'exists:test_questions,id'],
            'answer' => ['required', 'string'],
        ]);

        $testSession = TestSession::findOrFail($validated['test_session_id']);

        // Verify ownership
        if ($testSession->registration->user_id !== Auth::id()) {
            abort(403);
        }

        // Check if session is still active
        if (in_array($testSession->status, ['completed', 'timeout'])) {
            return response()->json(['message' => 'Test session has ended'], 400);
        }

        // Create or update answer
        TestAnswer::updateOrCreate(
        [
            'test_session_id' => $testSession->id,
            'test_question_id' => $validated['test_question_id'],
        ],
        [
            'answer' => $validated['answer'],
            'answered_at' => now(),
        ]
        );

        return response()->json(['message' => 'Answer saved']);
    }

    /**
     * Submit test (finish)
     */
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'test_session_id' => ['required', 'exists:test_sessions,id'],
        ]);

        $testSession = TestSession::findOrFail($validated['test_session_id']);

        // Verify ownership
        if ($testSession->registration->user_id !== Auth::id()) {
            abort(403);
        }

        if ($testSession->status !== 'in_progress') {
            return redirect()->route('test.result');
        }

        $testSession->complete();

        ActivityLog::log(
            Auth::id(),
            ActivityLog::TYPE_COMPLETE_TEST,
            'Completed test session'
        );

        return redirect()->route('test.result')
            ->with('success', 'Test selesai! Lihat hasil Anda di bawah.');
    }

    /**
     * Show test result
     */
    public function result()
    {
        $registration = Auth::user()->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('dashboard');
        }

        $testSession = $registration->testSession;

        if (!$testSession) {
            return redirect()->route('test.index');
        }

        if ($testSession->status === 'in_progress') {
            return redirect()->route('test.take');
        }

        $testSession->load([
            'testScores.testCategory',
            'testAnswers.testQuestion.testCategory',
        ]);

        // Calculate stats
        $totalQuestions = TestQuestion::active()->count();
        $answeredQuestions = $testSession->testAnswers()->count();
        $correctAnswers = $testSession->getCorrectAnswersCount();

        return Inertia::render('User/Test/Result', [
            'registration' => $registration,
            'testSession' => $testSession,
            'totalQuestions' => $totalQuestions,
            'answeredQuestions' => $answeredQuestions,
            'correctAnswers' => $correctAnswers,
            'accuracy' => number_format($testSession->getAccuracyPercentage(), 2),
        ]);
    }
}
