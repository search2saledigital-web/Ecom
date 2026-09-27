"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShoppingBag } from "lucide-react";

const hotspots = [
    {
        id: 1,
        x: "22%",
        y: "32%",
        name: "Signature Gold Watch",
        description:
            "A refined statement piece designed with timeless details and a premium finish.",
        price: "₹12,999",
        image: "/products/product-1.jpg",
        href: "/product/signature-gold-watch",
    },
    {
        id: 2,
        x: "48%",
        y: "22%",
        name: "Classic Leather Bag",
        description:
            "Elegant everyday design crafted for effortless style and modern sophistication.",
        price: "₹8,499",
        image: "/products/product-2.jpg",
        href: "/product/classic-leather-bag",
    },
    {
        id: 3,
        x: "68%",
        y: "47%",
        name: "Premium Sunglasses",
        description:
            "Minimal luxury with a bold silhouette made to complete your signature look.",
        price: "₹4,999",
        image: "/products/product-3.jpg",
        href: "/product/premium-sunglasses",
    },
    {
        id: 4,
        x: "82%",
        y: "72%",
        name: "Luxury Sneakers",
        description:
            "Contemporary comfort meets premium craftsmanship in an everyday essential.",
        price: "₹9,999",
        image: "/products/product-4.jpg",
        href: "/product/luxury-sneakers",
    },
];

export default function ProductDetailBanner() {
    const [activeHotspot, setActiveHotspot] = useState(null);

    return (
        <section className="relative w-full overflow-hidden bg-[#fafafa] border border-amber-200">
            {/* SECTION HEADER */}
            <div className="mx-auto max-w-[1400px] px-5 pb-8 pt-6 sm:px-8 lg:px-10 lg:pt-10">
                <div className="flex items-end justify-between gap-6">
                    <div>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                            Discover The Details
                        </span>

                        <h2 className="mt-3 font-serif text-4xl font-medium leading-none text-[#111111] sm:text-5xl lg:text-6xl">
                            Explore the
                            <span className="text-[#C9A227]"> Collection.</span>
                        </h2>
                    </div>

                    <p className="hidden max-w-sm text-right text-sm leading-6 text-gray-500 md:block">
                        Hover over the points to discover the products featured
                        in this collection.
                    </p>
                </div>
            </div>

            {/* FULL IMAGE BANNER */}
            <div className="relative w-full">
                <Image
                    src="/3.jpg"
                    alt="Featured product collection"
                    width={2400}
                    height={1100}
                    priority
                    className="block h-auto w-full object-cover"
                    sizes="100vw"
                />

                {/* DARK OVERLAY */}
                <div className="pointer-events-none absolute inset-0 bg-black/5" />

                {/* HOTSPOTS */}
                {hotspots.map((product) => (
                    <div
                        key={product.id}
                        className="absolute z-20"
                        style={{
                            left: product.x,
                            top: product.y,
                        }}
                        onMouseEnter={() =>
                            setActiveHotspot(product.id)
                        }
                        onMouseLeave={() => setActiveHotspot(null)}
                    >
                        {/* DOT */}
                        <motion.button
                            type="button"
                            onClick={() =>
                                setActiveHotspot(
                                    activeHotspot === product.id
                                        ? null
                                        : product.id
                                )
                            }
                            aria-label={`View ${product.name}`}
                            className="relative flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                            whileHover={{ scale: 1.15 }}
                            transition={{
                                duration: 0.2,
                            }}
                        >
                            {/* OUTER PULSE */}
                            <motion.span
                                className="absolute inset-0 rounded-full border border-white/80"
                                animate={{
                                    scale:
                                        activeHotspot === product.id
                                            ? 1.35
                                            : 1,
                                    opacity:
                                        activeHotspot === product.id
                                            ? 0
                                            : 0.8,
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat:
                                        activeHotspot === product.id
                                            ? 0
                                            : Infinity,
                                    ease: "easeOut",
                                }}
                            />

                            {/* DOT */}
                            <span className="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#C9A227] shadow-[0_0_20px_rgba(201,162,39,0.7)]">
                                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            </span>
                        </motion.button>

                        {/* PRODUCT CARD */}
                        <AnimatePresence>
                            {activeHotspot === product.id && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 12,
                                        scale: 0.96,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 8,
                                        scale: 0.96,
                                    }}
                                    transition={{
                                        duration: 0.25,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className={`absolute bottom-6 left-1/2 w-[280px] -translate-x-1/2 sm:w-[320px] ${product.id === 1
                                        ? "sm:left-0 sm:translate-x-0"
                                        : product.id === 4
                                            ? "sm:right-0 sm:left-auto sm:translate-x-0"
                                            : ""
                                        }`}
                                    onMouseEnter={() =>
                                        setActiveHotspot(product.id)
                                    }
                                    onMouseLeave={() =>
                                        setActiveHotspot(null)
                                    }
                                >
                                    <div className="overflow-hidden rounded-2xl border border-white/20 bg-[#111111]/95 p-3 shadow-2xl backdrop-blur-xl">
                                        {/* PRODUCT IMAGE */}
                                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-white/10">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                sizes="320px"
                                                className="object-cover transition-transform duration-500 hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                            {/* PRICE */}
                                            <div className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1.5">
                                                <span className="text-xs font-bold text-[#111111]">
                                                    {product.price}
                                                </span>
                                            </div>
                                        </div>

                                        {/* CONTENT */}
                                        <div className="px-1 pb-1 pt-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="font-serif text-xl font-medium text-white">
                                                        {product.name}
                                                    </h3>

                                                    <p className="mt-2 text-xs leading-5 text-white/55">
                                                        {product.description}
                                                    </p>
                                                </div>

                                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C9A227] text-black">
                                                    <ArrowUpRight size={16} />
                                                </span>
                                            </div>

                                            <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">
                                                <ShoppingBag
                                                    size={13}
                                                    className="text-[#C9A227]"
                                                />
                                                Discover Product
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}
