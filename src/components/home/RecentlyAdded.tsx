import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { initialProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export function RecentlyAdded() {
  // Select up to 4 products that are recently added and NOT in the featured list
  const recentProducts = initialProducts
    .filter((p) => p.isRecentlyAdded && !p.isFeatured)
    .slice(0, 4);

  if (recentProducts.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-warmIvory border-t border-charcoal/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury font-bold text-champagneDark mb-2">
              <Clock className="h-3.5 w-3.5" />
              <span>FRESH ARRIVALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
              Recently Added
            </h2>
          </div>
          <Link
            href="/shop?sort=newest"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-luxury text-charcoal hover:text-champagneDark transition-colors group"
          >
            <span>View All New Releases</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
