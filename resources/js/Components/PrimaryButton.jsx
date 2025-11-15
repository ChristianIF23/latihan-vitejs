/**
 * PrimaryButton Component
 * ------------------------------------------------------------------
 * Tombol utama dengan gaya default yang konsisten untuk aplikasi.
 * Props:
 * - className : (optional) kelas tambahan untuk override styling.
 * - disabled  : boolean untuk menonaktifkan tombol.
 * - children  : isi atau teks tombol.
 * - ...props  : sisa atribut yang ingin diteruskan ke elemen <button>.
 *
 * Catatan:
 * - Logika original TIDAK diubah.
 * - Styling dasar tetap, hanya ditambahkan komentar dan dirapikan.
 */

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={
                // Styling dasar tombol
                `inline-flex items-center rounded-md border border-transparent 
                bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest 
                text-white transition duration-150 ease-in-out 
                
                // Hover & focus states
                hover:bg-gray-700 focus:bg-gray-700 focus:outline-none 
                focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
                
                // Active state & disabled opacity
                active:bg-gray-900 ${disabled && 'opacity-25'} 
                
                // Kelas tambahan dari luar
                ` + className
            }
        >
            {/* Konten tombol */}
            {children}
        </button>
    );
}
