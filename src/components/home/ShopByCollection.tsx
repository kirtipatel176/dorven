"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface CollectionTile {
  title: string;
  subtitle: string;
  edition: string;
  image: string;
  href: string;
  colSpan: string;
  aspectRatio: string;
}

const collections: CollectionTile[] = [
  {
    title: "Men's Footwear",
    subtitle: "Tailored Derbies, Hand-Finished Loafers & Court Icons",
    edition: "COLLECTION 01",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600&auto=format&fit=crop",
    href: "/shop?gender=Men",
    colSpan: "lg:col-span-7",
    aspectRatio: "aspect-[4/3] sm:aspect-[16/10]",
  },
  {
    title: "Women's Footwear",
    subtitle: "Architectural Proportions & Refined Daily Silhouettes",
    edition: "COLLECTION 02",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1400&auto=format&fit=crop",
    href: "/shop?gender=Women",
    colSpan: "lg:col-span-5",
    aspectRatio: "aspect-[4/3] sm:aspect-[4/3]",
  },
  {
    title: "Sneakers",
    subtitle: "Curated Archival Runners & Performance Engineering",
    edition: "COLLECTION 03",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1400&auto=format&fit=crop",
    href: "/shop?category=Lifestyle",
    colSpan: "lg:col-span-5",
    aspectRatio: "aspect-[4/3] sm:aspect-[4/3]",
  },
  {
    title: "Formal & Lifestyle",
    subtitle: "Sculpted Italian Calfskin & Uncompromising Soles",
    edition: "COLLECTION 04",
    image:
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1600&auto=format&fit=crop",
    href: "/shop?category=Everyday+Essentials",
    colSpan: "lg:col-span-7",
    aspectRatio: "aspect-[4/3] sm:aspect-[16/10]",
  },
];

export function ShopByCollection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-[#F8F6F2] border-t border-[#171717]/10">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-6 bg-[#CDB995]" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#918C84]">
                Curated Categories
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#171717] tracking-tight">
              Shop by Collection
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#918C84] max-w-sm font-light leading-relaxed">
            Four primary disciplines spanning artisanal European benchcraft, street elegance, and verified archival legends.
          </p>
        </div>

        {/* Asymmetrical Editorial Collection Tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {collections.map((item, index) => (
            <motion.div
              key={item.title}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`${item.colSpan} group`}
            >
              <Link
                href={item.href}
                className="relative block w-full overflow-hidden bg-[#171717]"
              >
                {/* Image Container with Consistent Aspect Ratio & Grading */}
                <div className={`relative w-full ${item.aspectRatio} overflow-hidden`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  />

                  {/* Editorial Vignette Overlays */}
                  <div className="absolute inset-0 bg-black/25 pointer-events-none transition-opacity duration-500 group-hover:bg-black/15" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/30 to-transparent pointer-events-none" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between pointer-events-none">
                  {/* Top Bar: Category Number */}
                  <div className="flex items-center justify-between text-[10px] tracking-[0.25em] font-mono text-[#F8F6F2]/70 uppercase">
                    <span>{item.edition}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore Series
                    </span>
                  </div>

                  {/* Bottom: Title & Arrow */}
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-4xl text-[#F8F6F2] font-normal leading-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#918C84] font-light max-w-sm line-clamp-1">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#F8F6F2]/30 flex items-center justify-center text-[#F8F6F2] group-hover:border-[#F8F6F2] group-hover:bg-[#F8F6F2] group-hover:text-[#171717] transition-all duration-300 flex-shrink-0 ml-4">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

