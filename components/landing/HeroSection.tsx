import { LangText } from '@/components/ui/LangText'
import { Button } from '@/components/ui/Button'
import { pexels } from '@/lib/utils'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-[clamp(40px,6vw,72px)] pb-[clamp(64px,9vw,120px)]">
      <div className="absolute w-[340px] h-[340px] rounded-full bg-gold opacity-40 -top-20 right-[6%] blur-3xl pointer-events-none" />
      <div className="absolute w-[220px] h-[220px] rounded-full bg-teal opacity-20 -bottom-16 -left-10 blur-2xl pointer-events-none" />

      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)] relative grid md:grid-cols-[1.05fr_0.95fr] gap-[clamp(28px,5vw,64px)] items-center">
        <div>
          <div className="flex gap-2 flex-wrap mb-5">
            <span className="bg-tomato text-white font-mono text-xs uppercase tracking-[0.18em] font-bold px-3 py-1 rounded-pill">
              <LangText en="● All-day cafe" id="● Cafe sepanjang hari" />
            </span>
            <span className="bg-teal text-white font-mono text-xs uppercase tracking-[0.18em] font-bold px-3 py-1 rounded-pill">
              <LangText en="Coffee + Kitchen" id="Kopi + Dapur" />
            </span>
          </div>

          <h1 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2.7rem,6.5vw,5rem)]">
            <LangText en="Coffee, food," id="Kopi, makan," /><br />
            <span className="text-tomato"><LangText en="good times." id="ngumpul." /></span>
          </h1>

          <p className="mt-5 text-text-soft text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed max-w-[46ch]">
            <LangText
              en="An all-day neighborhood cafe in Bandung — proper coffee, a kitchen that runs from sunrise to last call, and a corner table with your name on it."
              id="Cafe lokal yang buka sepanjang hari di Bandung — kopi yang serius, dapur yang nyala dari pagi sampai malam, dan satu meja pojok yang selalu nungguin kamu."
            />
          </p>

          <div className="flex gap-3 flex-wrap mt-7">
            <Button href="/menu/">
              <LangText en="See the menu" id="Lihat menu" />
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Button>
            <Button href="#visit" variant="ghost">
              <LangText en="Find us" id="Cari lokasi" />
            </Button>
          </div>

          <div className="flex items-center gap-5 mt-8 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="font-mono text-gold text-lg tracking-widest">★★★★★</span>
              <strong className="font-bold">4.8</strong>
              <span className="text-text-soft text-sm">
                <LangText en="· 2.1k Google reviews" id="· 2.1k ulasan Google" />
              </span>
            </div>
            <div className="w-px h-6 bg-line" />
            <span className="font-mono text-sm text-ink-soft">
              <LangText en="Open daily · 07:00–23:00" id="Buka tiap hari · 07.00–23.00" />
            </span>
          </div>
        </div>

        <div className="relative min-h-[460px]">
          <div className="absolute inset-0 rounded-xl overflow-hidden shadow-card rotate-2">
            <img src={pexels(302899, 900)} alt="Barista pouring latte art" className="w-full h-full object-cover" />
          </div>
          <div className="absolute w-[46%] -left-[7%] bottom-[6%] rounded-lg shadow-card -rotate-6 overflow-hidden">
            <img src={pexels(539432, 500)} alt="Iced coffee" className="w-full h-[150px] object-cover" />
          </div>
          <div className="absolute -top-3 -left-[4%] bg-gold text-ink font-mono font-bold text-sm px-3 py-1 rounded-pill border-2 border-ink -rotate-9 shadow-pop">
            <LangText en="Open 7AM" id="Buka jam 7" />
          </div>
          <div className="absolute -right-[6%] top-[14%] bg-white rounded-md p-3 shadow-card rotate-5 flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-teal flex items-center justify-center text-white font-display font-extrabold">★</span>
            <div className="leading-tight">
              <div className="font-display font-extrabold text-[1.05rem]">
                <LangText en="Signature" id="Andalan" />
              </div>
              <div className="font-mono text-[0.72rem] text-text-soft">Es Kopi Gula Aren</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
