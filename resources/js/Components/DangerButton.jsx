/**
 * DangerButton Component
 * ----------------------
 * Tombol aksi berbahaya (misal: hapus, keluar, atau tindakan kritis lainnya).
 * Memiliki warna merah dan efek hover. Jika disabled bernilai true,
 * tombol akan diberi efek opacity-25 tanpa mengubah logika asli.
 *
 * Props:
 * - className (string): kelas tambahan dari luar.
 * - disabled (boolean): menonaktifkan tombol dan memberi efek visual.
 * - children (node): isi teks atau elemen dalam tombol.
 * - ...props: properti tambahan untuk <button>.
 */

export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}                   // meneruskan properti tambahan
            disabled={disabled}          // tetap mempertahankan perilaku disabled
            className={`
                inline-flex items-center rounded-md border border-transparent
                bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest
                text-white transition duration-150 ease-in-out
                hover:bg-red-500
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                active:bg-red-700
                ${disabled ? 'opacity-25' : ''}
                ${className}
            `}
        >
            {children}
        </button>
    );
}
