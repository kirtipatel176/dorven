"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Brand } from "@/types/brand";
import { BrandLogoMark } from "./BrandLogosMap";

interface FeaturedBrandSectionProps {
  brands: Brand[];
  getProductCount: (brand: Brand) => number;
}

export function FeaturedBrandSection({
  brands,
  getProductCount,
}: FeaturedBrandSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // If no featured brands in current filter, render null
  if (!brands || brands.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#F8F6F2]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-16 sm:mb-20 border-b border-[#E5E0D8]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[1px] w-6 bg-[#C6AD83]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-semibold text-[#858078]">
                ARCHIVAL MONOGRAPHS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] tracking-tight">
              Featured Brand Editorials
            </h2>
          </div>

          <span className="text-xs font-mono tracking-widest text-[#858078] mt-3 sm:mt-0">
            SHOWCASE 01 — 0{brands.length}
          </span>
        </div>

        {/* Alternating Brand Showcase Items */}
        <div className="space-y-24 sm:space-y-36">
          {brands.map((brand, index) => {
            const productCount = getProductCount(brand);
            // Alternate layout: even index = Image on Left, odd index = Image on Right
            const isImageLeft = index % 2 === 0;
            const campaignVisual = brand.campaignImage || brand.heroImage;
            const destinationLink = brand.isExclusiveLabel
              ? "/our-label"
              : `/brands/${brand.slug}`;

            return (
              <motion.article
                key={brand.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Visual Campaign Column */}
                <div
                  className={`lg:col-span-7 ${
                    isImageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Link href={destinationLink} className="block overflow-hidden bg-[#EEEAE3] relative aspect-[16/10] shadow-[0_12px_40px_rgba(23,23,23,0.05)]">
                    <Image
                      src={campaignVisual}
                      alt={`${brand.name} Luxury Footwear Editorial`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-1000 ease-out"
                    />

                    {/* Subtle Scrim & Natural Studio Grading */}
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-700 pointer-events-none" />

                    {/* Overlay Metadata Tag */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
                      <span className="backdrop-blur-md bg-[#171717]/85 text-[#F8F6F2] text-[9px] font-mono uppercase tracking-[0.25em] px-3 py-1.5 border border-white/10">
                        {brand.isExclusiveLabel ? "SIGNATURE ATELIER" : "HERITAGE ARCHIVE"}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                      <span className="backdrop-blur-md bg-white/90 text-[#171717] text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 shadow-sm">
                        {productCount} {productCount === 1 ? "Pair" : "Pairs"} Available
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Information Column */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isImageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  {/* Origin & Year */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-[#171717]">
                      <BrandLogoMark brandId={brand.id} className="h-5 sm:h-6 w-auto" />
                    </div>
                    <span className="h-3 w-[1px] bg-[#E5E0D8]" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#858078]">
                      Est. {brand.foundedYear}
                    </span>
                  </div>

                  {/* Brand Title */}
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] tracking-tight mb-2">
                    {brand.name}
                  </h3>

                  {/* Verified Provenance */}
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#C6AD83] mb-4">
                    {brand.origin}
                  </p>

                  {/* Tagline */}
                  <p className="font-serif italic text-base sm:text-lg text-[#171717]/85 mb-4 leading-snug">
                    &ldquo;{brand.tagline}&rdquo;
                  </p>

                  {/* Description */}
                  <p className="text-sm text-[#858078] font-sans font-light leading-relaxed mb-6">
                    {brand.description}
                  </p>

                  {/* Editorial Note Pill */}
                  {brand.editorialNote && (
                    <div className="p-3 bg-[#EEEAE3]/60 border-l-2 border-[#C6AD83] mb-8">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#171717] block">
                        Curator&apos;s Annotation
                      </span>
                      <span className="text-xs text-[#858078] font-sans">
                        {brand.editorialNote}
                      </span>
                    </div>
                  )}

                  {/* Explore CTA */}
                  <div>
                    <Link
                      href={destinationLink}
                      className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#171717] group-hover:text-[#C6AD83] transition-colors pb-1 border-b border-[#171717] group-hover:border-[#C6AD83]"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                    </Link>
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

