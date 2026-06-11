import { featured } from '@/lib/data/content'
import { LangText } from '@/components/ui/LangText'
import { Tag } from '@/components/ui/Tag'
import { Button } from '@/components/ui/Button'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { pexels } from '@/lib/utils'

export function FeaturedGrid() {
  return (
    <section className="py-[clamp(64px,9vw,120px)]" id="featured">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="flex items-end justify-between gap-5 flex-wrap mb-10">
          <div>
            <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] font-bold text-tomato">
              <LangText en="Crowd favorites" id="Paling dicari" />
            </p>
            <RevealWrapper>
              <h2 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2rem,4.4vw,3.3rem)] mt-2">
                <LangText en="Menu everyone orders" id="Menu andalan kami" />
              </h2>
            </RevealWrapper>
          </div>
          <Button href="/menu/" variant="ghost" size="sm">
            <LangText en="Full menu →" id="Menu lengkap →" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {featured.map((item, i) => (
            <RevealWrapper key={i}>
              <article className="bg-white border border-line rounded-lg overflow-hidden shadow-sm group">
                <div className="relative overflow-hidden">
                  <img
                    src={pexels(item.img, 700)}
                    alt=""
                    loading="lazy"
                    className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Tag variant={item.tagVariant} en={item.tag.en} id={item.tag.id} />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="font-display font-bold text-[1.1rem] leading-snug">
                      <LangText en={item.name.en} id={item.name.id} />
                    </h3>
                    <span className="font-mono font-bold text-tomato whitespace-nowrap">Rp {item.price}</span>
                  </div>
                  <p className="text-text-soft text-sm mt-2">
                    <LangText en={item.desc.en} id={item.desc.id} />
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
