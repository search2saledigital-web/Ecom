"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Heart,
    ShoppingBag,
    Star,
} from "lucide-react";

const products = [
    {
        id: 1,
        name: "Premium Signature Collection",
        category: "Best Seller",
        price: "₹4,999",
        oldPrice: "₹6,499",
        image: "/products/product-1.jpg",
        size: "large",
    },
    {
        id: 2,
        name: "Luxury Essential",
        category: "Premium Collection",
        price: "₹3,499",
        oldPrice: "₹4,299",
        image: "/products/product-2.jpg",
        size: "medium",
    },
    {
        id: 3,
        name: "Classic Edition",
        category: "Trending",
        price: "₹2,999",
        oldPrice: "₹3,799",
        image: "/products/product-3.jpg",
        size: "medium",
    },
    {
        id: 4,
        name: "Modern Essential",
        category: "Best Seller",
        price: "₹2,499",
        oldPrice: "₹3,199",
        image: "/products/product-4.jpg",
        size: "small",
    },
    {
        id: 5,
        name: "Exclusive Collection",
        category: "Limited",
        price: "₹3,999",
        oldPrice: "₹4,999",
        image: "/products/product-5.jpg",
        size: "small",
    },
];

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function BestSellers() {
    return (
        <section className="relative overflow-hidden bg-[#111111] py-10 lg:py-15">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#C9A227]/10 blur-[120px]" />

            <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#C9A227]/5 blur-[100px]" />

            <div className="relative mx-auto max-w-[1400px] px-5">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
                >
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-10 bg-[#C9A227]" />

                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A227]">
                                Most Loved
                            </span>
                        </div>

                        <h2 className="font-serif text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
                            Best{" "}
                            <span className="text-[#C9A227]">
                                Sellers
                            </span>
                        </h2>
                    </div>

                    <Link
                        href="/best-sellers"
                        className="group flex w-fit items-center gap-3 border-b border-white/30 pb-2 text-sm font-medium text-white transition-colors hover:border-[#C9A227] hover:text-[#C9A227]"
                    >
                        View All Products

                        <ArrowUpRight
                            size={17}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </Link>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
                    {/* Large Product */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        className="group relative min-h-[500px] overflow-hidden rounded-3xl md:col-span-2 lg:row-span-2"
                    >
                        <Link
                            href={`/product/${products[0].id}`}
                            className="absolute inset-0"
                        >
                            <Image
                                src={products[0].image}
                                alt={products[0].name}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/5" />

                            {/* Badge */}
                            <div className="absolute left-5 top-5">
                                <span className="rounded-full bg-[#C9A227] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-black">
                                    #1 Best Seller
                                </span>
                            </div>

                            {/* Wishlist */}
                            <button
                                onClick={(e) => e.preventDefault()}
                                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#111111] transition-all duration-300 hover:bg-[#C9A227]"
                                aria-label="Add to wishlist"
                            >
                                <Heart size={18} />
                            </button>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                <div className="mb-3 flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={13}
                                            fill="#C9A227"
                                            strokeWidth={0}
                                        />
                                    ))}

                                    <span className="ml-1 text-xs text-white/70">
                                        4.9
                                    </span>
                                </div>

                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A227]">
                                    {products[0].category}
                                </p>

                                <h3 className="mt-2 max-w-md font-serif text-3xl text-white sm:text-4xl">
                                    {products[0].name}
                                </h3>

                                <div className="mt-4 flex items-center gap-3">
                                    <span className="text-lg font-bold text-white">
                                        {products[0].price}
                                    </span>

                                    <span className="text-sm text-white/50 line-through">
                                        {products[0].oldPrice}
                                    </span>
                                </div>

                                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold text-[#111111] transition-all duration-300 group-hover:bg-[#C9A227]">
                                    Shop Now
                                    <ArrowUpRight size={15} />
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Medium Product 1 */}
                    <BentoProduct
                        product={products[1]}
                        className="min-h-[300px]"
                    />

                    {/* Medium Product 2 */}
                    <BentoProduct
                        product={products[2]}
                        className="min-h-[300px]"
                    />

                    {/* Small Product 1 */}
                    <BentoProduct
                        product={products[3]}
                        className="min-h-[260px]"
                    />

                    {/* Small Product 2 */}
                    <BentoProduct
                        product={products[4]}
                        className="min-h-[260px]"
                    />
                </div>
            </div>
        </section>
    );
}

function BentoProduct({ product, className = "" }) {
    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className={`group relative overflow-hidden rounded-3xl ${className}`}
        >
            <Link
                href={`/product/${product.id}`}
                className="absolute inset-0"
            >
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                {/* Wishlist */}
                <button
                    onClick={(e) => e.preventDefault()}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#111111] transition-all duration-300 hover:bg-[#C9A227]"
                    aria-label="Add to wishlist"
                >
                    <Heart size={15} />
                </button>

                {/* Product info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="mb-2 flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={10}
                                fill="#C9A227"
                                strokeWidth={0}
                            />
                        ))}
                    </div>

                    <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#C9A227]">
                        {product.category}
                    </p>

                    <h3 className="mt-1 text-base font-semibold text-white">
                        {product.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm font-bold text-white">
                            {product.price}
                        </span>

                        <span className="text-xs text-white/50 line-through">
                            {product.oldPrice}
                        </span>
                    </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute bottom-5 right-5 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-[#C9A227] text-black opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={17} />
                </div>
            </Link>
        </motion.div>
    );
}