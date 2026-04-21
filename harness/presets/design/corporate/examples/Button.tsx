import { type ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

/**
 * corporate 프리셋 Button.
 * - 라운드 var(--radius-sm) = 4px
 * - 그림자 var(--shadow-sm)로 경계 강조
 * - primary = navy(#1e3a8a) / secondary = surface + 보더 / ghost = 투명
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, disabled, children, className, ...rest }, ref) => {
    const classes = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ');
    return (
      <button ref={ref} className={classes} disabled={disabled || isLoading} aria-busy={isLoading} {...rest}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

/*
 * 동반 Button.module.css 스케치:
 *
 * .button {
 *   font-family: var(--font-sans);
 *   font-weight: 600;
 *   border-radius: var(--radius-sm);
 *   box-shadow: var(--shadow-sm);
 *   transition: background-color var(--duration-base) var(--easing-standard);
 * }
 * .primary   { background: var(--color-accent); color: var(--color-accent-text); }
 * .primary:hover { background: var(--color-accent-alt); }
 * .secondary { background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); }
 * .ghost     { background: transparent; color: var(--color-accent); box-shadow: none; }
 * .sm { height: 32px; padding: 0 12px; font-size: var(--text-sm); }
 * .md { height: 40px; padding: 0 18px; font-size: var(--text-base); }
 * .lg { height: 48px; padding: 0 24px; font-size: var(--text-lg); }
 */
