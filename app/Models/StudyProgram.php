<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudyProgram extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'faculty',
        'quota',
        'description',
        'is_active',
    ];

    protected $casts = [
        'quota' => 'integer',
        'is_active' => 'boolean',
    ];

    // ==================== RELATIONSHIPS ====================

    /**
     * Get all study program choices
     */
    public function studyProgramChoices()
    {
        return $this->hasMany(StudyProgramChoice::class);
    }

    /**
     * Get all announcements (accepted students)
     */
    public function announcements()
    {
        return $this->hasMany(Announcement::class);
    }

    /**
     * Get accepted students for this program
     */
    public function acceptedStudents()
    {
        return $this->hasMany(Announcement::class)->where('status', 'accepted');
    }

    // ==================== SCOPES ====================

    /**
     * Scope a query to only include active programs
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope by faculty
     */
    public function scopeByFaculty($query, $faculty)
    {
        return $query->where('faculty', $faculty);
    }

    // ==================== HELPER METHODS ====================

    /**
     * Check if quota is available
     */
    public function hasAvailableQuota(): bool
    {
        $acceptedCount = $this->acceptedStudents()->count();
        return $acceptedCount < $this->quota;
    }

    /**
     * Get remaining quota
     */
    public function getRemainingQuota(): int
    {
        $acceptedCount = $this->acceptedStudents()->count();
        return max(0, $this->quota - $acceptedCount);
    }

    /**
     * Get acceptance rate
     */
    public function getAcceptanceRate(): float
    {
        if ($this->quota == 0) return 0;
        
        $acceptedCount = $this->acceptedStudents()->count();
        return ($acceptedCount / $this->quota) * 100;
    }
}
