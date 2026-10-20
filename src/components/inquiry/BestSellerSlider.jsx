
"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";

import "swiper/css";

const bestSellers = [
  {
    id: 1,
    name: "Fresh Fruits & Vegetables",
    subtitle: "Quality you can trust",
    price: "₹199",
    category: "Fresh Produce",
    bg: "bg-[#dfe6d8]",
    image: "/images/fruits-vegetables.png",
    link: "/products/fruits-vegetables",
  },
  {
    id: 2,
    name: "Hot From the Oven",
    subtitle: "Our best-selling products",
    price: "₹99",
    category: "Bakery",
    bg: "bg-[#eee5c9]",
    image: "/images/bakery.png",
    link: "/products/bakery",
    inquiry: true,
  },
  {
    id: 3,
    name: "Sweets & Desserts",
    subtitle: "A little sweetness every day",
    price: "₹149",
    category: "Desserts",
    bg: "bg-[#f0dada]",
    image: "/images/desserts.png",
    link: "/products/desserts",
  },
  {
    id: 4,
    name: "Natural & Organic",
    subtitle: "Goodness in every sip",
    price: "₹79",
    category: "Beverages",
    bg: "bg-[#e8e0ed]",
    image: "/images/beverages.png",
    link: "/products/beverages",
  },
];

export default function BestSellerSlider() {
  const swiperRef = useRef(null);

  return (
    <section className="overflow-hidden bg-[#f4f7f5] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-[1600px]">
        {/* Section heading */}
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
              <Star size={15} fill="currentColor" />
              Customer Favorites
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Our Best Sellers
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Discover the products our customers love the most.
            </p>
          </div>

          {/* Slider controls */}
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous products"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition hover:border-amber-500 hover:bg-amber-500 hover:text-white"
            >
              <ChevronLeft size={21} />
            </button>

            <button
              type="button"
              aria-label="Next products"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition hover:border-amber-500 hover:bg-amber-500 hover:text-white"
            >
              <ChevronRight size={21} />
            </button>
          </div>
        </div>

        {/* Product slider */}
        <Swiper
          modules={[Autoplay, A11y]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={1.1}
          spaceBetween={14}
          loop
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            480: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 18,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="!overflow-visible"
        >
          {bestSellers.map((product) => (
            <SwiperSlide key={product.id} className="!h-auto">
              <article
                className={`group relative flex min-h-[235px] h-full overflow-hidden rounded-xl border border-black/[0.04] ${product.bg} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 sm:min-h-[255px]`}
              >
                {/* Text content */}
                <div className="relative z-10 flex w-[63%] flex-col items-start justify-center p-4 sm:p-5 lg:p-6">
                  <span className="mb-3 inline-flex rounded-full border border-black/5 bg-white/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 sm:text-[11px]">
                    {product.category}
                  </span>

                  <h3 className="max-w-[200px] text-lg font-bold leading-snug tracking-tight text-slate-900 sm:text-xl">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm">
                    {product.subtitle}
                  </p>

                  {/* <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-sm">
                    <span className="text-xs text-slate-500">Starting at</span>
                    <span className="text-base font-bold text-slate-900">
                      {product.price}
                    </span>
                  </div> */}

                    <a
                      href="#product-inquiry"
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-amber-600 sm:px-4 sm:text-sm"
                    >
                      Enquire Now
                      <ArrowRight size={15} />
                    </a>
                
                </div>

                {/* Product image */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex w-[43%] items-center justify-center overflow-hidden">
                  <div className="absolute right-2 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-white/40 blur-2xl sm:h-36 sm:w-36" />

                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="relative z-[1] h-[72%] w-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110 sm:h-[78%]"
                  />
                </div>

                {/* Decorative corner detail */}
                <div className="absolute bottom-0 left-0 h-px w-12 bg-black/10 transition-all duration-300 group-hover:w-24" />
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 sm:mt-8 sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Explore customer favorites and find your next pick
        </div>
      </div>
    </section>
  );
}
