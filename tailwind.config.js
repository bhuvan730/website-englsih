/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#f3eee4',
        forest: '#1d3529',
        turmeric: '#b1843d',
        clay: '#a95e40',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
