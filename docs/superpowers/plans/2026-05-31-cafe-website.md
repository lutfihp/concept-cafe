# Concept Cafe Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Translate the Concept Cafe design prototype (static HTML/CSS/JS) into a production-quality Next.js 14 App Router + Tailwind CSS website with two pages (Landing + Menu), client-side bilingual toggle (ID/EN), and Embla Carousel gallery, deployable as a static export.

**Architecture:** RSC for all static content sections; `'use client'` only for StickyHeader, MobileNav, LanguageProvider, LangText, GalleryCarousel, and MenuContent/MenuFilterBar/MenuCategorySection. Language state lives in React context backed by `localStorage` key `cc-lang`. Menu filter state lives in a `MenuContent` client boundary that owns `activeKey` and renders both the chip bar and category sections.

**Tech Stack:** Next.js 14 App Router · Tailwind CSS v3 · TypeScript · Embla Carousel (`embla-carousel-react` + `embla-carousel-autoplay` + `embla-carousel-wheel-gestures`) · `next/font/google` · `output: 'export'` (static)

---

## File Map

```
app/
  layout.tsx            ← root layout: fonts, LanguageProvider, ConceptRibbon, StickyHeader, Footer
  page.tsx              ← landing page (RSC)
  globals.css           ← Tailwind directives + base styles
  menu/
    page.tsx            ← menu page (RSC)

components/
  ui/
    LanguageProvider.tsx  ← 'use client' context + localStorage
    LangText.tsx          ← 'use client' renders en|id string
    RevealWrapper.tsx     ← 'use client' IntersectionObserver fade-in wrapper
    Button.tsx            ← RSC-safe, href→<a> else <button>
    Tag.tsx               ← RSC-safe, wraps LangText
  layout/
    ConceptRibbon.tsx     ← RSC top banner
    StickyHeader.tsx      ← 'use client' scroll state + lang toggle + burger
    MobileNav.tsx         ← 'use client' full-screen overlay nav
    Footer.tsx            ← RSC dark ink footer
  landing/
    HeroSection.tsx       ← RSC two-column collage
    MarqueeBar.tsx        ← RSC CSS-only marquee
    FeaturedGrid.tsx      ← RSC 3-col featured cards
    AboutSection.tsx      ← RSC cream-2 about + stats
    DaypartSection.tsx    ← RSC dark ink daypart grid
    GalleryCarousel.tsx   ← 'use client' Embla carousel
    ReviewsSection.tsx    ← RSC review cards
    VisitSection.tsx      ← RSC address + map placeholder
    NewsletterCTA.tsx     ← RSC gold CTA band
  menu/
    MenuHero.tsx          ← RSC menu page hero
    MenuContent.tsx       ← 'use client' owns activeKey state
    MenuFilterBar.tsx     ← 'use client' sticky chip bar
    MenuCategorySection.tsx ← 'use client' receives visible prop
    FeatureCard.tsx       ← RSC-safe sticky feature card
    PriceRow.tsx          ← RSC-safe menu row

lib/
  data/
    content.ts            ← Bi type + featured/dayparts/gallery/reviews/marqueeItems arrays
    menu.ts               ← TagKey/MenuItem/MenuCategory types + menu array
  lang.ts                 ← Lang type, LangContext, useLang hook
  utils.ts                ← pexels(id, w) URL helper + cn() classname merge

tailwind.config.ts        ← design tokens: colors, fonts, radii, shadows, marquee keyframe
next.config.ts            ← output:'export', images:{unoptimized:true}, trailingSlash:true
```

---

## Task 1: Project scaffolding

**Files:**
- Create: full Next.js project in current directory
- Modify: `next.config.ts`, `tailwind.config.ts`, `app/globals.css`

- [ ] **Step 1: Scaffold Next.js app into current directory**

Run inside `d:\Codading Repo\concept-cafe`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```
Accept prompts (or `--yes` flag handles them). This creates `app/`, `components/`, `public/`, `package.json`, `tailwind.config.ts`, `postcss.config.mjs`, `tsconfig.json`.

- [ ] **Step 2: Install Embla Carousel packages**

```bash
npm install embla-carousel-react embla-carousel-autoplay embla-carousel-wheel-gestures
```
Expected: three packages added to `node_modules`, no peer-dep errors.

- [ ] **Step 3: Replace `next.config.ts`**

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
}

export default nextConfig
```

