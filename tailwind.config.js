/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./posts/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        'vc-beige': '#F2E8DF',
        'vc-navy': '#1B365D',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}