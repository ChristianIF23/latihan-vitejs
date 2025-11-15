/**
 * AuthenticatedLayout
 * --------------------
 * Layout utama untuk halaman yang membutuhkan autentikasi.
 * Mencakup:
 * - Navbar responsif
 * - Dropdown user (profile + logout)
 * - Mobile navigation menu
 * - Area konten
 *

 */

import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ children }) {
  const user = usePage().props.auth.user;

  // State untuk mobile navigation dropdown
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  // Inisial avatar user (misal: "C" untuk Christian)
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      
      {/* NAVIGATION BAR */}
      <nav className="bg-slate-900 border-b border-slate-800 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* LEFT SECTION: LOGO + MAIN MENU */}
            <div className="flex items-center gap-8">

              {/* LOGO */}
              <Link href="/" className="flex items-center gap-2">
                <ApplicationLogo className="block h-9 w-auto invert" />
              </Link>

              {/* DESKTOP NAVIGATION */}
              <div className="hidden sm:flex sm:items-center sm:space-x-6">
                <NavLink
                  href={route('todos.index')}
                  active={route().current('todos.*')}
                  className="text-slate-100 hover:text-white"
                >
                  Todos
                </NavLink>
              </div>
            </div>

            {/* RIGHT SECTION: USER AVATAR (DESKTOP) */}
            <div className="hidden sm:flex sm:items-center">
              <Dropdown>

                {/* Trigger Avatar Button */}
                <Dropdown.Trigger>
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-white"
                  >
                    {userInitial}
                  </button>
                </Dropdown.Trigger>

                {/* Dropdown Menu */}
                <Dropdown.Content className="bg-slate-800 text-slate-100 border-slate-700">
                  <Dropdown.Link href={route('profile.edit')}>
                    Profile
                  </Dropdown.Link>

                  <Dropdown.Link
                    href={route('logout')}
                    method="post"
                    as="button"
                  >
                    Log Out
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>

            {/* MOBILE MENU BUTTON (HAMBURGER) */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() =>
                  setShowingNavigationDropdown((prev) => !prev)
                }
                className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {/* Menu Icon */}
                  <path
                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  {/* Close Icon */}
                  <path
                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* MOBILE NAVIGATION MENU */}
        <div
          className={
            (showingNavigationDropdown ? 'block' : 'hidden') +
            ' sm:hidden bg-slate-900'
          }
        >
          <div className="space-y-1 pb-3 pt-2">
            <ResponsiveNavLink
              href={route('todos.index')}
              active={route().current('todos.*')}
            >
              Todos
            </ResponsiveNavLink>
          </div>

          {/* USER INFO SECTION */}
          <div className="border-t border-slate-800 pb-1 pt-4">
            <div className="px-4">
              <div className="text-base font-medium text-slate-100">
                {user.name}
              </div>
              <div className="text-sm font-medium text-slate-400">
                {user.email}
              </div>
            </div>

            {/* USER ACTIONS */}
            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route('profile.edit')}>
                Profile
              </ResponsiveNavLink>

              <ResponsiveNavLink
                method="post"
                href={route('logout')}
                as="button"
              >
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* CONTENT AREA */}
      <main className="pt-6 px-4">
        {children}
      </main>
    </div>
  );
}
