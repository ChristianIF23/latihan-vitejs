import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
                {/* CARD */}
                <div className="w-full max-w-md bg-slate-800/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-8 text-white">
                    {/* HEADER */}
                    <div className="flex flex-col items-center gap-2 mb-8">
                        <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center text-white font-bold text-2xl border border-white/20 shadow-lg">
                            TODO
                        </div>

                        <h2 className="text-xl font-semibold">
                            Buat Akun Baru 
                        </h2>
                        <p className="text-sm text-slate-300">
                            Isi data di bawah ini ya!
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Nama Lengkap
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                className="w-full rounded-xl bg-slate-800 border border-white/20 text-white placeholder-slate-400 px-3 py-2 focus:border-blue-400 focus:ring-blue-400/20"
                                autoComplete="name"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <p className="text-xs text-red-400 mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                className="w-full rounded-xl bg-slate-800 border border-white/20 text-white placeholder-slate-400 px-3 py-2 focus:border-blue-400 focus:ring-blue-400/20"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            {errors.email && (
                                <p className="text-xs text-red-400 mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    className="w-full rounded-xl bg-slate-800 border border-white/20 text-white placeholder-slate-400 px-3 py-2 pr-10 focus:border-blue-400 focus:ring-blue-400/20"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute inset-y-0 right-0 px-3 text-slate-300 hover:text-white"
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="text-xs text-red-400 mt-1">
                                    {errors.password}
                                </p>
                            )}

                            {/* Password Box */}
                            <div className="mt-3 p-3 bg-slate-800/50 border border-white/10 rounded-xl text-xs text-slate-300">
                                <strong className="text-white">
                                    Password harus mengandung:
                                </strong>
                                <ul className="list-disc pl-4 mt-1 space-y-1">
                                    <li>Minimal 8 karakter</li>
                                    <li>Huruf kapital (A–Z)</li>
                                    <li>Angka (0–9)</li>
                                    <li>Simbol unik (! @ # $ % & *)</li>
                                </ul>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Konfirmasi Password
                            </label>

                            <div className="relative">
                                <input
                                    id="password_confirmation"
                                    type={showPassword2 ? "text" : "password"}
                                    value={data.password_confirmation}
                                    className="w-full rounded-xl bg-slate-800 border border-white/20 text-white placeholder-slate-400 px-3 py-2 pr-10 focus:border-blue-400 focus:ring-blue-400/20"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword2((v) => !v)}
                                    className="absolute inset-y-0 right-0 px-3 text-slate-300 hover:text-white"
                                >
                                    {showPassword2 ? "🙈" : "👁️"}
                                </button>
                            </div>

                            {errors.password_confirmation && (
                                <p className="text-xs text-red-400 mt-1">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white py-2.5 font-medium shadow-lg shadow-blue-600/30 transition disabled:opacity-60"
                        >
                            {processing ? "Mendaftar..." : "Daftar"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-300 mt-6">
                        Sudah punya akun?{" "}
                        <Link
                            href={route("login")}
                            className="text-blue-400 hover:underline"
                        >
                            Masuk
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
