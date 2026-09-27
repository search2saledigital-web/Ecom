"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
    Heart,
    Eye,
    ShoppingBag,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Star,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const products = [
    {
        id: 1,
        image: "/products/product-1.jpg",
        category: "New Collection",
        name: "Premium Classic Product",
        price: "₹2,499",
        oldPrice: "₹3,299",
        rating: 4.8,
    },
    {
        id: 2,
        image: "/products/product-2.jpg",
        category: "New Collection",
        name: "Luxury Essential Product",
        price: "₹1,999",
        oldPrice: "₹2,699",
        rating: 4.7,
    },
    {
        id: 3,
        image: "/products/product-3.jpg",
        category: "New Collection",
        name: "Premium Everyday Product",
        price: "₹2,799",
        oldPrice: "₹3,499",
        rating: 4.9,
    },
    {
        id: 4,
        image: "/products/product-4.jpg",
        category: "New Collection",
        name: "Signature Collection",
        price: "₹3,199",
        oldPrice: "₹3,999",
        rating: 4.8,
    },
    {
        id: 5,
        image: "/products/product-5.jpg",
        category: "New Collection",
        name: "Modern Premium Product",
        price: "₹2,299",
        oldPrice: "₹2,999",
        rating: 4.6,
    },
    {
        id: 6,
        image: "/products/product-6.jpg",
        category: "New Collection",
        name: "Exclusive Edition",
        price: "₹3,499",
        oldPrice: "₹4,299",
        rating: 4.9,
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function NewArrivals() {
    return (
        <section className="relative overflow-hidden bg-[#fafafa] py-10 lg:py-15">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-[#C9A227]/5 blur-3xl" />

            <div className="mx-auto max-w-[1400px] px-5">

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr] lg:gap-14">

                    {/* =================================================
                        LEFT STICKY CONTENT
                    ================================================= */}

                    <div className="relative z-20 bg-[#fafafa] lg:sticky lg:top-32 lg:h-fit">

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: -40,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.3,
                            }}
                            transition={{
                                duration: 0.7,
                            }}
                        >

                            {/* Small Label */}
                            <div className="mb-5 flex items-center gap-3">
                                <span className="h-px w-10 bg-[#C9A227]" />

                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227]">
                                    Shop Latest
                                </span>
                            </div>


                            {/* Heading */}
                            <h2 className="font-serif text-4xl font-medium leading-tight text-[#111111] sm:text-5xl">
                                New
                                <br />
                                <span className="text-[#C9A227]">
                                    Arrivals
                                </span>
                            </h2>


                            {/* Description */}
                            <p className="mt-6 max-w-[260px] text-sm leading-7 text-gray-500">
                                Discover our latest collection, carefully
                                selected to bring premium style and quality
                                to your everyday life.
                            </p>


                            {/* View All */}
                            <Link
                                href="/new-arrivals"
                                className="group mt-8 inline-flex items-center gap-3 border-b border-[#111111] pb-2 text-sm font-semibold text-[#111111] transition-colors hover:border-[#C9A227] hover:text-[#C9A227]"
                            >
                                View All Products

                                <ArrowRight
                                    size={17}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>


                            {/* Slider Controls */}
                            <div className="mt-12 hidden items-center gap-3 lg:flex">

                                <button
                                    className="new-arrivals-prev flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white transition-all duration-300 hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-black"
                                    aria-label="Previous products"
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                <button
                                    className="new-arrivals-next flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white transition-all duration-300 hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-black"
                                    aria-label="Next products"
                                >
                                    <ChevronRight size={18} />
                                </button>

                            </div>

                        </motion.div>

                    </div>


                    {/* =================================================
                        RIGHT PRODUCTS
                    ================================================= */}

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.15,
                        }}
                        className="relative z-10 min-w-0 overflow-hidden"
                    >

                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                prevEl: ".new-arrivals-prev",
                                nextEl: ".new-arrivals-next",
                            }}
                            spaceBetween={18}
                            slidesPerView={1}
                            speed={700}
                            grabCursor={true}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 18,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                                1280: {
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                },
                            }}
                            className="!overflow-visible"
                        >

                            {products.map((product) => (
                                <SwiperSlide key={product.id}>

                                    <motion.div
                                        variants={itemVariants}
                                        className="group"
                                    >

                                        {/* Product Image */}
                                        <div className="relative overflow-hidden rounded-2xl bg-[#f1f1f1]">

                                            <Link
                                                href={`/product/${product.id}`}
                                            >
                                                <motion.div
                                                    whileHover={{
                                                        scale: 1.04,
                                                    }}
                                                    transition={{
                                                        duration: 0.6,
                                                        ease: "easeOut",
                                                    }}
                                                    className="relative aspect-[4/5] w-full"
                                                >
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                        className="object-cover"
                                                    />
                                                </motion.div>
                                            </Link>


                                            {/* New Badge */}
                                            <div className="absolute left-3 top-3">
                                                <span className="rounded-full bg-[#111111] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                                                    New
                                                </span>
                                            </div>


                                            {/* Wishlist */}
                                            <motion.button
                                                whileHover={{
                                                    scale: 1.1,
                                                }}
                                                whileTap={{
                                                    scale: 0.9,
                                                }}
                                                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#111111] shadow-sm transition-colors hover:bg-[#C9A227]"
                                                aria-label="Add to wishlist"
                                            >
                                                <Heart
                                                    size={17}
                                                    strokeWidth={1.7}
                                                />
                                            </motion.button>


                                            {/* Bottom Actions */}
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    y: 20,
                                                }}
                                                whileHover={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                className="absolute bottom-3 left-3 right-3 hidden sm:block"
                                            >
                                                <div className="flex gap-2">

                                                    <Link
                                                        href={`/product/${product.id}`}
                                                        className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-white text-xs font-semibold text-[#111111] shadow-lg transition-colors hover:bg-[#C9A227]"
                                                    >
                                                        <Eye size={15} />
                                                        Quick View
                                                    </Link>

                                                    <button
                                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-white shadow-lg transition-colors hover:bg-[#C9A227] hover:text-black"
                                                        aria-label="Add to cart"
                                                    >
                                                        <ShoppingBag
                                                            size={16}
                                                        />
                                                    </button>

                                                </div>
                                            </motion.div>

                                        </div>


                                        {/* Product Details */}
                                        <div className="pt-4">

                                            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9A227]">
                                                {product.category}
                                            </p>

                                            <Link
                                                href={`/product/${product.id}`}
                                            >
                                                <h3 className="mt-1 line-clamp-1 text-sm font-medium text-[#111111] transition-colors hover:text-[#C9A227]">
                                                    {product.name}
                                                </h3>
                                            </Link>


                                            {/* Rating */}
                                            <div className="mt-2 flex items-center gap-1.5">

                                                <div className="flex items-center gap-0.5">
                                                    {[1, 2, 3, 4, 5].map(
                                                        (star) => (
                                                            <Star
                                                                key={star}
                                                                size={11}
                                                                fill="#C9A227"
                                                                strokeWidth={0}
                                                                className="text-[#C9A227]"
                                                            />
                                                        )
                                                    )}
                                                </div>

                                                <span className="text-[11px] text-gray-400">
                                                    {product.rating}
                                                </span>

                                            </div>


                                            {/* Price */}
                                            <div className="mt-2 flex items-center gap-2">

                                                <span className="text-sm font-bold text-[#111111]">
                                                    {product.price}
                                                </span>

                                                <span className="text-xs text-gray-400 line-through">
                                                    {product.oldPrice}
                                                </span>

                                            </div>

                                        </div>

                                    </motion.div>

                                </SwiperSlide>
                            ))}

                        </Swiper>


                        {/* Mobile Slider Controls */}
                        <div className="mt-8 flex justify-center gap-3 lg:hidden">

                            <button
                                className="new-arrivals-prev flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition-all hover:border-[#C9A227] hover:bg-[#C9A227]"
                                aria-label="Previous products"
                            >
                                <ChevronLeft size={17} />
                            </button>

                            <button
                                className="new-arrivals-next flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition-all hover:border-[#C9A227] hover:bg-[#C9A227]"
                                aria-label="Next products"
                            >
                                <ChevronRight size={17} />
                            </button>

                        </div>

                    </motion.div>

                </div>

            </div>
        </section>
    );
}
