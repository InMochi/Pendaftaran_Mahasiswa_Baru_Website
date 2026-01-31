import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../Layouts/Layout';

const emptyForm = {
    name: '',
    academic_year: '',
    registration_start: '',
    registration_end: '',
    test_date: '',
    announcement_date: '',
    is_active: true,
};

function formatDate(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getStatusInfo(period) {
    const now = new Date();
    const start = new Date(period.registration_start);
    const end = new Date(period.registration_end);
    if (!period.is_active) return { label: 'Nonaktif', color: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' };
    if (now < start) return { label: 'Akan Dibuka', color: 'bg-blue-50 text-blue-700', dot: 'bg-blue-500' };
    if (now >= start && now <= end) return { label: 'Dibuka', color: 'bg-green-50 text-green-700', dot: 'bg-green-500' };
    return { label: 'Ditutup', color: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' };
}

export default function RegistrationPeriodIndex({ periods }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [deleteId, setDeleteId] = useState(null);

    const openCreate = () => {
        setEditTarget(null);
        setForm(emptyForm);
        setModalOpen(true);
    };

    const openEdit = (period) => {
        setEditTarget(period);
        setForm({
            name: period.name,
            academic_year: period.academic_year,
            registration_start: period.registration_start?.slice(0, 16) || '',
            registration_end: period.registration_end?.slice(0, 16) || '',
            test_date: period.test_date || '',
            announcement_date: period.announcement_date || '',
            is_active: period.is_active,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editTarget) {
            router.put(`/admin/registration-periods/${editTarget.id}`, form, {
                onSuccess: () => setModalOpen(false),
            });
        } else {
            router.post('/admin/registration-periods', form, {
                onSuccess: () => setModalOpen(false),
            });
        }
    };

    const handleDelete = () => {
        router.delete(`/admin/registration-periods/${deleteId}`, {
            onSuccess: () => setDeleteId(null),
        });
    };

    return (
        <>
            <Head title="Periode Pendaftaran" />
            <AdminLayout title="Periode Pendaftaran">

                {/* Header Row */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-gray-500">{periods.length} periode tersedia</p>
                    <button onClick={openCreate}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Periode
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Nama Periode</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Tahun Akademik</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Pendaftaran</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Tes / Pengumuman</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Peserta</th>
                                <th className="px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {periods.map((p) => {
                                const status = getStatusInfo(p);
                                return (
                                    <tr key={p.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                                        <td className="px-5 py-3.5 font-medium text-gray-900">{p.name}</td>
                                        <td className="px-5 py-3.5 text-gray-600">{p.academic_year}</td>
                                        <td className="px-5 py-3.5">
                                            <p className="text-gray-700">{formatDate(p.registration_start)}</p>
                                            <p className="text-gray-400 text-xs">s/d {formatDate(p.registration_end)}</p>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <p className="text-gray-700">{formatDate(p.test_date)}</p>
                                            <p className="text-gray-400 text-xs">Pengumuman: {formatDate(p.announcement_date)}</p>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${status.color}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                                                {status.label}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-gray-600 font-semibold">{p.registrations_count || 0}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2 justify-end">
                                                <button onClick={() => openEdit(p)} className="text-gray-400 hover:text-indigo-600 transition">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => setDeleteId(p.id)} className="text-gray-400 hover:text-red-600 transition">
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
                    {periods.length === 0 && (
                        <div className="py-16 text-center">
                            <p className="text-gray-400 text-sm">Belum ada periode pendaftaran.</p>
                        </div>
                    )}
                </div>

                {/* Create / Edit Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
                        <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
                            <h3 className="text-lg font-bold text-gray-900 mb-5">{editTarget ? 'Edit Periode' : 'Tambah Periode'}</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nama Periode</label>
                                        <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tahun Akademik</label>
                                        <input type="text" value={form.academic_year} onChange={e => setForm({ ...form, academic_year: e.target.value })} placeholder="2025/2026" required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Mulai Pendaftaran</label>
                                        <input type="datetime-local" value={form.registration_start} onChange={e => setForm({ ...form, registration_start: e.target.value })} required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Akhir Pendaftaran</label>
                                        <input type="datetime-local" value={form.registration_end} onChange={e => setForm({ ...form, registration_end: e.target.value })} required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tanggal Tes</label>
                                        <input type="date" value={form.test_date} onChange={e => setForm({ ...form, test_date: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tanggal Pengumuman</label>
                                        <input type="date" value={form.announcement_date} onChange={e => setForm({ ...form, announcement_date: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="is_active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })}
                                        className="w-4 h-4 text-indigo-600 rounded" />
                                    <label htmlFor="is_active" className="text-sm text-gray-700">Aktif</label>
                                </div>
                                <div className="flex justify-end gap-3 pt-2">
                                    <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Batal</button>
                                    <button type="submit" className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">{editTarget ? 'Simpan' : 'Tambahkan'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {deleteId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
                        <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 text-center">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Periode?</h3>
                            <p className="text-sm text-gray-500 mb-5">Aksi ini tidak bisa dibatalkan.</p>
                            <div className="flex justify-center gap-3">
                                <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Batal</button>
                                <button onClick={handleDelete} className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition">Hapus</button>
                            </div>
                        </div>
                    </div>
                )}

            </AdminLayout>
        </>
    );
}
