import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../Layouts/Layout';

export default function AnnouncementIndex({ periods, announcements = [], stats = {}  }) {
    const [selectedPeriod, setSelectedPeriod] = useState('');
    const [editModal, setEditModal] = useState(null);
    const [editForm, setEditForm] = useState({ status: '', notes: '' });
   

    const handleGenerate = () => {
        if (!selectedPeriod) {
            alert('Pilih periode terlebih dahulu!');
            return;
        }
        if (!confirm('Generate pengumuman untuk periode ini? Pengumuman lama akan dihapus.')) return;
        router.post('/admin/announcements/generate', { registration_period_id: selectedPeriod });
    };

    const handleEdit = (announcement) => {
        setEditModal(announcement);
        setEditForm({ status: announcement.status, notes: announcement.notes || '' });
    };

    const handleUpdate = () => {
        router.put(`/admin/announcements/${editModal.id}`, editForm, {
            onSuccess: () => setEditModal(null),
        });
    };

    const handleDelete = (id) => {
        if (!confirm('Hapus pengumuman ini?')) return;
        router.delete(`/admin/announcements/${id}`);
    };

    const statusInfo = {
        accepted: { label: 'Diterima', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
        waiting_list: { label: 'Waiting List', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
        rejected: { label: 'Tidak Diterima', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
    };

    return (
        <>
            <Head title="Pengumuman" />
            <AdminLayout title="Pengumuman Hasil Seleksi">

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Diterima</p>
                        <p className="text-3xl font-bold text-green-600 mt-1">{stats.accepted}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Waiting List</p>
                        <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.waiting_list}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Tidak Diterima</p>
                        <p className="text-3xl font-bold text-red-600 mt-1">{stats.rejected}</p>
                    </div>
                </div>

                {/* Generate Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Generate Pengumuman</h3>
                    <div className="flex gap-3">
                        <select
                            value={selectedPeriod}
                            onChange={e => setSelectedPeriod(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Pilih Periode</option>
                            {periods.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.name} ({p.academic_year}) - {p.registrations_count} peserta
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleGenerate}
                            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                        >
                            🎯 Generate
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        * Pengumuman akan dibuat berdasarkan ranking test score. Pastikan semua peserta sudah selesai tes.
                    </p>
                </div>

                {/* Announcements Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Rank</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Nama</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Program Studi</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Score</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                                <th className="px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.map((ann) => {
                                const status = statusInfo[ann.status];
                                return (
                                    <tr key={ann.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                                        <td className="px-5 py-3.5">
                                            <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full font-bold text-xs">
                                                #{ann.rank}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <p className="font-medium text-gray-900">{ann.registration?.biodata?.full_name || '—'}</p>
                                            <p className="text-xs text-gray-500">{ann.registration?.registration_number}</p>
                                        </td>
                                        <td className="px-5 py-3.5 font-medium text-gray-900">{ann.study_program?.name}</td>
                                        <td className="px-5 py-3.5">
                                            <span className="font-bold text-lg text-gray-900">
                                                {ann.registration?.test_session?.total_score || 0}
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
                                                    onClick={() => handleEdit(ann)}
                                                    className="text-gray-400 hover:text-indigo-600 transition"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(ann.id)}
                                                    className="text-gray-400 hover:text-red-600 transition"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {announcements.length === 0 && (
                        <div className="py-16 text-center">
                            <p className="text-gray-400 text-sm">Belum ada pengumuman. Generate terlebih dahulu.</p>
                        </div>
                    )}
                </div>

                {/* Edit Modal */}
                {editModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditModal(null)} />
                        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Pengumuman</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                {editModal.registration?.biodata?.full_name} - {editModal.study_program?.name}
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={editForm.status}
                                        onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="accepted">Diterima</option>
                                        <option value="waiting_list">Waiting List</option>
                                        <option value="rejected">Tidak Diterima</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                                    <textarea
                                        value={editForm.notes}
                                        onChange={e => setEditForm({ ...editForm, notes: e.target.value })}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setEditModal(null)}
                                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="flex-1 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </AdminLayout>
        </>
    );
}
