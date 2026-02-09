import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    const avatarUrl = auth.user.avatar_path ? `/storage/${auth.user.avatar_path}` : null;

    return (
        <>
            <Head title="Dashboard" />
            
            <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-50">
                {/* Enhanced Navbar */}
                <nav className="bg-white shadow-lg border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-20">
                            {/* Left Side - Logo & Brand */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                            PMB System
                                        </h1>
                                        <p className="text-xs text-gray-500">Universitas Orbyte</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - User Menu */}
                            <div className="flex items-center gap-4">
                                {/* Notifications */}
                                <button className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>

                                {/* User Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center gap-3 pl-3 pr-4 py-2 rounded-xl hover:bg-gray-50 transition"
                                    >
                                        {avatarUrl ? (
                                            <img
                                                src={avatarUrl}
                                                alt={auth.user.name}
                                                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                                                {auth.user.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        
                                        <div className="text-left hidden md:block">
                                            <p className="text-sm font-semibold text-gray-900">{auth.user.name}</p>
                                            <p className="text-xs text-gray-500">Calon Mahasiswa</p>
                                        </div>

                                        <svg 
                                            className={`w-4 h-4 text-gray-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {dropdownOpen && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20">
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <p className="text-sm font-semibold text-gray-900">{auth.user.name}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{auth.user.email}</p>
                                                </div>

                                                <div className="py-2">
                                                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        Profil Saya
                                                    </Link>
                                                    <Link href="/registration" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        Pendaftaran
                                                    </Link>
                                                    <Link href="/announcement" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                                        </svg>
                                                        Pengumuman
                                                    </Link>
                                                    <Link href="/student-card" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                                        </svg>
                                                        Kartu Mahasiswa
                                                    </Link>
                                                </div>

                                                <div className="border-t border-gray-100 pt-2">
                                                    <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    {/* Welcome Banner */}
                    <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Selamat Datang, {auth.user.name}! 👋</h2>
                                <p className="text-white/90 text-lg">Kelola proses pendaftaran Anda dengan mudah dan cepat</p>
                            </div>
                            <div className="hidden lg:block">
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                    <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature Cards - First Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {/* Existing cards... (keeping them all) */}
                        <Link href="/registration" className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">Pendaftaran</h3>
                            <p className="text-gray-600 text-sm mb-4">Daftar atau lihat status pendaftaran Anda</p>
                            <div className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 group-hover:gap-3 transition-all">
                                Mulai Sekarang
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>

                        <Link href="/payment" className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-linear-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition">Pembayaran</h3>
                            <p className="text-gray-600 text-sm mb-4">Upload bukti pembayaran pendaftaran</p>
                            <div className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-600 group-hover:gap-3 transition-all">
                                Bayar Sekarang
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>

                        <Link href="/test" className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition">Test Online</h3>
                            <p className="text-gray-600 text-sm mb-4">Ikuti tes seleksi online</p>
                            <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 group-hover:gap-3 transition-all">
                                Mulai Tes
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    </div>

                    {/* Feature Cards - Second Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Link href="/announcement" className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">Pengumuman</h3>
                            <p className="text-gray-600 text-sm mb-4">Lihat hasil seleksi</p>
                            <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
                                Lihat Hasil →
                            </div>
                        </Link>

                        <Link href="/re-registration" className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition">Daftar Ulang</h3>
                            <p className="text-gray-600 text-sm mb-4">Konfirmasi kehadiran</p>
                            <div className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 group-hover:gap-3 transition-all">
                                Daftar Ulang →
                            </div>
                        </Link>

                        <Link href="/student-card" className="group bg-linear-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-teal-300 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Kartu Mahasiswa 🎓</h3>
                            <p className="text-white/90 text-sm mb-4">Cetak kartu mahasiswa</p>
                            <div className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
                                Cetak Kartu →
                            </div>
                        </Link>

                        <Link href="/profile" className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-linear-to-br from-gray-500 to-gray-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition">Profil Saya</h3>
                            <p className="text-gray-600 text-sm mb-4">Kelola akun Anda</p>
                            <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 group-hover:gap-3 transition-all">
                                Lihat Profil →
                            </div>
                        </Link>
                    </div>

                    {/* Info Banner */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                        <div className="flex items-start gap-4">
                            <div className="shrink-0">
                                <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Alur Lengkap Pendaftaran</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <span className="shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                        <span>Isi biodata lengkap</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                        <span>Pilih program studi (max 3)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                        <span>Upload dokumen persyaratan</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                                        <span>Bayar biaya pendaftaran</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                                        <span>Ikuti tes seleksi online</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">6</span>
                                        <span>Lihat pengumuman hasil</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">7</span>
                                        <span className="font-semibold">Daftar ulang (jika diterima)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-bold">8</span>
                                        <span className="font-semibold">Cetak kartu mahasiswa 🎓</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}