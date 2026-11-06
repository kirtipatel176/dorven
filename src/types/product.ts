export type StockStatus =
  | "In Stock"
  | "Limited Stock"
  | "Out of Stock"
  | "Contact for Availability";

export type ProductCategory =
  | "Lifestyle"
  | "Sports Performance"
  | "Everyday Essentials";

export type ProductGender = "Men" | "Women" | "Unisex";

export interface ProductVariant {
  id: string;
  size: string; // e.g., "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"
  color: string;
  colorHex?: string;
  sku: string;
  stockStatus: StockStatus;
  stockQuantity?: number;
}

export interface ProductSpecification {
  upperMaterial: string;
  soleMaterial: string;
  closure: string;
  origin: string;
  weight?: string;
  warranty?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  gender: ProductGender;
  description: string;
  longDescription?: string;
  price?: number; // In INR, optional if enquiry-only
  formattedPrice?: string;
  isPriceOnRequest?: boolean;
  sku: string;
  primaryImage: string;
  galleryImages: string[];
  colors: string[];
  sizes: string[];
  variants: ProductVariant[];
  specifications: ProductSpecification;
  isFeatured?: boolean;
  isRecentlyAdded?: boolean;
  isOurLabel?: boolean;
  popularityScore?: number;
  createdAt: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface FilterState {
  search: string;
  brand: string[];
  category: string[];
  gender: string[];
  sizes: string[];
  colors: string[];
  stockStatus: string[];
  priceRange: [number, number];
  sortBy: SortOption;
}

export type SortOption =
  | "newest"
  | "price-low-high"
  | "price-high-low"
  | "popularity";
