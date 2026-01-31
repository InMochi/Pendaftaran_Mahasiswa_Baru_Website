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
        Schema::create('study_program_choices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained()->onDelete('cascade');
            $table->foreignId('study_program_id')->constrained()->onDelete('cascade');
            $table->tinyInteger('priority')->unsigned(); // 1, 2, 3
            $table->timestamps();

            // Unique constraint: satu registration hanya bisa punya 1 priority yang sama
            $table->unique(['registration_id', 'priority']);
            
            // Index
            $table->index(['registration_id', 'priority']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('study_program_choices');
    }
};
