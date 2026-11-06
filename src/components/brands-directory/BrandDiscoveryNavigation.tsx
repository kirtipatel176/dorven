"use client";

import React, { useRef } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

export type BrandCategory =
  | "ALL BRANDS"
  | "LUXURY"
  | "SNEAKERS"
  | "SPORTSWEAR"
  | "LIFESTYLE";

interface BrandDiscoveryNavigationProps {
  categories: BrandCategory[];
  activeCategory: BrandCategory;
  onSelectCategory: (cat: BrandCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  availableLetters: string[];
  activeLetter: string | null;
  onSelectLetter: (letter: string | null) => void;
  matchedCount: number;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function BrandDiscoveryNavigation({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  availableLetters,
  activeLetter,
  onSelectLetter,
  matchedCount,
}: BrandDiscoveryNavigationProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="sticky top-[69px] sm:top-[77px] z-30 bg-[#F8F6F2]/95 backdrop-blur-md border-b border-[#E5E0D8] transition-all">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* TOP ROW: Category Navigation & Brand Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 sm:py-5 border-b border-[#E5E0D8]/60">
          {/* Categories Tab List */}
          <nav
            aria-label="Brand Categories"
            className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-1"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`relative pb-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] transition-colors whitespace-nowrap focus:outline-none ${
                    isActive
                      ? "text-[#171717] font-semibold"
                      : "text-[#858078] hover:text-[#171717]"
                  }`}
                >
                  <span>{cat}</span>

                  {isActive && (
                    <motion.div
                      layoutId="brandCategoryUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#171717]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Minimalist Search Bar */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-72">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search brand, origin, heritage..."
                className="w-full bg-[#EEEAE3]/70 hover:bg-[#EEEAE3] focus:bg-[#FFFFFF] border border-[#E5E0D8] focus:border-[#171717] text-xs font-sans text-[#171717] placeholder-[#858078] px-3.5 py-2 pl-9 pr-8 transition-all focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#858078] pointer-events-none" />

              {searchQuery && (
                <button
                  onClick={() => {
                    onSearchChange("");
                    searchInputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#858078] hover:text-[#171717] p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Results count pill */}
            <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest text-[#858078] whitespace-nowrap">
              ({matchedCount} {matchedCount === 1 ? "Label" : "Labels"})
            </span>
          </div>
        </div>

        {/* BOTTOM ROW: Alphabetical A–Z Navigation Strip */}
        <div className="flex items-center justify-between py-2.5 overflow-x-auto no-scrollbar gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#858078] mr-2 hidden md:inline">
              Index:
            </span>

            <button
              onClick={() => onSelectLetter(null)}
              className={`text-[10px] font-mono tracking-widest px-2 py-0.5 transition-colors ${
                activeLetter === null
                  ? "bg-[#171717] text-[#F8F6F2] font-semibold"
                  : "text-[#858078] hover:text-[#171717]"
              }`}
            >
              ALL
            </button>

            {ALPHABET.map((letter) => {
              const hasBrands = availableLetters.includes(letter);
              const isSelected = activeLetter === letter;

              return (
                <button
                  key={letter}
                  disabled={!hasBrands}
                  onClick={() => onSelectLetter(isSelected ? null : letter)}
                  className={`text-[10px] font-mono tracking-wider px-1.5 py-0.5 transition-all ${
                    isSelected
                      ? "bg-[#171717] text-[#F8F6F2] font-semibold"
                      : hasBrands
                      ? "text-[#171717] font-semibold hover:text-[#C6AD83] cursor-pointer"
                      : "text-[#858078]/35 cursor-not-allowed"
                  }`}
                  title={hasBrands ? `Filter brands starting with ${letter}` : undefined}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          {(activeLetter || searchQuery || activeCategory !== "ALL BRANDS") && (
            <button
              onClick={() => {
                onSelectLetter(null);
                onSearchChange("");
                onSelectCategory("ALL BRANDS");
              }}
              className="text-[10px] font-mono uppercase tracking-widest text-[#858078] hover:text-[#171717] underline decoration-[#E5E0D8] underline-offset-4 whitespace-nowrap pl-4"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

