<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display list of payments awaiting verification
     */
    public function index()
    {
        $payments = Payment::with(['registration.user', 'registration.biodata'])
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Admin/Payment/Index', [
            'payments' => $payments,
        ]);
    }

    /**
     * Verify payment
     */
    public function verify(Payment $payment)
    {
        if ($payment->status !== 'pending') {
            return redirect()->back()
                ->with('error', 'Pembayaran sudah diverifikasi atau ditolak.');
        }

        $payment->verify(Auth::id());

        return redirect()->route('admin.payments.index')
            ->with('success', 'Pembayaran berhasil diverifikasi.');
    }

    /**
     * Reject payment
     */
    public function reject(Request $request, Payment $payment)
    {
        if ($payment->status !== 'pending') {
            return redirect()->back()
                ->with('error', 'Pembayaran sudah diverifikasi atau ditolak.');
        }

        $validated = $request->validate([
            'rejection_reason' => ['required', 'string'],
        ], [
            'rejection_reason.required' => 'Alasan penolakan harus diisi.',
        ]);

        $payment->reject(Auth::id(), $validated['rejection_reason']);

        return redirect()->route('admin.payments.index')
            ->with('success', 'Pembayaran ditolak. Peserta harus upload ulang.');
    }
}
