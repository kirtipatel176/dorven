"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface BrandEditorialHeaderProps {
  totalBrands: number;
  totalProducts: number;
}

export function BrandEditorialHeader({
  totalBrands,
  totalProducts,
}: BrandEditorialHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 bg-[#F8F6F2] border-b border-[#E5E0D8]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Asymmetric Luxury Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Editorial Narrative & Typography (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow / Label */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-[1px] w-8 bg-[#C6AD83]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] font-semibold text-[#858078]">
                THE D&apos;ORVEN DIRECTORY
              </span>
            </motion.div>

            {/* Headline with Cormorant Garamond */}
            <motion.h1
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal text-[#171717] tracking-[-0.02em] leading-[1.05] mb-6 sm:mb-8"
            >
              Names worth{" "}
              <span className="italic font-normal text-[#171717]/90 font-serif">
                knowing.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#858078] max-w-xl font-sans font-light leading-relaxed mb-10"
            >
              An independent selection of footwear labels defined by design,
              heritage and individuality. Hand-selected for exceptional
              craftsmanship, verified provenance, and timeless aesthetic
              resonance.
            </motion.p>

            {/* Live Portfolio Index Badges */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 sm:gap-10 pt-8 border-t border-[#E5E0D8]"
            >
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-[#171717] font-normal leading-none mb-1">
                  0{totalBrands}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#858078]">
                  Verified Footwear Houses
                </span>
              </div>

              <div className="h-8 w-[1px] bg-[#E5E0D8]" />

              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-[#171717] font-normal leading-none mb-1">
                  {totalProducts}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#858078]">
                  Curated Silhouettes
                </span>
              </div>

              <div className="h-8 w-[1px] bg-[#E5E0D8]" />

              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-[#C6AD83] font-normal leading-none mb-1">
                  100%
                </span>
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#858078]">
                  Authenticity Verified
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: High-Fashion Integrated Footwear Visual (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-[#EEEAE3] shadow-[0_20px_50px_rgba(23,23,23,0.06)]"
            >
              <Image
                src="/images/hero/hero-1.jpg"
                alt="D'ORVEN Footwear Atelier Craftsmanship"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center grayscale-[15%] contrast-[1.02] hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Delicate Editorial Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white text-[10px] font-mono tracking-[0.2em] uppercase">
                <span className="backdrop-blur-md bg-black/30 px-3 py-1.5 border border-white/20">
                  D&apos;ORVEN ATELIER ARCHIVE
                </span>
                <span className="backdrop-blur-md bg-black/30 px-3 py-1.5 border border-white/20">
                  VOL. 2025/26
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

