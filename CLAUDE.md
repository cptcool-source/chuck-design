# chuck design — Next.js

## Stack — Path B (Next.js + npm)
- Next.js 16.2.9 App Router — JavaScript (not TypeScript)
- Tailwind v4 via `@import "tailwindcss"` in `app/globals.css` — no tailwind.config.js
- GSAP 3.13+ — always `gsap.registerPlugin()` inside `useEffect`, never at module level
- Three.js — dynamic import inside `useEffect` to avoid SSR errors
- Phosphor Icons via CDN links in `app/layout.js` `<head>` (duotone + regular)
- Fonts: Outfit (300–800) + Geist Mono (400–500) via `next/font/google`
- Formspree endpoint: `https://formspree.io/f/mdaraoaw`
- Deploy: Vercel

## Commands
```
npm run dev    # localhost:3000
npm run build
vercel         # production deploy
```

## Architecture
```
app/
  layout.js       fonts, metadata, JSON-LD, Phosphor CDN links
  page.js         client component — lightbox state + useReveal hook
  globals.css     full design system — DO NOT convert to Tailwind utilities
components/
  Nav.jsx         'use client' — scroll state, mobile drawer, active link
  Hero.jsx        server component — static, CSS handles animations
  FilmSlate.jsx   server component — static marquee
  Services.jsx    'use client' — 3D card tilt via mousemove
  Process.jsx     'use client' — IntersectionObserver rail fill + step activation
  Work.jsx        'use client' — drag scroll rail, lightbox trigger
  About.jsx       server component — static
  Contact.jsx     'use client' — controlled form, Formspree fetch
  Footer.jsx      server component — static
  Lightbox.jsx    'use client' — open/close, zoom on wheel/click
hooks/
  useReveal.js    IntersectionObserver for .reveal-up → .visible class
public/images/    all site images (family.png, mamba-tech.png, family-hub-*.png, etc.)
```

## Design System
Source of truth: `app/globals.css`. Keep all existing CSS intact.

**Tokens** (in `:root`):
- `--bg: #FAFAF8`, `--surface: #F2F0ED`, `--surface-raised: #ECEAE6`
- `--accent: #E05C3A` (coral), `--accent-light: #F07A5A`, `--accent-dark: #B84928`
- `--text: #111111`, `--text-muted: #6B6965`, `--text-faint: #BBBAB6`
- `--max-w: 1160px`, `--gutter: clamp(20px,5vw,60px)`, `--radius: 14px`

**Typography** (Outfit variable weight):
- 800 = display/hero/section titles
- 300 = contrast midlines, italic accent
- 500/400 = body copy

## Rules
- `'use client'` required on any component using hooks, event listeners, or animations
- Scroll reveals: add `reveal-up` class + optional `style={{ '--delay': 'Xms' }}`; `useReveal()` in `page.js` handles observation
- Card colors: set `--card-color: #hex` inline style on the card element
- Icons: `ph-duotone ph-icon-name` (duotone) or `ph ph-icon-name` (regular)
- Images: use `<img>` with `loading="lazy"` for portfolio; `next/image` optional for hero
- GSAP: only add when enhancing; register plugins inside `useEffect`
- The CSS grain texture on `body::after` and the hero dark background are intentional — do not remove

## Brand
- Business: chuck design · North Port FL 34291 · charles@chuckdesign.com
- Voice: direct, short sentences, no buzzwords ("leverage", "synergy", "solutions")
- Target: local SW Florida small businesses — restaurants, trades, health, professional services
