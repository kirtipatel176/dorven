"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Brand } from "@/types/brand";
import { BrandLogoMark } from "./BrandLogosMap";

interface BrandDirectoryGridProps {
  brands: Brand[];
  getProductCount: (brand: Brand) => number;
  activeFilterTitle?: string;
}

export function BrandDirectoryGrid({
  brands,
  getProductCount,
  activeFilterTitle = "All Brands",
}: BrandDirectoryGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="full-directory" className="py-20 sm:py-28 lg:py-32 bg-[#EEEAE3]/40 border-t border-[#E5E0D8]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-12 sm:mb-16 border-b border-[#E5E0D8] gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[1px] w-6 bg-[#C6AD83]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-semibold text-[#858078]">
                THE FULL DIRECTORY
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] tracking-tight">
              Browse All Brands
            </h2>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono tracking-widest text-[#858078] block">
              Showing {brands.length} {brands.length === 1 ? "Label" : "Labels"}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#C6AD83]">
              {activeFilterTitle}
            </span>
          </div>
        </div>

        {/* Empty State */}
        {brands.length === 0 ? (
          <div className="py-24 text-center border border-[#E5E0D8] bg-[#F8F6F2]">
            <p className="font-serif text-2xl text-[#171717] mb-2">
              No matching brands in this archive
            </p>
            <p className="text-xs font-sans text-[#858078] max-w-md mx-auto">
              Please adjust your search criteria or reset category filters to view our full collection of footwear houses.
            </p>
          </div>
        ) : (
          /* Editorial Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile for optimum editorial readability) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {brands.map((brand, idx) => {
              const productCount = getProductCount(brand);
              const destination = brand.isExclusiveLabel
                ? "/our-label"
                : `/brands/${brand.slug}`;

              return (
                <motion.article
                  key={brand.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: (idx % 3) * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex flex-col bg-[#FFFFFF] border border-[#E5E0D8] transition-all duration-500 hover:border-[#171717] hover:shadow-[0_16px_40px_rgba(23,23,23,0.08)]"
                >
                  {/* Brand Representative Footwear Image */}
                  <Link
                    href={destination}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-[#EEEAE3] block"
                  >
                    <Image
                      src={brand.heroImage}
                      alt={`${brand.name} representative footwear`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />

                    {/* Brand Origin / Established Pill */}
                    <div className="absolute top-3 left-3">
                      <span className="backdrop-blur-md bg-[#171717]/85 text-[#F8F6F2] text-[9px] font-mono uppercase tracking-[0.2em] px-2.5 py-1">
                        {brand.origin}
                      </span>
                    </div>

                    {/* Order Number / Atelier Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="backdrop-blur-md bg-[#171717]/85 text-[#C6AD83] text-[10px] font-mono tracking-widest font-semibold px-2.5 py-1">
                        {brand.orderNumber ? brand.orderNumber : `0${idx + 1}`}
                      </span>
                    </div>
                  </Link>

                  {/* Brand Meta & Info */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      {/* Logo & Category */}
                      <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-[#E5E0D8]">
                        <div className="text-[#171717]">
                          <BrandLogoMark brandId={brand.id} className="h-4.5 w-auto" />
                        </div>
                        {brand.categoryLabel && (
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#858078]">
                            {brand.categoryLabel}
                          </span>
                        )}
                      </div>

                      {/* Brand Name & Number */}
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#171717] tracking-tight mb-2">
                        <Link
                          href={destination}
                          className="hover:text-[#C6AD83] transition-colors"
                        >
                          {brand.orderNumber && !brand.isExclusiveLabel ? `${brand.orderNumber}. ` : ""}
                          {brand.name.toUpperCase()}
                        </Link>
                      </h3>

                      {/* Tagline */}
                      {brand.tagline && (
                        <p className="text-xs font-serif italic text-[#858078] mb-3">
                          &ldquo;{brand.tagline}&rdquo;
                        </p>
                      )}

                      {/* Description Narrative */}
                      <p className="text-xs sm:text-[13px] text-[#4A4742] font-sans font-light leading-relaxed mb-6">
                        {brand.description}
                      </p>

                      {/* Signature Models */}
                      {brand.signature && (
                        <div className="pt-3 pb-1 border-t border-[#E5E0D8]/60 mb-4">
                          <span className="text-[9px] uppercase font-mono tracking-[0.22em] text-[#858078] block mb-1">
                            Signature
                          </span>
                          <span className="text-xs font-sans text-[#171717] font-medium tracking-wide">
                            {brand.signature}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Footer: Product Count & Explore CTA */}
                    <div className="pt-4 mt-2 border-t border-[#E5E0D8] flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-[#858078] uppercase">
                        {productCount > 0
                          ? `${productCount} ${productCount === 1 ? "Silhouette" : "Silhouettes"}`
                          : "Curated House"}
                      </span>

                      <Link
                        href={destination}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] font-medium text-[#171717] group-hover:text-[#C6AD83] transition-colors"
                      >
                        <span>{brand.ctaText || `Explore ${brand.name}`}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

