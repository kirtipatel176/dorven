import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brandName} — Premium Multi-Brand Footwear & In-House Atelier`,
    template: `%s | ${siteConfig.brandName} Footwear`,
  },
  description:
    "Discover authentic premium footwear from leading international brands and our exclusive handcrafted signature label. Based in India.",
  keywords: [
    "DORVEN Footwear",
    "Luxury Sneakers India",
    "Multi Brand Footwear",
    "Authentic Sneakers Mumbai",
    "Nike",
    "Adidas Originals",
    "New Balance Made in USA",
    "Asics GEL",
    "Birkenstock India",
    "On Running",
  ],
  authors: [{ name: "DORVEN Footwear Atelier" }],
  creator: "DORVEN",
  metadataBase: new URL("https://dorvenfootwear.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dorvenfootwear.in",
    siteName: siteConfig.brandName,
    title: `${siteConfig.brandName} — Premium Footwear Destination`,
    description:
      "Curated multi-brand footwear and signature in-house artisan label. Sourced with guaranteed authenticity.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "DORVEN Footwear Editorial",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F8F6F2] text-[#171717] antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
