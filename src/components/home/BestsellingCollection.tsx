"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { initialProducts } from "@/data/products";

export function BestsellingCollection() {
  const shouldReduceMotion = useReducedMotion();

  // Curate 4 verified bestsellers from actual database (sorted by popularity score)
  const bestsellers = [...initialProducts]
    .sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0))
    .slice(0, 4);

  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-[#F8F6F2] border-t border-[#171717]/10">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 pb-6 border-b border-[#171717]/10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-6 bg-[#CDB995]" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#918C84]">
                Curated Rotation
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#171717] tracking-tight">
              Bestselling Collection
            </h2>
          </div>

          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.24em] font-medium text-[#171717] hover:text-[#918C84] transition-colors"
          >
            <span>View All Releases ({initialProducts.length})</span>
            <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>

        {/* 4-Column Borderless Luxury Product Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {bestsellers.map((product, index) => {
            const hasMultipleImages =
              product.galleryImages && product.galleryImages.length > 1;
            const secondaryImage = hasMultipleImages
              ? product.galleryImages[1]
              : product.primaryImage;

            return (
              <motion.article
                key={product.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col"
              >
                {/* Borderless Product Image Frame */}
                <Link
                  href={`/product/${product.slug}`}
                  className="relative aspect-[4/5] w-full bg-[#EAE3D8] overflow-hidden mb-6 block"
                >
                  {/* Primary Product Photo */}
                  <Image
                    src={product.primaryImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={`object-cover object-center transition-all duration-700 ease-out ${
                      hasMultipleImages
                        ? "group-hover:opacity-0 group-hover:scale-105"
                        : "group-hover:scale-105"
                    }`}
                  />

                  {/* Secondary Image on Hover if available */}
                  {hasMultipleImages && (
                    <Image
                      src={secondaryImage}
                      alt={`${product.name} alternate view`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  )}

                  {/* Subtle Origin / Atelier Tag */}
                  <div className="absolute top-4 left-4 pointer-events-none">
                    {product.isOurLabel ? (
                      <span className="text-[9px] uppercase tracking-[0.22em] font-mono font-medium px-2 py-1 bg-[#171717] text-[#F8F6F2]">
                        D&apos;ORVEN Atelier
                      </span>
                    ) : (
                      <span className="text-[9px] uppercase tracking-[0.22em] font-mono font-medium px-2 py-1 bg-[#F8F6F2]/90 backdrop-blur-sm text-[#171717]">
                        {product.brand}
                      </span>
                    )}
                  </div>

                  {/* Hover Quick Size Pill Indicator */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-[#171717]/90 backdrop-blur-sm px-3 py-2 text-center">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#F8F6F2]">
                          Sizes: {product.sizes.slice(0, 4).join(" • ")}
                          {product.sizes.length > 4 ? " +" : ""}
                        </span>
                      </div>
                    </div>
                  )}
                </Link>

                {/* Minimalist Borderless Product Information */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#918C84] mb-2 font-mono">
                      <span>{product.brand}</span>
                      <span>{product.category}</span>
                    </div>

                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-serif text-lg sm:text-xl text-[#171717] font-normal leading-snug hover:text-[#918C84] transition-colors line-clamp-1 mb-2">
                        {product.name}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#171717]/10 mt-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#918C84] font-mono">
                      Acquisition
                    </span>
                    <span className="font-sans text-sm font-semibold text-[#171717]">
                      {product.formattedPrice ||
                        (typeof product.price === "number"
                          ? `₹${product.price.toLocaleString("en-IN")}`
                          : "On Request")}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
