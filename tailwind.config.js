export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui"],
      },
      colors: {
        ink: "#050b18",
        night: "#0b1430",
        glow: "#35f2c3",
        cyan: "#49d6ff",
        sunset: "#ff6e6a",
      },
      boxShadow: {
        glow: "0 20px 60px rgba(2, 10, 20, 0.55)",
      },
    },
  },
  plugins: [],
};
