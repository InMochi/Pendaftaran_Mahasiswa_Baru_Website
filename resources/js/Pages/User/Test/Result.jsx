import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function TestResult({ registration, testSession, totalQuestions, answeredQuestions }) {
    const [showAnswers, setShowAnswers] = useState(false);

    return (
        <>
            <Head title="Test Selesai" />
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
                <header className="bg-white shadow-sm border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Test Selesai</h1>
                                <p className="text-sm text-gray-500">No. {registration.registration_number}</p>
                            </div>
                            <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                ← Kembali
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Success Banner - No Score Shown */}
                    <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 mb-6 text-white text-center">
                        <div className="text-6xl mb-4">✅</div>
                        <h2 className="text-3xl font-bold mb-2">Test Berhasil Diselesaikan!</h2>
                        <p className="text-lg opacity-90 mb-6">
                            Terima kasih telah menyelesaikan tes seleksi. Jawaban Anda telah tersimpan dengan baik.
                        </p>
                        <div className="inline-block bg-white/20 backdrop-blur-sm rounded-xl px-8 py-4">
                            <p className="text-sm opacity-90 mb-1">Status Test</p>
                            <p className="text-2xl font-bold">SELESAI</p>
                        </div>
                    </div>

                    {/* Info Cards - Basic Stats Only */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <p className="text-sm text-gray-500 mb-1">Total Soal</p>
                            <p className="text-3xl font-bold text-gray-900">{totalQuestions}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <p className="text-sm text-gray-500 mb-1">Soal Terjawab</p>
                            <p className="text-3xl font-bold text-blue-600">{answeredQuestions}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <p className="text-sm text-gray-500 mb-1">Status</p>
                            <p className="text-lg font-bold text-green-600">Completed ✓</p>
                        </div>
                    </div>

                    {/* Time Info */}
                    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Informasi Waktu</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Mulai</p>
                                <p className="font-medium text-gray-900">
                                    {new Date(testSession.started_at).toLocaleString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500">Selesai</p>
                                <p className="font-medium text-gray-900">
                                    {new Date(testSession.finished_at).toLocaleString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500">Durasi</p>
                                <p className="font-medium text-gray-900">{testSession.formatted_time_elapsed || '-'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Metode Selesai</p>
                                <p className="font-medium text-gray-900">
                                    {testSession.status === 'completed' ? 'Submit Manual' : 'Auto Submit (Timeout)'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Important Notice - No Score Revealed */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h4 className="font-bold text-blue-900 mb-2">Informasi Penting</h4>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Jawaban Anda telah tersimpan dengan aman di sistem</li>
                                    <li>• Hasil tes akan diproses oleh tim panitia</li>
                                    <li>• <strong>Nilai dan status kelulusan</strong> akan diumumkan melalui menu <strong>Pengumuman</strong></li>
                                    <li>• Harap tunggu pengumuman resmi dari panitia Orbyte</li>
                                    <li>• Pastikan Anda cek menu Pengumuman secara berkala</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Answer Review - WITHOUT Correct/Wrong Indicator */}
                    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Review Jawaban Anda</h3>
                            <button
                                onClick={() => setShowAnswers(!showAnswers)}
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                {showAnswers ? 'Sembunyikan' : 'Tampilkan'}
                            </button>
                        </div>

                        {showAnswers && (
                            <div className="space-y-4">
                                {testSession.test_answers?.map((answer, idx) => {
                                    const question = answer.test_question;
                                    const isMultipleChoice = question.question_type === 'multiple_choice';

                                    return (
                                        <div key={answer.id} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                                            <div className="flex items-start gap-3 mb-3">
                                                <span className="shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold">
                                                    {idx + 1}
                                                </span>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900 mb-2">{question.question_text}</p>
                                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                                                            {question.test_category?.name}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{question.question_type === 'multiple_choice' ? 'Pilihan Ganda' : 'Essay'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="ml-11">
                                                {isMultipleChoice ? (
                                                    <div className="space-y-2">
                                                        <p className="text-sm text-gray-700">
                                                            <span className="font-semibold">Jawaban Anda:</span>
                                                        </p>
                                                        <div className="p-3 bg-white rounded-lg border border-indigo-200">
                                                            <p className="font-medium text-gray-900">
                                                                {answer.answer ? (
                                                                    <>
                                                                        <span className="inline-block w-6 h-6 bg-indigo-100 text-indigo-700 rounded text-center font-bold mr-2">
                                                                            {answer.answer}
                                                                        </span>
                                                                        {answer.answer === 'a' && question.option_a}
                                                                        {answer.answer === 'b' && question.option_b}
                                                                        {answer.answer === 'c' && question.option_c}
                                                                        {answer.answer === 'd' && question.option_d}
                                                                        {answer.answer === 'e' && question.option_e}
                                                                    </>
                                                                ) : (
                                                                    <span className="text-gray-400 italic">Tidak dijawab</span>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        <p className="text-sm text-gray-700">
                                                            <span className="font-semibold">Jawaban Anda:</span>
                                                        </p>
                                                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                                                            <p className="text-gray-900 text-sm whitespace-pre-wrap">
                                                                {answer.answer || <span className="text-gray-400 italic">Tidak dijawab</span>}
                                                            </p>
                                                        </div>
                                                        <p className="text-xs text-gray-500 italic mt-1">
                                                            * Jawaban essay akan dinilai oleh tim penguji
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {!showAnswers && (
                            <div className="text-center py-8 text-gray-500 text-sm">
                                Klik "Tampilkan" untuk melihat review jawaban Anda
                            </div>
                        )}
                    </div>

                    {/* Next Steps */}
                    <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6 mb-6">
                        <h4 className="font-bold text-green-900 mb-3">Langkah Selanjutnya</h4>
                        <div className="space-y-2 text-sm text-green-800">
                            <div className="flex items-start gap-2">
                                <span className="shrink-0 w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                <p>Tunggu pengumuman hasil seleksi dari panitia Orbyte</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="shrink-0 w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                <p>Cek menu <strong>Pengumuman</strong> secara berkala di dashboard</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="shrink-0 w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                <p>Hasil tes dan status kelulusan akan ditampilkan di menu Pengumuman</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="shrink-0 w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                                <p>Jika diterima, lakukan proses <strong>Daftar Ulang</strong></p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Link
                            href="/dashboard"
                            className="flex-1 px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-lg text-center"
                        >
                            Kembali ke Dashboard
                        </Link>
                        <Link
                            href="/announcement"
                            className="flex-1 px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg text-center"
                        >
                            Lihat Pengumuman
                        </Link>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 text-center">
                        <p className="text-sm text-gray-600 mb-2">
                            Ada pertanyaan? Hubungi panitia Orbyte
                        </p>
                        <div className="flex items-center justify-center gap-4 text-sm">
                            <a href="mailto:Orbyte@university.ac.id" className="text-indigo-600 hover:text-indigo-800 font-medium">
                                📧 Orbyte@university.ac.id
                            </a>
                            <span className="text-gray-300">|</span>
                            <a href="tel:02112345678" className="text-indigo-600 hover:text-indigo-800 font-medium">
                                📞 (021) 1234-5678
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}