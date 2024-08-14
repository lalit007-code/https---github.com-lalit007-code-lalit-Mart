import { CategoriesSelection } from "@/components/storefront/CategoriesSelection";
import { FeaturedProducts } from "@/components/storefront/FeaturedProducts";
import { Footer } from "@/components/storefront/Footer";
import { Hero } from "@/components/storefront/Hero";
import { Navbar } from "@/components/storefront/Navbar";

export default function IndexPage() {
  return (
    <div>
      <Hero />
      <CategoriesSelection />
      <FeaturedProducts />
    </div>
  );
}
