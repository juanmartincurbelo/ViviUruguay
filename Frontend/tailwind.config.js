/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#37A0FF",
          50: "#37A0FF80",
          25: "#37A0FF40",
          10: "#37A0FF1A",
        },
        secondary: {
          DEFAULT: "#151E3F",
          50: "#151E3F80",
          25: "#151E3F40",
          10: "#151E3F1A",
        },
        detail: {
          DEFAULT: "#1E3F6F",
          50: "#1E3F6F80",
          25: "#1E3F6F40",
          10: "#1E3F6F1A",
        },
      },
    },
  },
  plugins: [],
};
