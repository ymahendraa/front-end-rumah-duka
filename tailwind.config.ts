import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Add more color definitions as needed
        base: "#F4F2F2",
        primary: "#008041",
        primaryDark: "#0a5c34",
        primaryLight: "#def0e4",
        secondary: "#dbb302",
        secondaryDark: "#997d03",
        secondaryLight: "#dbc874",
      },
    },
  },
  plugins: [],
};
export default config;
