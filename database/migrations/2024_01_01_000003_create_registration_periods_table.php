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
        Schema::create('registration_periods', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('academic_year', 20);
            $table->datetime('registration_start');
            $table->datetime('registration_end');
            $table->date('test_date')->nullable();
            $table->date('announcement_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registration_periods');
    }
};
