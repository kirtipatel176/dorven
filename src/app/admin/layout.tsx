"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Home,
  Palette,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products & Stock", href: "/admin/products", icon: Package },
  { label: "Customer Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { label: "Homepage & Hero", href: "/admin/homepage", icon: Home },
  { label: "Banner Studio", href: "/admin/banner-generator", icon: Palette },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-softStone flex flex-col">
      {/* Admin Top Bar */}
      <div className="bg-charcoal text-white px-6 py-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-luxury uppercase text-champagne">
            {siteConfig.brandName} ADMIN CONSOLE
          </span>
          <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-neutral-300">
            Catalogue Management Mode
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-champagne hover:text-white transition-colors text-xs"
          >
            <span>View Live Website</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-charcoal/10 pb-4 mb-8 overflow-x-auto">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-charcoal text-white shadow-sm"
                    : "bg-white text-charcoal hover:bg-white/80 border border-charcoal/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
