export interface Brand {
  id: string;
  slug: string;
  name: string;
  origin: string;
  tagline: string;
  description: string;
  isExclusiveLabel?: boolean;
  heroImage: string;
  campaignImage?: string;
  logoText: string;
  foundedYear: number;
  categories?: string[];
  featured?: boolean;
  editorialNote?: string;
}
