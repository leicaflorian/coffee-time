/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#EA4936',
        'secondary': '#F5667D',
        'tertiary': '#399CFE',
      }
    },
  },
  plugins: [],
}

