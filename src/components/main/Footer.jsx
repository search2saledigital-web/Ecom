"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
   
    Phone,
    Mail,
    Clock3,
    MapPin,
    ArrowUpRight,
} from "lucide-react";
import {
    FaGooglePay,
    FaCcVisa,
    FaCcMastercard,
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
    const usefulLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "New Arrivals", href: "/new-arrivals" },
        { name: "Best Sellers", href: "/bestsellers" },
        { name: "Collections", href: "/collections" },
        { name: "Contact Us", href: "/contact" },
    ];

    const companyLinks = [
        { name: "About Us", href: "/about-us" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms & Conditions", href: "/terms-and-conditions" },
        { name: "Shipping Policy", href: "/shipping-policy" },
        { name: "Return & Refund Policy", href: "/return-policy" },
        { name: "Cancellation Policy", href: "/cancellation-policy" },
    ];

    const socialLinks = [
        {
            name: "Facebook",
            href: "#",
            icon: FaFacebook,
        },
        {
            name: "Instagram",
            href: "#",
            icon: FaInstagram,
        },
        {
            name: "Twitter",
            href: "#",
            icon: FaTwitter,
        },
        {
            name: "YouTube",
            href: "#",
            icon: FaYoutube,
        },
        {
            name: "LinkedIn",
            href: "#",
            icon: FaLinkedin,
        },
    ];

    return (
        <footer className="relative overflow-hidden bg-[#111111] text-white">
            {/* GOLD GLOW */}
            <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-[#C9A227]/5 blur-[120px]" />

            <div className="pointer-events-none absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-[#C9A227]/5 blur-[120px]" />

            {/* MAIN FOOTER */}
            <div className="relative mx-auto max-w-[1450px] px-5 pb-12 pt-16 sm:px-8 lg:px-10 lg:pt-20">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.2fr] lg:gap-10">
                    {/* ========================= */}
                    {/* GRID 1 - LOGO + ABOUT */}
                    {/* ========================= */}
                    <div>
                        {/* LOGO */}
                        <Link
                            href="/"
                            className="inline-flex items-center"
                        >
                            <Image
                                src="/logo.jpeg"
                                alt="Logo"
                                width={180}
                                height={60}
                                className="h-auto w-[150px] object-contain"
                            />
                        </Link>

                        <p className="mt-6 max-w-sm text-sm leading-7 text-white/45">
                            Discover thoughtfully selected products crafted
                            for modern lifestyles. Premium quality, timeless
                            design and an experience made around you.
                        </p>

                        {/* SOCIAL */}
                        <div className="mt-7">
                            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#C9A227]">
                                Follow Us
                            </p>

                            <div className="flex items-center gap-2">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;

                                    return (
                                        <Link
                                            key={social.name}
                                            href={social.href}
                                            aria-label={social.name}
                                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition-all duration-300 hover:border-[#C9A227]/50 hover:bg-[#C9A227] hover:text-black"
                                        >
                                            <Icon size={15} />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* ========================= */}
                    {/* GRID 2 - USEFUL LINKS */}
                    {/* ========================= */}
                    <div>
                        <h3 className="font-serif text-xl text-white">
                            Useful Links
                        </h3>

                        <div className="mt-6 space-y-3">
                            {usefulLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="group flex w-fit items-center gap-2 text-sm text-white/45 transition-colors duration-300 hover:text-[#C9A227]"
                                >
                                    <span>{link.name}</span>

                                    <ArrowUpRight
                                        size={12}
                                        className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0 group-hover:opacity-100"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ========================= */}
                    {/* GRID 3 - COMPANY */}
                    {/* ========================= */}
                    <div>
                        <h3 className="font-serif text-xl text-white">
                            Company
                        </h3>

                        <div className="mt-6 space-y-3">
                            {companyLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="group flex w-fit items-center gap-2 text-sm text-white/45 transition-colors duration-300 hover:text-[#C9A227]"
                                >
                                    <span>{link.name}</span>

                                    <ArrowUpRight
                                        size={12}
                                        className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0 group-hover:opacity-100"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ========================= */}
                    {/* GRID 4 - SUPPORT */}
                    {/* ========================= */}
                    <div>
                        <h3 className="font-serif text-xl text-white">
                            Support
                        </h3>

                        {/* PHONE */}
                        <div className="mt-6 space-y-4">
                            <a
                                href="tel:+919999999999"
                                className="group flex items-start gap-3"
                            >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C9A227]/10 text-[#C9A227] transition-colors group-hover:bg-[#C9A227] group-hover:text-black">
                                    <Phone size={15} />
                                </span>

                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                                        Call Us
                                    </p>

                                    <p className="mt-1 text-sm text-white/70 transition-colors group-hover:text-[#C9A227]">
                                        +91 99999 99999
                                    </p>
                                </div>
                            </a>

                            {/* EMAIL */}
                            <a
                                href="mailto:support@example.com"
                                className="group flex items-start gap-3"
                            >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C9A227]/10 text-[#C9A227] transition-colors group-hover:bg-[#C9A227] group-hover:text-black">
                                    <Mail size={15} />
                                </span>

                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                                        Email Us
                                    </p>

                                    <p className="mt-1 text-sm text-white/70 transition-colors group-hover:text-[#C9A227]">
                                        support@example.com
                                    </p>
                                </div>
                            </a>

                            {/* TIMING */}
                            <div className="flex items-start gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C9A227]/10 text-[#C9A227]">
                                    <Clock3 size={15} />
                                </span>

                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                                        Working Hours
                                    </p>

                                    <p className="mt-1 text-sm text-white/70">
                                        Mon – Sat · 10:00 AM – 7:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* PAYMENT METHODS */}
                        <div className="mt-7 border-t border-white/10 pt-6">
                            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                                Secure Payments
                            </p>

                            <div className="flex flex-wrap items-center gap-2">
                                {/* VISA */}
                                <div className="flex h-8 min-w-[48px] items-center justify-center rounded-md bg-white px-2 text-[#1434CB]">
                                    <FaCcVisa size={28} />
                                </div>

                                {/* MASTERCARD */}
                                <div className="flex h-8 min-w-[48px] items-center justify-center rounded-md bg-white px-2 text-[#111111]">
                                    <FaCcMastercard size={28} />
                                </div>

                                {/* GOOGLE PAY */}
                                <div className="flex h-8 min-w-[48px] items-center justify-center rounded-md bg-white px-2 text-[#111111]">
                                    <FaGooglePay size={35} />
                                </div>

                                {/* UPI */}
                                <div className="flex h-8 items-center justify-center rounded-md bg-white px-3 text-[11px] font-bold tracking-tight text-[#111111]">
                                    UPI
                                </div>

                                {/* PAYTM */}
                                <div className="flex h-8 items-center justify-center rounded-md bg-white px-2 text-[10px] font-bold italic text-[#00BAF2]">
                                    Paytm
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="mt-14 h-px bg-white/10" />
            </div>

            {/* ========================= */}
            {/* BOTTOM FOOTER BAR */}
            {/* ========================= */}
            <div className="relative border-t border-white/5 bg-black/20">
                <div className="mx-auto flex max-w-[1450px] flex-col items-center justify-between gap-3 px-5 py-5 sm:px-8 md:flex-row lg:px-10">
                    <p className="text-center text-[10px] uppercase tracking-[0.15em] text-white/30 md:text-left">
                        © {new Date().getFullYear()} All Rights Reserved.
                    </p>

                    <p className="text-center text-[10px] uppercase tracking-[0.15em] text-white/30">
                        Managed by{" "}
                        <a
                            href="https://search2saledigital.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-[#C9A227] transition-colors hover:text-white"
                        >
                            Search2SaleDigital.com
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
