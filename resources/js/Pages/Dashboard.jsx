import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function Dashboard() {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          E. Aktivitas Praktikum
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-8">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-8 text-gray-900 space-y-8">
              {/* judul */}
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  PABWE – Laravel Inertia
                </p>
                <h1 className="text-2xl font-bold text-gray-900 mt-1">
                  5.1 Fitur Todos
                </h1>
                <p className="mt-3 text-gray-700 leading-relaxed">
                  Pada tahap <span className="font-semibold">4.1</span> kamu telah mengimplementasikan fitur
                  Autentikasi menggunakan Laravel Inertia. Selanjutnya lengkapilah fitur todos untuk dapat
                  menambahkan aktivitas yang akan dilakukan oleh pengguna ke depannya.
                </p>
              </div>

              {/* kebutuhan utama */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Kebutuhan Utama:</h2>
                <ol className="list-decimal list-inside mt-3 space-y-1 text-gray-700">
                  <li>Tambah Data</li>
                  <li>Ubah Data</li>
                  <li>Hapus Data</li>
                  <li>Mengubah Cover</li>
                </ol>
              </div>

              {/* kebutuhan lanjutan */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Kebutuhan Lanjutan:</h2>
                <ol className="list-decimal list-inside mt-3 space-y-1 text-gray-700">
                  <li>Pencarian dan Filter Data</li>
                  <li>Pagination maksimal 20 data per halaman</li>
                  <li>
                    Alert tindakan menggunakan{' '}
                    <a
                      href="https://sweetalert2.github.io/"
                      className="text-indigo-600 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      SweetAlert2
                    </a>
                    .
                  </li>
                  <li>
                    Statistik data menggunakan{' '}
                    <a
                      href="https://apexcharts.com/"
                      className="text-indigo-600 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://apexcharts.com/
                    </a>
                    .
                  </li>
                  <li className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <span className="font-semibold text-yellow-900">
                      Pengisian data catatan <u>WAJIB</u> menggunakan
                    </span>{' '}
                    <a
                      href="https://trix-editor.org/"
                      className="text-indigo-600 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://trix-editor.org/
                    </a>
                    .
                  </li>
                </ol>
              </div>

              {/* artefak */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">5.2 Artefak Dikumpulkan</h2>
                <ol className="list-decimal list-inside mt-3 space-y-1 text-gray-700">
                  <li>Repository Github</li>
                  <li>URL hasil deploy</li>
                  <li>Video presentasi (untuk yang tidak bisa deploy)</li>
                </ol>
              </div>

              <p className="text-xs text-gray-400 pt-4">
                © 2025 Delcom Labs. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
