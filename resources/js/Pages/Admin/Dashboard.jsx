import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function AdminDashboard() {
    const { auth } = usePage().props;

    const handleLogout = () => {
        router.post('/logout');
    };

    const stats = [
        { name: 'Total Pendaftar',  value: '1,234', icon: '👥', color: 'bg-blue-500' },
        { name: 'Sudah Bayar',      value: '892',   icon: '💳', color: 'bg-green-500' },
        { name: 'Test Selesai',     value: '567',   icon: '✅', color: 'bg-purple-500' },
        { name: 'Diterima',         value: '345',   icon: '🎉', color: 'bg-yellow-500' },
    ];

    const managementCards = [
        {
            title: 'Kelola Program Studi',
            description: 'Tambah, edit, hapus program studi',
            href: '/admin/study-programs',
            iconBg: 'bg-indigo-100',
            iconColor: 'text-indigo-600',
            btnColor: 'bg-indigo-600 hover:bg-indigo-700',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
        },
        {
            title: 'Periode Pendaftaran',
            description: 'Atur periode dan timeline PMB',
            href: '/admin/registration-periods',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            btnColor: 'bg-green-600 hover:bg-green-700',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            title: 'Kategori Tes',
            description: 'Kelola kategori dan durasi tes',
            href: '/admin/test-categories',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
            btnColor: 'bg-purple-600 hover:bg-purple-700',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
        },
        {
            title: 'Bank Soal',
            description: 'Tambah dan kelola soal tes seleksi',
            href: '/admin/test-questions',
            iconBg: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            btnColor: 'bg-yellow-600 hover:bg-yellow-700',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        {
            title: 'Verifikasi Pembayaran',
            description: 'Validasi bukti pembayaran peserta',
            href: '/admin/payments',
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
            btnColor: 'bg-red-600 hover:bg-red-700',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            title: 'Pengumuman Hasil',
            description: 'Kelola pengumuman hasil seleksi',
            href: null,
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            btnColor: null,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
            ),
        },
    ];

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen bg-gray-50">
                <nav className="bg-indigo-600 shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-xl font-bold text-white">Admin - PMB System</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-indigo-100">
                                    Admin: <span className="font-semibold text-white">{auth.user.name}</span>
                                </span>
                                <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-lg hover:bg-indigo-50 transition">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Dashboard Admin</h2>
                        <p className="text-gray-600 mt-2">Kelola sistem Penerimaan Mahasiswa Baru</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">{stat.name}</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                    </div>
                                    <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center text-3xl`}>
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {managementCards.map((card, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 flex flex-col">
                                <div className={`flex items-center justify-center w-12 h-12 ${card.iconBg} rounded-full mb-4`}>
                                    <span className={card.iconColor}>{card.icon}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 flex-1">{card.description}</p>

                                {card.href ? (
                                    <Link href={card.href} className={`w-full text-center px-4 py-2 text-white text-sm font-medium rounded-lg transition ${card.btnColor}`}>
                                        Kelola
                                    </Link>
                                ) : (
                                    <button disabled className="w-full px-4 py-2 bg-gray-200 text-gray-400 text-sm font-medium rounded-lg cursor-not-allowed">
                                        Belum Tersedia
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}