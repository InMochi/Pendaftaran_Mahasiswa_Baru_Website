import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../Layouts/Layout';

const emptyForm = {
    name: '',
    description: '',
    duration_minutes: '',
    is_active: true,
};

export default function TestCategoryIndex({ categories }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [deleteId, setDeleteId] = useState(null);

    const openCreate = () => {
        setEditTarget(null);
        setForm(emptyForm);
        setModalOpen(true);
    };

    const openEdit = (cat) => {
        setEditTarget(cat);
        setForm({
            name: cat.name,
            description: cat.description || '',
            duration_minutes: cat.duration_minutes,
            is_active: cat.is_active,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editTarget) {
            router.put(`/admin/test-categories/${editTarget.id}`, form, {
                onSuccess: () => setModalOpen(false),
            });
        } else {
            router.post('/admin/test-categories', form, {
                onSuccess: () => setModalOpen(false),
            });
        }
    };

    const handleDelete = () => {
        router.delete(`/admin/test-categories/${deleteId}`, {
            onSuccess: () => setDeleteId(null),
        });
    };

    const formatDuration = (minutes) => {
        if (minutes >= 60) {
            const h = Math.floor(minutes / 60);
            const m = minutes % 60;
            return m > 0 ? `${h}j ${m}m` : `${h} jam`;
        }
        return `${minutes} menit`;
    };

    return (
        <>
            <Head title="Kategori Tes" />
            <AdminLayout title="Kategori Tes">

                {/* Header Row */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-gray-500">{categories.length} kategori tes</p>
                    <button onClick={openCreate}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Kategori
                    </button>
                </div>

                {/* Summary Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Total Kategori</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{categories.length}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Total Soal</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{categories.reduce((s, c) => s + (c.test_questions_count || 0), 0)}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Soal Aktif</p>
                        <p className="text-2xl font-bold text-indigo-600 mt-1">{categories.reduce((s, c) => s + (c.active_questions_count || 0), 0)}</p>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Kategori</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Deskripsi</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Durasi</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Soal</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                                <th className="px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => (
                                <tr key={cat.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                                    <td className="px-5 py-3.5 font-medium text-gray-900">{cat.name}</td>
                                    <td className="px-5 py-3.5 text-gray-500 max-w-xs truncate">{cat.description || '—'}</td>
                                    <td className="px-5 py-3.5">
                                        <span className="bg-purple-50 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded">
                                            {formatDuration(cat.duration_minutes)}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className="text-gray-700 font-semibold">{cat.active_questions_count || 0}</span>
                                        <span className="text-gray-400 text-xs"> / {cat.test_questions_count || 0} total</span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cat.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${cat.is_active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                            {cat.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2 justify-end">
                                            <button onClick={() => openEdit(cat)} className="text-gray-400 hover:text-indigo-600 transition">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => setDeleteId(cat.id)} className="text-gray-400 hover:text-red-600 transition">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {categories.length === 0 && (
                        <div className="py-16 text-center">
                            <p className="text-gray-400 text-sm">Belum ada kategori tes.</p>
                        </div>
                    )}
                </div>

                {/* Create / Edit Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
                        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-5">{editTarget ? 'Edit Kategori' : 'Tambah Kategori'}</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nama Kategori</label>
                                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Deskripsi</label>
                                    <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Durasi (menit)</label>
                                    <input type="number" value={form.duration_minutes} onChange={e => setForm({ ...form, duration_minutes: e.target.value })} min={5} required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
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
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Kategori?</h3>
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
