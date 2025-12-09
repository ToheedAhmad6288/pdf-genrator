# Theme System Documentation

## Overview
This project uses a centralized theme system to control all Tailwind CSS colors and brand elements across the entire website. This ensures consistency and makes it easy to rebrand or update colors globally.

## Theme Configuration File
**Location:** `src/config/theme.ts`

This is the single source of truth for all design tokens:
- **Colors**: Primary, secondary, danger, success, warning, and neutral palettes
- **Typography**: Font families and sizes
- **Spacing**: Padding, margins, and gaps
- **Border Radius**: Corner radius values
- **Shadows**: Shadow definitions
- **Brand Usage**: Specific color assignments for UI elements

## How to Use

### 1. **Using Tailwind Classes (Recommended)**
All theme colors are automatically available as Tailwind utility classes:

```tsx
// Primary color
<button className="bg-primary-600 hover:bg-primary-700 text-white">
  Button
</button>

// Secondary color
<div className="bg-secondary-500 text-secondary-900">
  Content
</div>

// Danger/Success/Warning
<div className="bg-danger-100 text-danger-700">Error</div>
<div className="bg-success-100 text-success-700">Success</div>
<div className="bg-warning-100 text-warning-700">Warning</div>
```

### 2. **Using the useTheme Hook**
For programmatic access within React components:

```tsx
import { useTheme } from '../hooks/useTheme';

function MyComponent() {
  const { theme, colors, brand, spacing } = useTheme();
  
  return (
    <div style={{ padding: spacing.md, color: colors.primary[600] }}>
      Content
    </div>
  );
}
```

### 3. **Using getColor Helper**
For direct color value access:

```tsx
import { getColor } from '../config/theme';

const primaryColor = getColor('colors.primary.600');
const navbarBg = getColor('brand.navbar.background');
```

### 4. **Using getThemeClass Helper**
For consistent component styling:

```tsx
import { getThemeClass } from '../hooks/useTheme';

export function Button() {
  const buttonClass = getThemeClass('button', 'primary');
  return <button className={buttonClass}>Click me</button>;
}
```

## Modifying the Theme

### Change Primary Color
Edit `src/config/theme.ts`:
```ts
colors: {
  primary: {
    50: '#your-color-50',
    100: '#your-color-100',
    // ... rest of the palette
  }
}
```

### Change Brand Colors
```ts
brand: {
  button: {
    primary: 'primary.700', // Changed from primary.600
    secondary: 'secondary.600',
  }
}
```

### Add New Color Palette
```ts
colors: {
  // ... existing colors
  custom: {
    50: '#f0f0f0',
    100: '#e0e0e0',
    // ... full palette
  }
}
```

## Component Examples

### Using Theme in Components

```tsx
// src/components/Button.tsx
import { getThemeClass } from '../hooks/useTheme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children }: ButtonProps) {
  const baseClass = 'font-semibold py-2 px-4 rounded-lg transition-colors';
  const variantClass = getThemeClass('button', variant);
  
  return (
    <button className={`${baseClass} ${variantClass}`}>
      {children}
    </button>
  );
}
```

```tsx
// src/components/Card.tsx
import { useTheme } from '../hooks/useTheme';

export function Card({ children }: { children: React.ReactNode }) {
  const { brand } = useTheme();
  return (
    <div className={`${getThemeClass('card', 'default')} p-6`}>
      {children}
    </div>
  );
}
```

## Tailwind Config Integration

The `tailwind.config.js` automatically extends Tailwind's default theme with your custom colors and spacing:

```js
// tailwind.config.js imports and uses theme.ts
import theme from './src/config/theme';

export default {
  extend: {
    colors: theme.colors,
    fontFamily: theme.typography.fontFamily,
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
    boxShadow: theme.shadows,
  }
}
```

## Best Practices

1. **Always use theme colors** - Never hardcode colors like `#FF5733`
2. **Use Tailwind classes first** - They're performant and consistent
3. **Group related colors** - Use primary/secondary for main UI, danger/success for states
4. **Update theme.ts only** - All changes flow through automatically
5. **Use brand section** - For semantic color assignments (e.g., button.primary)
6. **Document custom colors** - If adding new palettes, explain their purpose

## File Structure
```
src/
├── config/
│   └── theme.ts          # Single source of truth
├── hooks/
│   └── useTheme.ts       # Hook for accessing theme
├── components/
│   ├── Button.tsx        # Use theme colors
│   ├── Card.tsx          # Use theme colors
│   └── ...
└── App.tsx               # Uses theme throughout
```

## Quick Reference

| Location | Method | Use Case |
|----------|--------|----------|
| HTML/JSX | `className="bg-primary-600"` | Most common, recommended |
| JavaScript | `getColor('colors.primary.600')` | Dynamic styles |
| React Component | `useTheme()` | Access multiple theme values |
| Consistent Patterns | `getThemeClass('button', 'primary')` | Component variants |

---

**Note:** Any changes to `src/config/theme.ts` will automatically update all components using the theme system. Hot reload will apply changes instantly in development.
