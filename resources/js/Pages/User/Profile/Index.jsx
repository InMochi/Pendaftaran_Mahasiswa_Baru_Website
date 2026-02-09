import React, { useState, useEffect } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function ProfileIndex({ user }) {
    const [activeTab, setActiveTab] = useState('account');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    // Helper function to format date to Y-m-d
    const formatDateToInput = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '';
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        } catch {
            return '';
        }
    };

    // Account Form
    const accountForm = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.registrations?.[0]?.biodata?.phone || user.phone || '',
    });

    // Biodata Form
    const biodataForm = useForm({
        nik: user.registrations?.[0]?.biodata?.nik || '',
        full_name: user.registrations?.[0]?.biodata?.full_name || '',
        birth_place: user.registrations?.[0]?.biodata?.birth_place || '',
        birth_date: formatDateToInput(user.registrations?.[0]?.biodata?.birth_date),
        gender: user.registrations?.[0]?.biodata?.gender || '',
        phone: user.registrations?.[0]?.biodata?.phone || '',
        address: user.registrations?.[0]?.biodata?.address || '',
        school_origin: user.registrations?.[0]?.biodata?.school_origin || '',
    });

    useEffect(() => {
        const formattedDate = formatDateToInput(user.registrations?.[0]?.biodata?.birth_date);
        if (formattedDate && biodataForm.data.birth_date !== formattedDate) {
            biodataForm.setData('birth_date', formattedDate);
        }
    }, [user.registrations?.[0]?.biodata?.birth_date]);

    // Password Form
    const passwordForm = useForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    const handleAccountSubmit = (e) => {
        e.preventDefault();
        accountForm.put('/profile/update', {
            onSuccess: () => accountForm.reset(),
        });
    };

    const handleBiodataSubmit = (e) => {
        e.preventDefault();
        biodataForm.put('/profile/biodata/update', {
            onSuccess: () => {},
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.post('/profile/change-password', {
            onSuccess: () => {
                passwordForm.reset();
                setShowPasswordModal(false);
            },
        });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('File maksimal 2MB!');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => setAvatarPreview(e.target.result);
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('avatar', file);
            
            router.post('/profile/avatar/update', formData, {
                onSuccess: () => {
                    setAvatarPreview(null);
                },
            });
        }
    };

    const handleDeleteAvatar = () => {
        if (!confirm('Hapus foto profil?')) return;
        router.delete('/profile/avatar/delete');
    };

    const tabs = [
        { id: 'account', label: 'Akun', icon: '👤' },
        { id: 'biodata', label: 'Biodata', icon: '📝' },
        { id: 'security', label: 'Keamanan', icon: '🔒' },
    ];

    const biodata = user.registrations?.[0]?.biodata;
    const avatarUrl = user.avatar_path ? `/storage/${user.avatar_path}` : null;

    return (
        <>
            <Head title="Profil Saya" />

            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>
                            <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                ← Kembali ke Dashboard
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar - Profile Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                                <div className="mb-4">
                                    <div className="relative inline-block">
                                        {avatarPreview || avatarUrl ? (
                                            <img
                                                src={avatarPreview || avatarUrl}
                                                alt="Avatar"
                                                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                                            />
                                        ) : (
                                            <div className="w-32 h-32 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <label className="absolute bottom-0 right-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition shadow-lg">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
                                <p className="text-sm text-gray-500 mb-4">{user.email}</p>

                                {avatarUrl && (
                                    <button
                                        onClick={handleDeleteAvatar}
                                        className="text-xs text-red-600 hover:text-red-700 font-medium"
                                    >
                                        Hapus Foto
                                    </button>
                                )}

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="text-left space-y-3">
                                        <div>
                                            <p className="text-xs text-gray-500">Waktu Pendaftaran</p>
                                            <p className="text-sm font-semibold text-gray-900">
                                                {new Date(user.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
                                            </p>
                                        </div>
                                        {user.registrations?.[0] && (
                                            <div>
                                                <p className="text-xs text-gray-500">No. Registrasi</p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {user.registrations[0].registration_number}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {/* Tabs */}
                            <div className="bg-white rounded-2xl shadow-md mb-6">
                                <div className="flex border-b border-gray-200">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex-1 px-6 py-4 text-sm font-semibold transition ${
                                                activeTab === tab.id
                                                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                                                    : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                        >
                                            <span className="mr-2">{tab.icon}</span>
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tab Content */}
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                {/* Account Tab */}
                                {activeTab === 'account' && (
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-6">Informasi Akun</h3>
                                        <form onSubmit={handleAccountSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Nama Lengkap *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={accountForm.data.name}
                                                    onChange={e => accountForm.setData('name', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                                {accountForm.errors.name && (
                                                    <p className="text-sm text-red-600 mt-1">{accountForm.errors.name}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    value={accountForm.data.email}
                                                    onChange={e => accountForm.setData('email', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                                {accountForm.errors.email && (
                                                    <p className="text-sm text-red-600 mt-1">{accountForm.errors.email}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    No. Telepon
                                                </label>
                                                <input
                                                    type="text"
                                                    value={accountForm.data.phone}
                                                    onChange={e => accountForm.setData('phone', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="08xxx"
                                                />
                                                {accountForm.errors.phone && (
                                                    <p className="text-sm text-red-600 mt-1">{accountForm.errors.phone}</p>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={accountForm.processing}
                                                className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                                            >
                                                {accountForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {/* Biodata Tab */}
                                {activeTab === 'biodata' && (
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-6">Biodata Lengkap</h3>
                                        
                                        {biodata ? (
                                            <form onSubmit={handleBiodataSubmit} className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">NIK *</label>
                                                        <input
                                                            type="text"
                                                            value={biodataForm.data.nik}
                                                            onChange={e => biodataForm.setData('nik', e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                            maxLength="16"
                                                        />
                                                        {biodataForm.errors.nik && (
                                                            <p className="text-sm text-red-600 mt-1">{biodataForm.errors.nik}</p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                                                        <input
                                                            type="text"
                                                            value={biodataForm.data.full_name}
                                                            onChange={e => biodataForm.setData('full_name', e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                        />
                                                        {biodataForm.errors.full_name && (
                                                            <p className="text-sm text-red-600 mt-1">{biodataForm.errors.full_name}</p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir *</label>
                                                        <input
                                                            type="text"
                                                            value={biodataForm.data.birth_place}
                                                            onChange={e => biodataForm.setData('birth_place', e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir *</label>
                                                        <input
                                                            type="date"
                                                            value={biodataForm.data.birth_date}
                                                            onChange={e => biodataForm.setData('birth_date', e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin *</label>
                                                        <select
                                                            value={biodataForm.data.gender}
                                                            onChange={e => biodataForm.setData('gender', e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                        >
                                                            <option value="">Pilih</option>
                                                            <option value="male">Laki-laki</option>
                                                            <option value="female">Perempuan</option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon *</label>
                                                        <input
                                                            type="text"
                                                            value={biodataForm.data.phone}
                                                            onChange={e => biodataForm.setData('phone', e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                        />
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap *</label>
                                                        <textarea
                                                            value={biodataForm.data.address}
                                                            onChange={e => biodataForm.setData('address', e.target.value)}
                                                            rows={3}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
                                                        />
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Asal Sekolah *</label>
                                                        <input
                                                            type="text"
                                                            value={biodataForm.data.school_origin}
                                                            onChange={e => biodataForm.setData('school_origin', e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={biodataForm.processing}
                                                    className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                                                >
                                                    {biodataForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                                </button>
                                            </form>
                                        ) : (
                                            <div className="text-center py-12">
                                                <p className="text-gray-500 mb-4">Biodata belum tersedia. Silakan lengkapi pendaftaran terlebih dahulu.</p>
                                                <Link href="/registration" className="inline-block px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">
                                                    Mulai Pendaftaran
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Security Tab */}
                                {activeTab === 'security' && (
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-6">Keamanan Akun</h3>
                                        
                                        <div className="space-y-4">
                                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">Password</h4>
                                                        <p className="text-sm text-gray-600">Terakhir diubah: {new Date(user.updated_at).toLocaleDateString('id-ID')}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setShowPasswordModal(true)}
                                                        className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                                                    >
                                                        Ubah Password
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                <h4 className="font-semibold text-blue-900 mb-2">Tips Keamanan</h4>
                                                <ul className="text-sm text-blue-800 space-y-1">
                                                    <li>• Gunakan password minimal 8 karakter</li>
                                                    <li>• Kombinasikan huruf besar, kecil, angka, dan simbol</li>
                                                    <li>• Jangan bagikan password ke siapapun</li>
                                                    <li>• Ubah password secara berkala</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPasswordModal(false)} />
                    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Ubah Password</h3>
                        
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password Saat Ini *
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.data.current_password}
                                    onChange={e => passwordForm.setData('current_password', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                                {passwordForm.errors.current_password && (
                                    <p className="text-sm text-red-600 mt-1">{passwordForm.errors.current_password}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password Baru *
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.data.new_password}
                                    onChange={e => passwordForm.setData('new_password', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                                {passwordForm.errors.new_password && (
                                    <p className="text-sm text-red-600 mt-1">{passwordForm.errors.new_password}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Konfirmasi Password Baru *
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.data.new_password_confirmation}
                                    onChange={e => passwordForm.setData('new_password_confirmation', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordModal(false)}
                                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="flex-1 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                                >
                                    {passwordForm.processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
