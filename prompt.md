# TUSAR AHAMMAD — Portfolio Website
## Step-by-Step Implementation Plan (prompt.md)

---

> **IMPORTANT:**
> This file is the master implementation guide for the entire project.
> After completing each Step, update progress.md.
> Do NOT skip any Step.

---

# 🔷 STEP 1 — Project Setup & Initialization

## Task:
Create a Next.js project with App Router and TypeScript.

## Command:
```bash
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

## Install Dependencies:
```bash
npm install framer-motion lucide-react next-intl
```

## Verification:
- [ ] `npm run dev` runs successfully
- [ ] `localhost:3000` shows the default Next.js page
- [ ] `package.json` has all required dependencies
- [ ] TypeScript is working

## Files Created:
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── ...
```

---

# 🔷 STEP 2 — Folder Structure Setup

## Task:
Create the full folder structure as described in architecture.md (Section 53).

## Structure to Create:
```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── portfolio/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── experience/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── hero/
│   ├── about/
│   ├── stats/
│   ├── skills/
│   ├── experience/
│   ├── services/
│   ├── portfolio/
│   ├── testimonials/
│   ├── contact/
│   ├── cta/
│   └── footer/
│
├── data/
│   ├── projects.ts
│   ├── services.ts
│   ├── skills.ts
│   ├── experience.ts
│   ├── education.ts
│   └── testimonials.ts
│
├── i18n/
│   ├── en/
│   │   └── common.json
│   └── ar/
│       └── common.json
│
├── lib/
│   └── utils.ts
│
├── types/
│   └── index.ts
│
└── styles/
    └── fonts.ts
```

## Verification:
- [ ] All folders are created
- [ ] No duplicate folders
- [ ] Each page.tsx has basic placeholder content

---

# 🔷 STEP 3 — Design System & Tailwind Configuration

## Task:
Set up color palette, typography, and design tokens as described in architecture.md (Section 5, 6, 7).

## Add to tailwind.config.ts:

### Colors:
```
Dark Palette:
  primary-dark: #11181D
  secondary-dark: #182127
  card-dark: #202A30
  soft-dark: #263239

Cyan Accent:
  primary-cyan: #19D9E6
  bright-cyan: #42F0F5
  soft-cyan: #8BECEF

Soft Blue Palette:
  bg-blue: #EEF4FF
  card-blue: #F7F9FF
  primary-blue: #6F8FFF
  dark-text: #1D2638
  secondary-text: #5E6B86
  muted-text: #8A96AE
```

### Fonts:
```
English: Inter or Manrope (Google Fonts)
Arabic: IBM Plex Sans Arabic or Noto Sans Arabic (Google Fonts)
```

## Add to globals.css:
- Base styles
- CSS custom properties
- Glass effect utility classes
- Dark cinematic background utilities
- Soft blue glass utilities

## Verification:
- [ ] Tailwind config is error-free
- [ ] Fonts load correctly
- [ ] Color tokens work properly
- [ ] `npm run build` succeeds

---

# 🔷 STEP 4 — Internationalization (i18n) Setup

## Task:
Set up next-intl as described in architecture.md (Section 8-13).

## Sub-tasks:

### 4.1 — next-intl Configuration:
- Create `src/i18n/request.ts`
- Create `src/middleware.ts` (locale detection)
- Add i18n plugin to `next.config.mjs`

### 4.2 — Translation Files:
- `src/i18n/en/common.json` — All English text
- `src/i18n/ar/common.json` — All Arabic text

### 4.3 — Language Detection Logic:
```
Saved preference exists?
  → Yes → Use saved preference
  → No → Check browser language
    → Arabic region? → Arabic
    → Others → English
```

### 4.4 — Language Switcher Component:
- English mode shows: 🌐 العربية
- Arabic mode shows: 🌐 English
- On language change, save to localStorage
- Language switches without page refresh

### 4.5 — RTL Support:
- Arabic mode sets `dir="rtl"` and `lang="ar"`
- English mode sets `dir="ltr"` and `lang="en"`
- Dynamic dir/lang attribute at root layout level

## Verification:
- [ ] `/en` route works
- [ ] `/ar` route works
- [ ] Language switcher works
- [ ] RTL layout is correct
- [ ] Language preference is saved
- [ ] Selected language persists after page refresh

---

