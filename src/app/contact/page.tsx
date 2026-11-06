"use client";

import { useState } from "react";
import { MessageCircle, Mail, MapPin, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { isValidIndianMobile } from "@/lib/utils";
import { saveEnquiry } from "@/lib/enquiryStore";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [productName, setProductName] = useState("");
  const [preferredSize, setPreferredSize] = useState("");
  const [preferredColor, setPreferredColor] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name (minimum 2 characters).";
    }

    if (!mobileNumber.trim()) {
      errs.mobileNumber = "Mobile number is required.";
    } else if (!isValidIndianMobile(mobileNumber)) {
      errs.mobileNumber = "Please enter a valid 10-digit Indian mobile number (e.g. 9820123456).";
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!message.trim() || message.trim().length < 5) {
      errs.message = "Message must be at least 5 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    setIsLoading(true);

    try {
      const payload = {
        fullName: fullName.trim(),
        mobileNumber: mobileNumber.trim(),
        email: email.trim() || undefined,
        productName: productName.trim() || undefined,
        preferredSize: preferredSize.trim() || undefined,
        preferredColor: preferredColor.trim() || undefined,
        message: message.trim(),
        source: "contact_page" as const,
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Unable to submit enquiry. Please try WhatsApp directly.");
      }

      saveEnquiry(payload);
      setIsSuccess(true);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "Submission failed. Please try WhatsApp.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-warmIvory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-luxury font-bold text-champagneDark block mb-2">
            CONCIERGE & APPOINTMENTS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight mb-4">
            Connect With Our Team
          </h1>
          <p className="text-sm text-mutedGrey leading-relaxed">
            Have questions regarding size fit, current stock availability, or booking a private studio session? We respond swiftly across WhatsApp and phone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & WhatsApp Channel */}
          <div className="lg:col-span-5 space-y-8">
            {/* WhatsApp Priority Card */}
            <div className="p-8 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm">
                  <MessageCircle className="h-5 w-5 fill-white stroke-none" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-charcoal">
                    Instant WhatsApp Concierge
                  </h3>
                  <span className="text-[11px] text-[#128C7E] font-semibold uppercase tracking-wider">
                    Average response: Under 15 mins
                  </span>
                </div>
              </div>

              <p className="text-xs text-mutedGrey leading-relaxed mb-6">
                Connect directly with our senior footwear curator on WhatsApp. We share live warehouse unboxing photos, size comparisons, and courier dispatch updates.
              </p>

              <a
                href={getGeneralWhatsAppUrl("Hello DORVEN team, I am looking for footwear advice and stock checks.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white font-bold text-xs uppercase tracking-luxury rounded hover:bg-[#20ba59] transition-colors shadow-sm"
              >
                <MessageCircle className="h-4 w-4 fill-white stroke-none" />
                <span>Chat on WhatsApp ({siteConfig.whatsappDisplayNumber})</span>
              </a>
            </div>

            {/* Studio Info */}
            <div className="p-8 rounded-xl bg-white border border-charcoal/10 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-luxury text-charcoal">
                DORVEN Experience Studio
              </h3>

              <div className="space-y-4 text-xs text-mutedGrey">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-champagneDark flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-charcoal block">Location:</span>
                    <span>{siteConfig.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-champagneDark flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-charcoal block">Studio Hours:</span>
                    <span>{siteConfig.operatingHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-champagneDark flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-charcoal block">Concierge Email:</span>
                    <a href={`mailto:${siteConfig.email}`} className="hover:underline text-charcoal">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-xl border border-charcoal/10 shadow-subtle">
            <h2 className="text-xl font-bold text-charcoal mb-2">
              Send Footwear Enquiry
            </h2>
            <p className="text-xs text-mutedGrey mb-8 leading-relaxed">
              Fill in your details below. Our team will verify size inventory and reply via WhatsApp or phone.
            </p>

            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal">
                  Enquiry Logged Successfully
                </h3>
                <p className="text-xs sm:text-sm text-mutedGrey max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your enquiry has been received. Our footwear specialist will contact you on <strong>{mobileNumber}</strong> shortly.
                </p>
                <div className="p-3 bg-warmIvory rounded border border-charcoal/5 text-xs text-mutedGrey max-w-md mx-auto text-left">
                  <strong>Notice:</strong> This is an enquiry for stock availability and concierge assistance. It is NOT a transactional order or payment.
                </div>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 px-8 py-3 bg-charcoal text-white text-xs font-semibold uppercase tracking-luxury rounded hover:bg-neutral-800 transition-colors"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {apiError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{apiError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Siddharth Desai"
                      className="w-full px-3.5 py-2.5 rounded bg-warmIvory/50 border border-charcoal/15 text-charcoal text-xs sm:text-sm focus:outline-none focus:border-charcoal transition-colors"
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                      Indian Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="e.g. 98201 44521"
                      className="w-full px-3.5 py-2.5 rounded bg-warmIvory/50 border border-charcoal/15 text-charcoal text-xs sm:text-sm focus:outline-none focus:border-charcoal transition-colors"
                    />
                    {errors.mobileNumber && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.mobileNumber}</p>
                    )}
                  </div>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                    Email Address <span className="text-mutedGrey text-[10px] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. siddharth@example.com"
                    className="w-full px-3.5 py-2.5 rounded bg-warmIvory/50 border border-charcoal/15 text-charcoal text-xs sm:text-sm focus:outline-none focus:border-charcoal transition-colors"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Product Name (Optional / Free text) */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                    Product / Model of Interest <span className="text-mutedGrey text-[10px] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. DORVEN Monolith Runner or New Balance 990v6"
                    className="w-full px-3.5 py-2.5 rounded bg-warmIvory/50 border border-charcoal/15 text-charcoal text-xs sm:text-sm focus:outline-none focus:border-charcoal transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Preferred Size */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                      Preferred Size
                    </label>
                    <select
                      value={preferredSize}
                      onChange={(e) => setPreferredSize(e.target.value)}
                      className="w-full px-3 py-2.5 rounded bg-warmIvory/50 border border-charcoal/15 text-charcoal text-xs sm:text-sm focus:outline-none focus:border-charcoal transition-colors"
                    >
                      <option value="">Select Size (UK/India)</option>
                      <option value="UK 6">UK 6</option>
                      <option value="UK 7">UK 7</option>
                      <option value="UK 8">UK 8</option>
                      <option value="UK 9">UK 9</option>
                      <option value="UK 10">UK 10</option>
                      <option value="UK 11">UK 11</option>
                    </select>
                  </div>

                  {/* Preferred Colour */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                      Preferred Colour
                    </label>
                    <input
                      type="text"
                      value={preferredColor}
                      onChange={(e) => setPreferredColor(e.target.value)}
                      placeholder="e.g. Warm Ivory / Grey"
                      className="w-full px-3.5 py-2.5 rounded bg-warmIvory/50 border border-charcoal/15 text-charcoal text-xs sm:text-sm focus:outline-none focus:border-charcoal transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your enquiry, size questions, or studio appointment preferences..."
                    className="w-full px-3.5 py-2.5 rounded bg-warmIvory/50 border border-charcoal/15 text-charcoal text-xs sm:text-sm focus:outline-none focus:border-charcoal transition-colors"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.message}</p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-charcoal text-white font-bold text-xs uppercase tracking-luxury rounded hover:bg-neutral-800 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>SUBMITTING ENQUIRY...</span>
                      </>
                    ) : (
                      <span>SEND ENQUIRY</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
