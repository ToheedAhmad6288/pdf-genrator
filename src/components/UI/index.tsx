import React from 'react';

/* ========== REUSABLE UI COMPONENTS ========== */

// Container Component
export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  maxWidth = '7xl',
}) => {
  const maxWidthMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '7xl': 'max-w-7xl',
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthMap[maxWidth]} ${className}`}>
      {children}
    </div>
  );
};

// Section Component
export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id }) => (
  <section id={id} className={`py-8 sm:py-12 md:py-16 lg:py-20 ${className}`}>
    <Container>{children}</Container>
  </section>
);

// Card Component
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  glow = false,
}) => (
  <div
    className={`
      bg-white rounded-xl border border-neutral-200 p-6
      ${hover ? 'card-shadow hover:border-primary-300' : 'card-shadow'}
      ${glow ? 'glow-effect' : ''}
      ${className}
    `}
  >
    {children}
  </div>
);

// Badge Component
export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const variantMap = {
    primary: 'bg-primary-100 text-primary-700 border border-primary-300',
    secondary: 'bg-secondary-100 text-secondary-700 border border-secondary-300',
    danger: 'bg-danger-100 text-danger-700 border border-danger-300',
    success: 'bg-success-100 text-success-700 border border-success-300',
    warning: 'bg-warning-100 text-warning-700 border border-warning-300',
  };

  const sizeMap = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-semibold
        ${variantMap[variant]} ${sizeMap[size]} ${className}
      `}
    >
      {children}
    </span>
  );
};

// Button Component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  className = '',
  ...props
}) => {
  const variantMap = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white shadow-md hover:shadow-lg',
    danger: 'bg-danger-600 hover:bg-danger-700 text-white shadow-md hover:shadow-lg',
    success: 'bg-success-600 hover:bg-success-700 text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
  };

  const sizeMap = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2.5 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        flex items-center justify-center gap-2 font-semibold
        transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed
        ${variantMap[variant]} ${sizeMap[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{loading ? 'Loading...' : children}</span>
    </button>
  );
};

// Input Component
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-semibold text-neutral-700 mb-2">
        {label}
      </label>
    )}
    <input
      {...props}
      className={`
        w-full px-4 py-2.5 rounded-lg border-2 border-neutral-300
        bg-neutral-50 text-neutral-900 placeholder-neutral-500
        focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200
        transition-all duration-300
        ${error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-200' : ''}
        ${className}
      `}
    />
    {helperText && !error && (
      <p className="text-xs text-neutral-600 mt-1">{helperText}</p>
    )}
    {error && <p className="text-xs text-danger-600 mt-1">{error}</p>}
  </div>
);

// Alert Component
export interface AlertProps {
  children: React.ReactNode;
  variant?: 'success' | 'danger' | 'warning' | 'info';
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  icon,
  closable = false,
  onClose,
  className = '',
}) => {
  const variantMap = {
    success: 'bg-success-50 border-success-200 text-success-700',
    danger: 'bg-danger-50 border-danger-200 text-danger-700',
    warning: 'bg-warning-50 border-warning-200 text-warning-700',
    info: 'bg-primary-50 border-primary-200 text-primary-700',
  };

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border
        ${variantMap[variant]} ${className}
      `}
    >
      {icon && <span className="flex-shrink-0 mt-0.5">{icon}</span>}
      <div className="flex-1">{children}</div>
      {closable && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-lg hover:opacity-70"
        >
          ✕
        </button>
      )}
    </div>
  );
};

// Heading Component
export interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  gradient?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 1,
  className = '',
  gradient = false,
}) => {
  const headingMap = {
    1: 'text-4xl sm:text-5xl lg:text-6xl',
    2: 'text-3xl sm:text-4xl lg:text-5xl',
    3: 'text-2xl sm:text-3xl lg:text-4xl',
    4: 'text-xl sm:text-2xl lg:text-3xl',
    5: 'text-lg sm:text-xl lg:text-2xl',
    6: 'text-base sm:text-lg lg:text-xl',
  };

  const Tag = `h${level}` as const;

  return (
    <Tag
      className={`
        font-bold tracking-tight font-serif
        ${gradient ? 'bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent' : 'text-neutral-900'}
        ${headingMap[level]}
        ${className}
      `}
    >
      {children}
    </Tag>
  );
};

// Text Component
export interface TextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'neutral' | 'muted';
  weight?: 'light' | 'normal' | 'semibold' | 'bold';
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  size = 'base',
  color = 'neutral',
  weight = 'normal',
  className = '',
}) => {
  const sizeMap = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const colorMap = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    neutral: 'text-neutral-900',
    muted: 'text-neutral-600',
  };

  const weightMap = {
    light: 'font-light',
    normal: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <p
      className={`
        ${sizeMap[size]} ${colorMap[color]} ${weightMap[weight]} ${className}
      `}
    >
      {children}
    </p>
  );
};

// Grid Component
export interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 2,
  gap = 'md',
  className = '',
}) => {
  const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  };

  const gapMap = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div className={`grid ${colsMap[cols]} ${gapMap[gap]} ${className}`}>
      {children}
    </div>
  );
};

// Divider Component
export interface DividerProps {
  className?: string;
  variant?: 'solid' | 'dashed' | 'dotted';
}

export const Divider: React.FC<DividerProps> = ({
  className = '',
  variant = 'solid',
}) => {
  const variantMap = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  return (
    <div
      className={`border-t border-neutral-200 ${variantMap[variant]} ${className}`}
    />
  );
};

export default {
  Container,
  Section,
  Card,
  Badge,
  Button,
  Input,
  Alert,
  Heading,
  Text,
  Grid,
  Divider,
};
