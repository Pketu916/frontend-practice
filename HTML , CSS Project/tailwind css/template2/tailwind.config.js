/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      colors:{
        primary:"#333333",
        secondary: "#BDBDBD"
      },
      fontFamily: {
        roboto: ["Roboto", "serif"],
      },
      fontSize: {
        "64":"64px",
      },
      lineHeight:{
        "64":"64px",
      },
      maxWidth:{
        "233":"233px"
      },
      margin:{
        "15":"60px",
        "7.5":"30px",
        "30":"120px"
      },
      padding:{
        "3.75":"15px",
        "5.25":"21px",
        "37":"148px"
      },
      height:{
        "46":"46px",
        "147":"147px"

      },
      width:{
        "391":"391px"
      },
      gap:{
        "2.5":"10px"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

