import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';

export default function Dashboard() {
    const { auth } = usePage().props;

    const handleLogout = async (e) => {
        e.preventDefault();
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        try {
            await axios.post('/logout', {}, { headers: { 'X-CSRF-TOKEN': token }, withCredentials: true });
            window.location.href = '/';
        } catch (err) {
            console.error(err.response || err);
            alert('Logout failed: ' + (err.response?.status || err.message));
        }
    };

    return (
        <>
            <Head title="Dashboard" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Navbar */}
                <nav className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-xl font-bold text-gray-900">
                                    PMB System
                                </h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-700">
                                    Halo, <span className="font-semibold">{auth.user.name}</span>
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Content */}
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    {/* Welcome Card */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Selamat Datang! 👋
                        </h2>
                        <p className="text-gray-600">
                            Anda login sebagai: <span className="font-semibold">{auth.user.email}</span>
                        </p>
                    </div>

                    {/* Action Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1: Pendaftaran Baru */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Pendaftaran Baru
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Mulai proses pendaftaran mahasiswa baru
                            </p>
                            <Link
                                href="/registration"
                                className="inline-block px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
                            >
                                Mulai Daftar
                            </Link>
                        </div>

                        {/* Card 2: Status Pendaftaran */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Status Pendaftaran
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Cek status dan progress pendaftaran
                            </p>
                            <Link
                                href="/registration/status"
                                className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
                            >
                                Lihat Status
                            </Link>
                        </div>

                        {/* Card 3: Test Online */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Test Online
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Ikuti tes seleksi online
                            </p>
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-lg cursor-not-allowed">
                                Belum Tersedia
                            </button>
                        </div>

                        {/* Card 4: Pembayaran */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Pembayaran
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Upload bukti pembayaran pendaftaran
                            </p>
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-lg cursor-not-allowed">
                                Belum Tersedia
                            </button>
                        </div>

                        {/* Card 5: Pengumuman */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Pengumuman
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Lihat hasil seleksi penerimaan
                            </p>
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-lg cursor-not-allowed">
                                Belum Tersedia
                            </button>
                        </div>

                        {/* Card 6: Profil */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Profil Saya
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Kelola informasi akun Anda
                            </p>
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-lg cursor-not-allowed">
                                Belum Tersedia
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
