import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { initialProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export function SignatureCollection() {
  const ourLabelProducts = initialProducts.filter((p) => p.isOurLabel).slice(0, 3);

  if (ourLabelProducts.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-charcoal text-white relative overflow-hidden">
      {/* Background Accent Subtle Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-champagne/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Intro Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 border-b border-white/10 pb-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/10 text-champagne text-[11px] font-medium tracking-luxury uppercase mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
              <span>THE EXCLUSIVE IN-HOUSE LABEL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              DORVEN Signature
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
              Sculpted from certified Italian calfskin with architectural lightweight soles. Handcrafted in limited seasonal batches for clients who appreciate understated distinction and peerless ergonomic luxury.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-champagne" />
                <span>Full-Grain Italian Calfskin</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-champagne" />
                <span>Anatomical Cork Footbeds</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-champagne" />
                <span>Vibram Featherlight Outsoles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-champagne" />
                <span>Hand-Finished in Atelier</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex lg:justify-end">
            <Link
              href="/our-label"
              className="inline-flex items-center gap-3 px-8 py-4 bg-champagne text-charcoal font-bold text-xs uppercase tracking-luxury rounded hover:bg-champagneLight transition-all group shadow-elevated"
            >
              <span>Explore Our Label Story</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Featured In-House Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ourLabelProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
