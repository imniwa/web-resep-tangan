/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },

    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: "#FEB139",
        secondary: "#FEF4E5",
        accent: "#E7FE39",
        black: "#151515",
        white: "#FFFFFF",
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        error: "#FF3333",
      },
      fontSize: {
        small: "8px",
      },
      fontFamily: {
        inter: ["Inter, sans-serif"],
        ibm: ["IBM Plex Sans JP, sans-serif"],
        poppins: ["Poppins, sans-serif"],
      },
    },
  },
  plugins: [],
};
