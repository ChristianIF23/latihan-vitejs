// resources/js/Pages/Todos/Show.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'

export default function Show({ todo }) {
  return (
    <AuthenticatedLayout>
      <Head title={`Detail - ${todo.title}`} />

      <div className="py-6">
        <div className="mx-auto max-w-3xl space-y-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Detail Todo</h1>
            <Link
              href={route('todos.index')}
              className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white"
            >
              ← Kembali
            </Link>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">{todo.title}</h2>
              {todo.is_done ? (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Selesai
                </span>
              ) : (
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                  Belum
                </span>
              )}
            </div>

            {todo.cover && (
              <div className="mb-4">
                <img
                  src={`/storage/${todo.cover}`}
                  alt={todo.title}
                  className="h-40 w-auto rounded object-cover"
                />
              </div>
            )}

            {todo.note ? (
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: todo.note }}
              />
            ) : (
              <p className="text-sm text-gray-500">Belum ada catatan.</p>
            )}

            <p className="mt-6 text-xs text-gray-400">
              Dibuat: {todo.created_at} | Diubah: {todo.updated_at}
            </p>

            <div className="mt-4 flex gap-3">
              <Link
                href={route('todos.edit', todo.id)}
                className="text-sm text-slate-900 underline"
              >
                Edit
              </Link>
              <Link
                href={route('todos.index')}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Kembali ke daftar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
