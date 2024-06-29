import type { Config } from "tailwindcss";
import { allAddons } from "tailwindcss-addons"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "sans": "var(--font-hanken), system-ui, sans-serif",
        "serif": "var(--font-frank), serif",
      }
    },
  },
  plugins: [
    ...allAddons(),
  ],
};
export default config;
