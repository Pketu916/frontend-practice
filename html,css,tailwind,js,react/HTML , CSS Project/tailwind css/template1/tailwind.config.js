/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Work Sans"', 'sans-serif'],
        crimson: ["Crimson Text",' serif'],
      },
      colors: {
        green: "#74C69D",
        grey:"#21252980"
      },
      maxWidth: {
        '1175': "1175px",
        '1175': "1175px",
        '470': "470px",
      },
      fontSize: {
        '28': "28px",
        '40': "40px",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
