import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | DORVEN Footwear",
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-20 bg-warmIvory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury text-mutedGrey hover:text-charcoal mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return Home</span>
        </Link>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight mb-8">
          Terms & Conditions
        </h1>

        <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed bg-white p-8 sm:p-12 rounded-xl border border-charcoal/10 shadow-subtle">
          <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal">
            1. Catalogue Nature of Service
          </h2>
          <p className="text-mutedGrey">
            The DORVEN website functions exclusively as an informative digital showroom, product catalogue, and customer enquiry portal. Submission of an enquiry form does not constitute an executed contract of sale, a guaranteed reservation, or an order confirmation.
          </p>

          <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal pt-4 border-t border-charcoal/10">
            2. Brand Authenticity and Intellectual Property
          </h2>
          <p className="text-mutedGrey">
            DORVEN retails authentic footwear procured through legitimate global and domestic supply channels. All trademarks, model names, brand emblems, and copyrighted imagery belonging to Nike, Adidas, New Balance, Asics, Birkenstock, On Running, Puma, or other entities remain the exclusive property of their respective proprietors.
          </p>

          <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal pt-4 border-t border-charcoal/10">
            3. Pricing & Stock Availability
          </h2>
          <p className="text-mutedGrey">
            Prices displayed on the catalogue are indicative in Indian Rupees (INR) and subject to verification based on prevailing market allocations and variant sizes. Stock statuses represent our most recent warehouse audit and are formally verified upon enquiry.
          </p>
        </div>
      </div>
    </div>
  );
}
