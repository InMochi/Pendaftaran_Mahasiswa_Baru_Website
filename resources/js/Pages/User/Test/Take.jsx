import React, { useState, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';

export default function TestTake({ registration, testSession, questions, answers, timeRemaining }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [localAnswers, setLocalAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(timeRemaining || 0);
    const [saving, setSaving] = useState(false);
    const timerRef = useRef(null);

    const currentQuestion = questions[currentIndex];
    const totalDuration = 120 * 60; // 120 minutes in seconds (adjust based on categories)

    // Initialize local answers from server data
    useEffect(() => {
        const answerMap = {};
        Object.values(answers).forEach(ans => {
            answerMap[ans.test_question_id] = ans.answer;
        });
        setLocalAnswers(answerMap);
    }, [answers]);

    // Timer countdown
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                const next = prev + 1;
                if (next >= totalDuration) {
                    // Auto-submit when time's up
                    handleSubmit(true);
                    return totalDuration;
                }
                return next;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, []);

    const formatTime = (seconds) => {
        const remaining = totalDuration - seconds;
        const mins = Math.floor(remaining / 60);
        const secs = remaining % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleAnswer = async (answer) => {
        const questionId = currentQuestion.id;
        setLocalAnswers({ ...localAnswers, [questionId]: answer });

        // Auto-save to server
        setSaving(true);
        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            await axios.post('/test/answer', {
                test_session_id: testSession.id,
                test_question_id: questionId,
                answer: answer,
            }, {
                headers: { 'X-CSRF-TOKEN': token },
            });
        } catch (error) {
            console.error('Failed to save answer:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleJump = (index) => {
        setCurrentIndex(index);
    };

    const handleSubmit = (autoSubmit = false) => {
        if (!autoSubmit) {
            const unanswered = questions.length - Object.keys(localAnswers).length;
            if (unanswered > 0) {
                if (!confirm(`Masih ada ${unanswered} soal yang belum dijawab. Yakin submit?`)) {
                    return;
                }
            }
            if (!confirm('Submit test sekarang? Anda tidak bisa mengubah jawaban lagi.')) {
                return;
            }
        }

        clearInterval(timerRef.current);
        router.post('/test/submit', { test_session_id: testSession.id });
    };

    const getAnswerStatus = (questionId) => {
        return localAnswers[questionId] ? 'answered' : 'unanswered';
    };

    const answeredCount = Object.keys(localAnswers).length;
    const progressPercentage = Math.round((answeredCount / questions.length) * 100);

    return (
        <>
            <Head title="Test Berlangsung" />
            <div className="min-h-screen bg-gray-50 flex flex-col">
                {/* Top Bar - Timer & Progress */}
                <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Test Online</p>
                                <p className="text-xs text-gray-400">{registration.registration_number}</p>
                            </div>

                            <div className="flex items-center gap-6">
                                {/* Progress */}
                                <div className="text-center">
                                    <p className="text-xs text-gray-500">Progress</p>
                                    <p className="text-sm font-bold text-gray-900">{answeredCount}/{questions.length}</p>
                                </div>

                                {/* Timer */}
                                <div className={`px-4 py-2 rounded-lg font-mono text-xl font-bold ${
                                    timeLeft > totalDuration - 300 ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'
                                }`}>
                                    ⏱️ {formatTime(timeLeft)}
                                </div>

                                {/* Auto-save indicator */}
                                {saving && <span className="text-xs text-gray-400">💾 Saving...</span>}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                            <div
                                className="bg-linear-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Question Panel */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-md p-8">
                                {/* Question Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full mb-2">
                                            {currentQuestion.test_category?.name}
                                        </span>
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Soal {currentIndex + 1} dari {questions.length}
                                        </h2>
                                    </div>
                                    <span className="text-sm font-semibold text-indigo-600">
                                        {currentQuestion.points} poin
                                    </span>
                                </div>

                                {/* Question Text */}
                                <div className="mb-6">
                                    <p className="text-gray-900 text-lg leading-relaxed whitespace-pre-wrap">
                                        {currentQuestion.question_text}
                                    </p>
                                </div>

                                {/* Answer Options */}
                                {currentQuestion.question_type === 'multiple_choice' ? (
                                    <div className="space-y-3">
                                        {['a', 'b', 'c', 'd', 'e'].map((opt) => {
                                            const optionText = currentQuestion[`option_${opt}`];
                                            if (!optionText) return null;

                                            const isSelected = localAnswers[currentQuestion.id] === opt;

                                            return (
                                                <button
                                                    key={opt}
                                                    onClick={() => handleAnswer(opt)}
                                                    className={`w-full text-left p-4 rounded-xl border-2 transition ${
                                                        isSelected
                                                            ? 'border-indigo-500 bg-indigo-50'
                                                            : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                                                            isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                                                        }`}>
                                                            {isSelected && (
                                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="font-semibold text-gray-700 mr-2">{opt.toUpperCase()}.</span>
                                                            <span className="text-gray-900">{optionText}</span>
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div>
                                        <textarea
                                            value={localAnswers[currentQuestion.id] || ''}
                                            onChange={(e) => handleAnswer(e.target.value)}
                                            rows={8}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                                            placeholder="Tuliskan jawaban Anda di sini..."
                                        />
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={handlePrev}
                                        disabled={currentIndex === 0}
                                        className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        ← Sebelumnya
                                    </button>

                                    {currentIndex === questions.length - 1 ? (
                                        <button
                                            onClick={() => handleSubmit(false)}
                                            className="px-8 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg"
                                        >
                                            ✓ Submit Test
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleNext}
                                            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                                        >
                                            Selanjutnya →
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Question Navigator Sidebar */}
                    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Navigasi Soal</h3>
                        <div className="grid grid-cols-5 gap-2">
                            {questions.map((q, idx) => {
                                const status = getAnswerStatus(q.id);
                                const isCurrent = idx === currentIndex;

                                return (
                                    <button
                                        key={q.id}
                                        onClick={() => handleJump(idx)}
                                        className={`w-full aspect-square rounded-lg font-bold text-sm transition ${
                                            isCurrent
                                                ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2'
                                                : status === 'answered'
                                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                        }`}
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-6 space-y-2 text-xs">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-indigo-600 rounded"></div>
                                <span className="text-gray-600">Soal Aktif</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                                <span className="text-gray-600">Sudah Dijawab</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                                <span className="text-gray-600">Belum Dijawab</span>
                            </div>
                        </div>

                        <button
                            onClick={() => handleSubmit(false)}
                            className="w-full mt-6 px-4 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg"
                        >
                            Submit Test
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
