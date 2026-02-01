import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function AnnouncementIndex({ registration, announcement, reRegistration }) {
    const [confirmReReg, setConfirmReReg] = useState(false);

    const handleReRegister = () => {
        if (!confirmReReg) {
            alert('Centang konfirmasi terlebih dahulu!');
            return;
        }
        router.post('/re-registration', { confirm: true });
    };

    const statusConfig = {
        accepted: {
            bg: 'from-green-500 to-emerald-600',
            icon: '🎉',
            title: 'SELAMAT!',
            subtitle: 'Anda DITERIMA',
            message: 'Anda berhasil diterima di program studi yang Anda pilih!',
        },
        waiting_list: {
            bg: 'from-yellow-500 to-orange-600',
            icon: '⏳',
            title: 'WAITING LIST',
            subtitle: 'Anda masuk waiting list',
            message: 'Harap tunggu konfirmasi lebih lanjut dari panitia.',
        },
        rejected: {
            bg: 'from-red-500 to-rose-600',
            icon: '😔',
            title: 'BELUM BERHASIL',
            subtitle: 'Anda belum diterima',
            message: 'Jangan menyerah! Terus belajar dan coba lagi tahun depan.',
        },
    };

    const config = statusConfig[announcement.status] || statusConfig.rejected;

    return (
        <>
            <Head title="Pengumuman" />
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
                <header className="bg-white shadow-sm border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Pengumuman Hasil Seleksi</h1>
                                <p className="text-sm text-gray-500">No. {registration.registration_number}</p>
                            </div>
                            <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                ← Kembali
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Result Banner */}
                    <div className={`bg-linear-to-br ${config.bg} rounded-2xl shadow-xl p-8 text-white text-center mb-6`}>
                        <div className="text-7xl mb-4">{config.icon}</div>
                        <h2 className="text-4xl font-bold mb-2">{config.title}</h2>
                        <p className="text-2xl font-semibold mb-4">{config.subtitle}</p>
                        <p className="text-lg opacity-90">{config.message}</p>
                    </div>

                    {/* Details */}
                    <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Detail Hasil</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Nama Lengkap</p>
                                <p className="font-semibold text-gray-900">{registration.biodata?.full_name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Email</p>
                                <p className="font-semibold text-gray-900">{registration.user?.email }</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Program Studi</p>
                                <p className="font-semibold text-gray-900">{announcement.study_program?.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Peringkat</p>
                                <p className="font-semibold text-gray-900">#{announcement.rank}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Skor</p>
                                <p className="text-3xl font-bold text-indigo-600">{announcement.total_score}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Status</p>
                                <span className={`inline-block px-4 py-2 rounded-full font-bold text-sm ${
                                    announcement.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                    announcement.status === 'waiting_list' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                }`}>
                                    {config.subtitle}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Re-registration Section (if accepted) */}
                    {announcement.status === 'accepted' && (
                        <div className="bg-white rounded-2xl shadow-md p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Daftar Ulang</h3>
                            
                            {reRegistration ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="font-bold text-green-800">Daftar Ulang Berhasil!</p>
                                    </div>
                                    <p className="text-sm text-green-700">
                                        Anda sudah melakukan daftar ulang pada {new Date(reRegistration.created_at).toLocaleDateString('id-ID')}. 
                                        Silakan tunggu informasi lebih lanjut dari panitia.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                        <p className="text-sm text-blue-800">
                                            <strong>Penting!</strong> Anda harus melakukan daftar ulang untuk mengkonfirmasi kehadiran Anda. 
                                            Klik tombol di bawah untuk melakukan daftar ulang.
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3 mb-6">
                                        <input
                                            type="checkbox"
                                            id="confirm"
                                            checked={confirmReReg}
                                            onChange={e => setConfirmReReg(e.target.checked)}
                                            className="w-5 h-5 text-indigo-600 rounded mt-0.5"
                                        />
                                        <label htmlFor="confirm" className="text-sm text-gray-700">
                                            Saya menyatakan bahwa saya <strong>bersedia mengikuti program studi ini</strong> dan 
                                            akan melanjutkan proses pendaftaran sesuai dengan ketentuan yang berlaku.
                                        </label>
                                    </div>

                                    <button
                                        onClick={handleReRegister}
                                        disabled={!confirmReReg}
                                        className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                    >
                                        ✓ Konfirmasi Daftar Ulang
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                    {/* Waiting List Info */}
                    {announcement.status === 'waiting_list' && (
                        <div className="bg-white rounded-2xl shadow-md p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Informasi Waiting List</h3>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-sm text-yellow-800">
                                    Anda berada di urutan waiting list. Jika ada calon mahasiswa yang diterima 
                                    tidak melakukan daftar ulang, maka Anda akan dipanggil sebagai pengganti. 
                                    Harap pantau terus email dan dashboard Anda.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Contact Info */}
                    <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6 mt-6">
                        <h3 className="font-bold text-gray-900 mb-2">Butuh Bantuan?</h3>
                        <p className="text-sm text-gray-700">
                            Hubungi panitia PMB melalui email: <a href="mailto:pmb@university.ac.id" className="text-indigo-600 font-semibold">pmb@university.ac.id</a>
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}
