import { siteConfig } from "@/data/siteConfig";

interface ProductWhatsAppParams {
  productName: string;
  brand: string;
  sku: string;
  selectedSize?: string;
  selectedColor?: string;
  productUrl?: string;
}

/**
 * Builds standard WhatsApp click-to-chat link with pre-filled product details.
 */
export function getProductWhatsAppUrl(params: ProductWhatsAppParams): string {
  const phone = siteConfig.whatsappNumber;

  const lines = [
    "Hello, I am interested in this footwear product.",
    "",
    `Product: ${params.productName}`,
    `Brand: ${params.brand}`,
    `SKU: ${params.sku}`,
    params.selectedSize ? `Selected Size: ${params.selectedSize}` : "Size: Please advise",
    params.selectedColor ? `Colour: ${params.selectedColor}` : "Colour: Standard",
    "",
    "Please share availability and purchasing details.",
  ];

  if (params.productUrl) {
    lines.push(`Product URL: ${params.productUrl}`);
  }

  const encodedText = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${phone}?text=${encodedText}`;
}

/**
 * Builds general WhatsApp enquiry link.
 */
export function getGeneralWhatsAppUrl(customMessage?: string): string {
  const phone = siteConfig.whatsappNumber;
  const message =
    customMessage ||
    "Hello DORVEN team, I am looking for assistance regarding footwear collection, sizing, and availability.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
