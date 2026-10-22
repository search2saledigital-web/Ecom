"use client";

import { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import "swiper/css";

const WHATSAPP_NUMBER = "919205012983";

const products = [
  {
    id: 1,
    category: "office",
    collection: "Office & Desk Accessories",
    title: "White Mobile Stand",
    description:
      "A sleek white mobile stand designed for everyday desk use, office workstations, meetings, and corporate gifting. Ideal for employee welcome kits, promotional campaigns, and bulk gifting.",
    image: "/inquiry/White Mobile Stand.webp",
    badge: "Popular Choice",
  },
  {
    id: 2,
    category: "travel",
    collection: "Travel Essentials",
    title: "Travel Bag with 4 Wheels",
    description:
      "A practical four-wheel travel bag designed for convenient movement and organized travel. Suitable for corporate travel programs, employee rewards, and customized bulk orders.",
    image: "/inquiry/Travel Bag with 4 Wheels.webp",
    badge: "Bulk Favourite",
  },
  {
    id: 3,
    category: "personal-care",
    collection: "Personal Care & Lifestyle",
    title: "Expert 5 in 1 Electric Beauty Styler for Women",
    description:
      "A versatile five-in-one electric beauty styler for women's personal grooming needs. An attractive option for festive hampers, employee appreciation gifts, and bulk procurement.",
    image:
      "/inquiry/Sweet Trimmer Sensitive Touch Expert 5 in 1 Electric Beauty Styler for Women.webp",
    badge: "Gift Selection",
  },
  {
    id: 4,
    category: "office",
    collection: "Modern Office Essentials",
    title: "Six Temperature-Display Bottles",
    description:
      "Temperature-display bottles for modern offices, meetings, and everyday hydration. Ideal for corporate hampers, employee onboarding kits, events, and branded merchandise.",
    image:
      "/inquiry/Six temperature-display bottles in modern office.webp",
    badge: "Corporate Pick",
  },
  {
    id: 5,
    category: "travel",
    collection: "Travel & Outdoor Accessories",
    title: "Car Umbrella",
    description:
      "A convenient umbrella for everyday use and travel. A useful choice for corporate giveaways, promotional merchandise, dealer gifts, festive gifting, and large-volume orders.",
    image: "/inquiry/Car Umbrella.webp",
    badge: "Utility Essential",
  },
];

const categories = [
  { label: "All Products", value: "all" },
  { label: "Office Essentials", value: "office" },
  { label: "Travel Accessories", value: "travel" },
  { label: "Personal Care", value: "personal-care" },
];

function getWhatsAppLink(productTitle) {
  const message = `Hello, I am interested in ${productTitle}.

Please share the bulk order pricing, minimum order quantity, available customization options, delivery timelines, and payment terms.

Please assist me with a quotation.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

function ProductCard({ product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl">
      {/* Product image */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100 sm:aspect-[4/3]">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain p-2.5 transition-transform duration-500 group-hover:scale-105 sm:p-5"
        />

        <span className="absolute right-1.5 top-1.5 max-w-[90%] rounded-full bg-stone-900 px-2 py-1 text-[7px] font-semibold uppercase tracking-wide text-amber-200 sm:right-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-[9px]">
          {product.badge}
        </span>
      </div>

      {/* Product details */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-4 lg:p-5">
        <span className="text-[8px] font-semibold uppercase leading-relaxed tracking-wider text-stone-500 sm:text-[10px]">
          {product.collection}
        </span>

        <h3 className="mt-2 text-sm font-semibold leading-snug text-stone-900 sm:mt-3 sm:text-lg">
          {product.title}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-[11px] leading-5 text-stone-600 sm:mt-3 sm:text-sm sm:leading-5">
          {product.description}
        </p>

        {/* WhatsApp inquiry */}
        <div className="mt-3 border-t border-stone-200 pt-3 sm:mt-5 sm:pt-4">
          <a
            href={getWhatsAppLink(product.title)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Inquire about ${product.title} on WhatsApp`}
            className="flex min-h-9 w-full items-center justify-center gap-1 rounded-full bg-stone-900 px-1.5 py-2 text-[8px] font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 sm:min-h-11 sm:gap-2 sm:px-3 sm:text-[10px] lg:text-xs"
          >
            <span className="text-center">Inquire on WhatsApp</span>
            <span className="text-sm sm:text-base">→</span>
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

  return (
    <section
      id="product-showcase"
      className="w-full overflow-hidden bg-[#faf9f6] px-4 py-10 sm:px-6 sm:py-16"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-9">
        {/* Section heading */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="max-w-3xl">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-amber-800 sm:text-xs sm:tracking-[0.22em]">
              — Curated Corporate Collections
            </span>

            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-3xl lg:text-5xl">
              Premium Products for Bulk Orders & Corporate Gifting
            </h2>

            <p className="mt-3 max-w-2xl text-xs leading-6 text-stone-600 sm:mt-4 sm:text-base sm:leading-7">
              Explore practical lifestyle products, office essentials,
              travel accessories, and thoughtful gifting solutions for
              businesses. Whether you need products for employees,
              promotional events, festive hampers, or client appreciation,
              enquire with us for bulk quantities and customized business
              requirements.
            </p>
          </div>

          {/* Category filters */}
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
                  onClick={() => setActiveCategory(category.value)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full border px-3 py-2 text-[9px] font-semibold uppercase tracking-wide transition sm:px-4 sm:py-2.5 sm:text-[10px] ${
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

        {/* Slider counter and navigation */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div
            className="flex items-center gap-2 sm:gap-3"
            aria-live="polite"
          >
            <span className="text-xs font-semibold tabular-nums text-stone-900 sm:text-sm">
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

            <span className="text-xs tabular-nums text-stone-500 sm:text-sm">
              {String(totalPages).padStart(2, "0")}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => swiperInstance?.slidePrev()}
              disabled={
                !swiperInstance ||
                swiperInstance.isBeginning ||
                totalPages <= 1
              }
              aria-label="Previous products"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-800 transition hover:bg-stone-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
            >
              <span className="text-2xl leading-none">‹</span>
            </button>

            <button
              type="button"
              onClick={() => swiperInstance?.slideNext()}
              disabled={
                !swiperInstance ||
                swiperInstance.isEnd ||
                totalPages <= 1
              }
              aria-label="Next products"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-800 transition hover:bg-stone-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
            >
              <span className="text-2xl leading-none">›</span>
            </button>
          </div>
        </div>

        {/* Product slider */}
        <Swiper
          key={activeCategory}
          modules={[A11y]}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper);
            updateCounter(swiper);
          }}
          onSlideChange={updateCounter}
          onResize={updateCounter}
          slidesPerView={2}
          slidesPerGroup={2}
          spaceBetween={10}
          speed={500}
          grabCursor
          watchOverflow
          breakpoints={{
            0: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 14,
            },
            640: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 1,
              spaceBetween: 22,
            },
            1280: {
              slidesPerView: 4,
              slidesPerGroup: 1,
              spaceBetween: 24,
            },
          }}
          className="!w-full !pb-3"
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id} className="!h-auto">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <p className="-mt-3 text-center text-[9px] uppercase tracking-[0.15em] text-stone-400 sm:hidden">
          Swipe to explore products →
        </p>
      </div>
    </section>
  );
}