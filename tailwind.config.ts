import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1877F2",
          hover: "#166FE5",
          soft: "#E8F2FF",
        },
        secondary: "#42A5F5",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        ink: {
          DEFAULT: "#1F2937",
          muted: "#6B7280",
        },
        canvas: "#F8FAFC",
        line: "#E5E7EB",
      },
      boxShadow: {
        panel: "0 1px 2px rgba(15, 23, 42, 0.06)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
