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
        base: "#151C2C",
        primary: "#252D3F",
        "primary-dark": "#363C4B",
        "primary-light": "#A2ADC8",
        secondary: "#3B93F7",
        "secondary-dark": "#0968D6",
        "secondary-light": "#7CB7FA",
        ternary: "#7646FC",
        "ternary-dark": "#3803C9",
      },
    },
  },
  plugins: [],
};
export default config;
