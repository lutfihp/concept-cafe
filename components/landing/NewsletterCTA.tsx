'use client'

import { LangText } from '@/components/ui/LangText'
import { Button } from '@/components/ui/Button'

export function NewsletterCTA() {
  return (
    <section className="py-[clamp(44px,6vw,72px)]">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="bg-gold border-[3px] border-ink rounded-xl p-[clamp(28px,5vw,52px)] grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center shadow-pop">
          <div>
            <h2 className="font-display font-extrabold leading-none tracking-tight text-[clamp(1.7rem,3.6vw,2.6rem)] text-ink">
              <LangText en="Get a free coffee on us" id="Dapat kopi gratis dari kami" />
            </h2>
            <p className="text-ink-2 mt-2 font-medium">
              <LangText
                en="Join the Concept Club — first brew is free, plus early access to new menu drops."
                id="Gabung Concept Club — kopi pertama gratis, plus akses duluan ke menu baru."
              />
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 flex-wrap">
            <input
              type="email"
              placeholder="email@kamu.com"
              className="flex-1 min-w-[180px] px-5 py-[0.95em] rounded-pill border-2 border-ink font-body text-base bg-white focus:outline-none focus:ring-2 focus:ring-ink"
            />
            <Button type="submit" variant="ink">
              <LangText en="Join" id="Gabung" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
