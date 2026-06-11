import { LangText } from '@/components/ui/LangText'
import { Tag } from '@/components/ui/Tag'
import { TAG_META, type MenuCategory, type TagKey } from '@/lib/data/menu'
import { pexels } from '@/lib/utils'

type Props = { category: MenuCategory }

export function FeatureCard({ category }: Props) {
  const feat = category.items.find((i) => i.feat)
  if (!feat) return null

  const primaryTag: TagKey = (feat.tags?.[0] as TagKey) ?? 'best'
  const tagMeta = TAG_META[primaryTag]

  return (
    <article className="sticky top-[150px] rounded-xl overflow-hidden shadow-card self-start">
      <div className="relative">
        <img
          src={pexels(category.feature, 800)}
          alt=""
          loading="lazy"
          className="w-full h-[240px] object-cover"
        />
        <div className="absolute top-3 left-3">
          <Tag variant={tagMeta.variant} en={tagMeta.en} id={tagMeta.id} />
        </div>
      </div>
      <div className="p-5 bg-white">
        <p className="font-mono text-[0.72rem] uppercase tracking-widest text-text-soft mb-1">
          <LangText
            en={`Most loved in ${category.name.en}`}
            id={`Paling disukai di ${category.name.id}`}
          />
        </p>
        <h3 className="font-display font-bold text-xl leading-snug">
          <LangText en={feat.name.en} id={feat.name.id} />
        </h3>
        <p className="text-text-soft text-sm mt-1">
          <LangText en={feat.desc.en} id={feat.desc.id} />
        </p>
        <div className="font-mono font-bold text-tomato text-lg mt-3">Rp {feat.price}</div>
      </div>
    </article>
  )
}
