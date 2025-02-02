/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
      colors: {
        dark: {
          main: "#001219", // Dark background color
          accent: "#ffffff", // Dark text color
        },
        light: {
          main: "#ffffff", // Light background color
          accent: "#001219", // Light text color
        },
      },
    },
  },
  darkMode: "class", // Enables class-based dark mode
  plugins: [],
};
