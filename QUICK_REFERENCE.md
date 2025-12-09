# Quick Reference: Theme System Cheat Sheet

## TL;DR - Use This

```tsx
// ✅ MOST COMMON - Use Tailwind classes
<button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded">
  Save
</button>

// Available classes:
// bg-primary-{50..900}
// bg-secondary-{50..900}
// bg-danger-{50..900}
// bg-success-{50..900}
// bg-warning-{50..900}
// bg-neutral-{50..900}
```

---

## Color Reference

| Palette | Usage | Shades Available |
|---------|-------|-----------------|
| **primary** | Brand color, main CTA | 50-900 |
| **secondary** | Accent, alternative | 50-900 |
| **danger** | Errors, destructive | 50-900 |
| **success** | Success, positive | 50-900 |
| **warning** | Warnings, alerts | 50-900 |
| **neutral** | Text, backgrounds | 50-900 |

---

## Quick Examples

### Buttons
```tsx
// Primary button
<button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded">
  Primary
</button>

// Danger button
<button className="bg-danger-600 hover:bg-danger-700 text-white px-4 py-2 rounded">
  Delete
</button>

// Success button
<button className="bg-success-600 hover:bg-success-700 text-white px-4 py-2 rounded">
  Confirm
</button>
```

### Cards
```tsx
<div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 shadow-md">
  <h2 className="text-neutral-900 font-bold mb-4">Card Title</h2>
  <p className="text-neutral-600">Card content</p>
</div>
```

### Inputs
```tsx
<input
  type="text"
  className="bg-neutral-100 border border-neutral-300 rounded-md focus:border-primary-500 focus:ring-primary-500 px-3 py-2"
  placeholder="Type here..."
/>
```

### Alerts
```tsx
// Success alert
<div className="bg-success-100 border border-success-400 text-success-700 p-4 rounded">
  ✓ Success message
</div>

// Danger alert
<div className="bg-danger-100 border border-danger-400 text-danger-700 p-4 rounded">
  ✗ Error message
</div>

// Warning alert
<div className="bg-warning-100 border border-warning-400 text-warning-700 p-4 rounded">
  ⚠ Warning message
</div>
```

### Text Colors
```tsx
<p className="text-neutral-900">Primary text (darkest)</p>
<p className="text-neutral-600">Secondary text (medium)</p>
<p className="text-neutral-500">Light text (lighter)</p>
```

### Backgrounds
```tsx
<div className="bg-primary-900">Dark primary</div>
<div className="bg-primary-500">Medium primary</div>
<div className="bg-primary-100">Light primary</div>
```

---

## Available Spacing Sizes

```tsx
className="p-xs"   // 0.25rem
className="p-sm"   // 0.5rem
className="p-md"   // 1rem
className="p-lg"   // 1.5rem
className="p-xl"   // 2rem
className="p-2xl"  // 3rem
className="p-3xl"  // 4rem

// Works with all spacing utilities:
// p-* (padding)
// m-* (margin)
// gap-* (grid gap, flex gap)
```

---

## Available Border Radius

```tsx
className="rounded-none"   // 0
className="rounded-sm"     // 0.125rem
className="rounded-base"   // 0.375rem
className="rounded-md"     // 0.5rem
className="rounded-lg"     // 0.75rem
className="rounded-xl"     // 1rem
className="rounded-full"   // 9999px (circle)
```

---

## Available Shadows

```tsx
className="shadow-xs"  // Smallest
className="shadow-sm"  // Small
className="shadow-md"  // Medium (default)
className="shadow-lg"  // Large
className="shadow-xl"  // Extra large
```

---

## How to Change Colors

Edit `src/config/theme.ts`:

```ts
// Find the colors section
colors: {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    // ... change any color value here
    600: '#0284c7',  // ← edit this
    // ... rest of colors
  }
}
```

**Save the file - all components update instantly!**

---

## Helper Functions

### getThemeClass() - For component variants
```tsx
import { getThemeClass } from '../hooks/useTheme';

<button className={getThemeClass('button', 'primary')}>
  Click Me
</button>

// Supported types:
// 'button' with variants: 'primary', 'secondary', 'danger', 'success'
// 'card' with variants: 'default', 'dark'
// 'input' with variants: 'default', 'dark'
// 'navbar' with variants: 'default'
// 'text' with variants: 'primary', 'secondary', 'light'
```

### useTheme() - For programmatic access
```tsx
import { useTheme } from '../hooks/useTheme';

const { colors, spacing, borderRadius, brand } = useTheme();

// Use in styles
<div style={{ backgroundColor: colors.primary[600], padding: spacing.lg }}>
  Content
</div>
```

### getColor() - For direct color access
```tsx
import { getColor } from '../config/theme';

const primaryColor = getColor('colors.primary.600');
const navbarBg = getColor('brand.navbar.background');
```

---

## Common Patterns

### Full-width button
```tsx
<button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg">
  Full Width
</button>
```

### Outlined button
```tsx
<button className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-2 px-4 rounded-lg">
  Outlined
</button>
```

### Disabled button
```tsx
<button disabled className="bg-neutral-400 text-white font-semibold py-2 px-4 rounded-lg cursor-not-allowed opacity-50">
  Disabled
</button>
```

### Text link
```tsx
<a href="#" className="text-primary-600 hover:text-primary-700 underline">
  Link
</a>
```

### Badge
```tsx
<span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
  Badge
</span>
```

---

## Navbar Example
```tsx
// Uses theme automatically
<nav className="bg-primary-900 text-neutral-50 shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16 items-center">
      <div className="font-bold text-2xl">Your Logo</div>
      <button className="hover:bg-primary-800 px-4 py-2 rounded">
        Menu
      </button>
    </div>
  </div>
</nav>
```

---

## Extract Text Feature

Located in the app under "Extract Text" card:
1. Upload a PDF file (drag & drop or click)
2. Click "Extract Text" button
3. Copy text or download as .txt file

All styling uses the theme system!

---

## Pro Tips

✅ **Use semantic color names** - primary, secondary, danger, not hex codes  
✅ **Hover states** - bg-primary-600 hover:bg-primary-700  
✅ **Consistency** - Always use theme colors, never hardcode  
✅ **Dark variants** - Use neutral-900 for dark, neutral-50 for light  
✅ **Spacing** - Use p-md, p-lg consistently  
✅ **Rounded corners** - Use rounded-lg as default, rounded-md for inputs  

---

## Where to Find Things

| What | Where |
|------|-------|
| Change colors | `src/config/theme.ts` |
| Access theme | `src/hooks/useTheme.ts` |
| See examples | `src/THEME_USAGE_EXAMPLES.tsx` |
| Full docs | `THEME_DOCUMENTATION.md` |
| Quick guide | `SETUP_GUIDE.md` |
| Help | `IMPLEMENTATION_SUMMARY.md` |

---

**Remember: Edit theme.ts → All components update automatically!**
