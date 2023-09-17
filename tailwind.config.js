/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      dark: "#2A2B2E",
      "dark-back": "#393C42",
      light: "#FFFFFF",
      "light-back": "#F0F2F6",
      blue: "#7161EF",
      green: "#5FDA41",
      red: "#FF5959",
      "blue-gradient": "linear-gradient(157deg, #7161EF 0%, #619AEF  100%)",
      "blue-gradient-opposite":
        "linear-gradient(157deg, #619AEF 0%, #7161EF  100%)",
    },
  },
  plugins: [require("flowbite/plugin")],
};
