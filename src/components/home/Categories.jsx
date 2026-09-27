"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const categories = [
    {
        id: 1,
        name: "New Arrivals",
        image: "/categories/new-arrivals.jpg",
        href: "/category/new-arrivals",
    },
    {
        id: 2,
        name: "Men",
        image: "/categories/men.jpg",
        href: "/category/men",
    },
    {
        id: 3,
        name: "Women",
        image: "/categories/women.jpg",
        href: "/category/women",
    },
    {
        id: 4,
        name: "Accessories",
        image: "/categories/accessories.jpg",
        href: "/category/accessories",
    },
    {
        id: 5,
        name: "Collections",
        image: "/categories/collections.jpg",
        href: "/category/collections",
    },
];

export default function Categories() {
    const cardsRef = useRef([]);

    const handleMouseMove = (e, index) => {
        const card = cardsRef.current[index];

        if (!card) return;

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 10;
        const rotateX = ((y / rect.height) - 0.5) * -10;

        gsap.to(card, {
            rotateX,
            rotateY,
            y: -8,
            scale: 1.03,
            duration: 0.4,
            ease: "power3.out",
            transformPerspective: 1000,
            overwrite: "auto",
        });
    };

    const handleMouseLeave = (index) => {
        const card = cardsRef.current[index];

        if (!card) return;

        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto",
        });
    };

    return (
        <section className="relative overflow-hidden bg-white py-10 lg:py-15">
            {/* Decorative background */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A227]/5 blur-3xl" />

            <div className="relative mx-auto max-w-[1400px] px-5">
                {/* Heading */}
                <div className="mb-14 text-center">
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <span className="h-px w-10 bg-[#C9A227]" />

                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A227]">
                            Explore
                        </span>

                        <span className="h-px w-10 bg-[#C9A227]" />
                    </div>

                    <h2 className="font-serif text-4xl font-medium text-[#111111] sm:text-5xl lg:text-6xl">
                        Shop By{" "}
                        <span className="text-[#C9A227]">Category</span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500">
                        Explore our carefully curated categories and discover
                        something made for your style.
                    </p>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
                    {categories.map((category, index) => (
                        <Link
                            href={category.href}
                            key={category.id}
                            className="group flex flex-col items-center"
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                        >
                            <div
                                ref={(el) => {
                                    cardsRef.current[index] = el;
                                }}
                                className="relative aspect-square w-full max-w-[210px] will-change-transform"
                                style={{
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {/* Gold outer ring */}
                                <div className="absolute -inset-1 rounded-full border border-[#C9A227]/30 transition-all duration-500 group-hover:border-[#C9A227] group-hover:scale-105" />

                                {/* Image circle */}
                                <div className="relative h-full w-full overflow-hidden rounded-full bg-[#f4f4f4]">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 210px"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />

                                    {/* Dark hover overlay */}
                                    <div className="absolute inset-0 rounded-full bg-black/0 transition-all duration-500 group-hover:bg-black/20" />

                                    {/* Gold center dot */}
                                    <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A227] opacity-0 shadow-[0_0_25px_rgba(201,162,39,0.8)] transition-all duration-500 group-hover:opacity-100" />
                                </div>

                                {/* Floating number */}
                                <div className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A227]/40 bg-white text-[10px] font-semibold text-[#111111] shadow-md transition-all duration-500 group-hover:bg-[#C9A227]">
                                    0{index + 1}
                                </div>
                            </div>

                            {/* Category name */}
                            <div className="mt-6 text-center">
                                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#111111] transition-colors duration-300 group-hover:text-[#C9A227]">
                                    {category.name}
                                </h3>

                                <div className="mx-auto mt-2 h-px w-0 bg-[#C9A227] transition-all duration-500 group-hover:w-10" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}