# 🔷 STEP 5 — Data Layer Setup

## Task:
Separate all content data into individual files as described in architecture.md (Section 39, 54).

## Files to Create:

### `src/data/skills.ts`
```typescript
// Illustrator — 90%
// SignMaster — 90%
// Roland VersaWorks — 90%
// Photoshop — 80%
// CorelDRAW — 70%
// MS Word — 75%
// PowerPoint — 75%
```

### `src/data/experience.ts`
```typescript
// Design King Company — 2020-2021 — Graphic Designer / Assistant Manager
// Walton Electronics — 2021-2023 — Manager
// Clothing Store — 2023-2024 — Manager
// PADEL IT Company — 2024-2025 — Supervisor (Riyadh, Saudi Arabia)
// Taghareed Company — 2025-Present — Print Machine Operator (Al Hasa, Saudi Arabia)
```

### `src/data/education.ts`
```typescript
// Creative IT Institute — 2019-2021 — Graphic Design
// Bancharampur Degree College — 2020-2022 — Business Management
```

### `src/data/services.ts`
```typescript
// 01 — Logo & Brand Identity
// 02 — Social Media Design
// 03 — Thumbnails & Photo Manipulation
// 04 — Menus, Print & UV Production
// 05 — Packaging Design
// 06 — Print-Ready Design
```

### `src/data/projects.ts`
```typescript
// Placeholder structure — update later with actual portfolio data
// Each project: id, slug, title, category, year, thumbnail, heroImage,
// description, overview, challenge, concept, typography, colors, gallery, tools
```

### `src/types/index.ts`
- Define types for Project, Skill, Experience, Education, Service, Testimonial

## Verification:
- [ ] All data files are TypeScript error-free
- [ ] Types are properly exported
- [ ] Data can be imported successfully

---

# 🔷 STEP 6 — Navigation Component

## Task:
Build the Navbar as described in architecture.md (Section 14-15).

## Components to Create:
- `src/components/navigation/Navbar.tsx`
- `src/components/navigation/MobileMenu.tsx`
- `src/components/navigation/LanguageSwitcher.tsx`

## Desktop Navbar:
```
TUSAR AHAMMAD  |  Home  About  Portfolio  Experience  Services  Contact  |  🌐 العربية
```
- Sticky position
- Transparent → Glass/blur on scroll (Framer Motion + scroll event)
- Glassmorphic effect

## Mobile Navbar:
```
T. TUSAR AHAMMAD  |  🌐 العربية  ☰
```
- Hamburger menu → Clean slide-in panel
- All links + language switcher

## RTL Support:
- All elements reverse in Arabic mode
- Menu items RTL aligned

## Verification:
- [ ] Desktop navbar is visible
- [ ] Mobile menu works
- [ ] Glass effect on scroll works
- [ ] Language switcher works
- [ ] RTL mode is correct
- [ ] Keyboard accessible
- [ ] No console errors

---

# 🔷 STEP 7 — Hero Section

## Task:
Build the Hero section as described in architecture.md (Section 16-17).

## Component:
`src/components/hero/Hero.tsx`

## Content:
```
HELLO, I'M
TUSAR AHAMMAD
Graphic Designer
Brand Identity Designer

I create meaningful visual identities,
professional designs and print-ready
creative solutions.

[VIEW MY WORK]  [WORK WITH ME]
```

