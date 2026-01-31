<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class RegistrationPeriod extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'academic_year',
        'registration_start',
        'registration_end',
        'test_date',
        'announcement_date',
        'is_active',
    ];

    protected $casts = [
        'registration_start' => 'datetime',
        'registration_end' => 'datetime',
        'test_date' => 'date',
        'announcement_date' => 'date',
        'is_active' => 'boolean',
    ];

    // ==================== RELATIONSHIPS ====================

    /**
     * Get all registrations for this period
     */
    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    // ==================== SCOPES ====================

    /**
     * Scope a query to only include active periods
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to get current open periods
     */
    public function scopeOpen($query)
    {
        return $query->where('is_active', true)
            ->where('registration_start', '<=', now())
            ->where('registration_end', '>=', now());
    }

    /**
     * Scope to get upcoming periods
     */
    public function scopeUpcoming($query)
    {
        return $query->where('registration_start', '>', now());
    }

    /**
     * Scope to get closed periods
     */
    public function scopeClosed($query)
    {
        return $query->where('registration_end', '<', now());
    }

    // ==================== HELPER METHODS ====================

    /**
     * Check if registration is currently open
     */
    public function isOpen(): bool
    {
        return $this->is_active 
            && now()->between($this->registration_start, $this->registration_end);
    }

    /**
     * Check if registration is closed
     */
    public function isClosed(): bool
    {
        return now()->greaterThan($this->registration_end);
    }

    /**
     * Check if registration hasn't started yet
     */
    public function isUpcoming(): bool
    {
        return now()->lessThan($this->registration_start);
    }

    /**
     * Get status label
     */
    public function getStatusLabel(): string
    {
        if ($this->isOpen()) {
            return 'Dibuka';
        } elseif ($this->isUpcoming()) {
            return 'Akan Dibuka';
        } else {
            return 'Ditutup';
        }
    }

    /**
     * Get days remaining until registration closes
     */
    public function getDaysRemaining(): ?int
    {
        if ($this->isClosed()) {
            return null;
        }

        return now()->diffInDays($this->registration_end, false);
    }

    /**
     * Get total registrations count
     */
    public function getTotalRegistrations(): int
    {
        return $this->registrations()->count();
    }

    /**
     * Get submitted registrations count
     */
    public function getSubmittedRegistrations(): int
    {
        return $this->registrations()->whereNotNull('submitted_at')->count();
    }
}
