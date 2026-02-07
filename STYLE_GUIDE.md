# Style Guide for airfoils.com

This document captures the design principles, color palette, typography, and
component patterns for the airfoils.com website. It serves as a reference for
both human designers and AI agents working on the project.

## Design Philosophy

**Evolution, not revolution.** Dan Somers has had the same website since ~2000.
Our goal is to modernize the code and presentation while preserving the site's
identity. A visitor familiar with the old site should recognize it instantly,
while a designer should approve of the craftsmanship.

**Principles:**
- Honor the legacy palette and layout as inspiration
- Apply classic design principles (color theory, typography, grids)
- Prioritize readability and professionalism over trendiness
- Keep it simple—this is a consulting firm, not a startup
- Ensure accessibility (WCAG 2.1 AA minimum)

---

## Color Palette

### Legacy Colors (Reference)

The original site used these colors:
- Primary blue: `#006699` — navigation sidebar, headers
- Accent orange: `#CC3300` — headings, links
- Light gray: `#CCCCCC` — header bar, content backgrounds
- Light teal: `#99CCCC` — footer contact info
- Black: `#000000` — tagline bar
- White: `#FFFFFF` — content area

### Modernized Palette

We retain the blue/orange complementary relationship but adjust for:
- Better contrast ratios (accessibility)
- Slightly desaturated tones (more sophisticated)
- A cohesive neutral scale

```
Primary (Blue)
  50:  #E6F0F5
  100: #CCE1EB
  200: #99C3D7
  300: #66A5C3
  400: #3387AF
  500: #006699  ← legacy primary (keep)
  600: #00527A
  700: #003D5C
  800: #00293D
  900: #00141F

Accent (Orange)
  50:  #FEF3EF
  100: #FDE7DF
  200: #FBCFBF
  300: #F9B79F
  400: #F79F7F
  500: #CC3300  ← legacy accent (adjust for contrast)
  600: #A32900
  700: #7A1F00
  800: #521400
  900: #290A00

Neutral (Gray)
  50:  #F9FAFB
  100: #F3F4F6
  200: #E5E7EB
  300: #D1D5DB
  400: #9CA3AF
  500: #6B7280
  600: #4B5563
  700: #374151
  800: #1F2937
  900: #111827
```

### Color Usage

| Element              | Color                | Notes                          |
|----------------------|----------------------|--------------------------------|
| Primary buttons/CTAs | Primary 500          | White text                     |
| Primary hover        | Primary 600          |                                |
| Links                | Primary 600          | Underline on hover             |
| Section headings     | Primary 700          |                                |
| Page titles          | Accent 500 or 600    | Check contrast                 |
| Body text            | Neutral 800          |                                |
| Secondary text       | Neutral 600          |                                |
| Borders              | Neutral 200          |                                |
| Backgrounds          | White or Neutral 50  |                                |
| Footer background    | Primary 500          | White/light text               |

---

## Typography

### Font Stack

Use system fonts for performance and native feel:

```css
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

The legacy site used Arial/Helvetica, so this maintains continuity.

### Type Scale

Based on a 1.25 ratio (Major Third) for harmonious progression:

| Name   | Size    | Line Height | Use                        |
|--------|---------|-------------|----------------------------|
| xs     | 0.75rem | 1rem        | Fine print, captions       |
| sm     | 0.875rem| 1.25rem     | Secondary text, nav items  |
| base   | 1rem    | 1.5rem      | Body text                  |
| lg     | 1.125rem| 1.75rem     | Lead paragraphs            |
| xl     | 1.25rem | 1.75rem     | H4, card titles            |
| 2xl    | 1.5rem  | 2rem        | H3                         |
| 3xl    | 1.875rem| 2.25rem     | H2                         |
| 4xl    | 2.25rem | 2.5rem      | H1, page titles            |
| 5xl    | 3rem    | 1           | Hero headlines             |

### Font Weights

- **Normal (400)**: Body text
- **Medium (500)**: Navigation, labels
- **Semibold (600)**: Subheadings, emphasis
- **Bold (700)**: Headings, CTAs

---

## Spacing

Use Tailwind's default spacing scale (based on 0.25rem = 4px increments).

Common patterns:
- Section padding: `py-12` to `py-16` (48–64px)
- Container max-width: `max-w-6xl` (72rem = 1152px)
- Card padding: `p-6` (24px)
- Stack spacing: `space-y-4` to `space-y-6`
- Inline spacing: `space-x-2` to `space-x-4`

---

## Layout

### Grid System

- Use CSS Grid for page layout (header, main, footer)
- Use Flexbox for component-level layout (nav items, cards)
- Max content width: 1152px (72rem), centered
- Responsive breakpoints:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

### Page Structure

```
┌─────────────────────────────────────────────┐
│ Header (logo, tagline, navigation)          │
├─────────────────────────────────────────────┤
│ Main content                                │
│ ┌─────────────────────────────────────────┐ │
│ │ Hero or page title                      │ │
│ ├─────────────────────────────────────────┤ │
│ │ Content sections                        │ │
│ └─────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│ Footer (contact info, nav, copyright)       │
└─────────────────────────────────────────────┘
```

### Navigation

- Desktop: Horizontal nav in header
- Mobile: Hamburger menu with slide-out or dropdown
- Current page indicator: Bold text or underline

---

## Components

### Buttons

Primary:
```html
<button class="bg-primary-500 hover:bg-primary-600 text-white font-medium
  px-4 py-2 rounded transition-colors">
  Contact Us
</button>
```

Secondary:
```html
<button class="border border-primary-500 text-primary-600 hover:bg-primary-50
  font-medium px-4 py-2 rounded transition-colors">
  Learn More
</button>
```

### Cards

```html
<div class="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
  <h3 class="text-xl font-semibold text-primary-700 mb-2">Card Title</h3>
  <p class="text-neutral-600">Card content goes here.</p>
</div>
```

### Section Headers

```html
<div class="bg-primary-500 text-white px-4 py-2 font-semibold">
  Section Title
</div>
```

This mirrors the legacy site's blue header bars.

---

## Images

- Use modern formats (WebP with JPEG fallback)
- Provide responsive sizes via `srcset`
- Always include meaningful `alt` text
- Lazy load below-the-fold images

Key images to preserve from legacy:
- Dan Somers portrait
- Wind turbine photos
- Aircraft photos
- Wind tunnel photo
- Airfoil diagrams

---

## Accessibility

Target: **WCAG 2.1 Level AA**

Checklist:
- [ ] Color contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- [ ] All images have alt text
- [ ] Heading hierarchy is logical (h1 → h2 → h3, no skips)
- [ ] Interactive elements are keyboard accessible
- [ ] Focus states are visible
- [ ] Skip link to main content
- [ ] No reliance on color alone to convey information

---

## Files to Keep in Sync

When making design changes, update:

1. **`STYLE_GUIDE.md`** (this file) — rationale and documentation
2. **`tailwind.config.js`** — actual color/font/spacing values
3. **`src/style-guide.njk`** — rendered examples (when it exists)

The Tailwind config is the source of truth for values; this document explains
the reasoning behind those values.
