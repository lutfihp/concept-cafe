import { createContext, useContext } from 'react'

export type Lang = 'id' | 'en'

export const LANG_KEY = 'cc-lang'
export const DEFAULT_LANG: Lang = 'id'

export type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
}

export const LangContext = createContext<LangContextValue>({
  lang: DEFAULT_LANG,
  setLang: () => {},
})

export function useLang(): LangContextValue {
  return useContext(LangContext)
}
