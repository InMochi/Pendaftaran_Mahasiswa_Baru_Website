<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'test_session_id',
        'test_category_id',
        'score',
    ];

    protected $casts = [
        'score' => 'decimal:2',
    ];

    // ==================== RELATIONSHIPS ====================

    /**
     * Get the test session that owns this score
     */
    public function testSession()
    {
        return $this->belongsTo(TestSession::class);
    }

    /**
     * Get the test category
     */
    public function testCategory()
    {
        return $this->belongsTo(TestCategory::class);
    }

    // ==================== HELPER METHODS ====================

    /**
     * Get score percentage based on total possible points
     */
    public function getScorePercentage(): float
    {
        $totalPoints = $this->testCategory->getTotalPoints();
        
        if ($totalPoints === 0) {
            return 0;
        }

        return ($this->score / $totalPoints) * 100;
    }

    /**
     * Get grade based on score percentage
     */
    public function getGrade(): string
    {
        $percentage = $this->getScorePercentage();

        return match(true) {
            $percentage >= 90 => 'A',
            $percentage >= 80 => 'B',
            $percentage >= 70 => 'C',
            $percentage >= 60 => 'D',
            default => 'E',
        };
    }

    /**
     * Get score status (passed or failed)
     */
    public function isPassed(float $passingScore = 60): bool
    {
        return $this->getScorePercentage() >= $passingScore;
    }
}
