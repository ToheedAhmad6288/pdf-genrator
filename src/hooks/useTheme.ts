import theme, { getColor } from '../config/theme';

/**
 * Hook to use theme throughout the application
 * Ensures consistent styling across all components
 */
export const useTheme = () => {
  return {
    theme,
    getColor,
    // Convenient theme shortcuts
    colors: theme.colors,
    brand: theme.brand,
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
  };
};

/**
 * Helper function to generate Tailwind class names based on theme
 */
export const getThemeClass = (type: string, variant: string = 'default'): string => {
  const classMap: Record<string, Record<string, string>> = {
    button: {
      primary: 'bg-clrs-burgundy hover:bg-clrs-burgundyDark text-clrs-parchment',
      secondary: 'bg-clrs-gold hover:bg-clrs-goldDark text-clrs-ink',
      danger: 'bg-clrs-burgundy hover:bg-clrs-burgundyDark text-clrs-parchment',
      success: 'bg-clrs-olive hover:bg-clrs-olive text-clrs-parchment',
      default: 'bg-clrs-burgundy hover:bg-clrs-burgundyDark text-clrs-parchment',
    },
    card: {
      default: 'bg-clrs-parchment border border-clrs-sepia rounded-lg shadow-md text-clrs-ink',
      dark: 'bg-clrs-burgundyDark border border-clrs-burgundy rounded-lg shadow-lg text-clrs-parchment',
    },
    input: {
      default: 'bg-clrs-parchment border border-clrs-sepia rounded-md focus:border-clrs-burgundy focus:ring-clrs-burgundy text-clrs-ink',
      dark: 'bg-clrs-ink border border-clrs-sepia rounded-md focus:border-clrs-burgundy focus:ring-clrs-burgundy text-clrs-parchment',
    },
    navbar: {
      default: 'bg-clrs-burgundyDark text-clrs-parchment',
    },
    text: {
      primary: 'text-clrs-ink',
      secondary: 'text-clrs-sepia',
      light: 'text-clrs-parchment',
    },
  };

  return classMap[type]?.[variant] || '';
};

export default useTheme;
