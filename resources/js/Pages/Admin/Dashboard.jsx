import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function AdminDashboard() {
    const { auth } = usePage().props;
    const [activeFilter, setActiveFilter] = useState('all');

    const handleLogout = () => {
        router.post('/logout');
    };


    const managementCards = [
        {
            title: 'Kelola Program Studi',
            description: 'Tambah, edit, hapus program studi dan kelola kuota penerimaan',
            href: '/admin/study-programs',
            iconBg: 'from-indigo-500 to-indigo-600',
            category: 'master',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
        },
        {
            title: 'Periode Pendaftaran',
            description: 'Atur periode aktif, timeline, dan pengaturan PMB',
            href: '/admin/registration-periods',
            iconBg: 'from-green-500 to-emerald-600',
            category: 'master',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            title: 'Kategori Tes',
            description: 'Kelola kategori tes, durasi, dan pengaturan penilaian',
            href: '/admin/test-categories',
            iconBg: 'from-purple-500 to-purple-600',
            category: 'master',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
        },
        {
            title: 'Bank Soal',
            description: 'Kelola soal pilihan ganda dan essay untuk tes seleksi',
            href: '/admin/test-questions',
            iconBg: 'from-amber-500 to-orange-600',
            category: 'master',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        {
            title: 'Verifikasi Pembayaran',
            description: 'Review dan validasi bukti pembayaran dari peserta',
            href: '/admin/payments',
            iconBg: 'from-rose-500 to-red-600',
            category: 'process',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            title: 'Pengumuman Hasil',
            description: 'Generate dan publikasikan pengumuman hasil seleksi',
            href: '/admin/announcements',
            iconBg: 'from-sky-500 to-blue-600',
            category: 'process',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
            ),
        },
        {
            title: 'Verifikasi Daftar Ulang',
            description: 'Verifikasi dokumen dan kelola proses daftar ulang',
            href: '/admin/re-registrations',
            iconBg: 'from-teal-500 to-cyan-600',
            category: 'process',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
    ];

    const filteredCards = activeFilter === 'all' 
        ? managementCards 
        : managementCards.filter(card => card.category === activeFilter);

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-50">
                {/* Enhanced Navbar */}
                <nav className="bg-white shadow-lg border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-20">
                            <div className="flex items-center gap-4">
                                {/* Logo/Brand */}
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        PMB Admin Panel
                                        </h1>
                                        <p className="text-xs text-gray-500">Universitas Orbyte</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Notifications */}
                                <button className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>

                                {/* User Menu */}
                                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">{auth.user.name}</p>
                                        <p className="text-xs text-gray-500">Administrator</p>
                                    </div>
                                    <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <button 
                                        onClick={handleLogout} 
                                        className="ml-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
                                <p className="text-gray-600 mt-2 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Sistem PMB aktif dan berjalan normal
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Export Data
                                </button>
                            </div>
                        </div>
                    </div>




                    <div className="flex items-center gap-3 mb-6 bg-white rounded-xl p-2 shadow-sm border border-gray-200">
                        <button
                            onClick={() => setActiveFilter('all')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                activeFilter === 'all'
                                    ? 'bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            Semua
                        </button>
                        <button
                            onClick={() => setActiveFilter('master')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                activeFilter === 'master'
                                    ? 'bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            Master Data
                        </button>
                        <button
                            onClick={() => setActiveFilter('process')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                activeFilter === 'process'
                                    ? 'bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            Proses
                        </button>
                    </div>

                    {/* Enhanced Management Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCards.map((card, index) => (
                            <div key={index} className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 bg-linear-to-br ${card.iconBg} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <div className="text-white">
                                                {card.icon}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            {card.badge && (
                                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                                                    {card.badge}
                                                </span>
                                            )}
                                            <span className="text-2xl font-bold text-gray-900">{card.count}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                        {card.description}
                                    </p>

                                    <Link 
                                        href={card.href} 
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition group-hover:gap-3"
                                    >
                                        Kelola Sekarang
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Butuh Bantuan?</h3>
                                <p className="text-white/90">Akses dokumentasi lengkap atau hubungi support tim</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:shadow-2xl transition">
                                    Dokumentasi
                                </button>
                                <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/30 transition">
                                    Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}