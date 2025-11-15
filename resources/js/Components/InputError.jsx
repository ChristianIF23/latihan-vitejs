/**
 * InputError Component
 * --------------------
 * Menampilkan pesan error kecil berwarna merah.
 * Komponen hanya dirender jika `message` memiliki nilai.
 *
 * Props:
 * - message (string): pesan error yang akan ditampilkan.
 * - className (string): kelas tambahan untuk styling.
 * - ...props: properti tambahan untuk elemen <p>.
 */

export default function InputError({ message, className = '', ...props }) {
    // Jika tidak ada pesan, return null (perilaku asli, tidak diubah)
    if (!message) return null;

    return (
        <p
            {...props} // meneruskan properti tambahan
            className={`
                text-sm text-red-600
                ${className}
            `}
        >
            {message}
        </p>
    );
}
