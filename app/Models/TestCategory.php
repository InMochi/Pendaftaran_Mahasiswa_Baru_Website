<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'duration_minutes',
        'is_active',
    ];

    protected $casts = [
        'duration_minutes' => 'integer',
        'is_active' => 'boolean',
    ];

    // ==================== RELATIONSHIPS ====================

    /**
     * Get all questions for this category
     */
    public function testQuestions()
    {
        return $this->hasMany(TestQuestion::class);
    }

    /**
     * Get active questions only
     */
    public function activeQuestions()
    {
        return $this->hasMany(TestQuestion::class)->where('is_active', true);
    }

    /**
     * Get all test scores for this category
     */
    public function testScores()
    {
        return $this->hasMany(TestScore::class);
    }

    // ==================== SCOPES ====================

    /**
     * Scope active categories
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // ==================== HELPER METHODS ====================

    /**
     * Get total questions count
     */
    public function getTotalQuestions(): int
    {
        return $this->testQuestions()->count();
    }

    /**
     * Get active questions count
     */
    public function getActiveQuestionsCount(): int
    {
        return $this->activeQuestions()->count();
    }

    /**
     * Get total possible points
     */
    public function getTotalPoints(): int
    {
        return $this->activeQuestions()->sum('points');
    }

    /**
     * Get formatted duration
     */
    public function getFormattedDuration(): string
    {
        $minutes = $this->duration_minutes;
        
        if ($minutes >= 60) {
            $hours = floor($minutes / 60);
            $remainingMinutes = $minutes % 60;
            
            if ($remainingMinutes > 0) {
                return "{$hours} jam {$remainingMinutes} menit";
            }
            return "{$hours} jam";
        }
        
        return "{$minutes} menit";
    }
}
