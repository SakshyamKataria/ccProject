/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo 600
        secondary: "#10B981", // Emerald 500
        background: "#F3F4F6", // Gray 100
        surface: "#FFFFFF",
        text: "#1F2937", // Gray 800
        dark: {
          background: "#111827", // Gray 900
          surface: "#1F2937",
          text: "#F9FAFB" // Gray 50
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
