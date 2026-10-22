"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Gift,
  Star,
} from "lucide-react";

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
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + products.length) % products.length
    );
  };

  const visibleProducts = Array.from({ length: 4 }, (_, index) => {
    return products[(activeIndex + index) % products.length];
  });

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

          {/* Slider arrows */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous products"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-[#14213d] shadow-sm transition hover:border-[#c18425] hover:bg-[#c18425] hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next products"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-[#14213d] shadow-sm transition hover:border-[#c18425] hover:bg-[#c18425] hover:text-white"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Product cards */}
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <article
              key={product.id}
              className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e9e3d9] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d7b77c] hover:shadow-xl hover:shadow-amber-900/10"
            >
              {/* Product image */}
              <div
                className={`relative aspect-[4/3] overflow-hidden ${product.bg}`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute left-3 top-3 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-[9px] font-extrabold tracking-wider text-[#9b641d] shadow-sm">
                  {product.badge}
                </span>
              </div>

              {/* Product information */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <Star
                    size={12}
                    className="fill-[#c18425] text-[#c18425]"
                  />
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#b57922]">
                    {product.category}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold leading-snug text-[#14213d] sm:text-xl">
                  {product.name}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {product.description}
                </p>

                {/* Inquiry button below product name and description */}
                <a
                  href={getWhatsAppLink(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#14213d] px-4 py-3 text-sm font-bold text-white transition duration-300 hover:bg-[#c18425] focus:outline-none focus:ring-4 focus:ring-amber-200"
                >
                  <MessageCircle size={17} />
                  Inquire Now
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Slider indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {products.map((product, index) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show products starting at ${product.name}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-[#c18425]"
                  : "w-2 bg-[#ded6c8] hover:bg-[#c18425]/60"
              }`}
            />
          ))}
        </div>

        {/* Bulk order banner */}
        <div className="relative mt-12 overflow-hidden rounded-2xl bg-[#14213d] px-6 py-8 sm:px-9 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="pointer-events-none absolute -right-12 -top-20 h-52 w-52 rounded-full border-[28px] border-white/[0.04]" />

          <div className="relative">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-amber-400">
              Make This Diwali Memorable
            </span>

            <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Planning Corporate Diwali Gifting?
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Share your quantity, budget, preferred products, and branding
              requirements. Let&apos;s create a memorable gifting experience
              for your team and clients.
            </p>
          </div>

          <a
            href={getWhatsAppLink("a corporate Diwali bulk gifting collection")}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-6 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-4 text-sm font-extrabold text-[#14213d] transition hover:-translate-y-1 hover:bg-amber-300 lg:mt-0"
          >
            <MessageCircle size={18} />
            Request Bulk Quote
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
