import { defineConfig } from "windicss/helpers";
import formsPlugin from "windicss/plugin/forms";

export default defineConfig({
  darkMode: "class",
  safelist: "p-3 p-4 p-5",
  extract: {
    include: ["**/*.{html,js,jsx,ts,tsx}", "app/**/*.{html,js,jsx,ts,tsx}"],
    exclude: ["node_modules", ".git"],
  },
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [formsPlugin],
});
