import { LangText } from '@/components/ui/LangText'
import { Button } from '@/components/ui/Button'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-text-invert pt-16 pb-10">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <a href="/" className="font-display font-extrabold text-xl flex items-center gap-1.5">
              <span className="text-gold">◓</span>
              Concept<span className="text-gold">Cafe</span>
            </a>
            <p className="text-text-invert-soft mt-3 text-sm max-w-[34ch]">
              <LangText
                en="An all-day neighborhood cafe. Coffee, kitchen, and good company in Dago, Bandung."
                id="Cafe lokal yang buka sepanjang hari. Kopi, dapur, dan teman ngobrol di Dago, Bandung."
              />
            </p>
            <div className="flex gap-2 mt-4">
              {[['Ig', 'Instagram'], ['Tt', 'TikTok'], ['Wa', 'WhatsApp']].map(([label, aria]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={aria}
                  className="w-10 h-10 rounded-md bg-ink-2 border border-line-ink flex items-center justify-center font-mono text-xs text-text-invert-soft hover:bg-tomato hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">
              <LangText en="Explore" id="Jelajah" />
            </h4>
            <ul className="space-y-2 text-text-invert-soft text-sm">
              {[
                { href: '/',       en: 'Home',    id: 'Beranda' },
                { href: '/menu/',  en: 'Menu',    id: 'Menu' },
                { href: '#about',  en: 'About',   id: 'Tentang' },
                { href: '#gallery',en: 'Gallery', id: 'Galeri' },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-text-invert transition-colors">
                    <LangText en={item.en} id={item.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">
              <LangText en="Visit" id="Kunjungi" />
            </h4>
            <ul className="space-y-1 text-text-invert-soft text-sm">
              <li>Jl. Melati No. 7</li>
              <li>Dago, Bandung</li>
              <li className="font-mono text-[0.85rem]">07.00 – 23.00</li>
              <li>+62 812-3456-7890</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">
              <LangText en="The concept" id="Soal konsep" />
            </h4>
            <p className="text-text-invert-soft text-sm">
              <LangText
                en="This is a demo site — a portfolio sample, not a real cafe."
                id="Ini situs demo — contoh portfolio, bukan cafe asli."
              />
            </p>
            <Button href="/menu/" variant="gold" size="sm" className="mt-4">
              <LangText en="View menu" id="Lihat menu" />
            </Button>
          </div>
        </div>

        <div className="border-t border-line-ink pt-5 flex flex-wrap justify-between gap-3 text-text-invert-soft text-sm">
          <span>
            © {year} Concept Cafe{' '}
            <LangText en="(demo). Design concept by Your Studio." id="(demo). Konsep desain oleh Studio Anda." />
          </span>
          <span className="font-mono text-xs">Bandung · Indonesia</span>
        </div>
      </div>
    </footer>
  )
}
