// Komponen ResponsiveNavLink
// Digunakan untuk membuat link navigasi pada menu responsif (mobile sidebar)
// Mendukung state "active" agar link yang sedang dibuka terlihat berbeda.

import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,        // Menentukan apakah link dalam keadaan aktif
    className = '',        // Kelas tambahan dari luar
    children,              // Konten teks/link
    ...props               // Props tambahan (href, method, dll)
}) {
    return (
        <Link
            {...props}
            className={
                `
                flex w-full items-start border-l-4 py-2 pe-4 ps-3
                ${active
                    ? `
                        /* Jika aktif: warna lebih menonjol */
                        border-indigo-400
                        bg-indigo-50
                        text-indigo-700
                        focus:border-indigo-700
                        focus:bg-indigo-100
                        focus:text-indigo-800
                    `
                    : `
                        /* Jika tidak aktif: warna normal */
                        border-transparent
                        text-gray-600
                        hover:border-gray-300
                        hover:bg-gray-50
                        hover:text-gray-800
                        focus:border-gray-300
                        focus:bg-gray-50
                        focus:text-gray-800
                    `
                }
                text-base font-medium transition duration-150 ease-in-out focus:outline-none
                ${className}
                `
            }
        >
            {children}
        </Link>
    );
}
