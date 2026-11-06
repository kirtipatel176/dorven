"use client";

import React, { useState, useMemo } from "react";
import { Brand } from "@/types/brand";
import { Product } from "@/types/product";
import { BrandEditorialHeader } from "./BrandEditorialHeader";
import {
  BrandDiscoveryNavigation,
  BrandCategory,
} from "./BrandDiscoveryNavigation";
import { FeaturedBrandSection } from "./FeaturedBrandSection";
import { BrandDirectoryGrid } from "./BrandDirectoryGrid";

interface BrandsDirectoryViewProps {
  brands: Brand[];
  products: Product[];
}

const CATEGORIES: BrandCategory[] = [
  "ALL BRANDS",
  "LUXURY",
  "SNEAKERS",
  "SPORTSWEAR",
  "LIFESTYLE",
];

export function BrandsDirectoryView({
  brands,
  products,
}: BrandsDirectoryViewProps) {
  const [activeCategory, setActiveCategory] = useState<BrandCategory>("ALL BRANDS");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  // Helper: Get verified product count for any brand
  const getProductCount = useMemo(() => {
    return (brand: Brand) => {
      return products.filter(
        (p) =>
          p.brand.toLowerCase() === brand.name.toLowerCase() ||
          (brand.name.toLowerCase().includes("adidas") &&
            p.brand.toLowerCase().includes("adidas")) ||
          (brand.isExclusiveLabel && p.isOurLabel)
      ).length;
    };
  }, [products]);

  // Compute available first letters across all brands
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    brands.forEach((b) => {
      const firstChar = b.name.trim().charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstChar)) {
        letters.add(firstChar);
      }
    });
    return Array.from(letters).sort();
  }, [brands]);

  // Filtered brands based on Category, Search Query, and Alphabetical filter
  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      // 1. Category Filter
      if (activeCategory !== "ALL BRANDS") {
        const matchesCategory =
          brand.categories?.includes(activeCategory) ||
          (activeCategory === "LUXURY" && brand.isExclusiveLabel) ||
          (activeCategory === "SNEAKERS" &&
            ["nike", "adidas", "new-balance", "puma", "asics"].includes(brand.id));

        if (!matchesCategory) return false;
      }

      // 2. Alphabet Filter
      if (activeLetter) {
        const firstLetter = brand.name.trim().charAt(0).toUpperCase();
        if (firstLetter !== activeLetter) return false;
      }

      // 3. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = brand.name.toLowerCase().includes(query);
        const matchesOrigin = brand.origin.toLowerCase().includes(query);
        const matchesTagline = brand.tagline.toLowerCase().includes(query);
        const matchesDesc = brand.description.toLowerCase().includes(query);
        const matchesYear = brand.foundedYear.toString().includes(query);

        if (
          !matchesName &&
          !matchesOrigin &&
          !matchesTagline &&
          !matchesDesc &&
          !matchesYear
        ) {
          return false;
        }
      }

      return true;
    });
  }, [brands, activeCategory, activeLetter, searchQuery]);

  // Featured brands subset: brands marked as featured that match the current filter
  const featuredBrands = useMemo(() => {
    // When no search or specific letter is active, show the pinnacle featured editorials
    if (!searchQuery && !activeLetter) {
      return filteredBrands.filter((b) => b.featured);
    }
    // If user searched, only show featured if they match
    return filteredBrands.filter((b) => b.featured);
  }, [filteredBrands, searchQuery, activeLetter]);

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#171717] selection:bg-[#C6AD83]/30">
      {/* 03. EDITORIAL INTRODUCTION */}
      <BrandEditorialHeader
        totalBrands={brands.length}
        totalProducts={products.length}
      />

      {/* 04. BRAND DISCOVERY NAVIGATION (Sticky) */}
      <BrandDiscoveryNavigation
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        availableLetters={availableLetters}
        activeLetter={activeLetter}
        onSelectLetter={setActiveLetter}
        matchedCount={filteredBrands.length}
      />

      {/* 05. FEATURED BRAND EDITORIAL (Alternating Asymmetric Layouts) */}
      {featuredBrands.length > 0 && (
        <FeaturedBrandSection
          brands={featuredBrands}
          getProductCount={getProductCount}
        />
      )}

      {/* 06. COMPLETE BRAND DIRECTORY (All Brands Grid) */}
      <BrandDirectoryGrid
        brands={filteredBrands}
        getProductCount={getProductCount}
        activeFilterTitle={
          activeLetter
            ? `Letter "${activeLetter}" • ${activeCategory}`
            : activeCategory
        }
      />
    </div>
  );
}

