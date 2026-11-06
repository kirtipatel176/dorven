"use client";

import Image from "next/image";
import Link from "next/link";

interface DorvenLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "charcoal" | "white" | "champagne" | "adaptive";
  className?: string;
  showSubtitle?: boolean;
  href?: string;
  priority?: boolean;
}

const logoDimensions: Record<
  "xs" | "sm" | "md" | "lg" | "xl",
  { height: number; width: number; heightClass: string }
> = {
  xs: { height: 13, width: 95, heightClass: "h-[13px]" },
  sm: { height: 16, width: 118, heightClass: "h-[15px] sm:h-[16px]" },
  md: { height: 19, width: 140, heightClass: "h-[17px] sm:h-[19px]" },
  lg: { height: 23, width: 169, heightClass: "h-[21px] sm:h-[23px]" },
  xl: { height: 28, width: 206, heightClass: "h-[25px] sm:h-[28px]" },
};

export function DorvenLogo({
  size = "md",
  variant = "white",
  className = "",
  showSubtitle = false,
  href = "/",
  priority = true,
}: DorvenLogoProps) {
  const { height, width, heightClass } = logoDimensions[size];

  // Resolve logo image: defaults to dorven-logo-white.png
  const logoSrc =
    variant === "charcoal"
      ? "/images/dorven-logo-charcoal.png"
      : variant === "champagne"
      ? "/images/dorven-logo-champagne.png"
      : "/images/dorven-logo-white.png";

  const content = (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <div className="relative flex items-center">
        <Image
          src={logoSrc}
          alt="D'ORVEN Footwear"
          width={width}
          height={height}
          priority={priority}
          className={`${heightClass} w-auto object-contain transition-opacity duration-300 hover:opacity-90`}
        />
      </div>

      {showSubtitle && (
        <span className="text-[8.5px] uppercase tracking-[0.3em] text-[#918C84] mt-1 font-sans font-medium">
          Footwear Atelier
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-block focus:outline-none focus-visible:ring-1 focus-visible:ring-charcoal"
        aria-label="D'ORVEN Footwear Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
