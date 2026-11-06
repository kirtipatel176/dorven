"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function OurPhilosophy() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-[#F8F6F2] overflow-hidden">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Asymmetric Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authentic Atelier Craftsmanship Photograph */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden bg-[#EAE3D8]">
              <Image
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1800&auto=format&fit=crop"
                alt="D'ORVEN Artisanal Leather Craftsmanship"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center grayscale-[15%] hover:grayscale-0 transition-all duration-700 ease-out hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-[#171717]/10 pointer-events-none" />
            </div>

            {/* Small Craftsmanship Caption */}
            <div className="mt-4 flex items-center justify-between text-[11px] text-[#918C84] tracking-[0.2em] uppercase font-mono">
              <span>Atelier Study / No. 01</span>
              <span>Hand-Cut Tuscan Hide</span>
            </div>
          </motion.div>

          {/* Right Column: Editorial Copy with Asymmetric Indent */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:pl-6 flex flex-col justify-center"
          >
            {/* Minimal Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-6 bg-[#CDB995]" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#918C84]">
                Our Philosophy
              </span>
            </div>

            {/* Elegant Serif Headline */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#171717] font-normal leading-[1.08] tracking-[-0.02em] mb-8">
              Elegance is found in the details.
            </h2>

            {/* Short Refined Brand Philosophy */}
            <p className="text-sm sm:text-base text-[#918C84] leading-relaxed font-light mb-10 max-w-lg">
              At D&apos;ORVEN, we believe exceptional footwear is defined by thoughtful design, refined materials and the confidence of simplicity. Every silhouette is conceived to bridge architectural discipline with daily ergonomic ease.
            </p>

            {/* Subtle Editorial CTA */}
            <div>
              <Link
                href="/our-label"
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.24em] font-medium text-[#171717] hover:text-[#918C84] transition-colors pb-1 border-b border-[#171717]/30 hover:border-[#171717]"
              >
                <span>Discover Our Philosophy</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

