export interface SiteConfig {
  brandName: string;
  tagline: string;
  whatsappNumber: string; // Indian format e.g. "919876543210" without '+' for click-to-chat API
  whatsappDisplayNumber: string;
  email: string;
  address: string;
  operatingHours: string;
  instagramUrl: string;
}

export const siteConfig: SiteConfig = {
  brandName: "DORVEN",
  tagline: "Curated Multi-Brand Footwear & In-House Atelier",
  whatsappNumber: "919876543210", // Configurable WhatsApp Business number
  whatsappDisplayNumber: "+91 98765 43210",
  email: "concierge@dorvenfootwear.in",
  address: "DORVEN Experience Studio, Bandra West, Mumbai 400050, India",
  operatingHours: "Monday to Sunday: 10:00 AM – 9:00 PM IST",
  instagramUrl: "https://instagram.com/dorvenfootwear",
};
