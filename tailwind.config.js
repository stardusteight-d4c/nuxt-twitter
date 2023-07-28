/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  darkMode: "class",
  // If you insert classes dynamically as in :class="`group-hover:text-${props.color}-400 ml-1`"
  // Tailwind will not know how to save in its final css file, as it only uses classes that are
  // being used in the application, then we have safelist.
  safelist: [
    {
      pattern: /text-(red|green|blue|orange)-(100|400|500)/,
      variants: ["group-hover"],
    },
    {
      pattern: /bg-(red|green|blue|orange)-(100|200|300|400|500)/,
      variants: ["group-hover"],
    },
  ],

  theme: {
    screens: {
      xs: "614px",
      sm: "1002px",
      md: "1022px",
      lg: "1092px",
      xl: "1280px",
    },
    extend: {
      colors: {
        dim: {
          50: "#5F99F7",
          100: "#5F99F7",
          200: "#38444d",
          300: "#202e3a",
          400: "#253341",
          500: "#5F99F7",
          600: "#5F99F7",
          700: "#192734",
          800: "#162d40",
          900: "#000000",
        },
      },
    },
  },
  plugins: ["@tailwindcss/forms"],
}
