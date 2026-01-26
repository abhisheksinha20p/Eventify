/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1", // Indigo
        secondary: "#ec4899", // Pink
        accent: "#f59e0b", // Amber
        background: "#0f172a", // Slate 900
        surface: "#1e293b", // Slate 800
      }
    },
  },
  plugins: [],
}
