import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../Layouts/Layout';

export default function PaymentIndex({ payments }) {
    const [viewModal, setViewModal] = useState(null);
    const [rejectModal, setRejectModal] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');

    const handleVerify = (payment) => {
        if (!confirm('Verifikasi pembayaran ini?')) return;
        router.post(`/admin/payments/${payment.id}/verify`);
    };

    const handleReject = () => {
        if (!rejectionReason.trim()) {
            alert('Alasan penolakan harus diisi!');
            return;
        }
        router.post(`/admin/payments/${rejectModal.id}/reject`, {
            rejection_reason: rejectionReason,
        }, {
            onSuccess: () => {
                setRejectModal(null);
                setRejectionReason('');
            },
        });
    };

    const statusInfo = {
        pending: { label: 'Menunggu', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
        verified: { label: 'Terverifikasi', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
        rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
    };

    const pending = payments.filter(p => p.status === 'pending');
    const verified = payments.filter(p => p.status === 'verified');
    const rejected = payments.filter(p => p.status === 'rejected');

    return (
        <>
            <Head title="Verifikasi Pembayaran" />
            <AdminLayout title="Verifikasi Pembayaran">

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Menunggu Verifikasi</p>
                        <p className="text-3xl font-bold text-yellow-600 mt-1">{pending.length}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Terverifikasi</p>
                        <p className="text-3xl font-bold text-green-600 mt-1">{verified.length}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Ditolak</p>
                        <p className="text-3xl font-bold text-red-600 mt-1">{rejected.length}</p>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">No. Registrasi</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Nama</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Jumlah</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Metode</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Tanggal</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                                <th className="px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => {
                                const status = statusInfo[payment.status];
                                return (
                                    <tr key={payment.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                                        <td className="px-5 py-3.5">
                                            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{payment.payment_code}</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <p className="font-medium text-gray-900">{payment.registration?.biodata?.full_name || '—'}</p>
                                            <p className="text-xs text-gray-500">{payment.registration?.registration_number}</p>
                                        </td>
                                        <td className="px-5 py-3.5 font-semibold text-gray-900">{payment.amount}</td>
                                        <td className="px-5 py-3.5 text-gray-600">{payment.payment_method}</td>
                                        <td className="px-5 py-3.5 text-gray-600">{payment.paid_at ? new Date(payment.paid_at).toLocaleDateString('id-ID') : '—'}</td>
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${status.color}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                                                {status.label}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2 justify-end">
                                                <button
                                                    onClick={() => setViewModal(payment)}
                                                    className="text-gray-400 hover:text-indigo-600 transition"
                                                    title="Lihat Detail"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                {payment.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleVerify(payment)}
                                                            className="text-gray-400 hover:text-green-600 transition"
                                                            title="Verifikasi"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => setRejectModal(payment)}
                                                            className="text-gray-400 hover:text-red-600 transition"
                                                            title="Tolak"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {payments.length === 0 && (
                        <div className="py-16 text-center">
                            <p className="text-gray-400 text-sm">Belum ada pembayaran.</p>
                        </div>
                    )}
                </div>

                {/* View Modal */}
                {viewModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setViewModal(null)} />
                        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Detail Pembayaran</h3>
                                <button onClick={() => setViewModal(null)} className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                <div>
                                    <p className="text-gray-500">Nama Lengkap</p>
                                    <p className="font-medium text-gray-900">{viewModal.registration?.biodata?.full_name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Email</p>
                                    <p className="font-medium text-gray-900">{viewModal.registration?.user?.email}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Jumlah</p>
                                    <p className="font-medium text-gray-900">{viewModal.amount}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Metode</p>
                                    <p className="font-medium text-gray-900">{viewModal.payment_method}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Nama Pengirim</p>
                                    <p className="font-medium text-gray-900">{viewModal.account_name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Tanggal Transfer</p>
                                    <p className="font-medium text-gray-900">{viewModal.paid_at ? new Date(viewModal.paid_at).toLocaleDateString('id-ID') : '—'}</p>
                                </div>
                                {viewModal.notes && (
                                    <div className="col-span-2">
                                        <p className="text-gray-500">Catatan</p>
                                        <p className="font-medium text-gray-900">{viewModal.notes}</p>
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-2">Bukti Transfer</p>
                                {viewModal.proof_file_path?.endsWith('.pdf') ? (
                                    <div className="bg-gray-100 rounded-lg p-8 text-center">
                                        <svg className="w-16 h-16 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-sm text-gray-600 mb-2">File PDF</p>
                                        <a
                                            href={`/storage/${viewModal.proof_file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                                        >
                                            Buka File
                                        </a>
                                    </div>
                                ) : (
                                    <img
                                        src={`/storage/${viewModal.proof_file_path}`}
                                        alt="Bukti"
                                        className="w-full max-h-64 object-contain rounded-lg shadow-md"
                                    />
                                )}
                            </div>

                            {viewModal.status === 'pending' && (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            handleVerify(viewModal);
                                            setViewModal(null);
                                        }}
                                        className="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
                                    >
                                        ✓ Verifikasi
                                    </button>
                                    <button
                                        onClick={() => {
                                            setRejectModal(viewModal);
                                            setViewModal(null);
                                        }}
                                        className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
                                    >
                                        ✗ Tolak
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Reject Modal */}
                {rejectModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setRejectModal(null)} />
                        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Tolak Pembayaran</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Pembayaran dari <strong>{rejectModal.registration?.biodata?.full_name}</strong>
                            </p>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Alasan Penolakan *</label>
                                <textarea
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                                    placeholder="Misal: Jumlah transfer tidak sesuai, bukti tidak jelas, dll"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setRejectModal(null)}
                                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleReject}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
                                >
                                    Tolak Pembayaran
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </AdminLayout>
        </>
    );
}
