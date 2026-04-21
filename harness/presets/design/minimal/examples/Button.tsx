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
 * minimal 프리셋 Button.
 * - 라운드 var(--radius-md) = 4px (단단한 느낌)
 * - 그림자 없음, 1px 보더 기반 강조
 * - primary = accent 배경 / secondary = surface / ghost = 투명
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
 *   font-weight: 500;
 *   border-radius: var(--radius-md);
 *   border: 1px solid var(--color-border);
 *   transition: background-color var(--duration-base) var(--easing-standard);
 * }
 * .primary   { background: var(--color-accent); color: var(--color-accent-text); border-color: var(--color-accent); }
 * .secondary { background: var(--color-surface); color: var(--color-text); }
 * .ghost     { background: transparent; border-color: transparent; }
 * .sm { height: 32px; padding: 0 12px; font-size: var(--text-sm); }
 * .md { height: 40px; padding: 0 16px; font-size: var(--text-base); }
 * .lg { height: 48px; padding: 0 24px; font-size: var(--text-lg); }
 */
