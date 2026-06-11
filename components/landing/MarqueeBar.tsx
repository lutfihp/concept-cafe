import { marqueeItems } from '@/lib/data/content'

export function MarqueeBar() {
  const items = [...marqueeItems, ...marqueeItems]
  return (
    <div className="overflow-hidden bg-gold border-y-2 border-ink py-3" aria-hidden="true">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-3 font-mono font-bold text-ink text-sm px-5">
            <span className="text-ink opacity-40">◆</span>
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
