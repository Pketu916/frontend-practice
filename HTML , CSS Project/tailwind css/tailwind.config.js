/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./dist/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Work Sans"', 'sans-serif'], // Adding Work Sans to the sans-serif family
      },
    },
  },
  plugins: [],
}
