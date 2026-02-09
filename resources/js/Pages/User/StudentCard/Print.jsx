import React from 'react';
import { Head } from '@inertiajs/react';

export default function StudentCardPrint({ user, registration, announcement, qrCode }) {
    const biodata = registration.biodata;
    const studyProgram = registration.announcement.study_program;
    const avatarUrl = user.avatar_path ? `/storage/${user.avatar_path}` : null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <Head title="Cetak Kartu Mahasiswa" />

            {/* Print Button (hidden when printing) */}
            <div className="fixed top-4 right-4 print:hidden z-50">
                <button
                    onClick={handlePrint}
                    className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-xl"
                >
                    🖨️ Print
                </button>
            </div>

            {/* Print Layout */}
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
                <div className="w-full max-w-4xl">
                    {/* FRONT SIDE */}
                    <div className="mb-8 page-break">
                        <h2 className="text-center text-lg font-bold text-gray-700 mb-4 print:hidden">
                            DEPAN KARTU
                        </h2>

                        {/* Card Container - Standard ID Card Size */}
                        <div className="mx-auto" style={{ width: '8.5cm', height: '5.5cm' }}>
                            <div className="relative w-full h-full bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl p-1 shadow-2xl">
                                <div className="bg-white rounded-lg w-full h-full p-3 flex flex-col">
                                    {/* Header */}
                                    <div className="text-center pb-2 border-b-2 border-gray-300">
                                        <h3 className="text-sm font-bold text-gray-900 leading-tight">UNIVERSITAS ORBYTE</h3>
                                        <p className="text-xs text-gray-600" style={{ fontSize: '8px' }}>KARTU TANDA MAHASISWA</p>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex gap-3 flex-1 mt-2">
                                        {/* Photo */}
                                        <div className="shrink-0">
                                            {avatarUrl ? (
                                                <img
                                                    src={avatarUrl}
                                                    alt={biodata.full_name}
                                                    className="rounded-md border-2 border-gray-300 object-cover"
                                                    style={{ width: '2.2cm', height: '2.8cm' }}
                                                />
                                            ) : (
                                                <div
                                                    className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center text-white font-bold border-2 border-gray-300"
                                                    style={{ width: '2.2cm', height: '2.8cm', fontSize: '24px' }}
                                                >
                                                    {biodata.full_name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 flex flex-col justify-between" style={{ fontSize: '9px' }}>
                                            <div>
                                                <div className="mb-1">
                                                    <p className="text-gray-500 leading-none" style={{ fontSize: '7px' }}>NIM</p>
                                                    <p className="font-bold text-gray-900 leading-tight">{announcement.nim || registration.student_number || '—'}</p>
                                                </div>
                                                <div className="mb-1">
                                                    <p className="text-gray-500 leading-none" style={{ fontSize: '7px' }}>Nama</p>
                                                    <p className="font-bold text-gray-900 leading-tight" style={{ fontSize: '8px' }}>
                                                        {biodata.full_name}
                                                    </p>
                                                </div>
                                                <div className="mb-1">
                                                    <p className="text-gray-500 leading-none" style={{ fontSize: '7px' }}>Program Studi</p>
                                                    <p className="font-semibold text-gray-900 leading-tight" style={{ fontSize: '7px' }}>
                                                        {studyProgram.name}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 leading-none" style={{ fontSize: '7px' }}>Tahun Masuk</p>
                                                    <p className="font-bold text-gray-900 leading-tight">{new Date().getFullYear()}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* QR Code Footer */}
                                        <div className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded-lg p-1">
                                             <div
                                                    dangerouslySetInnerHTML={{ __html: qrCode }}
                                                    className="w-full h-full"
                                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className="page-break">
                        <h2 className="text-center text-lg font-bold text-gray-700 mb-4 print:hidden">
                            BELAKANG KARTU
                        </h2>

                        <div className="mx-auto" style={{ width: '8.5cm', height: '5.5cm' }}>
                            <div className="relative w-full h-full bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl p-1 shadow-2xl">
                                <div className="bg-white rounded-lg w-full h-full p-3 flex flex-col justify-between">
                                    {/* Important Information */}
                                    <div>
                                        <h4 className="text-center font-bold text-gray-900 mb-2" style={{ fontSize: '10px' }}>
                                            INFORMASI PENTING
                                        </h4>
                                        <div className="space-y-1" style={{ fontSize: '7px' }}>
                                            <p className="text-gray-700 leading-tight">
                                                • Kartu ini adalah identitas resmi mahasiswa
                                            </p>
                                            <p className="text-gray-700 leading-tight">
                                                • Wajib dibawa saat kegiatan akademik
                                            </p>
                                            <p className="text-gray-700 leading-tight">
                                                • Jika hilang segera lapor ke bagian akademik
                                            </p>
                                            <p className="text-gray-700 leading-tight">
                                                • Tidak boleh dipinjamkan kepada orang lain
                                            </p>
                                        </div>
                                    </div>

                                    {/* Emergency Contact */}
                                    <div className="bg-gray-50 rounded p-2">
                                        <p className="font-semibold text-gray-900 mb-1" style={{ fontSize: '8px' }}>
                                            Kontak Darurat
                                        </p>
                                        <div style={{ fontSize: '7px' }} className="text-gray-700">
                                            <p>📞 Kampus: (021) 1234-5678</p>
                                            <p>📧 Email: info@orbyte.ac.id</p>
                                            <p>📍 Jl. Pendidikan No. 123, Jakarta</p>
                                        </div>
                                    </div>

                                    {/* Signature Section */}
                                    <div className="flex justify-between items-end pt-2 border-t border-gray-200">
                                        <div className="text-center" style={{ fontSize: '7px' }}>
                                            <div className="mb-1">
                                                <div className="w-12 h-8 border-b border-gray-400 mx-auto"></div>
                                            </div>
                                            <p className="font-semibold text-gray-900">Rektor</p>
                                        </div>
                                        <div className="text-center" style={{ fontSize: '7px' }}>
                                            <p className="text-gray-600 mb-1">Berlaku sampai:</p>
                                            <p className="font-bold text-gray-900">{new Date().getFullYear() + 4}</p>
                                        </div>
                                        <div className="text-center" style={{ fontSize: '7px' }}>
                                            <div className="mb-1">
                                                <div className="w-12 h-8 border-b border-gray-400 mx-auto"></div>
                                            </div>
                                            <p className="font-semibold text-gray-900">Pemegang</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                    
                    @page {
                        size: A4;
                        margin: 1cm;
                    }
                    
                    .page-break {
                        page-break-after: always;
                    }
                    
                    .page-break:last-child {
                        page-break-after: auto;
                    }
                }
            `}</style>
        </>
    );
}
