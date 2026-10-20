
"use client";

import { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";

import "swiper/css";

const products = [
  // Add your own products here.
  {
    id: 1,
    category: "executive",
    collection: "Executive Archive",
    material: "American Walnut & Brass",
    title: "The Signature Executive Suite",
    description:
      "Solid American walnut presentation chest, leather journal, and custom brass accessories designed for executive gifting.",
    image: "/images/product-1.jpg",
    rating: "4.9",
    badge: "Best Seller",
    commission: "Custom Quote on Inquiry",
  },
  {
    id: 2,
    category: "brass",
    collection: "Desk Artifacts",
    material: "Solid Spun Brass",
    title: "Aura Solid Brass Catchall & Vessel",
    description:
      "A sophisticated brass vessel with a satin gold finish and a personalized corporate crest.",
    image: "/images/product-2.jpg",
    rating: "5.0",
    commission: "Custom Atelier Run",
  },
  {
    id: 3,
    category: "living",
    collection: "Architectural Decor",
    material: "Bronze Cast",
    title: "The Orbit Cast Brass Knot",
    description:
      "A sculptural accent designed for executive offices, boardrooms, luxury hotels, and premium interiors.",
    image: "/images/product-3.jpg",
    rating: "4.8",
    commission: "Custom Architectural Finish",
  },
  {
    id: 4,
    category: "brass",
    collection: "Artisan Drinkware",
    material: "Gilded Ceramic",
    title: "Gilded Stoneware Mug Duo",
    description:
      "Elegant handcrafted drinkware with a gold-finished base and a personalized presentation box.",
    image: "/images/product-4.jpg",
    rating: "4.9",
    commission: "Volume Atelier Run",
  },
];

const categories = [
  { label: "All Collections", value: "all" },
//   { label: "Executive Gift Sets", value: "executive" },
//   { label: "Architectural Decor", value: "living" },
//   { label: "Artisan Brassware & Candles", value: "brass" },
];

function ProductCard({ product }) {
  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {product.material && (
          <span className="absolute left-3 top-3 max-w-[75%] rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-stone-800 shadow-sm backdrop-blur-sm sm:text-[10px]">
            {product.material}
          </span>
        )}

        {product.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-stone-900 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-amber-200 shadow-sm sm:text-[10px]">
            {product.badge}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 ">
        <div className="mb-3 flex items-start justify-between gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-stone-500 sm:text-[10px]">
            {product.collection}
          </span>

          {product.rating && (
            <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-stone-800">
              <span className="text-amber-600">★</span>
              {product.rating}
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold leading-snug tracking-tight text-stone-900 sm:text-lg">
          {product.title}
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-xs leading-5 text-stone-600 sm:text-sm">
          {product.description}
        </p>

        {/* Inquiry */}
        <div className="mt-5 border-t border-stone-200 pt-2">
         

          <a
            href="#dedicated-inquiry"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 sm:px-4 sm:text-xs"
          >
            Inquire Now
            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  const updateCounter = useCallback((swiper) => {
    if (!swiper || swiper.destroyed) return;

    const total = Math.max(swiper.snapGrid.length, 1);
    const current = Math.min(swiper.snapIndex + 1, total);

    setCurrentPage(current);
    setTotalPages(total);
  }, []);

  useEffect(() => {
    if (!swiperInstance || swiperInstance.destroyed) return;

    swiperInstance.update();
    swiperInstance.slideTo(0, 0);
    updateCounter(swiperInstance);
  }, [activeCategory, swiperInstance, updateCounter]);

  const changeCategory = (category) => {
    setActiveCategory(category);
  };

  return (
    <section
      id="product-showcase"
      className="w-full overflow-hidden bg-[#faf9f6] px-4 py-12 sm:px-3 sm:py-16 "
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-7 sm:gap-9 ">
        {/* Heading */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="max-w-3xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-800 sm:text-xs sm:tracking-[0.22em]">
              — Curated Catalog Selections
            </span>

            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-3xl lg:text-5xl">
              Bespoke Artifacts &amp; Executive Suites
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600 sm:mt-4 sm:text-base sm:leading-7">
              Discover thoughtfully crafted executive gifts and
              architectural accents, available for personalized
              commissions and corporate gifting.
            </p>
          </div>

          {/* Responsive category filters */}
          <div
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
            aria-label="Filter product collections"
          >
            {categories.map((category) => {
              const active = activeCategory === category.value;

              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => changeCategory(category.value)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full border px-3 py-2.5 text-[9px] font-semibold uppercase tracking-wider transition-all duration-300 sm:px-4 sm:text-[10px] lg:text-xs ${
                    active
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-200 bg-white text-stone-600 hover:border-stone-500 hover:text-stone-900"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Slider header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div
            className="flex items-center gap-2 sm:gap-3"
            aria-live="polite"
          >
            <span className="min-w-5 text-xs font-semibold tabular-nums text-stone-900 sm:text-sm">
              {String(currentPage).padStart(2, "0")}
            </span>

            <div className="h-1 w-12 overflow-hidden rounded-full bg-stone-200 sm:w-24">
              <div
                className="h-full rounded-full bg-amber-700 transition-all duration-300"
                style={{
                  width: `${(currentPage / totalPages) * 100}%`,
                }}
              />
            </div>

            <span className="min-w-5 text-xs tabular-nums text-stone-500 sm:text-sm">
              {String(totalPages).padStart(2, "0")}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => swiperInstance?.slidePrev()}
              disabled={!swiperInstance || swiperInstance.isBeginning}
              aria-label="Previous products"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-800 transition-colors hover:bg-stone-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
            >
              <span className="text-2xl leading-none">‹</span>
            </button>

            <button
              type="button"
              onClick={() => swiperInstance?.slideNext()}
              disabled={!swiperInstance || swiperInstance.isEnd}
              aria-label="Next products"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-800 transition-colors hover:bg-stone-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
            >
              <span className="text-2xl leading-none">›</span>
            </button>
          </div>
        </div>

        {/* Responsive Swiper */}
        {filteredProducts.length > 0 ? (
          <Swiper
            modules={[A11y]}
            onSwiper={(swiper) => {
              setSwiperInstance(swiper);
              updateCounter(swiper);
            }}
            onSlideChange={updateCounter}
            onResize={updateCounter}
            onUpdate={updateCounter}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={14}
            speed={500}
            grabCursor
            watchOverflow
            breakpoints={{
              480: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 18,
              },
              768: {
                slidesPerView: 2,
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
            className="!w-full !overflow-hidden !pb-3"
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product.id} className="!h-auto">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="py-12 text-center text-sm text-stone-500">
            No products found in this collection.
          </p>
        )}

        <p className="-mt-3 text-center text-[10px] uppercase tracking-[0.16em] text-stone-400 sm:hidden">
          Swipe to explore →
        </p>
      </div>
    </section>
  );
}
