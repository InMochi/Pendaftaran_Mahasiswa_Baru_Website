<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Guest Routes (Public)
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

// Authenticated Routes
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Dashboard
    Route::get('/dashboard', function () {
        return inertia('Dashboard');
    })->name('dashboard');
});

// Admin Routes
Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', function () {
            return inertia('Admin/Dashboard');
        })->name('dashboard');

        // Admin routes will be added here later
        // Example:
        // Route::resource('study-programs', StudyProgramController::class);
        // Route::resource('registration-periods', RegistrationPeriodController::class);
        // Route::resource('test-categories', TestCategoryController::class);
        // Route::resource('test-questions', TestQuestionController::class);
    });

// User Routes (Protected)
Route::middleware(['auth', 'role:user'])->group(function () {
    // Registration Flow
    Route::middleware('check.period')->group(function () {
        // Will be added later:
        // Route::get('/registration', [RegistrationController::class, 'index']);
        // Route::post('/registration/create', [RegistrationController::class, 'create']);
        // Route::post('/registration/biodata', [BiodataController::class, 'store']);
        // Route::post('/registration/study-programs', [StudyProgramChoiceController::class, 'store']);
        // Route::post('/registration/documents', [DocumentController::class, 'upload']);
        // Route::post('/registration/submit', [RegistrationController::class, 'submit']);
    });

    // Test Routes
    // Route::get('/test', [TestController::class, 'index']);
    // Route::post('/test/start', [TestController::class, 'start']);
    // Route::post('/test/answer', [TestController::class, 'answer']);
    // Route::post('/test/submit', [TestController::class, 'submit']);

    // Payment Routes
    // Route::get('/payment', [PaymentController::class, 'index']);
    // Route::post('/payment', [PaymentController::class, 'store']);

    // Announcement Routes
    // Route::get('/announcement', [AnnouncementController::class, 'index']);
});

// Public Routes
Route::get('/', function () {
    return inertia('LandingPage');
})->name('home');

?>
