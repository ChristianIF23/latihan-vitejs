/**
 * InputLabel Component
 * --------------------
 * Label untuk elemen input. Bisa menggunakan:
 * - `value` (teks label), atau
 * - `children` sebagai isi alternatif.
 *
 * Jika `value` ada, maka dipakai. Jika tidak, isi children digunakan.
 *
 * Props:
 * - value (string): teks label.
 * - className (string): kelas tambahan.
 * - children (node): fallback isi label.
 * - ...props: properti tambahan untuk elemen <label>.
 */

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props} // meneruskan atribut tambahan (htmlFor, dll.)
            className={`
                block text-sm font-medium text-gray-700
                ${className}
            `}
        >
            {value ? value : children}
        </label>
    );
}
