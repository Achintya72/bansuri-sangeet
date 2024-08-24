import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        quicksand: ["var(--font-quicksand)", "sans-serif"]
      },
      colors: {
        white: {
          light: "#FAFAFA",
          medium: "#f1f1f1",
          dark: "#bebebe",
          extraDark: "#525252",
          black: "#000000"
        },
        green: {
          light: "#B1F1B4",
          extraDark: "#09500B"
        },
        orange: {
          light: "#EFD5BD",
          regular: "#FFCC9C",
          extraDark: "#78410F"
        }
      }
    },

  },
  plugins: [],
};
export default config;
