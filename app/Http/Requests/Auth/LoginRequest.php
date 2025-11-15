<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

/**
 * Form Request untuk proses autentikasi login.
 * Bertanggung jawab untuk:
 * - Validasi input login
 * - Mencegah brute-force dengan rate limiting
 * - Menjalankan proses autentikasi secara aman
 *
 * Seluruh logika original tetap dipertahankan.
 */
class LoginRequest extends FormRequest
{
    /**
     * Menentukan apakah request ini diizinkan.
     * Untuk form login, selalu diizinkan.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Aturan validasi untuk form login.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email'    => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Coba autentikasi menggunakan credential yang diberikan.
     * Menggunakan rate limiting untuk mencegah brute-force.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        // Pastikan user tidak melebihi batas login
        $this->ensureIsNotRateLimited();

        // Attempt login dengan email + password
        if (! Auth::attempt(
            $this->only('email', 'password'),
            $this->boolean('remember') // opsi remember me
        )) {
            // Hit rate limiter jika gagal login
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        // Berhasil login → reset rate limiter
        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Memastikan user belum melebihi batas percobaan login.
     * Jika limit terlampaui, lempar error throttle.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        // Periksa apakah melebihi 5 percobaan
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        // Trigger event lockout
        event(new Lockout($this));

        // Hitung waktu tunggu sebelum bisa mencoba lagi
        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Generate key unik untuk rate limiting berdasarkan email dan IP.
     * Mencegah brute force menggunakan kombinasi user + alamat IP.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(
            Str::lower($this->string('email')) . '|' . $this->ip()
        );
    }
}
