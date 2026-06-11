import { LangText } from '@/components/ui/LangText'
import { Tag } from '@/components/ui/Tag'
import { TAG_META, type MenuItem } from '@/lib/data/menu'

export function PriceRow({ item }: { item: MenuItem }) {
  return (
    <div className="py-4 border-b border-line last:border-0">
      <div className="flex items-baseline gap-2">
        <span className="font-display font-bold text-[1.05rem]">
          <LangText en={item.name.en} id={item.name.id} />
        </span>
        <span className="flex-1 border-b border-dashed border-line mx-1 relative top-[-3px]" />
        <span className="font-mono font-bold text-tomato whitespace-nowrap">Rp {item.price}</span>
      </div>
      <p className="text-text-soft text-sm mt-0.5">
        <LangText en={item.desc.en} id={item.desc.id} />
      </p>
      {item.tags && item.tags.length > 0 && (
        <div className="flex gap-1.5 flex-wrap mt-2">
          {item.tags.map((key) => {
            const m = TAG_META[key]
            return <Tag key={key} variant={m.variant} en={m.en} id={m.id} />
          })}
        </div>
      )}
    </div>
  )
}
