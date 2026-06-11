import { LangText } from '@/components/ui/LangText'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { pexels } from '@/lib/utils'

export function AboutSection() {
  return (
    <section className="bg-cream-2 py-[clamp(64px,9vw,120px)] relative overflow-hidden" id="about">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)] grid md:grid-cols-2 gap-[clamp(28px,5vw,70px)] items-center">
        <div className="relative order-first">
          <div className="-rotate-2 rounded-xl overflow-hidden shadow-card">
            <img
              src={pexels(5379707, 900)}
              alt="Bright cafe interior with plants"
              loading="lazy"
              className="w-full h-[clamp(320px,42vw,480px)] object-cover"
            />
          </div>
          <div className="absolute -bottom-4 right-[8%] bg-tomato text-white font-mono font-bold text-sm px-3 py-1 rounded-pill border-2 border-ink rotate-6 shadow-pop">
            <LangText en="Since 2021" id="Sejak 2021" />
          </div>
        </div>

        <div>
          <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] font-bold text-tomato">
            <LangText en="Our story" id="Cerita kami" />
          </p>
          <RevealWrapper>
            <h2 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2rem,4.4vw,3.3rem)] mt-3 mb-5">
              <LangText en="Your second living room" id="Ruang tamu kedua kamu" />
            </h2>
          </RevealWrapper>
          <p className="text-text-soft text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed">
            <LangText
              en="We started Concept Cafe with one idea: a place that fits your whole day. Quiet enough for the morning laptop grind, lively enough for dinner with friends, and friendly enough that the staff knows your order."
              id="Concept Cafe lahir dari satu ide sederhana: tempat yang pas buat seharian penuh. Tenang buat kerja pagi, rame buat makan malam bareng teman, dan ramah sampai baristanya hafal pesanan kamu."
            />
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { num: '120+', label: { en: 'seats',      id: 'kursi' },    color: 'text-tomato' },
              { num: '16h',  label: { en: 'open daily', id: 'buka/hari' }, color: 'text-teal' },
              { num: '60+',  label: { en: 'menu items', id: 'menu' },     color: 'text-gold' },
            ].map((stat) => (
              <div key={stat.num}>
                <div className={`font-display font-extrabold text-[2.2rem] ${stat.color}`}>{stat.num}</div>
                <div className="font-mono text-[0.78rem] text-text-soft">
                  <LangText en={stat.label.en} id={stat.label.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
