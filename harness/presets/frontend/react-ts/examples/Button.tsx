import { type ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, disabled, children, className, ...rest }, ref) => {
    const classes = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ');

    return (
      <button ref={ref} className={classes} disabled={disabled || isLoading} aria-busy={isLoading} {...rest}>
        {isLoading ? <span className={styles.spinner} aria-hidden="true" /> : null}
        <span className={isLoading ? styles.contentLoading : undefined}>{children}</span>
      </button>
    );
  },
);

Button.displayName = 'Button';
