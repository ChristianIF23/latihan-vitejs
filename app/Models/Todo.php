<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    // Field yang boleh diisi secara mass assignment (create/update)
    protected $fillable = [
        'user_id',  // ID user pemilik todo
        'title',    // Judul aktivitas
        'note',     // Catatan tambahan
        'cover',    // Path gambar cover (opsional)
        'is_done',  // Status todo (0 = pending, 1 = selesai)
    ];

    // Relasi: sebuah Todo dimiliki oleh satu User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
