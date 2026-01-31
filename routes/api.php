<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public API Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected API Routes (Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/check', [AuthController::class, 'check']);
    
    // Will be added later:
    // Route::apiResource('registrations', RegistrationController::class);
    // Route::apiResource('study-programs', StudyProgramController::class);
    // Route::post('/test/start', [TestController::class, 'start']);
    // Route::post('/test/answer', [TestController::class, 'answer']);
});

// Admin API Routes
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    // Will be added later:
    // Route::apiResource('users', UserController::class);
    // Route::apiResource('registrations', Admin\RegistrationController::class);
    // Route::post('/payments/{payment}/verify', [Admin\PaymentController::class, 'verify']);
    // Route::post('/payments/{payment}/reject', [Admin\PaymentController::class, 'reject']);
});

?>