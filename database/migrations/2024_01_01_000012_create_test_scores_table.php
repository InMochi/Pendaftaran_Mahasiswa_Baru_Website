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
        Schema::create('test_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('test_session_id')->constrained()->onDelete('cascade');
            $table->foreignId('test_category_id')->constrained()->onDelete('cascade');
            $table->decimal('score', 8, 2)->default(0);
            $table->timestamps();

            // Unique: satu session hanya punya 1 score per kategori
            $table->unique(['test_session_id', 'test_category_id']);
            
            // Index
            $table->index(['test_session_id', 'test_category_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('test_scores');
    }
};
