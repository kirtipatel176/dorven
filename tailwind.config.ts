import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warmIvory: "#F8F6F2",
        charcoal: "#171717",
        champagne: "#D8C6A5",
        softStone: "#F0EFEB",
        mutedGrey: "#918C84",
        charcoalLight: "#262626",
        champagneLight: "#E8DECA",
        champagneDark: "#B8A279",
      },
      fontFamily: {
        sans: ["Manrope", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["Cormorant Garamond", "Didot", "Bodoni MT", "Georgia", "serif"],
        editorial: ["Cormorant Garamond", "Didot", "Bodoni MT", "Georgia", "serif"],
      },
      letterSpacing: {
        luxury: "0.2em",
        subtle: "0.08em",
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.03)",
        elevated: "0 10px 30px rgba(0, 0, 0, 0.06)",
        modal: "0 20px 50px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
