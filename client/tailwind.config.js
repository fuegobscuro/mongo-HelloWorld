module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-r':
          'linear-gradient(to right, rgba(2,0,36,1) 0%, rgba(85,85,122,0.45149397649684875) 50%, rgba(225,232,233,0.1237628840598739) 100%)',
      },
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
