# DORVEN — Premium Multi-Brand Footwear & In-House Atelier

> **Master Project Implementation**  
> Premium, mobile-first footwear catalogue and enquiry destination for the Indian retail market. Built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 1. Project Overview & Business Model

**DORVEN** operates a hybrid retail model:
1. **Multi-Brand Footwear Retailer**: Curating authentic models from leading international brands (**Nike**, **Adidas Originals**, **New Balance**, **Asics**, **Birkenstock**, **On Running**, **Puma**).
2. **Exclusive In-House Label**: **DORVEN Signature**, an artisanal footwear label crafted with certified full-grain Italian calfskin, anatomical bio-cork footbeds, and architectural Vibram outsoles.

### Core Philosophy: Non-Transactional Luxury Catalogue
In this current launch phase, this website is **strictly a digital showroom and customer enquiry platform**. It deliberately excludes transactional e-commerce checkout mechanisms (no *Add to Cart*, *Cart Drawer*, *Checkout*, *UPI Gateways*, or *Credit Card processors*).

The primary customer actions are:
- **View Product Details & Specifications**
- **Select UK/India Size & Colour Variant**
- **Check Variant-Specific Stock Availability**
- **Enquire on WhatsApp (with pre-filled product & variant payload)**
- **Submit Personal Concierge Enquiry**

The architecture remains completely modular so transactional commerce (cart, checkout, payment gateway) can be introduced in a future phase without restructuring the catalogue or product models.

---

## 2. Design System & Brand Identity

The visual language combines **Apple-inspired minimalism**, **high-fashion editorial art direction**, and **sneaker culture aesthetics**.

### Color Palette

| Name | Hex Code | Purpose |
|---|---|---|
| **Warm Ivory** | `#FAF9F6` | Primary canvas & background |
| **Charcoal Black** | `#171717` | Typography headings, primary actions |
| **Champagne Beige** | `#D8C6A5` | Subtle luxury accents & badges |
| **Soft Stone** | `#F0EFEB` | Secondary card fills & sections |
| **Muted Grey** | `#77736D` | Subheadings, supporting details |
| **White** | `#FFFFFF` | Product cards & gallery backdrops |

### Typography & Spacing
- Clean modern sans-serif typography for navigation and high-density technical specs.
- Editorial display serif hierarchy for campaigns and atelier manifestos.
- High whitespace-to-content ratio, eliminating card borders and excessive gradients.

---

## 3. Implemented Architecture & Pages

### 1. Homepage (`/`)
- **4.2 Hero Campaign Banner**: Full-width lifestyle imagery with editorial typography ("STEP INTO YOUR STYLE.") and functional CTAs ("Explore Collection" → `/shop`, "Discover Our Label" → `/our-label`). Supports live updates from the admin system.
- **4.3 Brand Authenticity Strip**: Slim horizontal trust strip directly beneath the hero: *"AUTHENTIC BRANDS. ORIGINAL FOOTWEAR."* with 3 concise guarantees (*100% Genuine Products*, *Authentic Branded Footwear*, *Original In-House Collection*).
- **4.4 Featured Collection**: Curated 6-pair footwear grid with price, brand, availability indicators, and direct product detail links.
- **4.5 Shop by Style**: 3 large visual editorial category cards: *Lifestyle*, *Sports Performance*, and *Everyday Essentials*.
- **4.6 Signature Collection — Our Label**: Dedicated showcase of DORVEN's in-house calfskin silhouettes and craftsmanship code.
- **4.7 Recently Added**: 4 fresh arrivals, deduplicated from featured products.
- **4.8 Editorial Campaign**: Visual editorial spread (*"The Architecture of Comfort"*).
- **4.9 Contact & WhatsApp CTA**: *"FIND YOUR PERFECT PAIR"* with direct WhatsApp and concierge booking buttons.

### 2. Product Catalogue (`/shop`)
- Real-time client-side multi-filtering:
  - Brand (Nike, Adidas, New Balance, Asics, Birkenstock, On, Puma, DORVEN)
  - Category (Lifestyle, Sports Performance, Everyday Essentials)
  - Gender / Fit (Men, Women, Unisex)
  - UK / India Standard Sizing (UK 6 – UK 11)
  - Stock Availability status
  - Dynamic budget slider (₹6,000 – ₹30,000)
