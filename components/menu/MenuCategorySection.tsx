'use client'

import { LangText } from '@/components/ui/LangText'
import { FeatureCard } from './FeatureCard'
import { PriceRow } from './PriceRow'
import type { MenuCategory } from '@/lib/data/menu'

type Props = { category: MenuCategory; visible: boolean }

export function MenuCategorySection({ category, visible }: Props) {
  const nonFeatItems = category.items.filter((i) => !i.feat)

  return (
    <section
      data-cat={category.key}
      className={visible ? '' : 'hidden'}
    >
      <div className="mb-6">
        <h2 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2rem,4.4vw,3.3rem)]">
          <LangText en={category.name.en} id={category.name.id} />
        </h2>
        <p className="text-text-soft mt-1">
          <LangText en={category.note.en} id={category.note.id} />
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 items-start">
        <FeatureCard category={category} />
        <div>
          {nonFeatItems.map((item, i) => (
            <PriceRow key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
