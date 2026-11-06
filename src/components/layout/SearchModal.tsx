"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { initialProducts } from "@/data/products";
import { Product } from "@/types/product";

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  topOffset?: number;
}

const suggestedQueries = [
  "DORVEN Monolith",
  "Italian Calfskin",
  "Samba OG",
  "Boston Clog",
  "990v6 Grey",
  "Gel-Kayano 14",
  "Loafers",
];

export function SearchModal({ isOpen, onClose, topOffset = 72 }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus and scroll lock management
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
      setIsFocused(false);
    }
  }, [isOpen]);

  // ESC keyboard support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Live results query search
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }

    const matched = initialProducts.filter((p) => {
      const name = p.name.toLowerCase();
      const brand = p.brand.toLowerCase();
      const category = p.category.toLowerCase();
      const sku = p.sku.toLowerCase();
      const desc = p.description?.toLowerCase() || "";
      return (
        name.includes(q) ||
        brand.includes(q) ||
        category.includes(q) ||
        sku.includes(q) ||
        desc.includes(q)
      );
    });

    const sorted = matched.sort((a, b) => {
      const aExact = a.name.toLowerCase().startsWith(q) || a.brand.toLowerCase().startsWith(q);
      const bExact = b.name.toLowerCase().startsWith(q) || b.brand.toLowerCase().startsWith(q);
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return (b.popularityScore || 0) - (a.popularityScore || 0);
    });

    setResults(sorted.slice(0, 6));
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle Dim Backdrop covering viewport beneath navbar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-[#171717]/35 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Compact Elegant Search Overlay beneath the navbar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 right-0 z-40 bg-[#F8F6F2] border-b border-[#E8DECA] shadow-[0_20px_40px_rgba(23,23,23,0.08)] overflow-hidden"
            style={{ top: `${topOffset}px` }}
            onClick={(e) => e.stopPropagation()}
            role="search"
            aria-label="Site search"
          >
            <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 py-7 sm:py-9">
              {/* Top Row: Serif Heading & Minimal Close */}
              <div className="flex items-baseline justify-between">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-[#171717] select-none leading-none">
                  Search
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#171717]/40 hidden sm:inline select-none">
                    ESC to close
                  </span>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close search overlay"
                    className="p-1 text-[#171717]/60 hover:text-[#171717] transition-colors focus:outline-none"
                  >
                    <X className="h-4 w-4 stroke-[1.25]" />
                  </button>
                </div>
              </div>

              {/* Minimal Search Input with Animated Champagne Underline */}
              <form onSubmit={handleSubmit} className="mt-6 sm:mt-8">
                <div className="relative">
                  <div className="flex items-center justify-between pb-2.5">
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder="Search by footwear, brand, category, or SKU..."
                      className="w-full bg-transparent text-[#171717] placeholder:text-[#171717]/35 text-base sm:text-lg lg:text-xl font-light tracking-wide focus:outline-none"
                      autoComplete="off"
                      spellCheck="false"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery("");
                          inputRef.current?.focus();
                        }}
                        className="text-[10px] uppercase tracking-[0.2em] text-[#171717]/50 hover:text-[#171717] transition-colors ml-4 shrink-0 focus:outline-none"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Base resting line */}
                  <div className="h-[1px] w-full bg-[#171717]/10" />

                  {/* Thin animated champagne underline on focus */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C6AD83]"
                    initial={false}
                    animate={{
                      scaleX: isFocused ? 1 : 0,
                      opacity: isFocused ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{ originX: 0 }}
                  />
                </div>
              </form>

              {/* Content Area: Suggested Searches OR Live Results */}
              <div className="mt-6 sm:mt-7">
                {/* When no query: Suggested searches displayed as simple understated text */}
                {!query.trim() && (
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#171717]/50 font-medium block mb-2.5">
                      Suggested Searches
                    </span>
                    <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-2">
                      {suggestedQueries.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setQuery(item);
                            inputRef.current?.focus();
                          }}
                          className="text-xs sm:text-sm text-[#171717]/75 hover:text-[#171717] hover:underline underline-offset-4 decoration-[#C6AD83] transition-colors text-left"
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#171717]/10 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#171717]/50">
                      <span>Curated European Footwear</span>
                      <Link
                        href="/shop"
                        onClick={onClose}
                        className="text-[#171717] hover:text-[#C6AD83] transition-colors underline underline-offset-4 decoration-[#C6AD83]"
                      >
                        Browse All Footwear &rarr;
                      </Link>
                    </div>
                  </div>
                )}

                {/* Live Results with small product thumbnails and brand names */}
                {query.trim() && (
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#171717]/50 font-medium">
                        Live Results ({results.length})
                      </span>
                    </div>

                    {results.length > 0 ? (
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 max-h-[46vh] overflow-y-auto pr-1">
                          {results.map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.slug}`}
                              onClick={onClose}
                              className="group flex items-center gap-3.5 py-1.5 border-b border-[#171717]/5 hover:border-[#C6AD83]/60 transition-colors"
                            >
                              {/* Small product thumbnail - clean geometric aspect */}
                              <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-[#EFECE6] overflow-hidden">
                                <Image
                                  src={product.primaryImage}
                                  alt={product.name}
                                  fill
                                  sizes="64px"
                                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <span className="text-[10px] uppercase tracking-[0.22em] text-[#171717]/60 font-medium block truncate">
                                  {product.brand}
                                </span>
                                <h4 className="text-sm font-normal text-[#171717] group-hover:text-[#C6AD83] transition-colors truncate">
                                  {product.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-xs text-[#171717]/85 font-light">
                                    {product.formattedPrice}
                                  </span>
                                  <span className="text-[9px] uppercase tracking-wider text-[#171717]/40">
                                    &bull; {product.category}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#171717]/10 flex items-center justify-between text-xs text-[#171717]/60">
                          <span className="text-[11px] text-[#171717]/50">
                            Showing top matches
                          </span>
                          <Link
                            href={`/shop?q=${encodeURIComponent(query)}`}
                            onClick={onClose}
                            className="text-[11px] uppercase tracking-[0.18em] text-[#171717] hover:text-[#C6AD83] transition-colors underline underline-offset-4 decoration-[#C6AD83]"
                          >
                            View all results for &ldquo;{query}&rdquo; &rarr;
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="py-6 text-left">
                        <p className="text-sm text-[#171717]/70 font-light">
                          No footwear matches &ldquo;{query}&rdquo;.
                        </p>
                        <p className="text-xs text-[#171717]/45 mt-1.5">
                          Try searching for brands like DORVEN Signature, Nike, Adidas, or silhouettes like Clog or Runner.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export const SearchOverlay = SearchModal;
