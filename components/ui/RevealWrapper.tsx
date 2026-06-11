'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export function RevealWrapper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.14 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className,
      )}
    >
      {children}
    </div>
  )
}
