import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Validates 10-digit Indian mobile numbers (starting with 6, 7, 8, or 9)
 * or optional leading +91 / 0
 */
export function isValidIndianMobile(number: string): boolean {
  const cleaned = number.replace(/[\s\-\(\)]/g, "");
  const pattern = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  return pattern.test(cleaned);
}
