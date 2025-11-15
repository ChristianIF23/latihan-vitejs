// ======================================================================
// File: app.jsx
// Deskripsi:
// Entry point utama aplikasi React dengan Inertia.js + Laravel Vite.
// Bertanggung jawab untuk inisialisasi aplikasi, memuat halaman, dan
// mengkonfigurasi progress bar Inertia.
// ======================================================================

import '../css/app.css';                 // Import stylesheet utama
import './bootstrap';                    // Bootstrap konfigurasi Laravel

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

// Mengambil nama aplikasi dari environment (.env)
// Jika tidak ditemukan, fallback ke "Laravel"
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  // Mengatur format judul tab browser.
  // Example: "Todos - MyApp"
  title: (title) => `${title} - ${appName}`,

  // Menemukan dan memuat file komponen halaman berdasarkan nama route Inertia.
  // Contoh: route "Todos/Index" → file "Pages/Todos/Index.jsx"
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,                 // Pola path halaman
      import.meta.glob('./Pages/**/*.jsx')   // Semua file di folder Pages
    ),

  // Mengatur cara aplikasi di-render menggunakan React 18 createRoot.
  setup({ el, App, props }) {
    const root = createRoot(el);            // Membuat root React
    root.render(<App {...props} />);        // Render halaman Inertia.js
  },

  // Konfigurasi progress bar (Inertia Progress)
  progress: {
    color: '#4B5563', // Warna abu-abu (gray-600)
  },
});
