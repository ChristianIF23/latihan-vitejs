import React, { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    post(route('register'))
  }

  return (
    <>
      <Head title="Register" />

      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <div className="flex flex-col items-center gap-1 mb-8">
            <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-xl">
              TI
            </div>
            <p className="text-sm text-slate-500">Todos Inertia</p>
            <h2 className="text-xl font-semibold text-slate-900">Buat akun baru ✨</h2>
            <p className="text-sm text-slate-500">
              Isi data di bawah ini ya
            </p>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="name">
                Nama
              </label>
              <input
                id="name"
                type="text"
                value={data.name}
                className="w-full rounded-lg border-slate-200 focus:border-slate-900 focus:ring-slate-900/30"
                autoComplete="name"
                onChange={(e) => setData('name', e.target.value)}
                required
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

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
                  autoComplete="new-password"
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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password_confirmation">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  id="password_confirmation"
                  type={showPassword2 ? 'text' : 'password'}
                  value={data.password_confirmation}
                  className="w-full rounded-lg border-slate-200 focus:border-slate-900 focus:ring-slate-900/30 pr-10"
                  autoComplete="new-password"
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword2((v) => !v)}
                  className="absolute inset-y-0 right-0 px-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword2 ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password_confirmation && (
                <p className="text-sm text-red-500 mt-1">{errors.password_confirmation}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full rounded-lg bg-slate-900 text-white py-2.5 font-medium hover:bg-slate-800 transition disabled:opacity-60"
            >
              {processing ? 'Mendaftar...' : 'Daftar'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Sudah punya akun?{' '}
            <Link href={route('login')} className="text-slate-900 font-medium">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
