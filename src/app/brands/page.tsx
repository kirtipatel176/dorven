import type { Metadata } from "next";
import { brandsData } from "@/data/brands";
import { initialProducts } from "@/data/products";
import { BrandsDirectoryView } from "@/components/brands-directory/BrandsDirectoryView";

export const metadata: Metadata = {
  title: "Brand Directory — Names Worth Knowing",
  description:
    "An independent selection of footwear labels defined by design, heritage and individuality. Explore authentic collections from Nike, Adidas Originals, New Balance, Asics, Birkenstock, and our signature D'ORVEN Atelier.",
  openGraph: {
    title: "The D'ORVEN Brand Directory — Names Worth Knowing",
    description:
      "Curated international footwear houses and our signature handcrafted atelier label. Guaranteed 100% authenticity verified.",
    images: [
      {
        url: "/images/hero/hero-1.jpg",
        width: 1200,
        height: 675,
        alt: "D'ORVEN Luxury Brand Directory",
      },
    ],
  },
};

export default function BrandsPage() {
  return (
    <>
      {/* Structured JSON-LD Data for Luxury Fashion Brand Directory */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "D'ORVEN Brand Directory",
            description:
              "An independent selection of footwear labels defined by design, heritage and individuality.",
            url: "https://dorvenfootwear.in/brands",
            hasPart: brandsData.map((brand) => ({
              "@type": "Brand",
              name: brand.name,
              url: `https://dorvenfootwear.in/brands/${brand.slug}`,
              description: brand.description,
            })),
          }),
        }}
      />

      <BrandsDirectoryView
        brands={brandsData}
        products={initialProducts}
      />
    </>
  );
}
