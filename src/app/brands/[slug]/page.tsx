import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { brandsData } from "@/data/brands";
import { initialProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return brandsData.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const brand = brandsData.find((b) => b.slug === slug);
  if (!brand) return { title: "Brand Not Found" };

  return {
    title: `${brand.name} Collection | DORVEN Footwear`,
    description: brand.description,
  };
}

export default async function BrandDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = brandsData.find((b) => b.slug === slug);

  if (!brand) {
    notFound();
  }

  // Find products associated with this brand
  const brandProducts = initialProducts.filter(
    (p) =>
      p.brand.toLowerCase() === brand.name.toLowerCase() ||
      (brand.name.toLowerCase().includes("adidas") && p.brand.toLowerCase().includes("adidas")) ||
      (brand.isExclusiveLabel && p.isOurLabel)
  );

  return (
    <div className="py-10 sm:py-16 bg-warmIvory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/brands"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury text-mutedGrey hover:text-charcoal transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Brands</span>
          </Link>
        </div>

        {/* Brand Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-charcoal text-white mb-16 shadow-elevated">
          <div className="relative h-[320px] sm:h-[400px] w-full">
            <Image
              src={brand.heroImage}
              alt={brand.name}
              fill
              priority
              className="object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 max-w-3xl">
              <span className="text-[11px] uppercase tracking-luxury font-bold text-champagne block mb-2">
                ESTABLISHED {brand.foundedYear} • {brand.origin} {brand.categoryLabel ? `• ${brand.categoryLabel}` : ""}
              </span>
              <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight mb-2">
                {brand.name}
              </h1>
              {brand.tagline && (
                <p className="text-sm italic text-champagne/90 mb-3 font-serif">
                  &ldquo;{brand.tagline}&rdquo;
                </p>
              )}
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mb-4">
                {brand.description}
              </p>
              {brand.signature && (
                <div className="text-xs text-white/90 font-mono tracking-wider">
                  <span className="text-champagne font-semibold uppercase">Signature Silhouettes:</span> {brand.signature}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="border-b border-charcoal/10 pb-6 mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-charcoal">
              Available {brand.name} Pairs ({brandProducts.length})
            </h2>
            <p className="text-xs text-mutedGrey mt-1">
              Guaranteed 100% authentic inventory. Sourced with verification.
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs font-semibold uppercase tracking-luxury text-charcoal hover:underline"
          >
            View All Brands
          </Link>
        </div>

        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {brandProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-charcoal/10 p-8">
            <p className="text-sm text-mutedGrey mb-4">
              New seasonal arrivals from {brand.name} are currently undergoing authentication.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-charcoal text-white text-xs font-semibold uppercase tracking-luxury rounded"
            >
              <span>Explore Entire Catalogue</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
