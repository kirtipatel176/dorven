import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ShopByStyle() {
  const styles = [
    {
      title: "Lifestyle",
      subtitle: "Contemporary Fashion & Modern Streetwear",
      description: "Curated retro runners, architectural silhouettes, and luxury court shoes.",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop",
      link: "/shop?category=Lifestyle",
    },
    {
      title: "Sports Performance",
      subtitle: "Precision Engineering & Cushioning",
      description: "Cutting-edge marathon racers, carbon-plated soles, and high-energy trail tools.",
      image:
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop",
      link: "/shop?category=Sports+Performance",
    },
    {
      title: "Everyday Essentials",
      subtitle: "Enduring Comfort & Timeless Staples",
      description: "Iconic German cork clogs, terrace shoes, and minimal leather trainers.",
      image:
        "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1200&auto=format&fit=crop",
      link: "/shop?category=Everyday+Essentials",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-softStone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-luxury font-bold text-champagneDark block mb-2">
            CURATED CATEGORIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
            Shop By Style
          </h2>
          <p className="text-sm text-mutedGrey mt-3">
            Distinct footwear profiles engineered for diverse lifestyles, physical pursuits, and discerning aesthetics.
          </p>
        </div>

        {/* 3 Large Visual Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {styles.map((style) => (
            <Link
              key={style.title}
              href={style.link}
              className="group relative h-[480px] rounded-xl overflow-hidden flex flex-col justify-end p-8 transition-transform duration-500 hover:-translate-y-1 shadow-subtle hover:shadow-elevated"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={style.image}
                  alt={style.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-white">
                <span className="text-[10px] uppercase tracking-luxury font-bold text-champagne block mb-1">
                  {style.subtitle}
                </span>
                <h3 className="text-2xl font-bold tracking-tight mb-2">
                  {style.title}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2 mb-6 leading-relaxed">
                  {style.description}
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-luxury text-white group-hover:text-champagne transition-colors">
                  <span>Explore Style</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
