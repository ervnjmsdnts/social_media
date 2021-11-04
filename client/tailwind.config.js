module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#17213D",
        secondary: "#CCD2E3",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
