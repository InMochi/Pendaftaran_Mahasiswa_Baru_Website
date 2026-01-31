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
        Schema::create('biodata', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained()->onDelete('cascade');
            $table->string('full_name');
            $table->string('nik', 16)->unique();
            $table->string('birth_place');
            $table->date('birth_date');
            $table->enum('gender', ['male', 'female']);
            $table->string('religion', 50);
            $table->string('phone', 20);
            $table->text('address');
            $table->string('province');
            $table->string('city');
            $table->string('postal_code', 10);
            $table->string('school_origin');
            $table->year('graduation_year');
            $table->string('major')->nullable(); // Jurusan SMA/SMK
            $table->string('parent_name');
            $table->string('parent_phone', 20);
            $table->string('parent_job')->nullable();
            $table->timestamps();

            // Index
            $table->index('registration_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('biodata');
    }
};
