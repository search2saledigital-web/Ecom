"use client";

import { useState, useEffect } from "react";
import {
  X,
  UserRound,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function InquiryPopup({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "mobile"
          ? value.replace(/\D/g, "").slice(0, 10)
          : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
    setIsSubmitted(false);
  };

  const validateForm = () => {
    const newErrors = {};
    const name = formData.name.trim();
    const mobile = formData.mobile;
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name) {
      newErrors.name = "Please enter your full name.";
    } else if (name.length < 2 || name.length > 80) {
      newErrors.name = "Name must contain 2–80 characters.";
    } else if (!/^[\p{L}\p{M} .'-]+$/u.test(name)) {
      newErrors.name = "Please enter a valid name.";
    }

    if (!mobile) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
      newErrors.mobile = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!message) {
      newErrors.message = "Please enter your requirements.";
    } else if (message.length < 10) {
      newErrors.message = "Message must contain at least 10 characters.";
    } else if (message.length > 1000) {
      newErrors.message = "Message cannot exceed 1000 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const whatsappMessage = [
      "Hello Aura & Gold, I would like to make an inquiry.",
      "",
      `Name: ${formData.name.trim()}`,
      `Mobile: +91 ${formData.mobile}`,
      `Email: ${formData.email.trim()}`,
      "",
      "Requirements:",
      formData.message.trim(),
    ].join("\n");

    const whatsappURL = `https://wa.me/919205012983?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    const newWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    if (newWindow) {
      setIsSubmitted(true);
    } else {
      // Fallback when the browser blocks opening a new tab.
      window.location.href = whatsappURL;
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-[#FAF9F6] py-3.5 pl-11 pr-4 text-sm text-[#252525] outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-orange-100 ${
      errors[field]
        ? "border-red-400 focus:border-red-400"
        : "border-gray-200 focus:border-orange-400"
    }`;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-[#111827]/70 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-popup-title"
        className="relative my-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl"
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-[#111827] px-5 py-6 text-white sm:px-8 sm:py-7">
          <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full border-[24px] border-white/[0.04]" />
          <div className="pointer-events-none absolute -bottom-16 right-24 h-32 w-32 rounded-full bg-orange-500/10 blur-2xl" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close inquiry form"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <X size={19} />
          </button>

          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF9800] text-white shadow-lg">
              <MessageSquare size={21} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400 sm:text-xs">
                We&apos;re here to help
              </p>

              <h2
                id="inquiry-popup-title"
                className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl"
              >
                Send an Inquiry
              </h2>
            </div>
          </div>

          <p className="relative mt-4 max-w-md text-xs leading-5 text-gray-300 sm:text-sm">
            Fill in your details and tell us what you&apos;re looking for.
            Our team will help you find the right solution.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="max-h-[calc(100dvh-180px)] space-y-3 overflow-y-auto px-5 py-5 sm:px-8 sm:py-5"
        >
          {isSubmitted && (
            <div
              role="status"
              className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800"
            >
              WhatsApp has opened. Press Send there to deliver your inquiry.
            </div>
          )}

          {/* Name */}
          <div>
            <label
              htmlFor="inquiry-name"
              className="mb-2 block text-xs font-bold text-gray-700 sm:text-sm"
            >
              Full Name <span className="text-orange-600">*</span>
            </label>

            <div className="relative">
              <UserRound
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="inquiry-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                maxLength={80}
                aria-invalid={Boolean(errors.name)}
                className={inputClass("name")}
              />
            </div>

            {errors.name && (
              <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label
              htmlFor="inquiry-mobile"
              className="mb-2 block text-xs font-bold text-gray-700 sm:text-sm"
            >
              Mobile Number <span className="text-orange-600">*</span>
            </label>

            <div className="relative">
              <Phone
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <span className="absolute left-10 top-1/2 -translate-y-1/2 border-r border-gray-300 pr-2 text-sm text-gray-600">
                +91
              </span>

              <input
                id="inquiry-mobile"
                name="mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="Enter 10-digit number"
                value={formData.mobile}
                onChange={handleChange}
                maxLength={10}
                aria-invalid={Boolean(errors.mobile)}
                className={`${inputClass("mobile")} pl-[5.1rem]`}
              />
            </div>

            {errors.mobile && (
              <p className="mt-1.5 text-xs text-red-600">{errors.mobile}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="inquiry-email"
              className="mb-2 block text-xs font-bold text-gray-700 sm:text-sm"
            >
              Email Address <span className="text-orange-600">*</span>
            </label>

            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="inquiry-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                maxLength={254}
                aria-invalid={Boolean(errors.email)}
                className={inputClass("email")}
              />
            </div>

            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="inquiry-message"
              className="mb-2 block text-xs font-bold text-gray-700 sm:text-sm"
            >
              Your Requirements <span className="text-orange-600">*</span>
            </label>

            <textarea
              id="inquiry-message"
              name="message"
              rows={2}
              placeholder="Tell us about the product, quantity, or service you need..."
              value={formData.message}
              onChange={handleChange}
              maxLength={1000}
              aria-invalid={Boolean(errors.message)}
              className={`${inputClass("message")} min-h-8 resize-y`}
            />

            <div className="mt-1 flex items-start justify-between gap-3">
              {errors.message ? (
                <p className="text-xs text-red-600">{errors.message}</p>
              ) : (
                <p className="text-[10px] leading-5 text-gray-400">
                  Include your product or order requirements.
                </p>
              )}

              <span className="shrink-0 text-[10px] text-gray-400">
                {formData.message.length}/1000
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF9800] px-5 py-4 text-xs font-extrabold uppercase tracking-[0.12em] text-white shadow-lg shadow-orange-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ed8900] hover:shadow-orange-200 focus:outline-none focus:ring-4 focus:ring-orange-200 sm:text-sm"
          >
            Submit Inquiry
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <p className="flex items-center justify-center gap-1.5 text-center text-[10px] leading-5 text-gray-400 sm:text-xs">
            <ShieldCheck size={13} className="shrink-0 text-green-600" />
            Your details will be included in your WhatsApp inquiry.
          </p>
        </form>
      </div>
    </div>
  );
}
