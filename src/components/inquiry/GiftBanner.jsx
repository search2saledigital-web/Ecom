
"use client";

import { ArrowUpRight } from "lucide-react";

const banners = [
  {
    id: 1,
    label: "Kitchen Essentials",
    title: "Upgrade Your Kitchen, Every Day",
    linkText: "Explore Kitchen Items",
    href: "/products/kitchen-items",
    image: "/images/kitchen-banner.jpg",
    theme: "kitchen",
  },
  {
    id: 2,
    label: "Corporate Gifting",
    title: "Gifts That Make Your Brand Memorable",
    linkText: "Explore Corporate Gifts",
    href: "/products/corporate-gifts",
    image: "/images/corporate-gifts-banner.jpg",
    theme: "gifts",
  },
];

export default function GiftBanner() {
  return (
    <section className="bg-[#f8f8f6] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        {banners.map((banner) => (
          <article
            key={banner.id}
            className={`group relative isolate flex min-h-[260px] overflow-hidden rounded-lg sm:min-h-[300px] lg:min-h-[320px] ${
              banner.theme === "kitchen"
                ? "bg-[#e8e2d6]"
                : "bg-[#e8dce9]"
            }`}
          >
            {/* Background image */}
            <img
              src={banner.image}
              alt={banner.title}
              loading="lazy"
              className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Readability overlay */}
            <div
              className={`absolute inset-0 -z-10 ${
                banner.theme === "kitchen"
                  ? "bg-gradient-to-r from-[#f1e9dc]/95 via-[#f1e9dc]/70 to-transparent"
                  : "bg-gradient-to-r from-[#e5d3e8]/95 via-[#e5d3e8]/65 to-transparent"
              }`}
            />

            {/* Banner content */}
            <div className="flex w-full items-center p-6 sm:p-9 lg:p-10">
              <div className="max-w-[390px]">
                <span className="inline-flex rounded-md bg-white px-3.5 py-2 text-xs font-medium text-slate-800 shadow-sm sm:text-sm">
                  {banner.label}
                </span>

                <h2 className="mt-5 max-w-[360px] text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-[34px]">
                  {banner.title}
                </h2>

                <a
                  href={banner.href}
                  className="group/link mt-5 inline-flex items-center gap-2 border-b border-slate-800/60 pb-1 text-sm font-semibold text-slate-900 transition-colors hover:border-amber-700 hover:text-amber-800 sm:text-base"
                >
                  {banner.linkText}
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute bottom-0 left-0 h-1 w-16 bg-amber-600 transition-all duration-300 group-hover:w-28" />
          </article>
        ))}
      </div>
    </section>
  );
}
