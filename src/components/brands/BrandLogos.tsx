"use client";

import React from "react";
import Link from "next/link";

export interface BrandItem {
  id: string;
  name: string;
  slug: string;
  origin: string;
  isAtelier?: boolean;
  link: string;
  logo: React.ReactNode;
}

export const brandsList: BrandItem[] = [
  {
    id: "dorven-signature",
    name: "DORVEN Signature",
    slug: "dorven-signature",
    origin: "Italy / India Atelier",
    isAtelier: true,
    link: "/our-label",
    logo: (
      <span className="font-serif font-black tracking-[0.25em] text-sm text-charcoal">
        DORVEN <span className="text-[9px] font-sans font-semibold tracking-luxury text-champagneDark">ATELIER</span>
      </span>
    ),
  },
  {
    id: "nike",
    name: "Nike",
    slug: "nike",
    origin: "USA",
    link: "/brands/nike",
    logo: (
      <svg viewBox="0 0 54 22" className="h-5 w-auto fill-current" aria-label="Nike">
        <path d="M48.2 2.1C42.8 7.4 32.3 14.8 22.8 15.5c-3.8.3-6.8-.9-8-3.3-1.2-2.5-.4-6 2.3-9.1 2.1-2.3 4.8-4 7.6-4.5 1.7-.3 3 .1 3.7 1.1l3-3.5c-1.8-1.5-4.1-2.4-6.9-2.1-4.6.5-8.7 3-11.6 6.5-3 3.8-3.9 8.8-2.3 12.8 1.9 4.7 6.7 7 12.6 6.4 12.2-1.4 24-12.1 28.9-17.7l-4-.3z" />
      </svg>
    ),
  },
  {
    id: "adidas",
    name: "Adidas Originals",
    slug: "adidas",
    origin: "Germany",
    link: "/brands/adidas",
    logo: (
      <span className="font-sans font-black tracking-tighter text-sm uppercase">
        ADIDAS
      </span>
    ),
  },
  {
    id: "new-balance",
    name: "New Balance",
    slug: "new-balance",
    origin: "USA",
    link: "/brands/new-balance",
    logo: (
      <span className="font-sans font-black italic tracking-tight text-sm">
        new balance
      </span>
    ),
  },
  {
    id: "asics",
    name: "Asics",
    slug: "asics",
    origin: "Japan",
    link: "/brands/asics",
    logo: (
      <span className="font-sans font-black italic tracking-wider text-sm uppercase">
        asics
      </span>
    ),
  },
  {
    id: "birkenstock",
    name: "Birkenstock",
    slug: "birkenstock",
    origin: "Germany",
    link: "/brands/birkenstock",
    logo: (
      <span className="font-serif font-bold tracking-[0.2em] text-xs uppercase">
        BIRKENSTOCK
      </span>
    ),
  },
  {
    id: "on-running",
    name: "On Running",
    slug: "on-running",
    origin: "Switzerland",
    link: "/brands/on-running",
    logo: (
      <span className="font-sans font-extrabold tracking-widest text-xs uppercase">
        ON <span className="text-[10px] text-mutedGrey font-medium">RUNNING</span>
      </span>
    ),
  },
  {
    id: "puma",
    name: "Puma",
    slug: "puma",
    origin: "Germany",
    link: "/brands/puma",
    logo: (
      <span className="font-sans font-black tracking-widest text-sm uppercase">
        PUMA
      </span>
    ),
  },
];

interface BrandLogosProps {
  className?: string;
  variant?: "strip" | "grid";
  showTitle?: boolean;
}

export function BrandLogos({
  className = "",
  variant = "strip",
  showTitle = false,
}: BrandLogosProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-[10px] uppercase tracking-luxury font-bold text-mutedGrey">
            AUTHORIZED BRANDS & IN-HOUSE ATELIER
          </span>
          <Link
            href="/brands"
            className="text-[10px] font-semibold text-charcoal hover:text-champagneDark tracking-luxury uppercase transition-colors"
          >
            Directory &rarr;
          </Link>
        </div>
      )}

      <div className="flex items-center justify-between gap-6 overflow-x-auto no-scrollbar py-2 border-t border-charcoal/5">
        {brandsList.map((brand) => (
          <Link
            key={brand.id}
            href={brand.link}
            title={`${brand.name} (${brand.origin})`}
            className="flex-shrink-0 text-charcoal/70 hover:text-charcoal transition-colors px-2 py-1"
          >
            {brand.logo}
          </Link>
        ))}
      </div>
    </div>
  );
}

