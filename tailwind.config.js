/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'brandon': ['HvDTrial Brandon Grotesque', 'sans-serif'],
        'sans': ['HvDTrial Brandon Grotesque', 'sans-serif'],
      },
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          500: '#64748b',
          950: '#020617'
        },
        purple: {
          50: '#faf5ff',
          800: '#6b21a8'
        }
      },
      borderRadius: {
        '3xl': '24px'
      }
    },
  },
  plugins: [],
} 