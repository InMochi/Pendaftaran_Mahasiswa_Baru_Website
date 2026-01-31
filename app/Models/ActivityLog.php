<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'activity_type',
        'description',
        'ip_address',
        'user_agent',
    ];

    // Activity types
    const TYPE_LOGIN = 'login';
    const TYPE_LOGOUT = 'logout';
    const TYPE_REGISTER = 'register';
    const TYPE_SUBMIT_REGISTRATION = 'submit_registration';
    const TYPE_UPLOAD_DOCUMENT = 'upload_document';
    const TYPE_START_TEST = 'start_test';
    const TYPE_COMPLETE_TEST = 'complete_test';
    const TYPE_SUBMIT_PAYMENT = 'submit_payment';
    const TYPE_VIEW_ANNOUNCEMENT = 'view_announcement';

    // ==================== RELATIONSHIPS ====================

    /**
     * Get the user that owns this log
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // ==================== SCOPES ====================

    /**
     * Scope by activity type
     */
    public function scopeByType($query, $type)
    {
        return $query->where('activity_type', $type);
    }

    /**
     * Scope recent activities
     */
    public function scopeRecent($query, $days = 7)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    /**
     * Scope today's activities
     */
    public function scopeToday($query)
    {
        return $query->whereDate('created_at', today());
    }

    // ==================== HELPER METHODS ====================

    /**
     * Create activity log
     */
    public static function log(
        ?int $userId,
        string $activityType,
        string $description,
        ?string $ipAddress = null,
        ?string $userAgent = null
    ): self {
        return static::create([
            'user_id' => $userId,
            'activity_type' => $activityType,
            'description' => $description,
            'ip_address' => $ipAddress ?? request()->ip(),
            'user_agent' => $userAgent ?? request()->userAgent(),
        ]);
    }

    /**
     * Get activity type label
     */
    public function getTypeLabelAttribute(): string
    {
        return match($this->activity_type) {
            self::TYPE_LOGIN => 'Login',
            self::TYPE_LOGOUT => 'Logout',
            self::TYPE_REGISTER => 'Registrasi Akun',
            self::TYPE_SUBMIT_REGISTRATION => 'Submit Pendaftaran',
            self::TYPE_UPLOAD_DOCUMENT => 'Upload Dokumen',
            self::TYPE_START_TEST => 'Mulai Test',
            self::TYPE_COMPLETE_TEST => 'Selesai Test',
            self::TYPE_SUBMIT_PAYMENT => 'Submit Pembayaran',
            self::TYPE_VIEW_ANNOUNCEMENT => 'Lihat Pengumuman',
            default => ucfirst(str_replace('_', ' ', $this->activity_type)),
        };
    }

    /**
     * Get formatted time
     */
    public function getFormattedTimeAttribute(): string
    {
        return $this->created_at->diffForHumans();
    }

    /**
     * Get browser from user agent
     */
    public function getBrowserAttribute(): string
    {
        if (!$this->user_agent) {
            return 'Unknown';
        }

        if (str_contains($this->user_agent, 'Chrome')) {
            return 'Chrome';
        } elseif (str_contains($this->user_agent, 'Firefox')) {
            return 'Firefox';
        } elseif (str_contains($this->user_agent, 'Safari')) {
            return 'Safari';
        } elseif (str_contains($this->user_agent, 'Edge')) {
            return 'Edge';
        }

        return 'Other';
    }
}
