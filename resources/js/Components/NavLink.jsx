/**
 * NavLink Component
 * -------------------
 * Link navigasi berbasis Inertia.js dengan style aktif/non-aktif.
 * Tidak menggunakan border-b-2 (sudah dihilangkan sesuai instruksi asli).
 *
 * Props:
 * - active (boolean): menentukan apakah link sedang aktif.
 * - className (string): kelas tambahan.
 * - children (node): isi link.
 * - ...props: seluruh properti tambahan untuk <Link>.
 */

import { Link } from '@inertiajs/react';

export default function NavLink({
  active = false,
  className = '',
  children,
  ...props
}) {
  return (
    <Link
      {...props} // meneruskan atribut seperti href, method, dll.
      className={`
        inline-flex h-12 items-center px-3 text-sm font-medium
        transition duration-150 ease-in-out
        ${active ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}
        ${className}
      `}
    >
      {children}
    </Link>
  );
}
