"use client";

import { useState, useCallback } from "react";
import {
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import InquiryPopup from "../main/InquiryPopup";

export default function CTA() {
  const [showInquiry, setShowInquiry] = useState(false);

  const closeInquiry = useCallback(() => {
    setShowInquiry(false);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#111827] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-amber-400/5 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          {/* Guarantee information */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-400 sm:h-16 sm:w-16">
              <ShieldCheck size={32} strokeWidth={1.7} />
            </div>

            <div className="max-w-2xl">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Sparkles size={15} className="text-amber-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400 sm:text-xs">
                  Our Promise to You
                </span>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                The Aura &amp; Gold Guarantee
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                Exceptional craftsmanship, support for courier-related issues,
                and dedicated assistance throughout your order journey.
              </p>

              {/* Trust points */}
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {[
                  "Craftsmanship Focused",
                  "Delivery Assistance",
                  "Dedicated Support",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 sm:text-sm"
                  >
                    <ShieldCheck size={15} className="text-amber-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:shrink-0">
            <button
              type="button"
              onClick={() => setShowInquiry(true)}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-center text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-400/30 sm:px-7"
            >
              Request a Quote
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <a
              href="https://wa.me/919205012983?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 sm:px-7"
            >
              <MessageCircle size={19} className="text-emerald-400" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Controlled inquiry popup */}
      <InquiryPopup
        isOpen={showInquiry}
        onClose={closeInquiry}
      />
    </>
  );
}
