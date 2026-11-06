"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Product } from "@/types/product";
import { isValidIndianMobile } from "@/lib/utils";
import { saveEnquiry } from "@/lib/enquiryStore";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  selectedSize?: string;
  selectedColor?: string;
}

export function EnquiryModal({
  isOpen,
  onClose,
  product,
  selectedSize,
  selectedColor,
}: EnquiryModalProps) {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState(selectedSize || "");
  const [color, setColor] = useState(selectedColor || "");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSize(selectedSize || (product?.sizes && product.sizes[0]) || "");
      setColor(selectedColor || (product?.colors && product.colors[0]) || "");
      setMessage(
        product
          ? `Hello, I would like to check stock availability and trial options for ${product.name} (SKU: ${product.sku}).`
          : "Hello, I would like to enquire about your footwear catalogue and sizing."
      );
      setIsSuccess(false);
      setErrors({});
      setApiError("");
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, product, selectedSize, selectedColor]);

  if (!isOpen) return null;

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
        productName: product?.name,
        productBrand: product?.brand,
        productSku: product?.sku,
        productUrl: typeof window !== "undefined" ? window.location.href : undefined,
        preferredSize: size,
        preferredColor: color,
        message: message.trim(),
        source: "product_modal" as const,
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Unable to submit enquiry. Please check details or connect on WhatsApp.");
      }

      // Save locally for Admin inspection
      saveEnquiry(payload);

      setIsSuccess(true);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-warmIvory rounded-xl shadow-modal border border-charcoal/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal/10 bg-white">
          <div>
            <h3 className="text-base font-bold text-charcoal tracking-wide uppercase">
              Footwear Availability Enquiry
            </h3>
            <p className="text-xs text-mutedGrey">
              Direct connection with our concierge team. No obligation.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-mutedGrey hover:text-charcoal hover:bg-softStone transition-colors"
            aria-label="Close enquiry modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold text-charcoal">
                Enquiry Successfully Received
              </h4>
              <p className="text-xs text-mutedGrey max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Our footwear specialist has logged your request for <strong>{product?.name || "our collection"}</strong> (Size: {size}, Colour: {color}). We will contact you at <strong>{mobileNumber}</strong> shortly with exact stock availability.
              </p>
              <div className="p-3 bg-softStone rounded text-[11px] text-mutedGrey text-left">
                <strong>Note:</strong> This is an enquiry request, not a transactional order or payment confirmation. No payment has been charged.
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-8 py-3 bg-charcoal text-white text-xs font-semibold uppercase tracking-luxury rounded hover:bg-neutral-800 transition-colors"
              >
                Close Window
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

              {/* Pre-populated Product Badge */}
              {product && (
                <div className="p-3 bg-softStone rounded-lg border border-charcoal/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-mutedGrey font-medium block">
                      Enquiring for
                    </span>
                    <span className="text-xs font-bold text-charcoal block">
                      {product.brand} — {product.name}
                    </span>
                    <span className="text-[10px] text-mutedGrey">
                      SKU: {product.sku}
                    </span>
                  </div>
                  {product.formattedPrice && (
                    <span className="text-xs font-bold text-charcoal">
                      {product.formattedPrice}
                    </span>
                  )}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Vikram Singhania"
                  className="w-full px-3.5 py-2.5 rounded bg-white border border-charcoal/15 text-charcoal text-xs sm:text-sm focus:outline-none focus:border-charcoal transition-colors"
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                  Mobile Number (India) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="e.g. 98201 44521"
                  className="w-full px-3.5 py-2.5 rounded bg-white border border-charcoal/15 text-charcoal text-xs sm:text-sm focus:outline-none focus:border-charcoal transition-colors"
                />
                {errors.mobileNumber && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.mobileNumber}</p>
                )}
              </div>

              {/* Email Address (Optional) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                  Email Address <span className="text-mutedGrey text-[10px] font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. vikram@example.com"
                  className="w-full px-3.5 py-2.5 rounded bg-white border border-charcoal/15 text-charcoal text-xs sm:text-sm focus:outline-none focus:border-charcoal transition-colors"
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Preferred Size & Colour */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                    Preferred Size
                  </label>
                  {product?.sizes && product.sizes.length > 0 ? (
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full px-3 py-2.5 rounded bg-white border border-charcoal/15 text-charcoal text-xs sm:text-sm focus:outline-none focus:border-charcoal transition-colors"
                    >
                      {product.sizes.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      placeholder="e.g. UK 8"
                      className="w-full px-3.5 py-2.5 rounded bg-white border border-charcoal/15 text-charcoal text-xs sm:text-sm focus:outline-none focus:border-charcoal transition-colors"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                    Preferred Colour
                  </label>
                  {product?.colors && product.colors.length > 0 ? (
                    <select
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full px-3 py-2.5 rounded bg-white border border-charcoal/15 text-charcoal text-xs sm:text-sm focus:outline-none focus:border-charcoal transition-colors"
                    >
                      {product.colors.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="e.g. White"
                      className="w-full px-3.5 py-2.5 rounded bg-white border border-charcoal/15 text-charcoal text-xs sm:text-sm focus:outline-none focus:border-charcoal transition-colors"
                    />
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                  Message / Special Request <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mention delivery city, trial inquiries, or timing..."
                  className="w-full px-3.5 py-2 rounded bg-white border border-charcoal/15 text-charcoal text-xs sm:text-sm focus:outline-none focus:border-charcoal transition-colors"
                />
                {errors.message && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-charcoal text-white font-bold text-xs uppercase tracking-luxury rounded hover:bg-neutral-800 transition-colors disabled:opacity-50"
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
  );
}
