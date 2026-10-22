"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Gift,
  Star,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const products = [
  {
    id: 1,
    category: "FESTIVE GIFTING",
    name: "Premium Diwali Gift Hampers",
    description:
      "Elegant festive hampers for employees, clients, and business partners.",
    image: "/images/diwali-gift-hamper.png",
    bg: "bg-[#fff0d7]",
    badge: "BESTSELLER",
  },
  {
    id: 2,
    category: "CORPORATE GIFTS",
    name: "Corporate Gift Sets",
    description:
      "Thoughtfully curated executive gifts for your business gifting needs.",
    image: "/images/corporate-gift-set.png",
    bg: "bg-[#edf1e5]",
    badge: "CORPORATE PICK",
  },
  {
    id: 3,
    category: "SWEETS & TREATS",
    name: "Sweets & Desserts",
    description:
      "Celebrate the festival with delightful sweets and premium gift boxes.",
    image: "/images/diwali-sweets.png",
    bg: "bg-[#f9e4e1]",
    badge: "FESTIVE FAVOURITE",
  },
  {
    id: 4,
    category: "LIFESTYLE ESSENTIALS",
    name: "Premium Insulated Bottles",
    description:
      "Stylish and practical bottles for everyday use and employee gifting.",
    image: "/images/premium-bottles.png",
    bg: "bg-[#eee6f4]",
    badge: "POPULAR CHOICE",
  },
  {
    id: 5,
    category: "FESTIVE DECOR",
    name: "Festive Decor & Diyas",
    description:
      "Traditional decorative accents to bring warmth to every celebration.",
    image: "/images/diwali-decor.png",
    bg: "bg-[#faecd9]",
    badge: "FESTIVE SPECIAL",
  },
  {
    id: 6,
    category: "EXECUTIVE ACCESSORIES",
    name: "Premium Notebook & Pen Sets",
    description:
      "Sophisticated stationery gifts for teams, events, and business clients.",
    image: "/images/notebook-pen-set.png",
    bg: "bg-[#e9edf5]",
    badge: "EXECUTIVE PICK",
  },
];

const WHATSAPP_NUMBER = "919205012983";

