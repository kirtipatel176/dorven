"use client";

import Link from "next/link";

interface DorvenLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "charcoal" | "white" | "champagne" | "adaptive";
  className?: string;
  showSubtitle?: boolean;
  href?: string;
}

export function DorvenLogo({
  size = "md",
  variant = "adaptive",
  className = "",
  showSubtitle = false,
  href = "/",
}: DorvenLogoProps) {
  // Height and scale mappings
  const heightClasses = {
    xs: "h-5 sm:h-6",
    sm: "h-6 sm:h-7",
    md: "h-7 sm:h-8",
    lg: "h-9 sm:h-11",
    xl: "h-12 sm:h-14",
  };

  // Variant color mappings
  const variantColorClasses = {
    charcoal: "text-[#171717]",
    white: "text-[#F8F6F2]",
    champagne: "text-[#D8C6A5]",
    adaptive: "text-[#171717] dark:text-[#F8F6F2]",
  };

  const content = (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <div className={`relative flex items-center ${heightClasses[size]} ${variantColorClasses[variant]} transition-all duration-300`}>
        {/* Refined vector typography wordmark: D'ORVEN */}
        <div className="flex items-center tracking-[0.32em] font-serif font-medium uppercase leading-none text-inherit text-xl sm:text-2xl transition-all duration-300">
          <span className="inline-flex items-baseline">
            <span>D</span>
            <span className="text-[#D8C6A5] mx-[1.5px] font-sans font-light text-[0.8em] -translate-y-[2px] inline-block">’</span>
            <span>ORVEN</span>
          </span>
        </div>
      </div>

      {showSubtitle && (
        <span className="text-[9px] uppercase tracking-[0.35em] text-[#918C84] mt-0.5 font-sans font-medium">
          Footwear Atelier
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block focus:outline-none focus-visible:ring-1 focus-visible:ring-charcoal" aria-label="DORVON Footwear Home">
        {content}
      </Link>
    );
  }

  return content;
}

