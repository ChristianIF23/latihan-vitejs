import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, Link } from '@inertiajs/react'
import TrixEditor from '@/Components/TrixEditor'

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    note: '',
    is_done: false,
    cover: null,
  })

  const submit = (e) => {
    e.preventDefault()
    post(route('todos.store'), { forceFormData: true })
  }

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-white">Tambah Todo</h2>}
    >
      <Head title="Tambah Todo" />

      {/* TRIX CUSTOM STYLE */}
      <style>{`
        .trix-toolbar {
          background-color: #0f172a !important;
          border: 1px solid #1e293b !important;
          border-radius: 10px !important;
          padding: 8px;
          margin-bottom: 12px;
        }

        .trix-button {
          background: #1e293b !important;
          border-color: #334155 !important;
          color: #e2e8f0 !important;
          border-radius: 6px !important;
          padding: 4px 8px !important;
        }

        .trix-button:hover {
          background: #475569 !important;
        }

        .trix-button.trix-active {
          background: #3b82f6 !important;
          color: white !important;
          border-color: #3b82f6 !important;
        }

        trix-editor {
          min-height: 170px !important;
          background-color: #1e293b !important;
          color: #f1f5f9 !important;
          border-radius: 10px !important;
          padding: 14px !important;
          border: 1px solid #334155 !important;
          font-size: 15px !important;
          line-height: 1.55 !important;
        }

        trix-editor:focus {
          outline: 2px solid #3b82f6 !important;
        }

        trix-editor a {
          color: #60a5fa !important;
        }
      `}</style>

      <div className="py-6 max-w-3xl mx-auto px-4">
        <form
          onSubmit={submit}
          className="
            bg-slate-900/70 backdrop-blur-xl 
            shadow-2xl border border-slate-800 
            rounded-xl p-7 space-y-7
          "
        >
          {/* INPUT JUDUL */}
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-200">
              Judul
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className="
                w-full px-4 py-2.5 rounded-lg 
                bg-slate-800 text-slate-100
                border border-slate-700
                placeholder-slate-500
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
              "
              placeholder="Masukkan judul..."
            />
            {errors.title && (
              <p className="text-sm text-red-400 mt-1">{errors.title}</p>
            )}
          </div>

          {/* TRIX EDITOR CARD */}
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-200">
              Catatan (WAJIB dengan Trix Editor)
            </label>

            <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-3 shadow-lg">
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
              Cover
            </label>
            <input
              type="file"
              onChange={(e) => setData('cover', e.target.files[0])}
              className="
                w-full text-slate-200
                file:bg-blue-700 file:text-white 
                file:border-none file:px-4 file:py-2.5 file:rounded-lg
                file:hover:bg-blue-600
              "
            />
            {errors.cover && (
              <p className="text-sm text-red-400 mt-1">{errors.cover}</p>
            )}
          </div>

          {/* CHECKBOX */}
          <label className="flex items-center gap-3 text-slate-200">
            <input
              type="checkbox"
              checked={data.is_done}
              onChange={(e) => setData('is_done', e.target.checked)}
              className="h-4 w-4 accent-blue-600"
            />
            Tandai selesai
          </label>

          {/* BUTTONS */}
          <div className="flex justify-between items-center pt-2">
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
                text-white px-6 py-2.5 rounded-lg
                shadow-lg transition
              "
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  )
}
