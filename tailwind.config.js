/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        upward: "upward 2s ease-out 1",
        rightward: "rightward 2s ease-out 1",
      },
      keyframes: {
        upward: {
          "0%": { margin: "30px 0px 0px 0px" },
          "100%": { margin: "0px" },
        },
        rightward: {
          "0%": { margin: "0px 0px 0px 30px" },
          "100%": { margin: "0px" },
        },
      },
    },
    colors: {
      dark: "#2A2B2E",
      "dark-back": "#152831",
      light: "#FFFFFF",
      "light-back": "#EEEEEE",
      blue: "#0A8DFF",
      green: "#0B9B08",
      red: "#E42F08",
      "blue-gradient": "linear-gradient(157deg, #0A8DFF 0%, #619AEF  100%)",
      "blue-gradient-opposite":
        "linear-gradient(157deg, #619AEF 0%, #0A8DFF  100%)",
      gray: "#8F97A6",
    },
    screens: {
      xs: "420px",
      // => @media (min-width: 640px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xlg: "1200px",
      // => @media (min-width: 1200px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require("flowbite/plugin")],
};
