/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "serif"],
      },
      screens: {
        'custom': '1160px',
      },
      colors: {
        primary:"#0D154B",
        secondary:"#79757F",
        purple: "#6F48FC",
        pink: "#D07EF6",
        blue: "#56C6E7",
        purpleDot:"#8A6CF9",
      },
      boxShadow: {
        'custom-button': `
          0px 1px 1px 0px #0000001A,
          0px 2px 2px 0px #00000017,
          0px 5px 3px 0px #0000000D,
          0px 9px 4px 0px #00000003,
          0px 14px 4px 0px #00000000
        `,
        'training-card': `
          0px 37px 80px 0px #0000001A,
          0px 146px 146px 0px #00000017,
          0px 329px 198px 0px #0000000D,
          0px 585px 234px 0px #00000003,
          0px 915px 256px 0px #00000000
        `,
        'card-item-shadow': `
          0px 14px 30px 0px #0000000D,
          0px 54px 54px 0px #0000000A,
          0px 122px 73px 0px #00000008,
          0px 217px 87px 0px #00000003,
          0px 339px 95px 0px #00000000
        `,
        'live-lesson-card': `
          0px -14px 30px 0px #0000001A,
          0px -55px 55px 0px #00000017,
          0px -125px 75px 0px #0000000D,
          0px -222px 89px 0px #00000003,
          0px -347px 97px 0px #00000000
        `,
        'testimonial-card': `
          0px 12px 27px 0px #0000001A,
          0px 49px 49px 0px #00000017,
          0px 110px 66px 0px #0000000D,
          0px 196px 78px 0px #00000003,
          0px 306px 86px 0px #00000000
        `, 
        'card-nav': `
          0px 1px 1px 0px #0000001A,
          0px 2px 2px 0px #00000017,
          0px 5px 3px 0px #0000000D,
          0px 9px 4px 0px #00000003,
          0px 14px 4px 0px #00000000
        `, 
      },  

      height:{
        "30":123,
        "15.5":60,
        "21.25":85,
        "12.75":51,
        "42.25":169,
      },
      maxWidth:{
        "146":584,
        "187":749,
        "89":356,
        "145":582,
        "124":495,
        "290":1160,
        "113":452,
        "51.25":205,
        "53.25":213,
        "81.75":327,
        "258.75":1035,
        "69.75":279,
        "78.5":314,
        "48.5":194,
      },
      minWidth:{
        "58.5":234,
      },
      margin:{
        "19":77,
        "62":250,
        "25":102,
        "15":60,
        "19.75":79,
        "13.5":54, 
        "59.25":237,
        "130.5":522,
        "17.25":69,
        "30.25":121,
        "14.75":59,
      },
      padding:{
        "13":50,
      },
      width:{
        "36":144,
        "29":116,

      },
      fontSize:{
        "45":45,
        "28":28,
        "22":22,
        "32":32,
        "8":8,
        "11":11,
      },
      lineHeight:{
        "13":"52px",
      },
      size:{
        "89":89,
      },
      gap:{
        "15":60,
      },
      rotate: {
        '10': '10deg',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
