import type { Metadata } from 'next'
import { MenuHero }    from '@/components/menu/MenuHero'
import { MenuContent } from '@/components/menu/MenuContent'

export const metadata: Metadata = {
  title: 'Menu — Concept Cafe',
  description: 'Lihat menu lengkap Concept Cafe — kopi, non-kopi, sarapan, makanan berat, camilan, dan manis.',
}

export default function MenuPage() {
  return (
    <>
      <MenuHero />
      <MenuContent />
    </>
  )
}
