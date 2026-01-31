<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained()->onDelete('cascade');
            $table->enum('document_type', ['ktp', 'ijazah', 'foto', 'raport', 'sertifikat']);
            $table->string('file_name');
            $table->string('file_path');
            $table->integer('file_size')->unsigned(); // dalam bytes
            $table->string('mime_type', 100);
            $table->timestamp('uploaded_at');
            $table->timestamps();

            // Index
            $table->index(['registration_id', 'document_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
