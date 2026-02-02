import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function LandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const features = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            ),
            title: 'Pendaftaran Online',
            description: 'Daftar kapan saja, dimana saja tanpa perlu datang ke kampus. Proses cepat dan mudah.'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: 'Test Online',
            description: 'Ikuti tes seleksi secara online dengan sistem yang aman dan terintegrasi.'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: 'Hasil Instan',
            description: 'Dapatkan hasil tes dan pengumuman secara real-time melalui dashboard Anda.'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Pembayaran Mudah',
            description: 'Upload bukti pembayaran dan tracking status verifikasi dengan mudah.'
        },
    ];

    const timeline = [
        { step: '1', title: 'Registrasi Akun', desc: 'Buat akun dengan email aktif' },
        { step: '2', title: 'Isi Biodata', desc: 'Lengkapi data pribadi dan pilih program studi' },
        { step: '3', title: 'Upload Dokumen', desc: 'Upload berkas persyaratan pendaftaran' },
        { step: '4', title: 'Bayar', desc: 'Lakukan pembayaran dan upload bukti' },
        { step: '5', title: 'Test Online', desc: 'Ikuti tes seleksi secara online' },
        { step: '6', title: 'Pengumuman', desc: 'Lihat hasil seleksi di dashboard' },
        { step: '7', title: 'Daftar Ulang', desc: 'Konfirmasi kehadiran jika diterima' },
    ];

    const programs = [
        { name: 'Teknik Informatika', quota: 120, icon: '💻' },
        { name: 'Sistem Informasi', quota: 100, icon: '📊' },
        { name: 'Manajemen', quota: 150, icon: '📈' },
        { name: 'Akuntansi', quota: 130, icon: '💰' },
        { name: 'Desain Komunikasi Visual', quota: 80, icon: '🎨' },
        { name: 'Psikologi', quota: 90, icon: '🧠' },
    ];

    return (
        <>
            <Head title="Orbyte - Penerimaan Mahasiswa Baru" />

            <div className="min-h-screen bg-white">
                {/* Navbar */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        Orbyte UNIVERSITY
                                    </span>
                                </div>
                            </div>

                            {/* Desktop Menu */}
                            <div className="hidden md:flex items-center space-x-8">
                                <a href="#home" className="text-gray-700 hover:text-indigo-600 font-medium transition">Beranda</a>
                                <a href="#programs" className="text-gray-700 hover:text-indigo-600 font-medium transition">Program Studi</a>
                                <a href="#timeline" className="text-gray-700 hover:text-indigo-600 font-medium transition">Alur Pendaftaran</a>
                                <a href="#faq" className="text-gray-700 hover:text-indigo-600 font-medium transition">FAQ</a>
                                <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium transition">Login</Link>
                                <Link href="/register" className="px-5 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition">
                                    Daftar Sekarang
                                </Link>
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="text-gray-700 hover:text-indigo-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden border-t border-gray-200 bg-white">
                            <div className="px-4 py-3 space-y-3">
                                <a href="#home" className="block text-gray-700 hover:text-indigo-600 font-medium">Beranda</a>
                                <a href="#programs" className="block text-gray-700 hover:text-indigo-600 font-medium">Program Studi</a>
                                <a href="#timeline" className="block text-gray-700 hover:text-indigo-600 font-medium">Alur Pendaftaran</a>
                                <a href="#faq" className="block text-gray-700 hover:text-indigo-600 font-medium">FAQ</a>
                                <Link href="/login" className="block text-indigo-600 font-medium">Login</Link>
                                <Link href="/register" className="block px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg text-center">
                                    Daftar Sekarang
                                </Link>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <section id="home" className="pt-24 pb-16 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="text-center lg:text-left">
                                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                                    Wujudkan Impian
                                    <span className="block bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        Masa Depanmu!
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    Bergabunglah dengan ribuan mahasiswa yang telah memulai perjalanan pendidikan mereka bersama kami. 
                                    Daftar sekarang untuk tahun akademik 2026/2027!
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <Link 
                                        href="/register" 
                                        className="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transition transform hover:scale-105"
                                    >
                                        🚀 Daftar Sekarang
                                    </Link>
                                    <a 
                                        href="#timeline" 
                                        className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition"
                                    >
                                        Lihat Alur Pendaftaran
                                    </a>
                                </div>

                                <div className="mt-12 grid grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <p className="text-4xl font-bold text-indigo-600">1,000+</p>
                                        <p className="text-sm text-gray-600 mt-1">Mahasiswa Aktif</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-4xl font-bold text-purple-600">20+</p>
                                        <p className="text-sm text-gray-600 mt-1">Program Studi</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-4xl font-bold text-pink-600">95%</p>
                                        <p className="text-sm text-gray-600 mt-1">Tingkat Kepuasan</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                                    <div className="text-center mb-6">
                                        <div className="inline-block p-4 bg-linear-to-r from-indigo-500 to-purple-500 rounded-2xl mb-4">
                                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Pendaftaran Dibuka!</h3>
                                        <p className="text-gray-600">Tahun Akademik 2026/2027</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                                <span className="font-semibold text-gray-900">Status</span>
                                            </div>
                                            <span className="font-bold text-green-600">BUKA</span>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                            <span className="text-gray-700">Periode Pendaftaran</span>
                                            <span className="font-bold text-gray-900">Jan - Mar 2026</span>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                            <span className="text-gray-700">Kuota Tersedia</span>
                                            <span className="font-bold text-indigo-600">1,200+ Kursi</span>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                            <span className="text-gray-700">Biaya Pendaftaran</span>
                                            <span className="font-bold text-gray-900">Rp 200.000</span>
                                        </div>
                                    </div>

                                    <Link 
                                        href="/register"
                                        className="block mt-6 w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl text-center hover:shadow-xl transition"
                                    >
                                        Mulai Pendaftaran →
                                    </Link>
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-linear-to-br from-indigo-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-linear-to-br from-pink-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mengapa Pilih Kami?</h2>
                            <p className="text-xl text-gray-600">Sistem pendaftaran yang modern, mudah, dan terintegrasi</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="group p-6 bg-linear-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:shadow-xl hover:border-indigo-200 transition">
                                    <div className="inline-flex p-3 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl text-white mb-4 group-hover:scale-110 transition">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Programs Section */}
                <section id="programs" className="py-20 bg-linear-to-br from-gray-50 to-indigo-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Program Studi Unggulan</h2>
                            <p className="text-xl text-gray-600">Pilih program studi yang sesuai dengan minat dan bakatmu</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {programs.map((program, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition border border-gray-100">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="text-4xl">{program.icon}</div>
                                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
                                            {program.quota} Kursi
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4">Program studi terakreditasi dengan fasilitas lengkap dan dosen berkualitas.</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Terakreditasi A</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link 
                                href="/register"
                                className="inline-block px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition"
                            >
                                Lihat Semua Program Studi →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section id="timeline" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Alur Pendaftaran</h2>
                            <p className="text-xl text-gray-600">7 langkah mudah menuju kampus impianmu</p>
                        </div>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-linear-to-r from-indigo-200 via-purple-200 to-pink-200 transform -translate-y-1/2"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 relative">
                                {timeline.map((item, index) => (
                                    <div key={index} className="relative">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg relative z-10">
                                                {item.step}
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                            <p className="text-sm text-gray-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-16 bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
                            <div className="flex items-start gap-4">
                                <div className="shrink-0">
                                    <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Catatan Penting</h3>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <span className="text-indigo-600 mt-1">•</span>
                                            <span>Pastikan email yang didaftarkan aktif untuk menerima notifikasi</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-indigo-600 mt-1">•</span>
                                            <span>Siapkan dokumen dalam format PDF atau JPG maksimal 2MB per file</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-indigo-600 mt-1">•</span>
                                            <span>Biaya pendaftaran Rp 200.000 (non-refundable)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-indigo-600 mt-1">•</span>
                                            <span>Test online akan dilakukan setelah pembayaran terverifikasi</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="py-20 bg-linear-to-br from-indigo-50 to-purple-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pertanyaan Umum</h2>
                            <p className="text-xl text-gray-600">Temukan jawaban dari pertanyaan yang sering ditanyakan</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { q: 'Kapan periode pendaftaran dibuka?', a: 'Pendaftaran dibuka dari Januari hingga Maret 2026. Pastikan mendaftar sebelum batas akhir untuk tidak kehilangan kesempatan.' },
                                { q: 'Berapa biaya pendaftaran?', a: 'Biaya pendaftaran adalah Rp 200.000 (tidak dapat dikembalikan). Biaya ini sudah termasuk biaya tes seleksi.' },
                                { q: 'Bagaimana cara pembayaran?', a: 'Pembayaran dapat dilakukan via transfer bank. Setelah transfer, upload bukti pembayaran di dashboard Anda untuk diverifikasi admin.' },
                                { q: 'Berapa lama proses verifikasi?', a: 'Verifikasi pembayaran biasanya memakan waktu 1-2 hari kerja. Setelah terverifikasi, Anda dapat langsung mengikuti tes online.' },
                                { q: 'Apakah bisa memilih lebih dari 1 program studi?', a: 'Ya, Anda dapat memilih maksimal 3 program studi dengan urutan prioritas. Sistem akan memproses berdasarkan pilihan pertama Anda.' },
                            ].map((faq, index) => (
                                <details key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
                                    <summary className="px-6 py-4 cursor-pointer flex items-center justify-between font-semibold text-gray-900 hover:bg-gray-50 transition">
                                        <span>{faq.q}</span>
                                        <svg className="w-5 h-5 text-indigo-600 group-open:rotate-180 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <div className="px-6 pb-4 text-gray-600">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Siap Memulai Perjalananmu?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Bergabunglah dengan ribuan mahasiswa yang telah mempercayai kami untuk masa depan mereka.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                href="/register"
                                className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:shadow-2xl transition transform hover:scale-105"
                            >
                                🚀 Daftar Sekarang
                            </Link>
                            <Link 
                                href="/login"
                                className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition"
                            >
                                Sudah Punya Akun? Login
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-4 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    UNIVERSITAS Orbyte
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Membangun masa depan melalui pendidikan berkualitas dan inovasi.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4">Quick Links</h4>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li><a href="#home" className="hover:text-white transition">Beranda</a></li>
                                    <li><a href="#programs" className="hover:text-white transition">Program Studi</a></li>
                                    <li><a href="#timeline" className="hover:text-white transition">Alur Pendaftaran</a></li>
                                    <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4">Kontak</h4>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li>📧 Orbyte@university.ac.id</li>
                                    <li>📞 (021) 1234-5678</li>
                                    <li>📍 Jl. Pendidikan No. 123, Jakarta</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4">Social Media</h4>
                                <div className="flex gap-3">
                                    <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition">
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition">
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition">
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
                            <p>&copy; 2026 Universitas Orbyte. All rights reserved. Built with ❤️ using Laravel & React."Tony Felicio Farrel XII-PPLG-1"</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}