import type { Metadata } from 'next'
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Space_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/components/ui/LanguageProvider'
import { ConceptRibbon } from '@/components/layout/ConceptRibbon'
import { StickyHeader } from '@/components/layout/StickyHeader'
import { Footer } from '@/components/layout/Footer'

const displayFont = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
})

const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
})

const monoFont = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Concept Cafe — Kopi, Makan, Ngumpul',
  description: 'Cafe lokal yang buka sepanjang hari di Bandung — kopi yang serius, dapur yang nyala dari pagi sampai malam.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body>
        <LanguageProvider>
          <ConceptRibbon />
          <StickyHeader />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
