'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { useCallback, useEffect, useState } from 'react'
import { gallery } from '@/lib/data/content'
import { LangText } from '@/components/ui/LangText'
import { pexels } from '@/lib/utils'

export function GalleryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4500, stopOnMouseEnter: true, stopOnInteraction: false }),
    WheelGesturesPlugin(),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  return (
    <section className="py-[clamp(64px,9vw,120px)]" id="gallery">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="flex items-end justify-between gap-5 flex-wrap mb-9">
          <div>
            <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] font-bold text-tomato">
              <LangText en="Take a look around" id="Intip suasananya" />
            </p>
            <h2 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2rem,4.4vw,3.3rem)] mt-2">
              <LangText en="The vibe, in pictures" id="Suasananya, lewat foto" />
            </h2>
          </div>
          <span className="font-mono text-text-soft text-sm">
            <LangText en="← swipe / drag →" id="← geser / swipe →" />
          </span>
        </div>

        <div
          className="relative"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') scrollPrev()
            if (e.key === 'ArrowRight') scrollNext()
          }}
          tabIndex={0}
        >
          <div className="overflow-hidden rounded-lg" ref={emblaRef}>
            <div className="flex">
              {gallery.map((slide, i) => (
                <div key={i} className="relative flex-[0_0_100%] min-w-0">
                  <img
                    src={pexels(slide.img, 1200)}
                    alt=""
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="w-full h-[clamp(260px,50vw,560px)] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-white font-mono text-sm font-bold">
                      <LangText en={slide.caption.en} id={slide.caption.id} />
                    </span>
                    <span className="text-white/70 font-mono text-xs">
                      {i + 1} / {gallery.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {(['prev', 'next'] as const).map((dir) => (
            <button
              key={dir}
              aria-label={dir === 'prev' ? 'Previous' : 'Next'}
              onClick={dir === 'prev' ? scrollPrev : scrollNext}
              className={`absolute top-1/2 -translate-y-1/2 ${dir === 'prev' ? 'left-3' : 'right-3'} w-10 h-10 rounded-full bg-white/90 shadow-card flex items-center justify-center hover:bg-white transition-colors`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                <path d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
              </svg>
            </button>
          ))}

          <div className="flex justify-center gap-2 mt-4">
            {gallery.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === selectedIndex ? 'bg-tomato w-5' : 'bg-line'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
