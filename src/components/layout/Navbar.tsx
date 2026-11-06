"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { SearchModal } from "./SearchModal";
import { BagDrawer } from "./BagDrawer";
import { DorvenLogo } from "@/components/common/Logo";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

// European Luxury Navigation Links
const navLinks = [
  { label: "Collections", href: "/shop" },
  { label: "Men", href: "/shop?gender=Men" },
  { label: "Women", href: "/shop?gender=Women" },
  { label: "Brands", href: "/brands" },
  { label: "Our Label", href: "/our-label" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [headerHeight, setHeaderHeight] = useState(72);
  const headerRef = useRef<HTMLElement>(null);

  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const isHomePage = pathname === "/";

  // Throttled scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update navbar height measurement for search overlay
  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [isScrolled, isSearchOpen]);

  // Close mobile drawer and search on route navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Determine navbar appearance:
  // On homepage before scroll: 100% transparent with subtle gradient scrim
  // When scrolled, on subpages, or when search is open: solid luxury charcoal #171717 with border
  const isSolid = isScrolled || !isHomePage || isSearchOpen;

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 ease-out ${
          isSolid
            ? "bg-[#171717]/95 backdrop-blur-md py-4 sm:py-4.5 border-b border-[#262626] shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
            : "bg-gradient-to-b from-black/60 via-black/25 to-transparent py-6 sm:py-7 border-b border-transparent"
        }`}
      >
        <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="relative flex items-center justify-between">
            {/* LEFT: D'ORVEN Custom Wordmark */}
            <div className="flex items-center z-10">
              <DorvenLogo
                size="md"
                variant="white"
                showSubtitle={false}
              />
            </div>

            {/* CENTER: Editorial Navigation */}
            <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center">
              <ul className="flex items-center space-x-9 xl:space-x-12">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href.includes("?") &&
                      pathname === link.href.split("?")[0] &&
                      typeof window !== "undefined" &&
                      window.location.search === `?${link.href.split("?")[1]}`);

                  return (
                    <li
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setHoveredNav(link.label)}
                      onMouseLeave={() => setHoveredNav(null)}
                    >
                      <Link
                        href={link.href}
                        className={`block text-[11px] xl:text-[12px] uppercase tracking-[0.26em] font-medium transition-colors duration-200 py-1.5 text-[#F8F6F2] ${
                          isActive ? "opacity-100" : "opacity-80 hover:opacity-100"
                        }`}
                      >
                        {link.label}
                      </Link>

                      {/* Subtle Underline Hover & Active Animation */}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-[1px] bg-[#F8F6F2] transition-all duration-300 ease-out pointer-events-none ${
                          hoveredNav === link.label
                            ? "w-full opacity-90"
                            : isActive
                            ? "w-full opacity-60"
                            : "w-0 opacity-0"
                        }`}
                      />
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* RIGHT: Search, Shopping Bag, Mobile Menu */}
            <div className="flex items-center space-x-6 sm:space-x-8 z-10 text-[#F8F6F2]">
              {/* Search */}
              <button
                type="button"
                onClick={() => setIsSearchOpen((prev) => !prev)}
                aria-expanded={isSearchOpen}
                aria-label={isSearchOpen ? "Close search overlay" : "Open search overlay"}
                className={`group flex items-center gap-2 transition-all duration-200 focus:outline-none ${
                  isSearchOpen ? "text-[#C6AD83] opacity-100" : "text-[#F8F6F2] opacity-80 hover:opacity-100"
                }`}
              >
                <Search className="h-4 w-4 stroke-[1.25]" />
                <span className="hidden xl:inline text-[11px] uppercase tracking-[0.24em] font-medium">
                  Search
                </span>
              </button>

              {/* Shopping Bag */}
              <button
                type="button"
                onClick={() => setIsBagOpen(true)}
                className="group flex items-center gap-2 text-[#F8F6F2] opacity-80 hover:opacity-100 transition-opacity focus:outline-none"
                aria-label="Shopping Bag"
              >
                <div className="relative">
                  <ShoppingBag className="h-4 w-4 stroke-[1.5]" />
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#D8C6A5]" />
                </div>
                <span className="hidden xl:inline text-[11px] uppercase tracking-[0.24em] font-medium">
                  Shopping Bag
                </span>
              </button>

              {/* Mobile Menu Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-1.5 text-[#F8F6F2] opacity-90 hover:opacity-100 transition-opacity focus:outline-none"
                aria-label="Open Mobile Menu"
              >
                <Menu className="h-5 w-5 stroke-[1.75]" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* FULLSCREEN LUXURY MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-0 z-50 bg-[#171717] text-[#F8F6F2] flex flex-col justify-between overflow-y-auto"
          >
            {/* Top Bar inside Menu */}
            <div className="px-6 sm:px-10 py-6 border-b border-[#262626] flex items-center justify-between">
              <DorvenLogo size="sm" variant="white" />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#918C84] hover:text-[#F8F6F2] transition-colors focus:outline-none"
                aria-label="Close navigation menu"
              >
                <X className="h-6 w-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Main Menu Links with Editorial Serif Stagger */}
            <div className="px-6 sm:px-10 py-10 my-auto">
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#918C84] block mb-6">
                Navigation
              </span>
              <ul className="space-y-6 sm:space-y-7">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * idx, duration: 0.5, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between text-2xl sm:text-3xl font-serif text-[#F8F6F2] hover:text-[#D8C6A5] transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#D8C6A5]" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Utility Links: Search, Bag */}
              <div className="mt-10 pt-8 border-t border-[#262626] grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="flex flex-col items-center justify-center p-3 border border-[#262626] hover:border-[#F8F6F2] transition-colors text-center"
                >
                  <Search className="h-4 w-4 text-[#D8C6A5] mb-1.5" />
                  <span className="text-[10px] uppercase tracking-[0.2em]">Search</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsBagOpen(true);
                  }}
                  className="flex flex-col items-center justify-center p-3 border border-[#262626] hover:border-[#F8F6F2] transition-colors text-center"
                >
                  <ShoppingBag className="h-4 w-4 text-[#D8C6A5] mb-1.5" />
                  <span className="text-[10px] uppercase tracking-[0.2em]">Bag</span>
                </button>
              </div>
            </div>

            {/* Menu Footer */}
            <div className="px-6 sm:px-10 py-6 border-t border-[#262626] space-y-4 bg-[#141414]">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-[#F8F6F2] text-[#171717] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#E8DECA] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Atelier Concierge</span>
              </a>
              <div className="flex items-center justify-between text-[10px] text-[#918C84] uppercase tracking-[0.2em]">
                <span>European Luxury Footwear</span>
                <span>Authenticity Verified</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for non-homepage views so fixed navbar does not clip subpage content */}
      {!isHomePage && (
        <div className="h-[68px] sm:h-[76px] w-full shrink-0" aria-hidden="true" />
      )}

      {/* Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        topOffset={headerHeight}
      />
      <BagDrawer isOpen={isBagOpen} onClose={() => setIsBagOpen(false)} />
    </>
  );
}
