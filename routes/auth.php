<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Authentication Routes (Guest)
|--------------------------------------------------------------------------
| Rute-rute ini hanya bisa diakses oleh user yang belum login (guest).
| Berisi proses registrasi, login, lupa password, dan reset password.
*/
Route::middleware('guest')->group(function () {

    // Menampilkan form register
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    // Proses register user baru
    Route::post('register', [RegisteredUserController::class, 'store']);

    // Menampilkan form login
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    // Proses login
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    // Menampilkan form permintaan reset password (lupa password)
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    // Mengirim email reset password
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    // Halaman form reset password berdasarkan token
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    // Proses penyimpanan password baru
    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

/*
|--------------------------------------------------------------------------
| Authentication Routes (Authenticated Users)
|--------------------------------------------------------------------------
| Rute-rute ini hanya dapat digunakan oleh user yang sudah login.
| Berisi verifikasi email, konfirmasi password, update password, dan logout.
*/
Route::middleware('auth')->group(function () {

    // Halaman pemintaan verifikasi email
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    // Proses verifikasi email melalui link
    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    // Mengirim ulang email verifikasi
    Route::post(
        'email/verification-notification',
        [EmailVerificationNotificationController::class, 'store']
    )
        ->middleware('throttle:6,1')
        ->name('verification.send');

    // Halaman konfirmasi password
    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    // Proses konfirmasi password
    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    // Update password melalui halaman profile
    Route::put('password', [PasswordController::class, 'update'])
        ->name('password.update');

    // Logout user
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
