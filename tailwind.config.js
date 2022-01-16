const colors = require("tailwindcss/colors");

const newColors = {
  ...colors,
  primary: "#22577A",
  "primary-soft": "#2D719F",
  accent: "#80ED99",
  link: "#80ED99",
  "admin-link": "#0FC670",
  "admin-primary": "#2D719F",
  "admin-primary-dark": "#1768A0",
  "admin-danger": "#FC484D",
  "admin-danger-dark": "#FC0A11",
  "admin-danger-light": "#FFC6D6",
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      ...newColors,
    },
    backgroundColor: {
      ...newColors,
      "admin-grey": "rgb(239, 240, 244)",
    },
    textColor: {
      ...newColors,
      "primary-on-accent": "#19323C",
      "background-primary": "#22577A",
      "admin-primary": "#19323C",
    },
    fontFamily: {
      mono: ["VT323", "monospace"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
