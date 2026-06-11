import { LangText } from '@/components/ui/LangText'
import { Button } from '@/components/ui/Button'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

export function VisitSection() {
  return (
    <section className="py-[clamp(64px,9vw,120px)]" id="visit">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)] grid md:grid-cols-[1fr_1.05fr] gap-[clamp(28px,5vw,60px)] items-center">
        <div>
          <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] font-bold text-tomato">
            <LangText en="Come hang out" id="Mampir yuk" />
          </p>
          <RevealWrapper>
            <h2 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2rem,4.4vw,3.3rem)] mt-3 mb-6">
              <LangText en="Find us & say hi" id="Datang & sapa kami" />
            </h2>
          </RevealWrapper>

          <div className="space-y-5 mb-7">
            {[
              {
                icon: '📍',
                label: { en: 'Address', id: 'Alamat' },
                content: <span className="text-text-soft">Jl. Melati No. 7, Dago, Bandung 40135</span>,
              },
              {
                icon: '🕗',
                label: { en: 'Hours', id: 'Jam buka' },
                content: (
                  <table className="font-mono text-sm text-text-soft w-full max-w-[300px] mt-1">
                    <tbody>
                      <tr>
                        <td><LangText en="Mon – Fri" id="Sen – Jum" /></td>
                        <td className="text-right">07.00 – 23.00</td>
                      </tr>
                      <tr>
                        <td><LangText en="Sat – Sun" id="Sab – Min" /></td>
                        <td className="text-right">07.00 – 24.00</td>
                      </tr>
                    </tbody>
                  </table>
                ),
              },
              {
                icon: '📞',
                label: { en: 'Reservations', id: 'Reservasi' },
                content: <span className="text-text-soft">+62 812-3456-7890 · WhatsApp</span>,
              },
            ].map((row, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="w-11 h-11 rounded-md bg-cream-2 flex items-center justify-center text-xl flex-shrink-0">{row.icon}</span>
                <div>
                  <div className="font-bold"><LangText en={row.label.en} id={row.label.id} /></div>
                  {row.content}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button href="#">
              <LangText en="Reserve on WhatsApp" id="Reservasi via WhatsApp" />
            </Button>
            <Button href="#" variant="ghost">
              <LangText en="Open in Maps" id="Buka di Maps" />
            </Button>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden border border-line shadow-card h-[clamp(320px,40vw,440px)] bg-cream-3">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg,transparent 0 58px,rgba(255,255,255,.5) 58px 64px),repeating-linear-gradient(0deg,transparent 0 58px,rgba(255,255,255,.5) 58px 64px)',
            }}
          />
          <div className="absolute -left-[5%] top-[30%] w-[130%] h-[26px] bg-white opacity-85 -rotate-12" />
          <div className="absolute -left-[5%] top-[62%] w-[130%] h-[34px] bg-cream rotate-6" />
          <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-full">
            <div className="w-10 h-10 bg-tomato rounded-[50%_50%_50%_0] -rotate-45 shadow-card flex items-center justify-center">
              <span className="rotate-45 text-white font-extrabold">◓</span>
            </div>
          </div>
          <div className="absolute left-4 bottom-4 bg-white rounded-md p-3 shadow-card">
            <div className="font-mono text-[0.7rem] text-text-soft">CONCEPT CAFE</div>
            <div className="font-bold text-sm">Dago, Bandung</div>
          </div>
        </div>
      </div>
    </section>
  )
}
