import { colors } from "@switchdreams/ui";
import switchUiPlugin from "@switchdreams/ui/dist/tailwind.plugin";

import viaColors from "./app/frontend/constants/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["app/**/*.html.erb", "app/**/*.jsx", "./node_modules/@switchdreams/ui/dist/**/*.js"],
  theme: {
    extend: {
      curvature: {
        md: 0,
        full: 0,
      },
      fontWeight: {
        light: 300,
        thin: 100,
        extralight: 200,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      screens: {
        big: "1216px",
        "3xl": "1640px",
        "2sm": "375px",
        "3sm": "320px",
        "0.5sm": "400px",
      },
      colors: {
        ...colors,
        ...viaColors,
        checkbox: {
          primary: {
            border: viaColors.coolGray["300"],
            checked: viaColors.secondary["400"],
            hover: viaColors.secondary["25"],
          },
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [switchUiPlugin],
};
