'use client'

import { LangText } from '@/components/ui/LangText'
import type { MenuCategory } from '@/lib/data/menu'

type Props = {
  categories: MenuCategory[]
  activeKey: string
  onSelect: (key: string) => void
}

export function MenuFilterBar({ categories, activeKey, onSelect }: Props) {
  return (
    <div className="sticky top-16 z-30 bg-cream/95 backdrop-blur-sm border-b border-line py-3">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)] flex gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onSelect('all')}
          className={`flex-shrink-0 font-mono text-xs uppercase tracking-[0.1em] font-bold px-4 py-2 rounded-pill border-2 transition-colors ${
            activeKey === 'all'
              ? 'bg-ink text-text-invert border-ink'
              : 'border-line text-text-soft hover:border-ink hover:text-ink'
          }`}
        >
          <LangText en="All" id="Semua" />
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onSelect(cat.key)}
            className={`flex-shrink-0 font-mono text-xs uppercase tracking-[0.1em] font-bold px-4 py-2 rounded-pill border-2 transition-colors ${
              activeKey === cat.key
                ? 'bg-ink text-text-invert border-ink'
                : 'border-line text-text-soft hover:border-ink hover:text-ink'
            }`}
          >
            <LangText en={cat.name.en} id={cat.name.id} />
          </button>
        ))}
      </div>
    </div>
  )
}
