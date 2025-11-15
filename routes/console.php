<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Custom Artisan Command
|--------------------------------------------------------------------------
| Perintah ini menampilkan kutipan inspiratif random ketika dijalankan.
| Command name : php artisan inspire
| Tujuan        : Menampilkan kutipan motivasi di terminal.
|
| Catatan:
| - Tidak ada logika yang diubah.
| - Hanya menambahkan komentar dan merapikan struktur kode.
*/
Artisan::command('inspire', function () {
    // Menampilkan kutipan inspiratif ke output terminal
    $this->comment(Inspiring::quote());
})
->purpose('Display an inspiring quote');  // Menjelaskan tujuan command
