/** @type {import('tailwindcss').Config} */
// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      maxsm: { max: "480px" },
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1200px",
    },

    // screens: {
    //   sm: { max: "640px" },
    //   // => @media (min-width: 640px) { ... }

    //   md: { max: "1000px" },
    //   // => @media (min-width: 768px) { ... }

    //   lg: "1024px",
    //   // => @media (min-width: 1024px) { ... }

    //   xl: "1280px",
    //   // => @media (min-width: 1280px) { ... }

    //   "2xl": "1536px",
    //   // => @media (min-width: 1536px) { ... }
    // },
    extend: {
      fontFamily: {
        sans: [
          "source-serif-pro",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
      },
      width: {},
    },
  },
  plugins: [],
};
