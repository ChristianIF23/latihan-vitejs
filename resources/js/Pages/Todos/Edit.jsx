import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, Link } from '@inertiajs/react'
import TrixEditor from '@/Components/TrixEditor'

export default function Edit({ todo }) {
  const { data, setData, post, processing, errors } = useForm({
    _method: 'PUT',
    title: todo.title || '',
    note: todo.note || '',
    is_done: todo.is_done,
    cover: null,
  })

  const submit = (e) => {
    e.preventDefault()
    post(route('todos.update', todo.id), { forceFormData: true })
  }

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-white">Edit Todo</h2>}
    >
      <Head title="Edit Todo" />

      <div className="py-6 max-w-3xl mx-auto px-4">
        <form
          onSubmit={submit}
          className="
            bg-slate-900/60 backdrop-blur-lg shadow-xl 
            border border-slate-800 rounded-xl 
            p-6 space-y-6
          "
        >
          {/* JUDUL */}
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-200">
              Judul
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className="
                w-full px-3 py-2 rounded-md 
                bg-slate-800 text-white
                border border-slate-700
                placeholder-slate-400
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
              "
              placeholder="Masukkan judul..."
            />
            {errors.title && (
              <p className="text-sm text-red-400 mt-1">{errors.title}</p>
            )}
          </div>

          {/* CATATAN */}
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-200">
              Catatan (WAJIB dengan Trix Editor)
            </label>

            <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
              <TrixEditor
                inputName="note"
                value={data.note}
                onChange={(v) => setData('note', v)}
              />
            </div>

            {errors.note && (
              <p className="text-sm text-red-400 mt-1">{errors.note}</p>
            )}
          </div>

          {/* COVER */}
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-200">
              Cover (kosongkan jika tidak diganti)
            </label>
            <input
              type="file"
              onChange={(e) => setData('cover', e.target.files[0])}
              className="
                w-full text-white 
                file:bg-blue-700 file:text-white 
                file:border-none file:px-4 file:py-2 file:rounded-md
                file:hover:bg-blue-600
              "
            />

            {todo.cover && (
              <img
                src={`/storage/${todo.cover}`}
                className="h-20 w-20 object-cover rounded-lg mt-3 border border-slate-700"
              />
            )}

            {errors.cover && (
              <p className="text-sm text-red-400 mt-1">{errors.cover}</p>
            )}
          </div>

          {/* CHECKBOX */}
          <label className="flex items-center gap-2 text-slate-200">
            <input
              type="checkbox"
              checked={data.is_done}
              onChange={(e) => setData('is_done', e.target.checked)}
              className="h-4 w-4 accent-blue-600"
            />
            Tandai selesai
          </label>

          {/* ACTION BUTTONS */}
          <div className="flex justify-between items-center pt-4">
            <Link
              href={route('todos.index')}
              className="text-sm text-slate-300 hover:text-white transition"
            >
              ← Kembali
            </Link>

            <button
              type="submit"
              disabled={processing}
              className="
                bg-blue-700 hover:bg-blue-600 
                text-white px-5 py-2 rounded-md
                shadow-lg transition
              "
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  )
}
