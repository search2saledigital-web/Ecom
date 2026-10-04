"use client";

import React, { useState } from "react";
import {
    ArrowUpRight,
    Building2,
    UserRound,
    Mail,
    Phone,
    Package,
    MessageSquare,
    CheckCircle2,
} from "lucide-react";

const initialForm = {
    name: "",
    company: "",
    email: "",
    phone: "",
    category: "",
    quantity: "",
    message: "",
};

export default function BulkEnquiry() {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const subject = encodeURIComponent(
            `Bulk Enquiry - ${form.category}`
        );

        const body = encodeURIComponent(`
Name: ${form.name}
Company: ${form.company}
Email: ${form.email}
Phone: ${form.phone}
Product Category: ${form.category}
Quantity: ${form.quantity}

Message:
${form.message}
        `);

        window.location.href = `mailto: sales@yourdomain.com?subject=${subject}&body=${body}`;

        setSubmitted(true);
    };

    const inputClass =
        "w-full border-b border-black/15 bg-transparent py-3.5 text-sm text-[#111111] outline-none transition-colors placeholder:text-gray-400 focus:border-[#C9A227]";

    return (
        <section className="relative overflow-hidden bg-[#111111] py-10 sm:py-12 lg:py-16">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-[#C9A227]/10" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full border border-[#C9A227]/10" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-[#C9A227]/[0.07] blur-[130px]" />

            <div className="relative mx-auto grid max-w-[1350px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20 lg:px-10">
                {/* Left Content */}
                <div className="text-white">
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-9 bg-[#C9A227]" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C9A227]">
                            Business Enquiries
                        </span>
                    </div>

                    <h2 className="font-serif text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                        Let’s Make
                        <br />
                        Something
                        <br />
                        <span className="text-[#C9A227]">
                            Exceptional.
                        </span>
                    </h2>

                    <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
                        Planning a bulk purchase, corporate gifting,
                        or a special requirement? Tell us what you need
                        and our team will help you find the right solution.
                    </p>

                    <div className="mt-10 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A227]/30 text-[#C9A227]">
                                <Package size={19} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">
                                    Bulk & Wholesale Orders
                                </p>
                                <p className="mt-1 text-xs text-white/45">
                                    Tailored solutions for larger quantities
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A227]/30 text-[#C9A227]">
                                <Building2 size={19} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">
                                    Corporate Gifting
                                </p>
                                <p className="mt-1 text-xs text-white/45">
                                    Thoughtful gifts for teams and clients
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A227]/30 text-[#C9A227]">
                                <MessageSquare size={19} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">
                                    Personal Assistance
                                </p>
                                <p className="mt-1 text-xs text-white/45">
                                    Get help choosing the right products
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-white/10 pt-6">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                            We would love to hear from you
                        </p>
                        <p className="mt-2 font-serif text-xl text-[#C9A227]">
                            Your vision. Our solutions.
                        </p>
                    </div>
                </div>

                {/* Form Panel */}
                <div className="rounded-[1.5rem] bg-[#F7F7F5] p-5 shadow-2xl sm:p-8 lg:p-10">
                    <div className="mb-8">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A47D12]">
                            Get In Touch
                        </span>
                        <h3 className="mt-3 font-serif text-3xl font-medium text-[#111111] sm:text-4xl">
                            Request a Quote
                        </h3>
                        <p className="mt-3 text-xs leading-6 text-gray-500">
                            Share your requirements and our team will get
                            back to you.
                        </p>
                    </div>

                    {submitted ? (
                        <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
                            <CheckCircle2
                                size={48}
                                className="text-[#A47D12]"
                            />
                            <h4 className="mt-5 font-serif text-2xl text-[#111111]">
                                Enquiry Prepared!
                            </h4>
                            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
                                Your email application should open with
                                the enquiry details. Please send the email
                                to complete your request.
                            </p>
                            <button
                                onClick={() => {
                                    setForm(initialForm);
                                    setSubmitted(false);
                                }}
                                className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#A47D12] underline underline-offset-4"
                            >
                                Send Another Enquiry
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                        <UserRound size={13} />
                                        Full Name *
                                    </label>
                                    <input
                                        required
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                        <Building2 size={13} />
                                        Company Name
                                    </label>
                                    <input
                                        name="company"
                                        value={form.company}
                                        onChange={handleChange}
                                        placeholder="Your company"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                        <Mail size={13} />
                                        Email Address *
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                        <Phone size={13} />
                                        Phone Number *
                                    </label>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                        Product Category *
                                    </label>
                                    <select
                                        required
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className={`${inputClass} cursor-pointer`}
                                    >
                                        <option value="">
                                            Select category
                                        </option>
                                        <option value="Corporate Gifts">
                                            Corporate Gifts
                                        </option>
                                        <option value="Office Products">
                                            Office Products
                                        </option>
                                        <option value="Decorative Products">
                                            Decorative Products
                                        </option>
                                        <option value="Lifestyle Products">
                                            Lifestyle Products
                                        </option>
                                        <option value="Other">
                                            Other
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                        Required Quantity *
                                    </label>
                                    <input
                                        required
                                        name="quantity"
                                        value={form.quantity}
                                        onChange={handleChange}
                                        placeholder="e.g. 100 pieces"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                    <MessageSquare size={13} />
                                    Tell Us About Your Requirement
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Describe your products, budget, customization, or delivery requirements..."
                                    className={`${inputClass} resize-none`}
                                />
                            </div>

                            <button
                                type="submit"
                                className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#111111] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#C9A227] hover:text-black"
                            >
                                Submit Enquiry
                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </button>

                            <p className="text-center text-[10px] leading-5 text-gray-400">
                                By submitting, you agree to be contacted
                                regarding your enquiry.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}