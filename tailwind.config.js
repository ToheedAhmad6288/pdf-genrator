import theme from './src/config/theme';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: theme.colors,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      spacing: {
        ...theme.spacing,
      },
      borderRadius: theme.borderRadius,
      boxShadow: theme.shadows,
    },
  },
  plugins: [],
};
