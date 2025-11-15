/**
 * Checkbox Component
 * ------------------
 * Komponen checkbox generik dengan styling default.
 * Menerima className tambahan serta seluruh properti lain melalui ...props.
 *
 * Props:
 * - className (string): kelas CSS tambahan.
 * - ...props: semua atribut HTML valid untuk <input>.
 */

export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}                 // meneruskan semua properti ke elemen <input>
            type="checkbox"            // tipe input tetap checkbox (tidak diubah)
            className={`
                rounded border-gray-300 text-indigo-600 shadow-sm
                focus:ring-indigo-500
                ${className}
            `}
        />
    );
}
