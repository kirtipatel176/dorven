export interface Brand {
  id: string;
  slug: string;
  name: string;
  origin: string;
  tagline: string;
  description: string;
  categoryLabel?: string;
  signature?: string;
  ctaText?: string;
  orderNumber?: string;
  isExclusiveLabel?: boolean;
  heroImage: string;
  campaignImage?: string;
  logoText: string;
  foundedYear: number;
  categories?: string[];
  featured?: boolean;
  editorialNote?: string;
}
