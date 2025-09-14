/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // use class strategy so we can toggle manually
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Existing dark theme base
        cream: '#FFFCF2',
        beige: '#CCC5B9',
        dark: '#403D39',
        ink: '#252422',
        accent: '#EB5E28',
        // Light theme additions
        light: {
          bg: '#FAFAF8',
          surface: '#FFFFFF',
          subtle: '#F2EFE9',
          border: '#E3E0DA',
          text: '#1F1E1B',
          secondary: '#4A473F',
          muted: '#EDEAE4',
          ring: '#D8D4CE',
          highlight: '#FFF5E9'
        },
        darkTheme: {
          bg: '#1C1B19',
          surface: '#252422',
          subtle: '#2F2D2B',
          border: '#343230',
          text: '#FFFCF2',
          secondary: '#CCC5B9'
        }
      }
    }
  },
  plugins: []
};
