/** @type {import('tailwindcss').Config} */
module.exports = {
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
        poppinsLight: ["var(--font-Poppins-Light)"],
        poppinsRegular: ["var(--font-Poppins-Regular)"],
        poppinsMedium: ["var(--font-Poppins-Medium)"],
        poppinsSemiBold: ["var(--font-Poppins-SemiBold)"],
        poppinsBold: ["var(--font-Poppins-Bold)"],
        poppinsExtraBold: ["var(--font-Poppins-ExtraBold)"],
        poppinsExtraLargeBold: ["var(--font-Poppins-ExtraLargeBold)"]
      },
    },
  },
  plugins: [],
};
