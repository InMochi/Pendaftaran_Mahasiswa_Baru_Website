import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import RegistrationLayout from './Layout';

export default function Biodata({ registration, biodata }) {
    const [form, setForm] = useState({
        nik: biodata?.nik || '',
        full_name: biodata?.full_name || '',
        birth_place: biodata?.birth_place || '',
        birth_date: biodata?.birth_date ? biodata.birth_date.substr(0,10) : '',
        gender: biodata?.gender || '',
        religion: biodata?.religion || '',
        phone: biodata?.phone || '',
        email: registration?.user?.email || '',
        address: biodata?.address || '',
        province: biodata?.province || '',
        city: biodata?.city || '',
        postal_code: biodata?.postal_code || '',
        school_origin: biodata?.school_origin || '',
        graduation_year: biodata?.graduation_year || '',
        // map parent fields from DB columns
        father_name: biodata?.parent_name || '',
        father_occupation: biodata?.parent_job || '',
        mother_name:  biodata?.parent_name || '',
        mother_occupation: biodata?.parent_job || '',
        parent_phone: biodata?.parent_phone || '',
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/registration/biodata', form, {
            onError: (err) => setErrors(err),
        });
    };

    const religions = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'];

    return (
        <>
            <Head title="Biodata - Pendaftaran" />
            <RegistrationLayout currentStep={1} registration={registration}>
                <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Pribadi</h2>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Identitas */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Identitas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">NIK (16 digit) *</label>
                                    <input
                                        type="text"
                                        value={form.nik}
                                        onChange={e => setForm({ ...form, nik: e.target.value })}
                                        maxLength={16}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="3201234567890123"
                                    />
                                    {errors.nik && <p className="text-red-600 text-sm mt-1">{errors.nik}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                                    <input
                                        type="text"
                                        value={form.full_name}
                                        onChange={e => setForm({ ...form, full_name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Nama sesuai KTP"
                                    />
                                    {errors.full_name && <p className="text-red-600 text-sm mt-1">{errors.full_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir *</label>
                                    <input
                                        type="text"
                                        value={form.birth_place}
                                        onChange={e => setForm({ ...form, birth_place: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.birth_place && <p className="text-red-600 text-sm mt-1">{errors.birth_place}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir *</label>
                                    <input
                                        type="date"
                                        value={form.birth_date}
                                        onChange={e => setForm({ ...form, birth_date: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.birth_date && <p className="text-red-600 text-sm mt-1">{errors.birth_date}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin *</label>
                                    <select
                                        value={form.gender}
                                        onChange={e => setForm({ ...form, gender: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="">Pilih</option>
                                        <option value="male">Laki-laki</option>
                                        <option value="female">Perempuan</option>
                                    </select>
                                    {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Agama *</label>
                                    <select
                                        value={form.religion}
                                        onChange={e => setForm({ ...form, religion: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="">Pilih</option>
                                        {religions.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                    {errors.religion && <p className="text-red-600 text-sm mt-1">{errors.religion}</p>}
                                </div>
                            </div>
                        </section>

                        {/* Kontak */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Kontak</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">No. HP *</label>
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={e => setForm({ ...form, phone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="08123456789"
                                    />
                                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                    <input
                                        type="email"
                                        disabled
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap *</label>
                                    <textarea
                                        value={form.address}
                                        onChange={e => setForm({ ...form, address: e.target.value })}
                                        rows={2}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                                    />
                                    {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi *</label>
                                    <input
                                        type="text"
                                        value={form.province}
                                        onChange={e => setForm({ ...form, province: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.province && <p className="text-red-600 text-sm mt-1">{errors.province}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Kota/Kabupaten *</label>
                                    <input
                                        type="text"
                                        value={form.city}
                                        onChange={e => setForm({ ...form, city: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos *</label>
                                    <input
                                        type="text"
                                        value={form.postal_code}
                                        onChange={e => setForm({ ...form, postal_code: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.postal_code && <p className="text-red-600 text-sm mt-1">{errors.postal_code}</p>}
                                </div>
                            </div>
                        </section>

                        {/* Pendidikan */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Pendidikan</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Asal Sekolah *</label>
                                    <input
                                        type="text"
                                        value={form.school_origin}
                                        onChange={e => setForm({ ...form, school_origin: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="SMA/SMK/MA..."
                                    />
                                    {errors.school_origin && <p className="text-red-600 text-sm mt-1">{errors.school_origin}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Lulus *</label>
                                    <input
                                        type="number"
                                        value={form.graduation_year}
                                        onChange={e => setForm({ ...form, graduation_year: e.target.value })}
                                        min={1990}
                                        max={new Date().getFullYear() + 1}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.graduation_year && <p className="text-red-600 text-sm mt-1">{errors.graduation_year}</p>}
                                </div>
                            </div>
                        </section>

                        {/* Data Orang Tua */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Data Orang Tua</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Orang Tua *</label>
                                    <input
                                        type="text"
                                        value={form.father_name}
                                        onChange={e => setForm({ ...form, father_name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.father_name && <p className="text-red-600 text-sm mt-1">{errors.father_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan Orang Tua *</label>
                                    <input
                                        type="text"
                                        value={form.father_occupation}
                                        onChange={e => setForm({ ...form, father_occupation: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.father_occupation && <p className="text-red-600 text-sm mt-1">{errors.father_occupation}</p>}
                                </div>


                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">No. HP Orang Tua *</label>
                                    <input
                                        type="tel"
                                        value={form.parent_phone}
                                        onChange={e => setForm({ ...form, parent_phone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.parent_phone && <p className="text-red-600 text-sm mt-1">{errors.parent_phone}</p>}
                                </div>
                            </div>
                        </section>

                        {/* Submit */}
                        <div className="flex justify-end pt-4 border-t">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm"
                            >
                                Simpan & Lanjutkan →
                            </button>
                        </div>
                    </form>
                </div>
            </RegistrationLayout>
        </>
    );
}
