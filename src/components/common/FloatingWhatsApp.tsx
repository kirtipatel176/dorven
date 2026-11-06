"use client";

import { MessageCircle } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { useState } from "react";

export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip Pill */}
      <div
        className={`hidden sm:flex items-center bg-charcoal text-white text-xs px-3.5 py-1.5 rounded-full shadow-lg transition-all duration-300 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        <span className="font-medium tracking-wide">Instant WhatsApp Concierge</span>
      </div>

      {/* Button */}
      <a
        href={getGeneralWhatsAppUrl("Hello DORVEN team, I would like to check stock availability for a footwear model.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enquire on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
      >
        {/* Pulsing ring indicator */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping opacity-75 duration-1000" />
        <MessageCircle className="h-6 w-6 relative z-10 fill-white stroke-none" />
      </a>
    </div>
  );
}
