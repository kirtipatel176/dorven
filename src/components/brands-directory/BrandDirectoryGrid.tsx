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
          /* Editorial Grid (4 Columns on Desktop, 2 on Tablet/Mobile) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
                    delay: (idx % 4) * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex flex-col bg-[#F8F6F2] border border-[#E5E0D8] transition-all duration-500 hover:border-[#171717] hover:shadow-[0_12px_32px_rgba(23,23,23,0.06)]"
                >
                  {/* Brand Representative Footwear Image */}
                  <Link
                    href={destination}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-[#EEEAE3] block"
                  >
                    <Image
                      src={brand.heroImage}
                      alt={`${brand.name} representative footwear`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />

                    {/* Brand Origin / Established Pill */}
                    <div className="absolute top-3 left-3">
                      <span className="backdrop-blur-md bg-[#171717]/80 text-[#F8F6F2] text-[9px] font-mono uppercase tracking-[0.2em] px-2.5 py-1">
                        Est. {brand.foundedYear}
                      </span>
                    </div>

                    {/* In-House Atelier Badge */}
                    {brand.isExclusiveLabel && (
                      <div className="absolute top-3 right-3">
                        <span className="backdrop-blur-md bg-[#C6AD83] text-[#171717] text-[9px] font-mono uppercase tracking-[0.2em] font-semibold px-2.5 py-1">
                          Atelier
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Brand Meta & Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Logo & Category */}
                      <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#E5E0D8]">
                        <div className="text-[#171717]">
                          <BrandLogoMark brandId={brand.id} className="h-4 w-auto" />
                        </div>
                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#858078]">
                          {brand.origin.split(",")[0]}
                        </span>
                      </div>

                      {/* Brand Name */}
                      <h3 className="font-serif text-2xl font-normal text-[#171717] tracking-tight mb-2">
                        <Link
                          href={destination}
                          className="hover:text-[#C6AD83] transition-colors"
                        >
                          {brand.name}
                        </Link>
                      </h3>

                      {/* Tagline / Excerpt */}
                      <p className="text-xs text-[#858078] font-sans font-light line-clamp-2 leading-relaxed mb-4">
                        {brand.tagline}
                      </p>
                    </div>

                    {/* Card Footer: Product Count & Explore CTA */}
                    <div className="pt-4 border-t border-[#E5E0D8] flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-[#858078] uppercase">
                        {productCount} {productCount === 1 ? "Silhouette" : "Silhouettes"}
                      </span>

                      <Link
                        href={destination}
                        className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-[0.2em] text-[#171717] group-hover:text-[#C6AD83] transition-colors"
                      >
                        <span>Explore</span>
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

