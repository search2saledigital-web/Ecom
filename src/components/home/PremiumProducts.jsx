"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        id: 1,
        number: "01",
        category: "Signature Collection",
        name: "The Golden Statement",
        description:
            "A refined piece designed to bring effortless luxury and timeless character to your collection.",
        price: "₹12,999",
        image: "/products/product-1.jpg",
        href: "/product/golden-statement",
    },
    {
        id: 2,
        number: "02",
        category: "New Arrival",
        name: "Classic Essential",
        description:
            "Minimal design, premium details and an effortless silhouette created for everyday elegance.",
        price: "₹8,499",
        image: "/products/product-2.jpg",
        href: "/product/classic-essential",
    },
    {
        id: 3,
        number: "03",
        category: "Premium Edit",
        name: "Modern Icon",
        description:
            "A contemporary statement piece combining sophisticated styling with exceptional craftsmanship.",
        price: "₹9,999",
        image: "/products/product-3.jpg",
        href: "/product/modern-icon",
    },
    {
        id: 4,
        number: "04",
        category: "Limited Collection",
        name: "Timeless Classic",
        description:
            "Designed for those who appreciate subtle luxury, considered details and enduring style.",
        price: "₹14,999",
        image: "/products/product-4.jpg",
        href: "/product/timeless-classic",
    },
    {
        id: 5,
        number: "05",
        category: "Editor's Pick",
        name: "The Signature Piece",
        description:
            "A distinctive addition to your wardrobe created to stand apart without trying too hard.",
        price: "₹11,499",
        image: "/products/product-5.jpg",
        href: "/product/signature-piece",
    },
    {
        id: 6,
        number: "06",
        category: "Exclusive",
        name: "Luxury Essential",
        description:
            "Premium materials meet modern design in a versatile piece made for every occasion.",
        price: "₹16,999",
        image: "/products/product-6.jpg",
        href: "/product/luxury-essential",
    },
];

