module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './content/**/*.{md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          850: '#18202F',
          950: '#0b0f1a',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
