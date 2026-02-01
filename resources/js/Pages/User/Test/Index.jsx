import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function TestIndex({ registration, testSession, categories }) {
    const handleStart = () => {
        if (!confirm('Mulai tes sekarang? Timer akan langsung berjalan.')) return;
        router.post('/test/start');
    };

    const totalQuestions = categories.reduce((sum, cat) => sum + cat.active_questions_count, 0);
    const totalDuration = categories.reduce((sum, cat) => sum + cat.duration_minutes, 0);

    if (testSession) {
        if (testSession.status === 'in_progress') {
            return (
                <>
                    <Head title="Test Online" />
                    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
                        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Tes Sedang Berlangsung</h2>
                            <p className="text-gray-600 text-sm mb-6">Anda memiliki tes yang sedang berjalan.</p>
                            <Link href="/test/take" className="inline-block px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition shadow-lg">
                                Lanjutkan Tes
                            </Link>
                        </div>
                    </div>
                </>
            );
        }

        if (testSession.status === 'completed' || testSession.status === 'timeout') {
            return (
                <>
                    <Head title="Test Selesai" />
                    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
                        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Test Selesai</h2>
                            <p className="text-gray-600 text-sm mb-6">Anda sudah menyelesaikan tes.</p>
                            <Link href="/test/result" className="inline-block px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg">
                                Lihat Hasil
                            </Link>
                        </div>
                    </div>
                </>
            );
        }
    }

    return (
        <>
            <Head title="Test Online" />
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
                <header className="bg-white shadow-sm border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Test Online</h1>
                                <p className="text-sm text-gray-500">No. {registration.registration_number}</p>
                            </div>
                            <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                ← Kembali
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasi Test</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-xl p-6 text-center border border-purple-100">
                                <div className="text-4xl font-bold text-purple-600 mb-2">{totalQuestions}</div>
                                <p className="text-sm text-gray-600">Total Soal</p>
                            </div>
                            <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center border border-blue-100">
                                <div className="text-4xl font-bold text-blue-600 mb-2">{totalDuration}</div>
                                <p className="text-sm text-gray-600">Menit</p>
                            </div>
                            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-100">
                                <div className="text-4xl font-bold text-green-600 mb-2">{categories.length}</div>
                                <p className="text-sm text-gray-600">Kategori</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <h3 className="font-bold text-gray-900">Kategori Test:</h3>
                            {categories.map(cat => (
                                <div key={cat.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-gray-900">{cat.name}</p>
                                        <p className="text-sm text-gray-500">{cat.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">{cat.active_questions_count} soal</p>
                                        <p className="text-xs text-gray-500">{cat.duration_minutes} menit</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <h3 className="font-bold text-yellow-800 mb-2">⚠️ Perhatian:</h3>
                            <ul className="text-sm text-yellow-700 space-y-1">
                                <li>• Timer akan mulai berjalan setelah Anda klik "Mulai Test"</li>
                                <li>• Jawaban akan tersimpan otomatis setiap kali Anda memilih/mengisi</li>
                                <li>• Test tidak bisa diulang setelah selesai</li>
                                <li>• Pastikan koneksi internet stabil</li>
                                <li>• Kerjakan dengan jujur dan teliti</li>
                            </ul>
                        </div>

                        <button
                            onClick={handleStart}
                            className="w-full px-8 py-4 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-indigo-700 transition shadow-lg"
                        >
                            🚀 Mulai Test Sekarang
                        </button>
                    </div>
                </main>
            </div>
        </>
    );
}
