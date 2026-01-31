<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // ==================== RELATIONSHIPS ====================

    /**
     * Get all registrations for this user
     */
    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    /**
     * Get all activity logs for this user
     */
    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class);
    }

    /**
     * Get all payments verified by this admin
     */
    public function verifiedPayments()
    {
        return $this->hasMany(Payment::class, 'verified_by');
    }

    // ==================== SCOPES ====================

    /**
     * Scope a query to only include admin users
     */
    public function scopeAdmins($query)
    {
        return $query->where('role', 'admin');
    }

    /**
     * Scope a query to only include regular users
     */
    public function scopeUsers($query)
    {
        return $query->where('role', 'user');
    }

    // ==================== HELPER METHODS ====================

    /**
     * Check if user is admin
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user is regular user
     */
    public function isUser(): bool
    {
        return $this->role === 'user';
    }

    /**
     * Get active registration for current period
     */
    public function getActiveRegistration()
    {
        return $this->registrations()
            ->whereHas('registrationPeriod', function ($query) {
                $query->where('is_active', true);
            })
            ->first();
    }
}