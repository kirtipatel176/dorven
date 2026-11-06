"use client";

import React from "react";

interface BrandLogoProps {
  brandId: string;
  className?: string;
}

export function BrandLogoMark({ brandId, className = "h-5 w-auto" }: BrandLogoProps) {
  switch (brandId) {
    case "nike":
      return (
        <svg
          viewBox="0 0 54 22"
          className={`${className} fill-current`}
          aria-label="Nike Swoosh"
        >
          <path d="M48.2 2.1C42.8 7.4 32.3 14.8 22.8 15.5c-3.8.3-6.8-.9-8-3.3-1.2-2.5-.4-6 2.3-9.1 2.1-2.3 4.8-4 7.6-4.5 1.7-.3 3 .1 3.7 1.1l3-3.5c-1.8-1.5-4.1-2.4-6.9-2.1-4.6.5-8.7 3-11.6 6.5-3 3.8-3.9 8.8-2.3 12.8 1.9 4.7 6.7 7 12.6 6.4 12.2-1.4 24-12.1 28.9-17.7l-4-.3z" />
        </svg>
      );

    case "adidas":
      return (
        <svg
          viewBox="0 0 48 32"
          className={`${className} fill-current`}
          aria-label="Adidas Trefoil"
        >
          <path d="M4.5 28.5L0 28.5L10.5 8.5L15 8.5L4.5 28.5Z" />
          <path d="M19.5 28.5L15 28.5L25.5 0L30 0L19.5 28.5Z" />
          <path d="M34.5 28.5L30 28.5L40.5 4.5L45 4.5L34.5 28.5Z" />
        </svg>
      );

    case "puma":
      return (
        <span className="font-sans font-black tracking-[0.2em] text-sm sm:text-base uppercase text-current">
          PUMA
        </span>
      );

    case "new-balance":
      return (
        <div className="flex items-center gap-1">
          <span className="font-sans font-black italic tracking-tighter text-base sm:text-lg uppercase text-current">
            NB
          </span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#858078] hidden sm:inline">
            1906
          </span>
        </div>
      );

    case "skechers":
      return (
        <span className="font-sans font-black italic tracking-[0.16em] text-sm sm:text-base uppercase text-current">
          SKECHERS
        </span>
      );

    case "asics":
      return (
        <span className="font-sans font-black italic tracking-wider text-sm sm:text-base uppercase text-current">
          asics
        </span>
      );

    case "reebok":
      return (
        <span className="font-sans font-black tracking-[0.16em] text-sm sm:text-base uppercase text-current">
          Reebok
        </span>
      );

    case "converse":
      return (
        <div className="flex items-center gap-1">
          <span className="font-sans font-black tracking-tight text-sm uppercase text-current">
            ★ CONVERSE
          </span>
        </div>
      );

    case "vans":
      return (
        <span className="font-sans font-black italic tracking-wider text-sm sm:text-base uppercase text-current">
          VANS
        </span>
      );

    case "on":
    case "on-running":
      return (
        <div className="flex items-center gap-1.5">
          <span className="font-sans font-extrabold tracking-widest text-sm uppercase text-current">
            ON
          </span>
          <span className="text-[8px] uppercase tracking-[0.25em] text-[#858078] border-l border-[#E5E0D8] pl-1.5">
            SWISS
          </span>
        </div>
      );

    case "hoka":
      return (
        <span className="font-sans font-black italic tracking-widest text-sm sm:text-base uppercase text-current">
          HOKA
        </span>
      );

    case "salomon":
      return (
        <span className="font-sans font-black tracking-[0.22em] text-xs sm:text-sm uppercase text-current">
          SALOMON
        </span>
      );

    case "clarks":
      return (
        <span className="font-serif italic font-bold tracking-[0.18em] text-sm sm:text-base text-current">
          Clarks
        </span>
      );

    case "birkenstock":
      return (
        <span className="font-serif font-bold tracking-[0.25em] text-xs sm:text-sm uppercase text-current">
          BIRKENSTOCK
        </span>
      );

    case "dr-martens":
      return (
        <span className="font-sans font-black tracking-[0.18em] text-xs sm:text-sm uppercase text-current">
          Dr. Martens
        </span>
      );

    case "dorven-label":
    default:
      return (
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold tracking-[0.22em] text-sm sm:text-base text-current">
            D&apos;ORVEN
          </span>
          <span className="text-[8px] uppercase tracking-[0.3em] font-sans font-semibold text-[#C6AD83] border border-[#C6AD83]/40 px-1.5 py-0.5">
            ATELIER
          </span>
        </div>
      );
  }
}
