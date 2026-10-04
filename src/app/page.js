import BestSellers from "@/components/home/BestSeller";
import Categories from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import MarqueeSection from "@/components/home/MarqueeSection";
import NewArrivals from "@/components/home/NewArrivals";
import ProductDetailBanner from "@/components/home/ProductDetailBanner";
import ScrollShowcase from "@/components/home/ScrollShowcase";
import PremiumProductsScroll from "@/components/home/PremiumProducts";
import StatsSection from "@/components/home/StatSection";
import CorporateProducts from "@/components/home/GiftSection";
import DecorativeProducts from "@/components/home/DecorativeProducts";
import CustomerReviews from "@/components/home/Review";
import FAQSection from "@/components/home/FAQ";
import BulkEnquiry from "@/components/home/Form";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <NewArrivals />
      <BestSellers />
      <MarqueeSection />
      <ScrollShowcase />
      <ProductDetailBanner />
      <StatsSection />
      <DecorativeProducts />
      <PremiumProductsScroll />
      <CorporateProducts />
      <CustomerReviews />
      <FAQSection />
      <BulkEnquiry />
    </>
  );
}
