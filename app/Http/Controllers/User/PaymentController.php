<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Show payment page
     */
    public function index()
    {
        $registration = Auth::user()->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('dashboard')
                ->with('error', 'Belum ada pendaftaran aktif.');
        }

        // Check if registration is submitted
        if ($registration->status === 'draft') {
            return redirect()->route('registration.index')
                ->with('error', 'Submit pendaftaran terlebih dahulu.');
        }

        $payment = $registration->payment;

        return Inertia::render('User/Payment/Index', [
            'registration' => $registration,
            'payment' => $payment,
        ]);
    }

    /**
     * Store payment proof
     */
    public function store(Request $request)
    {
        $registration = Auth::user()->getActiveRegistration();

        if (!$registration) {
            return redirect()->route('dashboard')
                ->with('error', 'Belum ada pendaftaran aktif.');
        }

        if ($registration->status === 'draft') {
            return redirect()->route('registration.index')
                ->with('error', 'Submit pendaftaran terlebih dahulu.');
        }

        $validated = $request->validate([
            'amount' => 'required|numeric',
            'payment_method' => 'required',
            'account_name' => 'required|string',
            'paid_at' => 'required|date',
            'proof_file' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'notes' => ['nullable', 'string'],
        ], [
            'amount.required' => 'Jumlah pembayaran harus diisi.',
            'payment_method.required' => 'Metode pembayaran harus dipilih.',
            'account_name.required' => 'Nama pengirim harus diisi.',
            'paid_at.required' => 'Tanggal pembayaran harus diisi.',
            'proof_file.required' => 'Bukti pembayaran harus diupload.',
            'proof_file.max' => 'File maksimal 2MB.',
            'proof_file.mimes' => 'File harus berupa gambar atau PDF.',
        ]);

        // Delete old payment if exists
        if ($registration->payment) {
            if ($registration->payment->proof_path) {
                Storage::disk('public')->delete($registration->payment->proof_path);
            }
            $registration->payment->delete();
        }

        // Store file
        $file = $request->file('proof_file');
        $filename = time() . '_payment.' . $file->extension();
        $path = $file->storeAs('payments/' . $registration->id, $filename, 'public');

        // Create payment record (store in DB columns)
        Payment::create([
            'registration_id' => $registration->id,
            'amount' => $validated['amount'],
            'payment_method' => $validated['payment_method'],
            'account_name' => $validated['account_name'],
            'paid_at' => $validated['paid_at'],
            'proof_file_path' => $path,
            'notes' => $validated['notes'],
            'status' => 'pending',
        ]);

        // Update registration status
        $registration->update(['status' => 'payment_pending']);

        ActivityLog::log(
            Auth::id(),
            ActivityLog::TYPE_SUBMIT_PAYMENT,
            'Submitted payment proof for registration: ' . $registration->registration_number
        );

        return redirect()->route('payment.index')
            ->with('success', 'Bukti pembayaran berhasil diupload. Menunggu verifikasi admin.');
    }
}
