import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function RegistrationIndex({ registration, activePeriod, completionPercentage }) {
    if (!activePeriod) {
        return (
            <>
                <Head title="Pendaftaran" />
                <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Periode Pendaftaran</h2>
                        <p className="text-gray-600 text-sm mb-6">
                            Saat ini tidak ada periode pendaftaran yang dibuka. Silakan cek kembali nanti.
                        </p>
                        <Link href="/dashboard" className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                            Kembali ke Dashboard
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    if (!registration) {
        return (
            <>
                <Head title="Pendaftaran" />
                <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
                    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang di PMB Orbyte {activePeriod.academic_year}</h1>
                            <p className="text-gray-600 font-bold">{activePeriod.name}</p>
                        </div>

                        <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Periode Pendaftaran:</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Mulai</p>
                                    <p className="font-medium text-gray-900">{new Date(activePeriod.registration_start).toLocaleDateString('id-ID')}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Berakhir</p>
                                    <p className="font-medium text-gray-900">{new Date(activePeriod.registration_end).toLocaleDateString('id-ID')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-8">
                            <h3 className="font-semibold text-gray-900">Alur Pendaftaran:</h3>
                            {[
                                'Isi biodata lengkap',
                                'Pilih program studi (max 3)',
                                'Upload dokumen persyaratan',
                                'Review & submit pendaftaran',
                                'Lakukan pembayaran',
                                'Ikuti tes online',
                                'Tunggu pengumuman hasil',
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                                        {i + 1}
                                    </span>
                                    <p className="text-gray-700 text-sm">{step}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => router.post('/registration/create')}
                            className="block w-full text-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-lg"
                        >
                            Mulai Pendaftaran
                        </button>
                    </div>
                </div>
            </>
        );
    }

    // Has registration - show status
    const statusInfo = {
        draft: { label: 'Draft', color: 'bg-gray-100 text-gray-700', icon: '📝' },
        submitted: { label: 'Menunggu Pembayaran', color: 'bg-yellow-100 text-yellow-700', icon: '⏳' },
        payment_pending: { label: 'Pembayaran Diverifikasi', color: 'bg-blue-100 text-blue-700', icon: '💳' },
        payment_verified: { label: 'Siap Tes', color: 'bg-green-100 text-green-700', icon: '✅' },
        test_completed: { label: 'Tes Selesai', color: 'bg-purple-100 text-purple-700', icon: '🎯' },
        passed: { label: 'Lulus Seleksi', color: 'bg-green-100 text-green-700', icon: '🎉' },
        failed: { label: 'Tidak Lulus', color: 'bg-red-100 text-red-700', icon: '❌' },
    };

    const status = statusInfo[registration.status] || statusInfo.draft;

    return (
        <>
            <Head title="Status Pendaftaran" />
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 py-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Status Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-1">Status Pendaftaran</h1>
                                <p className="text-gray-500 text-sm">No. {registration.registration_number}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-full font-semibold text-sm ${status.color}`}>
                                {status.icon} {status.label}
                            </span>
                        </div>

                        {/* Progress Bar */}
                        {registration.status === 'draft' && (
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Kelengkapan Data</span>
                                    <span className="text-sm font-bold text-indigo-600">{completionPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-linear-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all"
                                        style={{ width: `${completionPercentage}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {registration.status === 'draft' && (
                                <Link
                                    href="/registration/biodata"
                                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition text-center"
                                >
                                    Lanjutkan Pendaftaran
                                </Link>
                            )}
                            {registration.status === 'submitted' && (
                                <Link
                                    href="/payment"
                                    className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition text-center"
                                >
                                    Bayar Sekarang
                                </Link>
                            )}
                            {['payment_verified', 'payment_pending'].includes(registration.status) && (
                                <Link
                                    href="/test"
                                    className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition text-center"
                                >
                                    Mulai Tes
                                </Link>
                            )}
                            <Link
                                href="/dashboard"
                                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-center"
                            >
                                Kembali
                            </Link>
                        </div>
                    </div>

                    {/* Data Summary */}
                    {registration.biodata && (
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Ringkasan Data</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Nama</p>
                                    <p className="font-medium text-gray-900">{registration.biodata.full_name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">No Handphone</p>
                                    <p className="font-medium text-gray-900">{registration.biodata.phone}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Pilihan Pertama</p>
                                    <p className="font-medium text-gray-900">{registration.study_program_choices?.[0]?.study_program?.name || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Dokumen Terupload</p>
                                    <p className="font-medium text-gray-900">{registration.documents?.length || 0} file</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
