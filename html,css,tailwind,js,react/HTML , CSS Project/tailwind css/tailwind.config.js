/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./dist/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Work Sans"', 'sans-serif'],
      },
      maxWidth: {
        '1175': "1175px",
      }
    },
  },
  plugins: [],
}
