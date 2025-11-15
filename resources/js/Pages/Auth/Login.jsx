import React, { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const [showPassword, setShowPassword] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    post(route('login'))
  }

  return (
    <>
      <Head title="Log in" />

      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 relative">
          {/* link register di pojok */}
          <div className="absolute right-8 top-6 text-xs text-slate-500">
            Belum punya akun?{' '}
            <Link href={route('register')} className="text-slate-900 font-semibold">
              Daftar
            </Link>
          </div>

          {/* Logo + judul */}
          <div className="flex flex-col items-center gap-1 mb-8">
            <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-xl">
              TI
            </div>
            <p className="text-sm text-slate-500">Todos Inertia</p>
            <h2 className="text-xl font-semibold text-slate-900">Selamat datang 👋</h2>
            <p className="text-sm text-slate-500">Masuk ke akunmu dulu ya</p>
          </div>

          {status && (
            <div className="mb-4 text-sm font-medium text-green-600">
              {status}
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            {/* email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={data.email}
                className="w-full rounded-lg border-slate-200 focus:border-slate-900 focus:ring-slate-900/30"
                autoComplete="username"
                onChange={(e) => setData('email', e.target.value)}
                required
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* password + toggle */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={data.password}
                  className="w-full rounded-lg border-slate-200 focus:border-slate-900 focus:ring-slate-900/30 pr-10"
                  autoComplete="current-password"
                  onChange={(e) => setData('password', e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 px-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* remember + forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900/30"
                />
                Remember me
              </label>

              {canResetPassword && (
                <Link
                  href={route('password.request')}
                  className="text-sm text-slate-900 hover:underline"
                >
                  Lupa password?
                </Link>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full rounded-lg bg-slate-900 text-white py-2.5 font-medium hover:bg-slate-800 transition disabled:opacity-60"
            >
              {processing ? 'Masuk...' : 'Log in'}
            </button>
          </form>

          {/* opsi register di bawah tetap ada */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Belum punya akun?{' '}
            <Link href={route('register')} className="text-slate-900 font-medium">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
