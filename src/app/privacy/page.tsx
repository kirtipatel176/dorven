import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | DORVEN Footwear",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>

        <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed bg-white p-8 sm:p-12 rounded-xl border border-charcoal/10 shadow-subtle">
          <p>
            At <strong>DORVEN Footwear</strong>, we respect your confidentiality. This Privacy Policy outlines how we collect, handle, and protect your information when you browse our catalogue or submit availability enquiries.
          </p>

          <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal pt-4 border-t border-charcoal/10">
            1. Information We Collect
          </h2>
          <p className="text-mutedGrey">
            We collect the information you voluntarily provide in enquiry forms (such as your full name, Indian mobile number, optional email address, and product preferences) solely to respond to your availability queries and concierge requests.
          </p>

          <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal pt-4 border-t border-charcoal/10">
            2. Payment Information Exclusion
          </h2>
          <p className="text-mutedGrey">
            DORVEN is an enquiry and catalogue platform. We do not store, process, or request credit card numbers, debit card PINs, UPI PINs, or banking credentials through this website.
          </p>

          <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal pt-4 border-t border-charcoal/10">
            3. Contact & WhatsApp Communications
          </h2>
          <p className="text-mutedGrey">
            When you initiate contact through WhatsApp or enquiry forms, our team uses the supplied phone number strictly for footwear assistance and concierge order coordination. We do not sell or rent customer data to third-party marketing brokers.
          </p>
        </div>
      </div>
    </div>
  );
}
