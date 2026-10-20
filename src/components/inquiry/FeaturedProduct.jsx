
"use client";

import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Kitchen Essentials",
    subtitle: "Everyday tools, exceptional quality",
    image: "/images/kitchen-category.jpg",
    href: "/products/kitchen-items",
    size: "large",
  },
  {
    id: 2,
    title: "Corporate Gifts",
    subtitle: "Gifts that make an impression",
    image: "/images/corporate-gifts.jpg",
    href: "/products/corporate-gifts",
    size: "small",
  },
  {
    id: 3,
    title: "Premium Accessories",
    subtitle: "Thoughtful details, lasting value",
    image: "/images/accessories-category.jpg",
    href: "/products/accessories",
    size: "small",
  },
  {
    id: 4,
    title: "Custom Merchandise",
    subtitle: "Made for your brand",
    image: "/images/custom-merchandise.jpg",
    href: "/products/custom-merchandise",
    size: "large",
  },
];

function CategoryCard({ category, className = "" }) {
  return (
    <a
      href={category.href}
      className={`group relative isolate block overflow-hidden bg-stone-100 ${className}`}
    >
      {/* Image */}
      <img
        src={category.image}
        alt={category.title}
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Image overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/10 to-black/5 transition-colors duration-500 group-hover:from-black/80" />

      {/* Category content */}
      <div className="flex h-full min-h-[250px] flex-col justify-end p-5 sm:p-6 lg:p-7">
        <span className="mb-3 w-fit rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md sm:text-xs">
          Featured Collection
        </span>

        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl lg:text-3xl">
              {category.title}
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-white/80">
              {category.subtitle}
            </p>

            <span className="mt-4 inline-flex items-center gap-2 border-b border-white/70 pb-1 text-sm font-semibold text-white transition-colors group-hover:border-amber-300 group-hover:text-amber-300">
              Explore Category
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </div>

          <div className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-amber-400 transition-all duration-500 group-hover:w-full" />
    </a>
  );
}

export default function FeaturedProduct() {
  return (
    <section className="bg-white px-4 py-6 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500 sm:text-sm">
            Made for Every Occasion
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Featured <span className="text-amber-700">Categories</span>
          </h2>

          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-stone-300" />
            <span className="h-2.5 w-2.5 rotate-45 border border-amber-600" />
            <span className="h-px w-12 bg-stone-300" />
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Discover thoughtfully selected products for your home, business,
            and gifting needs.
          </p>
        </div>

        {/* Featured image grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {/* Left large card */}
          <CategoryCard
            category={categories[0]}
            className="min-h-[350px] rounded-sm sm:min-h-[440px] lg:row-span-2 lg:min-h-[590px]"
          />

          {/* Center stacked cards */}
          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
            <CategoryCard
              category={categories[1]}
              className="min-h-[250px] rounded-sm sm:min-h-[280px] lg:min-h-[282px]"
            />

            <CategoryCard
              category={categories[2]}
              className="min-h-[250px] rounded-sm sm:min-h-[280px] lg:min-h-[282px]"
            />
          </div>

          {/* Right large card */}
          <CategoryCard
            category={categories[3]}
            className="min-h-[350px] rounded-sm sm:min-h-[440px] lg:row-span-2 lg:min-h-[590px]"
          />
        </div>
      </div>
    </section>
  );
}
