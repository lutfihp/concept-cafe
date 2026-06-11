# Concept Cafe — Website Design Spec

**Date:** 2026-05-31
**Stack:** Next.js 14 App Router · Tailwind CSS · Static export (`output: 'export'`) · Embla Carousel · Client-side i18n (localStorage)
**Source:** Design handoff at `handoffs/design_handoff/`

---

## Overview

A bilingual (Indonesian / English) bold-and-playful all-day cafe website built as a portfolio piece. Two pages: **Landing** and **Menu**. The design prototype (static HTML/CSS/JS) is already complete and fully specced — this document records the decisions made to translate it into a production-quality Next.js + Tailwind codebase.

---

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| i18n | Client-side toggle (localStorage, no locale routing) | Matches prototype; simpler static deploy; no SEO requirement for this portfolio piece |
| Gallery carousel | Embla Carousel | Handoff explicitly suggests it; handles drag/swipe/autoplay out of the box |
| Deployment | Static export (`next export`) | Pure HTML/CSS/JS output; hostable on GitHub Pages, Netlify, Cloudflare Pages |
| Architecture | Structured RSC + feature folders (Approach B) | Idiomatic Next.js App Router; RSC for static sections; `'use client'` only where needed |

---

## Architecture

### RSC vs Client boundary

**Server Components (no JS shipped):**
- `app/layout.tsx` — ConceptRibbon + StickyHeader shell + Footer + LanguageProvider wrapper
- `app/page.tsx` — Landing page (imports all landing section RSCs)
- `app/menu/page.tsx` — Menu page
- All landing section components: HeroSection, MarqueeBar, FeaturedGrid, AboutSection, DaypartSection, ReviewsSection, VisitSection, NewsletterCTA
- Layout: ConceptRibbon, Footer
- Menu: MenuHero, MenuCategoryList (static shell)

**Client Components (`'use client'`):**
- `components/ui/LanguageProvider.tsx` — React context, localStorage read/write
- `components/ui/LangText.tsx` — consumes LangContext, renders correct string
- `components/layout/StickyHeader.tsx` — scroll listener, lang toggle buttons, burger
- `components/layout/MobileNav.tsx` — full-screen overlay, body scroll lock
- `components/landing/GalleryCarousel.tsx` — Embla, autoplay, dots, keyboard
- `components/menu/MenuFilterBar.tsx` — active chip state, filters sections
- `components/menu/MenuCategorySection.tsx` — receives visibility from filter

### File tree

```
concept-cafe/
  app/
    layout.tsx          ← ConceptRibbon + StickyHeader + LanguageProvider + Footer
    page.tsx            ← Landing page (RSC)
    globals.css         ← Tailwind directives + CSS custom properties from design system
    menu/
      page.tsx          ← Menu page (RSC)
  components/
    ui/
      LanguageProvider.tsx
      LangText.tsx
      Button.tsx
      Tag.tsx
    layout/
      ConceptRibbon.tsx
      StickyHeader.tsx
      MobileNav.tsx
      Footer.tsx
    landing/
      HeroSection.tsx
      MarqueeBar.tsx
      FeaturedGrid.tsx
      AboutSection.tsx
      DaypartSection.tsx
      GalleryCarousel.tsx
      ReviewsSection.tsx
      VisitSection.tsx
      NewsletterCTA.tsx
    menu/
      MenuHero.tsx
      MenuContent.tsx         ← client boundary wrapper; owns activeKey state
      MenuFilterBar.tsx
      MenuCategorySection.tsx
      FeatureCard.tsx
      PriceRow.tsx
  lib/
    data/
      content.ts        ← featured[], dayparts[], gallery[], reviews[] (lifted from content.js)
      menu.ts           ← MenuCategory[] with items (lifted from menu.js)
    lang.ts             ← Bi type, useLang hook, LangContext
  tailwind.config.ts
  next.config.ts
```

---

## Component Inventory

### UI Primitives — `components/ui/`

| Component | Type | Key props | Notes |
|---|---|---|---|
| `LanguageProvider` | Client | `children` | Context: `{ lang: 'id'|'en', toggle: () => void }`. Reads localStorage `cc-lang` on mount, default `'id'`. |
| `LangText` | Client | `en: string, id: string, as?: keyof JSX.IntrinsicElements` | Consumes LangContext, renders correct string. Default tag `<span>`. |
| `Button` | RSC-safe | `variant, size?, href?, children` | Variants: `primary | ink | ghost | gold`. Renders `<a>` if `href`, else `<button>`. |
| `Tag` | RSC-safe | `variant, en, id` | Variants: `tomato | teal | gold`. Wraps `LangText` internally. |

