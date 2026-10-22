"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function StickyButton() {
  const phoneNumber = "919205012983";

  const message = encodeURIComponent(
    "Hello, I would like to know more about your products and bulk orders."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#20BA5A] sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      <FaWhatsapp className="text-3xl sm:text-4xl" />
      <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
}