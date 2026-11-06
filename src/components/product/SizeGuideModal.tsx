"use client";

import { X, Ruler } from "lucide-react";
import { useEffect } from "react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sizeChartData = [
  { uk: "UK 6", cm: "24.5 cm", eu: "EU 40", us: "US 7" },
  { uk: "UK 7", cm: "25.5 cm", eu: "EU 41", us: "US 8" },
  { uk: "UK 8", cm: "26.5 cm", eu: "EU 42.5", us: "US 9" },
  { uk: "UK 9", cm: "27.5 cm", eu: "EU 44", us: "US 10" },
  { uk: "UK 10", cm: "28.5 cm", eu: "EU 45", us: "US 11" },
  { uk: "UK 11", cm: "29.5 cm", eu: "EU 46", us: "US 12" },
];

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-warmIvory rounded-xl shadow-modal border border-charcoal/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal/10">
          <div className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-champagneDark" />
            <h3 className="text-base font-bold text-charcoal tracking-wide uppercase">
              Footwear Size Conversion & Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-mutedGrey hover:text-charcoal hover:bg-softStone transition-colors"
            aria-label="Close size guide"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs text-mutedGrey mb-6 leading-relaxed">
            Indian footwear sizing adheres to the traditional <strong>UK size standard</strong>. If you are between sizes, we recommend sizing up for casual runners and standard sizing for our DORVEN Signature calfskin models.
          </p>

          {/* Sizing Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-charcoal/15 bg-softStone/60 text-charcoal font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">UK / India</th>
                  <th className="py-2.5 px-3">Foot Length (cm)</th>
                  <th className="py-2.5 px-3">EU</th>
                  <th className="py-2.5 px-3">US Men</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10 text-charcoal">
                {sizeChartData.map((row) => (
                  <tr key={row.uk} className="hover:bg-softStone/40 transition-colors">
                    <td className="py-2.5 px-3 font-semibold">{row.uk}</td>
                    <td className="py-2.5 px-3 text-mutedGrey">{row.cm}</td>
                    <td className="py-2.5 px-3 text-mutedGrey">{row.eu}</td>
                    <td className="py-2.5 px-3 text-mutedGrey">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measurement Advice */}
          <div className="mt-6 p-4 rounded-lg bg-softStone/70 border border-charcoal/5 text-xs text-mutedGrey leading-relaxed">
            <h4 className="font-semibold text-charcoal mb-1">How to Measure Your Foot Length:</h4>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Place a sheet of paper on a hard floor against a flat wall.</li>
              <li>Stand on the paper with your heel firmly touching the wall.</li>
              <li>Mark the tip of your longest toe and measure the distance to the wall edge in centimeters.</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-softStone border-t border-charcoal/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-charcoal text-white text-xs font-semibold uppercase tracking-luxury rounded hover:bg-neutral-800 transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