### Layout — `components/layout/`

| Component | Type | Notes |
|---|---|---|
| `ConceptRibbon` | RSC | Static top banner. Bilingual: "CONCEPT — demo site" / "KONSEP — situs demo". |
| `StickyHeader` | Client | `useScrollY` → border + backdrop after 8px scroll. Logo, nav links, ID/EN toggle, CTA, MobileNav burger. |
| `MobileNav` | Client | Full-screen overlay (≤860px). Controlled by StickyHeader `open` state. Body scroll locked via `useEffect`. |
| `Footer` | RSC | Dark ink band. Four columns: brand + tagline, Explore links, Visit info, concept note. Social links (Ig/Tt/Wa). Dynamic year. |

### Landing — `components/landing/`

| Component | Type | Data source | Notes |
|---|---|---|---|
| `HeroSection` | RSC | Hardcoded strings | Two-column collage. Gold/teal blobs, rotating image cards, sticker ("Buka jam 7"), floating badge (Andalan). LangText throughout. |
| `MarqueeBar` | RSC | `content.ts → marqueeItems[]` | CSS animation only (`animate-marquee`). Items duplicated ×2 for seamless loop. No JS. |
| `FeaturedGrid` | RSC | `content.ts → featured[]` | 3-col card grid (6 items). Hover zoom via CSS `group-hover`. Each card: image, tag, name, desc, price. |
| `AboutSection` | RSC | Hardcoded | Cream-2 bg. Two-column: rotated image + sticker / copy + 3 stats (120+ seats, 16h, 60+ menu). |
| `DaypartSection` | RSC | `content.ts → dayparts[]` | Dark ink bg. 3-col grid: image + time badge (colour per daypart) + name/desc. |
| `GalleryCarousel` | Client | `content.ts → gallery[]` | Embla: autoplay 4500ms, pause-on-hover, drag/swipe, prev/next, dot indicators, keyboard ←/→. 7 slides. |
| `ReviewsSection` | RSC | `content.ts → reviews[]` | Cream-2 bg. 3-col card grid: ★★★★★, quote, avatar + name/role. |
| `VisitSection` | RSC | Hardcoded address/hours | Two-column: info + CSS map placeholder. Hours table, WhatsApp + Maps CTA. |
| `NewsletterCTA` | RSC | — | Gold bg band. Headline + email input form. Form submit is static (no backend). |

### Menu — `components/menu/`

| Component | Type | Data source | Notes |
|---|---|---|---|
| `MenuHero` | RSC | Hardcoded | Simple hero: eyebrow + headline. |
| `MenuContent` | Client | `menu.ts` | **Client boundary wrapper.** Owns `activeKey` state. Renders `MenuFilterBar` + all `MenuCategorySection` components. This is what `app/menu/page.tsx` (RSC) renders below the hero. |
| `MenuFilterBar` | Client | `menu.ts → category keys` | Sticky chip bar. "All" + one chip per category (7 chips). Receives `activeKey` + `setActiveKey` from `MenuContent`. Smooth-scrolls to `#menu-root`. |
| `MenuCategorySection` | Client | `MenuCategory` | Receives `visible: boolean` from `MenuContent`. Two-column: FeatureCard (sticky) + PriceRow list. |
| `FeatureCard` | RSC-safe | `MenuCategory.feature` + feat item | Sticky (`sticky top-[150px]`). Category hero image, tag badge, name, desc, price. |
| `PriceRow` | RSC-safe | `MenuItem` | Name · dotted leader · price. Desc + tag chips below. |

---

## Data Model

### `lib/data/content.ts`

```ts
type Bi = { en: string; id: string }

type FeaturedItem = {
  img: number           // Pexels photo ID
  tag: Bi
  tagVariant: 'tomato' | 'teal' | 'gold'
  name: Bi
  desc: Bi
  price: string
}

type DaypartItem = {
  img: number
  time: string
  name: Bi
  desc: Bi
  accent: 'gold' | 'teal' | 'tomato'
}

type GallerySlide = { img: number; caption: Bi }

type Review = {
  img: number
  name: string
  role: Bi
  quote: Bi
}

export const marqueeItems: string[]
export const featured: FeaturedItem[]
export const dayparts: DaypartItem[]
export const gallery: GallerySlide[]
export const reviews: Review[]
```

### `lib/data/menu.ts`

