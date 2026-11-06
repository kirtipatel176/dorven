import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { initialProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export function FeaturedCollection() {
  // Select up to 6 featured products
  const featured = initialProducts.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <section className="py-20 lg:py-28 bg-warmIvory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-charcoal/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-luxury font-bold text-champagneDark block mb-2">
              CURATED SELECTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
              Featured Collection
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-luxury text-charcoal hover:text-champagneDark transition-colors group"
          >
            <span>Explore Entire Catalogue ({initialProducts.length} Pairs)</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
