/**
 * THEME SYSTEM - USAGE EXAMPLES
 * 
 * This file shows practical examples of how to use the centralized theme
 * system throughout your application.
 */

import React from 'react';
import { useTheme, getThemeClass } from './hooks/useTheme';
import { getColor } from './config/theme';

// ============================================
// EXAMPLE 1: Using Tailwind Classes
// ============================================
export function ExampleBasicButton() {
  return (
    <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
      Primary Button
    </button>
  );
}

// ============================================
// EXAMPLE 2: Using getThemeClass Helper
// ============================================
export function ExampleButtonVariants() {
  return (
    <div className="flex gap-4">
      <button className={`${getThemeClass('button', 'primary')} py-2 px-4 rounded-lg`}>
        Primary
      </button>
      <button className={`${getThemeClass('button', 'secondary')} py-2 px-4 rounded-lg`}>
        Secondary
      </button>
      <button className={`${getThemeClass('button', 'danger')} py-2 px-4 rounded-lg`}>
        Danger
      </button>
      <button className={`${getThemeClass('button', 'success')} py-2 px-4 rounded-lg`}>
        Success
      </button>
    </div>
  );
}

// ============================================
// EXAMPLE 3: Using useTheme Hook
// ============================================
export function ExampleUseThemeHook() {
  const { colors, spacing } = useTheme();

  return (
    <div 
      style={{
        padding: `${spacing.lg}`,
        backgroundColor: colors.neutral[50],
        borderRadius: '0.5rem',
      }}
    >
      <h2 style={{ color: colors.primary[900], marginBottom: spacing.md }}>
        Welcome
      </h2>
      <p style={{ color: colors.neutral[600], lineHeight: '1.5' }}>
        This component uses the useTheme hook to access theme values programmatically.
      </p>
    </div>
  );
}

// ============================================
// EXAMPLE 4: Using getColor Helper
// ============================================
export function ExampleGetColor() {
  const primaryBrand = getColor('colors.primary.600');

  return (
    <div>
      <div style={{ backgroundColor: primaryBrand, padding: '1rem', color: 'white' }}>
        Primary Brand Color
      </div>
      <div style={{ backgroundColor: getColor('colors.success.500'), padding: '1rem', color: 'white' }}>
        Success Color
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 5: Reusable Component with Theme
// ============================================
interface CardProps {
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'dark';
}

export function ExampleCard({ title, children, variant = 'default' }: CardProps) {
  const cardClass = getThemeClass('card', variant);

  return (
    <div className={cardClass}>
      <h3 className="text-primary-900 font-semibold text-lg mb-4">
        {title}
      </h3>
      <div className="text-neutral-600">
        {children}
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 6: Form Component with Theme
// ============================================
interface FormInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function ExampleFormInput({ label, placeholder, value, onChange }: FormInputProps) {
  const inputClass = getThemeClass('input', 'default');

  return (
    <div className="mb-4">
      <label className="block text-neutral-700 font-semibold mb-2">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

// ============================================
// EXAMPLE 7: Alert Component with States
// ============================================
interface AlertProps {
  type: 'success' | 'danger' | 'warning' | 'info';
  message: string;
}

export function ExampleAlert({ type, message }: AlertProps) {
  const alertStyles = {
    success: 'bg-success-100 border border-success-400 text-success-700',
    danger: 'bg-danger-100 border border-danger-400 text-danger-700',
    warning: 'bg-warning-100 border border-warning-400 text-warning-700',
    info: 'bg-primary-100 border border-primary-400 text-primary-700',
  };

  return (
    <div className={`${alertStyles[type]} px-4 py-3 rounded-lg mb-4`}>
      {message}
    </div>
  );
}

// ============================================
// EXAMPLE 8: Complex Component with Multiple Theme Values
// ============================================
export function ExampleComplexComponent() {
  return (
    <div className="bg-neutral-50 rounded-lg shadow-lg overflow-hidden">
      {/* Header with primary brand color */}
      <div className="bg-primary-900 text-white px-6 py-4">
        <h1 className="text-2xl font-bold">Complex Component</h1>
      </div>

      {/* Content with spacing from theme */}
      <div className="p-6 space-y-4">
        <p className="text-neutral-600">
          This component demonstrates using multiple theme values together.
        </p>

        {/* Button group with proper spacing */}
        <div className="flex gap-3 flex-wrap">
          <button className={getThemeClass('button', 'primary')}>
            Save
          </button>
          <button className={getThemeClass('button', 'secondary')}>
            Cancel
          </button>
          <button className={getThemeClass('button', 'danger')}>
            Delete
          </button>
        </div>
      </div>

      {/* Footer with secondary color */}
      <div className="bg-neutral-100 border-t border-neutral-200 px-6 py-3">
        <p className="text-neutral-500 text-sm">
          Footer content
        </p>
      </div>
    </div>
  );
}

// ============================================
// EXPORT SUMMARY
// ============================================
/**
 * USAGE SUMMARY:
 * 
 * 1. For most cases: Use Tailwind class names directly
 *    className="bg-primary-600 text-white"
 * 
 * 2. For component variants: Use getThemeClass()
 *    className={getThemeClass('button', 'primary')}
 * 
 * 3. For programmatic access: Use useTheme()
 *    const { colors, spacing } = useTheme()
 * 
 * 4. For dynamic styles: Use getColor()
 *    style={{ backgroundColor: getColor('colors.primary.600') }}
 * 
 * All changes in src/config/theme.ts automatically
 * update all components using the theme system!
 */
