import { cn } from '@/lib/utils'

const variantClasses = {
  primary: 'bg-tomato text-white shadow-sm hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-8px_#E8552D]',
  ink:     'bg-ink text-text-invert hover:-translate-y-0.5',
  ghost:   'border-2 border-ink text-ink hover:bg-ink hover:text-text-invert',
  gold:    'bg-gold text-ink border-2 border-ink hover:-translate-y-0.5',
}

const sizeClasses = {
  default: 'px-6 py-[0.95em] text-base',
  sm:      'px-4 py-2 text-sm',
}

type ButtonProps = {
  variant?: keyof typeof variantClasses
  size?: keyof typeof sizeClasses
  href?: string
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

export function Button({
  variant = 'primary',
  size = 'default',
  href,
  children,
  className,
  type = 'button',
  onClick,
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center gap-[0.55em] font-bold leading-none rounded-pill transition-all duration-150 whitespace-nowrap',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  if (href) {
    return <a href={href} className={base}>{children}</a>
  }

  return (
    <button type={type} className={base} onClick={onClick}>
      {children}
    </button>
  )
}
