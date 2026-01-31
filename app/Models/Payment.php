<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'payment_method',
        'amount',
        'account_name',
        'payment_code',
        'proof_file_path',
        'status',
        'paid_at',
        'verified_at',
        'verified_by',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'paid_at' => 'datetime',
        'verified_at' => 'datetime',
    ];

    // Status constants
    const STATUS_PENDING = 'pending';
    const STATUS_VERIFIED = 'verified';
    const STATUS_REJECTED = 'rejected';

    // Payment method constants
    const METHOD_BANK_TRANSFER = 'bank_transfer';
    const METHOD_EWALLET = 'ewallet';
    const METHOD_VIRTUAL_ACCOUNT = 'virtual_account';

    // ==================== BOOT METHOD ====================

    protected static function boot()
    {
        parent::boot();

        // Auto-generate payment code when creating
        static::creating(function ($payment) {
            if (!$payment->payment_code) {
                $payment->payment_code = static::generatePaymentCode();
            }
        });
    }

    // ==================== RELATIONSHIPS ====================

    /**
     * Get the registration that owns this payment
     */
    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    /**
     * Get the admin who verified this payment
     */
    public function verifier()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    // ==================== SCOPES ====================

    /**
     * Scope by status
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope pending payments
     */
    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    /**
     * Scope verified payments
     */
    public function scopeVerified($query)
    {
        return $query->where('status', self::STATUS_VERIFIED);
    }

    /**
     * Scope rejected payments
     */
    public function scopeRejected($query)
    {
        return $query->where('status', self::STATUS_REJECTED);
    }

    // ==================== HELPER METHODS ====================

    /**
     * Generate unique payment code
     */
    public static function generatePaymentCode(): string
    {
        $timestamp = now()->format('YmdHis');
        $random = strtoupper(Str::random(4));
        return "PAY-{$timestamp}-{$random}";
    }

    /**
     * Verify payment
     */
    public function verify(int $adminId, ?string $notes = null): void
    {
        $this->update([
            'status' => self::STATUS_VERIFIED,
            'verified_at' => now(),
            'verified_by' => $adminId,
            'notes' => $notes,
        ]);

        // Update registration status
        $this->registration->update([
            'status' => Registration::STATUS_PAYMENT_VERIFIED,
        ]);
    }

    /**
     * Reject payment
     */
    public function reject(int $adminId, string $notes): void
    {
        $this->update([
            'status' => self::STATUS_REJECTED,
            'verified_at' => now(),
            'verified_by' => $adminId,
            'notes' => $notes,
        ]);
    }

    /**
     * Get formatted amount
     */
    public function getFormattedAmountAttribute(): string
    {
        return 'Rp ' . number_format($this->amount, 0, ',', '.');
    }

    /**
     * Get payment method label
     */
    public function getMethodLabelAttribute(): string
    {
        return match($this->payment_method) {
            self::METHOD_BANK_TRANSFER => 'Transfer Bank',
            self::METHOD_EWALLET => 'E-Wallet',
            self::METHOD_VIRTUAL_ACCOUNT => 'Virtual Account',
            default => ucfirst(str_replace('_', ' ', $this->payment_method)),
        };
    }

    /**
     * Get status label
     */
    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            self::STATUS_PENDING => 'Menunggu Verifikasi',
            self::STATUS_VERIFIED => 'Terverifikasi',
            self::STATUS_REJECTED => 'Ditolak',
            default => 'Unknown',
        };
    }

    /**
     * Get status color for UI
     */
    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            self::STATUS_PENDING => 'yellow',
            self::STATUS_VERIFIED => 'green',
            self::STATUS_REJECTED => 'red',
            default => 'gray',
        };
    }

    /**
     * Check if payment is pending
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Check if payment is verified
     */
    public function isVerified(): bool
    {
        return $this->status === self::STATUS_VERIFIED;
    }

    /**
     * Check if payment is rejected
     */
    public function isRejected(): bool
    {
        return $this->status === self::STATUS_REJECTED;
    }

    /**
     * Check if has proof file
     */
    public function hasProof(): bool
    {
        return !empty($this->proof_file_path);
    }

    /**
     * Accessor alias for front-end compatibility: proof_path -> proof_file_path
     */
    public function getProofPathAttribute()
    {
        return $this->proof_file_path;
    }

    /**
     * Accessor alias for front-end compatibility: payment_date -> paid_at
     * Returns Carbon instance (serialized to ISO string by Eloquent)
     */
    public function getPaymentDateAttribute()
    {
        return $this->paid_at;
    }
} 
