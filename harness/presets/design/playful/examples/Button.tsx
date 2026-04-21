import { type ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'highlight';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

/**
 * playful 프리셋 Button.
 * - 라운드 var(--radius-full) = pill shape
 * - 그림자 var(--shadow-sm)로 살짝 떠 있는 느낌
 * - variant: primary(pink) / secondary(violet surface) / ghost / highlight(yellow)
 * - hover 시 scale(1.03) 미세 애니메이션
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
 *   font-weight: 700;
 *   border-radius: var(--radius-full);
 *   box-shadow: var(--shadow-sm);
 *   transition: transform var(--duration-fast) var(--easing-spring),
 *               box-shadow var(--duration-base) var(--easing-spring);
 * }
 * .button:hover:not(:disabled) { transform: scale(1.03); box-shadow: var(--shadow-md); }
 *
 * .primary   { background: var(--color-accent); color: var(--color-accent-text); }
 * .secondary { background: var(--color-accent-alt); color: var(--color-accent-text); }
 * .ghost     { background: transparent; color: var(--color-accent); box-shadow: none; }
 * .highlight { background: var(--color-highlight); color: var(--color-text); }
 *
 * .sm { height: 36px; padding: 0 16px; font-size: var(--text-sm); }
 * .md { height: 44px; padding: 0 22px; font-size: var(--text-base); }
 * .lg { height: 52px; padding: 0 28px; font-size: var(--text-lg); }
 */
