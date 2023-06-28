const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      "darker-blue": "hsl(var(--darker-blue))",
      purple: "hsl(var(--purple))",
      blue: "hsl(var(--blue))",
      "dark-blue": "hsl(var(--dark-blue))",
      white: "hsl(var(--white))",
      "light-grey": "hsl(var(--light-grey))",
      "lighter-grey": "hsl(var(--lighter-grey))",
      "blue-grey": "hsl(var(--blue-grey))",
      orange: "hsl(var(--orange))",
      "bright-blue": "hsl(var(--bright-blue))",
      red: "hsl(var(--red))",
      transparent: "transparent",
      current: "currentColor",
    },
    borderRadius: {
      sm: "5px",
      md: "10px",
    },
    extend: {
      fontSize: {
        sm: "0.9375rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@thoughtbot/tailwindcss-aria-attributes"),
  ],
};
