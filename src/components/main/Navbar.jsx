"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import {
    Search,
    Heart,
    ShoppingBag,
    User,
    Menu,
    X,
    ChevronDown,
    Phone,
    MapPin,
} from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaWhatsapp,
} from "react-icons/fa";

const menuItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Best Sellers", href: "/bestsellers" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
];

const socialItems = [
    { icon: FaFacebookF, label: "Facebook" },
    { icon: FaInstagram, label: "Instagram" },
    { icon: FaTwitter, label: "Twitter" },
    { icon: FaYoutube, label: "YouTube" },
    { icon: FaWhatsapp, label: "WhatsApp" },
];

export default function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showTopBar, setShowTopBar] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show only when we're at the very top
            if (currentScrollY <= 10) {
                setShowTopBar(true);
            } else {
                setShowTopBar(false);
            }

            lastScrollY.current = currentScrollY;
        };

        // Check initial position
        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])

    return (
        <header className="sticky top-0 z-[100] w-full bg-white text-black shadow-sm">

            {/* =====================================================
                TOP BLACK BAR
            ====================================================== */}

            <AnimatePresence initial={false}>
                {showTopBar && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{
                            height: 0,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                        className="overflow-hidden bg-[#111111] text-white"
                    >
                        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-2 text-sm">

                            {/* Contact */}
                            <motion.div
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4 }}
                                className="flex items-center gap-5"
                            >
                                <a
                                    href="tel:+919999999999"
                                    className="flex items-center gap-2 transition hover:text-[#C9A227]"
                                >
                                    <Phone size={14} />

                                    <span>
                                        +91 99999 99999
                                    </span>
                                </a>

                                <span className="hidden h-4 w-px bg-white/20 sm:block" />

                                <span className="hidden items-center gap-2 sm:flex">
                                    <MapPin size={14} />
                                    India
                                </span>
                            </motion.div>


                            {/* Social Icons */}
                            <motion.div
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.1,
                                }}
                                className="flex items-center gap-4"
                            >
                                {socialItems.map((item, index) => {
                                    const Icon = item.icon;

                                    return (
                                        <motion.a
                                            key={item.label}
                                            href="#"
                                            aria-label={item.label}
                                            initial={{
                                                opacity: 0,
                                                scale: 0.7,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            transition={{
                                                delay: 0.15 + index * 0.05,
                                            }}
                                            whileHover={{
                                                scale: 1.2,
                                                y: -2,
                                            }}
                                            className="transition-colors hover:text-[#C9A227]"
                                        >
                                            <Icon size={14} />
                                        </motion.a>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* =====================================================
                MAIN NAVBAR
            ====================================================== */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: -20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                }}
                className="border-b border-gray-200 bg-white"
            >
                <div className="mx-auto flex h-[82px] max-w-[1400px] items-center gap-8 px-5">

                    {/* =================================================
                        LOGO
                    ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -25,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.15,
                        }}
                    >
                        <Link
                            href="/"
                            className="relative flex shrink-0 items-center"
                        >
                            <Image
                                src="/logo.jpeg"
                                alt="Company Logo"
                                width={100}
                                height={100}
                                className="h-18 w-auto"
                                priority
                            />
                        </Link>
                    </motion.div>


                    {/* =================================================
                        SEARCH
                    ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            scaleX: 0.8,
                        }}
                        animate={{
                            opacity: 1,
                            scaleX: 1,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.25,
                        }}
                        className="hidden flex-1 md:block"
                    >
                        <div className="mx-auto flex h-12 max-w-[600px] items-center overflow-hidden rounded-full border border-gray-300 bg-[#fafafa] transition focus-within:border-[#C9A227] focus-within:shadow-[0_0_0_3px_rgba(201,162,39,0.08)]">

                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="h-full flex-1 bg-transparent px-5 text-sm outline-none placeholder:text-gray-400"
                            />

                            <motion.button
                                type="button"
                                whileHover={{
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.92,
                                }}
                                className="mr-1 flex h-10 w-12 items-center justify-center rounded-full bg-[#111111] text-white transition-colors hover:bg-[#C9A227] hover:text-black"
                            >
                                <Search size={19} />
                            </motion.button>

                        </div>
                    </motion.div>


                    {/* =================================================
                        RIGHT ACTIONS
                    ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 25,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.25,
                        }}
                        className="ml-auto flex items-center gap-4 sm:gap-6"
                    >

                        {/* Account */}
                        <motion.div
                            whileHover={{ y: -2 }}
                            className="hidden sm:block"
                        >
                            <Link
                                href="/account"
                                className="group flex items-center gap-2"
                            >
                                <User
                                    size={23}
                                    strokeWidth={1.6}
                                    className="transition-colors group-hover:text-[#C9A227]"
                                />

                                <div className="hidden lg:block">
                                    <p className="text-[11px] text-gray-500">
                                        Welcome
                                    </p>

                                    <p className="text-sm font-medium">
                                        Account
                                    </p>
                                </div>
                            </Link>
                        </motion.div>


                        {/* Wishlist */}
                        <motion.div
                            whileHover={{
                                y: -3,
                                scale: 1.05,
                            }}
                            whileTap={{
                                scale: 0.9,
                            }}
                        >
                            <Link
                                href="/wishlist"
                                className="group relative block"
                                aria-label="Wishlist"
                            >
                                <Heart
                                    size={24}
                                    strokeWidth={1.6}
                                    className="transition-colors group-hover:text-[#C9A227]"
                                />

                                <motion.span
                                    initial={{
                                        scale: 0,
                                    }}
                                    animate={{
                                        scale: 1,
                                    }}
                                    transition={{
                                        delay: 0.7,
                                        type: "spring",
                                        stiffness: 500,
                                    }}
                                    className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#C9A227] px-1 text-[10px] font-semibold text-black"
                                >
                                    0
                                </motion.span>
                            </Link>
                        </motion.div>


                        {/* Cart */}
                        <motion.div
                            whileHover={{
                                y: -3,
                                scale: 1.05,
                            }}
                            whileTap={{
                                scale: 0.9,
                            }}
                        >
                            <Link
                                href="/cart"
                                className="group relative block"
                                aria-label="Shopping Cart"
                            >
                                <ShoppingBag
                                    size={25}
                                    strokeWidth={1.6}
                                    className="transition-colors group-hover:text-[#C9A227]"
                                />

                                <motion.span
                                    initial={{
                                        scale: 0,
                                    }}
                                    animate={{
                                        scale: 1,
                                    }}
                                    transition={{
                                        delay: 0.8,
                                        type: "spring",
                                        stiffness: 500,
                                    }}
                                    className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#C9A227] px-1 text-[10px] font-semibold text-black"
                                >
                                    0
                                </motion.span>
                            </Link>
                        </motion.div>


                        {/* Mobile Menu */}
                        <motion.button
                            type="button"
                            onClick={() => setMobileMenu(!mobileMenu)}
                            whileTap={{
                                scale: 0.85,
                            }}
                            className="ml-1 md:hidden"
                            aria-label="Toggle Menu"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {mobileMenu ? (
                                    <motion.div
                                        key="close"
                                        initial={{
                                            opacity: 0,
                                            rotate: -90,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            rotate: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            rotate: 90,
                                        }}
                                    >
                                        <X size={27} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{
                                            opacity: 0,
                                            rotate: 90,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            rotate: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            rotate: -90,
                                        }}
                                    >
                                        <Menu size={27} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                    </motion.div>
                </div>
            </motion.div>


            {/* =====================================================
                DESKTOP CATEGORY NAVIGATION
            ====================================================== */}

            <nav className="hidden border-b border-gray-200 bg-[#111111] md:block">

                <div className="mx-auto flex h-[54px] max-w-[1400px] items-center px-5">

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.07,
                                    delayChildren: 0.2,
                                },
                            },
                        }}
                        className="flex h-full items-center gap-8"
                    >

                        {/* Home */}
                        <motion.div
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 10,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                },
                            }}
                            className="h-full"
                        >
                            <Link
                                href="/"
                                className="flex h-full items-center border-b-2 border-[#C9A227] px-1 text-sm font-medium text-[#C9A227]"
                            >
                                Home
                            </Link>
                        </motion.div>


                        {/* Shop */}
                        <motion.div
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 10,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                },
                            }}
                        >
                            <Link
                                href="/shop"
                                className="text-sm font-medium text-white transition-colors hover:text-[#C9A227]"
                            >
                                Shop
                            </Link>
                        </motion.div>


                        {/* Categories */}
                        <motion.div
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 10,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                },
                            }}
                            className="group relative flex h-full items-center"
                        >

                            <button
                                type="button"
                                className="flex items-center gap-1.5 text-sm font-medium text-white transition-colors group-hover:text-[#C9A227]"
                            >
                                Categories

                                <ChevronDown
                                    size={15}
                                    className="transition-transform duration-300 group-hover:rotate-180"
                                />
                            </button>


                            {/* Dropdown */}
                            <div className="invisible absolute left-0 top-full z-50 w-56 translate-y-2 border border-gray-200 bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

                                {[
                                    "Men",
                                    "Women",
                                    "New Arrivals",
                                    "Best Sellers",
                                ].map((category) => (
                                    <Link
                                        key={category}
                                        href={`/ category / ${category
                                            .toLowerCase()
                                            .replaceAll(" ", "-")
                                            } `}
                                        className="block px-5 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#C9A227]"
                                    >
                                        {category}
                                    </Link>
                                ))}

                            </div>

                        </motion.div>


                        {/* Remaining Menu */}
                        {menuItems.slice(2).map((item) => (
                            <motion.div
                                key={item.name}
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 10,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                    },
                                }}
                            >
                                <Link
                                    href={item.href}
                                    className="text-sm font-medium text-white transition-colors hover:text-[#C9A227]"
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}

                    </motion.div>


                    {/* Special Offer */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: 0.7,
                        }}
                        className="ml-auto flex items-center gap-2 text-sm font-medium text-[#C9A227]"
                    >
                        <motion.span
                            animate={{
                                scale: [1, 1.4, 1],
                                opacity: [1, 0.6, 1],
                            }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="h-1.5 w-1.5 rounded-full bg-[#C9A227]"
                        />

                        Special Offers
                    </motion.div>

                </div>
            </nav>


            {/* =====================================================
                MOBILE MENU
            ====================================================== */}

            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        initial={{
                            height: 0,
                            opacity: 0,
                        }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.35,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                        className="overflow-hidden border-b border-gray-200 bg-white md:hidden"
                    >

                        {/* Mobile Search */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.1,
                            }}
                            className="border-b border-gray-100 p-4"
                        >
                            <div className="flex h-11 items-center overflow-hidden rounded-full border border-gray-300 bg-gray-50">

                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="h-full flex-1 bg-transparent px-4 text-sm outline-none"
                                />

                                <motion.button
                                    whileTap={{
                                        scale: 0.9,
                                    }}
                                    className="mr-1 flex h-9 w-10 items-center justify-center rounded-full bg-[#111111] text-white"
                                >
                                    <Search size={17} />
                                </motion.button>

                            </div>
                        </motion.div>


                        {/* Mobile Links */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.06,
                                        delayChildren: 0.12,
                                    },
                                },
                            }}
                            className="flex flex-col px-5 py-3"
                        >

                            {[
                                ...menuItems.slice(0, 2),
                                {
                                    name: "Categories",
                                    href: "/categories",
                                },
                                ...menuItems.slice(2),
                            ].map((item) => (
                                <motion.div
                                    key={item.name}
                                    variants={{
                                        hidden: {
                                            opacity: 0,
                                            x: -15,
                                        },
                                        visible: {
                                            opacity: 1,
                                            x: 0,
                                        },
                                    }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() =>
                                            setMobileMenu(false)
                                        }
                                        className="block border-b border-gray-100 py-4 text-sm font-medium transition-colors hover:text-[#C9A227]"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}

                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>

        </header>
    );
}