<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Tempat mendaftarkan service atau binding apa pun ke container.
     * Biasanya digunakan jika kamu ingin meng-override service default Laravel
     * atau membuat binding baru.
     */
    public function register(): void
    {
        // Tidak ada service khusus yang didaftarkan di sini.
    }

    /**
     * Tempat menjalankan konfigurasi saat aplikasi booting.
     * Cocok untuk menginisialisasi fitur yang berhubungan
     * dengan request lifecycle, view composer, atau konfigurasi frontend.
     */
    public function boot(): void
    {
        // Mengatur prefetching asset Vite agar lebih optimal.
        // concurrency: 3 = browser akan melakukan prefetch maksimal 3 file bersamaan.
        Vite::prefetch(concurrency: 3);
    }
}
