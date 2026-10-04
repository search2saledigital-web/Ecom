"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Layers,
    Package,
    ShoppingBag,
    MessageSquare,
    LogOut,
    Menu,
    X,
    ChevronRight,
    ShieldCheck,
} from "lucide-react";

const menuItems = [
    {
        name: "Home",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        name: "All Categories",
        href: "/admin/all-categories",
        icon: Layers,
    },
    {
        name: "All Products",
        href: "/admin/all-products",
        icon: Package,
    },
    {
        name: "All Orders",
        href: "/admin/all-orders",
        icon: ShoppingBag,
    },
    {
        name: "All Inquiries",
        href: "/admin/all-inquiy",
        icon: MessageSquare,
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        document.cookie =
            "admin_token=; path=/; max-age=0; SameSite=Lax";

        router.replace("/admin/login");
    };

    return (
        <>
            {/* Mobile Header */}
            <div className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#111111] px-5 lg:hidden">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C9A227] text-black">
                        <ShieldCheck size={19} />
                    </div>
                    <span className="font-serif text-lg text-white">
                        Admin<span className="text-[#C9A227]">Panel</span>
                    </span>
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="text-white"
                    aria-label="Toggle sidebar"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col bg-[#111111] text-white transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A227] text-black">
                        <ShieldCheck size={22} />
                    </div>

                    <div>
                        <h2 className="font-serif text-xl">
                            Admin<span className="text-[#C9A227]">Panel</span>
                        </h2>
                        <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-white/40">
                            Store Management
                        </p>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="ml-auto text-white/50 lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-4 py-7">
                    <p className="mb-4 px-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/35">
                        Main Menu
                    </p>

                    <nav className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const active =
                                item.href === "/admin"
                                    ? pathname === "/admin"
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`group flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm transition-all duration-300 ${active
                                        ? "bg-[#C9A227] font-semibold text-black shadow-lg shadow-[#C9A227]/10"
                                        : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                                        }`}
                                >
                                    <Icon size={18} />

                                    <span>{item.name}</span>

                                    {active && (
                                        <ChevronRight
                                            size={16}
                                            className="ml-auto"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 p-4">
                    <div className="mb-4 flex items-center gap-3 rounded-xl bg-white/[0.05] p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A227]/15 text-[#C9A227]">
                            <ShieldCheck size={19} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-white">
                                Administrator
                            </p>
                            <p className="mt-1 text-[10px] text-white/40">
                                Store Owner
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition-colors hover:bg-red-500/10"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}