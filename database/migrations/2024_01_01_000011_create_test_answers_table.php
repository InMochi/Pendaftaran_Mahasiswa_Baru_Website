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
        Schema::create('test_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('test_session_id')->constrained()->onDelete('cascade');
            $table->foreignId('test_question_id')->constrained()->onDelete('cascade');
            $table->text('answer'); // Jawaban user (a/b/c/d/e atau essay)
            $table->boolean('is_correct')->default(false);
            $table->decimal('points_earned', 8, 2)->default(0);
            $table->timestamp('answered_at');
            $table->timestamps();

            // Index
            $table->index(['test_session_id', 'test_question_id']);
            
            // Unique: satu session tidak bisa jawab soal yang sama 2x
            $table->unique(['test_session_id', 'test_question_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('test_answers');
    }
};
