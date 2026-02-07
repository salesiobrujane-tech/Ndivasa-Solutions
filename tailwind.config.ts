import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef7ff",
          100: "#d9edff",
          200: "#bcdfff",
          300: "#8cc8ff",
          400: "#56a8ff",
          500: "#2f89ff",
          600: "#1f6fe6",
          700: "#1757b5",
          800: "#144a8f",
          900: "#133f73"
        },
        accent: {
          50: "#fff7e6",
          100: "#ffe8b8",
          200: "#ffd47a",
          300: "#ffc24a",
          400: "#ffad1f",
          500: "#f79300",
          600: "#cf7400",
          700: "#a75800",
          800: "#7f4200",
          900: "#663600"
        }
      }
    }
  },
  plugins: []
};

export default config;
