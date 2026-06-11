# Concept Cafe — Project Context

## What this is
A bilingual (ID/EN) cafe portfolio demo website. Not a real business. Two pages: Landing and Menu.

## Tech stack
- Next.js 14 App Router, TypeScript strict mode
- Tailwind CSS v3 with custom design tokens
- Static export (`output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`)
- Embla Carousel (`embla-carousel-react` + `embla-carousel-autoplay` + `embla-carousel-wheel-gestures`)
- `next/font/google`: Bricolage Grotesque (display), Plus Jakarta Sans (body), Space Mono (mono)
- Client-side i18n via React Context — `localStorage` key `cc-lang`, default `'id'`

## Key architectural decisions
- RSC for all static sections; `'use client'` only for: `StickyHeader`, `MobileNav`, `LanguageProvider`, `LangText`, `RevealWrapper`, `GalleryCarousel`, `NewsletterCTA`, `MenuContent`, `MenuFilterBar`, `MenuCategorySection`
- `MenuContent` is the client boundary that owns `activeKey` state and renders both the filter bar and all category sections
- All images use Pexels CDN via `pexels(id, width)` from `lib/utils.ts` — no `next/image` needed
- Config file is `next.config.mjs` (NOT `.ts` — Next.js 14.2.x doesn't support `.ts` config)

## Build & dev
```bash
npm run dev        # dev server at http://localhost:3000
npm run build      # static export → out/
npx tsc --noEmit   # type check
```

## Git & deployment
- Repo: `https://github.com/lutfihp/concept-cafe.git`, branch `main`
- `handoffs/` is gitignored (design prototype files, not project source)
- See `DEPLOYMENT.md` at project root for the full VPS deploy runbook (FileZilla SFTP → `/var/www/concept-cafe`, nginx config, Certbot HTTPS, re-deploy workflow)

## Project status: COMPLETE
All implementation tasks done. `npm run build` produces a clean static export with zero errors. Favicon assets added. Git initialized and pushed to GitHub.

### File map
```
app/
  layout.tsx          root layout: fonts, LanguageProvider, ConceptRibbon, StickyHeader, Footer
  page.tsx            landing page (all 9 sections)
  globals.css         Tailwind + base reset + no-scrollbar utility
  menu/page.tsx       menu page
  icon.svg            brand favicon (SVG — tomato tile + cream ◓ mark)
  icon.png            32×32 PNG favicon fallback
  apple-icon.png      180×180 Apple touch icon

components/
  ui/
    LanguageProvider.tsx  'use client' — lang context + localStorage
    LangText.tsx          'use client' — renders en|id based on context
    RevealWrapper.tsx     'use client' — IntersectionObserver fade-in
    Button.tsx            RSC-safe — href→<a>, else <button>; variants: primary/ink/ghost/gold
    Tag.tsx               RSC-safe — wraps LangText; variants: tomato/teal/gold
  layout/
    ConceptRibbon.tsx     RSC — top dark banner (demo disclaimer)
    StickyHeader.tsx      'use client' — scroll border, lang toggle, burger
    MobileNav.tsx         'use client' — fullscreen overlay nav
    Footer.tsx            RSC — dark ink 4-col footer
  landing/
    HeroSection.tsx       RSC — two-column collage + CTAs
    MarqueeBar.tsx        RSC — CSS-only gold marquee band
    FeaturedGrid.tsx      RSC — 3-col featured menu cards
    AboutSection.tsx      RSC — about + stats
    DaypartSection.tsx    RSC — dark ink 3-col morning/afternoon/evening
    GalleryCarousel.tsx   'use client' — Embla 7-slide carousel
    ReviewsSection.tsx    RSC — 3 review cards
    VisitSection.tsx      RSC — address/hours + CSS map placeholder
    NewsletterCTA.tsx     'use client' — gold CTA band with email form
  menu/
    MenuHero.tsx          RSC — menu page header
    MenuContent.tsx       'use client' — owns activeKey, renders FilterBar + sections
    MenuFilterBar.tsx     'use client' — sticky chip filter bar
    MenuCategorySection.tsx 'use client' — single category (receives visible prop)
    FeatureCard.tsx       RSC-safe — sticky feature card with image
    PriceRow.tsx          RSC-safe — single menu item row with dotted leader

lib/
  data/content.ts     Bi type + marqueeItems/featured/dayparts/gallery/reviews data
  data/menu.ts        TagKey/MenuItem/MenuCategory types + 6-category menu array
  lang.ts             Lang type, LangContext, useLang hook
  utils.ts            pexels(id, w) URL helper + cn() classname merge
```

## Design tokens (tailwind.config.ts)
- Colors: `cream`, `cream-2`, `cream-3`, `ink`, `ink-2`, `ink-soft`, `tomato`, `tomato-deep`, `gold`, `teal`, `berry`, `text`, `text-soft`, `text-invert`, `text-invert-soft`, `line`, `line-ink`
- Screens: sm:560px, md:860px, lg:1024px, xl:1240px
- Border radius: `sm`(10px), `md`(16px), `lg`(26px), `xl`(40px), `pill`(999px)
- Shadows: `sm`, `card`, `pop`
- Max width: `site`(1240px)
- Animation: `marquee` keyframe (CSS marquee scroll)

## Possible next steps
- **Deploy to VPS** — follow `DEPLOYMENT.md` (nginx + Certbot already documented)
- Replace Pexels placeholder images with real licensed photos
- Swap CSS map placeholder in VisitSection with a real Google Maps embed
- Wire NewsletterCTA to a real form backend (Mailchimp, ConvertKit, etc.)
- Add a `robots.txt` and `sitemap.xml` for SEO
- Mobile QA pass — test on real devices
