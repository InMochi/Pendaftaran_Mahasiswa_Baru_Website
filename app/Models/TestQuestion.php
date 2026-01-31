<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'test_category_id',
        'question_text',
        'question_type',
        'option_a',
        'option_b',
        'option_c',
        'option_d',
        'option_e',
        'correct_answer',
        'points',
        'is_active',
    ];

    protected $casts = [
        'points' => 'integer',
        'is_active' => 'boolean',
    ];

    // Question types
    const TYPE_MULTIPLE_CHOICE = 'multiple_choice';
    const TYPE_ESSAY = 'essay';

    // ==================== RELATIONSHIPS ====================

    /**
     * Get the category that owns this question
     */
    public function testCategory()
    {
        return $this->belongsTo(TestCategory::class);
    }

    /**
     * Get all answers for this question
     */
    public function testAnswers()
    {
        return $this->hasMany(TestAnswer::class);
    }

    // ==================== SCOPES ====================

    /**
     * Scope active questions
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope by question type
     */
    public function scopeByType($query, $type)
    {
        return $query->where('question_type', $type);
    }

    /**
     * Scope multiple choice questions
     */
    public function scopeMultipleChoice($query)
    {
        return $query->where('question_type', self::TYPE_MULTIPLE_CHOICE);
    }

    /**
     * Scope essay questions
     */
    public function scopeEssay($query)
    {
        return $query->where('question_type', self::TYPE_ESSAY);
    }

    // ==================== HELPER METHODS ====================

    /**
     * Get all options as array
     */
    public function getOptions(): array
    {
        if ($this->question_type !== self::TYPE_MULTIPLE_CHOICE) {
            return [];
        }

        $options = [];
        foreach (['a', 'b', 'c', 'd', 'e'] as $key) {
            $optionField = "option_{$key}";
            if (!empty($this->$optionField)) {
                $options[$key] = $this->$optionField;
            }
        }

        return $options;
    }

    /**
     * Check if answer is correct
     */
    public function isCorrectAnswer(string $answer): bool
    {
        if ($this->question_type !== self::TYPE_MULTIPLE_CHOICE) {
            return false;
        }

        return strtolower($answer) === strtolower($this->correct_answer);
    }

    /**
     * Get question type label
     */
    public function getTypeLabelAttribute(): string
    {
        return match($this->question_type) {
            self::TYPE_MULTIPLE_CHOICE => 'Pilihan Ganda',
            self::TYPE_ESSAY => 'Essay',
            default => ucfirst($this->question_type),
        };
    }

    /**
     * Check if this is multiple choice
     */
    public function isMultipleChoice(): bool
    {
        return $this->question_type === self::TYPE_MULTIPLE_CHOICE;
    }

    /**
     * Check if this is essay
     */
    public function isEssay(): bool
    {
        return $this->question_type === self::TYPE_ESSAY;
    }

    /**
     * Get correct answer label for display (without showing the actual answer)
     */
    public function getCorrectAnswerMasked(): string
    {
        if ($this->isMultipleChoice()) {
            return 'Option ' . strtoupper($this->correct_answer);
        }
        return 'Manual Grading Required';
    }
}
