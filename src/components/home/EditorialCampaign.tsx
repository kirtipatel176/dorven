import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EditorialCampaign() {
  return (
    <section className="py-20 lg:py-28 bg-softStone overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl overflow-hidden border border-charcoal/10 shadow-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Column */}
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[520px]">
              <Image
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600&auto=format&fit=crop"
                alt="DORVEN Editorial Story"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-charcoal/10" />
            </div>

            {/* Editorial Copy Column */}
            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-luxury font-bold text-champagneDark block mb-3">
                  CURATED PERSPECTIVE • ISSUE NO. 04
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-charcoal tracking-tight leading-tight mb-4">
                  The Architecture of Comfort.
                </h2>
                <p className="text-sm text-mutedGrey leading-relaxed mb-6">
                  Footwear is not mere ornament; it is the physical foundation between human motion and urban topography. In our atelier, we curate silhouettes where biomechanical support merges seamlessly with timeless minimalism.
                </p>
                <div className="border-l-2 border-champagne pl-4 my-6 italic text-xs text-charcoal/80 leading-relaxed">
                  &ldquo;Simplicity is the ultimate sophistication. When unnecessary seams vanish, true leather craft and sculptured proportions emerge.&rdquo;
                </div>
              </div>

              <div className="pt-6 border-t border-charcoal/10">
                <Link
                  href="/our-label"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-luxury text-charcoal hover:text-champagneDark transition-colors group"
                >
                  <span>Read The Atelier Manifesto</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
