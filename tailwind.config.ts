import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

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
          wine: "#AA2823",
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
