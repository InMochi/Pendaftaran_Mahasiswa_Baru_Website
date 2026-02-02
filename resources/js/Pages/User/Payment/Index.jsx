import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
export default function PaymentIndex({ registration, payment }) {
    
    const [form, setForm] = useState({
        amount: payment?.amount || '',
        payment_method: payment?.payment_method || '',
        account_name: payment?.account_name || '',
        paid_at: payment?.paid_at || '',
        proof_file: null,
        notes: payment?.notes || '',
    });

    const [errors, setErrors] = useState({});
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, proof_file: file });
            // Preview for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => setPreviewUrl(e.target.result);
                reader.readAsDataURL(file);
            } else {
                setPreviewUrl(null);
            }
        }
    };

    const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // hapus titik & huruf
    setForm({
        ...form,
        amount: rawValue,
    });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(form).forEach(key => {
            if (form[key] !== null) {
                formData.append(key, form[key]);
            }
        });

        router.post('/payment', formData, {
            onError: (err) => setErrors(err),
        });
    };

    const statusInfo = {
        pending: { label: 'Menunggu Verifikasi', color: 'bg-yellow-100 text-yellow-700', icon: '⏳' },
        verified: { label: 'Terverifikasi', color: 'bg-green-100 text-green-700', icon: '✅' },
        rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-700', icon: '❌' },
    };

    const status = payment ? statusInfo[payment.status] : null;

    return (
        <>
            <Head title="Pembayaran" />

            <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Pembayaran</h1>
                                <p className="text-sm text-gray-500">No. {registration.registration_number}</p>
                            </div>
                            <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                ← Kembali
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Info Pembayaran */}
                    <div className="bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 mb-6 text-white">
                        <h2 className="text-2xl font-bold mb-4">Informasi Pembayaran</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="opacity-90 mb-1">Biaya Pendaftaran</p>
                                <p className="text-2xl font-bold">Rp 200.000</p>
                            </div>
                            <div>
                                <p className="opacity-90 mb-1">Metode Pembayaran</p>
                                <p className="font-semibold">Transfer Bank</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/20">
                            <p className="text-sm opacity-90 mb-2">Transfer ke:</p>
                            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                <p className="font-bold text-lg">Bank Mandiri</p>
                                <p className="font-mono text-xl">1234567890</p>
                                <p className="text-sm opacity-90">a.n. Universitas Orbyte</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Status or Form */}
                    {payment && payment.status !== 'rejected' ? (
                        <div className="bg-white rounded-2xl shadow-md p-8">
                            {/* Status Badge */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Status Pembayaran</h3>
                                <span className={`px-4 py-2 rounded-full font-semibold text-sm ${status.color}`}>
                                    {status.icon} {status.label}
                                </span>
                            </div>

                            {/* Payment Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                                <div>
                                    <p className="text-gray-500">Jumlah</p>
                                    <p className="font-semibold text-gray-900">{payment.amount}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Metode</p>
                                    <p className="font-semibold text-gray-900">{payment.payment_method}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Nama Pengirim</p>
                                    <p className="font-semibold text-gray-900">{payment.account_name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Tanggal</p>
                                    <p className="font-semibold text-gray-900">{payment.paid_at ? new Date(payment.paid_at).toLocaleDateString('id-ID') : '—'}</p>
                                </div>
                            </div>

                            {/* Proof Preview */}
                            <div className="mb-6">
                                <p className="text-sm text-gray-500 mb-2">Bukti Pembayaran</p>
                                {payment.proof_file_path?.endsWith('.pdf') ? (
                                    <div className="bg-gray-100 rounded-lg p-6 text-center">
                                        <svg className="w-16 h-16 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-sm text-gray-600">File PDF</p>
                                    </div>
                                ) : (
                                    <img
                                        src={`/storage/${payment.proof_file_path}`}
                                        alt="Bukti Pembayaran"
                                        className="w-full max-h-64 object-contain rounded-lg shadow-md"
                                    />
                                )}
                            </div>

                            {/* Actions based on status */}
                            {payment.status === 'pending' && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <p className="text-sm text-yellow-800">
                                        ⏳ Bukti pembayaran Anda sedang diverifikasi oleh admin. Harap tunggu.
                                    </p>
                                </div>
                            )}

                            {payment.status === 'verified' && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-sm text-green-800 mb-3">
                                        ✅ Pembayaran Anda sudah terverifikasi! Anda dapat melanjutkan ke tes online.
                                    </p>
                                    <Link
                                        href="/test"
                                        className="inline-block px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
                                    >
                                        Mulai Tes
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Upload Form
                        <div className="bg-white rounded-2xl shadow-md p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                {payment?.status === 'rejected' ? 'Upload Ulang Bukti Pembayaran' : 'Upload Bukti Pembayaran'}
                            </h3>

                            {payment?.status === 'rejected' && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                    <p className="text-sm font-semibold text-red-800 mb-1">Pembayaran Ditolak</p>
                                    <p className="text-sm text-red-700">Alasan: {payment.rejection_reason}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Transfer *</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            onChange={handleAmountChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="200.000"
                                        />
                                        {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Metode Pembayaran *</label>
                                        <select
                                            value={form.payment_method}
                                            onChange={e => setForm({ ...form, payment_method: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="">Pilih</option>
                                            <option value="bank_transfer">Transfer Bank</option>
                                            <option value="ewallet">E-Wallet</option>
                                            <option value="virtual_account">Virtual Account</option>
                                        </select>
                                        {errors.payment_method && <p className="text-red-600 text-sm mt-1">{errors.payment_method}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pengirim *</label>
                                        <input
                                            type="text"
                                            value={form.account_name}
                                            onChange={e => setForm({ ...form, account_name: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Nama sesuai rekening"
                                        />
                                        {errors.account_name && <p className="text-red-600 text-sm mt-1">{errors.account_name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Transfer *</label>
                                        <input
                                            type="date"
                                            value={form.paid_at}
                                            onChange={e => setForm({ ...form, paid_at: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        {errors.paid_at && <p className="text-red-600 text-sm mt-1">{errors.paid_at}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bukti Transfer (JPG/PNG/PDF, max 2MB) *</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        {previewUrl ? (
                                            <div className="mb-3">
                                                <img src={previewUrl} alt="Preview" className="w-full max-h-64 object-contain rounded-lg shadow-md" />
                                            </div>
                                        ) : (
                                            <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                        )}
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/*,application/pdf"
                                            className="hidden"
                                            id="proof_file"
                                        />
                                        <label htmlFor="proof_file" className="cursor-pointer text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                            Pilih File
                                        </label>
                                        {form.proof_file && <p className="text-xs text-gray-500 mt-2">{form.proof_file.name}</p>}
                                    </div>
                                    {errors.proof_file && <p className="text-red-600 text-sm mt-1">{errors.proof_file}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Catatan (opsional)</label>
                                    <textarea
                                        value={form.notes}
                                        onChange={e => setForm({ ...form, notes: e.target.value })}
                                        rows={2}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-lg"
                                >
                                    Upload Bukti Pembayaran
                                </button>
                            </form>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
