<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudyProgramChoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'study_program_id',
        'priority',
    ];

    protected $casts = [
        'priority' => 'integer',
    ];

    // ==================== RELATIONSHIPS ====================

    /**
     * Get the registration that owns this choice
     */
    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    /**
     * Get the study program
     */
    public function studyProgram()
    {
        return $this->belongsTo(StudyProgram::class);
    }

    // ==================== SCOPES ====================

    /**
     * Scope by priority
     */
    public function scopeByPriority($query, $priority)
    {
        return $query->where('priority', $priority);
    }

    /**
     * Scope first choice
     */
    public function scopeFirstChoice($query)
    {
        return $query->where('priority', 1);
    }

    // ==================== HELPER METHODS ====================

    /**
     * Get priority label
     */
    public function getPriorityLabel(): string
    {
        return match($this->priority) {
            1 => 'Pilihan Pertama',
            2 => 'Pilihan Kedua',
            3 => 'Pilihan Ketiga',
            default => 'Pilihan ' . $this->priority,
        };
    }

    /**
     * Check if this is first choice
     */
    public function isFirstChoice(): bool
    {
        return $this->priority === 1;
    }
}
