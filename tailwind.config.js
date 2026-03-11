/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#03060F"
      },
      fontFamily: {
        display: ["Syne", "ui-sans-serif", "system-ui"],
        sans: ["Manrope", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        aura: "0 0 60px rgba(115, 245, 213, 0.18)"
      }
    }
  },
  plugins: []
};
