"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-[#F8F6F2] border-t border-[#171717]/10">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Minimal Header Accent */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-[1px] w-6 bg-[#CDB995]" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#918C84]">
                Private Gazette
              </span>
              <span className="h-[1px] w-6 bg-[#CDB995]" />
            </div>

            {/* Newsletter Heading */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#171717] font-normal leading-tight tracking-tight mb-4">
              Stay ahead of the ordinary.
            </h2>

            {/* Supporting Text */}
            <p className="text-xs sm:text-sm md:text-base text-[#918C84] font-light leading-relaxed mb-10 max-w-lg mx-auto">
              Discover new collections, selected releases and stories from D&apos;ORVEN. Delivered once per seasonal drop with private allocation privileges.
            </p>

            {/* Email Form */}
            {isSubscribed ? (
              <div className="inline-flex items-center gap-2 px-6 py-4 bg-[#171717] text-[#F8F6F2] text-xs uppercase tracking-[0.2em] font-mono">
                <Check className="h-4 w-4 text-[#CDB995]" />
                <span>You have been subscribed to our seasonal gazette</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch max-w-md mx-auto border-b border-[#171717] pb-1 gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full bg-transparent text-[#171717] placeholder:text-[#918C84]/70 text-xs uppercase tracking-wider py-3 px-2 focus:outline-none font-light"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#171717] text-[#F8F6F2] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#333] transition-colors flex-shrink-0"
                >
                  <span>Join</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}

            {/* Privacy Note */}
            <p className="text-[11px] text-[#918C84]/80 mt-5 font-light tracking-wide">
              We respect your privacy. Unsubscribe at any time. Sourced with guaranteed provenance.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