- Sorting options (Popularity, Newest Arrivals, Price Low-to-High, Price High-to-Low)
- Instant live search with zero-result helpful empty states and active filter chips.

### 3. Product Detail Page (`/product/[slug]`)
- High-resolution multi-angle image gallery with thumbnail navigation and full-screen zoom modal.
- Dynamic size and colour selectors that update the live stock status (*In Stock*, *Limited Stock*, *Out of Stock*, *Contact for Availability*).
- Interactive **Size Guide Modal** with foot length in cm, UK/India, EU, and US conversions.
- Full provenance and technical specifications (upper material, sole compound, closure, origin, weight, warranty).
- **"Enquire on WhatsApp"** button generating the compliant pre-filled payload:
  ```text
  Hello, I am interested in this footwear product.

  Product: [Product Name]
  Brand: [Brand Name]
  SKU: [SKU]
  Selected Size: [Size]
  Colour: [Colour]

  Please share availability and purchasing details.
  Product URL: [Product URL]
  ```
- **"Contact Us"** modal pre-populating product data for direct concierge submission.
- Related footwear recommendations.

### 4. Brands Directory (`/brands` & `/brands/[slug]`)
- Master directory of all international partner brands and our signature atelier label.
- Dedicated brand landing pages with brand history, country of origin, founded year, and brand-specific catalogue.

### 5. In-House Label (`/our-label`)
- Brand story for **DORVEN Signature**.
- Three craftsmanship pillars: Certified Italian Calfskin, Architectural Ergonomics, and Limited Batch Craftsmanship.
- Complete signature collection showcase and private studio appointment booking.

### 6. Contact & Enquiry Portal (`/contact`)
- Instant WhatsApp Concierge card with verified response times.
- Physical studio address (Bandra West, Mumbai), operating hours, and email.
- Comprehensive enquiry form with strict 10-digit Indian mobile number validation (`/^[6789]\d{9}$/`).

### 7. Administrative Portal (`/admin`)
- **Dashboard Overview (`/admin`)**: Real-time metrics on total catalogue pairs, pending customer enquiries, in-house label count, and average inventory value.
- **Product & Stock Manager (`/admin/products`)**: Add new footwear models, search by SKU, toggle featured flags, and modify variant-level stock statuses.
- **Customer Enquiry Desk (`/admin/enquiries`)**: Review customer enquiries, update lead statuses (*New*, *Contacted*, *Followed Up*, *Closed*), and launch 1-click WhatsApp replies.
- **Homepage & Hero Manager (`/admin/homepage`)**: Update live hero headlines, subtext, background images, and CTA links.
- **Campaign Banner Studio (`/admin/banner-generator`)**: In-browser Canva-style art direction studio with live desktop, tablet, and mobile previews, overlay opacity controls, and 1-click publishing.

---

## 4. Technical Stack

- **Framework**: Next.js 15 (App Router, React Server Components + Client interactivity)
- **Language**: TypeScript (Strict typing across all products, variants, and enquiries)
- **Styling**: Tailwind CSS with custom luxury color scheme (Warm Ivory, Charcoal, Champagne)
- **Icons**: Lucide React
- **Validation**: Zod schema validation on `/api/enquiry`
- **SEO & Structured Data**: Static metadata generation, JSON-LD Product & Organization schemas, `sitemap.xml`, and `robots.txt`.

---

## 5. Development & Build

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run production build (typecheck + static generation)
npm run build

# Start production server
npm start
```

---

## 6. Indian Market Compliance
- Sizing strictly follows the **UK / India Footwear Sizing System**.
- Currency formatted in **Indian Rupees (INR / ₹)** using `Intl.NumberFormat('en-IN')`.
- Mobile validation enforces valid 10-digit Indian cellular ranges (starting with 6, 7, 8, 9).
- Direct WhatsApp integration with standard `+91` country code.
