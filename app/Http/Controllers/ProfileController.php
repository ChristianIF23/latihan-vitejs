<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Controller untuk menangani pengelolaan profil user.
 * Berisi fitur:
 * - Menampilkan form edit profil
 * - Update data profil
 * - Hapus akun
 */
class ProfileController extends Controller
{
    /**
     * Menampilkan halaman form edit profil pengguna.
     *
     * @param Request $request
     * @return Response
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            // Jika user menggunakan MustVerifyEmail, frontend bisa tampilkan info verifikasi email
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,

            // Menyertakan status dari session (biasanya untuk notifikasi)
            'status' => session('status'),
        ]);
    }

    /**
     * Memperbarui informasi profil pengguna.
     *
     * @param ProfileUpdateRequest $request
     * @return RedirectResponse
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // Mengisi data user dengan data hasil validasi form
        $request->user()->fill($request->validated());

        // Jika email berubah, maka reset status verifikasi email
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        // Simpan perubahan data user
        $request->user()->save();

        // Kembali ke halaman edit profil
        return Redirect::route('profile.edit');
    }

    /**
     * Menghapus akun pengguna.
     * Termasuk:
     * - Validasi password
     * - Logout
     * - Hapus data user
     * - Reset session
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function destroy(Request $request): RedirectResponse
    {
        // Validasi password yang diinput untuk keamanan
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        // Logout sebelum akun dihapus
        Auth::logout();

        // Hapus user dari database
        $user->delete();

        // Invalidate session setelah akun terhapus
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect ke beranda
        return Redirect::to('/');
    }
}
