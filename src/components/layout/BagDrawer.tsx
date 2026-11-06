"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight, ShoppingBag, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BagDrawer({ isOpen, onClose }: BagDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#171717]/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#171717] text-[#F8F6F2] p-8 sm:p-10 flex flex-col justify-between border-l border-[#262626] shadow-2xl"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#262626]">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-4 w-4 text-[#D8C6A5]" />
                  <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#F8F6F2]">
                    Shopping Bag
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-[#918C84] hover:text-[#F8F6F2] transition-colors"
                  aria-label="Close Shopping Bag"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Bag Body */}
              <div className="py-12 text-center">
                <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-[#262626] flex items-center justify-center text-[#918C84]">
                  <ShoppingBag className="h-6 w-6 stroke-[1.25]" />
                </div>
                <h3 className="font-serif text-2xl text-[#F8F6F2] font-normal mb-2">
                  Your Bag is Currently Empty
                </h3>
                <p className="text-xs text-[#918C84] leading-relaxed max-w-xs mx-auto mb-8 font-light">
                  Each D&apos;ORVEN silhouette is available in limited quantities. Discover our latest curated arrivals or consult our atelier concierge for bespoke sizing.
                </p>
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#F8F6F2] text-[#171717] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#E8DECA] transition-colors"
                >
                  <span>Explore Footwear</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Concierge Footer */}
            <div className="pt-6 border-t border-[#262626] space-y-4">
              <div className="text-[11px] text-[#918C84] uppercase tracking-[0.2em] font-medium">
                Atelier Concierge Service
              </div>
              <p className="text-xs text-[#918C84]/80 leading-relaxed font-light">
                Need immediate private consultation, authentication verification, or size reservation? Connect with our specialist.
              </p>
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 border border-[#F8F6F2]/20 hover:border-[#F8F6F2] text-[#F8F6F2] text-xs uppercase tracking-[0.2em] font-medium transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-[#D8C6A5]" />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

