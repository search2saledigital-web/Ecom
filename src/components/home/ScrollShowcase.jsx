"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const slides = [
    {
        id: 1,
        number: "01",
        eyebrow: "New Collection",
        title: "Designed to",
        highlight: "Stand Out.",
        description:
            "Discover carefully selected pieces created for timeless style and effortless everyday elegance.",
        image: "/products/product-1.jpg",
        button: "Explore Collection",
        href: "/new-arrivals",
    },
    {
        id: 2,
        number: "02",
        eyebrow: "Best Sellers",
        title: "Loved by",
        highlight: "Everyone.",
        description:
            "Discover the pieces our customers keep coming back for, made to elevate every moment.",
        image: "/products/product-2.jpg",
        button: "Shop Best Sellers",
        href: "/bestsellers",
    },
    {
        id: 3,
        number: "03",
        eyebrow: "Signature Edit",
        title: "Made for",
        highlight: "Every Moment.",
        description:
            "From everyday essentials to statement pieces, discover something uniquely yours.",
        image: "/products/product-3.jpg",
        button: "Discover More",
        href: "/shop",
    },
];

export default function ScrollShowcase() {
    const sectionRef = useRef(null);
    const slidesRef = useRef([]);

    useEffect(() => {
        const section = sectionRef.current;
        const slides = slidesRef.current;

        if (!section || !slides.length) return;

        const ctx = gsap.context(() => {
            gsap.set(slides, {
                opacity: 0,
                visibility: "hidden",
            });

            gsap.set(slides[0], {
                opacity: 1,
                visibility: "visible",
            });

            slides.forEach((slide, index) => {
                if (index === 0) return;

                const previousSlide = slides[index - 1];

                gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: `${(index - 1) * 50}% top`,
                        end: `${index * 50}% top`,
                        scrub: 1,
                    },
                })
                    .set(slide, {
                        visibility: "visible",
                    })
                    .to(
                        previousSlide,
                        {
                            opacity: 0,
                            y: -25,
                            scale: 0.97,
                            duration: 1,
                            ease: "power2.inOut",
                        },
                        0
                    )
                    .to(
                        slide,
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 1,
                            ease: "power2.out",
                        },
                        0
                    );
            });

            // Subtle image movement
            slides.forEach((slide) => {
                const image = slide.querySelector(".showcase-image");

                if (!image) return;

                gsap.fromTo(
                    image,
                    {
                        scale: 1.08,
                    },
                    {
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 1.5,
                        },
                    }
                );
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-[420vh] bg-[#fafafa]"
        >
            {/* Sticky area */}
            <div className="sticky top-15 flex h-screen items-center overflow-hidden">
                {/* Soft gold glow */}
                <div className="pointer-events-none absolute right-[10%] top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-[#C9A227]/5 blur-[100px]" />

                <div className="relative mx-auto w-full max-w-[1350px] px-5 lg:px-10">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            ref={(el) => {
                                slidesRef.current[index] = el;
                            }}
                            className="absolute inset-0 flex items-center"
                        >
                            <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[0.9fr_1fr] lg:gap-14">

                                {/* Content */}
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: -30,
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
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="relative z-10"
                                >
                                    <div className="mb-4 flex items-center gap-3">
                                        <span className="text-[11px] font-semibold tracking-[0.25em] text-[#C9A227]">
                                            {slide.number}
                                        </span>

                                        <span className="h-px w-8 bg-[#C9A227]" />

                                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                            {slide.eyebrow}
                                        </span>
                                    </div>

                                    <h2 className="font-serif text-4xl font-medium leading-[0.98] text-[#111111] sm:text-5xl lg:text-6xl xl:text-7xl">
                                        {slide.title}
                                        <br />
                                        <span className="text-[#C9A227]">
                                            {slide.highlight}
                                        </span>
                                    </h2>

                                    <p className="mt-5 max-w-md text-sm leading-6 text-gray-500">
                                        {slide.description}
                                    </p>

                                    <Link
                                        href={slide.href}
                                        className="group mt-6 inline-flex items-center gap-3 rounded-full bg-[#111111] px-5 py-3 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#C9A227] hover:text-black"
                                    >
                                        {slide.button}

                                        <ArrowUpRight
                                            size={15}
                                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                        />
                                    </Link>

                                    <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-gray-400">
                                        <Sparkles
                                            size={13}
                                            className="text-[#C9A227]"
                                        />
                                        Scroll to explore
                                    </div>
                                </motion.div>

                                {/* Product Image */}
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: 30,
                                        scale: 0.97,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        x: 0,
                                        scale: 1,
                                    }}
                                    viewport={{
                                        once: true,
                                        amount: 0.2,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.1,
                                    }}
                                    className="relative mx-auto w-full max-w-[470px]"
                                >
                                    <div className="relative aspect-[4/4.5] overflow-hidden rounded-[1.5rem] bg-gray-100">
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            fill
                                            sizes="(max-width: 1024px) 90vw, 45vw"
                                            className="showcase-image object-cover"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                                        <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/20 text-[10px] text-white backdrop-blur-md">
                                            {slide.number}
                                        </div>
                                    </div>

                                    {/* Decorative border */}
                                    <div className="pointer-events-none absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-[1.5rem] border border-[#C9A227]/30" />
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom progress */}
                <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
                    {slides.map((slide) => (
                        <span
                            key={slide.id}
                            className="h-1 w-8 rounded-full bg-[#C9A227]/30"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}