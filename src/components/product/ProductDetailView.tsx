"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Mail, Ruler, ShieldCheck, Share2, Check } from "lucide-react";
import { Product, StockStatus } from "@/types/product";
import { ImageGallery } from "./ImageGallery";
import { SizeGuideModal } from "./SizeGuideModal";
import { EnquiryModal } from "./EnquiryModal";
import { ProductCard } from "./ProductCard";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : "UK 8"
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0] : "Standard"
  );
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Compute variant-specific stock status
  const matchedVariant = product.variants.find(
    (v) =>
      v.size.toLowerCase() === selectedSize.toLowerCase() &&
      v.color.toLowerCase() === selectedColor.toLowerCase()
  );

  // Fallback to size-only match or default variant
  const activeStockStatus: StockStatus =
    matchedVariant?.stockStatus ||
    product.variants.find((v) => v.size.toLowerCase() === selectedSize.toLowerCase())
      ?.stockStatus ||
    "In Stock";

  const getStockBadgeStyle = (status: StockStatus) => {
    switch (status) {
      case "In Stock":
        return {
          pill: "bg-emerald-50 text-emerald-800 border-emerald-200",
          dot: "bg-emerald-500",
          text: "Available in studio & for delivery",
        };
      case "Limited Stock":
        return {
          pill: "bg-amber-50 text-amber-800 border-amber-200",
          dot: "bg-amber-500",
          text: "Few pairs remaining in this size",
        };
      case "Out of Stock":
        return {
          pill: "bg-neutral-100 text-neutral-600 border-neutral-200",
          dot: "bg-neutral-400",
          text: "Currently unavailable in this configuration",
        };
      default:
        return {
          pill: "bg-stone-100 text-stone-800 border-stone-200",
          dot: "bg-champagneDark",
          text: "Special allocation — contact for reservation",
        };
    }
  };

  const currentStockInfo = getStockBadgeStyle(activeStockStatus);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://dorvenfootwear.in/product/${product.slug}`;

  const whatsAppUrl = getProductWhatsAppUrl({
    productName: product.name,
    brand: product.brand,
    sku: matchedVariant?.sku || product.sku,
    selectedSize,
    selectedColor,
    productUrl: currentUrl,
  });

  return (
    <div className="py-10 sm:py-16 bg-warmIvory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-mutedGrey mb-8 uppercase tracking-luxury">
          <Link href="/" className="hover:text-charcoal transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-charcoal transition-colors">
            Catalogue
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-charcoal transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-charcoal font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7">
            <ImageGallery images={product.galleryImages} productName={product.name} />
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Brand & In-House Badge */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-luxury font-bold text-champagneDark">
                {product.isOurLabel ? "DORVEN SIGNATURE ATELIER" : product.brand}
              </span>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1 text-xs text-mutedGrey hover:text-charcoal transition-colors"
                aria-label="Share product"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-medium">Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-charcoal tracking-tight leading-tight mb-3">
              {product.name}
            </h1>

            {/* SKU & Category Strip */}
            <div className="flex items-center gap-3 text-xs text-mutedGrey mb-6">
              <span>SKU: {product.sku}</span>
              <span>•</span>
              <span>{product.gender}</span>
              <span>•</span>
              <span>{product.category}</span>
            </div>

            {/* Price Presentation */}
            <div className="mb-6 p-4 rounded-lg bg-white border border-charcoal/5 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-mutedGrey font-medium block">
                  Catalogue Price (India)
                </span>
                <span className="text-2xl font-extrabold text-charcoal">
                  {product.formattedPrice || (product.price ? `₹${product.price.toLocaleString("en-IN")}` : "Price On Request")}
                </span>
              </div>
              <span className="text-[11px] text-mutedGrey">
                Inclusive of all taxes
              </span>
            </div>

            {/* Colour Variant Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-luxury font-bold text-charcoal">
                    Selected Colour: <span className="text-mutedGrey font-normal">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`px-3.5 py-1.5 rounded text-xs font-medium border transition-all ${
                        selectedColor === c
                          ? "bg-charcoal text-white border-charcoal shadow-sm"
                          : "bg-white text-charcoal border-charcoal/15 hover:border-charcoal/40"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Variant Selection & Size Guide */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-luxury font-bold text-charcoal">
                    Select Size: <span className="text-mutedGrey font-normal">{selectedSize} (UK/India)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="inline-flex items-center gap-1 text-xs text-champagneDark hover:underline font-semibold"
                  >
                    <Ruler className="h-3.5 w-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`py-2.5 text-xs font-semibold rounded border transition-all ${
                        selectedSize === s
                          ? "bg-charcoal text-white border-charcoal shadow-sm"
                          : "bg-white text-charcoal border-charcoal/15 hover:border-charcoal/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live Variant-Specific Stock Indicator */}
            <div className="mb-8 p-3.5 rounded-lg bg-white border border-charcoal/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className={`h-2.5 w-2.5 rounded-full ${currentStockInfo.dot} animate-pulse`} />
                <div>
                  <span className="text-xs font-bold text-charcoal block">
                    {activeStockStatus}
                  </span>
                  <span className="text-[11px] text-mutedGrey">
                    {currentStockInfo.text}
                  </span>
                </div>
              </div>

              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${currentStockInfo.pill}`}>
                {selectedSize}
              </span>
            </div>

            {/* Primary Action Buttons (Strictly NO Cart/Checkout!) */}
            <div className="space-y-3 mb-8">
              {/* WhatsApp Enquiry Button */}
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#25D366] text-white font-bold text-xs uppercase tracking-luxury rounded hover:bg-[#20ba59] active:scale-[0.99] transition-all shadow-subtle"
              >
                <MessageCircle className="h-4 w-4 fill-white stroke-none" />
                <span>Enquire on WhatsApp</span>
              </a>

              {/* Contact Us Modal Trigger */}
              <button
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-4 bg-charcoal text-white font-bold text-xs uppercase tracking-luxury rounded hover:bg-neutral-800 active:scale-[0.99] transition-all"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Concierge / Check Availability</span>
              </button>

              <p className="text-[11px] text-center text-mutedGrey">
                DORVEN operates as a curated catalogue. We provide dedicated concierge trial reservations and personal assistance.
              </p>
            </div>

            {/* Product Specifications Table */}
            <div className="border-t border-charcoal/10 pt-6">
              <h3 className="text-xs font-bold uppercase tracking-luxury text-charcoal mb-4">
                Specifications & Provenance
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-xs">
                <div>
                  <dt className="text-mutedGrey text-[11px] uppercase">Upper Material</dt>
                  <dd className="font-medium text-charcoal">{product.specifications.upperMaterial}</dd>
                </div>
                <div>
                  <dt className="text-mutedGrey text-[11px] uppercase">Sole Engineering</dt>
                  <dd className="font-medium text-charcoal">{product.specifications.soleMaterial}</dd>
                </div>
                <div>
                  <dt className="text-mutedGrey text-[11px] uppercase">Closure</dt>
                  <dd className="font-medium text-charcoal">{product.specifications.closure}</dd>
                </div>
                <div>
                  <dt className="text-mutedGrey text-[11px] uppercase">Provenance</dt>
                  <dd className="font-medium text-charcoal">{product.specifications.origin}</dd>
                </div>
                {product.specifications.weight && (
                  <div>
                    <dt className="text-mutedGrey text-[11px] uppercase">Weight</dt>
                    <dd className="font-medium text-charcoal">{product.specifications.weight}</dd>
                  </div>
                )}
                {product.specifications.warranty && (
                  <div>
                    <dt className="text-mutedGrey text-[11px] uppercase">Guarantee</dt>
                    <dd className="font-medium text-charcoal">{product.specifications.warranty}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="mt-16 pt-12 border-t border-charcoal/10">
          <div className="max-w-3xl">
            <h3 className="text-xs uppercase tracking-luxury font-bold text-champagneDark mb-3">
              EDITORIAL DESIGN NOTES
            </h3>
            <h4 className="text-2xl font-bold text-charcoal mb-4">
              About the {product.name}
            </h4>
            <div className="text-sm text-neutral-700 leading-relaxed space-y-4">
              <p>{product.longDescription || product.description}</p>
            </div>
          </div>
        </div>

        {/* Related Footwear Collection */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-charcoal/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-luxury font-bold text-champagneDark block mb-1">
                  CURATED RECOMMENDATIONS
                </span>
                <h3 className="text-2xl font-extrabold text-charcoal">
                  Related Footwear
                </h3>
              </div>
              <Link
                href="/shop"
                className="text-xs font-semibold uppercase tracking-luxury text-charcoal hover:underline"
              >
                View Full Catalogue
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
      />
    </div>
  );
}
