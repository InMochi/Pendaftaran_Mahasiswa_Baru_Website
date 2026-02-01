<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Models\ReRegistration;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'registration_period_id',
        'registration_number',
        'status',
        'submitted_at',
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
    ];

    // Status constants
    const STATUS_DRAFT = 'draft';
    const STATUS_SUBMITTED = 'submitted';
    const STATUS_PAYMENT_PENDING = 'payment_pending';
    const STATUS_PAYMENT_VERIFIED = 'payment_verified';
    const STATUS_TEST_COMPLETED = 'test_completed';
    const STATUS_PASSED = 'passed';
    const STATUS_FAILED = 'failed';

    // ==================== BOOT METHOD ====================

    protected static function boot()
    {
        parent::boot();

        // Auto-generate registration number saat create
        static::creating(function ($registration) {
            if (!$registration->registration_number) {
                $registration->registration_number = static::generateRegistrationNumber();
            }
        });
    }

    // ==================== RELATIONSHIPS ====================

    /**
     * Get the user that owns the registration
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the registration period
     */
    public function registrationPeriod()
    {
        return $this->belongsTo(RegistrationPeriod::class);
    }

    /**
     * Get biodata for this registration
     */
    public function biodata()
    {
        return $this->hasOne(Biodata::class);
    }

    /**
     * Get all study program choices
     */
    public function studyProgramChoices()
    {
        return $this->hasMany(StudyProgramChoice::class)->orderBy('priority');
    }

    /**
     * Get all documents
     */
    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    /**
     * Get test session
     */
    public function testSession()
    {
        return $this->hasOne(TestSession::class);
    }

    /**
     * Get payment
     */
    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    /**
     * Get announcement
     */
    public function announcement()
    {
        return $this->hasOne(Announcement::class);
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
     * Scope submitted registrations
     */
    public function scopeSubmitted($query)
    {
        return $query->whereNotNull('submitted_at');
    }

    /**
     * Scope draft registrations
     */
    public function scopeDraft($query)
    {
        return $query->where('status', self::STATUS_DRAFT);
    }

    /**
     * Scope passed registrations
     */
    public function scopePassed($query)
    {
        return $query->where('status', self::STATUS_PASSED);
    }

    /**
     * Scope for current period
     */
    public function scopeCurrentPeriod($query)
    {
        return $query->whereHas('registrationPeriod', function ($q) {
            $q->where('is_active', true);
        });
    }

    // ==================== HELPER METHODS ====================

    /**
     * Generate unique registration number
     */
    public static function generateRegistrationNumber(): string
    {
        $year = date('Y');
        $lastNumber = static::whereYear('created_at', $year)
            ->max('registration_number');

        if ($lastNumber) {
            $lastSequence = (int) substr($lastNumber, -5);
            $newSequence = str_pad($lastSequence + 1, 5, '0', STR_PAD_LEFT);
        } else {
            $newSequence = '00001';
        }

        return "PMB-{$year}-{$newSequence}";
    }

    /**
     * Check if registration is complete
     */
    public function isComplete(): bool
    {
        return $this->biodata()->exists()
            && $this->studyProgramChoices()->count() > 0
            && $this->hasRequiredDocuments();
    }

    /**
     * Check if all required documents are uploaded
     */
    public function hasRequiredDocuments(): bool
    {
        $requiredTypes = ['ktp', 'ijazah', 'foto'];
        $uploadedTypes = $this->documents()->pluck('document_type')->toArray();
        
        foreach ($requiredTypes as $type) {
            if (!in_array($type, $uploadedTypes)) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * Get completion percentage
     */
    public function getCompletionPercentage(): int
    {
        $steps = [
            'biodata' => $this->biodata()->exists(),
            'study_programs' => $this->studyProgramChoices()->count() > 0,
            'documents' => $this->hasRequiredDocuments(),
            'payment' => $this->payment()->exists(),
        ];

        $completed = count(array_filter($steps));
        $total = count($steps);

        return (int) (($completed / $total) * 100);
    }

    /**
     * Get status badge color
     */
    public function getStatusColor(): string
    {
        return match($this->status) {
            self::STATUS_DRAFT => 'gray',
            self::STATUS_SUBMITTED => 'blue',
            self::STATUS_PAYMENT_PENDING => 'yellow',
            self::STATUS_PAYMENT_VERIFIED => 'green',
            self::STATUS_TEST_COMPLETED => 'indigo',
            self::STATUS_PASSED => 'emerald',
            self::STATUS_FAILED => 'red',
            default => 'gray',
        };
    }

    /**
     * Get status label in Indonesian
     */
    public function getStatusLabel(): string
    {
        return match($this->status) {
            self::STATUS_DRAFT => 'Draft',
            self::STATUS_SUBMITTED => 'Sudah Dikirim',
            self::STATUS_PAYMENT_PENDING => 'Menunggu Pembayaran',
            self::STATUS_PAYMENT_VERIFIED => 'Pembayaran Terverifikasi',
            self::STATUS_TEST_COMPLETED => 'Test Selesai',
            self::STATUS_PASSED => 'Lulus',
            self::STATUS_FAILED => 'Tidak Lulus',
            default => 'Unknown',
        };
    }

    /**
     * Submit registration
     */
    public function submit(): bool
    {
        if (!$this->isComplete()) {
            return false;
        }

        $this->update([
            'status' => self::STATUS_SUBMITTED,
            'submitted_at' => now(),
        ]);

        return true;
    }

    /**
     * Get first choice study program
     */
    public function getFirstChoice()
    {
        return $this->studyProgramChoices()->where('priority', 1)->first();
    }

    public function reRegistration()
    {
        return $this->hasOne(ReRegistration::class);
    }

    
}
