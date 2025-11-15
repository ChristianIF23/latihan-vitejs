import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import Chart from "react-apexcharts";

export default function Index({
    todos,
    filters,
    stats = { done: 0, pending: 0 },
    flash,
}) {
    useEffect(() => {
        if (flash?.success) {
            Swal.fire("Berhasil", flash.success, "success");
        }
    }, [flash]);

    const onSearch = (e) => {
        e.preventDefault();
        router.get(route("todos.index"),
            {
                q: e.target.q.value,
                status: e.target.status.value,
            },
            { preserveState: true }
        );
    };

    const renderPaginationLabel = (label) => {
        if (!label) return "";
        const l = String(label).toLowerCase();
        if (l.includes("previous")) return "Previous";
        if (l.includes("next")) return "Next";
        return label;
    };

    return (
        <AuthenticatedLayout>
            <Head title="Todos" />

            <div className="py-6 px-4">
                <div className="mx-auto max-w-7xl space-y-10">

                    {/* HEADER - NEW MODERN */}
                    <div className="
                        bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
                        border border-slate-700 shadow-xl rounded-3xl
                        px-6 py-5 flex items-center gap-6 backdrop-blur-xl
                    ">
                        <Link
                            href={route("dashboard")}
                            className="
                                px-4 py-2 rounded-xl
                                bg-slate-800/60 hover:bg-slate-700
                                text-slate-200 font-medium shadow
                                transition-all
                            "
                        >
                            ← Kembali
                        </Link>

                        <h1 className="
                            text-2xl font-semibold text-white tracking-wide
                        ">
                            Manajemen Todos
                        </h1>
                    </div>

                    {/* GRID CHART + FILTER */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* CHART CARD */}
                        <div className="
                            rounded-3xl bg-slate-900/60
                            border border-slate-700
                            p-6 shadow-2xl backdrop-blur
                        ">
                            <h3 className="text-slate-200 text-lg font-semibold mb-4">
                                Statistik Todos
                            </h3>
                            <div className="flex justify-center">
                                <Chart
                                    type="donut"
                                    height={240}
                                    series={[stats.done, stats.pending]}
                                    options={{
                                        labels: ["Selesai", "Belum"],
                                        colors: ["#16a34a", "#0284c7"],
                                        legend: {
                                            position: "bottom",
                                            labels: { colors: "#cbd5e1" },
                                        },
                                        dataLabels: { style: { colors: ["#fff"] } },
                                        stroke: { width: 0 },
                                    }}
                                />
                            </div>
                        </div>

                        {/* FILTER CARD */}
                        <div className="
                            rounded-3xl bg-slate-900/60
                            border border-slate-700
                            p-6 shadow-2xl backdrop-blur
                        ">
                            <h3 className="text-slate-200 text-lg font-semibold mb-4">
                                Filter Pencarian
                            </h3>

                            <form onSubmit={onSearch} className="space-y-5">

                                <div>
                                    <label className="text-slate-400 text-xs mb-1 block">
                                        Cari Judul
                                    </label>
                                    <input
                                        name="q"
                                        defaultValue={filters?.q || ""}
                                        className="
                                            w-full rounded-xl bg-slate-800/70 
                                            text-slate-100 border border-slate-700
                                            px-3 py-2 text-sm shadow-inner
                                            focus:ring-2 focus:ring-indigo-500
                                        "
                                        placeholder="Cari judul..."
                                    />
                                </div>

                                <div>
                                    <label className="text-slate-400 text-xs mb-1 block">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        defaultValue={filters?.status || ""}
                                        className="
                                            w-full rounded-xl bg-slate-800/70 
                                            text-slate-100 border border-slate-700
                                            px-3 py-2 text-sm shadow-inner
                                            focus:ring-2 focus:ring-indigo-500
                                        "
                                    >
                                        <option value="">Semua</option>
                                        <option value="done">Selesai</option>
                                        <option value="pending">Belum</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        className="
                                            flex-1 rounded-xl bg-indigo-600 
                                            hover:bg-indigo-700 text-white
                                            px-4 py-2 text-sm shadow-lg
                                            transition
                                        "
                                    >
                                        Terapkan
                                    </button>

                                    <Link
                                        href={route("todos.create")}
                                        className="
                                            flex-1 text-center rounded-xl
                                            bg-emerald-600 hover:bg-emerald-700 
                                            text-white px-4 py-2 text-sm shadow-lg
                                            transition
                                        "
                                    >
                                        + Tambah Todo
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* TABLE CARD */}
                    <div className="
                        rounded-3xl bg-slate-900/60 p-6
                        border border-slate-700 shadow-2xl backdrop-blur
                    ">
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">
                            Daftar Todos
                        </h3>

                        <div className="overflow-x-auto rounded-2xl border border-slate-700">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-800 text-slate-300 border-b border-slate-700">
                                        <th className="py-3 px-4 text-left">Judul</th>
                                        <th className="py-3 px-4 text-left">Status</th>
                                        <th className="py-3 px-4 text-left">Cover</th>
                                        <th className="py-3 px-4 text-left">Aksi</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {todos.data.map((todo) => (
                                        <tr
                                            key={todo.id}
                                            className="border-b border-slate-700 hover:bg-slate-800/40 transition"
                                        >
                                            <td className="py-3 px-4">
                                                <Link
                                                    href={route("todos.show", todo.id)}
                                                    className="text-slate-200 font-medium hover:underline"
                                                >
                                                    {todo.title}
                                                </Link>
                                            </td>

                                            <td className="py-3 px-4">
                                                {todo.is_done ? (
                                                    <span className="px-3 py-1 text-xs font-medium rounded-xl bg-green-800/40 text-green-300">
                                                        Selesai
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 text-xs font-medium rounded-xl bg-yellow-800/40 text-yellow-300">
                                                        Belum
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-3 px-4">
                                                {todo.cover ? (
                                                    <img
                                                        src={`/storage/${todo.cover}`}
                                                        className="h-12 w-12 object-cover rounded-xl border border-slate-600"
                                                    />
                                                ) : (
                                                    <span className="text-slate-500">-</span>
                                                )}
                                            </td>

                                            <td className="py-3 px-4 space-x-4">
                                                <Link
                                                    href={route("todos.edit", todo.id)}
                                                    className="text-blue-400 hover:text-blue-300 underline"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        Swal.fire({
                                                            title: "Hapus?",
                                                            text: "Yakin hapus todo ini?",
                                                            icon: "warning",
                                                            showCancelButton: true,
                                                            confirmButtonText: "Ya, hapus",
                                                            cancelButtonText: "Batal",
                                                        }).then((res) => {
                                                            if (res.isConfirmed) {
                                                                router.delete(
                                                                    route("todos.destroy", todo.id),
                                                                    { preserveScroll: true }
                                                                );
                                                            }
                                                        });
                                                    }}
                                                    className="text-red-400 hover:text-red-300 underline"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {todos.data.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="py-6 text-center text-slate-500">
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* PAGINATION */}
                        <div className="mt-6 flex gap-2 flex-wrap">
                            {todos.links.map((link, idx) => {
                                const raw = link.label || "";
                                const normalized = renderPaginationLabel(raw);
                                const isHtml = normalized === raw && /<\/?[^>]+>/.test(raw);

                                return (
                                    <button
                                        key={idx}
                                        onClick={() =>
                                            link.url && router.get(link.url, {}, { preserveState: true })
                                        }
                                        className={`
                                            px-4 py-2 text-sm rounded-xl border shadow-md transition
                                            ${
                                                link.active
                                                    ? "bg-indigo-600 text-white border-indigo-600"
                                                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                                            }
                                        `}
                                        {...(isHtml
                                            ? { dangerouslySetInnerHTML: { __html: raw } }
                                            : { children: normalized })}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
