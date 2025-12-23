/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-cream": "#FEFCF3",
        "secondary-beige": "#F5F1E3",
        "accent-teal": "#4A9B9B",
        "accent-coral": "#E07A5F",
        "dark-text": "#3D405B",
        "light-text": "#626478",
        "border-soft": "#D4CFC4",
        "card-bg": "#FAF8F1",
        "success-green": "#81B29A",
        "warning-yellow": "#F4A261",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
        arial: ["Arial", "sans-serif"],
        comicsans: ['"Comic Sans MS"', '"Comic Sans"', "cursive"],
        dyslexic: ["OpenDyslexic", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // choose your preferred themes
  },
};
