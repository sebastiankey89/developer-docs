const colors = {
  gray: {
    850: '#18202F',
    950: '#000a14',
  },
  navy: '#003670',
  skyBlue: '#009bd2',
  limeGreen: '#28d972',
};

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './content/**/*.{md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...colors,
        'logo-bg': {
          DEFAULT: colors.skyBlue,
          dark: '#29c6ff',
        },
      },
      screens: {
        '1.5xl': '1440px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
