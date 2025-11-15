<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Root Route
|--------------------------------------------------------------------------
| Jika user sudah login -> arahkan ke halaman todos.
| Jika belum login -> arahkan ke halaman login.
*/
Route::get('/', function () {
    // Jika user sudah login, arahkan ke halaman Todos
    if (auth()->check()) {
        return redirect()->route('todos.index');
    }

    // Jika belum login, arahkan ke halaman Login
    return redirect()->route('login');
});

/*
|--------------------------------------------------------------------------
| Dashboard Route
|--------------------------------------------------------------------------
| Catatan penting:
| - Rute ini tidak boleh dihapus.
| - Tetapi diarahkan ulang ke halaman todos.
| - Hanya bisa diakses oleh user yang sudah login & terverifikasi.
*/
Route::get('/dashboard', function () {
    return redirect()->route('todos.index');
})
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

/*
|--------------------------------------------------------------------------
| Protected Routes (Hanya untuk user login)
|--------------------------------------------------------------------------
| Berisi:
| - Rute untuk profile (edit, update, delete)
| - Rute CRUD untuk Todos (menggunakan resource controller)
*/
Route::middleware('auth')->group(function () {

    /*
    |--------------------------------------------------------------
    | Profile Routes
    |--------------------------------------------------------------
    */
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

    /*
    |--------------------------------------------------------------
    | Todos (CRUD) Routes
    |--------------------------------------------------------------
    | Menggunakan resource controller untuk 7 rute:
    | index, create, store, show, edit, update, destroy
    */
    Route::resource('todos', TodoController::class);
});

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
| Menggunakan file bawaan Laravel Breeze untuk login, register, dll.
*/
require __DIR__ . '/auth.php';
