/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: "#333333",
        buttonBlack: "#222",
      },
    },
  },
  plugins: [],
};
