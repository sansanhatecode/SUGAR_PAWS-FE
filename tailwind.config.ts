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
        background: "var(--background)",
        foreground: "var(--foreground)",
        custom: {
          yellow: "#FFF4DD",
          pink: "#FFD1DC",
          rose: "#FE6E94",
          dark: "#232023",
          purple: "#331048",
        },
      },
    },
  },
  plugins: [],
};
export default config;
