/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Outfit', 'sans-serif'],
        secondary: ['Inter', 'sans-serif'],
        tertiary: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