## Visual:
- Dark cinematic background (#11181D base)
- Cyan accent highlights (#19D9E6)
- Soft gradients
- Subtle glow effects
- Right side: Professional profile image / floating portfolio cards
- Floating design elements

## Animation (Framer Motion):
```
Nav → "Hello, I'm" → Name → Title → Description → CTA Buttons → Visual
```
- Fade in + Slide up sequence
- Staggered timing
- Subtle floating motion on decorative elements

## Verification:
- [ ] Hero displays correctly
- [ ] Animations are smooth
- [ ] Dark cinematic feel is present
- [ ] CTA buttons work
- [ ] Mobile responsive
- [ ] Arabic version is correct
- [ ] RTL layout is correct

---

# 🔷 STEP 8 — Statistics Section

## Task:
Build Statistics cards as described in architecture.md (Section 18).

## Component:
`src/components/stats/Stats.tsx`

## Cards:
```
6+ Years of Experience
5 Companies Worked With
2 Countries Worked In
7+ Design Projects
```

> ⚠️ These numbers must be verified against actual data before final publication.

## Visual:
- Rounded corners
- Glass effect (Soft Blue palette)
- Soft shadows
- Blue accents
- Large typography
- Count-up animation on viewport enter

## Verification:
- [ ] All 4 cards are visible
- [ ] Animation works
- [ ] Mobile responsive
- [ ] RTL support
- [ ] Numbers are verified

---

# 🔷 STEP 9 — About Me Section

## Task:
Build the About section as described in architecture.md (Section 19-21).

## Components:
- `src/components/about/About.tsx`
- `src/components/about/SkillChecklist.tsx`

## Content:
- Heading: "ABOUT ME"
- Subtitle: "Designing for screen and print"
- Biography text
- Career summary
- Skills checklist:
```
✓ Logo, monogram and brand identity design
✓ Social media and Instagram carousel design
✓ YouTube thumbnails and posters
✓ Photo manipulation
✓ Menu design
✓ Print-ready file preparation
✓ UV printing
✓ Banner printing
✓ Sticker production
✓ Sign cutting
✓ SignMaster
✓ Roland VersaWorks
✓ CorelDRAW
✓ AI-assisted design workflow
✓ MS Word
✓ PowerPoint
✓ Operations management
```

## Visual:
- Large rounded content card
- Soft Blue Glass mode
- Clean checkmark list
- Scroll reveal animation

## Verification:
- [ ] About section is correct
- [ ] Checklist is visible
- [ ] Mobile responsive
- [ ] Arabic version works
- [ ] RTL layout is correct

---

# 🔷 STEP 10 — Skills Section

## Task:
Build the Skills section as described in architecture.md (Section 22-26).

## Components:
- `src/components/skills/Skills.tsx`
- `src/components/skills/CircularSkillCard.tsx`
- `src/components/skills/HorizontalSkillBar.tsx`

## Data (from src/data/skills.ts):
```
Illustrator — 90%
SignMaster — 90%
Roland VersaWorks — 90%
Photoshop — 80%
CorelDRAW — 70%
MS Word — 75%
PowerPoint — 75%
```

## Circular Cards:
- Software icon (Lucide React / custom SVG)
- Circular progress ring (SVG)
- Percentage text
- Software name
- Animation: 0% → target% on viewport enter

## Horizontal Bars:
- Software name
- Progress bar
- Percentage
- Animation: 0 → target width on viewport enter

## Layout:
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1-2 columns

## Verification:
- [ ] Circular cards animate correctly
- [ ] Horizontal bars animate correctly
- [ ] Responsive layout works
- [ ] No redundant display (avoid showing both simultaneously)
- [ ] RTL support
- [ ] Arabic labels work

---

# 🔷 STEP 11 — Education & Experience Timeline

## Task:
Build the Timeline as described in architecture.md (Section 27-30).

## Components:
- `src/components/experience/Timeline.tsx`
- `src/components/experience/TimelineItem.tsx`

## Education Data:
```
Creative IT Institute — 2019-2021 — Graphic Design
Bancharampur Degree College — 2020-2022 — Business Management
```

## Experience Data:
```
Design King Company — 2020-2021 — Graphic Designer / Assistant Manager (Brahmanbaria, Bangladesh)
Walton Electronics — 2021-2023 — Manager (Bangladesh)
Clothing Store — 2023-2024 — Manager (Bangladesh)
PADEL IT Company — 2024-2025 — Supervisor (Riyadh, Saudi Arabia)
Taghareed Company — 2025-Present — Print Machine Operator (Al Hasa, Saudi Arabia)
```

## Visual:
- Vertical timeline line
- Circular markers
- Date badges
- Large rounded content cards
- Soft blue background
- White border
- Subtle shadow
- Sequential reveal animation (Framer Motion)

## RTL:
- Timeline layout reverses in Arabic mode

## Verification:
- [ ] Timeline displays correctly
- [ ] All entries are visible
- [ ] Animation works
- [ ] Mobile responsive
- [ ] RTL is correctly reversed
- [ ] Dates are verified

---

# 🔷 STEP 12 — Services Section

## Task:
Build the Services section as described in architecture.md (Section 31-33).

## Components:
- `src/components/services/Services.tsx`
- `src/components/services/ServiceCard.tsx`

## Services:
```
01 — Logo & Brand Identity
02 — Social Media Design
03 — Thumbnails & Photo Manipulation
04 — Menus, Print & UV Production
05 — Packaging Design
06 — Print-Ready Design
```

## Card Design:
```
┌─────────────────────────────┐
│ Icon                      01│
│                             │
│ Logo & Brand Identity       │
│                             │
│ Monograms, logotypes and    │
│ complete visual identity... │
└─────────────────────────────┘
```

## Hover Effect:
- Slight elevation
- Border highlight
- Accent glow
- Arrow movement

## Verification:
- [ ] All 6 service cards are visible
- [ ] Hover effects work
- [ ] Mobile responsive
- [ ] RTL support
- [ ] Arabic translations work

---

# 🔷 STEP 13 — Portfolio Section

## Task:
Build the Portfolio grid as described in architecture.md (Section 34-37).

## Components:
- `src/components/portfolio/PortfolioGrid.tsx`
- `src/components/portfolio/PortfolioCard.tsx`
- `src/components/portfolio/CategoryFilter.tsx`

## Categories:
```
All | Logo | Brand Identity | Social Media | Poster | Packaging | Print | UV Production
```

## Grid Layout:
- Desktop: 2-column or asymmetric editorial grid
- Tablet: 2 columns
- Mobile: 1 column

## Card Content:
- Project image
- Category badge
- Project title
- Optional description
- View project link

## Hover Effect (Desktop):
```
Image zoom + Dark overlay + Title + Category + "View Project →"
```

## Verification:
- [ ] Portfolio grid displays
- [ ] Category filtering works
- [ ] Hover effects work
- [ ] Mobile responsive
- [ ] RTL support
- [ ] Links work

---

# 🔷 STEP 14 — Project Detail Pages

## Task:
Build dynamic project pages as described in architecture.md (Section 38-39).

## Route:
`/[locale]/portfolio/[slug]/page.tsx`

## Page Structure:
```
Project Title
Category | Year
Hero Image
Project Overview
Challenge
Concept
Design Direction
Typography
Color Palette
Logo Development
Mockups
Final Design
Related Projects
```

## Data Architecture:
- Data loads from `src/data/projects.ts`
- Project is found by slug
- Related projects suggestion

## Verification:
- [ ] Dynamic routes work
- [ ] Project data loads correctly
- [ ] Gallery images display
- [ ] Related projects display
- [ ] Mobile responsive
- [ ] RTL support
- [ ] 404 is handled for non-existent slugs

---

# 🔷 STEP 15 — CTA Section

## Task:
Build the Call-to-Action section as described in architecture.md (Section 41).

## Component:
`src/components/cta/CTA.tsx`

## Content:
```
HAVE A PROJECT IN MIND?

Let's create something
remarkable together.

[WORK WITH ME →]
```

## Visual:
- Dark cinematic background
- Soft cyan gradient
- Large typography
- Minimal decoration

## Verification:
- [ ] CTA displays correctly
- [ ] Button works (navigates to Contact page)
- [ ] Mobile responsive
- [ ] Arabic version works

---

# 🔷 STEP 16 — Contact Section

## Task:
Build the Contact section as described in architecture.md (Section 42-43).

## Components:
- `src/components/contact/Contact.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/components/contact/ContactInfo.tsx`

## Contact Info:
- Email
- Phone
- WhatsApp
- Behance
- LinkedIn
- Fiverr

## Form Fields:
```
Name (required)
Email (required, validated)
Service (dropdown)
Message (required)

[SEND MESSAGE]
```

## Form States:
- Idle → Loading → Success / Error
- Required field validation
- Email format validation
- Accessible labels
- Spam protection (honeypot field or equivalent)

## Verification:
- [ ] Contact info displays
- [ ] Form works
- [ ] Validation works
- [ ] Loading state displays
- [ ] Success/Error states display
- [ ] Mobile responsive
- [ ] RTL support
- [ ] Accessible (keyboard, screen reader)

---

# 🔷 STEP 17 — Footer

## Task:
Build the Footer as described in architecture.md (Section 44).

## Component:
`src/components/footer/Footer.tsx`

## Content:
```
TUSAR AHAMMAD
Creative designer and print production specialist based in Al Hasa, Saudi Arabia.

PAGES: Home | About | Portfolio | Experience | Services | Contact
GET IN TOUCH: Email | Phone | WhatsApp
Social: Behance | LinkedIn | WhatsApp

© 2026 Md Tusar Ahammad. All rights reserved.
```

## Visual:
- Large rounded footer card
- Soft Blue Glass mode
- Clean layout

## Verification:
- [ ] Footer displays
- [ ] All links work
- [ ] Social icons work
- [ ] Mobile responsive
- [ ] RTL support
- [ ] Copyright text is correct

---

# 🔷 STEP 18 — Back-to-Top Button

## Task:
Build the floating button as described in architecture.md (Section 45).

## Component:
`src/components/layout/BackToTop.tsx`

## Visual:
- Circular button
- Blue gradient
- Soft shadow
- White arrow icon
- Fixed bottom-right position

## Behavior:
- Appears after scrolling down
- Smooth scroll to top on click
- Keyboard accessible
- Position adjusts in Arabic mode

## Verification:
- [ ] Button appears/disappears correctly
- [ ] Smooth scroll works
- [ ] Keyboard accessible
- [ ] RTL position is correct

---

# 🔷 STEP 19 — Testimonials Section (Conditional)

## Task:
As described in architecture.md (Section 40) — implement this section ONLY if verified testimonials are available.

## Component:
`src/components/testimonials/Testimonials.tsx`

## Rules:
- ❌ Do NOT create fake testimonials
- ✅ If no real testimonials exist, skip this section
- ✅ Keep the component structure ready for future additions

---

# 🔷 STEP 20 — Animation System Polish

## Task:
Refine all animations as described in architecture.md (Section 48).

## Animation Checklist:
- [ ] Page entrance animations
- [ ] Section reveal on scroll (viewport intersection)
- [ ] Staggered card animations
- [ ] Portfolio image zoom + overlay
- [ ] Skill circular progress animation
- [ ] Skill horizontal bar animation
- [ ] Timeline sequential reveal
- [ ] Navigation scroll state transition
- [ ] Floating decorative elements (subtle)
- [ ] Hover effects on cards and buttons
- [ ] Page transitions (if appropriate)

## Rules:
- Use Framer Motion
- Respect `prefers-reduced-motion`
- Avoid excessive animation
- Keep animations performance-friendly

## Verification:
- [ ] All animations are smooth
- [ ] Animations are disabled in reduced motion mode
- [ ] No jank or lag
- [ ] Animations are performant on mobile

---

# 🔷 STEP 21 — Responsive Optimization

## Task:
Test and fix all breakpoints as described in architecture.md (Section 46-47).

## Test at these widths:
```
320px  → Small phone
375px  → iPhone SE
425px  → Large phone
768px  → Tablet
1024px → Small laptop
1280px → Laptop
1440px → Desktop
1920px → Large desktop
```

## Fix:
- [ ] No horizontal overflow
- [ ] Typography is readable
- [ ] Cards are proper size
- [ ] Navigation is correct
- [ ] Timeline is correct
- [ ] Portfolio grid is correct
- [ ] Images are correct
- [ ] RTL behavior is correct
- [ ] Touch-friendly buttons (minimum 44x44px)
- [ ] No content cutoff

---

# 🔷 STEP 22 — Accessibility

## Task:
Implement accessibility as described in architecture.md (Section 49).

## Checklist:
- [ ] Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- [ ] Proper heading hierarchy (single `<h1>` per page)
- [ ] Alt text on all images
- [ ] Keyboard navigation works
- [ ] Visible focus states (`:focus-visible`)
- [ ] Accessible buttons (`aria-label` where needed)
- [ ] Form labels properly associated
- [ ] Sufficient color contrast (WCAG AA)
- [ ] `prefers-reduced-motion` support
- [ ] Screen reader friendly navigation
- [ ] Skip to main content link
- [ ] ARIA landmarks

---

# 🔷 STEP 23 — SEO Implementation

## Task:
Implement SEO as described in architecture.md (Section 50-51).

## Requirements:

### Page-level Metadata:
- Title tags (unique per page)
- Meta descriptions
- Open Graph tags (og:title, og:description, og:image)
- Twitter Card tags

### Technical SEO:
- Canonical URLs
- Sitemap.xml (Next.js generateSitemap)
- Robots.txt
- Structured data (JSON-LD — Person, LocalBusiness)

### Multilingual SEO:
- `hreflang` tags (en, ar)
- Language-specific metadata
- Correct `lang` and `dir` attributes

### Image SEO:
- Alt text on all images
- Optimized image sizes

## Verification:
- [ ] All meta tags present in HTML source
- [ ] `/sitemap.xml` is accessible
- [ ] `/robots.txt` is accessible
- [ ] Open Graph preview is correct
- [ ] hreflang tags are correct

---

# 🔷 STEP 24 — Performance Optimization

## Task:
Optimize performance as described in architecture.md (Section 55).

## Checklist:
- [ ] Next.js `<Image>` component used for all images
- [ ] Responsive image sizes (srcSet)
- [ ] Lazy loading for below-the-fold content
- [ ] Font optimization (next/font)
- [ ] Client vs Server components properly separated
- [ ] Bundle size minimized
- [ ] Animation performance (GPU-accelerated transforms)
- [ ] No unnecessary dependencies
- [ ] Core Web Vitals check (LCP, FID, CLS)

---

# 🔷 STEP 25 — Security Check

## Task:
Verify security as described in architecture.md (Section 56).

## Checklist:
- [ ] No API keys are exposed
- [ ] `.env.local` is used for private config
- [ ] `.gitignore` includes `.env.local`
- [ ] Form submission is secure (CSRF protection if applicable)
- [ ] No secrets in client-side code

---

# 🔷 STEP 26 — Final QA & Testing

## Task:
Complete full QA as described in architecture.md (Section 61, Phase 20).

## Test Matrix:

### Functionality:
- [ ] Navigation works
- [ ] Language switch works
- [ ] Portfolio filters work
- [ ] Project detail pages work
- [ ] Contact form works
- [ ] Back-to-top works
- [ ] Mobile menu works

### Languages:
- [ ] English is correct on all pages
- [ ] Arabic is correct on all pages
- [ ] LTR layout is correct
- [ ] RTL layout is correct

### Devices:
- [ ] Mobile (320-425px)
- [ ] Tablet (768px)
- [ ] Laptop (1024-1280px)
- [ ] Desktop (1440-1920px)

### Accessibility:
- [ ] Keyboard navigation
- [ ] Focus states visible
- [ ] Contrast sufficient
- [ ] Screen reader basics

### Performance:
- [ ] Images optimized
- [ ] Animations smooth
- [ ] Fast loading
- [ ] No layout shifts

### Console:
- [ ] No JavaScript errors
- [ ] No TypeScript errors
- [ ] No warnings

---

# 🔷 STEP 27 — Production Build & Deployment

## Task:
Deploy to production as described in architecture.md (Phase 21).

## Commands:
```bash
npm run lint          # Lint check
npx tsc --noEmit      # Type check
npm run build         # Production build
```

## Deployment:
- Deploy to Vercel
- Connect `tusarahammad.com` domain
- Configure HTTPS

## Post-deployment Verification:
- [ ] Production build successful
- [ ] Vercel deployment successful
- [ ] Domain connected
- [ ] HTTPS working
- [ ] Sitemap accessible
- [ ] Robots.txt accessible
- [ ] SEO metadata correct
- [ ] English version is live and correct
- [ ] Arabic version is live and correct
- [ ] RTL working on production
- [ ] Mobile and desktop tested on production

---

# 📋 Progress Tracking

After completing each Step, update `progress.md`:

```markdown
# Project Progress

## Step 1 — Project Setup
Status: ✅ Completed / 🔄 In Progress / ⬜ Not Started
Files Changed: [list]
Issues: [if any]

## Step 2 — Folder Structure
Status: ⬜ Not Started
...
```

---

# ⚠️ Important Rules (Always Remember)

1. **Do NOT create fake data** — statistics, testimonials, portfolio projects must all be verified
2. **Do NOT create duplicate files/components** — reuse first
3. **Read architecture.md and prompt.md before starting any work**
4. **Verify after each Step** — lint, build, visual check
5. **Update progress.md** after each Step
6. **Do NOT copy the reference website** — create an original design
7. **Arabic RTL is not just text translation** — the entire layout must be RTL
8. **Performance first** — avoid unnecessary animations/dependencies
9. **Accessibility first** — semantic HTML, keyboard nav, contrast
10. **Mobile first** — test responsive design at all breakpoints
