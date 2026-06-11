import { LangText } from '@/components/ui/LangText'

export function MenuHero() {
  return (
    <section className="bg-cream-2 py-16 border-b border-line">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)]">
        <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] font-bold text-tomato">
          <LangText en="What we serve" id="Yang kami sajikan" />
        </p>
        <h1 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2.7rem,6.5vw,5rem)] mt-3">
          <LangText en="The Menu" id="Menu Kami" />
        </h1>
        <p className="text-text-soft text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed mt-4 max-w-[50ch]">
          <LangText
            en="Coffee, all-day kitchen, snacks, and sweets. Something for every hour."
            id="Kopi, dapur sepanjang hari, camilan, dan manis-manisan. Ada buat setiap jam."
          />
        </p>
      </div>
    </section>
  )
}
