/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Flat keys kept exactly as they were — `text-brand` (used ~258×),
        // `brand-light` and `brand-lighter` already compile and render, so they
        // are left untouched. The numeric ramp below is purely ADDITIVE: it fills
        // in `brand-50`..`brand-900` (used ~300× in markup but previously undefined,
        // so those utilities emitted no CSS at all). The ramp is a single navy hue
        // (~212°) derived from the existing brand navy, which is pinned exactly at
        // `brand-900` so existing dark-navy headings and text do not shift.
        brand: "#1e2a38",
        "brand-light": "#1e3a8a",
        "brand-lighter": "#3b82f6",
        "brand-dark": "#141c26",
        "brand-50": "#f2f5f8",
        "brand-100": "#e4eaf0",
        "brand-200": "#c6d2df",
        "brand-300": "#9aadc1",
        "brand-400": "#697f96",
        "brand-500": "#475c73",
        "brand-600": "#37485c",
        "brand-700": "#2b394a",
        "brand-800": "#24303e",
        "brand-900": "#1e2a38",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
