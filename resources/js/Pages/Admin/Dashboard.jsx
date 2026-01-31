import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';

export default function AdminDashboard() {
    const { auth } = usePage().props;

    const handleLogout = async (e) => {
        e.preventDefault();
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        try {
            await axios.post('/logout', {}, { headers: { 'X-CSRF-TOKEN': token }, withCredentials: true });
            window.location.href = '/admin/dashboard';
        } catch (err) {
            console.error(err.response || err);
            alert('Logout failed: ' + (err.response?.status || err.message));
        }
    };

    const stats = [
        {
            name: 'Total Pendaftar',
            value: '1,234',
            icon: '👥',
            color: 'bg-blue-500',
        },
        {
            name: 'Sudah Bayar',
            value: '892',
            icon: '💳',
            color: 'bg-green-500',
        },
        {
            name: 'Test Selesai',
            value: '567',
            icon: '✅',
            color: 'bg-purple-500',
        },
        {
            name: 'Diterima',
            value: '345',
            icon: '🎉',
            color: 'bg-yellow-500',
        },
    ];

    return (
        <>
            <Head title="Admin Dashboard" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Navbar */}
                <nav className="bg-indigo-600 shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-xl font-bold text-white">
                                    Admin - PMB System
                                </h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-indigo-100">
                                    Admin: <span className="font-semibold text-white">{auth.user.name}</span>
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-lg hover:bg-indigo-50 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Dashboard Admin</h2>
                        <p className="text-gray-600 mt-2">Kelola sistem Penerimaan Mahasiswa Baru</p>
                    </div>

                    {/* Stats Grid */}
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

                    {/* Management Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1: Kelola Prodi */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Kelola Program Studi</h3>
                            <p className="text-gray-600 text-sm mb-4">Tambah, edit, hapus program studi</p>
                            <button className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition">
                                Kelola
                            </button>
                        </div>

                        {/* Card 2: Kelola Periode */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Periode Pendaftaran</h3>
                            <p className="text-gray-600 text-sm mb-4">Atur periode dan timeline PMB</p>
                            <button className="w-full px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition">
                                Kelola
                            </button>
                        </div>

                        {/* ... other cards ... */}
                    </div>
                </div>
            </div>
        </>
    );
}
