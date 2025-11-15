<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Validasi nama wajib ada, berupa string, maksimal 255 karakter
            'name' => ['required', 'string', 'max:255'],

            // Validasi email
            'email' => [
                'required',         // wajib diisi
                'string',           // harus string
                'lowercase',        // otomatis diubah jadi lowercase sebelum disimpan
                'email',            // harus format email valid
                'max:255',          // maksimal 255 karakter

                // Email harus unik, tapi abaikan email milik user sendiri
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];
    }
}
