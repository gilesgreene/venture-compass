// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Defining your exact beige
        "brand-beige": "#F1EEE4",
        "brand-navy": "#0A192F",
      },
    },
  },
  plugins: [],
};
export default config;