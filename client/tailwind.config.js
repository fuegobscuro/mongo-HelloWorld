module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans Pro"', 'sans-serif'],
        serif: ['"Source Serif Pro"', 'serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
