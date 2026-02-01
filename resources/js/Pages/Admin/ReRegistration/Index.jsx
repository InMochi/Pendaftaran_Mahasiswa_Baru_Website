import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../Layouts/Layout';

export default function ReRegistrationIndex({ reRegistrations, stats }) {
    const [viewModal, setViewModal] = useState(null);
    const [rejectModal, setRejectModal] = useState(null);
    const [rejectionNotes, setRejectionNotes] = useState('');

    const handleVerify = (reReg) => {
        if (!confirm('Verifikasi daftar ulang ini?')) return;
        router.post(`/admin/re-registrations/${reReg.id}/verify`);
    };

    const handleReject = () => {
        if (!rejectionNotes.trim()) {
            alert('Alasan penolakan harus diisi!');
            return;
        }
        router.post(`/admin/re-registrations/${rejectModal.id}/reject`, {
            notes: rejectionNotes,
        }, {
            onSuccess: () => {
                setRejectModal(null);
                setRejectionNotes('');
            },
        });
    };

    const statusInfo = {
        pending: { label: 'Belum Submit', color: 'bg-gray-100 text-gray-700', dot: 'bg-gray-500' },
        submitted: { label: 'Menunggu Verifikasi', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
        verified: { label: 'Terverifikasi', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
        rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
    };

    const documentLabels = {
        surat_pernyataan: 'Surat Pernyataan',
        pas_foto: 'Pas Foto 3x4',
        surat_kesehatan: 'Surat Kesehatan',
        kartu_keluarga: 'Kartu Keluarga',
    };

    return (
        <>
            <Head title="Verifikasi Daftar Ulang" />
            <AdminLayout title="Verifikasi Daftar Ulang">

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Belum Submit</p>
                        <p className="text-3xl font-bold text-gray-600 mt-1">{stats.pending}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Menunggu Verifikasi</p>
                        <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.submitted}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Terverifikasi</p>
                        <p className="text-3xl font-bold text-green-600 mt-1">{stats.verified}</p>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Nama</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Program Studi</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Dokumen</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                                <th className="px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {reRegistrations.map((reReg) => {
                                const status = statusInfo[reReg.status];
                                return (
                                    <tr key={reReg.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                                        <td className="px-5 py-3.5">
                                            <p className="font-medium text-gray-900">{reReg.registration?.biodata?.full_name || '—'}</p>
                                            <p className="text-xs text-gray-500">{reReg.registration?.registration_number}</p>
                                        </td>
                                        <td className="px-5 py-3.5 text-gray-900">{reReg.registration?.announcement?.study_program?.name}</td>
                                        <td className="px-5 py-3.5">
                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                                {reReg.documents?.length || 0} file
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${status.color}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                                                {status.label}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2 justify-end">
                                                <button
                                                    onClick={() => setViewModal(reReg)}
                                                    className="text-gray-400 hover:text-indigo-600 transition"
                                                    title="Lihat Detail"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                {reReg.status === 'submitted' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleVerify(reReg)}
                                                            className="text-gray-400 hover:text-green-600 transition"
                                                            title="Verifikasi"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => setRejectModal(reReg)}
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
                    {reRegistrations.length === 0 && (
                        <div className="py-16 text-center">
                            <p className="text-gray-400 text-sm">Belum ada daftar ulang.</p>
                        </div>
                    )}
                </div>

                {/* View Modal */}
                {viewModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setViewModal(null)} />
                        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Detail Daftar Ulang</h3>
                                <button onClick={() => setViewModal(null)} className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                <div>
                                    <p className="text-gray-500">Nama</p>
                                    <p className="font-medium text-gray-900">{viewModal.registration?.biodata?.full_name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">No. Registrasi</p>
                                    <p className="font-medium text-gray-900">{viewModal.registration?.registration_number}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Program Studi</p>
                                    <p className="font-medium text-gray-900">{viewModal.registration?.announcement?.study_program?.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Status</p>
                                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusInfo[viewModal.status].color}`}>
                                        {statusInfo[viewModal.status].label}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-900 mb-3">Dokumen Terupload:</p>
                                <div className="space-y-2">
                                    {viewModal.documents?.map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{documentLabels[doc.type]}</p>
                                                <p className="text-xs text-gray-500">{doc.file_name}</p>
                                            </div>
                                            <a
                                                href={`/storage/${doc.file_path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                                            >
                                                Lihat
                                            </a>
                                        </div>
                                    ))}
                                    {(!viewModal.documents || viewModal.documents.length === 0) && (
                                        <p className="text-sm text-gray-400 text-center py-4">Belum ada dokumen</p>
                                    )}
                                </div>
                            </div>

                            {viewModal.status === 'submitted' && (
                                <div className="flex gap-3 mt-6">
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
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Tolak Daftar Ulang</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                {rejectModal.registration?.biodata?.full_name}
                            </p>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Alasan Penolakan *</label>
                                <textarea
                                    value={rejectionNotes}
                                    onChange={(e) => setRejectionNotes(e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                                    placeholder="Misal: Dokumen tidak lengkap, foto tidak jelas, dll"
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
                                    Tolak
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </AdminLayout>
        </>
    );
}
