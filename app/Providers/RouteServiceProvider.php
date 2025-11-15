<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * HOME digunakan oleh Laravel sebagai route tujuan
     * setelah user berhasil login atau register (default behavior).
     *
     * Di sini kita set menjadi "/dashboard" agar
     * begitu user login langsung diarahkan ke halaman dashboard.
     */
    public const HOME = '/dashboard';

    /**
     * Method boot() dijalankan ketika aplikasi mulai meng-booting
     * service provider ini. Biasanya untuk mendaftarkan route,
     * binding route model, atau menambahkan constraint pattern.
     */
    public function boot(): void
    {
        // Menentukan bagaimana file routes di-load oleh Laravel.
        $this->routes(function () {

            // Route dengan middleware 'web'
            // Ini adalah route utama untuk aplikasi web,
            // mempunyai fitur session, csrf, encryption, dll.
            Route::middleware('web')
                ->group(base_path('routes/web.php'));

            // Route API, hanya menggunakan prefix /api
            // Tidak menggunakan session dan stateful (stateless)
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));
        });
    }
}
