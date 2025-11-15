import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <>
            <Head title="Log in" />

            <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
                <div
                    className="
            w-full max-w-md px-8 py-10 rounded-3xl
            bg-slate-900/70 backdrop-blur-xl 
            border border-slate-800 shadow-2xl
            space-y-7
          "
                >
                    {/* Title */}
                    <div className="text-center space-y-1">
                        <h1 className="text-3xl font-bold text-white tracking-wide">
                            Todo List
                        </h1>
                        <p className="text-slate-300 text-sm">
                            Masuk untuk mengelola kegiatanmu!
                        </p>
                    </div>

                    {status && (
                        <div className="text-sm font-medium text-green-400 text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-1">
                            <label className="text-sm text-slate-200 font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                autoComplete="username"
                                required
                                placeholder="Masukkan email..."
                                className="
                  w-full px-3 py-2.5 rounded-lg
                  bg-slate-800 text-white
                  border border-slate-700
                  placeholder-slate-400
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition
                "
                            />
                            {errors.email && (
                                <p className="text-sm text-red-400">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <label className="text-sm text-slate-200 font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    autoComplete="current-password"
                                    required
                                    placeholder="Masukkan password..."
                                    className="
                    w-full px-3 py-2.5 rounded-lg
                    bg-slate-800 text-white
                    border border-slate-700
                    placeholder-slate-400
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    pr-11 transition
                  "
                                />

                                {/* Toggle password */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-0 px-3 text-slate-400 hover:text-slate-200"
                                >
                                    {showPassword ? "🔒" : "👀"}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-400">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-slate-300 text-sm">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                    className="h-4 w-4 accent-blue-600"
                                />
                                Ingat saya
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-blue-400 hover:text-blue-300"
                                >
                                    
                                </Link>
                            )}
                        </div>

                        {/* Tombol Login */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="
                w-full bg-blue-600 hover:bg-blue-500
                text-white py-2.5 rounded-lg
                font-medium shadow-lg transition
                disabled:opacity-60
              "
                        >
                            {processing ? "Masuk..." : "Masuk"}
                        </button>
                    </form>

                    {/* Link ke register */}
                    <p className="text-center text-sm text-slate-300">
                        Belum punya akun?{" "}
                        <Link
                            href={route("register")}
                            className="text-blue-400 hover:text-blue-300"
                        >
                            Daftar
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