export default function PremiumProductsScroll() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const progressRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const progress = progressRef.current;

        if (!section || !track) return;

        const ctx = gsap.context(() => {
            /*
             * =====================================================
             * NAVBAR HEIGHT
             * =====================================================
             *
             * Change this value according to your navbar.
             *
             * Example:
             * top black bar      = 36px
             * main navbar         = 76px
             * category navbar     = 48px
             *
             * Total               = 160px
             *
             * If your navbar is 120px, use 120.
             */

            const NAVBAR_HEIGHT = 120;

            /*
             * Available viewport height after navbar.
             */
            const getAvailableHeight = () => {
                return Math.max(
                    500,
                    window.innerHeight - NAVBAR_HEIGHT
                );
            };

            /*
             * Complete horizontal distance.
             */
            const getScrollDistance = () => {
                return Math.max(
                    0,
                    track.scrollWidth - window.innerWidth
                );
            };

            /*
             * Set section height according to available viewport.
             */
            gsap.set(section, {
                height: () => getAvailableHeight(),
            });

            /*
             * Set inner viewport height.
             */
            gsap.set(".premium-scroll-viewport", {
                height: () => getAvailableHeight(),
            });

            /*
             * =====================================================
             * HORIZONTAL SCROLL
             * =====================================================
             */

            const horizontalTween = gsap.to(track, {
                x: () => -getScrollDistance(),

                ease: "none",

                scrollTrigger: {
                    trigger: section,

                    /*
                     * IMPORTANT:
                     * Start BELOW navbar.
                     */
                    start: () => `top ${NAVBAR_HEIGHT}px`,

                    /*
                     * Full horizontal distance.
                     */
                    end: () => `+=${getScrollDistance()}`,

                    scrub: 1,

                    /*
                     * Pin below navbar.
                     */
                    pin: true,

                    pinSpacing: true,

                    /*
                     * IMPORTANT:
                     * This keeps the pinned element below
                     * the fixed navbar.
                     */
                    pinReparent: true,

                    anticipatePin: 1,

                    invalidateOnRefresh: true,

                    onUpdate: (self) => {
                        if (progress) {
                            gsap.set(progress, {
                                scaleX: self.progress,
                            });
                        }
                    },
                },
            });

            /*
             * =====================================================
             * CARD ANIMATION
             * =====================================================
             */

            gsap.utils
                .toArray(".premium-card")
                .forEach((card) => {
                    gsap.fromTo(
                        card,
                        {
                            scale: 0.88,
                            opacity: 0.35,
                        },
                        {
                            scale: 1,
                            opacity: 1,
                            ease: "none",

                            scrollTrigger: {
                                trigger: card,

                                containerAnimation:
                                    horizontalTween,

                                start: "left 90%",
                                end: "left 45%",

                                scrub: true,
                            },
                        }
                    );
                });

            /*
             * =====================================================
             * INTRO ANIMATION
             * =====================================================
             */

            gsap.fromTo(
                ".premium-intro",
                {
                    opacity: 0,
                    x: -60,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power3.out",

                    scrollTrigger: {
                        trigger: section,

                        start: () =>
                            `top ${NAVBAR_HEIGHT + 50}px`,

                        toggleActions:
                            "play none none reverse",
                    },
                }
            );

            /*
             * Refresh after images/layout.
             */
            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });

            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500);
        }, section);

        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );

            ctx.revert();
        };
    }, []);

    return (
        <>
            {/* =====================================================
                DESKTOP
            ====================================================== */}

            <section
                ref={sectionRef}
                className="relative hidden overflow-hidden bg-[#111111] lg:block"
            >
                <div
                    className="
                        premium-scroll-viewport
                        relative
                        flex
                        w-full
                        items-center
                        overflow-hidden
                    "
                >
                    {/* BACKGROUND GLOW */}

                    <div className="pointer-events-none absolute left-[15%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#C9A227]/5 blur-[140px]" />

                    {/* RIGHT FADE */}

                    <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-[18vw] bg-gradient-to-l from-[#111111] via-[#111111]/70 to-transparent" />

                    {/* =================================================
                        TRACK
                    ================================================== */}

                    <div
                        ref={trackRef}
                        className="flex h-full w-max shrink-0 items-center will-change-transform"
                    >
                        {/* =================================================
                            INTRO
                        ================================================== */}

                        <div className="premium-intro flex h-full w-[34vw] min-w-[440px] shrink-0 items-center px-10 xl:px-14">
                            <div className="max-w-[430px]">
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="h-px w-10 bg-[#C9A227]" />

                                    <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                                        Premium Collection
                                    </span>
                                </div>

                                <h2 className="font-serif text-5xl font-medium leading-[0.92] text-white xl:text-7xl">
                                    Crafted for
                                    <br />

                                    <span className="text-[#C9A227]">
                                        those who notice.
                                    </span>
                                </h2>

                                <p className="mt-6 max-w-sm text-xs leading-6 text-white/45">
                                    Explore our carefully selected
                                    premium products, created for
                                    timeless style, exceptional
                                    quality and effortless elegance.
                                </p>

                                <div className="mt-8 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C9A227]/40 text-[#C9A227]">
                                        ↓
                                    </span>

                                    Scroll to explore
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                            PRODUCTS
                        ================================================== */}

                        <div className="flex h-full shrink-0 items-center gap-6 pr-[15vw]">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="
                                        premium-card
                                        group
                                        relative
                                        flex
                                        h-[68vh]
                                        w-[330px]
                                        shrink-0
                                        flex-col
                                        overflow-hidden
                                        rounded-[1.5rem]
                                        bg-white
                                        shadow-2xl
                                        will-change-transform
                                        xl:h-[70vh]
                                        xl:w-[360px]
                                    "
                                >
                                    {/* IMAGE */}

                                    <div className="relative flex-1 overflow-hidden bg-[#eeeeee]">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="360px"
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />

                                        {/* NUMBER */}

                                        <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/20 text-[9px] font-semibold text-white backdrop-blur-md">
                                            {product.number}
                                        </div>

                                        {/* CATEGORY */}

                                        <div className="absolute right-4 top-4 max-w-[155px] rounded-full border border-white/30 bg-black/20 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                                            {product.category}
                                        </div>

                                        {/* VIEW */}

                                        <Link
                                            href={product.href}
                                            className="absolute bottom-5 right-5 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-[#C9A227] text-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                                        >
                                            <ArrowUpRight size={17} />
                                        </Link>
                                    </div>

                                    {/* INFO */}

                                    <div className="px-5 py-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <h3 className="truncate font-serif text-xl font-medium text-[#111111]">
                                                    {product.name}
                                                </h3>

                                                <p className="mt-1.5 line-clamp-2 text-[11px] leading-[1.45] text-gray-500">
                                                    {product.description}
                                                </p>
                                            </div>

                                            <span className="shrink-0 pt-1 text-xs font-bold text-[#C9A227]">
                                                {product.price}
                                            </span>
                                        </div>

                                        <Link
                                            href={product.href}
                                            className="mt-4 flex items-center gap-2 border-t border-black/10 pt-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#111111] transition-colors hover:text-[#C9A227]"
                                        >
                                            <ShoppingBag size={12} />

                                            View Product

                                            <ArrowUpRight
                                                size={12}
                                                className="ml-auto"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* =================================================
                        TOP LABEL
                    ================================================== */}

                    <div className="pointer-events-none absolute left-10 top-7 z-40 flex items-center gap-2 xl:left-14">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227]" />

                        <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-white/35">
                            Premium Products
                        </span>
                    </div>

                    {/* =================================================
                        PROGRESS
                    ================================================== */}

                    <div className="absolute bottom-6 left-10 right-10 z-40 xl:left-14 xl:right-14">
                        <div className="h-px bg-white/10">
                            <div
                                ref={progressRef}
                                className="h-full origin-left scale-x-0 bg-[#C9A227]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                MOBILE
            ====================================================== */}

            <section className="overflow-hidden bg-[#111111] px-5 py-14 lg:hidden">
                <div className="mb-8">
                    <div className="mb-4 flex items-center gap-3">
                        <span className="h-px w-8 bg-[#C9A227]" />

                        <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                            Premium Collection
                        </span>
                    </div>

                    <h2 className="font-serif text-4xl font-medium leading-[0.95] text-white">
                        Crafted for
                        <br />

                        <span className="text-[#C9A227]">
                            those who notice.
                        </span>
                    </h2>

                    <p className="mt-4 max-w-sm text-xs leading-5 text-white/45">
                        Explore our premium collection and discover
                        your next signature piece.
                    </p>
                </div>

                <Swiper
                    modules={[FreeMode]}
                    slidesPerView={1.12}
                    spaceBetween={14}
                    freeMode={{
                        enabled: true,
                        momentum: true,
                    }}
                    className="!overflow-visible"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="overflow-hidden rounded-[1.4rem] bg-white">
                                <div className="relative aspect-[4/4.5]">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        sizes="85vw"
                                        className="object-cover"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                                    <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/25 text-[9px] text-white backdrop-blur-md">
                                        {product.number}
                                    </div>

                                    <div className="absolute right-4 top-4 max-w-[140px] rounded-full bg-black/25 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-md">
                                        {product.category}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="font-serif text-xl font-medium text-[#111111]">
                                            {product.name}
                                        </h3>

                                        <span className="shrink-0 text-xs font-bold text-[#C9A227]">
                                            {product.price}
                                        </span>
                                    </div>

                                    <p className="mt-2 line-clamp-2 text-[11px] leading-4 text-gray-500">
                                        {product.description}
                                    </p>

                                    <Link
                                        href={product.href}
                                        className="mt-4 flex items-center gap-2 border-t border-black/10 pt-3 text-[9px] font-semibold uppercase tracking-[0.15em]"
                                    >
                                        <ShoppingBag size={12} />
                                        View Product

                                        <ArrowUpRight
                                            size={12}
                                            className="ml-auto"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </>
    );
}