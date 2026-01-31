import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import RegistrationLayout from './Layout';
import axios from 'axios';

const documentTypes = [
    { type: 'ktp', label: 'KTP', required: true, accept: 'image/*,application/pdf' },
    { type: 'ijazah', label: 'Ijazah/SKHUN', required: true, accept: 'image/*,application/pdf' },
    { type: 'foto', label: 'Foto 3x4', required: true, accept: 'image/*' },
    { type: 'raport', label: 'Raport (opsional)', required: false, accept: 'image/*,application/pdf' },
    { type: 'sertifikat', label: 'Sertifikat Prestasi (opsional)', required: false, accept: 'image/*,application/pdf' },
];

export default function Documents({ registration, documents }) {
    const [uploadedDocs, setUploadedDocs] = useState(documents || []);
    const [uploading, setUploading] = useState(null);

    const handleUpload = async (type, file) => {
        if (!file) return;

        // Check size
        if (file.size > 2 * 1024 * 1024) {
            alert('File maksimal 2MB!');
            return;
        }

        setUploading(type);

        const formData = new FormData();
        formData.append('type', type);
        formData.append('file', file);

        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            await axios.post('/registration/documents/upload', formData, {
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Refresh page to get updated documents
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Upload gagal: ' + (error.response?.data?.message || error.message));
        } finally {
            setUploading(null);
        }
    };

    const getUploadedDoc = (type) => {
        return uploadedDocs.find(d => d.document_type === type);
    };

    const handleNext = () => {
        // Check required docs
        const requiredTypes = documentTypes.filter(d => d.required).map(d => d.type);
        const missingRequired = requiredTypes.filter(t => !getUploadedDoc(t));

        if (missingRequired.length > 0) {
            alert('Lengkapi dokumen yang wajib diupload!');
            return;
        }

        router.get('/registration/review');
    };

    return (
        <>
            <Head title="Upload Dokumen - Pendaftaran" />
            <RegistrationLayout currentStep={3} registration={registration}>
                <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Dokumen</h2>
                    <p className="text-sm text-gray-500 mb-6">Format: JPG, PNG, atau PDF. Maksimal 2MB per file.</p>

                    <div className="space-y-4">
                        {documentTypes.map((docType) => {
                            const uploaded = getUploadedDoc(docType.type);
                            const isUploading = uploading === docType.type;

                            return (
                                <div key={docType.type} className="border border-gray-200 rounded-xl p-5 hover:border-indigo-300 transition">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                {docType.label}
                                                {docType.required && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Wajib</span>}
                                            </h3>
                                        </div>
                                        {uploaded && (
                                            <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
                                                ✓ Terupload
                                            </span>
                                        )}
                                    </div>

                                    {uploaded ? (
                                        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-indigo-100 rounded flex items-center justify-center">
                                                    {uploaded.file_path?.endsWith('.pdf') ? (
                                                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{uploaded.file_name}</p>
                                                    <p className="text-xs text-gray-500">{uploaded.formatted_file_size || '—'}</p>
                                                </div>
                                            </div>
                                            <label className="cursor-pointer px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition">
                                                Ganti
                                                <input
                                                    type="file"
                                                    accept={docType.accept}
                                                    onChange={(e) => handleUpload(docType.type, e.target.files[0])}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    ) : (
                                        <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-400 transition">
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
                                                    <p className="text-sm text-gray-600 font-medium mb-1">Klik untuk upload</p>
                                                    <p className="text-xs text-gray-400">atau drag & drop file</p>
                                                    <input
                                                        type="file"
                                                        accept={docType.accept}
                                                        onChange={(e) => handleUpload(docType.type, e.target.files[0])}
                                                        className="hidden"
                                                    />
                                                </>
                                            )}
                                        </label>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-end pt-6 mt-6 border-t">
                        <button
                            onClick={handleNext}
                            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm"
                        >
                            Lanjut ke Review →
                        </button>
                    </div>
                </div>
            </RegistrationLayout>
        </>
    );
}
