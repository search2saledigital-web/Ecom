import BestSellers from "@/components/home/BestSeller";
import Categories from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import MarqueeSection from "@/components/home/MarqueeSection";
import NewArrivals from "@/components/home/NewArrivals";
import ProductDetailBanner from "@/components/home/ProductDetailBanner";
import ScrollShowcase from "@/components/home/ScrollShowcase";
import PremiumProductsScroll from "@/components/home/PremiumProducts";
import StatsSection from "@/components/home/StatSection";

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
      <PremiumProductsScroll />
    </>
  );
}
