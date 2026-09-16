import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonTone = 'default' | 'onDark';

export type ButtonProps = {
  children: ReactNode;

  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: ButtonTone;

  to?: string;

  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  className?: string;

  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];

  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const defaultVariantStyles: Record<ButtonVariant, string> = {
  primary: `
    border
    border-[var(--color-primary)]
    bg-[var(--color-primary)]
    text-[#07110d]

    shadow-[0_10px_30px_rgba(34,204,86,0.16)]

    hover:border-[var(--color-primary-hover)]
    hover:bg-[var(--color-primary-hover)]
    hover:shadow-[0_14px_38px_rgba(34,204,86,0.22)]
  `,

  secondary: `
    border
    border-[var(--color-border)]
    bg-[var(--color-card)]
    text-[var(--color-text-primary)]

    hover:border-[var(--color-border-strong)]
    hover:bg-[var(--color-card-hover)]
  `,

  outline: `
    border
    border-[rgba(34,204,86,0.32)]
    bg-[rgba(34,204,86,0.03)]
    text-[var(--color-text-primary)]

    hover:border-[var(--color-primary)]
    hover:bg-[rgba(34,204,86,0.09)]
  `,

  ghost: `
    border
    border-transparent
    bg-transparent
    text-[var(--color-text-secondary)]

    hover:bg-[var(--color-card)]
    hover:text-[var(--color-text-primary)]
  `,
};

const onDarkVariantStyles: Record<ButtonVariant, string> = {
  primary: `
    border
    border-[var(--color-primary)]
    bg-[var(--color-primary)]
    text-[#07110d]

    shadow-[0_10px_30px_rgba(34,204,86,0.16)]

    hover:border-[var(--color-primary-hover)]
    hover:bg-[var(--color-primary-hover)]
    hover:shadow-[0_14px_38px_rgba(34,204,86,0.22)]
  `,

  secondary: `
    border
    border-white/10
    bg-white/[0.07]
    text-white
    backdrop-blur-md

    hover:border-white/20
    hover:bg-white/[0.11]
  `,

  outline: `
    border
    border-[rgba(34,204,86,0.38)]
    bg-[rgba(34,204,86,0.04)]
    text-white

    hover:border-[var(--color-primary)]
    hover:bg-[rgba(34,204,86,0.10)]
  `,

  ghost: `
    border
    border-transparent
    bg-transparent
    text-white/80

    hover:bg-white/[0.06]
    hover:text-white
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: `
    min-h-9
    rounded-full
    px-4
    text-[13px]
  `,

  md: `
    min-h-11
    rounded-full
    px-5
    text-[14px]
  `,

  lg: `
    min-h-[52px]
    rounded-[16px]
    px-7
    text-[15px]
  `,
};

export const Button = ({
  children,

  variant = 'primary',
  size = 'md',
  tone = 'default',

  to,

  fullWidth = false,
  loading = false,
  disabled = false,

  leftIcon,
  rightIcon,

  type = 'button',
  onClick,

  className = '',
}: ButtonProps) => {
  const variantStyles =
    tone === 'onDark'
      ? onDarkVariantStyles[variant]
      : defaultVariantStyles[variant];

  const classes = `
    relative
    inline-flex
    shrink-0
    items-center
    justify-center
    gap-2

    font-semibold
    leading-none

    transition-all
    duration-200

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[var(--color-primary)]
    focus-visible:ring-offset-2

    active:scale-[0.98]

    ${variantStyles}
    ${sizeStyles[size]}

    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'pointer-events-none opacity-50' : ''}

    ${className}
  `;

  const content = (
    <>
      {loading ? (
        <LoaderCircle size={18} aria-hidden="true" className="animate-spin" />
      ) : (
        leftIcon
      )}

      <span>{children}</span>

      {!loading && rightIcon}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
    >
      {content}
    </button>
  );
};
