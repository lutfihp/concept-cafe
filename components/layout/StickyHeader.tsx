'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang'
import { LangText } from '@/components/ui/LangText'
import { Button } from '@/components/ui/Button'
import { MobileNav } from './MobileNav'

export function StickyHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { lang, setLang } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-cream transition-all duration-200 ${
          scrolled ? 'border-b border-line shadow-sm backdrop-blur-sm' : ''
        }`}
      >
        <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)] h-16 flex items-center justify-between gap-4">
          <a href="/" className="font-display font-extrabold text-xl flex items-center gap-1.5">
            <span className="text-tomato">◓</span>
            Concept<span className="text-tomato">Cafe</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
            {[
              { href: '/',       en: 'Home',    id: 'Beranda' },
              { href: '/menu/',  en: 'Menu',    id: 'Menu' },
              { href: '#about',  en: 'About',   id: 'Tentang' },
              { href: '#gallery',en: 'Gallery', id: 'Galeri' },
              { href: '#visit',  en: 'Visit',   id: 'Kunjungi' },
            ].map((item) => (
              <a key={item.href} href={item.href} className="hover:text-tomato transition-colors">
                <LangText en={item.en} id={item.id} />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5 border border-line rounded-pill p-0.5 font-mono text-xs">
              {(['id', 'en'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-pill transition-colors uppercase ${
                    lang === l ? 'bg-ink text-text-invert' : 'text-text-soft hover:text-ink'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <Button href="#visit" size="sm" className="hidden md:inline-flex">
              <LangText en="Book a table" id="Pesan meja" />
            </Button>

            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span className={`block w-5 h-0.5 bg-ink transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-ink transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-ink transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
