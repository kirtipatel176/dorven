"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brandsData } from "@/data/brands";

interface BrandLogoItem {
  id: string;
  name: string;
  slug: string;
  href: string;
  logo: React.ReactNode;
}

const BRAND_LOGOS: Record<string, React.ReactNode> = {
  "dorven-label": (
    <div className="flex flex-col items-center justify-center select-none">
      <span className="font-serif text-xl sm:text-2xl tracking-[0.26em] font-medium uppercase leading-none">
        DORVEN
      </span>
      <span className="text-[7.5px] tracking-[0.38em] text-[#918C84] uppercase font-sans font-semibold mt-1">
        ATELIER
      </span>
    </div>
  ),
  nike: (
    <svg
      viewBox="0 0 54 22"
      className="h-6 sm:h-7 w-auto fill-current select-none"
      aria-label="Nike"
    >
      <path d="M48.2 2.1C42.8 7.4 32.3 14.8 22.8 15.5c-3.8.3-6.8-.9-8-3.3-1.2-2.5-.4-6 2.3-9.1 2.1-2.3 4.8-4 7.6-4.5 1.7-.3 3 .1 3.7 1.1l3-3.5c-1.8-1.5-4.1-2.4-6.9-2.1-4.6.5-8.7 3-11.6 6.5-3 3.8-3.9 8.8-2.3 12.8 1.9 4.7 6.7 7 12.6 6.4 12.2-1.4 24-12.1 28.9-17.7l-4-.3z" />
    </svg>
  ),
  adidas: (
    <div className="flex items-center gap-2 select-none">
      <svg
        viewBox="0 0 38 24"
        className="h-5 sm:h-6 w-auto fill-current"
        aria-label="Adidas"
      >
        <path d="M0 22h6.5l7-12h-6.5zM10.5 22h6.5l9-15.5h-6.5zM21 22h6.5l11-19h-6.5z" />
      </svg>
      <span className="font-sans font-black tracking-tight text-lg sm:text-xl lowercase">
        adidas
      </span>
    </div>
  ),
  "new-balance": (
    <div className="flex items-center gap-1.5 select-none">
      <span className="font-sans font-black italic tracking-tighter text-2xl sm:text-3xl leading-none">
        NB
      </span>
      <span className="font-sans font-black italic text-xs tracking-tight lowercase">
        new balance
      </span>
    </div>
  ),
  asics: (
    <div className="flex items-center select-none">
      <span className="font-sans font-black italic tracking-[0.14em] text-lg sm:text-xl uppercase">
        asics
      </span>
    </div>
  ),
  birkenstock: (
    <div className="flex items-center select-none">
      <span className="font-serif font-bold tracking-[0.24em] text-sm sm:text-base uppercase">
        BIRKENSTOCK
      </span>
    </div>
  ),
  "on-running": (
    <div className="flex items-center gap-1.5 select-none">
      <span className="font-sans font-black text-2xl sm:text-3xl tracking-tighter leading-none">
        On
      </span>
      <span className="text-[9px] tracking-[0.25em] font-semibold text-[#918C84] uppercase">
        RUNNING
      </span>
    </div>
  ),
  puma: (
    <div className="flex items-center gap-2 select-none">
      <svg
        viewBox="0 0 140 80"
        className="h-5 sm:h-6 w-auto fill-current"
        aria-label="Puma"
      >
        <path d="M135.5 13.2c-4.2-2.8-10.2-2.1-14.7 1.8-7.1 6.1-11.8 14.8-15.3 23.7-4.4 11-10.3 20.3-19.8 27.2-7.8 5.7-16.9 8.8-26.2 9.5-9.3.7-18.7-.9-27.1-4.7-6.2-2.8-11.9-6.8-16.8-11.7l-6.1 6.8c6.6 6.5 14.4 11.7 22.8 15.3 11.2 4.9 23.6 6.8 35.8 5.7 11.8-1.1 23.1-5.4 33-12.8 11.4-8.5 18.6-20.2 23.9-33.1 3.2-7.8 7.3-15.3 13.5-20.6 3.4-2.9 6.8-3.4 9.7-2.3l-8.7-14.8z" />
      </svg>
      <span className="font-sans font-black tracking-[0.2em] text-base sm:text-lg uppercase">
        PUMA
      </span>
    </div>
  ),
};

export function FeaturedBrandsSection() {
  const brands: BrandLogoItem[] = brandsData.slice(0, 8).map((b) => ({
    id: b.id,
    name: b.name,
    slug: b.slug,
    href: b.isExclusiveLabel ? "/our-label" : `/brands/${b.slug}`,
    logo: BRAND_LOGOS[b.id] || (
      <span className="font-serif text-lg tracking-[0.16em] uppercase">
        {b.logoText || b.name}
      </span>
    ),
  }));

  return (
    <section className="py-14 sm:py-20 bg-[#F8F6F2]">
      {/* Section Header — Clean & Minimal, No Heavy Borders */}
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 mb-8 sm:mb-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-[1px] w-6 bg-[#CDB995]" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#918C84]">
                Brand Portfolio
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#171717] tracking-tight">
              Featured Brands
            </h2>
          </div>

          <Link
            href="/brands"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#171717] hover:text-[#918C84] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Horizontal Continuous Logo Track — No Borders, No Big Boxes */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge gradient fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#F8F6F2] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#F8F6F2] to-transparent z-10" />

        {/* Marquee ticker with duplicate track for infinite seamless scrolling */}
        <div className="animate-brand-marquee flex items-center py-4">
          {[...brands, ...brands].map((brand, index) => (
            <Link
              key={`${brand.id}-${index}`}
              href={brand.href}
              title={brand.name}
              className="inline-flex items-center justify-center mx-8 sm:mx-12 lg:mx-16 text-[#171717]/45 hover:text-[#171717] transition-all duration-300 hover:scale-105 flex-shrink-0"
            >
              {brand.logo}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
