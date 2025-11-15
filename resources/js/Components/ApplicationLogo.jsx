/**
 * ApplicationLogo Component
 * -------------------------
 * Menampilkan logo aplikasi berupa lingkaran berwarna gelap dengan huruf "T"
 * di tengahnya. Komponen ini menerima properti className untuk menambahkan
 * styling eksternal tanpa mengubah struktur default komponen.
 *
 * Props:
 * - className (string): kelas tambahan untuk wrapper utama.
 */

export default function ApplicationLogo({ className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Lingkaran sebagai logo utama */}
      <div
        className="
          flex h-9 w-9 items-center justify-center
          rounded-full bg-slate-900 text-sm font-semibold text-white
        "
      >
        T
      </div>
    </div>
  );
}
