<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Atribut yang boleh diisi secara mass assignment.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',     // Nama user
        'email',    // Email user
        'password', // Password user (akan di-hash secara otomatis)
    ];

    /**
     * Atribut yang akan disembunyikan ketika model diserialisasi
     * (misal saat dikirim ke frontend dengan Inertia).
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',       // Password tidak boleh terlihat di response
        'remember_token', // Token remember-me
    ];

    /**
     * Cast otomatis untuk beberapa field.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime', // Cast ke carbon date
            'password' => 'hashed',           // Laravel otomatis meng-hash password
        ];
    }

    /**
     * Relasi: satu user punya banyak Todo.
     */
    public function todos()
    {
        return $this->hasMany(Todo::class);
    }
}
