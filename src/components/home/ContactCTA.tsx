import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export function ContactCTA() {
  return (
    <section className="py-20 lg:py-24 bg-warmIvory border-t border-charcoal/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs uppercase tracking-luxury font-bold text-champagneDark block mb-3">
          PERSONALIZED CONCIERGE
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight mb-4">
          FIND YOUR PERFECT PAIR.
        </h2>
        <p className="text-base sm:text-lg text-mutedGrey max-w-xl mx-auto mb-10 leading-relaxed">
          Have a question about a product, size or availability? Our team is here to help you navigate sizing, variant allocations, and private studio appointments.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-charcoal text-white font-semibold text-xs uppercase tracking-luxury rounded hover:bg-neutral-800 transition-all shadow-subtle"
          >
            <Mail className="h-4 w-4" />
            <span>Contact Us</span>
          </Link>

          <a
            href={getGeneralWhatsAppUrl("Hello DORVEN team, I need help finding the right footwear size and availability.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-semibold text-xs uppercase tracking-luxury rounded hover:bg-[#20ba59] transition-all shadow-subtle"
          >
            <MessageCircle className="h-4 w-4 fill-white stroke-none" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
