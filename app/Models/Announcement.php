<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'study_program_id',
        'status',
        'total_score',
        'rank',
        'announced_at',
        'notes',
    ];

    protected $casts = [
        'total_score' => 'decimal:2',
        'rank' => 'integer',
        'announced_at' => 'datetime',
    ];

    // Status constants
    const STATUS_ACCEPTED = 'accepted';
    const STATUS_REJECTED = 'rejected';
    const STATUS_WAITING_LIST = 'waiting_list';

    // ==================== RELATIONSHIPS ====================

    /**
     * Get the registration
     */
    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    /**
     * Get the accepted study program
     */
    public function studyProgram()
    {
        return $this->belongsTo(StudyProgram::class);
    }

    /**
     * Get re-registration data
     */
    public function reRegistration()
    {
        return $this->hasOne(ReRegistration::class);
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
     * Scope accepted students
     */
    public function scopeAccepted($query)
    {
        return $query->where('status', self::STATUS_ACCEPTED);
    }

    /**
     * Scope rejected students
     */
    public function scopeRejected($query)
    {
        return $query->where('status', self::STATUS_REJECTED);
    }

    /**
     * Scope waiting list
     */
    public function scopeWaitingList($query)
    {
        return $query->where('status', self::STATUS_WAITING_LIST);
    }

    /**
     * Scope by study program
     */
    public function scopeByStudyProgram($query, $studyProgramId)
    {
        return $query->where('study_program_id', $studyProgramId);
    }

    /**
     * Order by rank
     */
    public function scopeOrderByRank($query)
    {
        return $query->orderBy('rank', 'asc');
    }

    // ==================== HELPER METHODS ====================

    /**
     * Get status label
     */
    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            self::STATUS_ACCEPTED => 'Diterima',
            self::STATUS_REJECTED => 'Tidak Diterima',
            self::STATUS_WAITING_LIST => 'Daftar Tunggu',
            default => 'Unknown',
        };
    }

    /**
     * Get status color
     */
    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            self::STATUS_ACCEPTED => 'green',
            self::STATUS_REJECTED => 'red',
            self::STATUS_WAITING_LIST => 'yellow',
            default => 'gray',
        };
    }

    /**
     * Check if accepted
     */
    public function isAccepted(): bool
    {
        return $this->status === self::STATUS_ACCEPTED;
    }

    /**
     * Check if rejected
     */
    public function isRejected(): bool
    {
        return $this->status === self::STATUS_REJECTED;
    }

    /**
     * Check if in waiting list
     */
    public function isWaitingList(): bool
    {
        return $this->status === self::STATUS_WAITING_LIST;
    }

    /**
     * Check if re-registration is completed
     */
    public function hasCompletedReRegistration(): bool
    {
        return $this->reRegistration 
            && $this->reRegistration->status === ReRegistration::STATUS_COMPLETED;
    }

    /**
     * Get formatted rank
     */
    public function getFormattedRankAttribute(): string
    {
        if (!$this->rank) {
            return '-';
        }

        return '#' . $this->rank;
    }

    /**
     * Send notification (placeholder for actual implementation)
     */
    public function sendNotification(): void
    {
        // TODO: Implement email/SMS notification
        // This would typically use Laravel's notification system
    }

    public function study_program()
    {
        return $this->belongsTo(\App\Models\StudyProgram::class, 'study_program_id');
    }
}
