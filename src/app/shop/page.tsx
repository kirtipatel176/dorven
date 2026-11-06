import { Suspense } from "react";
import { initialProducts } from "@/data/products";
import { CatalogueView } from "@/components/product/CatalogueView";

export const metadata = {
  title: "Shop Catalogue — Curated Luxury & Athletic Footwear",
  description:
    "Explore our complete footwear catalogue. Filter by brand, style category, UK size, and availability.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs uppercase tracking-luxury text-mutedGrey">
          Loading footwear collection...
        </div>
      }
    >
      <CatalogueView initialProducts={initialProducts} />
    </Suspense>
  );
}
