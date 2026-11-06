"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { defaultHeroBanners, HeroBanner } from "@/data/heroBanners";

export function HeroSection() {
  const [banners, setBanners] = useState<HeroBanner[]>(defaultHeroBanners);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.75], ["0%", "12%"]);

  // Support synchronization from local storage if edited via admin
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dorven_active_hero_banner");
      if (stored) {
        const parsed = JSON.parse(stored);
        setBanners((prev) => [parsed, ...prev.slice(1)]);
      }
    } catch {
      // Clean fallback
    }
  }, []);

  const currentBanner = banners[currentIndex] || banners[0];

  // Slide navigation
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  // Autoplay timer (7.5 seconds)
  useEffect(() => {
    if (isPaused || banners.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 7500);

    return () => clearInterval(timer);
  }, [isPaused, banners.length, handleNext]);

  // Pause when document is hidden (switching tabs)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // Scroll to discovery content
  const handleScrollDown = () => {
    const nextSection = document.getElementById("brand-authenticity-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  // Split headline lines cleanly for masked reveal
  const headlineLine1 = currentBanner.headline || "BEYOND THE";
  const headlineLine2 = currentBanner.headlineAccent || "ORDINARY.";

  return (
    <section
      ref={heroRef}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      tabIndex={0}
      aria-label="D'ORVEN Campaign Hero"
      className="relative w-full h-screen min-h-[640px] max-h-[1100px] overflow-hidden bg-[#171717] select-none focus:outline-none"
    >
      {/* 1. EDGE-TO-EDGE PHOTOGRAPHIC BACKGROUND WITH PARALLAX & CROSSFADE */}
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : backgroundY,
          scale: shouldReduceMotion ? 1 : backgroundScale,
        }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentBanner.id}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
              opacity: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 7.5, ease: "easeOut" },
            }}
            className="relative w-full h-full"
          >
            {/* Desktop / Landscape Campaign Image */}
            <Image
              src={currentBanner.imageUrl}
              alt="D'ORVEN Luxury Footwear Campaign"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-center hidden sm:block will-change-transform"
            />

            {/* Mobile / Portrait Campaign Image */}
            <Image
              src={currentBanner.mobileImageUrl || currentBanner.imageUrl}
              alt="D'ORVEN Luxury Footwear Campaign"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-center block sm:hidden will-change-transform"
            />
          </motion.div>
        </AnimatePresence>

        {/* 2. ATMOSPHERIC OVERLAYS: PRESERVES AUTHENTIC LIGHT WHILE ENSURING TEXT CONTRAST */}
        {/* Soft black base scrim per specification */}
        <div className="absolute inset-0 bg-black/[0.35] pointer-events-none" />

        {/* Cinematic directional gradients for impeccable editorial text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/95 via-[#171717]/40 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/85 via-[#171717]/35 to-transparent pointer-events-none sm:w-[75%]" />
      </motion.div>

      {/* 3. HERO CONTENT CONTAINER (LOWER-LEFT EDITORIAL PLACEMENT) */}
      <motion.div
        style={{
          opacity: shouldReduceMotion ? 1 : heroContentOpacity,
          y: shouldReduceMotion ? 0 : heroContentY,
        }}
        className="relative z-20 w-full h-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-end pb-14 sm:pb-16 lg:pb-20 pt-28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* LOWER-LEFT: Campaign Typography & Actions */}
          <div className="lg:col-span-8 max-w-2xl">
            {/* STEP 3 — Campaign Label */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${currentBanner.id}`}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3.5 mb-5 sm:mb-6"
              >
                <span className="h-[1px] w-6 sm:w-8 bg-[#D8C6A5]" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-medium text-[#F8F6F2]/90">
                  {currentBanner.editorialBadge || "AUTUMN / WINTER 2025 ATELIER"}
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#918C84] tracking-[0.2em] font-light hidden sm:inline">
                  • {currentBanner.editionYear || "LOOK 01"}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* STEP 4 — Main Headline (Masked Line-by-Line Reveal) */}
            <div className="mb-6 sm:mb-7 overflow-hidden">
              <AnimatePresence mode="wait">
                <div key={`headline-${currentBanner.id}`} className="space-y-1">
                  {/* Line 1 */}
                  <div className="overflow-hidden">
                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { y: "115%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-115%", opacity: 0 }}
                      transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[90px] font-normal text-[#F8F6F2] tracking-[-0.02em] leading-[0.96]"
                    >
                      {headlineLine1}
                    </motion.div>
                  </div>

                  {/* Line 2 with Italic Accent */}
                  <div className="overflow-hidden">
                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { y: "115%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-115%", opacity: 0 }}
                      transition={{ duration: 0.9, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[90px] font-normal text-[#F8F6F2] italic tracking-[-0.02em] leading-[0.96]"
                    >
                      {headlineLine2}
                    </motion.div>
                  </div>
                </div>
              </AnimatePresence>
            </div>

            {/* STEP 5 — Supporting Editorial Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${currentBanner.id}`}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base text-[#918C84] font-light leading-relaxed max-w-lg mb-8 sm:mb-10"
              >
                {currentBanner.subheadline}
              </motion.p>
            </AnimatePresence>

            {/* STEP 6 — Minimalist Luxury CTAs */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1"
            >
              {/* Primary CTA */}
              <Link
                href={currentBanner.primaryCtaLink || "/shop"}
                className="group relative inline-flex items-center justify-center gap-4 px-8 py-4 bg-[#F8F6F2] text-[#171717] text-xs uppercase tracking-[0.24em] font-medium rounded-none hover:bg-white transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white"
              >
                <span>{currentBanner.primaryCtaText || "EXPLORE COLLECTION"}</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#171717] transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href={currentBanner.secondaryCtaLink || "/our-label"}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-[#F8F6F2]/30 text-[#F8F6F2] text-xs uppercase tracking-[0.24em] font-medium rounded-none hover:border-[#F8F6F2] hover:bg-[#F8F6F2]/10 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#F8F6F2]"
              >
                <span>{currentBanner.secondaryCtaText || "DISCOVER OUR LABEL"}</span>
              </Link>
            </motion.div>
          </div>

          {/* LOWER-RIGHT: Campaign Metadata & Slider Controls */}
          <div className="lg:col-span-4 flex flex-col lg:items-end justify-between gap-6 pt-4 lg:pt-0">
            {/* Silhouette Details Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`meta-${currentBanner.id}`}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hidden sm:block border-l lg:border-l-0 lg:border-r border-[#D8C6A5]/40 pl-4 lg:pl-0 lg:pr-4 py-1 text-left lg:text-right"
              >
                <span className="block text-[9px] uppercase tracking-[0.26em] text-[#918C84] font-mono">
                  Featured Silhouette
                </span>
                <span className="block text-sm font-serif text-[#F8F6F2] mt-0.5 font-normal">
                  {currentBanner.silhouetteName || "Monolith Minimalist Runner"}
                </span>
                <span className="block text-[11px] text-[#D8C6A5] tracking-wide mt-1 font-light">
                  {currentBanner.silhouetteDetail || "Hand-selected Italian calfskin"}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Pagination & Previous/Next Controls */}
            {banners.length > 1 && (
              <div className="flex items-center gap-6 self-start lg:self-end">
                {/* Numeric Pagination Indicator */}
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#918C84]">
                  <span className="text-[#F8F6F2] font-semibold">
                    0{currentIndex + 1}
                  </span>
                  <span>/</span>
                  <span>0{banners.length}</span>
                </div>

                {/* Minimal Segment Progress Line */}
                <div className="w-16 h-[1.5px] bg-[#918C84]/30 relative overflow-hidden">
                  <motion.div
                    key={currentIndex}
                    initial={{ width: "0%" }}
                    animate={{ width: isPaused ? "100%" : "100%" }}
                    transition={{
                      duration: isPaused ? 0 : 7.5,
                      ease: "linear",
                    }}
                    className="h-full bg-[#D8C6A5]"
                  />
                </div>

                {/* Arrow Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous Campaign Silhouette"
                    className="p-2 border border-[#F8F6F2]/20 hover:border-[#F8F6F2] text-[#F8F6F2] transition-colors focus:outline-none"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next Campaign Silhouette"
                    className="p-2 border border-[#F8F6F2]/20 hover:border-[#F8F6F2] text-[#F8F6F2] transition-colors focus:outline-none"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* STEP 7 — Subtle Scroll Indicator */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 cursor-pointer group"
          onClick={handleScrollDown}
          role="button"
          tabIndex={0}
          aria-label="Scroll to discover collection"
        >
          <span className="text-[9px] uppercase tracking-[0.32em] text-[#918C84] group-hover:text-[#F8F6F2] transition-colors">
            Scroll
          </span>
          <div className="w-[1px] h-7 bg-[#918C84]/40 relative overflow-hidden">
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [-12, 28],
                      opacity: [0, 1, 0],
                    }
              }
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-3 bg-[#D8C6A5]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
