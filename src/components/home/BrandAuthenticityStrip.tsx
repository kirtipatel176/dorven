import React from "react";

/**
 * Brand Authenticity Strip
 *
 * Confident editorial typography, clean whitespace, and verified
 * global footwear sourcing provenance.
 */
export function BrandAuthenticityStrip() {
  return (
    <section id="brand-authenticity-section" className="w-full bg-white border-y border-neutral-200 py-7 sm:py-9">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr_1px_1fr] gap-y-6 lg:gap-x-10 items-start">

          {/* — 1 — */}
          <div className="py-1">
            <p className="text-[11px] text-neutral-400 uppercase tracking-widest mb-2">
              Sourcing
            </p>
            <h3 className="text-[15px] font-semibold text-neutral-900 leading-snug">
              100% Genuine Products
            </h3>
            <p className="text-[13px] text-neutral-500 mt-1 leading-relaxed">
              Direct verification &amp; verified supply sourcing
            </p>
          </div>

          {/* divider */}
          <div className="hidden lg:block w-px bg-neutral-200 self-stretch" />

          {/* — 2 — */}
          <div className="py-1 border-t lg:border-t-0 border-neutral-100 pt-5 lg:pt-1">
            <p className="text-[11px] text-neutral-400 uppercase tracking-widest mb-2">
              Brands
            </p>
            <h3 className="text-[15px] font-semibold text-neutral-900 leading-snug">
              Authentic Branded Footwear
            </h3>
            <p className="text-[13px] text-neutral-500 mt-1 leading-relaxed">
              Original inventory from global labels
            </p>
          </div>

          {/* divider */}
          <div className="hidden lg:block w-px bg-neutral-200 self-stretch" />

          {/* — 3 — */}
          <div className="py-1 border-t lg:border-t-0 border-neutral-100 pt-5 lg:pt-1">
            <p className="text-[11px] text-neutral-400 uppercase tracking-widest mb-2">
              In-House
            </p>
            <h3 className="text-[15px] font-semibold text-neutral-900 leading-snug">
              Original In-House Collection
            </h3>
            <p className="text-[13px] text-neutral-500 mt-1 leading-relaxed">
              DORVEN Signature bespoke atelier craft
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
