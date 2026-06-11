'use client'

import { useLang } from '@/lib/lang'
import type { Bi } from '@/lib/data/content'

type Props = Bi & {
  as?: keyof React.JSX.IntrinsicElements
  className?: string
}

export function LangText({ en, id, as: Tag = 'span', className }: Props) {
  const { lang } = useLang()
  return <Tag className={className}>{lang === 'en' ? en : id}</Tag>
}
