<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\StudyProgramController;
use App\Http\Controllers\Admin\RegistrationPeriodController;
use App\Http\Controllers\Admin\TestCategoryController;
use App\Http\Controllers\Admin\TestQuestionController;
use App\Http\Controllers\Admin\PaymentController as AdminPaymentController;
use App\Http\Controllers\User\RegistrationController;
use App\Http\Controllers\User\PaymentController;



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

   // Program Studi CRUD
    Route::get('/study-programs', [StudyProgramController::class, 'index'])->name('study-programs.index');
    Route::post('/study-programs', [StudyProgramController::class, 'store'])->name('study-programs.store');
    Route::put('/study-programs/{studyProgram}', [StudyProgramController::class, 'update'])->name('study-programs.update');
    Route::delete('/study-programs/{studyProgram}', [StudyProgramController::class, 'destroy'])->name('study-programs.destroy');

    // Periode Pendaftaran CRUD
    Route::get('/registration-periods', [RegistrationPeriodController::class, 'index'])->name('registration-periods.index');
    Route::post('/registration-periods', [RegistrationPeriodController::class, 'store'])->name('registration-periods.store');
    Route::put('/registration-periods/{registrationPeriod}', [RegistrationPeriodController::class, 'update'])->name('registration-periods.update');
    Route::delete('/registration-periods/{registrationPeriod}', [RegistrationPeriodController::class, 'destroy'])->name('registration-periods.destroy');

    // Kategori Tes CRUD
    Route::get('/test-categories', [TestCategoryController::class, 'index'])->name('test-categories.index');
    Route::post('/test-categories', [TestCategoryController::class, 'store'])->name('test-categories.store');
    Route::put('/test-categories/{testCategory}', [TestCategoryController::class, 'update'])->name('test-categories.update');
    Route::delete('/test-categories/{testCategory}', [TestCategoryController::class, 'destroy'])->name('test-categories.destroy');

    // Bank Soal CRUD
    Route::get('/test-questions', [TestQuestionController::class, 'index'])->name('test-questions.index');
    Route::post('/test-questions', [TestQuestionController::class, 'store'])->name('test-questions.store');
    Route::put('/test-questions/{testQuestion}', [TestQuestionController::class, 'update'])->name('test-questions.update');
    Route::delete('/test-questions/{testQuestion}', [TestQuestionController::class, 'destroy'])->name('test-questions.destroy');

    // Payment Management (Admin)
    Route::get('/payments', [AdminPaymentController::class, 'index'])->name('payments.index');
    Route::post('/payments/{payment}/verify', [AdminPaymentController::class, 'verify'])->name('payments.verify');
    Route::post('/payments/{payment}/reject', [AdminPaymentController::class, 'reject'])->name('payments.reject');
    });


    Route::middleware(['auth', 'role:user'])->group(function () {
        // Registration Dashboard/Status
        Route::get('/registration', [RegistrationController::class, 'index'])
            ->name('registration.index');
        
        // Start new registration
        Route::post('/registration/create', [RegistrationController::class, 'create'])
            ->name('registration.create');
        
        // Multi-step form (protected by check.period middleware)
        Route::middleware('check.period')->group(function () {
            // Step 1: Biodata
            Route::get('/registration/biodata', [RegistrationController::class, 'showBiodata'])
                ->name('registration.biodata');
            Route::post('/registration/biodata', [RegistrationController::class, 'storeBiodata']);
            
            // Step 2: Study Program Choices
            Route::get('/registration/study-programs', [RegistrationController::class, 'showStudyPrograms'])
                ->name('registration.study-programs');
            Route::post('/registration/study-programs', [RegistrationController::class, 'storeStudyPrograms']);
            
            // Step 3: Documents
            Route::get('/registration/documents', [RegistrationController::class, 'showDocuments'])
                ->name('registration.documents');
            Route::post('/registration/documents/upload', [RegistrationController::class, 'uploadDocument']);
            
            // Step 4: Review & Submit
            Route::get('/registration/review', [RegistrationController::class, 'showReview'])
                ->name('registration.review');
            Route::post('/registration/submit', [RegistrationController::class, 'submit'])
                ->name('registration.submit');

        // Payment (User)
        Route::get('/payment', [PaymentController::class, 'index'])->name('payment.index');
        Route::post('/payment', [PaymentController::class, 'store'])->name('payment.store');
        });
    });

    // Public Routes
    Route::get('/', function () {
        return inertia('LandingPage');
    })->name('home');

    ?>
