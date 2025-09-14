/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFFCF2',
        beige: '#CCC5B9',
        dark: '#403D39',
        ink: '#252422',
        accent: '#EB5E28'
      }
    }
  },
  plugins: []
};
