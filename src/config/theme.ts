/**
 * Centralized Theme Configuration
 * Control all Tailwind colors and brand elements from one place
 */

export const theme = {
  // Primary Brand Colors - Classical / Antique palette (burgundy, gold, parchment)
  colors: {
    primary: {
      50: '#fff5f4',
      100: '#fee9e8',
      200: '#f6c6c4',
      300: '#ea9a97',
      400: '#d56b67',
      500: '#b8413d',
      600: '#982f2f',
      700: '#7a2727',
      800: '#5d1f1f',
      900: '#401414',
    },
    secondary: {
      50: '#fffaf0',
      100: '#fff3d9',
      200: '#ffe6a8',
      300: '#ffd378',
      400: '#ffc04a',
      500: '#e6a218',
      600: '#b57b12',
      700: '#8a5c0d',
      800: '#62420a',
      900: '#3d2a06',
    },
    danger: {
      50: '#fff5f5',
      100: '#feecec',
      200: '#fdd2d2',
      300: '#f8b1b1',
      400: '#f28a8a',
      500: '#ef5757',
      600: '#e03f3f',
      700: '#b82b2b',
      800: '#8f1f1f',
      900: '#611515',
    },
    success: {
      50: '#f6fff5',
      100: '#ecfbe8',
      200: '#d6f3cc',
      300: '#aee5a2',
      400: '#7ed274',
      500: '#4fb84a',
      600: '#3b8e3a',
      700: '#2e6b2d',
      800: '#234f22',
      900: '#173416',
    },
    warning: {
      50: '#fffaf2',
      100: '#fff2d9',
      200: '#ffe6a8',
      300: '#ffd278',
      400: '#ffc04a',
      500: '#e6a218',
      600: '#b57b12',
      700: '#8a5c0d',
      800: '#62420a',
      900: '#3d2a06',
    },
    neutral: {
      50: '#fbf7ef',
      100: '#f7efe0',
      200: '#efe0c2',
      300: '#e2d0a8',
      400: '#cbb88d',
      500: '#a88f60',
      600: '#8a6f45',
      700: '#6b5233',
      800: '#453322',
      900: '#2a1b12',
    },
    // Short-named classical palette (convenience group)
    clrs: {
      parchment: '#fbf7ef',
      burgundy: '#b8413d',
      burgundyDark: '#7a2727',
      gold: '#e6a218',
      goldDark: '#b57b12',
      sepia: '#8a6f45',
      ink: '#2a1b12',
      olive: '#4f7a2b',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ['Garamond', 'Georgia', 'serif'],
      mono: ['ui-monospace', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },

  // Shadows
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // Brand Usage
  brand: {
    // Navbar
    navbar: {
      background: 'primary.900',
      text: 'neutral.50',
      hover: 'primary.800',
    },
    // Buttons
    button: {
      primary: 'primary.600',
      secondary: 'secondary.600',
      danger: 'danger.600',
      success: 'success.600',
      hover: {
        primary: 'primary.700',
        secondary: 'secondary.700',
        danger: 'danger.700',
        success: 'success.700',
      },
    },
    // Cards
    card: {
      background: 'neutral.50',
      border: 'neutral.200',
      shadow: 'md',
    },
    // Inputs
    input: {
      background: 'neutral.100',
      border: 'neutral.300',
      focus: 'primary.500',
      text: 'neutral.900',
    },
    // Text
    text: {
      primary: 'neutral.900',
      secondary: 'neutral.600',
      light: 'neutral.500',
    },
  },
};

// Helper function to get nested color values
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let value: any = theme;
  for (const key of keys) {
    value = value[key];
    if (value === undefined) {
      console.warn(`Color path not found: ${path}`);
      return '#000000';
    }
  }
  return value;
};

export default theme;