```ts
type TagKey = 'best' | 'new' | 'spicy' | 'veg' | 'sweet'

type MenuItem = {
  name: Bi
  desc: Bi
  price: string
  tags?: TagKey[]
  feat?: true
}

type MenuCategory = {
  key: string
  name: Bi
  note: Bi
  feature: number       // Pexels photo ID for category hero card
  items: MenuItem[]
}

export const menu: MenuCategory[]
// 6 categories: coffee, noncoffee, breakfast, mains, snacks, sweets
```

---

## i18n Pattern

```tsx
// lib/lang.ts
type Lang = 'id' | 'en'
const LangContext = createContext<{ lang: Lang; toggle: () => void }>(...)

// components/ui/LanguageProvider.tsx — 'use client'
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState<Lang>('id')
  useEffect(() => { setLang(localStorage.getItem('cc-lang') as Lang ?? 'id') }, [])
  const toggle = (l: Lang) => { setLang(l); localStorage.setItem('cc-lang', l) }
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>
}

// Usage anywhere:
<LangText en="See the menu" id="Lihat menu" />
```

Default locale is Indonesian (`'id'`). Persists to `localStorage` key `cc-lang`.

---

## Interactions

| # | Interaction | Implementation |
|---|---|---|
| 1 | **Language toggle** | ID/EN buttons in StickyHeader call `toggle()` from LangContext. LangText re-renders. localStorage persisted via useEffect. |
| 2 | **Sticky header** | `useEffect` + scroll listener in StickyHeader. `scrolled` state after 8px → Tailwind conditional classes add border + `backdrop-blur`. |
| 3 | **Mobile nav** | Burger toggles `open` state → MobileNav full-screen overlay. Body scroll locked via `useEffect`. Closes on nav link click. |
| 4 | **Gallery carousel** | `useEmblaCarousel` + AutoPlay plugin (4500ms, pause-on-hover) + WheelGestures. Prev/next callbacks + dot indicators from Embla API. Keyboard ←/→ via `onKeyDown`. |
| 5 | **Menu filter** | MenuFilterBar `activeKey` state passed to each MenuCategorySection as `visible: boolean`. Hidden via CSS (`hidden`), not unmounted. Smooth-scrolls to `#menu-root`. |
| 6 | **Reveal on scroll** | Custom `useReveal(ref)` hook wrapping IntersectionObserver (threshold 0.14). CSS: `translate-y-4 opacity-0` → `translate-y-0 opacity-100`. Purely decorative. |

---

## Tailwind Config

```ts
// tailwind.config.ts
theme: { extend: {
  colors: {
    cream: { DEFAULT: '#FBF4E9', 2: '#F5E7D2', 3: '#EFD9BC' },
    ink:   { DEFAULT: '#1E1A15', 2: '#2B251E', soft: '#4A4036' },
    tomato: { DEFAULT: '#E8552D', deep: '#C8401D' },
    gold: '#F4B33D', teal: '#1F9E86', berry: '#D14B7A',
    text: { DEFAULT: '#221E18', soft: '#6B6053', invert: '#F4EADB', 'invert-soft': '#B8AC99' },
    line: { DEFAULT: '#E4D3B8', ink: '#3A332A' },
  },
  fontFamily: {
    display: ['var(--font-display)'],
    body:    ['var(--font-body)'],
    mono:    ['var(--font-mono)'],
  },
  borderRadius: { sm: '10px', md: '16px', lg: '26px', xl: '40px', pill: '999px' },
  keyframes: {
    marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } }
  },
  animation: { marquee: 'marquee 26s linear infinite' },
}}
```

---

## next.config.ts

```ts
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },  // Pexels CDN images, no next/image optimisation needed
  trailingSlash: true,            // /menu/ works on any static host
}
```

---

## Dependencies

Beyond `create-next-app` defaults (Next.js, React, Tailwind, TypeScript):

```
embla-carousel-react
embla-carousel-autoplay
embla-carousel-wheel-gestures
```

No other runtime dependencies.

---

## Build & Deploy

```bash
npm run dev    # local dev
npm run build  # outputs static site to /out
# Deploy: drag /out to Netlify / Cloudflare Pages / GitHub Pages
```

---

## Images

All photography from Pexels (free, commercial-ok). 15 unique photos. Hot-linked via CDN for the prototype — same URLs used in the Next.js build (`images: { unoptimized: true }`).

URL pattern: `https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w={width}`

For production: replace with real cafe photography run through `next/image`.

---

## Out of Scope

- Backend / API routes (static export, no server)
- CMS integration (data lives in `lib/data/` TypeScript files)
- Locale routing (`/id/...`, `/en/...`) — client-side toggle only
- Real reservation / newsletter form submission
- `next/image` optimisation (Pexels CDN, `unoptimized: true`)
