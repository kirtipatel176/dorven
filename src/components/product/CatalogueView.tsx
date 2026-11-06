"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, X, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { Product, SortOption } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface CatalogueViewProps {
  initialProducts: Product[];
}

export function CatalogueView({ initialProducts }: CatalogueViewProps) {
  const searchParams = useSearchParams();

  // URL query pre-fills
  const initialCategory = searchParams.get("category");
  const initialBrand = searchParams.get("brand");
  const initialGender = searchParams.get("gender");
  const initialSort = (searchParams.get("sort") as SortOption) || "popularity";
  const initialQuery = searchParams.get("q") || searchParams.get("search") || "";

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Sync search query when URL parameters update
  useEffect(() => {
    const qParam = searchParams.get("q") || searchParams.get("search");
    if (qParam !== null) {
      setSearchQuery(qParam);
    }
  }, [searchParams]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialBrand ? [initialBrand] : []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedGenders, setSelectedGenders] = useState<string[]>(
    initialGender ? [initialGender] : []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedStockStatus, setSelectedStockStatus] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number>(30000);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Extract unique filter options from catalogue
  const availableBrands = useMemo(() => {
    return Array.from(new Set(initialProducts.map((p) => p.brand))).sort();
  }, [initialProducts]);

  const availableCategories = useMemo(() => {
    return Array.from(new Set(initialProducts.map((p) => p.category))).sort();
  }, [initialProducts]);

  const availableSizes = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"];
  const availableGenders = ["Men", "Women", "Unisex"];
  const availableStockStatuses = [
    "In Stock",
    "Limited Stock",
    "Out of Stock",
    "Contact for Availability",
  ];

  // Toggle helper
  const toggleItem = (list: string[], item: string, setter: (val: string[]) => void) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedGenders([]);
    setSelectedSizes([]);
    setSelectedStockStatus([]);
    setPriceMax(30000);
    setSortBy("popularity");
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.sku.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Brand
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Category
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // Gender
      if (selectedGenders.length > 0) {
        const matchesGender =
          selectedGenders.includes(product.gender) ||
          (product.gender === "Unisex" && (selectedGenders.includes("Men") || selectedGenders.includes("Women")));
        if (!matchesGender) return false;
      }

      // Sizes
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes.some((s) => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // Stock Status (from variants or primary variant)
      if (selectedStockStatus.length > 0) {
        const hasMatchingStatus = product.variants.some((v) =>
          selectedStockStatus.includes(v.stockStatus)
        );
        if (!hasMatchingStatus) return false;
      }

      // Price
      if (product.price && product.price > priceMax) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low-high") {
        return (a.price || 0) - (b.price || 0);
      }
      if (sortBy === "price-high-low") {
        return (b.price || 0) - (a.price || 0);
      }
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // Popularity default
      return (b.popularityScore || 0) - (a.popularityScore || 0);
    });
  }, [
    initialProducts,
    searchQuery,
    selectedBrands,
    selectedCategories,
    selectedGenders,
    selectedSizes,
    selectedStockStatus,
    priceMax,
    sortBy,
  ]);

  const activeFiltersCount =
    selectedBrands.length +
    selectedCategories.length +
    selectedGenders.length +
    selectedSizes.length +
    selectedStockStatus.length +
    (priceMax < 30000 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="py-10 bg-warmIvory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-charcoal/10 pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-luxury font-bold text-champagneDark block mb-2">
                CURATED ARCHIVE & NEW RELEASES
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight">
                Footwear Catalogue
              </h1>
              <p className="text-xs sm:text-sm text-mutedGrey mt-2">
                Discover {filteredProducts.length} curated footwear pairs from leading world brands and our signature atelier.
              </p>
            </div>

            {/* Mobile Filter Toggle & Sort Header */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-charcoal/15 rounded text-xs font-semibold text-charcoal shadow-sm"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-mutedGrey hidden sm:inline uppercase tracking-subtle">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 bg-white border border-charcoal/15 rounded text-xs font-semibold text-charcoal focus:outline-none focus:border-charcoal shadow-sm"
                >
                  <option value="popularity">Popularity</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Catalogue Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-8 pr-6 border-r border-charcoal/10">
            {/* Search Input */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-luxury text-charcoal">
                  Search
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] text-champagneDark hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reset All</span>
                  </button>
                )}
              </div>
              <div className="relative">
                <Search className="h-4 w-4 text-mutedGrey absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Model or brand..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-charcoal/15 rounded text-xs text-charcoal focus:outline-none focus:border-charcoal placeholder:text-mutedGrey/60"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-luxury text-charcoal mb-3">
                Style Category
              </h3>
              <div className="space-y-2">
                {availableCategories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 text-xs text-charcoal cursor-pointer hover:text-neutral-900"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleItem(selectedCategories, cat, setSelectedCategories)}
                      className="rounded border-charcoal/30 text-charcoal focus:ring-0"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-luxury text-charcoal mb-3">
                Gender / Fit
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {availableGenders.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleItem(selectedGenders, g, setSelectedGenders)}
                    className={`px-3 py-1.5 rounded text-xs font-medium border transition-all ${
                      selectedGenders.includes(g)
                        ? "bg-charcoal text-white border-charcoal"
                        : "bg-white text-charcoal border-charcoal/15 hover:border-charcoal/40"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-luxury text-charcoal mb-3">
                Brands & Label
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {availableBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 text-xs text-charcoal cursor-pointer hover:text-neutral-900"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleItem(selectedBrands, brand, setSelectedBrands)}
                      className="rounded border-charcoal/30 text-charcoal focus:ring-0"
                    />
                    <span className={brand === "DORVEN Signature" ? "font-bold text-champagneDark" : ""}>
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sizes (UK/India) */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-luxury text-charcoal mb-3">
                UK / India Size
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {availableSizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleItem(selectedSizes, s, setSelectedSizes)}
                    className={`py-2 text-xs font-semibold rounded border transition-all ${
                      selectedSizes.includes(s)
                        ? "bg-charcoal text-white border-charcoal shadow-sm"
                        : "bg-white text-charcoal border-charcoal/15 hover:border-charcoal/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Availability */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-luxury text-charcoal mb-3">
                Availability Status
              </h3>
              <div className="space-y-2">
                {availableStockStatuses.map((st) => (
                  <label
                    key={st}
                    className="flex items-center gap-2 text-xs text-charcoal cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStockStatus.includes(st)}
                      onChange={() => toggleItem(selectedStockStatus, st, setSelectedStockStatus)}
                      className="rounded border-charcoal/30 text-charcoal focus:ring-0"
                    />
                    <span>{st}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Max Price Filter */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-luxury text-charcoal">
                  Max Budget
                </h3>
                <span className="text-xs font-semibold text-charcoal">
                  Up to ₹{priceMax.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min={6000}
                max={30000}
                step={1000}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-charcoal cursor-pointer"
              />
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {/* Active Filters Pill Bar */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-white rounded-lg border border-charcoal/5">
                <span className="text-xs text-mutedGrey mr-1">Active:</span>

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-softStone text-charcoal text-xs">
                    &ldquo;{searchQuery}&rdquo;
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                  </span>
                )}

                {selectedBrands.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-softStone text-charcoal text-xs"
                  >
                    {b}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => toggleItem(selectedBrands, b, setSelectedBrands)}
                    />
                  </span>
                ))}

                {selectedCategories.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-softStone text-charcoal text-xs"
                  >
                    {c}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => toggleItem(selectedCategories, c, setSelectedCategories)}
                    />
                  </span>
                ))}

                {selectedSizes.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-softStone text-charcoal text-xs"
                  >
                    {s}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => toggleItem(selectedSizes, s, setSelectedSizes)}
                    />
                  </span>
                ))}

                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-champagneDark hover:underline ml-auto"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Products Render */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-charcoal/10 p-8">
                <h3 className="text-lg font-bold text-charcoal mb-2">
                  No footwear matches your selected criteria
                </h3>
                <p className="text-xs sm:text-sm text-mutedGrey max-w-md mx-auto mb-6">
                  Try broadening your price range, clearing brand filters, or enquire with our concierge regarding unlisted archival allocations.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-charcoal text-white text-xs font-semibold uppercase tracking-luxury rounded hover:bg-neutral-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex bg-charcoal/50 backdrop-blur-sm lg:hidden animate-in fade-in duration-200">
          <div className="relative w-full max-w-xs bg-warmIvory h-full p-6 overflow-y-auto ml-auto shadow-modal flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-charcoal/10 mb-6">
                <h3 className="text-sm font-bold uppercase tracking-luxury text-charcoal">
                  Filter Footwear
                </h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 rounded-full text-mutedGrey hover:text-charcoal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Filter Options */}
              <div className="space-y-6 text-xs">
                {/* Brand */}
                <div>
                  <h4 className="font-bold uppercase tracking-wider mb-2">Brand</h4>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {availableBrands.map((b) => (
                      <label key={b} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(b)}
                          onChange={() => toggleItem(selectedBrands, b, setSelectedBrands)}
                        />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <h4 className="font-bold uppercase tracking-wider mb-2">Category</h4>
                  <div className="space-y-1.5">
                    {availableCategories.map((c) => (
                      <label key={c} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(c)}
                          onChange={() => toggleItem(selectedCategories, c, setSelectedCategories)}
                        />
                        <span>{c}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <h4 className="font-bold uppercase tracking-wider mb-2">Size (UK/India)</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleItem(selectedSizes, s, setSelectedSizes)}
                        className={`py-1.5 rounded border text-xs ${
                          selectedSizes.includes(s)
                            ? "bg-charcoal text-white"
                            : "bg-white text-charcoal border-charcoal/20"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-charcoal/10 mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-1/2 py-2.5 bg-softStone text-charcoal text-xs font-semibold rounded"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-1/2 py-2.5 bg-charcoal text-white text-xs font-semibold rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
