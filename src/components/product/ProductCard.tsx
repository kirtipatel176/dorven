import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  showBadge?: boolean;
}

export function ProductCard({ product, showBadge = true }: ProductCardProps) {
  // Determine representative stock status from variants or first variant
  const stockStatus =
    product.variants && product.variants.length > 0
      ? product.variants[0].stockStatus
      : "In Stock";

  const getStockBadgeClass = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Limited Stock":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Out of Stock":
        return "bg-neutral-100 text-neutral-600 border-neutral-200";
      default:
        return "bg-stone-100 text-stone-800 border-stone-200";
    }
  };

  return (
    <div className="product-card group flex flex-col bg-white border border-charcoal/5 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-elevated hover:border-charcoal/15">
      {/* Product Image Container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square w-full bg-softStone overflow-hidden block"
      >
        <Image
          src={product.primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="product-card-image object-cover object-center"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          {product.isOurLabel ? (
            <span className="text-[10px] font-bold tracking-luxury uppercase px-2.5 py-1 bg-charcoal text-white rounded">
              DORVEN Atelier
            </span>
          ) : (
            <span className="text-[10px] font-semibold tracking-subtle uppercase px-2 py-0.5 bg-white/90 backdrop-blur-sm text-charcoal rounded">
              {product.brand}
            </span>
          )}

          {showBadge && (
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded border ${getStockBadgeClass(
                stockStatus
              )}`}
            >
              {stockStatus}
            </span>
          )}
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-mutedGrey mb-1">
            <span className="uppercase tracking-luxury font-medium text-[10px]">
              {product.category}
            </span>
            <span className="text-[10px] text-mutedGrey">{product.gender}</span>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm sm:text-base font-semibold text-charcoal group-hover:text-neutral-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-mutedGrey mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Bottom Price & View Link */}
        <div className="pt-4 mt-4 border-t border-charcoal/5 flex items-center justify-between">
          <div>
            <span className="text-xs text-mutedGrey block text-[10px] uppercase tracking-wider">
              Price
            </span>
            <span className="text-sm sm:text-base font-bold text-charcoal">
              {product.formattedPrice || (product.price ? `₹${product.price.toLocaleString("en-IN")}` : "On Request")}
            </span>
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-luxury text-charcoal hover:text-champagneDark transition-colors group-hover:translate-x-0.5"
          >
            <span>View</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
