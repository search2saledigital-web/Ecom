import DiwaliSpecial from '@/components/Festivals/DiwaliSpecial'
import Hero from '@/components/home/Hero'
import BestSellerSlider from '@/components/inquiry/BestSellerSlider'
import CTA from '@/components/inquiry/CTA'
import FeaturedProduct from '@/components/inquiry/FeaturedProduct'
import GiftBanner from '@/components/inquiry/GiftBanner'
import InquiryForm from '@/components/inquiry/InquiryForm'
import ProductShowcase from '@/components/inquiry/ProductShowcase'
import Whychoose from '@/components/inquiry/Whychoose'
import React from 'react'

export default function Inquiry() {
  return (
    <>
    <Hero/> 
    <ProductShowcase/>
    <InquiryForm/>
    <DiwaliSpecial/>
    <BestSellerSlider/>
    <GiftBanner />
    <FeaturedProduct />
    <Whychoose/>
    <CTA/>
    </>
  )
}
