import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';

const documentTypes = [
    { type: 'surat_pernyataan', label: 'Surat Pernyataan', required: true },
    { type: 'pas_foto', label: 'Pas Foto 3x4', required: true },
    { type: 'surat_kesehatan', label: 'Surat Keterangan Sehat', required: true },
    { type: 'kartu_keluarga', label: 'Kartu Keluarga', required: false },
];

export default function ReRegistrationIndex({ registration, announcement, reRegistration }) {
    const [uploading, setUploading] = useState(null);

    const handleStart = () => {
        if (!confirm('Mulai proses daftar ulang?')) return;
        router.post('/re-registration/create');
    };

    const handleUpload = (type, file) => {
            if (!file) return;

            if (file.size > 2 * 1024 * 1024) {
                alert('File maksimal 2MB!');
                return;
            }

            // Inertia otomatis mendeteksi file dan membungkusnya dalam FormData
            router.post('/re-registration/upload', {
                type: type,
                file: file,
            }, {
                forceFormData: true, // Memaksa penggunaan FormData (opsional tapi aman)
                preserveScroll: true, // Agar halaman tidak scroll ke atas setelah upload
                onStart: () => setUploading(type),
                onFinish: () => setUploading(null),
                onSuccess: (page) => {
                console.log('Data dari server:', page.props.reRegistration);
                    // Cek di console log browser (F12), apakah array 'documents' sudah ada isinya?
                },
                onError: (errors) => {
                    alert('Upload gagal: ' + JSON.stringify(errors));
                }
            });
        };

    const handleSubmit = () => {
        const requiredDocs = documentTypes.filter(d => d.required);
        const uploadedDocs = reRegistration?.documents || [];
        const missing = requiredDocs.filter(d => 
        !uploadedDocs.find(doc => doc.document_type === d.type)
         );

        if (missing.length > 0) {
            alert('Lengkapi semua dokumen wajib terlebih dahulu!');
            return;
        }

        if (!confirm('Submit daftar ulang sekarang? Data tidak bisa diubah lagi.')) return;
        router.post('/re-registration/submit');
    };

    const getDocument = (type) => {
        return reRegistration?.documents?.find(d => d.document_type === type);
    };

    const statusConfig = {
        pending: { label: 'Belum Disubmit', color: 'bg-gray-100 text-gray-700', icon: '📝' },
        submitted: { label: 'Menunggu Verifikasi', color: 'bg-yellow-100 text-yellow-700', icon: '⏳' },
        verified: { label: 'Terverifikasi', color: 'bg-green-100 text-green-700', icon: '✅' },
        rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-700', icon: '❌' },
    };

    const status = reRegistration ? statusConfig[reRegistration.status] : null;

    if (!reRegistration) {
        return (
            <>
                <Head title="Daftar Ulang" />
                <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
                    <header className="bg-white shadow-sm border-b border-gray-100">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-bold text-gray-900">Daftar Ulang</h1>
                                <Link href="/announcement" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                    ← Kembali
                                </Link>
                            </div>
                        </div>
                    </header>

                    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Selamat! Anda Diterima</h2>
                            <p className="text-gray-600 mb-2">Program Studi: <strong>{announcement.study_program?.name}</strong></p>
                            <p className="text-gray-600 mb-6">Peringkat: <strong>#{announcement.rank}</strong></p>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                                <h3 className="font-bold text-blue-900 mb-2">Langkah Daftar Ulang:</h3>
                                <ol className="text-sm text-blue-800 text-left space-y-1">
                                    <li>1. Klik tombol "Mulai Daftar Ulang"</li>
                                    <li>2. Upload dokumen yang diperlukan</li>
                                    <li>3. Submit untuk verifikasi admin</li>
                                    <li>4. Tunggu verifikasi</li>
                                    <li>5. Cetak surat keterangan lulus</li>
                                </ol>
                            </div>

                            <button
                                onClick={handleStart}
                                className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg"
                            >
                                🚀 Mulai Daftar Ulang
                            </button>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Daftar Ulang" />
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
                <header className="bg-white shadow-sm border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Daftar Ulang</h1>
                                <p className="text-sm text-gray-500">{announcement.study_program?.name}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-full font-semibold text-sm ${status.color}`}>
                                {status.icon} {status.label}
                            </span>
                        </div>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Info */}
                    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Informasi</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Nama</p>
                                <p className="font-semibold text-gray-900">{registration.biodata?.full_name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">No. Registrasi</p>
                                <p className="font-semibold text-gray-900">{registration.registration_number}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Program Studi</p>
                                <p className="font-semibold text-gray-900">{announcement.study_program?.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Peringkat</p>
                                <p className="font-semibold text-gray-900">#{announcement.rank}</p>
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Dokumen</h3>
                        <p className="text-sm text-gray-500 mb-6">Format: JPG, PNG, atau PDF. Maksimal 2MB per file.</p>

                        <div className="space-y-4">
                            {documentTypes.map((docType) => {
                                const doc = getDocument(docType.type);
                                const isUploading = uploading === docType.type;

                                return (
                                    <div key={docType.type} className="border border-gray-200 rounded-xl p-5">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    {docType.label}
                                                    {docType.required && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Wajib</span>}
                                                </h4>
                                            </div>
                                            {doc && (
                                                <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
                                                    ✓ Terupload
                                                </span>
                                            )}
                                        </div>

                                        {doc ? (
                                            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{doc.file_name}</p>
                                                        <p className="text-xs text-gray-500">{(doc.file_size / 1024).toFixed(0)} KB</p>
                                                    </div>
                                                </div>
                                                {reRegistration.status === 'pending' && (
                                                    <label className="cursor-pointer px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
                                                        Ganti
                                                        <input
                                                            type="file"
                                                            accept="image/*,application/pdf"
                                                            onChange={(e) => handleUpload(docType.type, e.target.files[0])}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                        ) : (
                                            <label className={`block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                                                reRegistration.status === 'pending' ? 'border-gray-300 hover:border-indigo-400' : 'border-gray-200 opacity-50 cursor-not-allowed'
                                            }`}>
                                                {isUploading ? (
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                                                        <p className="text-sm text-gray-500">Uploading...</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <svg className="w-10 h-10 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                        <p className="text-sm text-gray-600 font-medium">Klik untuk upload</p>
                                                        {reRegistration.status === 'pending' && (
                                                            <input
                                                                type="file"
                                                                accept="image/*,application/pdf"
                                                                onChange={(e) => handleUpload(docType.type, e.target.files[0])}
                                                                className="hidden"
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </label>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Actions */}
                    {reRegistration.status === 'pending' && (
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <button
                                onClick={handleSubmit}
                                className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg"
                            >
                                ✓ Submit Daftar Ulang
                            </button>
                        </div>
                    )}

                    {reRegistration.status === 'submitted' && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                            <p className="text-sm text-yellow-800">
                                ⏳ Daftar ulang Anda sedang diverifikasi oleh admin. Harap tunggu.
                            </p>
                        </div>
                    )}

                    {reRegistration.status === 'verified' && (
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                            <p className="text-sm text-green-800 mb-4">
                                ✅ Daftar ulang Anda sudah diverifikasi! Anda dapat mencetak surat keterangan lulus.
                            </p>
                            <Link
                                href="/re-registration/print-letter"
                                className="inline-block px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
                            >
                                🖨️ Cetak Surat Keterangan Lulus
                            </Link>
                        </div>
                    )}

                    {reRegistration.status === 'rejected' && (
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                            <p className="text-sm font-semibold text-red-800 mb-1">Daftar Ulang Ditolak</p>
                            <p className="text-sm text-red-700">Alasan: {reRegistration.notes}</p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
