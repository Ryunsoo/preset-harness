'use client';

import { type ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-slate-900 text-white hover:bg-slate-800',
  secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
  ghost: 'bg-transparent text-slate-900 hover:bg-slate-100',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4',
  lg: 'h-12 px-6 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, disabled, className = '', children, ...rest }, ref) => {
    const classes = [
      'inline-flex items-center justify-center rounded-md font-medium transition disabled:opacity-50',
      variantClasses[variant],
      sizeClasses[size],
      className,
    ].join(' ');

    return (
      <button ref={ref} className={classes} disabled={disabled || isLoading} aria-busy={isLoading} {...rest}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
