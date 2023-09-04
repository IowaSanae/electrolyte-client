/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Pages/**/*.{js,ts,jsx,tsx}",
    "./src/component/**/*.{js,ts,jsx,tsx}",
    "./src/containers/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {},
    screens: {
      mob: "480px",
      tab: "880px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "740px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      lt: "500px",
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
