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
    colors: {
      primary: "#1fb6ff",
      secondary: "#7e5bef",
      accent: "#ff49db",
      black: "#ff7849",
      white: "#13ce66",
      grey: {
        50: "#",
        100: "#",
        200: "#",
        300: "#",
        400: "#",
        500: "#",
        600: "#",
        700: "#",
        800: "#",
        900: "#",
      },
    },
    extend: {},
  },
  plugins: [],
};
