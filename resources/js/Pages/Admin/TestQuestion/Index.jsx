import React, { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../Layouts/Layout';

const emptyForm = {
    test_category_id: '',
    question_text: '',
    question_type: 'multiple_choice',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    option_e: '',
    correct_answer: '',
    points: 5,
    is_active: true,
};

export default function TestQuestionIndex({ questions, categories }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [deleteId, setDeleteId] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterType, setFilterType] = useState('all');

    const filtered = useMemo(() => {
        return questions.filter((q) => {
            if (filterCategory !== 'all' && q.test_category_id !== Number(filterCategory)) return false;
            if (filterType !== 'all' && q.question_type !== filterType) return false;
            return true;
        });
    }, [questions, filterCategory, filterType]);

    const openCreate = () => {
        setEditTarget(null);
        setForm(emptyForm);
        setModalOpen(true);
    };

    const openEdit = (q) => {
        setEditTarget(q);
        setForm({
            test_category_id: q.test_category_id,
            question_text: q.question_text,
            question_type: q.question_type,
            option_a: q.option_a || '',
            option_b: q.option_b || '',
            option_c: q.option_c || '',
            option_d: q.option_d || '',
            option_e: q.option_e || '',
            correct_answer: q.correct_answer || '',
            points: q.points,
            is_active: q.is_active,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...form };
        if (payload.question_type === 'essay') {
            payload.option_a = null;
            payload.option_b = null;
            payload.option_c = null;
            payload.option_d = null;
            payload.option_e = null;
            payload.correct_answer = null;
        }
        if (editTarget) {
            router.put(`/admin/test-questions/${editTarget.id}`, payload, {
                onSuccess: () => setModalOpen(false),
            });
        } else {
            router.post('/admin/test-questions', payload, {
                onSuccess: () => setModalOpen(false),
            });
        }
    };

    const handleDelete = () => {
        router.delete(`/admin/test-questions/${deleteId}`, {
            onSuccess: () => setDeleteId(null),
        });
    };

    const optionLabels = ['A', 'B', 'C', 'D', 'E'];

    return (
        <>
            <Head title="Bank Soal" />
            <AdminLayout title="Bank Soal">

                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500">{questions.length} soal tersedia</p>
                    <button onClick={openCreate}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Soal
                    </button>
                </div>

                {/* Filter Bar */}
                <div className="flex gap-3 mb-6">
                    <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition">
                        <option value="all">Semua Kategori</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    <select value={filterType} onChange={e => setFilterType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition">
                        <option value="all">Semua Tipe</option>
                        <option value="multiple_choice">Pilihan Ganda</option>
                        <option value="essay">Essay</option>
                    </select>
                    <span className="ml-auto text-sm text-gray-500 self-center">{filtered.length} hasil</span>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-5 py-3 font-semibold text-gray-600 w-8">#</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Pertanyaan</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Kategori</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Tipe</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Bobot</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                                <th className="px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((q, idx) => (
                                <tr key={q.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                                    <td className="px-5 py-3.5 text-gray-400 font-mono text-xs">{idx + 1}</td>
                                    <td className="px-5 py-3.5 text-gray-900 max-w-xs">
                                        <p className="truncate font-medium">{q.question_text}</p>
                                        {q.question_type === 'multiple_choice' && (
                                            <p className="text-xs text-gray-400 mt-0.5">Jawaban: <span className="font-bold text-green-600 uppercase">{q.correct_answer}</span></p>
                                        )}
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className="text-gray-600">{q.test_category?.name || '—'}</span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${q.question_type === 'multiple_choice' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}>
                                            {q.question_type === 'multiple_choice' ? 'Pilihan Ganda' : 'Essay'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-gray-600 font-semibold">{q.points} pt</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${q.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${q.is_active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                            {q.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2 justify-end">
                                            <button onClick={() => openEdit(q)} className="text-gray-400 hover:text-indigo-600 transition">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => setDeleteId(q.id)} className="text-gray-400 hover:text-red-600 transition">
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
                    {filtered.length === 0 && (
                        <div className="py-16 text-center">
                            <p className="text-gray-400 text-sm">Tidak ada soal yang ditemukan.</p>
                        </div>
                    )}
                </div>

                {/* Create / Edit Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
                        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
                            <h3 className="text-lg font-bold text-gray-900 mb-5">{editTarget ? 'Edit Soal' : 'Tambah Soal'}</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Kategori + Tipe */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Kategori</label>
                                        <select value={form.test_category_id} onChange={e => setForm({ ...form, test_category_id: e.target.value })} required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white">
                                            <option value="">Pilih Kategori</option>
                                            {categories.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tipe Soal</label>
                                        <select value={form.question_type} onChange={e => setForm({ ...form, question_type: e.target.value })} required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white">
                                            <option value="multiple_choice">Pilihan Ganda</option>
                                            <option value="essay">Essay</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Pertanyaan */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Pertanyaan</label>
                                    <textarea value={form.question_text} onChange={e => setForm({ ...form, question_text: e.target.value })} rows={3} required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none" />
                                </div>

                                {/* Options - only for multiple choice */}
                                {form.question_type === 'multiple_choice' && (
                                    <div className="space-y-2">
                                        <label className="block text-xs font-semibold text-gray-500 uppercase">Pilihan Jawaban</label>
                                        {['a', 'b', 'c', 'd', 'e'].map((key, i) => (
                                            <div key={key} className="flex items-center gap-2">
                                                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${form.correct_answer === key ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                    {optionLabels[i]}
                                                </span>
                                                <input
                                                    type="text"
                                                    value={form[`option_${key}`]}
                                                    onChange={e => setForm({ ...form, [`option_${key}`]: e.target.value })}
                                                    placeholder={`Opsi ${optionLabels[i]}`}
                                                    className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                                />
                                                <button type="button" onClick={() => setForm({ ...form, correct_answer: key })}
                                                    className={`text-xs px-2 py-1 rounded transition ${form.correct_answer === key ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-400 hover:text-green-600'}`}>
                                                    ✓
                                                </button>
                                            </div>
                                        ))}
                                        <p className="text-xs text-gray-400">Klik ✓ untuk memilih jawaban yang benar</p>
                                    </div>
                                )}

                                {/* Bobot + Aktif */}
                                <div className="flex items-end gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Bobot (Poin)</label>
                                        <input type="number" value={form.points} onChange={e => setForm({ ...form, points: e.target.value })} min={1} required
                                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
                                    </div>
                                    <div className="flex items-center gap-2 pb-0.5">
                                        <input type="checkbox" id="is_active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })}
                                            className="w-4 h-4 text-indigo-600 rounded" />
                                        <label htmlFor="is_active" className="text-sm text-gray-700">Aktif</label>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
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
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Soal?</h3>
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
