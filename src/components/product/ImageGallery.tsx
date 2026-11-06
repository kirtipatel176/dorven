"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const displayImages = images.length > 0 ? images : ["https://placehold.co/800x800?text=Footwear"];

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        {/* Thumbnails (desktop column, mobile row) */}
        {displayImages.length > 1 && (
          <div className="flex lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-white border-2 transition-all ${
                  selectedIdx === idx
                    ? "border-charcoal shadow-sm"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                aria-label={`View angle ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover object-center"
                />
              </button>
            ))}
          </div>
        )}

        {/* Primary Large Image */}
        <div className="relative flex-1 aspect-square bg-white rounded-xl overflow-hidden border border-charcoal/10 shadow-subtle group">
          <Image
            src={displayImages[selectedIdx]}
            alt={`${productName} angle ${selectedIdx + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-500 cursor-pointer"
            onClick={() => setIsZoomOpen(true)}
          />

          {/* Zoom Trigger Button */}
          <button
            type="button"
            onClick={() => setIsZoomOpen(true)}
            className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-charcoal shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            aria-label="Zoom image"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          {/* Navigation Arrows for mobile or quick browsing */}
          {displayImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-charcoal shadow-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-charcoal shadow-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close zoom"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative max-w-4xl max-h-[85vh] w-full h-[70vh]">
            <Image
              src={displayImages[selectedIdx]}
              alt={`${productName} zoomed`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
