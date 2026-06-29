# chuck design — chuckdesign.com

Marketing site for **chuck design**, a web design studio based in North Port, FL 34291 serving Southwest Florida small businesses. Built by Charles Spivey.

**Live:** chuckdesign.com · **Stack:** Next.js 16 App Router · Tailwind v4 · Vercel

---

## Table of contents

1. [Quick start](#quick-start)
2. [Project structure](#project-structure)
3. [Design philosophy](#design-philosophy)
4. [Color system](#color-system)
5. [Typography](#typography)
6. [Layout system](#layout-system)
7. [Component guide](#component-guide)
8. [CSS architecture](#css-architecture)
9. [Animation system](#animation-system)
10. [Card system](#card-system)
11. [Voice and tone](#voice-and-tone)
12. [What not to change](#what-not-to-change)
13. [Pre-launch checklist](#pre-launch-checklist)

---

## Quick start

```bash
npm run dev     # localhost:3000
npm run build   # production build
vercel          # deploy to production
```

**Routes:**
- `/` — main marketing site
- `/portfolio` — 20-project circular carousel
- `/sitemap.xml` — auto-generated via `app/sitemap.js`

---

## Project structure

```
app/
  layout.js           fonts, metadata, JSON-LD, Phosphor CDN, security headers
  page.js             client component — lightbox state + scroll reveal hook
  globals.css         THE design system — do not convert to Tailwind utilities
  not-found.js        branded 404 page
  sitemap.js          sitemap for / and /portfolio
  portfolio/
    layout.js         route metadata
    page.js           client component — circular carousel, touch/wheel/keyboard nav
    portfolio.css     dark-theme styles scoped with pf- prefix

components/
  Nav.jsx             scroll state, mobile drawer, active link tracking
  Hero.jsx            static — CSS handles all animations
  FilmSlate.jsx       static — marquee ticker
  Services.jsx        3D card tilt on mousemove
  Process.jsx         IntersectionObserver rail fill + step activation
  Work.jsx            drag-scroll portfolio rail, lightbox trigger
  About.jsx           static
  Contact.jsx         controlled form → Formspree (endpoint: mdaraoaw)
  Footer.jsx          static
  Lightbox.jsx        zoom on wheel/click/pinch, iOS scroll lock

hooks/
  useReveal.js        IntersectionObserver → .reveal-up to .visible

public/images/
  p01–p20.png         portfolio screenshots (the 20 live client projects)
  family.png          about portrait
  mamba-tech.png      work section
  family-hub-*.png    work section
  og-image.jpg        social share preview (1200×630)
  favicon.svg         browser tab icon
```

---

## Design philosophy

This site is built on **Direction C** — the approved visual direction for chuck design.

The brief was: *a web design studio in a competitive local market needs to look like the most serious option in the room without feeling corporate or cold.* The solution is a light-mode site with a dark hero block, a coral accent that reads as confident rather than loud, and typography that uses weight contrast (800 vs 300 within a single headline) to create visual interest without relying on decorative elements.

**Three principles that must survive any update:**

1. **Restraint over decoration.** The site has almost no graphic elements — no illustrations, no icons used decoratively, no complex layouts. The work is the decoration. Every pixel that doesn't help a prospect take action should be questioned.

2. **Weight is the hierarchy.** Outfit at 800 vs 300 within the same line does more visual work than color or size changes. This contrast is the brand's signature. Do not flatten it.

3. **The hero is dark. The body is light.** This is intentional. The dark hero (#111111 background) creates a strong first impression and separates the site from every light-mode competitor. The transition to the warm off-white body feels like stepping from a premium space into a working one. Do not change either background.

---

## Color system

All tokens live in `app/globals.css :root`. Never hardcode a hex value in a component.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#FAFAF8` | Page background — warm off-white, not pure white |
| `--surface` | `#F2F0ED` | Card backgrounds, section alternates |
| `--surface-raised` | `#ECEAE6` | Elevated elements, tag chips |
| `--accent` | `#E05C3A` | Coral — the only true brand color |
| `--accent-light` | `#F07A5A` | Hover highlights |
| `--accent-dark` | `#B84928` | Pressed states, deeper hover |
| `--text` | `#111111` | Body text — not pure black |
| `--text-muted` | `#6B6965` | Secondary copy, descriptions |
| `--text-faint` | `#BBBAB6` | Labels, metadata, timestamps |
| `--border` | `rgba(0,0,0,0.08)` | Hairline borders — never solid grey |
| `--border-mid` | `rgba(0,0,0,0.13)` | Slightly stronger borders on hover |

**Why warm tones everywhere:** `#FAFAF8` instead of `#FFFFFF` and `#111111` instead of `#000000`. Pure black and white feel clinical and cheap on screens. The slight warmth is invisible to most visitors but makes everything feel more considered.

**The coral (#E05C3A)** is used sparingly and purposefully: eyebrow labels, active nav indicators, CTA buttons, the accent dot in the logo, and hover states. It should never appear in body copy or as a background fill outside the hero CTA button.

---

## Typography

**Fonts:** Outfit (variable weight, 300–800) + Geist Mono (400/500) loaded via `next/font/google`.

| Weight | Use |
|---|---|
| 800 | Hero title, section titles, card titles, wordmark |
| 700 | Button labels, nav links |
| 600 | Form labels, strong UI text |
| 500 | Body labels, eyebrow text |
| 400 | Body copy, descriptions |
| 300 | Italic contrast lines, the "design" in the wordmark |

**Geist Mono** is used exclusively for: eyebrow labels (`font-size: 11px`, `letter-spacing: 0.2em`, uppercase), monospace metadata (step numbers, tags, timestamps), and the film-slate ticker. It is never used for body copy.

**The weight-contrast headline pattern** — used in the hero and implied in section headers:

```
HEAVY LINE          ← 800 weight, tight tracking
light italic line   ← 300 weight, coral color, slightly looser
```

This is the site's visual signature. Any new headline that tries to achieve drama through size instead of weight contrast is working against the brand.

**Text sizing** uses `clamp()` throughout for fluid scaling. The hero title is `clamp(56px, 13vw, 192px)`. Never use fixed px sizes for display text.

---

## Layout system

| Token | Value | Use |
|---|---|---|
| `--max-w` | `1160px` | Content max width |
| `--gutter` | `clamp(20px, 5vw, 60px)` | Horizontal page padding |
| `--radius` | `14px` | Cards, large containers |
| `--radius-sm` | `8px` | Buttons, inputs, small chips |
| `--ease-out` | `cubic-bezier(0.16,1,0.3,1)` | All transitions — fast in, slow out |

All page sections use `padding: clamp(120px, 16vh, 200px) 0` for vertical rhythm. This keeps vertical spacing proportional at any viewport height — do not override it with fixed padding.

The `.section-inner` wrapper (`max-width: var(--max-w); margin: 0 auto; padding: 0 var(--gutter)`) is used on every section. Do not create new layout patterns — use this class.

---

## Component guide

### Nav
Fixed, 64px tall. Starts transparent (over the dark hero). Gains a frosted glass background (`backdrop-filter: blur(24px) saturate(160%)`) after 60px of scroll. Mobile drawer slides in from above at `top: 64px`. Uses iOS-compatible `position: fixed` scroll lock when drawer is open — do not replace this with `overflow: hidden` which does not work on iOS Safari.

### Hero
Static server component — all animation is CSS (`@keyframes fade-up`, staggered `animation-delay`). The dark background (`#111111`) and the coral radial glow at bottom-right are load-bearing brand elements. The headline uses weight 800/300 contrast. The subtitle fades in at 1.1s delay, the CTA group at 1.3s.

### FilmSlate
Marquee ticker. Pauses on hover. The text content is the list of service areas and offerings — update it if services change.

### Services
Six service cards in an asymmetric grid (featured card spans 2 columns, wide card spans 3 at desktop). Each card has a `--card-color` CSS variable that controls its individual glow and gradient border. Cards use a 3D tilt effect on `mousemove` (Services.jsx). The tilt is purely cosmetic — do not add it to other card types.

### Process
Four-step process with an animated fill rail. The rail fires once when the section enters the viewport (`IntersectionObserver`, `threshold: 0.35`). Steps activate with staggered 260ms delays. The rail is hidden at tablet breakpoint — the steps reflow to 2×2 grid.

### Work
Two sections: an industry card grid and a horizontal scroll portfolio rail. The rail supports mouse drag-to-scroll on desktop and native touch scroll on mobile with `scroll-snap-type: x mandatory`. Portfolio cards open the Lightbox on click. The "View full portfolio →" link above the rail routes to `/portfolio`.

### About
Static. Uses `family.png` as the portrait. The quote, bio copy, area tags, and local note are all real content — they define the personal brand voice. Do not genericize them.

### Contact
Controlled React form. Submits to Formspree endpoint `mdaraoaw`. Validates inline on blur, shows field-level errors. On success, resets the form and shows a confirmation message. The form endpoint is real and live — test submissions go to charles@chuckdesign.com.

### Lightbox
Shared across the main site (Work section) and the portfolio page. Supports scroll-wheel zoom (desktop), click-to-toggle zoom, pinch-to-zoom (iOS), and keyboard Escape. Uses iOS-compatible `position: fixed` scroll lock. The hint text swaps to "Pinch to zoom · Tap outside to close" on touch devices via `@media (hover: none) and (pointer: coarse)`.

### Portfolio page (`/portfolio`)
Standalone dark-themed page. Uses a circular carousel algorithm (`circDist`) so all 20 cards form a continuous loop — scrolling past card 20 wraps back to card 1. Card transforms are applied directly to DOM nodes via `useRef` (not React state) for 60fps animation without re-renders. Navigation: scroll wheel, touch swipe (>40px), arrow keys, click on off-center cards.

---

## CSS architecture

`app/globals.css` is the single source of truth for the design system. **Do not split it, do not convert it to Tailwind utilities, do not create component-level CSS modules for the main site.**

Tailwind v4 is imported via `@import "tailwindcss"` and registers the brand tokens as theme values, but the actual design system lives in hand-authored CSS below that import. This is intentional — Tailwind utility classes are available as a convenience but the design system has no dependency on them.

**Rules:**
- All design tokens are CSS custom properties in `:root` — use them everywhere
- All component styles are class-based and live in `globals.css`
- The portfolio page is the only exception: it imports `portfolio.css` locally because it has a completely different dark theme, and all its classes are prefixed `pf-` to prevent conflicts
- `card-color` theming uses `--card-color: #hex` set inline on the card element; the CSS reads it via `var(--card-color, var(--accent))`

---

## Animation system

**Scroll reveals** use the `reveal-up` class + `useReveal` hook (IntersectionObserver). Elements start at `opacity: 0; transform: translateY(28px)` and transition to visible when 12% of the element enters the viewport. Add stagger with `style={{ '--delay': '100ms' }}`.

**Hero animations** are pure CSS `@keyframes fade-up` with staggered `animation-delay` values on each element. They fire once on load and do not repeat.

**All transitions** use `--ease-out: cubic-bezier(0.16,1,0.3,1)` — a spring-like ease that feels fast and physical. Do not use `ease-in-out` or `linear` anywhere on user-facing transitions.

**Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables all animations and transitions site-wide. This is non-negotiable — do not add animations that bypass this media query.

---

## Card system

Cards (service, work, portfolio) share a consistent hover system built on two CSS pseudo-elements:

- `::before` — radial gradient glow that fades in on hover, positioned at bottom-left
- `::after` — gradient border using CSS mask technique (not a real border):

```css
background: linear-gradient(135deg, var(--card-color), transparent 60%);
-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
-webkit-mask-composite: xor;
mask-composite: exclude;
```

This creates a gradient border that only appears on hover without affecting layout. The card's actual border becomes transparent on hover. Do not replace this with `box-shadow` or `outline` — it will not produce the same result.

---

## Voice and tone

chuck design targets **Southwest Florida small business owners** — restaurants, trades, health practices, real estate. They are not technical. They have been burned by cheap websites before. They want results, not jargon.

**Rules:**
- Short sentences. No sentence should be more than 20 words.
- No buzzwords: "leverage", "synergy", "solutions", "ecosystem", "holistic", "seamless"
- Talk about outcomes, not process: "fills tables" not "restaurant-optimized web presence"
- First person is fine: "I'll" not "we will"
- Florida geography is specific: North Port, Sarasota, Venice, Englewood, Port Charlotte. Not "Southwest Florida" alone.
- The name is always lowercase: **chuck design** — not "Chuck Design", not "CHUCK DESIGN"

---

## What not to change

These are the decisions that define the brand. Changing them without a deliberate redesign process will dilute the visual identity:

| Element | Why it exists |
|---|---|
| Dark hero block (`#111111`) | Creates premium first impression, separates from all-light competitors |
| Coral accent (`#E05C3A`) | The only brand color — its scarcity is what makes it work |
| Warm off-white body (`#FAFAF8`) | Warmth reads as approachable and crafted, not clinical |
| Outfit 800/300 weight contrast | The typographic signature — this IS the brand's visual voice |
| Grain texture on `body::after` | Adds tactility, prevents the site from looking like a template |
| `--ease-out` cubic-bezier on all transitions | Every interaction feels fast and intentional |
| Geist Mono for metadata only | Keeps the monospace feel contained and purposeful |
| No decorative illustrations or icons | The work speaks — decoration competes with it |

---

## Pre-launch checklist

### 🔴 Still needed

- [ ] **`public/images/apple-touch-icon.png`** — 180×180 PNG. Referenced in `app/layout.js:39`. iOS home screen icon silently fails without it.
- [ ] **Google Analytics or Vercel Analytics** — no tracking is installed. Vercel Analytics takes one click in the dashboard. GA4 needs a measurement ID added to `app/layout.js`.
- [ ] **Privacy policy page** — contact form collects name, email, phone, message. Add `app/privacy/page.js` and link it in the footer.
- [ ] **Confirm About portrait** — `components/About.jsx` uses `public/images/family.png`. Verify this is the client-facing photo.
- [ ] **Social links in footer** — `components/Footer.jsx` has no social links. Add if Instagram/Facebook/LinkedIn profiles exist.
- [ ] **Pricing signal** — optional, but a "starting at $X" line filters bad-fit leads before they call.

### ✅ Done

- [x] `robots.txt` — `public/robots.txt`
- [x] Sitemap — `app/sitemap.js`
- [x] Custom 404 — `app/not-found.js`
- [x] Portfolio discoverable — "View full portfolio →" in Work section
- [x] Security headers — `next.config.mjs`
- [x] iOS mobile audit — scroll lock, 44px touch targets, form zoom fix, pinch-to-zoom lightbox
- [x] Form endpoint — Formspree `mdaraoaw` live in `components/Contact.jsx`
- [x] `/portfolio` route — 20-project carousel at `app/portfolio/`
