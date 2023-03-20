/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'fkl-',
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    boxShadow: {
      card: '-1.88313px 3.76627px 11.2988px rgba(0, 0, 0, 0.35)',
      light: '1px 1px 12px -1px rgba(0, 0, 0, 0.12)',
      menu: '-4px 5px 12px rgba(0, 0, 0, 0.25), -4px 4px 20px rgba(0, 0, 0, 0.25);',
    },
    colors: {
      transparent: 'transparent',
      black: {
        DEFAULT: '#000',
        light: 'rgba(0, 0, 0, 0.87)',
      },
      white: {
        DEFAULT: '#fff',
      },
      grey: {
        DEFAULT: '#dadadf',
      },
      green: {
        DEFAULT: '#11BF42',
      },
      red: {
        DEFAULT: '#E82B02',
      },
      neutral: {
        DEFAULT: '#8B7A98',
      },
      watermark: {
        DEFAULT: 'rgb(226 226 226 / 20%)',
      },
      primary: {
        DEFAULT: '#063C94',
      },
      divider: {
        DEFAULT: '#bbbbbb',
      },
      tooltip: {
        DEFAULT: 'rgba(97, 97, 97, 0.92)',
      },
    },
    extend: {},
  },
  plugins: [],
};