- [ ] **Step 4: Replace `tailwind.config.ts` with full design token config**

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '560px',
      md: '860px',
      lg: '1024px',
      xl: '1240px',
    },
    extend: {
      colors: {
        cream: { DEFAULT: '#FBF4E9', 2: '#F5E7D2', 3: '#EFD9BC' },
        ink: { DEFAULT: '#1E1A15', 2: '#2B251E', soft: '#4A4036' },
        tomato: { DEFAULT: '#E8552D', deep: '#C8401D' },
        gold: '#F4B33D',
        teal: '#1F9E86',
        berry: '#D14B7A',
        text: {
          DEFAULT: '#221E18',
          soft: '#6B6053',
          invert: '#F4EADB',
          'invert-soft': '#B8AC99',
        },
        line: { DEFAULT: '#E4D3B8', ink: '#3A332A' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '26px',
        xl: '40px',
        pill: '999px',
      },
      boxShadow: {
        sm: '0 2px 0 rgba(30,26,21,.10)',
        card: '0 18px 40px -22px rgba(30,26,21,.45)',
        pop: '6px 6px 0 #1E1A15',
      },
      maxWidth: {
        site: '1240px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 26s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 5: Replace `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: var(--font-body, system-ui, sans-serif);
    color: #221E18;
    background: #FBF4E9;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }

  img {
    display: block;
    max-width: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font: inherit;
    color: inherit;
    cursor: pointer;
    border: 0;
    background: none;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  :focus-visible {
    outline: 3px solid #E8552D;
    outline-offset: 3px;
    border-radius: 6px;
  }
}
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```
Expected: server starts at `http://localhost:3000`, default Next.js page renders with cream background.

- [ ] **Step 7: Commit**

```bash
git init
git add next.config.ts tailwind.config.ts app/globals.css package.json package-lock.json tsconfig.json postcss.config.mjs .gitignore .eslintrc.json
git commit -m "chore: scaffold Next.js + Tailwind, add Embla, configure design tokens"
```

---

## Task 2: Data layer

**Files:**
- Create: `lib/utils.ts`
- Create: `lib/lang.ts`
- Create: `lib/data/content.ts`
- Create: `lib/data/menu.ts`

- [ ] **Step 1: Create `lib/utils.ts`**

```ts
// lib/utils.ts
export function pexels(id: number, w = 800): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
```

- [ ] **Step 2: Create `lib/lang.ts`**

```ts
// lib/lang.ts
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
```

- [ ] **Step 3: Create `lib/data/content.ts`**

```ts
// lib/data/content.ts
export type Bi = { en: string; id: string }

export type FeaturedItem = {
  img: number
  tag: Bi
  tagVariant: 'tomato' | 'teal' | 'gold'
  name: Bi
  desc: Bi
  price: string
}

export type DaypartItem = {
  img: number
  time: string
  name: Bi
  desc: Bi
  accent: 'gold' | 'teal' | 'tomato'
}

export type GallerySlide = { img: number; caption: Bi }

export type Review = { img: number; name: string; role: Bi; quote: Bi }

export const marqueeItems: string[] = [
  'Kopi fresh tiap hari', 'Wifi kenceng', 'Live music Jum–Sab',
  '100% Halal', 'Pet friendly', 'Colokan di tiap meja',
  'Buka sampai tengah malam', 'Ada rooftop',
]

export const featured: FeaturedItem[] = [
  { img: 851555,  tag: { en: 'Signature', id: 'Andalan' },     tagVariant: 'tomato', name: { en: 'Palm Sugar Iced Latte',  id: 'Es Kopi Susu Gula Aren' }, desc: { en: 'Espresso, fresh milk & house palm-sugar syrup.',     id: 'Espresso, susu segar & sirup gula aren rumahan.' },   price: '28K' },
  { img: 312418,  tag: { en: 'Hot',       id: 'Panas' },       tagVariant: 'gold',   name: { en: 'Cappuccino',            id: 'Cappuccino' },              desc: { en: 'Double shot with silky steamed milk.',              id: 'Double shot dengan steamed milk lembut.' },           price: '30K' },
  { img: 6802983, tag: { en: 'Non-coffee',id: 'Tanpa kopi' },  tagVariant: 'teal',   name: { en: 'Matcha Latte',          id: 'Matcha Latte' },            desc: { en: 'Ceremonial-grade matcha, hot or iced.',             id: 'Matcha grade upacara, panas atau dingin.' },           price: '33K' },
  { img: 3171134, tag: { en: 'Kitchen',   id: 'Dapur' },       tagVariant: 'tomato', name: { en: 'Concept Fried Rice',    id: 'Nasi Goreng Konsep' },      desc: { en: 'Smoky fried rice, fried egg & house sambal.',       id: 'Nasi goreng smoky, telur ceplok & sambal rumahan.' }, price: '38K' },
  { img: 1267320, tag: { en: 'Mains',     id: 'Makanan' },     tagVariant: 'gold',   name: { en: 'Chicken Katsu Curry',   id: 'Kari Katsu Ayam' },         desc: { en: 'Crispy katsu over Japanese curry & rice.',          id: 'Katsu renyah dengan kari Jepang & nasi.' },           price: '45K' },
  { img: 2074130, tag: { en: 'Bakery',    id: 'Roti' },        tagVariant: 'teal',   name: { en: 'Butter Croissant',      id: 'Croissant Mentega' },       desc: { en: 'Baked fresh every morning. Flaky, buttery.',        id: 'Dipanggang fresh tiap pagi. Renyah, gurih.' },        price: '26K' },
]

export const dayparts: DaypartItem[] = [
  { img: 2074130, time: '07.00 – 11.00', name: { en: 'Morning',   id: 'Pagi' },  desc: { en: 'Breakfast & your first brew', id: 'Sarapan & kopi pertama' },      accent: 'gold' },
  { img: 5379707, time: '11.00 – 17.00', name: { en: 'Afternoon', id: 'Siang' }, desc: { en: 'Lunch & laptop hours',        id: 'Makan siang & jam kerja' },      accent: 'teal' },
  { img: 1058277, time: '17.00 – 23.00', name: { en: 'Evening',   id: 'Malam' }, desc: { en: 'Dinner & live music',         id: 'Makan malam & live music' },     accent: 'tomato' },
]

export const gallery: GallerySlide[] = [
  { img: 1307698, caption: { en: 'Main hall',      id: 'Ruang utama' } },
  { img: 5379707, caption: { en: 'The green corner',id: 'Pojok hijau' } },
  { img: 2074130, caption: { en: 'Breakfast table', id: 'Meja sarapan' } },
  { img: 851555,  caption: { en: 'The coffee bar',  id: 'Bar kopi' } },
  { img: 1058277, caption: { en: 'Weekend nights',  id: 'Malam minggu' } },
  { img: 1153369, caption: { en: 'Fresh plates',    id: 'Menu sehat' } },
  { img: 6802983, caption: { en: 'A cozy nook',     id: 'Sudut santai' } },
]

export const reviews: Review[] = [
  { img: 887827,  name: 'Dinda P.',       role: { en: 'Regular', id: 'Pelanggan tetap' },   quote: { en: 'My favorite work spot. Killer coffee and seriously fast wifi — I get more done here than at the office.',              id: 'Tempat favorit buat kerja. Kopinya juara, wifinya kenceng banget — malah lebih produktif di sini daripada di kantor.' } },
  { img: 7438099, name: 'Rangga S.',      role: { en: 'Foodie', id: 'Pencinta kuliner' },   quote: { en: 'The fried rice is addictive and the price is still easy on the wallet. My go-to dinner now.',                         id: 'Nasi gorengnya bikin nagih dan harganya masih masuk akal buat kantong. Sekarang langganan makan malam.' } },
  { img: 6802983, name: 'Aisyah & Tomi', role: { en: 'Family', id: 'Keluarga' },           quote: { en: 'Perfect for families. The kids are happy, the staff are lovely, and there is something for everyone.',                 id: 'Cocok banget buat keluarga. Anak-anak betah, stafnya ramah, dan menunya lengkap buat semua.' } },
]
```

- [ ] **Step 4: Create `lib/data/menu.ts`**

```ts
// lib/data/menu.ts
import type { Bi } from './content'

export type TagKey = 'best' | 'new' | 'spicy' | 'veg' | 'sweet'

export const TAG_META: Record<TagKey, Bi & { variant: 'tomato' | 'teal' | 'gold' }> = {
  best:  { en: 'Bestseller', id: 'Terlaris',    variant: 'tomato' },
  new:   { en: 'New',        id: 'Baru',         variant: 'teal' },
  spicy: { en: 'Spicy',      id: 'Pedas',        variant: 'tomato' },
  veg:   { en: 'Veg',        id: 'Vegetarian',   variant: 'teal' },
  sweet: { en: 'Sweet',      id: 'Manis',        variant: 'gold' },
}

export type MenuItem = {
  name: Bi
  desc: Bi
  price: string
  tags?: TagKey[]
  feat?: true
}

export type MenuCategory = {
  key: string
  name: Bi
  note: Bi
  feature: number
  items: MenuItem[]
}

export const menu: MenuCategory[] = [
  {
    key: 'coffee', name: { en: 'Coffee', id: 'Kopi' },
    note: { en: 'Single-origin beans, roasted in Bandung.', id: 'Biji single-origin, di-roasting di Bandung.' },
    feature: 851555,
    items: [
      { name: { en: 'Es Kopi Susu Gula Aren', id: 'Es Kopi Susu Gula Aren' }, desc: { en: 'Espresso, fresh milk & house palm-sugar syrup', id: 'Espresso, susu segar & sirup gula aren rumahan' }, price: '28K', tags: ['best'], feat: true },
      { name: { en: 'Cappuccino',    id: 'Cappuccino' },    desc: { en: 'Double shot, silky steamed milk',           id: 'Double shot, steamed milk lembut' },              price: '30K' },
      { name: { en: 'Caffè Latte',   id: 'Caffè Latte' },   desc: { en: 'Smooth, milky, hot or iced',                id: 'Lembut, milky, panas atau dingin' },              price: '30K' },
      { name: { en: 'Americano',     id: 'Americano' },     desc: { en: 'Long black, clean finish',                  id: 'Long black, after-taste bersih' },                price: '25K' },
      { name: { en: 'V60 Single Origin', id: 'V60 Single Origin' }, desc: { en: 'Ask the barista what is brewing today', id: 'Tanya barista lagi seduh apa hari ini' }, price: '35K', tags: ['new'] },
    ],
  },
  {
    key: 'noncoffee', name: { en: 'Non-Coffee', id: 'Tanpa Kopi' },
    note: { en: 'For the no-caffeine crew.', id: 'Buat yang anti kafein.' },
    feature: 6802983,
    items: [
      { name: { en: 'Matcha Latte',       id: 'Matcha Latte' },       desc: { en: 'Ceremonial-grade matcha, hot or iced',    id: 'Matcha grade upacara, panas atau dingin' },  price: '33K', feat: true },
      { name: { en: 'Hot Chocolate',      id: 'Cokelat Panas' },      desc: { en: 'Rich Belgian chocolate',                 id: 'Cokelat Belgia yang pekat' },                price: '30K' },
      { name: { en: 'Teh Tarik',          id: 'Teh Tarik' },          desc: { en: 'Pulled milk tea, frothy & sweet',        id: 'Teh susu tarik, berbusa & manis' },          price: '22K' },
      { name: { en: 'Lychee Iced Tea',    id: 'Es Teh Leci' },        desc: { en: 'Refreshing, fruity, not too sweet',      id: 'Segar, buah, nggak terlalu manis' },         price: '24K' },
      { name: { en: 'Strawberry Smoothie',id: 'Smoothie Stroberi' },  desc: { en: 'Real fruit, blended with yoghurt',       id: 'Buah asli, diblender dengan yoghurt' },      price: '32K' },
    ],
  },
  {
    key: 'breakfast', name: { en: 'Breakfast', id: 'Sarapan' },
    note: { en: 'Served 07.00 – 11.00.', id: 'Tersedia 07.00 – 11.00.' },
    feature: 1153369,
    items: [
      { name: { en: 'Smashed Avocado Toast', id: 'Roti Alpukat' },  desc: { en: 'Sourdough, avocado, poached egg, chili',       id: 'Sourdough, alpukat, telur poached, cabai' }, price: '42K', tags: ['veg'], feat: true },
      { name: { en: 'Big Breakfast Plate',   id: 'Sarapan Komplit' },desc: { en: 'Eggs, sausage, beans, toast, greens',           id: 'Telur, sosis, kacang, roti, sayur' },        price: '55K' },
      { name: { en: 'Nasi Uduk Komplit',     id: 'Nasi Uduk Komplit' },desc: { en: 'Coconut rice, fried chicken, tempe, egg',    id: 'Nasi uduk, ayam goreng, tempe, telur' },     price: '38K' },
      { name: { en: 'Pancake Stack',         id: 'Pancake Stack' },  desc: { en: 'Three fluffy pancakes, maple & butter',        id: 'Tiga pancake tebal, maple & mentega' },      price: '40K', tags: ['sweet'] },
    ],
  },
  {
    key: 'mains', name: { en: 'Mains', id: 'Makanan Berat' },
    note: { en: 'All day, every day.', id: 'Sepanjang hari, tiap hari.' },
    feature: 1267320,
    items: [
      { name: { en: 'Chicken Katsu Curry', id: 'Kari Katsu Ayam' },    desc: { en: 'Crispy katsu over Japanese curry & rice',            id: 'Katsu renyah dengan kari Jepang & nasi' },              price: '45K', feat: true },
      { name: { en: 'Concept Fried Rice',  id: 'Nasi Goreng Konsep' }, desc: { en: 'Smoky fried rice, fried egg & house sambal',         id: 'Nasi goreng smoky, telur ceplok & sambal rumahan' },     price: '38K', tags: ['spicy'] },
      { name: { en: 'Beef Rice Bowl',      id: 'Beef Rice Bowl' },     desc: { en: 'Sliced beef, teriyaki glaze, rice',                  id: 'Irisan daging sapi, saus teriyaki, nasi' },              price: '52K' },
      { name: { en: 'Aglio e Olio',        id: 'Aglio e Olio' },       desc: { en: 'Garlic, chili, olive oil — add chicken +12K',        id: 'Bawang putih, cabai, minyak zaitun — tambah ayam +12K' },price: '44K', tags: ['veg'] },
      { name: { en: 'Mie Goreng Spesial',  id: 'Mie Goreng Spesial' }, desc: { en: 'Wok-fried noodles, egg, greens, kerupuk',            id: 'Mie goreng, telur, sayur, kerupuk' },                    price: '36K', tags: ['spicy'] },
    ],
  },
  {
    key: 'snacks', name: { en: 'Snacks', id: 'Camilan' },
    note: { en: 'Best shared.', id: 'Enak buat sharing.' },
    feature: 461198,
    items: [
      { name: { en: 'Loaded Fries',        id: 'Kentang Goreng Spesial' },desc: { en: 'Cheese sauce, beef, jalapeño',              id: 'Saus keju, daging sapi, jalapeño' },          price: '32K', feat: true },
      { name: { en: 'Chicken Wings (6)',    id: 'Sayap Ayam (6)' },       desc: { en: 'Honey-garlic or spicy buffalo',             id: 'Honey-garlic atau buffalo pedas' },           price: '38K', tags: ['spicy'] },
      { name: { en: 'Pisang Goreng Keju',  id: 'Pisang Goreng Keju' },   desc: { en: 'Fried banana, cheese & condensed milk',    id: 'Pisang goreng, keju & susu kental' },         price: '26K' },
      { name: { en: 'Spring Rolls',        id: 'Lumpia Sayur' },         desc: { en: 'Crispy veggie rolls, sweet chili dip',      id: 'Lumpia sayur renyah, cocolan saus manis' },   price: '28K', tags: ['veg'] },
    ],
  },
  {
    key: 'sweets', name: { en: 'Sweets', id: 'Manis' },
    note: { en: 'Save room for these.', id: 'Sisain tempat buat ini.' },
    feature: 2074130,
    items: [
      { name: { en: 'Butter Croissant',  id: 'Croissant Mentega' }, desc: { en: 'Baked fresh every morning',       id: 'Dipanggang fresh tiap pagi' },               price: '26K', feat: true },
      { name: { en: 'Basque Cheesecake', id: 'Basque Cheesecake' }, desc: { en: 'Burnt-top, creamy centre',         id: 'Permukaan gosong, tengah creamy' },          price: '38K', tags: ['best'] },
      { name: { en: 'Es Cendol',         id: 'Es Cendol' },         desc: { en: 'Pandan jelly, palm sugar, coconut milk', id: 'Cendol pandan, gula aren, santan' },   price: '24K' },
      { name: { en: 'Brownie Sundae',    id: 'Brownie Sundae' },    desc: { en: 'Warm brownie, vanilla ice cream', id: 'Brownie hangat, es krim vanila' },           price: '34K', tags: ['sweet'] },
    ],
  },
]
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add lib/
git commit -m "feat: add data layer (content, menu, lang context, utils)"
```

---

## Task 3: UI primitives

**Files:**
- Create: `components/ui/LanguageProvider.tsx`
- Create: `components/ui/LangText.tsx`
- Create: `components/ui/RevealWrapper.tsx`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Tag.tsx`

- [ ] **Step 1: Create `components/ui/LanguageProvider.tsx`**

```tsx
// components/ui/LanguageProvider.tsx
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
```

- [ ] **Step 2: Create `components/ui/LangText.tsx`**

```tsx
// components/ui/LangText.tsx
'use client'

import { useLang } from '@/lib/lang'
import type { Bi } from '@/lib/data/content'

type Props = Bi & {
  as?: keyof React.JSX.IntrinsicElements
  className?: string
}

export function LangText({ en, id, as: Tag = 'span', className }: Props) {
  const { lang } = useLang()
  return <Tag className={className}>{lang === 'en' ? en : id}</Tag>
}
```

- [ ] **Step 3: Create `components/ui/RevealWrapper.tsx`**

```tsx
// components/ui/RevealWrapper.tsx
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
```

- [ ] **Step 4: Create `components/ui/Button.tsx`**

```tsx
// components/ui/Button.tsx
import { cn } from '@/lib/utils'

const variantClasses = {
  primary: 'bg-tomato text-white shadow-sm hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-8px_#E8552D]',
  ink:     'bg-ink text-text-invert hover:-translate-y-0.5',
  ghost:   'border-2 border-ink text-ink hover:bg-ink hover:text-text-invert',
  gold:    'bg-gold text-ink border-2 border-ink hover:-translate-y-0.5',
}

const sizeClasses = {
  default: 'px-6 py-[0.95em] text-base',
  sm:      'px-4 py-2 text-sm',
}

type ButtonProps = {
  variant?: keyof typeof variantClasses
  size?: keyof typeof sizeClasses
  href?: string
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

export function Button({
  variant = 'primary',
  size = 'default',
  href,
  children,
  className,
  type = 'button',
  onClick,
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center gap-[0.55em] font-bold leading-none rounded-pill transition-all duration-150 whitespace-nowrap',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  if (href) {
    return <a href={href} className={base}>{children}</a>
  }

  return (
    <button type={type} className={base} onClick={onClick}>
      {children}
    </button>
  )
}
```

- [ ] **Step 5: Create `components/ui/Tag.tsx`**

```tsx
// components/ui/Tag.tsx
import { cn } from '@/lib/utils'
import { LangText } from './LangText'

const variantClasses = {
  tomato: 'bg-tomato text-white',
  teal:   'bg-teal text-white',
  gold:   'bg-gold text-ink',
}

type TagProps = {
  variant: keyof typeof variantClasses
  en: string
  id: string
  className?: string
}

export function Tag({ variant, en, id, className }: TagProps) {
  return (
    <LangText
      en={en}
      id={id}
      className={cn(
        'inline-block font-mono text-xs uppercase tracking-[0.18em] font-bold px-2 py-1 rounded-pill',
        variantClasses[variant],
        className,
      )}
    />
  )
}
```

- [ ] **Step 6: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add components/ui/
git commit -m "feat: add UI primitives (LanguageProvider, LangText, RevealWrapper, Button, Tag)"
```

---

## Task 4: Layout shell

**Files:**
- Create: `components/layout/ConceptRibbon.tsx`
- Create: `components/layout/StickyHeader.tsx`
- Create: `components/layout/MobileNav.tsx`
- Create: `components/layout/Footer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/layout/ConceptRibbon.tsx`**

```tsx
// components/layout/ConceptRibbon.tsx
import { LangText } from '@/components/ui/LangText'

export function ConceptRibbon() {
  return (
    <div className="bg-ink-2 text-text-invert-soft font-mono text-[0.72rem] tracking-widest uppercase text-center py-2 px-4">
      <LangText
        en="◆ CONCEPT — a demo cafe website. Not a real business. Built as a portfolio piece."
        id="◆ KONSEP — website cafe demo. Bukan bisnis asli. Dibuat sebagai portfolio."
      />
    </div>
  )
}
```

- [ ] **Step 2: Create `components/layout/MobileNav.tsx`**

```tsx
// components/layout/MobileNav.tsx
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
          { href: '/',      en: 'Home',    id: 'Beranda' },
          { href: '/menu/', en: 'Menu',    id: 'Menu' },
          { href: '#about', en: 'About',   id: 'Tentang' },
          { href: '#gallery',en: 'Gallery',id: 'Galeri' },
          { href: '#visit', en: 'Visit',   id: 'Kunjungi' },
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
```

- [ ] **Step 3: Create `components/layout/StickyHeader.tsx`**

```tsx
// components/layout/StickyHeader.tsx
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
          {/* Logo */}
          <a href="/" className="font-display font-extrabold text-xl flex items-center gap-1">
            <span className="text-tomato">◓</span>
            <span>Concept<span className="text-tomato">Cafe</span></span>
          </a>

          {/* Desktop nav */}
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
            {/* Lang toggle */}
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

            {/* Desktop CTA */}
            <Button href="#visit" size="sm" className="hidden md:inline-flex">
              <LangText en="Book a table" id="Pesan meja" />
            </Button>

            {/* Burger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span className={`block w-5 h-0.5 bg-ink transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-ink transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-ink transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
```

- [ ] **Step 4: Create `components/layout/Footer.tsx`**

```tsx
// components/layout/Footer.tsx
import { LangText } from '@/components/ui/LangText'
import { Button } from '@/components/ui/Button'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-text-invert pt-16 pb-10">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <a href="/" className="font-display font-extrabold text-xl flex items-center gap-1">
              <span className="text-gold">◓</span>
              Concept<span className="text-gold">Cafe</span>
            </a>
            <p className="text-text-invert-soft mt-3 text-sm max-w-[34ch]">
              <LangText
                en="An all-day neighborhood cafe. Coffee, kitchen, and good company in Dago, Bandung."
                id="Cafe lokal yang buka sepanjang hari. Kopi, dapur, dan teman ngobrol di Dago, Bandung."
              />
            </p>
            <div className="flex gap-2 mt-4">
              {[['Ig', 'Instagram'], ['Tt', 'TikTok'], ['Wa', 'WhatsApp']].map(([label, aria]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={aria}
                  className="w-10 h-10 rounded-md bg-ink-2 border border-line-ink flex items-center justify-center font-mono text-xs text-text-invert-soft hover:bg-tomato hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display font-bold mb-4">
              <LangText en="Explore" id="Jelajah" />
            </h4>
            <ul className="space-y-2 text-text-invert-soft text-sm">
              {[
                { href: '/',       en: 'Home',    id: 'Beranda' },
                { href: '/menu/',  en: 'Menu',    id: 'Menu' },
                { href: '#about',  en: 'About',   id: 'Tentang' },
                { href: '#gallery',en: 'Gallery', id: 'Galeri' },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-text-invert transition-colors">
                    <LangText en={item.en} id={item.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div>
            <h4 className="font-display font-bold mb-4">
              <LangText en="Visit" id="Kunjungi" />
            </h4>
            <ul className="space-y-1 text-text-invert-soft text-sm">
              <li>Jl. Melati No. 7</li>
              <li>Dago, Bandung</li>
              <li className="font-mono text-[0.85rem]">07.00 – 23.00</li>
              <li>+62 812-3456-7890</li>
            </ul>
          </div>

          {/* Concept note */}
          <div>
            <h4 className="font-display font-bold mb-4">
              <LangText en="The concept" id="Soal konsep" />
            </h4>
            <p className="text-text-invert-soft text-sm">
              <LangText
                en="This is a demo site — a portfolio sample, not a real cafe."
                id="Ini situs demo — contoh portfolio, bukan cafe asli."
              />
            </p>
            <Button href="/menu/" variant="gold" size="sm" className="mt-4">
              <LangText en="View menu" id="Lihat menu" />
            </Button>
          </div>
        </div>

        <div className="border-t border-line-ink pt-5 flex flex-wrap justify-between gap-3 text-text-invert-soft text-sm">
          <span>
            © {year} Concept Cafe{' '}
            <LangText en="(demo). Design concept by Your Studio." id="(demo). Konsep desain oleh Studio Anda." />
          </span>
          <span className="font-mono text-xs">Bandung · Indonesia</span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Replace `app/layout.tsx`**

```tsx
// app/layout.tsx
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
```

- [ ] **Step 6: Verify dev server renders layout**

```bash
npm run dev
```
Open `http://localhost:3000`. Expected: ConceptRibbon (dark strip), StickyHeader (logo + nav), empty main, Footer (dark ink).

- [ ] **Step 7: Commit**

```bash
git add components/layout/ app/layout.tsx
git commit -m "feat: add layout shell (ConceptRibbon, StickyHeader, MobileNav, Footer)"
```

---

## Task 5: Landing — Hero, Marquee, Featured, About, Daypart

**Files:**
- Create: `components/landing/HeroSection.tsx`
- Create: `components/landing/MarqueeBar.tsx`
- Create: `components/landing/FeaturedGrid.tsx`
- Create: `components/landing/AboutSection.tsx`
- Create: `components/landing/DaypartSection.tsx`

- [ ] **Step 1: Create `components/landing/HeroSection.tsx`**

```tsx
// components/landing/HeroSection.tsx
import { LangText } from '@/components/ui/LangText'
import { Button } from '@/components/ui/Button'
import { pexels } from '@/lib/utils'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-[clamp(40px,6vw,72px)] pb-[clamp(64px,9vw,120px)]">
      {/* Blobs */}
      <div className="absolute w-[340px] h-[340px] rounded-full bg-gold opacity-40 -top-20 right-[6%] blur-3xl pointer-events-none" />
      <div className="absolute w-[220px] h-[220px] rounded-full bg-teal opacity-20 -bottom-16 -left-10 blur-2xl pointer-events-none" />

      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)] relative grid md:grid-cols-[1.05fr_0.95fr] gap-[clamp(28px,5vw,64px)] items-center">
        {/* Copy */}
        <div>
          <div className="flex gap-2 flex-wrap mb-5">
            <span className="bg-tomato text-white font-mono text-xs uppercase tracking-[0.18em] font-bold px-3 py-1 rounded-pill">
              <LangText en="● All-day cafe" id="● Cafe sepanjang hari" />
            </span>
            <span className="bg-teal text-white font-mono text-xs uppercase tracking-[0.18em] font-bold px-3 py-1 rounded-pill">
              <LangText en="Coffee + Kitchen" id="Kopi + Dapur" />
            </span>
          </div>

          <h1 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2.7rem,6.5vw,5rem)]">
            <LangText en="Coffee, food," id="Kopi, makan," as="span" /><br />
            <span className="text-tomato"><LangText en="good times." id="ngumpul." /></span>
          </h1>

          <p className="mt-5 text-text-soft text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed max-w-[46ch]">
            <LangText
              en="An all-day neighborhood cafe in Bandung — proper coffee, a kitchen that runs from sunrise to last call, and a corner table with your name on it."
              id="Cafe lokal yang buka sepanjang hari di Bandung — kopi yang serius, dapur yang nyala dari pagi sampai malam, dan satu meja pojok yang selalu nungguin kamu."
            />
          </p>

          <div className="flex gap-3 flex-wrap mt-7">
            <Button href="/menu/">
              <LangText en="See the menu" id="Lihat menu" />
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Button>
            <Button href="#visit" variant="ghost">
              <LangText en="Find us" id="Cari lokasi" />
            </Button>
          </div>

          <div className="flex items-center gap-5 mt-8 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="font-mono text-gold text-lg tracking-widest">★★★★★</span>
              <strong className="font-bold">4.8</strong>
              <span className="text-text-soft text-sm">
                <LangText en="· 2.1k Google reviews" id="· 2.1k ulasan Google" />
              </span>
            </div>
            <div className="w-px h-6 bg-line" />
            <span className="font-mono text-sm text-ink-soft">
              <LangText en="Open daily · 07:00–23:00" id="Buka tiap hari · 07.00–23.00" />
            </span>
          </div>
        </div>

        {/* Image collage */}
        <div className="relative min-h-[460px] md:min-h-[460px]">
          <div className="absolute inset-0 rounded-xl overflow-hidden shadow-card rotate-2">
            <img src={pexels(302899, 900)} alt="Barista pouring latte art" className="w-full h-full object-cover" />
          </div>
          <div className="absolute w-[46%] -left-[7%] bottom-[6%] rounded-lg shadow-card -rotate-6 overflow-hidden">
            <img src={pexels(539432, 500)} alt="Iced coffee" className="w-full h-[150px] object-cover" />
          </div>
          <div className="absolute -top-3 -left-[4%] bg-gold text-ink font-mono font-bold text-sm px-3 py-1 rounded-pill border-2 border-ink -rotate-9 shadow-pop">
            <LangText en="Open 7AM" id="Buka jam 7" />
          </div>
          <div className="absolute -right-[6%] top-[14%] bg-white rounded-md p-3 shadow-card rotate-5 flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-teal flex items-center justify-center text-white font-display font-extrabold">★</span>
            <div className="leading-tight">
              <div className="font-display font-extrabold text-[1.05rem]">
                <LangText en="Signature" id="Andalan" />
              </div>
              <div className="font-mono text-[0.72rem] text-text-soft">Es Kopi Gula Aren</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `components/landing/MarqueeBar.tsx`**

```tsx
// components/landing/MarqueeBar.tsx
import { marqueeItems } from '@/lib/data/content'

export function MarqueeBar() {
  const items = [...marqueeItems, ...marqueeItems]
  return (
    <div className="overflow-hidden bg-gold border-y-2 border-ink py-3" aria-hidden="true">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-3 font-mono font-bold text-ink text-sm px-5">
            <span className="text-ink opacity-40">◆</span>
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `components/landing/FeaturedGrid.tsx`**

```tsx
// components/landing/FeaturedGrid.tsx
import { featured } from '@/lib/data/content'
import { LangText } from '@/components/ui/LangText'
import { Tag } from '@/components/ui/Tag'
import { Button } from '@/components/ui/Button'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { pexels } from '@/lib/utils'

export function FeaturedGrid() {
  return (
    <section className="py-[clamp(64px,9vw,120px)]" id="featured">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="flex items-end justify-between gap-5 flex-wrap mb-10">
          <div>
            <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] font-bold text-tomato">
              <LangText en="Crowd favorites" id="Paling dicari" />
            </p>
            <RevealWrapper>
              <h2 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2rem,4.4vw,3.3rem)] mt-2">
                <LangText en="Menu everyone orders" id="Menu andalan kami" />
              </h2>
            </RevealWrapper>
          </div>
          <Button href="/menu/" variant="ghost" size="sm">
            <LangText en="Full menu →" id="Menu lengkap →" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {featured.map((item, i) => (
            <RevealWrapper key={i}>
              <article className="bg-white border border-line rounded-lg overflow-hidden shadow-sm group">
                <div className="relative overflow-hidden">
                  <img
                    src={pexels(item.img, 700)}
                    alt=""
                    loading="lazy"
                    className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Tag variant={item.tagVariant} en={item.tag.en} id={item.tag.id} />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="font-display font-bold text-[1.1rem] leading-snug">
                      <LangText en={item.name.en} id={item.name.id} />
                    </h3>
                    <span className="font-mono font-bold text-tomato whitespace-nowrap">Rp {item.price}</span>
                  </div>
                  <p className="text-text-soft text-sm mt-2">
                    <LangText en={item.desc.en} id={item.desc.id} />
                  </p>
                </div>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `components/landing/AboutSection.tsx`**

```tsx
// components/landing/AboutSection.tsx
import { LangText } from '@/components/ui/LangText'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { pexels } from '@/lib/utils'

export function AboutSection() {
  return (
    <section className="bg-cream-2 py-[clamp(64px,9vw,120px)] relative overflow-hidden" id="about">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)] grid md:grid-cols-2 gap-[clamp(28px,5vw,70px)] items-center">
        {/* Image */}
        <div className="relative order-first">
          <div className="-rotate-2 rounded-xl overflow-hidden shadow-card">
            <img
              src={pexels(5379707, 900)}
              alt="Bright cafe interior with plants"
              loading="lazy"
              className="w-full h-[clamp(320px,42vw,480px)] object-cover"
            />
          </div>
          <div className="absolute -bottom-4 right-[8%] bg-tomato text-white font-mono font-bold text-sm px-3 py-1 rounded-pill border-2 border-ink rotate-6 shadow-pop">
            <LangText en="Since 2021" id="Sejak 2021" />
          </div>
        </div>

        {/* Copy */}
        <div>
          <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] font-bold text-tomato">
            <LangText en="Our story" id="Cerita kami" />
          </p>
          <RevealWrapper>
            <h2 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2rem,4.4vw,3.3rem)] mt-3 mb-5">
              <LangText en="Your second living room" id="Ruang tamu kedua kamu" />
            </h2>
          </RevealWrapper>
          <p className="text-text-soft text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed">
            <LangText
              en="We started Concept Cafe with one idea: a place that fits your whole day. Quiet enough for the morning laptop grind, lively enough for dinner with friends, and friendly enough that the staff knows your order."
              id="Concept Cafe lahir dari satu ide sederhana: tempat yang pas buat seharian penuh. Tenang buat kerja pagi, rame buat makan malam bareng teman, dan ramah sampai baristanya hafal pesanan kamu."
            />
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { num: '120+', label: { en: 'seats',      id: 'kursi' },   color: 'text-tomato' },
              { num: '16h',  label: { en: 'open daily', id: 'buka/hari'},color: 'text-teal' },
              { num: '60+',  label: { en: 'menu items', id: 'menu' },    color: 'text-gold' },
            ].map((stat) => (
              <div key={stat.num}>
                <div className={`font-display font-extrabold text-[2.2rem] ${stat.color}`}>{stat.num}</div>
                <div className="font-mono text-[0.78rem] text-text-soft">
                  <LangText en={stat.label.en} id={stat.label.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create `components/landing/DaypartSection.tsx`**

```tsx
// components/landing/DaypartSection.tsx
import { dayparts } from '@/lib/data/content'
import { LangText } from '@/components/ui/LangText'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { pexels } from '@/lib/utils'

const accentBg = { gold: 'bg-gold', teal: 'bg-teal', tomato: 'bg-tomato' }

export function DaypartSection() {
  return (
    <section className="bg-ink py-[clamp(64px,9vw,120px)]">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] font-bold text-gold">
            <LangText en="From sunrise to last call" id="Dari pagi sampai malam" />
          </p>
          <RevealWrapper>
            <h2 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2rem,4.4vw,3.3rem)] mt-3 text-text-invert">
              <LangText en="One cafe, three moods" id="Satu cafe, tiga suasana" />
            </h2>
          </RevealWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {dayparts.map((d, i) => (
            <RevealWrapper key={i}>
              <article className="bg-ink-2 border border-line-ink rounded-lg overflow-hidden">
                <div className="relative h-[180px] overflow-hidden">
                  <img src={pexels(d.img, 700)} alt="" loading="lazy" className="w-full h-full object-cover opacity-90" />
                  <span className={`absolute top-3 right-3 font-mono font-bold text-ink text-[0.74rem] px-2.5 py-1 rounded-pill ${accentBg[d.accent]}`}>
                    {d.time}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-extrabold text-[1.5rem] text-text-invert">
                    <LangText en={d.name.en} id={d.name.id} />
                  </h3>
                  <p className="text-text-invert-soft mt-1">
                    <LangText en={d.desc.en} id={d.desc.id} />
                  </p>
                </div>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add components/landing/HeroSection.tsx components/landing/MarqueeBar.tsx components/landing/FeaturedGrid.tsx components/landing/AboutSection.tsx components/landing/DaypartSection.tsx
git commit -m "feat: add landing sections (Hero, Marquee, Featured, About, Daypart)"
```

---

## Task 6: Gallery Carousel

**Files:**
- Create: `components/landing/GalleryCarousel.tsx`

- [ ] **Step 1: Create `components/landing/GalleryCarousel.tsx`**

```tsx
// components/landing/GalleryCarousel.tsx
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

          {/* Prev / Next */}
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

          {/* Dots */}
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
```

- [ ] **Step 2: Verify dev server — carousel visible and functional**

```bash
npm run dev
```
Temporarily add `<GalleryCarousel />` to `app/page.tsx` and open `http://localhost:3000`. Expected: 7-slide image carousel with autoplay, prev/next arrows, dots, drag support.

- [ ] **Step 3: Commit**

```bash
git add components/landing/GalleryCarousel.tsx
git commit -m "feat: add GalleryCarousel with Embla (autoplay, swipe, dots, keyboard)"
```

---

## Task 7: Reviews, Visit, Newsletter

**Files:**
- Create: `components/landing/ReviewsSection.tsx`
- Create: `components/landing/VisitSection.tsx`
- Create: `components/landing/NewsletterCTA.tsx`

- [ ] **Step 1: Create `components/landing/ReviewsSection.tsx`**

```tsx
// components/landing/ReviewsSection.tsx
import { reviews } from '@/lib/data/content'
import { LangText } from '@/components/ui/LangText'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { pexels } from '@/lib/utils'

export function ReviewsSection() {
  return (
    <section className="bg-cream-2 py-[clamp(64px,9vw,120px)]">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="text-center mb-11">
          <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] font-bold text-tomato">
            <LangText en="Loved by locals" id="Disukai warga lokal" />
          </p>
          <RevealWrapper>
            <h2 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2rem,4.4vw,3.3rem)] mt-2">
              <LangText en="Don't take our word for it" id="Bukan kami yang bilang" />
            </h2>
          </RevealWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <RevealWrapper key={i}>
              <article className="bg-white rounded-xl p-6 flex flex-col gap-4 shadow-sm">
                <div className="font-mono text-gold text-lg tracking-widest">★★★★★</div>
                <p className="text-[1.05rem] leading-relaxed flex-1 text-text">
                  "<LangText en={r.quote.en} id={r.quote.id} />"
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <img
                    src={pexels(r.img, 200)}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold">{r.name}</div>
                    <div className="font-mono text-[0.74rem] text-text-soft">
                      <LangText en={r.role.en} id={r.role.id} />
                    </div>
                  </div>
                </div>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `components/landing/VisitSection.tsx`**

```tsx
// components/landing/VisitSection.tsx
import { LangText } from '@/components/ui/LangText'
import { Button } from '@/components/ui/Button'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

export function VisitSection() {
  return (
    <section className="py-[clamp(64px,9vw,120px)]" id="visit">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)] grid md:grid-cols-[1fr_1.05fr] gap-[clamp(28px,5vw,60px)] items-center">
        <div>
          <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] font-bold text-tomato">
            <LangText en="Come hang out" id="Mampir yuk" />
          </p>
          <RevealWrapper>
            <h2 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2rem,4.4vw,3.3rem)] mt-3 mb-6">
              <LangText en="Find us & say hi" id="Datang & sapa kami" />
            </h2>
          </RevealWrapper>

          <div className="space-y-5 mb-7">
            {[
              {
                icon: '📍',
                label: { en: 'Address', id: 'Alamat' },
                content: <span className="text-text-soft">Jl. Melati No. 7, Dago, Bandung 40135</span>,
              },
              {
                icon: '🕗',
                label: { en: 'Hours', id: 'Jam buka' },
                content: (
                  <table className="font-mono text-sm text-text-soft w-full max-w-[300px] mt-1">
                    <tbody>
                      <tr>
                        <td><LangText en="Mon – Fri" id="Sen – Jum" /></td>
                        <td className="text-right">07.00 – 23.00</td>
                      </tr>
                      <tr>
                        <td><LangText en="Sat – Sun" id="Sab – Min" /></td>
                        <td className="text-right">07.00 – 24.00</td>
                      </tr>
                    </tbody>
                  </table>
                ),
              },
              {
                icon: '📞',
                label: { en: 'Reservations', id: 'Reservasi' },
                content: <span className="text-text-soft">+62 812-3456-7890 · WhatsApp</span>,
              },
            ].map((row, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="w-11 h-11 rounded-md bg-cream-2 flex items-center justify-center text-xl flex-shrink-0">{row.icon}</span>
                <div>
                  <div className="font-bold"><LangText en={row.label.en} id={row.label.id} /></div>
                  {row.content}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button href="#">
              <LangText en="Reserve on WhatsApp" id="Reservasi via WhatsApp" />
            </Button>
            <Button href="#" variant="ghost">
              <LangText en="Open in Maps" id="Buka di Maps" />
            </Button>
          </div>
        </div>

        {/* CSS map placeholder */}
        <div className="relative rounded-lg overflow-hidden border border-line shadow-card h-[clamp(320px,40vw,440px)] bg-cream-3">
          <div className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg,transparent 0 58px,rgba(255,255,255,.5) 58px 64px),repeating-linear-gradient(0deg,transparent 0 58px,rgba(255,255,255,.5) 58px 64px)',
            }}
          />
          <div className="absolute -left-[5%] top-[30%] w-[130%] h-[26px] bg-white opacity-85 -rotate-12" />
          <div className="absolute -left-[5%] top-[62%] w-[130%] h-[34px] bg-cream rotate-6" />
          <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-full">
            <div className="w-10 h-10 bg-tomato rounded-[50%_50%_50%_0] -rotate-45 shadow-card flex items-center justify-center">
              <span className="rotate-45 text-white font-extrabold">◓</span>
            </div>
          </div>
          <div className="absolute left-4 bottom-4 bg-white rounded-md p-3 shadow-card">
            <div className="font-mono text-[0.7rem] text-text-soft">CONCEPT CAFE</div>
            <div className="font-bold text-sm">Dago, Bandung</div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `components/landing/NewsletterCTA.tsx`**

```tsx
// components/landing/NewsletterCTA.tsx
import { LangText } from '@/components/ui/LangText'
import { Button } from '@/components/ui/Button'

export function NewsletterCTA() {
  return (
    <section className="py-[clamp(44px,6vw,72px)]">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="bg-gold border-[3px] border-ink rounded-xl p-[clamp(28px,5vw,52px)] grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center shadow-pop">
          <div>
            <h2 className="font-display font-extrabold leading-none tracking-tight text-[clamp(1.7rem,3.6vw,2.6rem)] text-ink">
              <LangText en="Get a free coffee on us" id="Dapat kopi gratis dari kami" />
            </h2>
            <p className="text-ink-2 mt-2 font-medium">
              <LangText
                en="Join the Concept Club — first brew is free, plus early access to new menu drops."
                id="Gabung Concept Club — kopi pertama gratis, plus akses duluan ke menu baru."
              />
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 flex-wrap">
            <input
              type="email"
              placeholder="email@kamu.com"
              className="flex-1 min-w-[180px] px-5 py-[0.95em] rounded-pill border-2 border-ink font-body text-base bg-white focus:outline-none focus:ring-2 focus:ring-ink"
            />
            <Button type="submit" variant="ink">
              <LangText en="Join" id="Gabung" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/landing/ReviewsSection.tsx components/landing/VisitSection.tsx components/landing/NewsletterCTA.tsx
git commit -m "feat: add Reviews, Visit, and Newsletter landing sections"
```

---

## Task 8: Landing page assembly

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
// app/page.tsx
import { HeroSection }     from '@/components/landing/HeroSection'
import { MarqueeBar }      from '@/components/landing/MarqueeBar'
import { FeaturedGrid }    from '@/components/landing/FeaturedGrid'
import { AboutSection }    from '@/components/landing/AboutSection'
import { DaypartSection }  from '@/components/landing/DaypartSection'
import { GalleryCarousel } from '@/components/landing/GalleryCarousel'
import { ReviewsSection }  from '@/components/landing/ReviewsSection'
import { VisitSection }    from '@/components/landing/VisitSection'
import { NewsletterCTA }   from '@/components/landing/NewsletterCTA'

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <MarqueeBar />
      <FeaturedGrid />
      <AboutSection />
      <DaypartSection />
      <GalleryCarousel />
      <ReviewsSection />
      <VisitSection />
      <NewsletterCTA />
    </>
  )
}
```

- [ ] **Step 2: Verify full landing page in browser**

```bash
npm run dev
```
Open `http://localhost:3000`. Verify: all 9 sections render, marquee animates, gallery carousel works, ID/EN toggle switches all text, mobile nav opens at narrow viewport.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble landing page with all 9 sections"
```

---

## Task 9: Menu components — primitives and interactive

**Files:**
- Create: `components/menu/FeatureCard.tsx`
- Create: `components/menu/PriceRow.tsx`
- Create: `components/menu/MenuFilterBar.tsx`
- Create: `components/menu/MenuCategorySection.tsx`
- Create: `components/menu/MenuContent.tsx`
- Create: `components/menu/MenuHero.tsx`

- [ ] **Step 1: Create `components/menu/FeatureCard.tsx`**

```tsx
// components/menu/FeatureCard.tsx
import { LangText } from '@/components/ui/LangText'
import { Tag } from '@/components/ui/Tag'
import { TAG_META, type MenuCategory, type TagKey } from '@/lib/data/menu'
import { pexels } from '@/lib/utils'

type Props = { category: MenuCategory }

export function FeatureCard({ category }: Props) {
  const feat = category.items.find((i) => i.feat)
  if (!feat) return null

  const primaryTag: TagKey = (feat.tags?.[0] as TagKey) ?? 'best'
  const tagMeta = TAG_META[primaryTag]

  return (
    <article className="sticky top-[150px] rounded-xl overflow-hidden shadow-card self-start">
      <div className="relative">
        <img
          src={pexels(category.feature, 800)}
          alt=""
          loading="lazy"
          className="w-full h-[240px] object-cover"
        />
        <div className="absolute top-3 left-3">
          <Tag variant={tagMeta.variant} en={tagMeta.en} id={tagMeta.id} />
        </div>
      </div>
      <div className="p-5 bg-white">
        <p className="font-mono text-[0.72rem] uppercase tracking-widest text-text-soft mb-1">
          <LangText
            en={`Most loved in ${category.name.en}`}
            id={`Paling disukai di ${category.name.id}`}
          />
        </p>
        <h3 className="font-display font-bold text-xl leading-snug">
          <LangText en={feat.name.en} id={feat.name.id} />
        </h3>
        <p className="text-text-soft text-sm mt-1">
          <LangText en={feat.desc.en} id={feat.desc.id} />
        </p>
        <div className="font-mono font-bold text-tomato text-lg mt-3">Rp {feat.price}</div>
      </div>
    </article>
  )
}
```

- [ ] **Step 2: Create `components/menu/PriceRow.tsx`**

```tsx
// components/menu/PriceRow.tsx
import { LangText } from '@/components/ui/LangText'
import { Tag } from '@/components/ui/Tag'
import { TAG_META, type MenuItem } from '@/lib/data/menu'

export function PriceRow({ item }: { item: MenuItem }) {
  return (
    <div className="py-4 border-b border-line last:border-0">
      <div className="flex items-baseline gap-2">
        <span className="font-display font-bold text-[1.05rem]">
          <LangText en={item.name.en} id={item.name.id} />
        </span>
        <span className="flex-1 border-b border-dashed border-line-3 mx-1 relative top-[-3px]" />
        <span className="font-mono font-bold text-tomato whitespace-nowrap">Rp {item.price}</span>
      </div>
      <p className="text-text-soft text-sm mt-0.5">
        <LangText en={item.desc.en} id={item.desc.id} />
      </p>
      {item.tags && item.tags.length > 0 && (
        <div className="flex gap-1.5 flex-wrap mt-2">
          {item.tags.map((key) => {
            const m = TAG_META[key]
            return <Tag key={key} variant={m.variant} en={m.en} id={m.id} />
          })}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create `components/menu/MenuCategorySection.tsx`**

```tsx
// components/menu/MenuCategorySection.tsx
'use client'

import { LangText } from '@/components/ui/LangText'
import { FeatureCard } from './FeatureCard'
import { PriceRow } from './PriceRow'
import type { MenuCategory } from '@/lib/data/menu'

type Props = { category: MenuCategory; visible: boolean }

export function MenuCategorySection({ category, visible }: Props) {
  const nonFeatItems = category.items.filter((i) => !i.feat)

  return (
    <section
      data-cat={category.key}
      className={visible ? '' : 'hidden'}
    >
      <div className="mb-6">
        <h2 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2rem,4.4vw,3.3rem)]">
          <LangText en={category.name.en} id={category.name.id} />
        </h2>
        <p className="text-text-soft mt-1">
          <LangText en={category.note.en} id={category.note.id} />
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 items-start">
        <FeatureCard category={category} />
        <div>
          {nonFeatItems.map((item, i) => (
            <PriceRow key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `components/menu/MenuFilterBar.tsx`**

```tsx
// components/menu/MenuFilterBar.tsx
'use client'

import { LangText } from '@/components/ui/LangText'
import type { MenuCategory } from '@/lib/data/menu'

type Props = {
  categories: MenuCategory[]
  activeKey: string
  onSelect: (key: string) => void
}

export function MenuFilterBar({ categories, activeKey, onSelect }: Props) {
  return (
    <div className="sticky top-16 z-30 bg-cream/95 backdrop-blur-sm border-b border-line py-3">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)] flex gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onSelect('all')}
          className={`flex-shrink-0 font-mono text-xs uppercase tracking-[0.1em] font-bold px-4 py-2 rounded-pill border-2 transition-colors ${
            activeKey === 'all'
              ? 'bg-ink text-text-invert border-ink'
              : 'border-line text-text-soft hover:border-ink hover:text-ink'
          }`}
        >
          <LangText en="All" id="Semua" />
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onSelect(cat.key)}
            className={`flex-shrink-0 font-mono text-xs uppercase tracking-[0.1em] font-bold px-4 py-2 rounded-pill border-2 transition-colors ${
              activeKey === cat.key
                ? 'bg-ink text-text-invert border-ink'
                : 'border-line text-text-soft hover:border-ink hover:text-ink'
            }`}
          >
            <LangText en={cat.name.en} id={cat.name.id} />
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create `components/menu/MenuContent.tsx`**

```tsx
// components/menu/MenuContent.tsx
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
```

- [ ] **Step 6: Create `components/menu/MenuHero.tsx`**

```tsx
// components/menu/MenuHero.tsx
import { LangText } from '@/components/ui/LangText'

export function MenuHero() {
  return (
    <section className="bg-cream-2 py-16 border-b border-line">
      <div className="max-w-site mx-auto px-[clamp(20px,5vw,64px)]">
        <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] font-bold text-tomato">
          <LangText en="What we serve" id="Yang kami sajikan" />
        </p>
        <h1 className="font-display font-extrabold leading-none tracking-tight text-[clamp(2.7rem,6.5vw,5rem)] mt-3">
          <LangText en="The Menu" id="Menu Kami" />
        </h1>
        <p className="text-text-soft text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed mt-4 max-w-[50ch]">
          <LangText
            en="Coffee, all-day kitchen, snacks, and sweets. Something for every hour."
            id="Kopi, dapur sepanjang hari, camilan, dan manis-manisan. Ada buat setiap jam."
          />
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add components/menu/
git commit -m "feat: add menu components (FeatureCard, PriceRow, FilterBar, MenuContent, MenuHero)"
```

---

## Task 10: Menu page assembly + build verification

**Files:**
- Create: `app/menu/page.tsx`
- Verify: `npm run build` succeeds

- [ ] **Step 1: Create `app/menu/page.tsx`**

```tsx
// app/menu/page.tsx
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
```

- [ ] **Step 2: Verify menu page in browser**

```bash
npm run dev
```
Open `http://localhost:3000/menu/`. Expected: MenuHero + sticky filter bar (All, Kopi, Tanpa Kopi, Sarapan, Makanan Berat, Camilan, Manis) + all 6 category sections with FeatureCard + PriceRows. Clicking a chip hides other categories and smooth-scrolls to the list.

- [ ] **Step 3: Run TypeScript check**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Run production build**

```bash
npm run build
```
Expected: build succeeds, `/out` folder created with `index.html`, `menu/index.html`, and static assets. No build errors.

- [ ] **Step 5: Spot-check static output**

```bash
ls out/
```
Expected: `index.html`, `menu/` directory, `_next/` assets.

Open `out/index.html` in a browser directly (no server needed). Expected: landing page renders fully.

- [ ] **Step 6: Commit**

```bash
git add app/menu/
git commit -m "feat: add menu page; static export builds successfully"
```

---

## Task 11: Final polish — no-scrollbar utility + .gitignore + .superpowers

**Files:**
- Modify: `app/globals.css` — add `no-scrollbar` utility
- Modify: `.gitignore` — add `.superpowers/` and `out/`

- [ ] **Step 1: Add `no-scrollbar` utility to `app/globals.css`**

Append to the end of `app/globals.css`:
```css
@layer utilities {
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
```

- [ ] **Step 2: Update `.gitignore`**

Append to `.gitignore`:
```
# static build output
/out

# brainstorm sessions
.superpowers/
```

- [ ] **Step 3: Final build verification**

```bash
npm run build
```
Expected: clean build, no TypeScript errors, no ESLint errors, `/out` generated.

- [ ] **Step 4: Final commit**

```bash
git add app/globals.css .gitignore
git commit -m "chore: add no-scrollbar utility, update .gitignore"
```

---

## Self-review: Spec coverage check

| Spec requirement | Task that covers it |
|---|---|
| Next.js App Router + static export | Task 1 |
| Tailwind design tokens (colors, fonts, radii, shadows, marquee) | Task 1 |
| `lib/data/content.ts` + `lib/data/menu.ts` types and data | Task 2 |
| `lib/lang.ts` context + `useLang` hook | Task 2 |
| `LanguageProvider` + `LangText` + localStorage `cc-lang` | Task 3 |
| `RevealWrapper` IntersectionObserver fade-in | Task 3 |
| `Button` + `Tag` UI primitives | Task 3 |
| `ConceptRibbon`, `StickyHeader` (scroll state + lang toggle + burger), `MobileNav`, `Footer` | Task 4 |
| `app/layout.tsx` fonts + LanguageProvider wrap | Task 4 |
| Hero collage + Marquee CSS animation | Task 5 |
| FeaturedGrid 3-col cards | Task 5 |
| AboutSection + DaypartSection (dark band) | Task 5 |
| GalleryCarousel (Embla, autoplay, swipe, dots, keyboard) | Task 6 |
| ReviewsSection + VisitSection + NewsletterCTA | Task 7 |
| Landing page assembly (`app/page.tsx`) | Task 8 |
| `FeatureCard` sticky + `PriceRow` dotted leader | Task 9 |
| `MenuFilterBar` sticky chips + `MenuContent` state boundary | Task 9 |
| `MenuCategorySection` visible/hidden filter | Task 9 |
| `app/menu/page.tsx` + `MenuHero` | Task 10 |
| `npm run build` → `/out` static export | Task 10 |
| `no-scrollbar` utility + `.gitignore` | Task 11 |
