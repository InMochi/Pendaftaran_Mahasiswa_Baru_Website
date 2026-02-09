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
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained()->onDelete('cascade');
            $table->foreignId('study_program_id')->nullable()->constrained()->nullOnDelete(); 
            $table->enum('status', ['accepted', 'rejected', 'waiting_list'])->default('rejected');
            $table->decimal('total_score', 8, 2)->default(0);
            $table->integer('rank')->unsigned()->nullable(); 
            $table->string('nim')->nullable();
            $table->timestamp('announced_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            // Index
            $table->index(['registration_id', 'status']);
            $table->index('study_program_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
