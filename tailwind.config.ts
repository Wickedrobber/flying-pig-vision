import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: { 950: "#050507", 900: "#0A0A0E", 800: "#101018" },
        blush: { 300: "#E7A9B8", 400: "#D98DA1", 500: "#C77188" }
      },
      fontFamily: {
        sans: ["ui-sans-serif","system-ui","-apple-system","Segoe UI","Inter","Arial"],
        mono: ["ui-monospace","SFMono-Regular","Menlo","Monaco","Consolas","Liberation Mono","Courier New","monospace"]
      },
      letterSpacing: { tightest: "-0.04em" }
    }
  },
  plugins: []
} satisfies Config;
