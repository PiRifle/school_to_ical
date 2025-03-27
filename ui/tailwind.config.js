const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html,tsx}')
  ],
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: "#e33f4a"
        },
        white: {
          DEFAULT: "#ffffff"
        },
        neutral: {
          DEFAULT: "#181619"
        },
        purple_heart: {
          DEFAULT: "#4f06ac"
        },
        primary: {
          DEFAULT: "#aa30d4"
        },
        success: {
          DEFAULT: "#a5d739"
        },
        caution: {
          DEFAULT: "#f98f12"
        },
        danger: {
          DEFAULT: "#d6301e"
        },
        info: {
          DEFAULT: "#327df0"
        }
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
      },
    },
  },
}
