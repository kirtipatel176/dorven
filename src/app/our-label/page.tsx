import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Feather, Compass, MessageCircle, Mail } from "lucide-react";
import { initialProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "DORVEN Signature Atelier — In-House Luxury Footwear Label",
  description:
    "Discover DORVEN Signature. Hand-finished Italian calfskin footwear, anatomical cork footbeds, and architectural design made in limited runs.",
};

export default function OurLabelPage() {
  const ourLabelProducts = initialProducts.filter((p) => p.isOurLabel);

  const pillars = [
    {
      icon: Feather,
      title: "Certified Italian Calfskin",
      desc: "Sourced directly from historical tanneries in Tuscany. Supple, breathable, and aging with an exquisite personal patina.",
    },
    {
      icon: Compass,
      title: "Architectural Ergonomics",
      desc: "Engineered with anatomical arch contours and natural bio-cork footbeds that gradually mold to your unique footprint.",
    },
    {
      icon: ShieldCheck,
      title: "Limited Batch Craftsmanship",
      desc: "We produce fewer than 300 pairs per silhouette worldwide. Every single unit is hand-checked and numbered.",
    },
  ];

  return (
    <div className="bg-warmIvory min-h-screen">
      {/* Editorial Hero */}
      <section className="relative bg-charcoal text-white py-24 sm:py-36 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2000&auto=format&fit=crop"
            alt="DORVEN Signature Craft"
            fill
            priority
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/50" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/10 text-champagne text-xs font-medium tracking-luxury uppercase mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
            <span>THE EXCLUSIVE IN-HOUSE LABEL</span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight mb-6">
            DORVEN Signature
          </h1>

          <p className="text-base sm:text-xl text-neutral-300 font-light max-w-3xl mx-auto leading-relaxed mb-10">
            A relentless pursuit of architectural minimalism, tactile leather luxury, and sublime day-long comfort. Designed in our studio and brought to life in small master ateliers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#collection"
              className="px-8 py-4 bg-champagne text-charcoal font-bold text-xs uppercase tracking-luxury rounded hover:bg-champagneLight transition-colors"
            >
              Explore Signature Pairs
            </a>
            <a
              href={getGeneralWhatsAppUrl("Hello, I would like to schedule a private fitting or enquire about the DORVEN Signature collection.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold text-xs uppercase tracking-luxury rounded hover:bg-white/20 transition-colors"
            >
              <MessageCircle className="h-4 w-4 fill-white stroke-none" />
              <span>Studio Consultation</span>
            </a>
          </div>
        </div>
      </section>

      {/* Brand Philosophy & Craftsmanship Pillars */}
      <section className="py-20 lg:py-28 bg-white border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs uppercase tracking-luxury font-bold text-champagneDark block mb-2">
              OUR ATELIER CODE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight mb-4">
              Form Follows Touch.
            </h2>
            <p className="text-sm sm:text-base text-mutedGrey leading-relaxed">
              We refused to compromise between the sculpted elegance of luxury fashion houses and the athletic bounce of modern sneakers. DORVEN Signature is the harmonious synthesis of both worlds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-8 rounded-xl bg-warmIvory border border-charcoal/5 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-12 w-12 rounded-full bg-charcoal text-white flex items-center justify-center mb-6">
                      <Icon className="h-5 w-5 text-champagne" />
                    </div>
                    <h3 className="text-lg font-bold text-charcoal mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-mutedGrey leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Signature Collection Grid */}
      <section id="collection" className="py-20 lg:py-28 bg-warmIvory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-charcoal/10 pb-6 mb-12 flex flex-col sm:flex-row sm:items-end justify-between">
            <div>
              <span className="text-xs uppercase tracking-luxury font-bold text-champagneDark block mb-1">
                CURRENT RELEASES
              </span>
              <h2 className="text-3xl font-extrabold text-charcoal">
                The Signature Silhouettes
              </h2>
            </div>
            <p className="text-xs text-mutedGrey mt-2 sm:mt-0">
              Hand-finished in small batch editions. Verified authenticity guaranteed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ourLabelProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Fitting & Enquiry CTA */}
      <section className="py-20 bg-charcoal text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Experience DORVEN Signature In Person
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Visit our Bandra West experience studio for bespoke sizing consultations, leather feel sessions, and private fittings.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-champagne text-charcoal font-bold text-xs uppercase tracking-luxury rounded hover:bg-champagneLight transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Book Studio Fitting</span>
            </Link>

            <a
              href={getGeneralWhatsAppUrl("Hello, I would like to book a private fitting appointment for DORVEN Signature.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 border border-white/20 text-white font-semibold text-xs uppercase tracking-luxury rounded hover:bg-white/20 transition-colors"
            >
              <MessageCircle className="h-4 w-4 fill-white stroke-none" />
              <span>WhatsApp Fitting Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
