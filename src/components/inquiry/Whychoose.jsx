
import {
  Award,
  Ruler,
  Globe2,
  Headset,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const advantages = [
  {
    number: "01",
    icon: Award,
    title: "Custom Identity & Heraldry",
    description:
      "High-precision laser engraving, premium foil stamping, and custom finishes tailored to your exact brand identity.",
    tag: "Bespoke Customization",
  },
  {
    number: "02",
    icon: Ruler,
    title: "Direct Atelier Scalability",
    description:
      "Exceptional craftsmanship for individual orders and bulk production, with competitive direct pricing.",
    tag: "Craftsmanship at Scale",
  },
  {
    number: "03",
    icon: Globe2,
    title: "White-Glove Delivery",
    description:
      "Coordinated shipping and personalized delivery options to help your products reach destinations worldwide.",
    tag: "Worldwide Assistance",
  },
  {
    number: "04",
    icon: Headset,
    title: "Dedicated Support",
    description:
      "Personalized assistance, clear communication, and timely updates throughout your order journey.",
    tag: "Customer First",
  },
];

export default function Whychoose() {
  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden bg-[#faf9f6] px-4 py-6 sm:px-6 sm:py-13"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-amber-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-amber-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center sm:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-700 sm:text-sm">
            <span className="h-px w-7 bg-amber-600" />
            The Standard of Excellence
            <span className="h-px w-7 bg-amber-600" />
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Why Choose{" "}
            <span className="font-serif italic font-medium text-amber-700">
              Us?
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base ">
            From personalized customization to dependable delivery, we combine
            quality, craftsmanship, and customer-focused service to make every
            order a seamless experience.
          </p>
        </div>

        {/* Advantage cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          {advantages.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5 sm:p-7 "
              >
                {/* Card top line */}
                <div className="absolute left-0 top-0 h-1 w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />

                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 text-amber-700 transition-all duration-300 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-white">
                    <Icon size={27} strokeWidth={1.7} />
                  </div>

                  <span className="font-serif text-3xl text-stone-200 transition-colors duration-300 group-hover:text-amber-200">
                    {item.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-amber-800">
                  {item.title}
                </h3>

                <p className="mt-3 flex-grow text-sm leading-5 text-slate-600">
                  {item.description}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-100 pt-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-stone-500 sm:text-xs">
                    {item.tag}
                  </span>

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-50 text-stone-500 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white">
                    <ArrowUpRight size={17} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom banner */}
        <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-amber-200/70 bg-gradient-to-r from-[#fffaf0] via-white to-[#fffaf0] p-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <Sparkles size={22} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Quality in Every Detail
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Have a specific requirement? Let’s find the right solution
                for your needs.
              </p>
            </div>
          </div>

          <a
            href="#product-inquiry"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-500/30"
          >
            Get in Touch
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
