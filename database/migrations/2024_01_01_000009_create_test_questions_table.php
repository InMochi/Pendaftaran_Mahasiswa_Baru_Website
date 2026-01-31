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
        Schema::create('test_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('test_category_id')->constrained()->onDelete('cascade');
            $table->text('question_text');
            $table->enum('question_type', ['multiple_choice', 'essay'])->default('multiple_choice');
            $table->text('option_a')->nullable();
            $table->text('option_b')->nullable();
            $table->text('option_c')->nullable();
            $table->text('option_d')->nullable();
            $table->text('option_e')->nullable();
            $table->char('correct_answer', 1)->nullable(); // a, b, c, d, e
            $table->integer('points')->unsigned()->default(1);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Index
            $table->index(['test_category_id', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('test_questions');
    }
};
