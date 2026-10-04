"use client";

import React, { useState } from "react";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
} from "lucide-react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const ADMIN_EMAIL = "admin@gmail.com";
        const ADMIN_PASSWORD = "admin123";

        if (
            form.email === ADMIN_EMAIL &&
            form.password === ADMIN_PASSWORD
        ) {
            document.cookie =
                "admin_token=admin_logged_in; path=/; max-age=86400; SameSite=Lax";

            window.location.href = "/admin";
        } else {
            alert("Invalid email or password");
        }
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111111] px-4 py-10">
            {/* Background */}
            <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-[#C9A227]/10" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#C9A227]/[0.06] blur-[120px]" />

            <div className="relative w-full max-w-[440px]">
                {/* Logo */}
                <div className="mb-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9A227] text-[#111111] shadow-lg shadow-[#C9A227]/10">
                        <ShieldCheck size={27} />
                    </div>

                    <h1 className="mt-5 font-serif text-3xl font-medium text-white">
                        Admin <span className="text-[#C9A227]">Portal</span>
                    </h1>

                    <p className="mt-2 text-sm text-white/45">
                        Sign in to manage your store
                    </p>
                </div>

                {/* Login Card */}
                <div className="rounded-[1.5rem] border border-white/10 bg-[#F7F7F5] p-6 shadow-2xl sm:p-9">
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-[#111111]">
                            Welcome Back
                        </h2>
                        <p className="mt-1 text-xs text-gray-500">
                            Enter your credentials to continue.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-600"
                            >
                                Email Address
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 transition-all focus-within:border-[#C9A227]">
                                <Mail
                                    size={17}
                                    className="shrink-0 text-gray-400"
                                />

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoComplete="email"
                                    placeholder="admin@example.com"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full bg-transparent py-4 text-sm text-[#111111] outline-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-600"
                            >
                                Password
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 transition-all focus-within:border-[#C9A227]">
                                <Lock
                                    size={17}
                                    className="shrink-0 text-gray-400"
                                />

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            password: e.target.value,
                                        })
                                    }
                                    className="w-full bg-transparent py-4 text-sm text-[#111111] outline-none placeholder:text-gray-400"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    className="text-gray-400 transition-colors hover:text-[#A47D12]"
                                >
                                    {showPassword ? (
                                        <EyeOff size={17} />
                                    ) : (
                                        <Eye size={17} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#111111] py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#C9A227] hover:text-black"
                        >
                            Sign In
                            <ArrowRight
                                size={16}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </button>
                    </form>
                </div>

                <p className="mt-7 text-center text-[10px] tracking-wide text-white/30">
                    © {new Date().getFullYear()} Admin Panel. All rights reserved.
                </p>
            </div>
        </main>
    );
}