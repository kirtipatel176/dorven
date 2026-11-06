export interface HeroBanner {
  id: string;
  headline: string;
  headlineAccent?: string;
  subheadline: string;
  imageUrl: string;
  mobileImageUrl?: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  isActive: boolean;
  editorialBadge?: string;
  silhouetteName?: string;
  silhouetteDetail?: string;
  editionYear?: string;
}

export const defaultHeroBanners: HeroBanner[] = [
  {
    id: "hero-campaign-01",
    headline: "BEYOND THE",
    headlineAccent: "ORDINARY.",
    subheadline:
      "Handcrafted signature silhouettes and verified multi-brand icons curated for the modern connoisseur.",
    imageUrl: "/images/hero/hero-1.jpg",
    mobileImageUrl: "/images/hero/hero-1.jpg",
    primaryCtaText: "EXPLORE COLLECTION",
    primaryCtaLink: "/shop",
    secondaryCtaText: "DISCOVER OUR LABEL",
    secondaryCtaLink: "/our-label",
    isActive: true,
    editorialBadge: "AUTUMN / WINTER 2025 ATELIER",
    silhouetteName: "Monolith Minimalist Runner",
    silhouetteDetail: "Hand-selected Italian calfskin",
    editionYear: "2025 / EDITION 01",
  },
  {
    id: "hero-campaign-02",
    headline: "ARCHITECTURAL",
    headlineAccent: "SIMPLICITY.",
    subheadline:
      "Sculpted Italian calfskin meets lightweight performance engineering. Designed for quiet presence.",
    imageUrl: "/images/hero/hero-2.jpg",
    mobileImageUrl: "/images/hero/hero-2.jpg",
    primaryCtaText: "EXPLORE COLLECTION",
    primaryCtaLink: "/shop?category=Lifestyle",
    secondaryCtaText: "DISCOVER OUR LABEL",
    secondaryCtaLink: "/brands",
    isActive: true,
    editorialBadge: "CURATED ROTATION • SERIES 02",
    silhouetteName: "Atelier Aeroflow Low",
    silhouetteDetail: "Micro-perforated nappa & EVA sole",
    editionYear: "2025 / EDITION 02",
  },
  {
    id: "hero-campaign-03",
    headline: "THE DISCIPLINE OF",
    headlineAccent: "CRAFT.",
    subheadline:
      "Where biomechanical stability aligns seamlessly with timeless European leather traditions.",
    imageUrl: "/images/hero/hero-3.jpg",
    mobileImageUrl: "/images/hero/hero-3.jpg",
    primaryCtaText: "EXPLORE COLLECTION",
    primaryCtaLink: "/shop",
    secondaryCtaText: "DISCOVER OUR LABEL",
    secondaryCtaLink: "/our-label",
    isActive: true,
    editorialBadge: "HERITAGE ARCHIVE • VOLUME 01",
    silhouetteName: "Veloce Continental Derby",
    silhouetteDetail: "Vegetable-tanned full-grain hide",
    editionYear: "2025 / EDITION 03",
  },
];
