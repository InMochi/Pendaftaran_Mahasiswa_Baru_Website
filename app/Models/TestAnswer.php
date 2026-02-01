<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TestQuestion;

class TestAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'test_session_id',
        'test_question_id',
        'answer',
        'is_correct',
        'points_earned',
        'answered_at',
    ];

    protected $casts = [
        'is_correct' => 'boolean',
        'points_earned' => 'decimal:2',
        'answered_at' => 'datetime',
    ];

    // ==================== BOOT METHOD ====================

    protected static function boot()
    {
        parent::boot();

        // Auto-check answer when creating/updating
        static::saving(function ($testAnswer) {
            $testAnswer->checkAnswer();
        });
    }

    // ==================== RELATIONSHIPS ====================

    /**
     * Get the test session that owns this answer
     */
    public function testSession()
    {
        return $this->belongsTo(TestSession::class);
    }

    /**
     * Get the test question
     */
    public function testQuestion()
    {
        return $this->belongsTo(TestQuestion::class);
    }

    // ==================== HELPER METHODS ====================

    /**
     * Check if answer is correct and calculate points
     */
    public function checkAnswer(): void
    {
        $question = TestQuestion::find($this->test_question_id);

        if (!$question) {
            return;
        }

        // Only auto-check for multiple choice
        if ($question->question_type === TestQuestion::TYPE_MULTIPLE_CHOICE) {
            $this->is_correct = $question->isCorrectAnswer($this->answer);
            $this->points_earned = $this->is_correct ? $question->points : 0;
        } else {
            // Essay questions need manual grading
            $this->is_correct = false;
            $this->points_earned = 0;
        }
    }

    /**
     * Get answer display (for multiple choice, show option text)
     */
    public function getAnswerDisplay(): string
    {
        $question = $this->testQuestion;

        if (!$question || $question->question_type !== TestQuestion::TYPE_MULTIPLE_CHOICE) {
            return $this->answer;
        }

        $optionField = "option_" . strtolower($this->answer);
        return $question->$optionField ?? $this->answer;
    }

    /**
     * Get correct answer display
     */
    public function getCorrectAnswerDisplay(): ?string
    {
        $question = $this->testQuestion;

        if (!$question || $question->question_type !== TestQuestion::TYPE_MULTIPLE_CHOICE) {
            return null;
        }

        $correctOption = "option_" . strtolower($question->correct_answer);
        return $question->$correctOption ?? null;
    }
}
