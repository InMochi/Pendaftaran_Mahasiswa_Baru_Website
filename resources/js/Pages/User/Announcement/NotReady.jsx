import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function NotReady({ registration }) {
    return (
        <>
            <Head title="Pengumuman Belum Tersedia" />
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Pengumuman Belum Tersedia</h2>
                    <p className="text-gray-600 mb-6">
                        Pengumuman hasil seleksi belum dipublikasikan. Silakan tunggu informasi lebih lanjut dari panitia PMB.
                    </p>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-blue-800">
                            <strong>Status Anda:</strong> Test selesai<br />
                            <strong>No. Registrasi:</strong> {registration.registration_number}
                        </p>
                    </div>

                    <Link
                        href="/dashboard"
                        className="inline-block w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
                    >
                        Kembali ke Dashboard
                    </Link>

                    <p className="text-xs text-gray-500 mt-4">
                        Pengumuman akan muncul di dashboard setelah panitia mempublikasikannya.
                    </p>
                </div>
            </div>
        </>
    );
}
