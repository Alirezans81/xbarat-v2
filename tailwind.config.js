/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
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
    },
  },
  plugins: [require("flowbite/plugin")],
};
