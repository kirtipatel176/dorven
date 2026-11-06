"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Palette,
  Send,
  Smartphone,
  Tablet,
  Monitor,
  Check,
  ArrowRight,
  Download,
  RotateCcw,
} from "lucide-react";
import { defaultHeroBanners, HeroBanner } from "@/data/heroBanners";

const campaignPresetImages = [
  {
    name: "Architectural Studio Suede",
    url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2000&auto=format&fit=crop",
    vibe: "Minimalist / Quiet Luxury",
  },
  {
    name: "Pinnacle Performance Runner",
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop",
    vibe: "Athletic & High Energy",
  },
  {
    name: "Terrace Classic Heritage",
    url: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2000&auto=format&fit=crop",
    vibe: "Vintage Terrace / Streetwear",
  },
  {
    name: "Swiss Precision Geometry",
    url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=2000&auto=format&fit=crop",
    vibe: "High-Tech Ergonomics",
  },
  {
    name: "German Bio-Cork Clog",
    url: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=2000&auto=format&fit=crop",
    vibe: "Organic Comfort & Leisure",
  },
];

export default function BannerGeneratorPage() {
  const [headline, setHeadline] = useState("STEP INTO YOUR STYLE.");
  const [subheadline, setSubheadline] = useState(
    "Discover premium footwear from leading brands and our exclusive collection."
  );
  const [selectedImage, setSelectedImage] = useState(campaignPresetImages[0].url);
  const [editorialBadge, setEditorialBadge] = useState("SPRING / SUMMER 2025 ATELIER");
  const [overlayDarkness, setOverlayDarkness] = useState(70);
  const [devicePreview, setDevicePreview] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isPublished, setIsPublished] = useState(false);

  const handleApplyToLiveHero = () => {
    const bannerPayload: HeroBanner = {
      id: `hero_custom_${Date.now()}`,
      headline,
      subheadline,
      imageUrl: selectedImage,
      primaryCtaText: "Explore Collection",
      primaryCtaLink: "/shop",
      secondaryCtaText: "Discover Our Label",
      secondaryCtaLink: "/our-label",
      isActive: true,
      editorialBadge,
    };

    localStorage.setItem("dorven_active_hero_banner", JSON.stringify(bannerPayload));
    setIsPublished(true);
    setTimeout(() => setIsPublished(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury font-bold text-champagneDark mb-1">
            <Palette className="h-4 w-4" />
            <span>CANVA-STYLE EDITORIAL BANNER STUDIO</span>
          </div>
          <h1 className="text-2xl font-bold text-charcoal">
            Hero Artwork & Campaign Art Director
          </h1>
          <p className="text-xs text-mutedGrey">
            Art-direct full-width hero campaign banners with responsive preview and 1-click live publishing.
          </p>
        </div>

        {/* Device Preview Controls */}
        <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-charcoal/10 shadow-xs">
          <button
            onClick={() => setDevicePreview("desktop")}
            className={`p-2 rounded ${
              devicePreview === "desktop" ? "bg-charcoal text-white" : "text-mutedGrey hover:text-charcoal"
            }`}
            title="Desktop View"
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDevicePreview("tablet")}
            className={`p-2 rounded ${
              devicePreview === "tablet" ? "bg-charcoal text-white" : "text-mutedGrey hover:text-charcoal"
            }`}
            title="Tablet View"
          >
            <Tablet className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDevicePreview("mobile")}
            className={`p-2 rounded ${
              devicePreview === "mobile" ? "bg-charcoal text-white" : "text-mutedGrey hover:text-charcoal"
            }`}
            title="Mobile View"
          >
            <Smartphone className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Studio Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Canvas Display */}
        <div className="lg:col-span-8 space-y-4">
          <div
            className={`mx-auto transition-all duration-300 bg-charcoal rounded-2xl overflow-hidden shadow-modal border border-charcoal/20 ${
              devicePreview === "desktop"
                ? "w-full min-h-[500px]"
                : devicePreview === "tablet"
                ? "w-[600px] min-h-[460px]"
                : "w-[340px] min-h-[480px]"
            }`}
          >
            <div className="relative w-full h-full min-h-[500px] flex items-center p-8 sm:p-14">
              {/* Background Artwork */}
              <Image
                src={selectedImage}
                alt="Art Directed Footwear Campaign"
                fill
                priority
                className="object-cover object-center"
              />

              {/* Dynamic Gradient Overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to right, rgba(23, 23, 23, ${
                    overlayDarkness / 100
                  }) 0%, rgba(23, 23, 23, ${
                    overlayDarkness / 160
                  }) 60%, rgba(23, 23, 23, 0.2) 100%)`,
                }}
              />

              {/* Text Layer */}
              <div className="relative z-10 max-w-xl text-white">
                {editorialBadge && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-champagne text-[10px] font-medium tracking-luxury uppercase mb-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                    <span>{editorialBadge}</span>
                  </div>
                )}

                <h2
                  className={`font-extrabold text-white tracking-tight leading-[1.08] mb-4 ${
                    devicePreview === "mobile"
                      ? "text-3xl"
                      : devicePreview === "tablet"
                      ? "text-4xl"
                      : "text-5xl lg:text-6xl"
                  }`}
                >
                  {headline}
                </h2>

                <p
                  className={`text-neutral-300 font-light leading-relaxed mb-8 ${
                    devicePreview === "mobile" ? "text-xs" : "text-sm sm:text-base"
                  }`}
                >
                  {subheadline}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-6 py-3 bg-white text-charcoal font-bold text-xs uppercase tracking-luxury rounded shadow-sm">
                    Explore Collection
                  </span>
                  <span className="px-6 py-3 border border-white/40 text-white font-semibold text-xs uppercase tracking-luxury rounded">
                    Discover Our Label
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-charcoal/10 shadow-subtle">
            <span className="text-xs text-mutedGrey">
              Preview Mode: <strong className="text-charcoal capitalize">{devicePreview}</strong>
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleApplyToLiveHero}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-charcoal text-white text-xs font-bold uppercase tracking-luxury rounded hover:bg-neutral-800 transition-colors shadow-sm"
              >
                {isPublished ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Published to Live Website!</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 text-champagne" />
                    <span>Publish Directly To Live Hero</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Design Controls Sidebar */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-charcoal/10 shadow-subtle space-y-6 text-xs">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-luxury text-charcoal mb-1">
              Artwork Controls
            </h3>
            <p className="text-mutedGrey text-[11px]">
              Canva-inspired composition controls
            </p>
          </div>

          {/* Background Photography Picker */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-charcoal mb-2">
              Select Lifestyle Artwork
            </label>
            <div className="space-y-2">
              {campaignPresetImages.map((img) => (
                <button
                  key={img.name}
                  type="button"
                  onClick={() => setSelectedImage(img.url)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg border text-left transition-all ${
                    selectedImage === img.url
                      ? "border-charcoal bg-warmIvory shadow-xs"
                      : "border-charcoal/10 hover:border-charcoal/30 bg-white"
                  }`}
                >
                  <div className="relative h-10 w-12 rounded overflow-hidden flex-shrink-0 bg-softStone">
                    <Image src={img.url} alt={img.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-semibold text-charcoal block truncate text-xs">
                      {img.name}
                    </span>
                    <span className="text-[10px] text-mutedGrey block truncate">
                      {img.vibe}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Overlay Intensity */}
          <div>
            <div className="flex items-center justify-between mb-1.5 font-bold uppercase tracking-wider text-charcoal">
              <span>Darkness Overlay</span>
              <span>{overlayDarkness}%</span>
            </div>
            <input
              type="range"
              min={30}
              max={95}
              value={overlayDarkness}
              onChange={(e) => setOverlayDarkness(Number(e.target.value))}
              className="w-full accent-charcoal cursor-pointer"
            />
          </div>

          {/* Headline Text */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-charcoal mb-1">
              Campaign Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3 py-2 rounded bg-warmIvory/50 border border-charcoal/20 font-bold text-charcoal"
            />
          </div>

          {/* Supporting Text */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-charcoal mb-1">
              Supporting Text
            </label>
            <textarea
              rows={3}
              value={subheadline}
              onChange={(e) => setSubheadline(e.target.value)}
              className="w-full px-3 py-2 rounded bg-warmIvory/50 border border-charcoal/20 text-charcoal"
            />
          </div>

          {/* Editorial Badge */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-charcoal mb-1">
              Editorial Badge
            </label>
            <input
              type="text"
              value={editorialBadge}
              onChange={(e) => setEditorialBadge(e.target.value)}
              className="w-full px-3 py-2 rounded bg-warmIvory/50 border border-charcoal/20 text-charcoal"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
