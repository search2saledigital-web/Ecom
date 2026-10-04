"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
    UserRound,
    Star,
    Quote,
    ArrowUpRight,
} from "lucide-react";

import "swiper/css";

const reviews = [
    {
        id: 1,
        name: "Rahul Sharma",
        location: "New Delhi",
        product: "Premium Executive Gift Set",
        productImage: "/products/product-1.jpg",
        rating: 5,
        review:
            "Beautiful quality and elegant packaging. The product looks premium and made a wonderful impression.",
    },
    {
        id: 2,
        name: "Priya Mehta",
        location: "Mumbai",
        product: "Elegant Table Vase",
        productImage: "/products/decor-1.jpg",
        rating: 5,
        review:
            "Absolutely loved the design and finishing. It adds a sophisticated touch to my living room.",
    },
    {
        id: 3,
        name: "Amit Verma",
        location: "Gurugram",
        product: "Luxury Office Organizer",
        productImage: "/products/product-2.jpg",
        rating: 5,
        review:
            "Excellent product with a clean, modern look. The quality is impressive and delivery was smooth.",
    },
    {
        id: 4,
        name: "Sneha Kapoor",
        location: "Jaipur",
        product: "Modern Decorative Showpiece",
        productImage: "/products/decor-2.jpg",
        rating: 5,
        review:
            "The detailing is beautiful. It looks even better in person and makes my space feel more luxurious.",
    },
    {
        id: 5,
        name: "Karan Malhotra",
        location: "Noida",
        product: "Corporate Welcome Kit",
        productImage: "/products/product-5.jpg",
        rating: 5,
        review:
            "Great presentation and thoughtful product selection. Perfect for gifting to our team members.",
    },
];

export default function CustomerReviews() {
    return (
        <section className="relative overflow-hidden bg-[#F7F7F5] py-10 sm:py-12 lg:py-16">
            <div className="pointer-events-none absolute -right-32 top-10 h-[400px] w-[400px] rounded-full bg-[#C9A227]/[0.06] blur-[120px]" />

            <div className="relative mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-10">
                {/* Heading */}
                <div className="mb-12 text-center">
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <span className="h-px w-9 bg-[#C9A227]" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A47D12]">
                            Customer Stories
                        </span>
                        <span className="h-px w-9 bg-[#C9A227]" />
                    </div>

                    <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
                        Loved by Our
                        <span className="text-[#C9A227]"> Customers</span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#777777]">
                        Real experiences from customers who love our
                        thoughtfully curated products and attention to detail.
                    </p>
                </div>

                {/* Reviews Slider */}
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    loop
                    speed={800}
                    spaceBetween={20}
                    slidesPerView={1.1}
                    breakpoints={{
                        480: { slidesPerView: 1.3 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="!overflow-visible"
                >
                    {reviews.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="group flex h-full min-h-[330px] flex-col rounded-[1.2rem] border border-black/[0.05] bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] sm:p-6">
                                {/* User */}
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#111111] text-[#C9A227]">
                                        <UserRound size={19} />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="truncate text-sm font-semibold text-[#111111]">
                                            {item.name}
                                        </h3>
                                        <p className="mt-0.5 text-[11px] text-gray-500">
                                            {item.location}
                                        </p>
                                    </div>

                                    <Quote
                                        size={24}
                                        className="ml-auto shrink-0 text-[#C9A227]/40"
                                    />
                                </div>

                                {/* Stars */}
                                <div className="mt-5 flex items-center gap-1">
                                    {Array.from({
                                        length: item.rating,
                                    }).map((_, index) => (
                                        <Star
                                            key={index}
                                            size={14}
                                            fill="#C9A227"
                                            stroke="#C9A227"
                                        />
                                    ))}
                                    <span className="ml-2 text-[10px] font-semibold text-gray-500">
                                        {item.rating}.0 / 5
                                    </span>
                                </div>

                                {/* Review */}
                                <p className="mt-4 flex-1 text-sm leading-7 text-[#666666]">
                                    “{item.review}”
                                </p>

                                {/* Product */}
                                <div className="mt-6 flex items-center gap-3 border-t border-black/[0.07] pt-4">
                                    <div className="relative h-[62px] w-[62px] shrink-0 overflow-hidden rounded-lg bg-[#F1F1EF]">
                                        <Image
                                            src={item.productImage}
                                            alt={item.product}
                                            fill
                                            sizes="62px"
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#A47D12]">
                                            Reviewed Product
                                        </p>
                                        <h4 className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-[#111111]">
                                            {item.product}
                                        </h4>
                                    </div>

                                    <ArrowUpRight
                                        size={16}
                                        className="shrink-0 text-[#C9A227] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}