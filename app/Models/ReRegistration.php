<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Registration;
use App\Models\Document;




class ReRegistration extends Model
{
    use HasFactory;

    protected $fillable = [
        'announcement_id',
        'registration_id',
        'status',
        'completed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
    ];

    // Status constants
    const STATUS_PENDING = 'pending';
    const STATUS_COMPLETED = 'completed';

    // ==================== RELATIONSHIPS ====================

    /**
     * Get the announcement
     */
    public function announcement()
    {
        return $this->belongsTo(Announcement::class);
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
     * Scope pending re-registrations
     */
    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    /**
     * Scope completed re-registrations
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', self::STATUS_COMPLETED);
    }

    // ==================== HELPER METHODS ====================

    /**
     * Mark as completed
     */
    public function complete(): void
    {
        $this->update([
            'status' => self::STATUS_COMPLETED,
            'completed_at' => now(),
        ]);
    }

    /**
     * Check if pending
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Check if completed
     */
    public function isCompleted(): bool
    {
        return $this->status === self::STATUS_COMPLETED;
    }

    /**
     * Get status label
     */
    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            self::STATUS_PENDING => 'Menunggu',
            self::STATUS_COMPLETED => 'Selesai',
            default => 'Unknown',
        };
    }

    /**
     * Get status color
     */
    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            self::STATUS_PENDING => 'yellow',
            self::STATUS_COMPLETED => 'green',
            default => 'gray',
        };
    }

    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'registration_id', 'registration_id');
    }
    public function getDocumentsByTypeAttribute()
    {
        return $this->documents->keyBy('document_type');
    }

}
