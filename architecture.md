# TUSAR AHAMMAD — Personal Portfolio Website
## Master Architecture & Implementation Plan

---

# 1. Project Overview

This project is the official personal portfolio website for:

**TUSAR AHAMMAD**

Professional Title:

**Graphic Designer & Brand Identity Designer**

Secondary Specialization:

**Print Production / Print Machine Operator**

Website:

**https://tusarahammad.com**

The website will present Tusar Ahammad's:

- Graphic design expertise
- Logo design
- Brand identity work
- Social media design
- Poster and thumbnail design
- Print design
- UV printing experience
- Banner and sticker production
- Sign cutting and RIP software experience
- Professional education
- Career experience
- Portfolio projects
- Freelance services
- Contact information

The website must feel:

- Premium
- Modern
- Minimal
- Professional
- Creative
- Cinematic
- Fast
- Responsive
- Accessible
- SEO-friendly

---

# 2. Design References

The design direction is based on three reference sources.

## 2.1 Reference Website

Reference:

https://tofayelahamed.com/

The website may be studied for:

- Information architecture
- Section organization
- Navigation structure
- Portfolio presentation
- Education and experience presentation
- Services presentation
- CTA structure
- Contact structure
- Professional portfolio flow

### Important

The reference website must NOT be copied.

Do not copy:

- Branding
- Logo
- Text
- Images
- Identity
- Exact layout
- Exact design
- Exact visual assets

The final website must be an original design for TUSAR AHAMMAD.

---

# 3. Visual Design References

## 3.1 Dark Gaming UI Reference

The supplied dark gaming/mobile UI image is used as inspiration for:

- Premium visual quality
- Dark cinematic backgrounds
- Charcoal surfaces
- Cyan accents
- Floating cards
- Layered UI
- Soft shadows
- Glass effects
- Modern interface presentation
- Depth
- Visual hierarchy

## 3.2 Soft Blue Portfolio References

The supplied screenshots are used as visual references for:

- Soft blue/lavender backgrounds
- Large rounded cards
- Glassmorphism
- White translucent borders
- Blue/lavender accents
- Circular skill progress cards
- Horizontal skill progress bars
- Education and experience timeline
- Large experience cards
- Numbered service cards
- Statistics cards
- About section
- Premium footer
- Mobile navigation
- Floating back-to-top button

The screenshots are design references only.

Do not blindly duplicate them.

The final implementation must be an original portfolio design.

---

# 4. Core Technology Stack

## Frontend

- Next.js
- App Router
- TypeScript
- React

## Styling

- Tailwind CSS

## Animation

- Framer Motion

## Icons

- Lucide React

## Internationalization

- next-intl or an equivalent production-ready i18n solution

## Images

- Next.js Image
- Optimized responsive images

## Deployment

- Vercel

## Domain

- https://tusarahammad.com

---

# 5. Design System

The website will combine two visual modes:

### Dark Cinematic Mode

Used primarily for:

- Hero
- Featured projects
- Major visual sections
- Project presentation
- Special CTA areas

### Soft Blue Glass Mode

Used primarily for:

- About
- Skills
- Experience
- Services
- Contact
- Footer
- Supporting content sections

The two visual systems must feel like one consistent brand.

---

# 6. Color Palette

## Dark Palette

