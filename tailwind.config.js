/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#121212",
          700: "#131723",
          500: "#181C27",
          300: "#22252E",
          100: "#3B3C40",
        },
        secondary: {
          900: "#B2AA96",
          700: "#C8BFA6",
          500: "#D9D0BC",
          300: "#ECE8DE",
          100: "#FCFBF8",
        },
        tertiary: {
          900: "#6F1B23",
          700: "#CB1E22",
          500: "#F51F21",
          300: "#F23635",
          100: "#E9796E",
        },
      },

    },
  },
  plugins: [],
}
