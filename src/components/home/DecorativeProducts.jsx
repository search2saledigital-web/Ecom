"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
    ArrowRight,
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    Sparkles,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const decorativeProducts = [
    {
        id: 1,
        name: "Elegant Table Vase",
        category: "Home Decor",
        price: "₹1,499",
        image: "/products/decor-1.jpg",
        href: "/product/table-vase",
        tag: "Bestseller",
    },
    {
        id: 2,
        name: "Modern Decorative Showpiece",
        category: "Statement Pieces",
        price: "₹2,299",
        image: "/products/decor-2.jpg",
        href: "/product/decorative-showpiece",
        tag: "Popular",
    },
    {
        id: 3,
        name: "Luxury Decorative Tray",
        category: "Table Accessories",
        price: "₹1,899",
        image: "/products/decor-3.jpg",
        href: "/product/decorative-tray",
        tag: "New Arrival",
    },
    {
        id: 4,
        name: "Artistic Table Sculpture",
        category: "Art & Sculptures",
        price: "₹2,799",
        image: "/products/decor-4.jpg",
        href: "/product/table-sculpture",
        tag: "Exclusive",
    },
    {
        id: 5,
        name: "Premium Candle Holder",
        category: "Decor Accessories",
        price: "₹999",
        image: "/products/decor-5.jpg",
        href: "/product/candle-holder",
        tag: "Trending",
    },
    {
        id: 6,
        name: "Contemporary Centerpiece",
        category: "Luxury Decor",
        price: "₹3,499",
        image: "/products/decor-6.jpg",
        href: "/product/centerpiece",
        tag: "Premium",
    },
];

export default function DecorativeProducts() {
    return (
        <section className="relative overflow-hidden bg-[#F7F7F5] py-10 sm:py-12 lg:py-16">
            <div className="pointer-events-none absolute -left-32 top-10 h-[400px] w-[400px] rounded-full bg-[#C9A227]/[0.06] blur-[120px]" />

            <div className="relative mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-10">
                {/* Heading */}
                <div className="mb-10 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-9 bg-[#C9A227]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A47D12]">
                                Artful Living
                            </span>
                        </div>

                        <h2 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
                            Decorative
                            <br />
                            <span className="text-[#C9A227]">
                                Products
                            </span>
                        </h2>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-[#777777]">
                            Discover beautifully crafted decorative pieces
                            that bring character, elegance, and a timeless
                            touch to every space.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            aria-label="Previous decorative products"
                            className="decor-prev flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#111111] transition-all duration-300 hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-black"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <button
                            type="button"
                            aria-label="Next decorative products"
                            className="decor-next flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#111111] transition-all duration-300 hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-black"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Product Slider */}
                <Swiper
                    modules={[Autoplay, Navigation]}
                    navigation={{
                        prevEl: ".decor-prev",
                        nextEl: ".decor-next",
                    }}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    loop
                    speed={800}
                    spaceBetween={18}
                    slidesPerView={1.15}
                    breakpoints={{
                        480: {
                            slidesPerView: 1.5,
                            spaceBetween: 18,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2.5,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 22,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    }}
                    className="!overflow-visible"
                >
                    {decorativeProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="group overflow-hidden rounded-[1.2rem] border border-black/[0.04] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                                <div className="relative aspect-[4/4.6] overflow-hidden bg-[#EEEEEC]">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 25vw"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-70" />

                                    <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/85 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#111111] backdrop-blur-md">
                                        {product.tag}
                                    </span>

                                    <Link
                                        href={product.href}
                                        aria-label={`View ${product.name}`}
                                        className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-[#C9A227] text-black opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                                    >
                                        <ArrowUpRight size={17} />
                                    </Link>
                                </div>

                                <div className="p-4 sm:p-5">
                                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#A47D12]">
                                        {product.category}
                                    </p>

                                    <div className="mt-2 flex items-start justify-between gap-3">
                                        <h3 className="font-serif text-lg font-medium leading-snug text-[#111111] sm:text-xl">
                                            {product.name}
                                        </h3>

                                        <span className="shrink-0 pt-1 text-xs font-bold text-[#A47D12]">
                                            {product.price}
                                        </span>
                                    </div>

                                    <Link
                                        href={product.href}
                                        className="mt-5 flex items-center gap-2 border-t border-black/10 pt-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#111111] transition-colors hover:text-[#A47D12]"
                                    >
                                        Explore Product
                                        <ArrowRight
                                            size={13}
                                            className="ml-auto transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Bottom CTA */}
                <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-black/10 pt-7 sm:flex-row">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A227]/10 text-[#A47D12]">
                            <Sparkles size={18} />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-[#111111]">
                                Add a touch of elegance to your space
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Explore our complete decorative collection.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/decorative-products"
                        className="group inline-flex items-center gap-3 rounded-full bg-[#111111] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#C9A227] hover:text-black"
                    >
                        Explore All Products
                        <ArrowUpRight
                            size={15}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}