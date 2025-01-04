/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "serif"],
      },
      colors: {
        primary:"#0D154B",
        secondary:"#79757F",
        purple: "#6F48FC",
        pink: "#D07EF6",
        blue: "#56C6E7",
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
      },   
    },
  },
  plugins: [],
};
