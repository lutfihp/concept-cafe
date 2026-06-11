import { reviews } from '@/lib/data/content'
import { LangText } from '@/components/ui/LangText'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { pexels } from '@/lib/utils'

export function ReviewsSection() {
  return (
    <section className="bg-cream-2 py-[clamp(64px,9vw,120px)]">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="text-center mb-11">
          <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] font-bold text-tomato">
            <LangText en="Loved by locals" id="Disukai warga lokal" />
          </p>
          <RevealWrapper>
            <h2 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2rem,4.4vw,3.3rem)] mt-2">
              <LangText en="Don't take our word for it" id="Bukan kami yang bilang" />
            </h2>
          </RevealWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <RevealWrapper key={i}>
              <article className="bg-white rounded-xl p-6 flex flex-col gap-4 shadow-sm">
                <div className="font-mono text-gold text-lg tracking-widest">★★★★★</div>
                <p className="text-[1.05rem] leading-relaxed flex-1 text-text">
                  &ldquo;<LangText en={r.quote.en} id={r.quote.id} />&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <img
                    src={pexels(r.img, 200)}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold">{r.name}</div>
                    <div className="font-mono text-[0.74rem] text-text-soft">
                      <LangText en={r.role.en} id={r.role.id} />
                    </div>
                  </div>
                </div>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
