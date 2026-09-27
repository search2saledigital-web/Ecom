"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const rowOne = [
    "Premium Quality",
    "Curated Collections",
    "Timeless Style",
    "Made For You",
    "Exclusive Designs",
    "Shop With Confidence",
    "New Season",
    "Luxury Essentials",
    "Signature Pieces",
    "Crafted To Impress",
    "Everyday Elegance",
    "Discover Something New",
];

export default function MarqueeSection() {
    const marqueeRef = useRef(null);
    const sectionRef = useRef(null);
    const animationRef = useRef(null);

    useLayoutEffect(() => {
        const marquee = marqueeRef.current;

        if (!marquee) return;

        const ctx = gsap.context(() => {
            animationRef.current = gsap.to(marquee, {
                xPercent: -50,
                duration: 25,
                ease: "none",
                repeat: -1,
            });
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, []);

    const handleMouseEnter = () => {
        if (!animationRef.current) return;

        gsap.to(animationRef.current, {
            timeScale: 0,
            duration: 0.5,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        if (!animationRef.current) return;

        gsap.to(animationRef.current, {
            timeScale: 1,
            duration: 0.5,
            ease: "power2.out",
        });
    };

    return (
        <section
            ref={sectionRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden bg-[#111111] py-6 sm:py-8"
        >
            {/* Background Glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A227]/10 blur-[100px]" />

            {/* Marquee */}
            <div className="relative overflow-hidden">
                <div
                    ref={marqueeRef}
                    className="flex w-max items-center"
                >
                    {/* First Set */}
                    {rowOne.map((item, index) => (
                        <React.Fragment key={`first - ${index} `}>
                            <span
                                className="
                                    whitespace-nowrap
                                    font-serif
                                    text-3xl
                                    font-medium
                                    tracking-tight
                                    text-white
                                    transition-colors
                                    duration-300
                                    hover:text-[#C9A227]
                                    sm:text-4xl
                                "
                            >
                                {item}
                            </span>

                            <span className="mx-7 h-2.5 w-2.5 shrink-0 rotate-45 bg-[#C9A227] sm:mx-9 lg:mx-11" />
                        </React.Fragment>
                    ))}

                    {/* Duplicate Set - Required For Infinite Loop */}
                    {rowOne.map((item, index) => (
                        <React.Fragment key={`second - ${index} `}>
                            <span
                                className="
                                    whitespace-nowrap
                                    font-serif
                                    text-3xl
                                    font-medium
                                    tracking-tight
                                    text-white
                                    transition-colors
                                    duration-300
                                    hover:text-[#C9A227]
                                    sm:text-4xl
                                    lg:text-5xl
                                "
                            >
                                {item}
                            </span>

                            <span className="mx-7 h-2.5 w-2.5 shrink-0 rotate-45 bg-[#C9A227] sm:mx-9 lg:mx-11" />
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Bottom Gold Line */}
            <div className="relative z-10 mx-auto mt-5 flex max-w-[1400px] items-center gap-4 px-5">
                <div className="h-px flex-1 bg-white/10" />

                <div className="h-2 w-2 rotate-45 bg-[#C9A227]" />

                <div className="h-px flex-1 bg-white/10" />
            </div>
        </section>
    );
}
