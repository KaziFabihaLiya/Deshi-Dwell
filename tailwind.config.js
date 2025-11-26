/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode with class strategy
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Elegant minimalistic palette - Sage Green & Warm Gray
        primary: {
          50: "#f6f7f6",
          100: "#e3e6e3",
          200: "#c7cdc7",
          300: "#a3ada3",
          400: "#7d8a7d",
          500: "#5f6f5f", // Main sage green
          600: "#4d5a4d",
          700: "#3f4a3f",
          800: "#353d35",
          900: "#2d342d",
        },
        secondary: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c", // Warm gray
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
        accent: {
          50: "#fef8f3",
          100: "#fdeee0",
          200: "#fad9b8",
          300: "#f7c08e",
          400: "#f3a05c",
          500: "#e98439", // Warm terracotta
          600: "#d4681f",
          700: "#b04f19",
          800: "#8e401a",
          900: "#743618",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Monaco", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
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
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0, 0, 0, 0.05)",
        medium: "0 4px 6px rgba(0, 0, 0, 0.07)",
        large: "0 10px 20px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
