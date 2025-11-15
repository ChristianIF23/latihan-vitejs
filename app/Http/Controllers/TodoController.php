<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

/**
 * Controller untuk fitur Todo.
 * Fungsinya meliputi:
 * - Menampilkan list todo (dengan search, filter, statistik)
 * - Membuat todo baru
 * - Menampilkan detail todo
 * - Mengedit todo
 * - Menghapus todo
 *
 * Seluruh logika inti dipertahankan seperti aslinya.
 */
class TodoController extends Controller
{
    /**
     * Menampilkan daftar todo berdasarkan user yang sedang login.
     * Menyediakan fitur:
     * - Pencarian (q)
     * - Filter status (done / pending)
     * - Statistik total/pending/done (untuk chart)
     */
    public function index(Request $request)
    {
        // Query utama berdasarkan user yang login
        $query = Todo::where('user_id', $request->user()->id);

        // Pencarian berdasarkan judul
        if ($request->filled('q')) {
            $query->where('title', 'like', '%' . $request->q . '%');
        }

        // Filter status (done / pending)
        if ($request->filled('status') && in_array($request->status, ['done', 'pending'])) {
            $query->when(
                $request->status === 'done',
                fn($q) => $q->where('is_done', true)
            );
            $query->when(
                $request->status === 'pending',
                fn($q) => $q->where('is_done', false)
            );
        }

        // Ambil data dengan pagination
        $todos = $query->latest()->paginate(20)->withQueryString();

        // Statistik untuk charts
        $total   = Todo::where('user_id', $request->user()->id)->count();
        $done    = Todo::where('user_id', $request->user()->id)->where('is_done', true)->count();
        $pending = $total - $done;

        // Kirim data ke frontend
        return Inertia::render('Todos/Index', [
            'todos'   => $todos,
            'filters' => $request->only('q', 'status'),
            'stats'   => [
                'total'   => $total,
                'done'    => $done,
                'pending' => $pending,
            ],
        ]);
    }

    /**
     * Menampilkan halaman create Todo.
     */
    public function create()
    {
        return Inertia::render('Todos/Create');
    }

    /**
     * Menyimpan todo yang baru dibuat.
     * Validasi termasuk file cover (optional).
     */
    public function store(Request $request)
    {
        // Validasi input
        $data = $request->validate([
            'title'   => ['required', 'string', 'max:255'],
            'note'    => ['nullable', 'string'],        // berisi HTML dari Trix editor
            'is_done' => ['nullable', 'boolean'],
            'cover'   => ['nullable', 'image', 'max:2048'],
        ]);

        // Menambahkan user_id & konversi boolean
        $data['user_id'] = $request->user()->id;
        $data['is_done'] = $request->boolean('is_done');

        // Upload cover jika ada
        if ($request->hasFile('cover')) {
            $data['cover'] = $request->file('cover')->store('covers', 'public');
        }

        // Simpan ke database
        Todo::create($data);

        return redirect()
            ->route('todos.index')
            ->with('success', 'Todo berhasil ditambahkan');
    }

    /**
     * Menampilkan detail sebuah todo.
     * Hanya pemilik boleh mengakses.
     */
    public function show(Todo $todo)
    {
        $this->authorizeOwner($todo);

        return Inertia::render('Todos/Show', [
            'todo' => [
                'id'         => $todo->id,
                'title'      => $todo->title,
                'note'       => $todo->note,
                'is_done'    => (bool) $todo->is_done,
                'cover'      => $todo->cover,
                'created_at' => $todo->created_at?->toDateTimeString(),
                'updated_at' => $todo->updated_at?->toDateTimeString(),
            ],
        ]);
    }

    /**
     * Menampilkan form edit todo.
     * Hanya pemilik boleh mengakses.
     */
    public function edit(Todo $todo)
    {
        $this->authorizeOwner($todo);

        return Inertia::render('Todos/Edit', [
            'todo' => $todo,
        ]);
    }

    /**
     * Mengupdate todo.
     * Validasi sama seperti store().
     * Jika cover baru diupload, cover lama akan dihapus.
     */
    public function update(Request $request, Todo $todo)
    {
        $this->authorizeOwner($todo);

        // Validasi input
        $data = $request->validate([
            'title'   => ['required', 'string', 'max:255'],
            'note'    => ['nullable', 'string'],
            'is_done' => ['nullable', 'boolean'],
            'cover'   => ['nullable', 'image', 'max:2048'],
        ]);

        $data['is_done'] = $request->boolean('is_done');

        // Jika upload cover baru
        if ($request->hasFile('cover')) {
            // Hapus cover lama jika ada
            if ($todo->cover) {
                Storage::disk('public')->delete($todo->cover);
            }

            // Upload cover baru
            $data['cover'] = $request->file('cover')->store('covers', 'public');
        }

        // Update database
        $todo->update($data);

        return redirect()
            ->route('todos.index')
            ->with('success', 'Todo berhasil diubah');
    }

    /**
     * Menghapus todo.
     * Jika ada file cover, hapus dari storage.
     */
    public function destroy(Todo $todo)
    {
        $this->authorizeOwner($todo);

        // Hapus cover jika ada
        if ($todo->cover) {
            Storage::disk('public')->delete($todo->cover);
        }

        // Hapus todo dari database
        $todo->delete();

        return redirect()
            ->route('todos.index')
            ->with('success', 'Todo berhasil dihapus');
    }

    /**
     * Validasi apakah user adalah pemilik todo.
     * Jika bukan, abort 403.
     *
     * @param Todo $todo
     */
    protected function authorizeOwner(Todo $todo)
    {
        abort_if(auth()->id() !== $todo->user_id, 403);
    }
}
