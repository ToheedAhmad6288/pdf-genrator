# PDF Generator - Theme System Setup Guide

## What's New

This project now includes a **centralized theme system** that controls all Tailwind CSS colors and brand elements from a single location.

### New Files Added:
1. **`src/config/theme.ts`** - Central theme configuration with all colors, typography, spacing, and brand usage
2. **`src/hooks/useTheme.ts`** - React hook and helper functions to access theme values
3. **`tailwind.config.js`** - Tailwind configuration that imports from theme.ts
4. **`src/components/ExtractText/`** - New PDF feature to extract text from PDFs
5. **`THEME_DOCUMENTATION.md`** - Complete documentation on using the theme system
6. **`src/THEME_USAGE_EXAMPLES.tsx`** - Practical examples of theme implementation

## Quick Start

### 1. Using Theme in Components
```tsx
// Use Tailwind classes with theme colors
<button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded">
  Click Me
</button>

// Use helper function for variants
<button className={getThemeClass('button', 'primary')}>
  Primary Button
</button>

// Use hook for programmatic access
const { colors, spacing } = useTheme();
```

### 2. Available Color Palettes
- **primary** - Main brand color (Sky blue)
- **secondary** - Accent color (Purple)
- **danger** - Error states (Red)
- **success** - Success states (Green)
- **warning** - Warning states (Amber)
- **neutral** - Grayscale (Gray)

Each palette has 10 shades: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

### 3. New PDF Feature - Extract Text
The new "Extract Text" feature allows you to:
- Upload a PDF file
- Extract all text from the PDF
- Copy extracted text to clipboard
- Download as a text file

Located in: `src/components/ExtractText/`

### 4. Change Colors Globally
Edit `src/config/theme.ts`:
```ts
colors: {
  primary: {
    600: '#your-new-color', // Change primary brand color
  }
}
```
All components automatically update!

## File Structure
```
src/
├── config/
│   └── theme.ts                    # ← Edit this to change all colors
├── hooks/
│   └── useTheme.ts                 # ← Access theme values
├── components/
│   ├── ExtractText/                # ← New feature
│   │   └── components/
│   │       ├── FileUpload.tsx
│   │       └── TextExtractor.tsx
│   ├── Navbar.tsx                  # ← Uses theme
│   └── ...
├── App.tsx                         # ← Main app with all features
└── THEME_USAGE_EXAMPLES.tsx        # ← Example implementations
tailwind.config.js                  # ← Integrates theme.ts
THEME_DOCUMENTATION.md              # ← Full documentation
```

## Common Tasks

### Change Primary Brand Color
1. Open `src/config/theme.ts`
2. Modify the `primary` color palette
3. Save - all components update instantly!

### Add a New Color Palette
1. Open `src/config/theme.ts`
2. Add new color object under `colors:`
3. Use in components: `className="bg-mycolor-600"`

### Update Button Styling
1. Open `src/config/theme.ts`
2. Edit `brand.button` section
3. All buttons automatically update

### Create Themed Component
```tsx
import { useTheme, getThemeClass } from '../hooks/useTheme';

export function MyComponent() {
  return (
    <div className={getThemeClass('card', 'default')}>
      <button className={getThemeClass('button', 'primary')}>
        Click Me
      </button>
    </div>
  );
}
```

## Important Notes

1. **Never hardcode colors** - Always use the theme system
2. **Edit `src/config/theme.ts` only** - One source of truth
3. **Hot reload** - Changes apply instantly in development
4. **Consistent branding** - All components automatically stay synchronized
5. **Easy to maintain** - Update colors once, everywhere updates

## Testing the Theme
1. Run `npm run dev`
2. Open the application in your browser
3. Try the new "Extract Text" feature
4. Edit a color in `src/config/theme.ts` and see instant updates

## Documentation
- **THEME_DOCUMENTATION.md** - Complete guide with best practices
- **src/THEME_USAGE_EXAMPLES.tsx** - Practical code examples

## Getting Help
Refer to `THEME_DOCUMENTATION.md` for:
- Detailed API documentation
- Component examples
- Best practices
- Troubleshooting

---

**Summary**: You now have a professional, scalable theme system that makes maintaining a consistent design easy. Edit `src/config/theme.ts` to rebrand the entire application!
