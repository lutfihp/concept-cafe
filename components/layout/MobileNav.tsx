'use client'

import { useEffect } from 'react'
import { LangText } from '@/components/ui/LangText'
import { Button } from '@/components/ui/Button'

type Props = { isOpen: boolean; onClose: () => void }

export function MobileNav({ isOpen, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-cream pt-[90px] px-6 pb-10 flex flex-col">
      <nav className="flex flex-col gap-1 font-display font-extrabold text-[1.6rem]">
        {[
          { href: '/',       en: 'Home',    id: 'Beranda' },
          { href: '/menu/',  en: 'Menu',    id: 'Menu' },
          { href: '#about',  en: 'About',   id: 'Tentang' },
          { href: '#gallery',en: 'Gallery', id: 'Galeri' },
          { href: '#visit',  en: 'Visit',   id: 'Kunjungi' },
        ].map((item) => (
          <a key={item.href} href={item.href} onClick={onClose} className="py-2 border-b border-line">
            <LangText en={item.en} id={item.id} />
          </a>
        ))}
      </nav>
      <Button href="#visit" variant="primary" className="mt-6 self-start" onClick={onClose}>
        <LangText en="Book a table" id="Pesan meja" />
      </Button>
    </div>
  )
}
