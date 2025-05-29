/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/styles/**/*.css",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Cinzel Decorative', 'serif'],
      },
      colors: {
        gray: {
          850: '#1f1f1f',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

