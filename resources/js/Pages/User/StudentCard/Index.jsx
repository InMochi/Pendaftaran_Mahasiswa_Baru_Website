import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function StudentCardIndex({ user, registration, announcement, qrCode }) {
    const biodata = registration.biodata;
    const studyProgram = announcement.study_program;
    const avatarUrl = user.avatar_path ? `/storage/${user.avatar_path}` : null;

    const handlePrint = () => {
        router.get('/student-card/print');
    };

    return (
        <>
            <Head title="Kartu Mahasiswa" />

            <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">Kartu Mahasiswa</h1>
                            <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                ← Kembali
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Success Message */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="font-bold text-green-900 mb-1">Selamat! Kartu Mahasiswa Siap 🎉</h3>
                                <p className="text-sm text-green-800">
                                    Anda sudah terdaftar sebagai mahasiswa baru. Kartu mahasiswa Anda sudah dapat dicetak.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card Preview */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Preview Kartu Mahasiswa</h3>

                        {/* Student Card - Front */}
                        <div className="max-w-md mx-auto mb-8">
                            <div className="relative bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-1 shadow-2xl">
                                <div className="bg-white rounded-xl p-6">
                                    {/* Header */}
                                    <div className="text-center mb-4 pb-4 border-b-2 border-gray-200">
                                        <h4 className="text-lg font-bold text-gray-900">UNIVERSITAS ORBYTE</h4>
                                        <p className="text-xs text-gray-600 mt-1">KARTU MAHASISWA</p>
                                    </div>

                                    {/* Photo & Info */}
                                    <div className="flex gap-4 mb-4">
                                        {/* Photo */}
                                        <div className="shrink-0">
                                            {avatarUrl ? (
                                                <img
                                                    src={avatarUrl}
                                                    alt={biodata.full_name}
                                                    className="w-29 h-39 object-cover rounded-lg border-2 border-gray-300"
                                                />
                                            ) : (
                                                <div className="w-24 h-32 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-4xl font-bold border-2 border-gray-300">
                                                    {biodata.full_name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 text-sm">
                                            <div className="mb-2">
                                                <p className="text-xs text-gray-500">NIM</p>
                                                <p className="font-bold text-gray-900">{announcement.nim || registration.student_number || '—'}</p>
                                            </div>
                                            <div className="mb-2">
                                                <p className="text-xs text-gray-500">Nama</p>
                                                <p className="font-semibold text-gray-900 text-xs leading-tight">
                                                    {biodata.full_name}
                                                </p>
                                            </div>
                                            <div className="mb-2">
                                                <p className="text-xs text-gray-500">Program Studi</p>
                                                <p className="font-semibold text-gray-900 text-xs leading-tight">
                                                    {studyProgram.name}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Tahun Masuk</p>
                                                <p className="font-bold text-gray-900">{new Date().getFullYear()}</p>
                                            </div>
                                        </div>
                                        <div className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded-lg p-1">
                                            <div
                                                dangerouslySetInnerHTML={{ __html: qrCode }}
                                                className="w-full h-full"
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 text-center">
                                <p className="text-xs text-gray-500">* Kartu akan dicetak bolak-balik</p>
                            </div>
                        </div>

                        {/* Student Info Summary */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                            <h4 className="font-bold text-gray-900 mb-4">Informasi Mahasiswa</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">NIM</p>
                                    <p className="font-semibold text-gray-900">{announcement.nim || registration.student_number || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Nama Lengkap</p>
                                    <p className="font-semibold text-gray-900">{biodata.full_name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Tempat, Tanggal Lahir</p>
                                    <p className="font-semibold text-gray-900">
                                        {biodata.birth_place}, {new Date(biodata.birth_date).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Program Studi</p>
                                    <p className="font-semibold text-gray-900">{studyProgram.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Tahun Masuk</p>
                                    <p className="font-semibold text-gray-900">{new Date().getFullYear()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Status</p>
                                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                        Mahasiswa Aktif
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Print Button */}
                        <div className="flex gap-3">
                            <button
                                onClick={handlePrint}
                                className="flex-1 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-xl transition"
                            >
                                🖨️ Cetak Kartu Mahasiswa
                            </button>
                            <Link
                                href="/dashboard"
                                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-center"
                            >
                                Kembali
                            </Link>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <h4 className="font-bold text-blue-900 mb-3">Petunjuk Pencetakan</h4>
                        <ul className="text-sm text-blue-800 space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>Gunakan kertas PVC card atau kertas foto glossy ukuran 8.5 x 5.5 cm</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>Cetak dengan kualitas terbaik (High Quality/Best)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>Kartu akan dicetak bolak-balik (depan & belakang)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>Setelah dicetak, silakan laminasi untuk ketahanan</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>Kartu ini berlaku selama masa studi Anda</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
