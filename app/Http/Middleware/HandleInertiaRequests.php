<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

/**
 * Middleware untuk menangani request Inertia.
 * File ini bertugas:
 * - Menentukan root view Blade utama (app.blade.php)
 * - Mengatur versi asset (untuk cache-busting)
 * - Mendefinisikan data yang selalu dikirim ke semua halaman Inertia
 *
 * Seluruh logika original dipertahankan, hanya ditambahkan komentar & perapian.
 */
class HandleInertiaRequests extends Middleware
{
    /**
     * Nama root view pertama yang akan diload saat user membuka aplikasi.
     * Biasanya merujuk ke resources/views/app.blade.php
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Menentukan versi asset yang digunakan.
     * Digunakan untuk keperluan cache-busting.
     * Secara default menggunakan implementasi parent.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Data global (props) yang akan selalu dibagikan ke semua response Inertia.
     *
     * Contoh:
     * - Informasi user yang sedang login
     * - Flash message global
     * - Setting aplikasi
     *
     * Di sini hanya menambahkan informasi user di bawah key 'auth'.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            // Mempertahankan semua share default dari Inertia
            ...parent::share($request),

            // Data autentikasi global yang bisa diakses dari semua komponen frontend
            'auth' => [
                'user' => $request->user(),
            ],
        ];
    }
}
