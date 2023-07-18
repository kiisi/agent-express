/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#4D47C3",
        "sl-green":"#00C389",
        "sl-red":"#F72F1E"
      }
    },
  },
  plugins: [],
}