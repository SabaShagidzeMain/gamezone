module.exports = {
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        background: {
          light: "#ffffff", // Light mode background
          dark: "#001219", // Dark mode background
        },
        foreground: {
          light: "#001219", // Light mode text color
          dark: "#ffffff", // Dark mode text color
        },
      },
      boxShadow: {
        white: "0 0 10px rgba(255, 255, 255, 0.5)", // White shadow in dark mode
      },
    },
  },
  plugins: [],
};
