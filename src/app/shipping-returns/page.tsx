import Link from "next/link";
import { ArrowLeft, Truck, RefreshCw, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Shipping & Sizing Advisory | DORVEN Footwear",
  description:
    "Information regarding courier delivery across India, private studio trial fittings, and exchange policies.",
};

export default function ShippingReturnsPage() {
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

        <span className="text-xs uppercase tracking-luxury font-bold text-champagneDark block mb-2">
          CLIENT ADVISORY
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight mb-8">
          Shipping & Sizing Advisory
        </h1>

        <div className="space-y-10 text-xs sm:text-sm text-neutral-700 leading-relaxed bg-white p-8 sm:p-12 rounded-xl border border-charcoal/10 shadow-subtle">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Truck className="h-5 w-5 text-charcoal" />
              <h2 className="text-base font-bold text-charcoal uppercase tracking-wider">
                Pan-India Insured Courier Delivery
              </h2>
            </div>
            <p className="text-mutedGrey leading-relaxed">
              Upon confirmation of stock availability and completion of concierge verification, footwear pairs are packed in custom climate-sealed protective packaging and dispatched via premium air couriers (Bluedart / Delhivery Express). Delivery typically takes 2–4 business days to major Indian metros (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune) and 4–6 business days to other locations.
            </p>
          </div>

          <div className="pt-6 border-t border-charcoal/10">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="h-5 w-5 text-charcoal" />
              <h2 className="text-base font-bold text-charcoal uppercase tracking-wider">
                Doorstep & Studio Sizing Trial
              </h2>
            </div>
            <p className="text-mutedGrey leading-relaxed">
              Clients located in Mumbai are welcome to book private fitting sessions at our Bandra West experience studio. For select VIP clients, our concierge offers multi-size trial deliveries where two adjacent sizes (e.g. UK 8 and UK 9) are brought directly to your location.
            </p>
          </div>

          <div className="pt-6 border-t border-charcoal/10">
            <div className="flex items-center gap-3 mb-3">
              <RefreshCw className="h-5 w-5 text-charcoal" />
              <h2 className="text-base font-bold text-charcoal uppercase tracking-wider">
                Size Exchange Policy
              </h2>
            </div>
            <p className="text-mutedGrey leading-relaxed">
              Footwear can be exchanged for an alternate size within 7 days of delivery, provided the pair is completely unworn, with all original tags attached and original manufacturer box intact. Please consult our team on WhatsApp prior to returning any shipment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