```text
Primary Dark:
#11181D

Secondary Dark:
#182127

Card Dark:
#202A30

Soft Dark Surface:
#263239
Cyan Accent
Primary Cyan:
#19D9E6

Bright Cyan:
#42F0F5

Soft Cyan:
#8BECEF
Soft Blue Palette
Background:
#EEF4FF

Card:
#F7F9FF

Primary Blue:
#6F8FFF

Dark Text:
#1D2638

Secondary Text:
#5E6B86

Muted Text:
#8A96AE
Design Rules
Do not overuse cyan.
Do not overuse glow effects.
Maintain strong contrast.
Use gradients subtly.
Use shadows to create depth.
Use borders sparingly.
Maintain visual hierarchy.
Keep the interface clean and professional.
7. Typography
English

Use a modern professional sans-serif font.

Preferred options:

Inter
Manrope

The final font must be selected based on readability and visual consistency.

Arabic

Use a modern Arabic font such as:

IBM Plex Sans Arabic
Noto Sans Arabic

The Arabic font must support:

Arabic characters
Numbers
Punctuation
Multiple screen sizes
Proper RTL rendering

Typography must remain consistent throughout the website.

8. Internationalization Architecture

The website must support two languages:

English
Arabic
9. English Version

English is intended for visitors from:

Bangladesh
United States
United Kingdom
Europe
Asia outside the Arabic-speaking region
Other international visitors

Direction:

LTR

HTML language:

lang="en"
10. Arabic Version

Arabic is intended primarily for visitors from:

Saudi Arabia
United Arab Emirates
Qatar
Kuwait
Bahrain
Oman
Jordan
Iraq
Egypt
Other Arabic-speaking regions

Direction:

RTL

HTML language:

lang="ar"
11. Automatic Language Detection

On the first visit, the application should determine the preferred language using:

Previously saved language preference
Browser language
Visitor region/country where technically appropriate

Recommended behavior:

Saved preference exists
        ↓
Use saved preference

No saved preference
        ↓
Detect browser/region

Arabic-speaking region
        ↓
Arabic

Other regions
        ↓
English

The website must never continuously override a user's manually selected language.

12. Manual Language Switcher

The visitor must always be able to change the language.

English version:

🌐 العربية

Arabic version:

🌐 English

When the user manually changes language:

Save the preference
Keep the selected language
Do not automatically switch it again
Preserve the current page/route where possible
13. RTL Requirements

Arabic mode must fully support RTL.

RTL must affect:

Navbar
Hero
Buttons
Cards
Typography
About section
Skills
Timeline
Services
Portfolio
Project pages
Contact form
Footer
Arrows
Icons where direction matters

Do not simply translate English text while keeping an LTR layout.

Arabic must be a properly designed RTL experience.

14. Navigation

Desktop navigation:

TUSAR AHAMMAD

Home
About
Portfolio
Experience
Services
Contact

🌐 العربية

The navigation should be:

Sticky
Responsive
Minimal
Glassmorphic
Smooth
Accessible

On scroll:

Transparent
        ↓
Glass / blurred background
15. Mobile Navigation

Mobile navigation must include:

T.  TUSAR AHAMMAD

🌐 العربية
☰

Hamburger menu should open a clean mobile navigation panel containing:

Home
About
Portfolio
Experience
Services
Contact
Language switcher

The menu must support both LTR and RTL.

16. Hero Section

The hero section is the primary visual introduction.

Suggested content:

HELLO, I'M

TUSAR AHAMMAD

Graphic Designer
Brand Identity Designer

I create meaningful visual identities,
professional designs and print-ready
creative solutions.

[VIEW MY WORK]
[WORK WITH ME]

The right side may contain:

Professional profile image
Design mockups
Floating portfolio cards
Creative visual elements

Visual treatment:

Dark cinematic background
Cyan accent
Soft gradients
Subtle glow
Floating elements
Layered depth

The hero must immediately communicate:

Who Tusar is
What he does
What he specializes in
How visitors can view his work or contact him
17. Hero Animation

Use Framer Motion for subtle entrance animations.

Recommended sequence:

Navigation
    ↓
Small introduction
    ↓
Name
    ↓
Professional title
    ↓
Description
    ↓
CTA buttons
    ↓
Visual / profile image

Animation types:

Fade in
Slide up
Scale in
Subtle floating motion

Avoid excessive animation.

18. Statistics Section

Create four statistic cards inspired by the supplied screenshots.

Possible structure:

6+
Years of Experience

5
Companies Worked With

2
Countries Worked In

7+
Design Projects

IMPORTANT:

These numbers must be verified against actual portfolio data before final publication.

Do not invent statistics.

Cards should use:

Rounded corners
Glass effect
Soft shadows
Blue accents
Large typography
19. About Me Section

Create a large rounded content card.

Heading:

ABOUT ME

Main title:

Designing for screen and print

Introductory content:

I'm Tusar, a Graphic Designer trained at
Bangladesh Creative IT Institute. I have a
deep passion for graphic design, branding
and professional production work.

The exact final copy should be based on the approved personal information.

20. Detailed About Content

The About section should explain:

Graphic design background
Creative IT Institute training
Design experience
Business management education
Management experience
Saudi Arabia work experience
Print production experience
UV printing
Banner production
Sticker production
Sign cutting
Design software experience
AI-assisted workflow
21. About Skills Checklist

Use a clean checkmark list.

Example:

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

Only use skills that are confirmed and relevant.

22. Skills Section

The website will include a visual software/skill section inspired by the supplied screenshots.

Use circular progress cards.

Each card should contain:

Software icon
Circular progress ring
Software name
Percentage
23. Software Skills

Initial approved skills:

Illustrator — 90%
SignMaster — 90%
Roland VersaWorks — 90%
Photoshop — 80%
CorelDRAW — 70%
MS Word — 75%
PowerPoint — 75%

Additional skills may be added later after approval.

Do not invent skill percentages.

24. Circular Skill Cards

Example:

        [Illustrator Icon]

           90%

        Illustrator

Visual requirements:

Circular progress ring
Blue/lavender accent
White/soft card
Rounded corners
Subtle shadow
Clean typography
Responsive layout

On desktop:

3 columns

On tablet:

2 columns

On mobile:

1 or 2 columns depending on screen width
25. Horizontal Skill Progress

Also support a horizontal progress-bar representation.

Example:

Illustrator                         90%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SignMaster                          90%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Roland VersaWorks                   90%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Photoshop                           80%
━━━━━━━━━━━━━━━━━━━━━━━━

CorelDRAW                           70%
━━━━━━━━━━━━━━━━━━━━

This may be used as a secondary skill visualization or responsive alternative.

Avoid displaying the same information redundantly if both layouts appear simultaneously.

26. Skill Animation

When the skill cards enter the viewport:

0%
   ↓
Target Percentage

Circular progress rings should animate smoothly.

Horizontal progress bars should also animate.

Animation must be subtle and performant.

27. Education & Experience

Create a large timeline section.

Heading:

Education & Experience

Use a vertical timeline with:

Timeline line
Circular markers
Date badge
Large rounded content card
28. Education

Include:

Creative IT Institute
2019–2021

Creative IT Institute

Graphic Design

Professional training in graphic design.
Bancharampur Degree College
2020–2022

Bancharampur Degree College

Business Management

The dates must be verified before final publication.

29. Professional Experience

Include the following approved career history.

Design King Company
2020–2021

Design King Company
Brahmanbaria, Bangladesh

Graphic Designer / Assistant Manager
Walton Electronics
2021–2023

Walton Electronics Sub-Branch
Bangladesh

Manager
Clothing Store
2023–2024

Clothing Store
Bangladesh

Manager
PADEL IT Company
2024–2025

PADEL IT Company
Riyadh, Saudi Arabia

Supervisor

Responsibilities include:

Playground supervision
Daily operations
Customer service
Taghareed Company
2025–Present

Taghareed Company
Al Hasa, Saudi Arabia

Print Machine Operator

Responsibilities include:

UV printing
Banner printing
Sticker printing
Print production
Machine operation
Production accuracy
Timely delivery
30. Timeline Design

Desktop:

●
│
├── Date
│
│   Company / Institution
│   Description
│
●
│
├── Date
│
│   Company / Institution
│
●

Cards should use:

Rounded corners
Soft blue background
White border
Subtle shadow
Blue timeline marker

Arabic mode must reverse the layout appropriately for RTL.

31. Services Section

Heading:

SERVICES

What I can do for you

Optional button:

VIEW ALL →

Use large numbered cards.

32. Services List
01 — Logo & Brand Identity

Monograms, logotypes and brand identities with a clear and timeless visual system.

02 — Social Media Design

Instagram posts, carousels and campaign creatives designed for consistent visual communication.

03 — Thumbnails & Photo Manipulation

YouTube thumbnails, posters and professional photo manipulation.

04 — Menus, Print & UV Production

Menus, banners, stickers and print-ready artwork prepared for production.

05 — Packaging Design

Professional packaging and label design for products and brands.

06 — Print-Ready Design

Production-ready artwork prepared according to printing requirements.

33. Service Card Design

Each card should contain:

Service icon
Service number
Service title
Description
Hover interaction

Example:

┌─────────────────────────────────────┐
│ Icon                              01 │
│                                     │
│ Logo & Brand Identity               │
│                                     │
│ Monograms, logotypes and complete   │
│ visual identity systems...          │
└─────────────────────────────────────┘

Hover:

Slight elevation
Border highlight
Accent glow
Arrow movement
34. Portfolio Section

The portfolio is one of the most important sections.

Heading:

SELECTED WORK

Description:

A selection of branding, logo design,
social media, print and visual projects.
35. Portfolio Categories

Filtering categories:

All
Logo
Brand Identity
Social Media
Poster
Packaging
Print
UV Production

Portfolio data must be stored separately from UI components.

36. Portfolio Grid

Desktop:

2-column or asymmetric editorial grid

Tablet:

2 columns

Mobile:

1 column

Each project card should contain:

Project image
Category
Project title
Optional short description
View project action
37. Portfolio Hover

On desktop hover:

Image zoom
+
Dark overlay
+
Project title
+
Category
+
View Project →

The hover effect must remain subtle.

38. Project Detail Pages

Each project should support a dynamic route.

Example:

/portfolio/project-name

Project page structure:

Project Title

Category
Year

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
39. Project Data Architecture

Use reusable project data.

Example structure:

src/data/projects.ts

Each project should contain:

id
slug
title
category
year
thumbnail
heroImage
description
overview
challenge
concept
typography
colors
gallery
tools

This allows new portfolio projects to be added without rewriting components.

40. Testimonials

If verified client testimonials are available, create:

WHAT CLIENTS SAY

Each testimonial should contain:

Quote
Client name
Company/platform
Optional avatar

Do not create fake testimonials.

If no verified testimonials are available, the section may be omitted until real testimonials are provided.

41. CTA Section

Create a strong final call-to-action.

Example:

HAVE A PROJECT IN MIND?

Let's create something
remarkable together.

[WORK WITH ME →]

Visual style:

Dark cinematic background
Soft cyan gradient
Large typography
Minimal decoration
42. Contact Section

Heading:

LET'S WORK TOGETHER

Contact information:

Email
Phone
WhatsApp
Behance
LinkedIn
Fiverr

Contact form:

Name
Email
Service
Message

[SEND MESSAGE]
43. Contact Form Requirements

The form must include:

Required field validation
Email validation
Accessible labels
Loading state
Success state
Error state
Spam protection where appropriate

The implementation method should be selected after inspecting the existing project architecture.

44. Footer

Create a large rounded footer card inspired by the supplied screenshots.

Content:

TUSAR AHMAMMAD

Creative designer and print production
specialist based in Al Hasa, Saudi Arabia.

PAGES

Home
About
Portfolio
Experience
Services
Contact

GET IN TOUCH

Email
Phone
WhatsApp

Social icons:

Behance
LinkedIn
WhatsApp

Copyright:

© 2026 Md Tusar Ahammad. All rights reserved.
45. Back-to-Top Button

Create a floating back-to-top button.

Visual:

Circular
Blue gradient
Soft shadow
White arrow
Fixed bottom/right position

Behavior:

Appears after scrolling
Smoothly scrolls to top
Accessible by keyboard

Arabic mode should position and/or orient the arrow appropriately.

46. Responsive Design

The website must support:

320px
375px
425px
768px
1024px
1280px
1440px
1920px
47. Mobile Requirements

Mobile must include:

Hamburger menu
Language switcher
Responsive hero
One-column content cards
Responsive portfolio
Responsive timeline
Responsive skill cards
Touch-friendly buttons
Optimized images
No horizontal overflow
Proper RTL behavior
Readable typography
48. Animation System

Use Framer Motion.

Animations should include:

Page entrance
Fade
Slide
Scale
Section reveal
While in viewport
Staggered cards
Portfolio
Image zoom
Overlay fade
Skills
Circular progress animation
Horizontal progress animation
Timeline
Sequential reveal
Navigation
Scroll transition
Floating elements
Very subtle movement

Do not use excessive animations.

49. Accessibility

The website must follow good accessibility practices.

Requirements:

Semantic HTML
Proper heading hierarchy
Alt text
Keyboard navigation
Visible focus states
Accessible buttons
Accessible form labels
Sufficient contrast
Reduced-motion support
Screen-reader-friendly navigation
50. SEO

Implement:

Page titles
Meta descriptions
Open Graph
Twitter Cards
Canonical URLs
Sitemap
Robots.txt
Structured data where appropriate
Semantic HTML
Optimized headings
Image alt text
51. Multilingual SEO

English and Arabic must have language-specific SEO metadata.

Use:

hreflang

for:

English
Arabic

Ensure:

lang="en"
dir="ltr"

and:

lang="ar"
dir="rtl"

are correctly applied.

52. Suggested Route Architecture

Recommended:

/
 /about
 /portfolio
 /portfolio/[slug]
 /experience
 /services
 /contact

For multilingual support, use the project's chosen i18n architecture.

Possible structure:

/en
/en/about
/en/portfolio
/en/portfolio/[slug]

/ar
/ar/about
/ar/portfolio
/ar/portfolio/[slug]

The final routing approach must be determined after inspecting the existing project.

Do not create duplicate routes if the current architecture already provides equivalent functionality.

53. Recommended Folder Structure
src/
│
├── app/
│   ├── page.tsx
│   ├── about/
│   ├── portfolio/
│   │   ├── page.tsx
│   │   └── [slug]/
│   ├── experience/
│   ├── services/
│   └── contact/
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
│   └── ar/
│
├── lib/
│
├── types/
│
└── styles/

IMPORTANT:

This is the recommended structure.

Before creating files, inspect the existing project and reuse existing architecture wherever possible.

54. Content Architecture

Content must be separated from UI components.

Recommended:

data/

for:

Projects
Skills
Services
Experience
Education
Testimonials

Translations should be separated into:

i18n/

or the project's existing localization system.

This makes the website easier to maintain.

55. Performance

The website must be optimized for performance.

Requirements:

Next.js Image optimization
Proper image sizing
Lazy loading
Responsive images
Avoid unnecessary JavaScript
Avoid unnecessary dependencies
Component-level optimization
Animation performance
Font optimization
Minimize layout shifts
56. Security

Do not expose:

Private API keys
Secrets
Credentials
Environment variables

Use:

.env.local

for private configuration.

Never commit secrets to Git.

57. Code Quality

The code must be:

Modular
Reusable
Typed
Maintainable
Readable
Component-based
Production-ready

Avoid:

Duplicate components
Duplicate styles
Unnecessary abstraction
Unnecessary dependencies
Huge monolithic components
58. Development Rules

Before modifying anything:

Inspect the entire project.
Read architecture.md.
Read prompt.md.
Read progress.md if it exists.
Inspect package.json.
Inspect all existing routes.
Inspect existing components.
Inspect existing styling.
Inspect existing i18n setup.
Inspect existing assets.
59. Strict No-Duplicate Rule

Do NOT:

Create duplicate files
Create duplicate components
Create duplicate routes
Create duplicate utilities
Rewrite working components unnecessarily
Replace the existing architecture without a valid reason

Reuse existing code whenever possible.

60. Phase-Based Implementation

The website must be developed one phase at a time.

Phase 1 — Project Inspection

Tasks:

Inspect project
Read architecture
Read prompt
Read progress
Inspect dependencies
Inspect routes
Inspect components
Inspect current implementation

Do not implement anything yet.

Output:

Current status
Completed features
Missing features
Architecture conflicts
Next phase
Files to modify
Phase 2 — Architecture & Internationalization Foundation

Implement:

English
Arabic
RTL
LTR
Language detection
Language switcher
Translation architecture
Language persistence

Verify:

English works
Arabic works
RTL works
Manual language selection persists
Phase 3 — Global Design System

Implement:

Colors
Typography
Backgrounds
Cards
Borders
Shadows
Buttons
Container system
Responsive spacing
Phase 4 — Navigation

Implement:

Desktop navbar
Mobile navbar
Sticky behavior
Scroll state
Hamburger menu
Language switcher
RTL support
Phase 5 — Hero

Implement:

Hero content
Profile visual
CTA buttons
Dark cinematic background
Floating elements
Entrance animations
Phase 6 — Statistics

Implement:

Four statistic cards
Responsive layout
Animation
Verified statistics only
Phase 7 — About

Implement:

About card
Biography
Career summary
Skills checklist
CTA
Phase 8 — Skills

Implement:

Circular skill cards
Horizontal skill bars
Skill animations
Responsive layout
Phase 9 — Education & Experience

Implement:

Timeline
Education
Experience
Timeline animations
RTL support
Phase 10 — Services

Implement:

Service cards
Icons
Numbering
Hover states
Responsive layout
Phase 11 — Portfolio

Implement:

Portfolio data
Category filtering
Portfolio grid
Hover animations
Responsive design
Phase 12 — Project Detail

Implement:

Dynamic project routes
Project hero
Overview
Challenge
Concept
Design process
Typography
Colors
Gallery
Mockups
Related projects
Phase 13 — Testimonials

Implement only if verified testimonials are available.

Phase 14 — CTA & Contact

Implement:

CTA
Contact information
Contact form
Validation
Loading state
Success state
Error state
Phase 15 — Footer

Implement:

Footer card
Navigation links
Contact links
Social links
Copyright
RTL support
Phase 16 — Animation Refinement

Implement and refine:

Scroll animations
Hover effects
Skill animations
Timeline animations
Floating elements
Page transitions where appropriate
Phase 17 — Responsive Optimization

Test:

320px
375px
425px
768px
1024px
1280px
1440px
1920px

Fix:

Overflow
Typography
Card sizing
Navigation
Timeline
Portfolio
Images
RTL behavior
Phase 18 — SEO

Implement:

Metadata
Open Graph
Twitter Cards
Sitemap
Robots
Canonical
Hreflang
Structured data
Phase 19 — Performance Optimization

Check:

Image optimization
Font loading
Bundle size
Client/server components
Animation performance
Lazy loading
Core Web Vitals
Phase 20 — Final QA

Test:

Functionality
Navigation
Language switch
Portfolio filters
Project pages
Contact form
Back-to-top
Mobile menu
Languages
English
Arabic
LTR
RTL
Devices
Mobile
Tablet
Laptop
Desktop
Accessibility
Keyboard
Focus
Contrast
Screen reader basics
Performance
Images
Animations
Loading
Layout stability
Phase 21 — Production Deployment

Final steps:

Run production build.
Run lint.
Run type checking.
Fix all errors.
Verify environment variables.
Deploy to Vercel.
Connect tusarahammad.com.
Configure HTTPS.
Verify sitemap.
Verify robots.txt.
Verify SEO metadata.
Verify English version.
Verify Arabic version.
Verify RTL.
Test production on mobile and desktop.
61. Verification Rules

After completing every phase:

1. Run lint
2. Run type check
3. Run build when appropriate
4. Open the affected page
5. Check desktop
6. Check mobile
7. Check Arabic if relevant
8. Check RTL if relevant
9. Check console for errors
10. Update progress.md

Never silently continue to the next phase.

62. Progress Tracking

Maintain:

progress.md

Example:

# Project Progress

## Phase 1
Status: Completed

## Phase 2
Status: In Progress

## Phase 3
Status: Not Started

After each phase, record:

What was completed
Files changed
Verification result
Any issues
Next phase
63. Important Development Principle

The implementation must prioritize:

Correctness
↓
Maintainability
↓
Performance
↓
Accessibility
↓
Visual quality
↓
Animation

Do not sacrifice functionality or maintainability just to create visual effects.

64. Final Website Experience

The final website should communicate:

A professional graphic designer who combines creative design skills with real-world print production experience.

The website should visually combine:

Premium Dark Cinematic UI
+
Soft Blue Glass Portfolio UI
+
Modern Typography
+
Professional Portfolio Presentation
+
Arabic / English Support
+
RTL / LTR
+
Responsive Design
+
Smooth Animation
+
Strong SEO

The final result must feel like a unique professional portfolio for:

TUSAR AHAMMAD

and must not look like a copy of the reference website.