import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import RegistrationLayout from './Layout';

export default function StudyPrograms({ registration, studyPrograms, choices }) {
    const [selectedChoices, setSelectedChoices] = useState(
        choices?.map((c, idx) => ({
            study_program_id: c.study_program_id,
            priority: c.priority,
            program: c.study_program,
        })) || []
    );

    const handleAdd = (program) => {
        if (selectedChoices.length >= 3) {
            alert('Maksimal 3 pilihan!');
            return;
        }
        if (selectedChoices.find(c => c.study_program_id === program.id)) {
            alert('Program sudah dipilih!');
            return;
        }
        setSelectedChoices([
            ...selectedChoices,
            {
                study_program_id: program.id,
                priority: selectedChoices.length + 1,
                program: program,
            },
        ]);
    };

    const handleRemove = (id) => {
        const filtered = selectedChoices.filter(c => c.study_program_id !== id);
        // Re-assign priorities
        setSelectedChoices(filtered.map((c, idx) => ({ ...c, priority: idx + 1 })));
    };

    const handleMoveUp = (idx) => {
        if (idx === 0) return;
        const arr = [...selectedChoices];
        [arr[idx], arr[idx - 1]] = [arr[idx - 1], arr[idx]];
        setSelectedChoices(arr.map((c, i) => ({ ...c, priority: i + 1 })));
    };

    const handleMoveDown = (idx) => {
        if (idx === selectedChoices.length - 1) return;
        const arr = [...selectedChoices];
        [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
        setSelectedChoices(arr.map((c, i) => ({ ...c, priority: i + 1 })));
    };

    const handleSubmit = () => {
        if (selectedChoices.length === 0) {
            alert('Pilih minimal 1 program studi!');
            return;
        }
        router.post('/registration/study-programs', {
            choices: selectedChoices.map(c => ({
                study_program_id: c.study_program_id,
                priority: c.priority,
            })),
        });
    };

    // Group programs by faculty
    const grouped = studyPrograms.reduce((acc, p) => {
        (acc[p.faculty] = acc[p.faculty] || []).push(p);
        return acc;
    }, {});

    return (
        <>
            <Head title="Pilihan Program Studi - Pendaftaran" />
            <RegistrationLayout currentStep={2} registration={registration}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Selected Choices */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Pilihan Anda ({selectedChoices.length}/3)</h3>
                            {selectedChoices.length === 0 ? (
                                <p className="text-sm text-gray-400 text-center py-8">Belum ada pilihan</p>
                            ) : (
                                <div className="space-y-3">
                                    {selectedChoices.map((choice, idx) => (
                                        <div key={choice.study_program_id} className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                        {choice.priority}
                                                    </span>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm">{choice.program.name}</p>
                                                        <p className="text-xs text-gray-500">{choice.program.faculty}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleRemove(choice.study_program_id)} className="text-red-500 hover:text-red-700">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleMoveUp(idx)}
                                                    disabled={idx === 0}
                                                    className="flex-1 text-xs px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                                                >
                                                    ↑
                                                </button>
                                                <button
                                                    onClick={() => handleMoveDown(idx)}
                                                    disabled={idx === selectedChoices.length - 1}
                                                    className="flex-1 text-xs px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                                                >
                                                    ↓
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <button
                                onClick={handleSubmit}
                                disabled={selectedChoices.length === 0}
                                className="w-full mt-6 px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Simpan & Lanjutkan →
                            </button>
                        </div>
                    </div>

                    {/* Available Programs */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pilih Program Studi</h2>
                            {Object.entries(grouped).map(([faculty, programs]) => (
                                <div key={faculty} className="mb-6 last:mb-0">
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">{faculty}</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {programs.map(p => {
                                            const isSelected = selectedChoices.find(c => c.study_program_id === p.id);
                                            const isFull = !p.hasAvailableQuota?.() && p.quota <= p.registered_count;
                                            return (
                                                <button
                                                    key={p.id}
                                                    onClick={() => handleAdd(p)}
                                                    disabled={isSelected || isFull}
                                                    className={`text-left p-4 rounded-lg border-2 transition ${
                                                        isSelected
                                                            ? 'border-indigo-300 bg-indigo-50 cursor-not-allowed'
                                                            : isFull
                                                            ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                                                            : 'border-gray-200 hover:border-indigo-500 hover:shadow-md'
                                                    }`}
                                                >
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="flex-1">
                                                            <p className="font-semibold text-gray-900">{p.name}</p>
                                                            <p className="text-xs text-gray-500 mt-0.5">{p.code}</p>
                                                        </div>
                                                        {isSelected && (
                                                            <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">Dipilih</span>
                                                        )}
                                                        {isFull && (
                                                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Penuh</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                                        <span>Kuota: {p.quota}</span>
                                                        {p.description && <span className="truncate">{p.description}</span>}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </RegistrationLayout>
        </>
    );
}
