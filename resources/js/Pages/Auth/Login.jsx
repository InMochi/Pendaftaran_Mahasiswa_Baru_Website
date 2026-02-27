import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = async (e) => {
        e.preventDefault();
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        try {
            const res = await axios.post('/login', {
                email: data.email,
                password: data.password,
                remember: data.remember,
            }, { headers: { 'X-CSRF-TOKEN': token }, withCredentials: true });

            // Use redirect URL from server when available
            const redirect = res.data?.redirect || (res.request?.responseURL ? new URL(res.request.responseURL).pathname : '/dashboard');
            window.location.href = redirect;
        } catch (err) {
            // Map server validation errors to Inertia-like errors if possible
            console.error(err.response || err);
            if (err.response?.data?.errors) {
                // Simple client-side display via alert for now
                alert(Object.values(err.response.data.errors).flat().join('\n'));
            } else {
                alert('Login failed: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    return (
        <>
            <Head title="Login" />
            
            <div className="min-h-screen flex items-center justify-center  from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold text-gray-900">
                            PMB Orbyte System
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Masuk ke akun Anda
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <input type="hidden" name="_token" value={typeof document !== 'undefined' ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') : ''} />
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    placeholder="nama@email.com"
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                <path d="M15.171 13.576l1.414 1.414A10.016 10.016 0 0020.583 10c-1.274-4.057-5.064-7-9.542-7a9.948 9.948 0 00-2.742.384l1.414 1.414a7.971 7.971 0 018.547 8.178zM12.53 12.53l2.049 2.049A4 4 0 007.42 7.42l2.05 2.05a2 2 0 002.06 2.06z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                        Ingat saya
                                    </label>
                                </div>

                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Lupa password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                {processing ? 'Loading...' : 'Masuk'}
                            </button>
                        </form>

                        {/* Register Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Belum punya akun?{' '}
                                <Link
                                    href="/register"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Daftar sekarang
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Back to Home */}
                    <div className="text-center">
                        <Link
                            href="/"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            ← Kembali ke halaman utama
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
