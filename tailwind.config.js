const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
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
      grey: "hsl(var(--grey))",
    },
    borderRadius: {
      sm: "5px",
      md: "10px",
      full: "9999px",
    },
    screens: {
      tablet: "640px",
      desktop: "1024px",
    },
    fontSize: {
      xs: [ "13px", "19px" ],
      sm: [ "15px", "22px" ],
      md: [ "16px", "23px" ],
      h1: [
        "24px",
        {
          lineHeight: "35px",
          letterSpacing: "-0.033em",
        },
      ],
      h2: [
        "20px",
        {
          lineHeight: "29px",
          letterSpacing: "-0.025em",
        },
      ],
      h3: [
        "18px",
        {
          lineHeight: "26px",
          letterSpacing: "-0.025em",
        },
      ],
      h4: [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "-0.02em",
        },
      ],
    },
    extend: {
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
  safelist: [
    'bg-bright-blue',
    'bg-orange',
  ]
};
