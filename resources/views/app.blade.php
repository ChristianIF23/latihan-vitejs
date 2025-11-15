<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <!-- Encoding karakter -->
        <meta charset="utf-8">

        <!-- Responsiveness untuk mobile -->
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Judul halaman yang dapat diubah oleh Inertia -->
        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Font Figtree dari Bunny CDN -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Inertia route helper untuk penggunaan route() di React -->
        @routes

        <!-- Hot reload untuk React (saat development) -->
        @viteReactRefresh

        <!-- Import file utama React + halaman React yang sedang aktif -->
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])

        <!-- Head yang dikelola oleh Inertia (misal: title, meta tag dari React) -->
        @inertiaHead
    </head>

    <body class="font-sans antialiased">
        <!-- Tempat aplikasi Inertia akan dirender -->
        @inertia
    </body>
</html>
