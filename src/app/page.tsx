import { HeroSection } from "@/components/home/HeroSection";
import { BrandAuthenticityStrip } from "@/components/home/BrandAuthenticityStrip";
import { OurPhilosophy } from "@/components/home/OurPhilosophy";
import { ShopByCollection } from "@/components/home/ShopByCollection";
import { BestsellingCollection } from "@/components/home/BestsellingCollection";
import { SignatureCollection } from "@/components/home/SignatureCollection";
import { CraftsmanshipSection } from "@/components/home/CraftsmanshipSection";
import { FeaturedBrandsSection } from "@/components/home/FeaturedBrandsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-[#F8F6F2]">
      {/* 1. Cinematic Fullscreen Campaign Hero */}
      <HeroSection />

      {/* 2. Brand Authenticity & Sourcing Strip */}
      <BrandAuthenticityStrip />

      {/* 3. Section 01 — Our Philosophy */}
      <OurPhilosophy />

      {/* 4. Section 02 — Shop by Collection */}
      <ShopByCollection />

      {/* 5. Section 03 — Bestselling Collection */}
      <BestsellingCollection />

      {/* 6. Signature Collection — Primary In-House Design Reference */}
      <SignatureCollection />

      {/* 7. Section 04 — Craftsmanship & Materials */}
      <CraftsmanshipSection />

      {/* 8. Section 05 — Featured Brands */}
      <FeaturedBrandsSection />

      {/* 9. Section 06 — Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
