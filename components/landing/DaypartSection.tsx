import { dayparts } from '@/lib/data/content'
import { LangText } from '@/components/ui/LangText'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { pexels } from '@/lib/utils'

const accentBg = { gold: 'bg-gold', teal: 'bg-teal', tomato: 'bg-tomato' }

export function DaypartSection() {
  return (
    <section className="bg-ink py-[clamp(64px,9vw,120px)]">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] font-bold text-gold">
            <LangText en="From sunrise to last call" id="Dari pagi sampai malam" />
          </p>
          <RevealWrapper>
            <h2 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2rem,4.4vw,3.3rem)] mt-3 text-text-invert">
              <LangText en="One cafe, three moods" id="Satu cafe, tiga suasana" />
            </h2>
          </RevealWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {dayparts.map((d, i) => (
            <RevealWrapper key={i}>
              <article className="bg-ink-2 border border-line-ink rounded-lg overflow-hidden">
                <div className="relative h-[180px] overflow-hidden">
                  <img src={pexels(d.img, 700)} alt="" loading="lazy" className="w-full h-full object-cover opacity-90" />
                  <span className={`absolute top-3 right-3 font-mono font-bold text-ink text-[0.74rem] px-2.5 py-1 rounded-pill ${accentBg[d.accent]}`}>
                    {d.time}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-extrabold text-[1.5rem] text-text-invert">
                    <LangText en={d.name.en} id={d.name.id} />
                  </h3>
                  <p className="text-text-invert-soft mt-1">
                    <LangText en={d.desc.en} id={d.desc.id} />
                  </p>
                </div>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
