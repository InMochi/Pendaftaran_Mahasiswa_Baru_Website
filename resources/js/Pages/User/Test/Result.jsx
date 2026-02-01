import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function TestResult({ registration, testSession, totalQuestions, answeredQuestions, correctAnswers, accuracy }) {
    const [showDetails, setShowDetails] = useState(false);

    const isPassed = Number(accuracy) >= 70;

    

    return (
        <>
            <Head title="Hasil Test" />
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
                <header className="bg-white shadow-sm border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Hasil Test</h1>
                                <p className="text-sm text-gray-500">No. {registration.registration_number}</p>
                            </div>
                            <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                ← Kembali
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Result Card */}
                    <div className={`rounded-2xl shadow-xl p-8 mb-6 ${
                        isPassed 
                            ? 'bg-linear-to-br from-green-500 to-emerald-600' 
                            : 'bg-linear-to-br from-red-500 to-rose-600'
                    } text-white text-center`}>
                        
                        {/* 2. Emoji & Text menyesuaikan kondisi */}
                        <div className="text-6xl mb-4">{isPassed ? '🎉' : '😔'}</div>
                        <h2 className="text-3xl font-bold mb-2">
                            {isPassed ? 'Selamat!' : 'Belum Berhasil'}
                        </h2>
                        
                        <p className="text-lg opacity-90 mb-6">
                            {isPassed 
                                ? 'Anda lulus test dengan akurasi yang luar biasa!' 
                                : 'Akurasi Anda masih di bawah target. Terus belajar ya!'}
                        </p>

                        {/* 3. Menampilkan Akurasi sebagai skor utama */}
                        <div className="inline-block bg-white/20 backdrop-blur-sm rounded-xl px-8 py-4">
                            <p className="text-sm opacity-90 mb-1">Akurasi Tes</p>
                            <p className="text-5xl font-bold">{Number(accuracy).toFixed(2)}%</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <p className="text-sm text-gray-500 mb-1">Total Soal</p>
                            <p className="text-3xl font-bold text-gray-900">{totalQuestions}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <p className="text-sm text-gray-500 mb-1">Dijawab</p>
                            <p className="text-3xl font-bold text-blue-600">{answeredQuestions}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <p className="text-sm text-gray-500 mb-1">Benar</p>
                            <p className="text-3xl font-bold text-green-600">{correctAnswers}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <p className="text-sm text-gray-500 mb-1">Akurasi</p>
                            <p className="text-3xl font-bold text-purple-600">{accuracy}%</p>
                        </div>
                    </div>

                    {/* Scores per Category */}
                    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Skor per Kategori</h3>
                        <div className="space-y-3">
                            {testSession.test_scores?.map((score) => (
                                <div key={score.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">{score.test_category?.name}</p>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                            <div
                                                className="bg-linear-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                                                style={{ width: `${score.getScorePercentage?.() || 0}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="ml-6 text-right">
                                        <p className="text-2xl font-bold text-gray-900">{score.score}</p>
                                        <p className="text-xs text-gray-500">Grade: {score.getGrade?.() || '-'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Time Info */}
                    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Informasi Waktu</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Mulai</p>
                                <p className="font-medium text-gray-900">{new Date(testSession.started_at).toLocaleString('id-ID')}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Selesai</p>
                                <p className="font-medium text-gray-900">{new Date(testSession.finished_at).toLocaleString('id-ID')}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Durasi</p>
                                <p className="font-medium text-gray-900">{testSession.formatted_time_elapsed || '-'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Status</p>
                                <p className="font-medium text-gray-900">{testSession.status === 'completed' ? 'Selesai' : 'Timeout'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Answer Details Toggle */}
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Detail Jawaban</h3>
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                {showDetails ? 'Sembunyikan' : 'Tampilkan'}
                            </button>
                        </div>

                        {showDetails && (
                            <div className="space-y-4">
                                {testSession.test_answers?.map((answer, idx) => {
                                    const question = answer.test_question;
                                    const isCorrect = answer.is_correct;
                                    const isMultipleChoice = question.question_type === 'multiple_choice';

                                    return (
                                        <div key={answer.id} className={`p-4 rounded-lg border-2 ${
                                            isCorrect ? 'border-green-200 bg-green-50' : 
                                            !isMultipleChoice ? 'border-gray-200 bg-gray-50' :
                                            'border-red-200 bg-red-50'
                                        }`}>
                                            <div className="flex items-start gap-3 mb-2">
                                                <span className="shrink-0 w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-xs font-bold">
                                                    {idx + 1}
                                                </span>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900 mb-1">{question.question_text}</p>
                                                    <p className="text-xs text-gray-500">Kategori: {question.test_category?.name} • {question.points} poin</p>
                                                </div>
                                                {isMultipleChoice && (
                                                    <span className={`shrink-0 text-xl ${isCorrect ? '✅' : '❌'}`}>
                                                        {isCorrect ? '✅' : '❌'}
                                                    </span>
                                                )}
                                            </div>

                                            {isMultipleChoice ? (
                                                <div className="ml-9 space-y-1 text-sm">
                                                    <p className="text-gray-700">
                                                        <span className="font-semibold">Jawaban Anda:</span>{' '}
                                                        <span className={isCorrect ? 'text-green-700 font-bold' : 'text-red-700 font-bold'}>
                                                            {answer.getAnswerDisplay?.() || '-'}
                                                        </span>
                                                    </p>
                                                    {!isCorrect && (
                                                        <p className="text-green-700">
                                                            <span className="font-semibold">Jawaban Benar:</span>{' '}
                                                            <span className="font-bold">{answer.getCorrectAnswerDisplay?.() || '-'}</span>
                                                        </p>
                                                    )}
                                                    <p className="text-gray-600">
                                                        <span className="font-semibold">Poin:</span> {answer.points_earned || 0} / {question.points}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="ml-9 text-sm">
                                                    <p className="text-gray-700">
                                                        <span className="font-semibold">Jawaban Anda:</span>
                                                    </p>
                                                    <p className="mt-1 p-3 bg-white rounded border border-gray-200 text-gray-900">
                                                        {answer.answer || '(Tidak dijawab)'}
                                                    </p>
                                                    <p className="text-gray-500 text-xs mt-2">
                                                        Essay akan dinilai manual oleh tim
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 text-center">
                        <Link
                            href="/dashboard"
                            className="inline-block px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-lg"
                        >
                            Kembali ke Dashboard
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
}
