import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        solway: ["solway", "serif"],
      },
      colors: {
        "typey-background": "#303025",
        "typey-primary": "#A18CCF",
        "typey-primary-light": "#C7BAE2",
        "typey-primary-lighter": "#D8CFEB",
        "typey-secondary": "#75AAA1",
        "typey-default": "#EAEAEA",
        "typey-ok": "#88EE57",
        "typey-bad": "#F16647",
        "typey-badder": "#C13607",
      },
      backgroundSize: {
        "400%": "400%",
      },
      keyframes: {
        right: {
          "0%": { "background-position": "right" },
        },
      },
      animation: {
        loader: "right 2s infinite linear",
      },
    },
  },
  plugins: [forms],
};
