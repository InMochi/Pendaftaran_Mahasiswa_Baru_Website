import React from 'react';
import { Link, usePage } from '@inertiajs/react';

const steps = [
    { id: 1, name: 'Biodata', path: '/registration/biodata' },
    { id: 2, name: 'Pilihan Prodi', path: '/registration/study-programs' },
    { id: 3, name: 'Dokumen', path: '/registration/documents' },
    { id: 4, name: 'Review', path: '/registration/review' },
];

export default function RegistrationLayout({ children, currentStep, registration }) {
    const { auth } = usePage().props;
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Pendaftaran PMB</h1>
                            {registration?.registration_number && (
                                <p className="text-sm text-gray-500">No. {registration.registration_number}</p>
                            )}
                        </div>
                        <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                            ← Kembali
                        </Link>
                    </div>
                </div>
            </header>

            {/* Progress Tracker */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        {steps.map((step, idx) => {
                            const isActive = currentStep === step.id;
                            const isCompleted = currentStep > step.id;
                            const isClickable = currentStep >= step.id;

                            return (
                                <React.Fragment key={step.id}>
                                    {/* Step Circle */}
                                    <div className="flex flex-col items-center flex-1">
                                        {isClickable ? (
                                            <Link
                                                href={step.path}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition
                                                    ${isActive ? 'bg-indigo-600 text-white shadow-lg scale-110' : ''}
                                                    ${isCompleted ? 'bg-green-500 text-white' : ''}
                                                    ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-500' : ''}
                                                    hover:scale-105`}
                                            >
                                                {isCompleted ? '✓' : step.id}
                                            </Link>
                                        ) : (
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                                                    ${isActive ? 'bg-indigo-600 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-400'}`}
                                            >
                                                {step.id}
                                            </div>
                                        )}
                                        <span className={`text-xs mt-2 font-medium ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
                                            {step.name}
                                        </span>
                                    </div>

                                    {/* Connector Line */}
                                    {idx < steps.length - 1 && (
                                        <div className={`h-1 flex-1 mx-2 rounded transition ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
