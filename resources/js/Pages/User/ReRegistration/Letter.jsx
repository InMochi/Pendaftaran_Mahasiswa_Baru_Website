import React from 'react';
import { Head } from '@inertiajs/react';

export default function Letter({ registration, announcement, reRegistration }) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <Head title="Surat Keterangan Lulus" />

            {/* Print button (hidden when printing) */}
            <div className="fixed top-4 right-4 print:hidden">
                <button
                    onClick={handlePrint}
                    className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-lg"
                >
                    🖨️ Print
                </button>
            </div>

            {/* Letter content */}
            <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center border-b-4 border-indigo-600 pb-6 mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Orbyte University</h1>
                    <p className="text-sm text-gray-600">Jl. Pendidikan No. 123, Jakarta 12345</p>
                    <p className="text-sm text-gray-600">Telp: (021) 1234567 | Orbyte@University.ac.id</p>
                </div>

                {/* Letter number */}
                <div className="mb-6">
                    <p className="text-sm">
                        <span className="inline-block w-32">Nomor</span>
                        : {reRegistration.letter_number || `001/SKL/${new Date().getFullYear()}`}
                    </p>
                    <p className="text-sm">
                        <span className="inline-block w-32">Lampiran</span>
                        : -
                    </p>
                    <p className="text-sm">
                        <span className="inline-block w-32">Perihal</span>
                        : <strong>Surat Keterangan Lulus Seleksi</strong>
                    </p>
                </div>

                {/* Body */}
                <div className="mb-8">
                    <p className="mb-4">Kepada Yth,</p>
                    <p className="mb-4"><strong>{registration.biodata?.full_name}</strong></p>
                    <p className="mb-6">Di tempat</p>

                    <p className="mb-4">Dengan hormat,</p>
                    <p className="mb-4 text-justify">
                        Berdasarkan hasil seleksi Penerimaan MahaOrbyte University) Tahun Akademik {new Date().getFullYear()}/{new Date().getFullYear() + 1}, 
                        dengan ini kami umumkan bahwa:
                    </p>

                    <table className="w-full mb-6 border-collapse">
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border border-gray-300 bg-gray-50 w-1/3">Nama</td>
                                <td className="py-2 px-4 border border-gray-300">{registration.biodata?.full_name}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-300 bg-gray-50">No. Pendaftaran</td>
                                <td className="py-2 px-4 border border-gray-300">{registration.registration_number}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-300 bg-gray-50">Tempat, Tanggal Lahir</td>
                                <td className="py-2 px-4 border border-gray-300">
                                    {registration.biodata?.birth_place}, {new Date(registration.biodata?.birth_date).toLocaleDateString('id-ID')}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-300 bg-gray-50">Asal Sekolah</td>
                                <td className="py-2 px-4 border border-gray-300">{registration.biodata?.school_origin}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="mb-6 text-justify">
                        Dinyatakan <strong className="text-green-600">LULUS</strong> seleksi dan <strong>DITERIMA</strong> sebagai 
                        calon mahasiswa baru pada:
                    </p>

                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-6 text-center">
                        <p className="text-sm text-gray-600 mb-1">Program Studi</p>
                        <p className="text-2xl font-bold text-green-700 mb-2">{announcement.study_program?.name}</p>
                        <p className="text-sm text-gray-600">
                            Peringkat: <strong className="text-gray-900">#{announcement.rank}</strong> | 
                            Total Skor: <strong className="text-gray-900">{announcement.total_score}</strong>
                        </p>
                    </div>

                    <p className="mb-6 text-justify">
                        Selanjutnya dimohon untuk mengikuti program orientasi mahasiswa baru yang akan diselenggarakan 
                        pada tanggal yang akan ditentukan kemudian.
                    </p>

                    <p className="mb-2">Demikian surat keterangan ini dibuat untuk dapat dipergunakan sebagaimana mestinya.</p>
                </div>

                {/* Signature */}
                <div className="flex justify-between items-end mt-12">
                    <div className="text-center">
                        <p className="text-sm mb-16">Mengetahui,</p>
                        <p className="text-sm font-bold">KeOrbyte University</p>
                        <p className="text-sm mt-8 border-t border-gray-400 pt-1 inline-block px-8">
                            Dr. Tony Felicio Farrel, M.Pd
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-sm mb-1">Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <p className="text-sm mb-16">Rektor Orbyte University</p>
                        <p className="text-sm font-bold mt-8 border-t border-gray-400 pt-1 inline-block px-8">
                            Prof. Dr. Hafizh Pratama, M.Sc
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-gray-200 text-center">
                    <p className="text-xs text-gray-500">
                        Dokumen ini dicetak pada {new Date().toLocaleString('id-ID')}
                    </p>
                    <p className="text-xs text-gray-500">
                        Verifikasi: {reRegistration.id}-{registration.registration_number}
                    </p>
                </div>
            </div>

            {/* Print styles */}
            <style jsx global>{`
                @media print {
                    body {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                    @page {
                        margin: 2cm;
                        size: A4;
                    }
                }
            `}</style>
        </>
    );
}