function getWhatsAppLink(productName) {
  const message = `Hello Aura & Gold,

I am interested in ${productName} for Diwali gifting.

Please share bulk pricing, minimum order quantity, customization options, and delivery timelines.

Thank you.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

export default function DiwaliSpecial() {
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <section
      id="diwali-special"
      className="relative overflow-hidden bg-[#faf9f5] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[35px] border-amber-100/50" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full border-[35px] border-amber-100/40" />

      <div className="relative mx-auto max-w-[1600px]">
        {/* Section heading */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#b96d12]">
              <Sparkles size={17} />
              Diwali Special Products
            </div>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#14213d] sm:text-4xl lg:text-5xl">
              Celebrate with{" "}
              <span className="text-[#c18425]">
                Thoughtful Gifting
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Discover our exclusive Diwali collection — premium gifts,
              elegant packaging, and festive essentials for your clients,
              employees, and business partners.
            </p>
          </div>

          {/* Swiper navigation */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => swiperInstance?.slidePrev()}
              aria-label="Previous products"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#14213d] shadow-sm transition hover:border-[#c18425] hover:bg-[#c18425] hover:text-white sm:h-12 sm:w-12"
            >
              <ArrowLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => swiperInstance?.slideNext()}
              aria-label="Next products"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#14213d] shadow-sm transition hover:border-[#c18425] hover:bg-[#c18425] hover:text-white sm:h-12 sm:w-12"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Swiper product slider */}
        <div className="diwali-swiper mt-8 sm:mt-10">
          <Swiper
            modules={[Navigation, Pagination]}
            onSwiper={setSwiperInstance}
            slidesPerView={2}
            slidesPerGroup={2}
            spaceBetween={12}
            speed={600}
            loop={true}
            pagination={{
              clickable: true,
              el: ".diwali-pagination",
            }}
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
              768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 24,
              },
            }}
            className="!overflow-visible"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="!h-auto">
                <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#e9e3d9] bg-white shadow-sm transition-all duration-300 hover:border-[#d7b77c] hover:shadow-xl hover:shadow-amber-900/10 sm:rounded-2xl">
                  {/* Product image */}
                  <div
                    className={`relative aspect-square overflow-hidden sm:aspect-[4/3] ${product.bg}`}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 767px) 50vw, (max-width: 1023px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-1.5 top-1.5 max-w-[calc(100%-12px)] rounded-full border border-white/60 bg-white/95 px-2 py-1 text-[7px] font-extrabold tracking-wide text-[#9b641d] shadow-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-[9px]">
                      {product.badge}
                    </span>
                  </div>

                  {/* Product details */}
                  <div className="flex flex-1 flex-col p-2.5 sm:p-4 lg:p-5">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Star
                        size={11}
                        className="shrink-0 fill-[#c18425] text-[#c18425] sm:h-3 sm:w-3"
                      />

                      <span className="text-[7px] font-extrabold uppercase leading-tight tracking-wide text-[#b57922] sm:text-[9px] sm:tracking-[0.12em]">
                        {product.category}
                      </span>
                    </div>

                    <h3 className="mt-2 text-sm font-bold leading-snug text-[#14213d] sm:mt-3 sm:text-lg lg:text-xl">
                      {product.name}
                    </h3>

                    <p className="mt-2 flex-1 text-[11px] leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-5">
                      {product.description}
                    </p>

                    {/* WhatsApp inquiry button */}
                    <a
                      href={getWhatsAppLink(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-9 w-full items-center justify-center gap-1 rounded-lg bg-[#14213d] px-2 py-2 text-[10px] font-bold text-white transition hover:bg-[#c18425] focus:outline-none focus:ring-2 focus:ring-amber-300 sm:mt-5 sm:min-h-11 sm:gap-2 sm:rounded-xl sm:px-3 sm:py-3 sm:text-xs"
                    >
                      <MessageCircle size={13} className="shrink-0 sm:h-4 sm:w-4" />
                      <span>Inquire Now</span>
                      <ArrowRight size={12} className="shrink-0 sm:h-4 sm:w-4" />
                    </a>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination dots */}
          <div className="diwali-pagination mt-7 flex items-center justify-center gap-1.5" />
        </div>

        {/* Bulk order CTA */}
        <div className="relative mt-10 overflow-hidden rounded-2xl bg-[#14213d] px-5 py-7 sm:mt-12 sm:px-9 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="pointer-events-none absolute -right-12 -top-20 h-52 w-52 rounded-full border-[28px] border-white/[0.04]" />

          <div className="relative">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-amber-400 sm:text-[10px] sm:tracking-[0.22em]">
              Make This Diwali Memorable
            </span>

            <h3 className="mt-3 text-xl font-bold text-white sm:text-3xl">
              Planning Corporate Diwali Gifting?
            </h3>

            <p className="mt-3 max-w-2xl text-xs leading-6 text-slate-300 sm:text-base">
              Share your quantity, budget, preferred products, and branding
              requirements. Let&apos;s create a memorable gifting experience
              for your team and clients.
            </p>
          </div>

          <a
            href={getWhatsAppLink(
              "a corporate Diwali bulk gifting collection"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-5 inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-xs font-extrabold text-[#14213d] transition hover:-translate-y-1 hover:bg-amber-300 sm:mt-6 sm:min-h-12 sm:w-auto sm:px-6 sm:py-4 sm:text-sm lg:mt-0"
          >
            <MessageCircle size={17} />
            Request Bulk Quote
            <ArrowRight size={17} />
          </a>
        </div>
      </div>

      {/* Swiper pagination styling */}
      <style jsx global>{`
        .diwali-pagination .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          display: inline-block;
          border-radius: 999px;
          background: #ded6c8;
          opacity: 1;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .diwali-pagination .swiper-pagination-bullet-active {
          width: 24px;
          background: #c18425;
        }

        .diwali-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
}
