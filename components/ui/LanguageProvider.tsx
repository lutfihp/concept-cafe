'use client'

import { useEffect, useState } from 'react'
import { LangContext, LANG_KEY, DEFAULT_LANG, type Lang } from '@/lib/lang'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG)

  useEffect(() => {
    const stored = localStorage.getItem(LANG_KEY) as Lang | null
    if (stored === 'en' || stored === 'id') setLangState(stored)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem(LANG_KEY, l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}
