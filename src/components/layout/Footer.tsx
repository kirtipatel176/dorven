"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { DorvenLogo } from "@/components/common/Logo";
import { siteConfig } from "@/data/siteConfig";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-[#171717] text-[#F8F6F2] pt-20 sm:pt-28 pb-12 border-t border-[#262626]">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 pb-16 border-b border-[#262626]">
          {/* Brand Presentation (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <DorvenLogo size="lg" variant="white" showSubtitle />
            <p className="text-xs sm:text-sm text-[#918C84] leading-relaxed max-w-sm font-light mt-4">
              European luxury footwear house and verified international multi-brand destination. Bridging bespoke Italian benchcraft, archival street icons, and contemporary silhouette design.
            </p>

            <div className="pt-2 flex items-center space-x-6 text-xs text-[#918C84]">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 uppercase tracking-[0.2em] hover:text-[#F8F6F2] transition-colors"
              >
                <span>Instagram</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 uppercase tracking-[0.2em] text-[#CDB995] hover:text-[#F8F6F2] transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          {/* Shop Navigation (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#F8F6F2] mb-6 font-mono">
              Shop Collections
            </h4>
            <ul className="space-y-3.5 text-xs text-[#918C84] font-light">
              <li>
                <Link href="/shop" className="hover:text-[#F8F6F2] transition-colors">
                  Complete Footwear Archive
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=Men" className="hover:text-[#F8F6F2] transition-colors">
                  Men&apos;s Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=Women" className="hover:text-[#F8F6F2] transition-colors">
                  Women&apos;s Collection
                </Link>
              </li>
              <li>
                <Link href="/our-label" className="hover:text-[#F8F6F2] transition-colors">
                  D&apos;ORVEN Signature Atelier
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-[#F8F6F2] transition-colors">
                  International Brands Directory
                </Link>
              </li>
              <li>
                <Link href="/shop?sort=newest" className="hover:text-[#F8F6F2] transition-colors">
                  Seasonal Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#F8F6F2] mb-6 font-mono">
              Client Services
            </h4>
            <ul className="space-y-3.5 text-xs text-[#918C84] font-light">
              <li>
                <Link href="/contact" className="hover:text-[#F8F6F2] transition-colors">
                  Private Consultation & Studio Holds
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-[#F8F6F2] transition-colors">
                  Complimentary Shipping & Returns
                </Link>
              </li>
              <li>
                <a
                  href={getGeneralWhatsAppUrl("Hello D'ORVEN Concierge, I need assistance with footwear sizing.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F8F6F2] transition-colors"
                >
                  Bespoke Sizing Specialist
                </a>
              </li>
              <li>
                <span className="text-[#918C84]/60">Certificate of Lineage & Provenance</span>
              </li>
              <li>
                <Link href="/admin" className="text-[#918C84]/40 hover:text-[#918C84] transition-colors">
                  Atelier Management Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Provenance (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#F8F6F2] mb-6 font-mono">
              Provenance
            </h4>
            <p className="text-xs text-[#918C84] leading-relaxed font-light mb-4">
              All footwear acquired through D&apos;ORVEN is backed by our strict multi-point authenticity inspection.
            </p>
            <div className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#CDB995]">
              100% Guaranteed Lineage
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer: Policies, Legal, Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#918C84] font-light gap-4">
          <div>
            &copy; {new Date().getFullYear()} D&apos;ORVEN Footwear Atelier & Multi-Brand Destination. All rights reserved.
          </div>

          <div className="flex items-center space-x-6 text-[10px] uppercase tracking-[0.2em] font-mono">
            <Link href="/privacy" className="hover:text-[#F8F6F2] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#F8F6F2] transition-colors">
              Terms of Acquisition
            </Link>
            <span>•</span>
            <Link href="/shipping-returns" className="hover:text-[#F8F6F2] transition-colors">
              Dispatch & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
