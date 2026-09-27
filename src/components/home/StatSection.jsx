"use client";

import React, { useEffect, useRef, useState } from "react";
import { PackageCheck, Users, Star, ShoppingBag } from "lucide-react";

const stats = [
    {
        value: 12500,
        suffix: "+",
        label: "Orders Delivered",
        icon: PackageCheck,
    },
    {
        value: 8500,
        suffix: "+",
        label: "Happy Customers",
        icon: Users,
    },
    {
        value: 4.9,
        suffix: "/5",
        label: "Customer Rating",
        icon: Star,
        decimal: true,
    },
    {
        value: 500,
        suffix: "+",
        label: "Products Available",
        icon: ShoppingBag,
    },
];

function Counter({ value, decimal = false, start }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let startTime;
        const duration = 1800;

        const animate = (time) => {
            if (!startTime) startTime = time;

            const progress = Math.min(
                (time - startTime) / duration,
                1
            );

            const eased =
                1 - Math.pow(1 - progress, 3);

            const currentValue = value * eased;

            setCount(
                decimal
                    ? Number(currentValue.toFixed(1))
                    : Math.floor(currentValue)
            );

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [start, value, decimal]);

    return <>{decimal ? count.toFixed(1) : count.toLocaleString()}</>;
}

export default function StatsSection() {
    const sectionRef = useRef(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.25,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#111111] py-10 sm:py-12 lg:py-15"
        >
            {/* GOLD GLOW */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A227]/10 blur-[120px]" />

            <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                {/* HEADER */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Our Numbers
                    </span>

                    <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-white sm:text-5xl">
                        Trusted by
                        <span className="text-[#C9A227]">
                            {" "}Thousands.
                        </span>
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-white/50">
                        Every number represents the trust, satisfaction and
                        experiences of our growing community.
                    </p>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] lg:grid-cols-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.label}
                                className={`
                                    group relative flex flex-col items-center
                                    justify-center px-5 py-10 text-center
                                    transition-all duration-500
                                    hover:bg-white/[0.04]
                                    sm:px-8 sm:py-12
                                    ${index !== 0
                                        ? "border-white/10 max-lg:border-t"
                                        : ""
                                    }
                                    ${index === 1
                                        ? "lg:border-l"
                                        : ""
                                    }
                                    ${index === 2
                                        ? "lg:border-l"
                                        : ""
                                    }
                                    ${index === 3
                                        ? "border-l lg:border-l"
                                        : ""
                                    }
                                `}
                            >
                                {/* ICON */}
                                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 text-[#C9A227] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#C9A227] group-hover:text-black">
                                    <Icon size={19} />
                                </div>

                                {/* NUMBER */}
                                <div className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
                                    <Counter
                                        value={stat.value}
                                        decimal={stat.decimal}
                                        start={started}
                                    />

                                    <span className="ml-1 text-[#C9A227]">
                                        {stat.suffix}
                                    </span>
                                </div>

                                {/* LABEL */}
                                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 sm:text-xs">
                                    {stat.label}
                                </p>

                                {/* BOTTOM GOLD LINE */}
                                <div className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-[#C9A227] transition-all duration-500 group-hover:w-16" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
