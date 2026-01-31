<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'document_type',
        'file_name',
        'file_path',
        'file_size',
        'mime_type',
        'uploaded_at',
    ];

    protected $casts = [
        'uploaded_at' => 'datetime',
        'file_size' => 'integer',
    ];

    // Document types
    const TYPE_KTP = 'ktp';
    const TYPE_IJAZAH = 'ijazah';
    const TYPE_FOTO = 'foto';
    const TYPE_RAPORT = 'raport';
    const TYPE_SERTIFIKAT = 'sertifikat';

    // ==================== RELATIONSHIPS ====================

    /**
     * Get the registration that owns this document
     */
    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    // ==================== SCOPES ====================

    /**
     * Scope by document type
     */
    public function scopeByType($query, $type)
    {
        return $query->where('document_type', $type);
    }

    /**
     * Scope required documents
     */
    public function scopeRequired($query)
    {
        return $query->whereIn('document_type', [self::TYPE_KTP, self::TYPE_IJAZAH, self::TYPE_FOTO]);
    }

    // ==================== ACCESSORS ====================

    /**
     * Get formatted file size
     */
    public function getFormattedFileSizeAttribute(): string
    {
        $bytes = $this->file_size;
        
        if ($bytes >= 1073741824) {
            return number_format($bytes / 1073741824, 2) . ' GB';
        } elseif ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 2) . ' KB';
        } else {
            return $bytes . ' bytes';
        }
    }

    /**
     * Get document type label
     */
    public function getTypeLabelAttribute(): string
    {
        return match($this->document_type) {
            self::TYPE_KTP => 'KTP',
            self::TYPE_IJAZAH => 'Ijazah/SKHUN',
            self::TYPE_FOTO => 'Foto',
            self::TYPE_RAPORT => 'Raport',
            self::TYPE_SERTIFIKAT => 'Sertifikat',
            default => ucfirst($this->document_type),
        };
    }

    /**
     * Get file URL
     */
    public function getFileUrlAttribute(): string
    {
        return Storage::url($this->file_path);
    }

    // ==================== HELPER METHODS ====================

    /**
     * Check if document is image
     */
    public function isImage(): bool
    {
        return str_starts_with($this->mime_type, 'image/');
    }

    /**
     * Check if document is PDF
     */
    public function isPdf(): bool
    {
        return $this->mime_type === 'application/pdf';
    }

    /**
     * Delete file from storage
     */
    public function deleteFile(): bool
    {
        if (Storage::exists($this->file_path)) {
            return Storage::delete($this->file_path);
        }
        return false;
    }

    /**
     * Get file extension
     */
    public function getExtension(): string
    {
        return pathinfo($this->file_name, PATHINFO_EXTENSION);
    }

    // ==================== BOOT METHOD ====================

    protected static function boot()
    {
        parent::boot();

        // Delete file when document is deleted
        static::deleting(function ($document) {
            $document->deleteFile();
        });
    }
}
