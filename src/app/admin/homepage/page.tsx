"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { defaultHeroBanners, HeroBanner } from "@/data/heroBanners";
import { Check, Palette, ArrowRight, Eye, RefreshCw } from "lucide-react";

export default function AdminHomepagePage() {
  const [activeBanner, setActiveBanner] = useState<HeroBanner>(defaultHeroBanners[0]);
  const [headline, setHeadline] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [primaryCtaText, setPrimaryCtaText] = useState("");
  const [primaryCtaLink, setPrimaryCtaLink] = useState("");
  const [secondaryCtaText, setSecondaryCtaText] = useState("");
  const [secondaryCtaLink, setSecondaryCtaLink] = useState("");
  const [editorialBadge, setEditorialBadge] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("dorven_active_hero_banner");
      const current = stored ? JSON.parse(stored) : defaultHeroBanners[0];
      setActiveBanner(current);
      setHeadline(current.headline);
      setSubheadline(current.subheadline);
      setImageUrl(current.imageUrl);
      setPrimaryCtaText(current.primaryCtaText);
      setPrimaryCtaLink(current.primaryCtaLink);
      setSecondaryCtaText(current.secondaryCtaText);
      setSecondaryCtaLink(current.secondaryCtaLink);
      setEditorialBadge(current.editorialBadge || "SPRING / SUMMER 2025 ATELIER");
    } catch {
      // fallback
    }
  }, []);

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: HeroBanner = {
      ...activeBanner,
      headline,
      subheadline,
      imageUrl,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      editorialBadge,
    };

    localStorage.setItem("dorven_active_hero_banner", JSON.stringify(updated));
    setActiveBanner(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleResetToDefault = () => {
    localStorage.removeItem("dorven_active_hero_banner");
    setActiveBanner(defaultHeroBanners[0]);
    setHeadline(defaultHeroBanners[0].headline);
    setSubheadline(defaultHeroBanners[0].subheadline);
    setImageUrl(defaultHeroBanners[0].imageUrl);
    setPrimaryCtaText(defaultHeroBanners[0].primaryCtaText);
    setPrimaryCtaLink(defaultHeroBanners[0].primaryCtaLink);
    setSecondaryCtaText(defaultHeroBanners[0].secondaryCtaText);
    setSecondaryCtaLink(defaultHeroBanners[0].secondaryCtaLink);
    setEditorialBadge(defaultHeroBanners[0].editorialBadge || "");
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">
            Homepage & Hero Banner Management
          </h1>
          <p className="text-xs text-mutedGrey mt-0.5">
            Configure campaign art direction, typography headlines, and CTA navigation links
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/banner-generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-champagne text-charcoal text-xs font-bold rounded hover:bg-champagneLight transition-colors"
          >
            <Palette className="h-4 w-4" />
            <span>Open Banner Studio</span>
          </Link>
        </div>
      </div>

      {/* Live Preview Box */}
      <div className="bg-white rounded-xl border border-charcoal/10 p-6 shadow-subtle">
        <h2 className="text-xs uppercase tracking-luxury font-bold text-charcoal mb-4 flex items-center justify-between">
          <span>Live Hero Campaign Preview</span>
          <Link
            href="/"
            target="_blank"
            className="text-champagneDark hover:underline flex items-center gap-1 font-semibold"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Preview in New Tab</span>
          </Link>
        </h2>

        <div className="relative rounded-lg overflow-hidden bg-charcoal min-h-[300px] flex items-center p-8">
          <Image
            src={imageUrl || activeBanner.imageUrl}
            alt="Hero Preview"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/50 to-transparent" />

          <div className="relative z-10 max-w-lg text-white">
            <span className="text-[10px] tracking-widest uppercase font-bold text-champagne block mb-2">
              {editorialBadge || "SEASONAL CAMPAIGN"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              {headline || "STEP INTO YOUR STYLE."}
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed mb-4">
              {subheadline || "Discover premium footwear from leading brands and our exclusive collection."}
            </p>
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 bg-white text-charcoal text-[11px] font-bold uppercase tracking-wider rounded">
                {primaryCtaText || "Explore Collection"}
              </span>
              <span className="px-3.5 py-1.5 border border-white/40 text-white text-[11px] font-semibold uppercase tracking-wider rounded">
                {secondaryCtaText || "Discover Our Label"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner Editor Form */}
      <div className="bg-white rounded-xl border border-charcoal/10 p-6 sm:p-8 shadow-subtle">
        <div className="flex items-center justify-between pb-4 border-b border-charcoal/10 mb-6">
          <h2 className="text-sm font-bold uppercase tracking-luxury text-charcoal">
            Edit Hero Banner Parameters
          </h2>
          <button
            type="button"
            onClick={handleResetToDefault}
            className="text-xs text-mutedGrey hover:text-charcoal flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Reset to Blueprint Defaults</span>
          </button>
        </div>

        <form onSubmit={handleSaveBanner} className="space-y-4 text-xs">
          {/* Badge & Headline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-charcoal mb-1">
                Editorial Badge
              </label>
              <input
                type="text"
                value={editorialBadge}
                onChange={(e) => setEditorialBadge(e.target.value)}
                placeholder="e.g. SPRING / SUMMER 2025"
                className="w-full px-3 py-2 rounded bg-warmIvory/50 border border-charcoal/20 text-charcoal focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-semibold uppercase tracking-wider text-charcoal mb-1">
                Headline (Section 4.2 Blueprint: STEP INTO YOUR STYLE.)
              </label>
              <input
                type="text"
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3 py-2 rounded bg-warmIvory/50 border border-charcoal/20 text-charcoal focus:outline-none font-bold"
              />
            </div>
          </div>

          {/* Supporting Subheadline */}
          <div>
            <label className="block font-semibold uppercase tracking-wider text-charcoal mb-1">
              Supporting Text
            </label>
            <textarea
              rows={2}
              value={subheadline}
              onChange={(e) => setSubheadline(e.target.value)}
              className="w-full px-3 py-2 rounded bg-warmIvory/50 border border-charcoal/20 text-charcoal focus:outline-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-semibold uppercase tracking-wider text-charcoal mb-1">
              Hero Image URL (High-Resolution Lifestyle Sneaker Artwork)
            </label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 rounded bg-warmIvory/50 border border-charcoal/20 text-charcoal focus:outline-none"
            />
          </div>

          {/* Primary CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-charcoal mb-1">
                Primary CTA Button Text
              </label>
              <input
                type="text"
                value={primaryCtaText}
                onChange={(e) => setPrimaryCtaText(e.target.value)}
                className="w-full px-3 py-2 rounded bg-warmIvory/50 border border-charcoal/20 text-charcoal focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-wider text-charcoal mb-1">
                Primary CTA Link
              </label>
              <input
                type="text"
                value={primaryCtaLink}
                onChange={(e) => setPrimaryCtaLink(e.target.value)}
                className="w-full px-3 py-2 rounded bg-warmIvory/50 border border-charcoal/20 text-charcoal focus:outline-none"
              />
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-charcoal mb-1">
                Secondary CTA Button Text
              </label>
              <input
                type="text"
                value={secondaryCtaText}
                onChange={(e) => setSecondaryCtaText(e.target.value)}
                className="w-full px-3 py-2 rounded bg-warmIvory/50 border border-charcoal/20 text-charcoal focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-wider text-charcoal mb-1">
                Secondary CTA Link
              </label>
              <input
                type="text"
                value={secondaryCtaLink}
                onChange={(e) => setSecondaryCtaLink(e.target.value)}
                className="w-full px-3 py-2 rounded bg-warmIvory/50 border border-charcoal/20 text-charcoal focus:outline-none"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 flex items-center justify-between">
            <button
              type="submit"
              className="px-8 py-3 bg-charcoal text-white font-bold text-xs uppercase tracking-luxury rounded hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Update Live Homepage Hero
            </button>

            {isSaved && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold animate-in fade-in">
                <Check className="h-4 w-4" />
                <span>Changes Published to Homepage</span>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
