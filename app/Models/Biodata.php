<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Biodata extends Model
{
    use HasFactory;

    protected $table = 'biodata';

    protected $fillable = [
        'registration_id',
        'full_name',
        'nik',
        'birth_place',
        'birth_date',
        'gender',
        'religion',
        'phone',
        'address',
        'province',
        'city',
        'postal_code',
        'school_origin',
        'graduation_year',
        'major',
        'parent_name',
        'parent_phone',
        'parent_job',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'graduation_year' => 'integer',
    ];

    // ==================== RELATIONSHIPS ====================

    /**
     * Get the registration that owns this biodata
     */
    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    // ==================== ACCESSORS ====================

    /**
     * Get formatted phone number
     */
    public function getFormattedPhoneAttribute(): string
    {
        // Format: 0812-3456-7890
        $phone = $this->phone;
        if (strlen($phone) >= 10) {
            return substr($phone, 0, 4) . '-' . substr($phone, 4, 4) . '-' . substr($phone, 8);
        }
        return $phone;
    }

    /**
     * Get age from birth date
     */
    public function getAgeAttribute(): int
    {
        return Carbon::parse($this->birth_date)->age;
    }

    /**
     * Get full address
     */
    public function getFullAddressAttribute(): string
    {
        return "{$this->address}, {$this->city}, {$this->province} {$this->postal_code}";
    }

    /**
     * Get gender label
     */
    public function getGenderLabelAttribute(): string
    {
        return $this->gender === 'male' ? 'Laki-laki' : 'Perempuan';
    }

    // ==================== HELPER METHODS ====================

    /**
     * Check if biodata is complete
     */
    public function isComplete(): bool
    {
        $requiredFields = [
            'full_name', 'nik', 'birth_place', 'birth_date',
            'gender', 'religion', 'phone', 'address',
            'province', 'city', 'school_origin', 'graduation_year',
            'parent_name', 'parent_phone'
        ];

        foreach ($requiredFields as $field) {
            if (empty($this->$field)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Validate NIK format (16 digits)
     */
    public function hasValidNIK(): bool
    {
        return strlen($this->nik) === 16 && is_numeric($this->nik);
    }
}
