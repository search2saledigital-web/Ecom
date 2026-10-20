
"use client";

import { useState } from "react";
import {
  Package,
  ShieldCheck,
  Truck,
  Headphones,
  MapPin,
  Phone,
  User,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    place: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect your API here to save the inquiry.
    console.log("Product Inquiry:", formData);

    setSubmitted(true);
    setFormData({
      name: "",
      phone: "",
      place: "",
      message: "",
    });
  };

  return (
    <section
      id="product-inquiry"
      className="relative overflow-hidden bg-[#f7f8fa] px-4 py-6 sm:px-6 sm:py-13 "
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT CONTENT */}
        <div className="flex flex-col">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            PRODUCT ENQUIRY
          </div>

          <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Looking for the
            <span className="text-amber-600"> Right Product?</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Tell us what you need. Our team will help you find the right
            product, provide pricing details, and assist you with your
            purchase requirements.
          </p>

          {/* Benefits */}
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            <div className="group flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                <Package size={23} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Quality Products
                </h3>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Reliable products for your requirements.
                </p>
              </div>
            </div>

            <div className="group flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                <ShieldCheck size={23} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Trusted Service
                </h3>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Helpful guidance from our team.
                </p>
              </div>
            </div>

            <div className="group flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                <Truck size={23} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Delivery Assistance
                </h3>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Discuss delivery to your location.
                </p>
              </div>
            </div>

            <div className="group flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                <Headphones size={23} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Personal Assistance
                </h3>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Get help choosing the right product.
                </p>
              </div>
            </div>
          </div>

          {/* Trust message */}
          <div className="mt-8 flex items-start gap-3 border-t border-slate-200 pt-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <ShieldCheck size={21} />
            </div>
            <div>
              <p className="font-semibold text-slate-800">
                Your enquiry matters to us
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Share your requirements and our team will get in touch to
                discuss the next steps.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: INQUIRY FORM */}
        <div className="w-full">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
            {/* Form header */}
            <div className="relative overflow-hidden bg-slate-900 px-6 py-7 sm:p-5">
              <div className="absolute -right-8 -top-16 h-44 w-44 rounded-full border-[24px] border-white/5" />
              <div className="absolute -bottom-20 right-24 h-36 w-36 rounded-full bg-amber-500/10 blur-2xl" />

              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
                  <MessageSquare size={24} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
                    We're here to help
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                    Send an Enquiry
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Fill in your details and tell us what you're looking for.
                  </p>
                </div>
              </div>
            </div>

            {/* Form body */}
            <div className="p-6 sm:p-9">
              {submitted ? (
                <div
                  role="status"
                  className="flex min-h-64 flex-col items-center justify-center text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="mt-5 text-xl font-bold text-slate-900">
                    Thank you for your enquiry!
                  </h4>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Your form passed the initial validation. Connect your
                    backend to ensure your enquiry reaches our team.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 font-semibold text-amber-700 transition hover:text-amber-800"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="inquiry-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="inquiry-phone"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="inquiry-phone"
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        minLength={7}
                        maxLength={20}
                        pattern="[+]?[0-9() .-]{7,20}"
                        title="Enter a valid phone number."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                      />
                    </div>
                  </div>

                  {/* Place */}
                  <div>
                    <label
                      htmlFor="inquiry-place"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      City / Place <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="inquiry-place"
                        type="text"
                        name="place"
                        autoComplete="address-level2"
                        placeholder="Enter your city or location"
                        value={formData.place}
                        onChange={handleChange}
                        required
                        maxLength={150}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="inquiry-message"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Product Requirements / Message{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      rows={4}
                      placeholder="Tell us which product you need, quantity, specifications, or any questions..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={2000}
                      className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                    />
                    <p className="mt-2 text-right text-xs text-slate-400">
                      {formData.message.length}/2000 characters
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-amber-500 px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-950 shadow-lg shadow-amber-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-500/30 active:translate-y-0"
                  >
                    Submit Enquiry
                    <ArrowRight
                      size={19}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>

                  <p className="flex items-center justify-center gap-2 text-center text-xs leading-5 text-slate-500">
                    <ShieldCheck
                      size={15}
                      className="shrink-0 text-emerald-600"
                    />
                    Your contact details are used to respond to your enquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
