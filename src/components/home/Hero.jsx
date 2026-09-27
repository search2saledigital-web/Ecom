"use client";

import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const banners = [
    {
        id: 1,
        image: "/1.jpg",
        alt: "Ecommerce Banner 1",
    },
    {
        id: 2,
        image: "/2.jpg",
        alt: "Ecommerce Banner 2",
    },
];

export default function Hero() {
    return (
        <section className="w-full overflow-hidden">
            <Swiper
                modules={[
                    Autoplay,
                    Pagination,
                    EffectFade,
                ]}
                effect="fade"
                fadeEffect={{
                    crossFade: true,
                }}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                speed={1000}
                className="hero-swiper w-full"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div className="relative aspect-[16/6] w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[520px]">

                            <Image
                                src={banner.image}
                                alt={banner.alt}
                                fill
                                priority={banner.id === 1}
                                sizes="100vw"
                                className="object-cover"
                            />

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Swiper Pagination Styling */}
            <style jsx global>{`
                .hero-swiper .swiper-pagination {
                    bottom: 24px !important;
                }

                .hero-swiper .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    opacity: 0.6;
                    background: #ffffff;
                    transition: all 0.3s ease;
                }

                .hero-swiper .swiper-pagination-bullet-active {
                    width: 28px;
                    border-radius: 999px;
                    opacity: 1;
                    background: #c9a227;
                }
            `}</style>
        </section>
    );
}