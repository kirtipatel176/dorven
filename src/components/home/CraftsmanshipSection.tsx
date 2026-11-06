"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const craftsmanshipPillars = [
  {
    number: "01",
    title: "Material Selection",
    subtitle: "Certified Tuscan Full-Grain Hide",
    description:
      "Hand-selected Italian calfskin tanned with vegetable extracts. Preserves natural grain depth, breathability, and develops a richer patina with each passing season.",
  },
  {
    number: "02",
    title: "Construction Discipline",
    subtitle: "Hand-Lasted Precision Benchcraft",
    description:
      "Constructed using traditional bench-lasting methods that mold the upper precisely to the wooden last for days, guaranteeing architectural form retention.",
  },
  {
    number: "03",
    title: "Ergonomic Foundation",
    subtitle: "Anatomical Cork & Featherlight Soles",
    description:
      "Integrated cork-infused beds conform naturally to the wearer's footprint, coupled with custom Vibram featherlight compounds for effortless urban transit.",
  },
  {
    number: "04",
    title: "Finishing Details",
    subtitle: "Beveled Seams & Burnished Edges",
    description:
      "Raw edges are hand-burnished and sealed using organic beeswax. Waxed Japanese cotton cords and discreet embossed serial markings complete each pair.",
  },
];

export function CraftsmanshipSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-[#171717] text-[#F8F6F2] overflow-hidden">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1px] w-6 bg-[#CDB995]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#CDB995]">
              Atelier Standards & Provenance
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F8F6F2] font-normal leading-[1.06] tracking-[-0.02em] mb-6">
            Made to be experienced. Designed to endure.
          </h2>
          <p className="text-sm sm:text-base text-[#918C84] leading-relaxed font-light">
            Behind every silhouette lies an uncompromising dialogue between master Italian tanneries, ergonomic last-makers, and quiet modern design principles.
          </p>
        </div>

        {/* Asymmetrical Composition: Large Leather Texture Left, 4 Narrative Pillars Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Visual: Close-Up Leather & Texture Photography */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative lg:sticky lg:top-28"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#262626]">
              <Image
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1400&auto=format&fit=crop"
                alt="Close-up Italian calfskin grain and hand finishing"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center grayscale-[20%] hover:grayscale-0 transition-all duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent pointer-events-none" />

              {/* Inset Texture Callout Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-[#171717]/90 backdrop-blur-md border border-[#262626]">
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#CDB995] font-mono mb-1">
                  Material Specification
                </span>
                <span className="block font-serif text-lg text-[#F8F6F2]">
                  1.4mm Full-Grain Tuscan Calfskin
                </span>
                <span className="block text-xs text-[#918C84] font-light mt-1">
                  Vegetable tanned • Micro-pore breathability
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Narrative Pillars */}
          <div className="lg:col-span-7 space-y-12 sm:space-y-16">
            {craftsmanshipPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.number}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="pt-8 border-t border-[#262626] first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs uppercase tracking-[0.24em] font-mono text-[#CDB995]">
                    {pillar.number} / DISCIPLINE
                  </span>
                  <span className="text-[11px] text-[#918C84] uppercase tracking-[0.2em] font-mono">
                    {pillar.subtitle}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F6F2] font-normal mb-3">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#918C84] leading-relaxed font-light max-w-xl">
                  {pillar.description}
                </p>
              </motion.div>
            ))}

            {/* Read Manifesto Link */}
            <div className="pt-8">
              <Link
                href="/our-label"
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.24em] font-medium text-[#F8F6F2] hover:text-[#CDB995] transition-colors pb-1 border-b border-[#F8F6F2]/30 hover:border-[#CDB995]"
              >
                <span>Read The Complete Atelier Manifesto</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

