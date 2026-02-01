<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class TestSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'started_at',
        'finished_at',
        'status',
        'total_score',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'finished_at' => 'datetime',
        'total_score' => 'decimal:2',
    ];

    // Status constants
    const STATUS_NOT_STARTED = 'not_started';
    const STATUS_IN_PROGRESS = 'in_progress';
    const STATUS_COMPLETED = 'completed';
    const STATUS_TIMEOUT = 'timeout';

    // ==================== RELATIONSHIPS ====================

    /**
     * Get the registration that owns this session
     */
    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    /**
     * Get all answers for this session
     */
    public function testAnswers()
    {
        return $this->hasMany(TestAnswer::class);
    }

    /**
     * Get all scores for this session
     */
    public function testScores()
    {
        return $this->hasMany(TestScore::class);
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
     * Scope in progress sessions
     */
    public function scopeInProgress($query)
    {
        return $query->where('status', self::STATUS_IN_PROGRESS);
    }

    /**
     * Scope completed sessions
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', self::STATUS_COMPLETED);
    }

    // ==================== HELPER METHODS ====================

    /**
     * Start the test session
     */
    public function start(): void
    {
        $this->update([
            'started_at' => now(),
            'status' => self::STATUS_IN_PROGRESS,
        ]);
    }

    /**
     * Complete the test session
     */
    public function complete(): void
    {
        $this->update([
            'finished_at' => now(),
            'status' => self::STATUS_COMPLETED,
        ]);

        $this->calculateTotalScore();
        $this->calculateCategoryScores(); 
    }

    /**
     * Mark session as timeout
     */
    public function timeout(): void
    {
        $this->update([
            'finished_at' => now(),
            'status' => self::STATUS_TIMEOUT,
        ]);

        $this->calculateTotalScore();
    }

    /**
     * Calculate total score from all answers
     */
    public function calculateTotalScore(): void
    {
        $totalPoints = $this->testAnswers()->sum('points_earned');
        
        $this->update([
            'total_score' => $totalPoints,
        ]);
    }

    /**
     * Calculate score per category
     */
    public function calculateCategoryScores(): void
    {
        // Get all test categories
        $categories = TestCategory::active()->get();

        foreach ($categories as $category) {
            // Get all answers for questions in this category
            $categoryScore = $this->testAnswers()
                ->whereHas('testQuestion', function ($query) use ($category) {
                    $query->where('test_category_id', $category->id);
                })
                ->sum('points_earned');

            // Update or create test score
            TestScore::updateOrCreate(
                [
                    'test_session_id' => $this->id,
                    'test_category_id' => $category->id,
                ],
                [
                    'score' => $categoryScore,
                ]
            );
        }
    }

    /**
     * Get time elapsed in seconds
     */
    public function getTimeElapsed(): int
    {
        if (!$this->started_at) {
            return 0;
        }

        $endTime = $this->finished_at ?? now();
        return $this->started_at->diffInSeconds($endTime);
    }

    /**
     * Get formatted time elapsed
     */
    protected $appends = [
    'formatted_time_elapsed',
    ];
    
    public function getFormattedTimeElapsedAttribute(): string
    {
        $seconds = $this->getTimeElapsed();
        $hours = floor($seconds / 3600);
        $minutes = floor(($seconds % 3600) / 60);
        $remainingSeconds = $seconds % 60;

        if ($hours > 0) {
            return sprintf('%02d:%02d:%02d', $hours, $minutes, $remainingSeconds);
        }
        return sprintf('%02d:%02d', $minutes, $remainingSeconds);
    }

    /**
     * Get total questions count
     */
    public function getTotalQuestions(): int
    {
        return TestQuestion::active()->count();
    }

    /**
     * Get answered questions count
     */
    public function getAnsweredCount(): int
    {
        return $this->testAnswers()->count();
    }

    /**
     * Get unanswered questions count
     */
    public function getUnansweredCount(): int
    {
        return $this->getTotalQuestions() - $this->getAnsweredCount();
    }

    /**
     * Get completion percentage
     */
    public function getCompletionPercentage(): float
    {
        $total = $this->getTotalQuestions();
        if ($total === 0) return 0;

        return ($this->getAnsweredCount() / $total) * 100;
    }

    /**
     * Get correct answers count
     */
    public function getCorrectAnswersCount(): int
    {
        return $this->testAnswers()->where('is_correct', true)->count();
    }

    /**
     * Get incorrect answers count
     */
    public function getIncorrectAnswersCount(): int
    {
        return $this->testAnswers()->where('is_correct', false)->count();
    }

    /**
     * Get accuracy percentage
     */
    public function getAccuracyPercentage(): float
    {
        $answered = $this->getAnsweredCount();
        if ($answered === 0) return 0;

        return ($this->getCorrectAnswersCount() / $answered) * 100;
    }

    /**
     * Check if test is in progress
     */
    public function isInProgress(): bool
    {
        return $this->status === self::STATUS_IN_PROGRESS;
    }

    /**
     * Check if test is completed
     */
    public function isCompleted(): bool
    {
        return in_array($this->status, [self::STATUS_COMPLETED, self::STATUS_TIMEOUT]);
    }

    /**
     * Get status label
     */
    public function getStatusLabel(): string
    {
        return match($this->status) {
            self::STATUS_NOT_STARTED => 'Belum Dimulai',
            self::STATUS_IN_PROGRESS => 'Sedang Berlangsung',
            self::STATUS_COMPLETED => 'Selesai',
            self::STATUS_TIMEOUT => 'Waktu Habis',
            default => 'Unknown',
        };
    }
}
