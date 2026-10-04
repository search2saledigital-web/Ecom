"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Minus,
    MessageCircle,
    ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const faqs = [
    {
        question: "What types of products do you offer?",
        answer:
            "We offer a curated collection of corporate gifts, office essentials, decorative products, lifestyle accessories, and premium gifting solutions designed for personal and professional use.",
    },
    {
        question: "Do you offer bulk or corporate orders?",
        answer:
            "Yes, we accept bulk and corporate orders. You can contact our team for customized gifting requirements, quantity-based pricing, and product recommendations.",
    },
    {
        question: "Can I customize products for gifting?",
        answer:
            "Selected products may be available for personalization or customized gifting. Please contact our team with your requirements to check available options.",
    },
    {
        question: "How can I track my order?",
        answer:
            "Once your order is dispatched, tracking information will be shared through your registered contact details, allowing you to follow your shipment.",
    },
    {
        question: "What payment methods are accepted?",
        answer:
            "We support the payment methods displayed during checkout. Available options may include UPI, debit cards, credit cards, and other supported payment gateways.",
    },
    {
        question: "What is your return and exchange policy?",
        answer:
            "Returns and exchanges are subject to our product-specific policy. Please review the return policy before placing your order or contact our support team for assistance.",
    },
];

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="relative overflow-hidden bg-[#F7F7F5] py-10 sm:py-12 lg:py-16">
            <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-[#C9A227]/[0.06] blur-[120px]" />

            <div className="relative mx-auto grid max-w-[1350px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
                {/* Left Content */}
                <div className="lg:sticky lg:top-28 lg:h-fit">
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-9 bg-[#C9A227]" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A47D12]">
                            Need Help?
                        </span>
                    </div>

                    <h2 className="font-serif text-4xl font-medium leading-[1.08] tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
                        Frequently
                        <br />
                        Asked
                        <br />
                        <span className="text-[#C9A227]">
                            Questions.
                        </span>
                    </h2>

                    <p className="mt-6 max-w-md text-sm leading-7 text-[#777777]">
                        Find answers to common questions about our products,
                        orders, payments, and gifting services.
                    </p>

                    <div className="mt-9 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A227]/10 text-[#A47D12]">
                            <MessageCircle size={18} />
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-[#111111]">
                                Still have questions?
                            </p>
                            <p className="mt-1 text-[10px] text-gray-500">
                                Our team is happy to help.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/contact"
                        className="group mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#111111] transition-colors hover:text-[#A47D12]"
                    >
                        Contact Our Team
                        <ArrowUpRight
                            size={15}
                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                    </Link>
                </div>

                {/* FAQ Accordion */}
                <div className="border-t border-black/10">
                    {faqs.map((faq, index) => {
                        const isOpen = activeIndex === index;

                        return (
                            <div
                                key={index}
                                className="border-b border-black/10"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveIndex(
                                            isOpen ? -1 : index
                                        )
                                    }
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center justify-between gap-5 py-6 text-left sm:py-7"
                                >
                                    <div className="flex items-start gap-4">
                                        <span
                                            className={`pt-1 text-[10px] font-semibold tracking-wider transition-colors ${isOpen
                                                ? "text-[#C9A227]"
                                                : "text-gray-400"
                                                }`}
                                        >
                                            0{index + 1}
                                        </span>

                                        <h3
                                            className={`font-serif text-lg font-medium leading-snug transition-colors sm:text-xl ${isOpen
                                                ? "text-[#A47D12]"
                                                : "text-[#111111]"
                                                }`}
                                        >
                                            {faq.question}
                                        </h3>
                                    </div>

                                    <span
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen
                                            ? "border-[#C9A227] bg-[#C9A227] text-black"
                                            : "border-black/10 bg-white text-[#111111]"
                                            }`}
                                    >
                                        {isOpen ? (
                                            <Minus size={16} />
                                        ) : (
                                            <Plus size={16} />
                                        )}
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            transition={{
                                                duration: 0.35,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <p className="max-w-2xl pb-7 pl-8 text-sm leading-7 text-[#777777] sm:pl-10">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}