<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        $query = Todo::where('user_id', $request->user()->id);

        // search
        if ($request->filled('q')) {
            $query->where('title', 'like', '%' . $request->q . '%');
        }

        // filter status
        if ($request->filled('status') && in_array($request->status, ['done', 'pending'])) {
            $query->when($request->status === 'done', fn ($q) => $q->where('is_done', true));
            $query->when($request->status === 'pending', fn ($q) => $q->where('is_done', false));
        }

        $todos = $query->latest()->paginate(20)->withQueryString();

        // statistik buat apexcharts
        $total = Todo::where('user_id', $request->user()->id)->count();
        $done = Todo::where('user_id', $request->user()->id)->where('is_done', true)->count();
        $pending = $total - $done;

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

    public function create()
    {
        return Inertia::render('Todos/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'   => ['required', 'string', 'max:255'],
            'note'    => ['nullable', 'string'], // dari trix (html)
            'is_done' => ['nullable', 'boolean'],
            'cover'   => ['nullable', 'image', 'max:2048'],
        ]);

        $data['user_id'] = $request->user()->id;
        $data['is_done'] = $request->boolean('is_done');

        if ($request->hasFile('cover')) {
            $data['cover'] = $request->file('cover')->store('covers', 'public');
        }

        Todo::create($data);

        return redirect()->route('todos.index')->with('success', 'Todo berhasil ditambahkan');
    }

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

    public function edit(Todo $todo)
    {
        $this->authorizeOwner($todo);

        return Inertia::render('Todos/Edit', [
            'todo' => $todo,
        ]);
    }

    public function update(Request $request, Todo $todo)
    {
        $this->authorizeOwner($todo);

        $data = $request->validate([
            'title'   => ['required', 'string', 'max:255'],
            'note'    => ['nullable', 'string'],
            'is_done' => ['nullable', 'boolean'],
            'cover'   => ['nullable', 'image', 'max:2048'],
        ]);

        $data['is_done'] = $request->boolean('is_done');

        if ($request->hasFile('cover')) {
            // hapus cover lama
            if ($todo->cover) {
                Storage::disk('public')->delete($todo->cover);
            }
            $data['cover'] = $request->file('cover')->store('covers', 'public');
        }

        $todo->update($data);

        return redirect()->route('todos.index')->with('success', 'Todo berhasil diubah');
    }

    public function destroy(Todo $todo)
    {
        $this->authorizeOwner($todo);

        if ($todo->cover) {
            Storage::disk('public')->delete($todo->cover);
        }

        $todo->delete();

        return redirect()->route('todos.index')->with('success', 'Todo berhasil dihapus');
    }

    protected function authorizeOwner(Todo $todo)
    {
        abort_if(auth()->id() !== $todo->user_id, 403);
    }
}
