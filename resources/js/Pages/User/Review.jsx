import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import RegistrationLayout from './Layout';

export default function Review({ registration }) {
    const [confirmChecked, setConfirmChecked] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const { biodata, studyProgramChoices, documents } = registration;

    const handleSubmit = () => {
        if (!confirmChecked) {
            alert('Centang konfirmasi terlebih dahulu!');
            return;
        }

        if (!confirm('Yakin ingin submit pendaftaran? Data tidak bisa diubah setelah submit.')) {
            return;
        }

        setSubmitting(true);
        router.post('/registration/submit', {}, {
            onFinish: () => setSubmitting(false),
        });
    };

    return (
        <>
            <Head title="Review - Pendaftaran" />
            <RegistrationLayout currentStep={4} registration={registration}>
                <div className="space-y-6">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Review Pendaftaran</h2>
                        <p className="text-sm text-gray-500">Periksa kembali data Anda sebelum submit</p>
                    </div>

                    {/* Biodata */}
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Biodata</h3>
                            <button
                                onClick={() => router.get('/registration/biodata')}
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                Edit
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">NIK</p>
                                <p className="font-medium text-gray-900">{biodata?.nik}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Nama Lengkap</p>
                                <p className="font-medium text-gray-900">{biodata?.full_name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Tempat, Tanggal Lahir</p>
                                <p className="font-medium text-gray-900">{biodata?.birth_place}, {biodata?.birth_date ? new Date(biodata.birth_date).toLocaleDateString('id-ID') : 'Belum diisi'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Jenis Kelamin</p>
                                <p className="font-medium text-gray-900">{biodata?.gender ? (biodata.gender === 'male' ? 'Laki-laki' : 'Perempuan') : 'Belum diisi'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">No. HP</p>
                                <p className="font-medium text-gray-900">{biodata?.phone || 'Belum diisi'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Email</p>
                                <p className="font-medium text-gray-900">{registration?.user?.email || 'Belum diisi'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-gray-500">Asal Sekolah</p>
                                <p className="font-medium text-gray-900">{biodata?.school_origin} (Lulus {biodata?.graduation_year})</p>
                            </div>
                        </div>
                    </div>

                    {/* Pilihan Prodi */}
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Pilihan Program Studi</h3>
                            <button
                                onClick={() => router.get('/registration/study-programs')}
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                Edit
                            </button>
                        </div>
                        <div className="space-y-3">
                            {studyProgramChoices?.map((choice) => (
                                <div key={choice.id} className="flex items-center gap-3 p-4 bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                                    <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                                        {choice.priority}
                                    </span>
                                    <div>
                                        <p className="font-semibold text-gray-900">{choice.study_program?.name}</p>
                                        <p className="text-sm text-gray-500">{choice.study_program?.faculty}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dokumen */}
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Dokumen Terupload</h3>
                            <button
                                onClick={() => router.get('/registration/documents')}
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                Edit
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {documents?.map((doc) => (
                                <div key={doc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-medium text-gray-900 text-sm">{doc.type_label}</p>
                                        <p className="text-xs text-gray-500 truncate">{doc.file_name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Confirmation */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="confirm"
                                checked={confirmChecked}
                                onChange={(e) => setConfirmChecked(e.target.checked)}
                                className="w-5 h-5 text-indigo-600 rounded mt-0.5"
                            />
                            <label htmlFor="confirm" className="text-sm text-gray-700">
                                Saya menyatakan bahwa data yang saya isikan adalah <strong>benar dan dapat dipertanggungjawabkan</strong>. 
                                Saya memahami bahwa data yang sudah disubmit <strong>tidak dapat diubah lagi</strong>.
                            </label>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Setelah submit, Anda perlu:</p>
                                <ul className="text-sm text-gray-700 mt-1 space-y-1">
                                    <li>✓ Melakukan pembayaran</li>
                                    <li>✓ Mengikuti tes online</li>
                                    <li>✓ Menunggu pengumuman hasil</li>
                                </ul>
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={!confirmChecked || submitting}
                                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'Submitting...' : 'Submit Pendaftaran'}
                            </button>
                        </div>
                    </div>
                </div>
            </RegistrationLayout>
        </>
    );
}
