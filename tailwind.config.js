/** @type {import('tailwindcss').Config} */
import {nextui} from '@nextui-org/theme';

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(79 96 122)', 
        'primary-dark': 'rgb(79 96 122)',
        secondary: '#264eca',
        'secondary-dark': '#f9d74f',
        'gradient-start': '#f3b3f0',
        'gradient-end': '#758ef0',
        },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        'top': "url('/images/bg.png')",
      },
    },

    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },

  },
  plugins: [nextui()],
}

