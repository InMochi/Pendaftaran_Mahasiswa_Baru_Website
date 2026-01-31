import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <>
            <Head title="Dashboard" />
            
            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-xl font-bold text-gray-900">PMB System</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-700">
                                    Halo, <span className="font-semibold">{auth.user.name}</span>
                                </span>
                                <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang! 👋</h2>
                        <p className="text-gray-600">Anda login sebagai: <span className="font-semibold">{auth.user.email}</span></p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pendaftaran</h3>
                            <p className="text-gray-600 text-sm mb-4">Daftar atau lihat status pendaftaran Anda</p>
                            <Link href="/registration" className="inline-block px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition">
                                Lihat Pendaftaran
                            </Link>
                        </div>

                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pembayaran</h3>
                            <p className="text-gray-600 text-sm mb-4">Upload bukti pembayaran pendaftaran</p>
                            <Link href="/payment" className="inline-block px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition">
                                Bayar Sekarang
                            </Link>
                        </div>

                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Online</h3>
                            <p className="text-gray-600 text-sm mb-4">Ikuti tes seleksi online</p>
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-lg cursor-not-allowed">Belum Tersedia</button>
                        </div>

                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pengumuman</h3>
                            <p className="text-gray-600 text-sm mb-4">Lihat hasil seleksi penerimaan</p>
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-lg cursor-not-allowed">Belum Tersedia</button>
                        </div>

                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Profil Saya</h3>
                            <p className="text-gray-600 text-sm mb-4">Kelola informasi akun Anda</p>
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-lg cursor-not-allowed">Belum Tersedia</button>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md p-6 border border-indigo-100">
                            <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Alur Pendaftaran</h3>
                            <p className="text-gray-700 text-sm">
                                1. Isi biodata<br />
                                2. Pilih prodi<br />
                                3. Upload dokumen<br />
                                4. Bayar<br />
                                5. Ikuti tes<br />
                                6. Tunggu pengumuman
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
