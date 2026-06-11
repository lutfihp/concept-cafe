'use client'

import { useRef, useState } from 'react'
import { menu } from '@/lib/data/menu'
import { MenuFilterBar } from './MenuFilterBar'
import { MenuCategorySection } from './MenuCategorySection'

export function MenuContent() {
  const [activeKey, setActiveKey] = useState('all')
  const listRef = useRef<HTMLDivElement>(null)

  function handleSelect(key: string) {
    setActiveKey(key)
    if (listRef.current) {
      const top = listRef.current.getBoundingClientRect().top + window.scrollY - 130
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <MenuFilterBar categories={menu} activeKey={activeKey} onSelect={handleSelect} />
      <div
        id="menu-root"
        ref={listRef}
        className="max-w-site mx-auto px-[clamp(20px,5vw,64px)] py-16 flex flex-col gap-20"
      >
        {menu.map((cat) => (
          <MenuCategorySection
            key={cat.key}
            category={cat}
            visible={activeKey === 'all' || activeKey === cat.key}
          />
        ))}
      </div>
    </>
  )
}
