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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained()->onDelete('cascade');
            $table->enum('payment_method', ['bank_transfer', 'ewallet', 'virtual_account']);
            $table->decimal('amount', 10, 2);
            $table->string('payment_code')->unique(); // Kode pembayaran unik
            $table->string('proof_file_path')->nullable(); // Bukti transfer
            $table->enum('status', ['pending', 'verified', 'rejected'])->default('pending');
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete(); // Admin yang verifikasi
            $table->text('notes')->nullable();
            $table->timestamps();

            // Index
            $table->index(['registration_id', 'status']);
            $table->index('payment_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
