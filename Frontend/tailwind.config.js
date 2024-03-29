/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Karla", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#37A0FF",
          50: "#37A0FF80",
          25: "#37A0FF40",
          10: "#37A0FF1A",
          hover: "#2C80E6",
        },
        secondary: {
          DEFAULT: "#151E3F",
          50: "#151E3F80",
          25: "#151E3F40",
          10: "#151E3F1A",
          hover: "#0F1426",
        },
        detail: {
          DEFAULT: "#1E3F6F",
          50: "#1E3F6F80",
          25: "#1E3F6F40",
          10: "#1E3F6F1A",
          hover: "#162B4F",
        },
      },
    },
  },
  plugins: [],
};
