<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    // kalau sudah login, ke todos
    if (auth()->check()) {
        return redirect()->route('todos.index');
    }

    // kalau belum login, ke halaman login
    return redirect()->route('login');
});

// JANGAN dihapus, tapi arahkan ke todos
Route::get('/dashboard', function () {
    return redirect()->route('todos.index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // todos
    Route::resource('todos', TodoController::class);
});

require __DIR__.'/auth.php';
