/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,html,js}"],
  theme: {
    extend: {
      colors: {
        // Legacy colors for comparison (exact original values)
        legacy: {
          blue: "#006699",
          orange: "#CC3300",
        },
        // Primary (Blue) - legacy #006699
        primary: {
          50: "#E6F0F5",
          100: "#CCE1EB",
          200: "#99C3D7",
          300: "#66A5C3",
          400: "#3387AF",
          500: "#006699", // legacy primary
          600: "#00527A",
          700: "#003D5C",
          800: "#00293D",
          900: "#00141F",
        },
        // Accent (Orange) - legacy #CC3300
        accent: {
          50: "#FEF3EF",
          100: "#FDE7DF",
          200: "#FBCFBF",
          300: "#F9B79F",
          400: "#F79F7F",
          500: "#CC3300", // legacy accent
          600: "#A32900",
          700: "#7A1F00",
          800: "#521400",
          900: "#290A00",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
