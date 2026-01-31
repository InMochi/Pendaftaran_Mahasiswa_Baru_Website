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
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('registration_period_id')->constrained()->onDelete('cascade');
            $table->string('registration_number')->unique();
            $table->enum('status', [
                'draft',
                'submitted',
                'payment_pending',
                'payment_verified',
                'test_completed',
                'passed',
                'failed'
            ])->default('draft');
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();

            // Index untuk performance
            $table->index(['user_id', 'registration_period_id']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
