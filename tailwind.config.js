/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme colors
        'theme-light': '#ffffff',
        'theme-dark': '#1a1a1a',
        'theme-blue': '#e6f3ff',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}