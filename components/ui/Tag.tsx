import { cn } from '@/lib/utils'
import { LangText } from './LangText'

const variantClasses = {
  tomato: 'bg-tomato text-white',
  teal:   'bg-teal text-white',
  gold:   'bg-gold text-ink',
}

type TagProps = {
  variant: keyof typeof variantClasses
  en: string
  id: string
  className?: string
}

export function Tag({ variant, en, id, className }: TagProps) {
  return (
    <LangText
      en={en}
      id={id}
      className={cn(
        'inline-block font-mono text-xs uppercase tracking-[0.18em] font-bold px-2 py-1 rounded-pill',
        variantClasses[variant],
        className,
      )}
    />
  )
}
