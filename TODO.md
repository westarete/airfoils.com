# TODO

## Project Goals

- Import the current https://airfoils.com/ website into a static website
- Modernize the code and style while preserving the original content and general layout
- Make the website responsive and mobile-friendly
- Continually check for HTML and CSS validation, accessibility, and security issues
- Optimize the website for SEO and AI
- Provide complete documentation for easy maintenance

## Completed: Build the Feedback Loop

1. [x] Archive legacy site to `legacy/` for historical reference
2. [x] Scaffold Eleventy + Tailwind (minimal "hello world" that builds)
3. [x] Add local linting (HTML, CSS, a11y) that passes on hello world
4. [x] Set up GitHub Actions (CI runs same checks, deploys to Pages)
5. [x] Verify full loop: push → CI passes → site deploys

## Legacy Site Analysis (Completed)

The legacy site (archived in `legacy/airfoils.com/`) was analyzed on 2026-02-07.

### Site Structure

**13 Main Pages:**
- Home, Airfoil Design, Applications, Clients, Contact, Design Integration,
  Eppler Code, Links, Publications, Resume, Specifications, Why?, Wind Tunnels

**Multi-page Articles:**
- Subsonic Airfoil Design paper (6 HTML pages + PDF)
- Eppler Code paper (8 HTML pages + PDF)
- Publications (5 sub-pages by category)

**Assets:**
- ~60 images in `graphics/` (nav buttons, photos, diagrams, logos)
- 3 PDF documents (design.pdf, eppler.pdf, specifications.pdf)

### Legacy Color Palette (for reference)
- Primary blue: `#006699`
- Accent orange: `#CC3300`
- Light gray: `#CCCCCC`
- Light teal: `#99CCCC`

### Key Content to Preserve
- Dan Somers' credentials and NASA background
- Technical papers on airfoil design methodology
- Applications table with real-world examples
- Business case arguments (Economics, Performance)
- Client relationships and wind tunnel facilities

---

## Current Phase: Design & Content Import

### Design System (do first, on 1-2 pages)

6. [x] Analyze legacy site structure and content inventory
7. [x] Create style guide and design tokens
   - [x] Configure color palette in `src/css/input.css` (Tailwind v4 @theme)
   - [x] Build self-documenting `src/style-guide.njk` page with rationale
   - [x] Iterate: adjust values, refresh, review until it feels right
8. [x] Create base layout (header, nav, footer)
   - [x] Replace table-based layout with CSS Grid/Flexbox
   - [x] Responsive navigation (hamburger menu on mobile)
   - [x] Semantic HTML5 elements (header, nav, main, footer, article, section)
   - [x] Navigation data in `src/_data/nav.js` (single source of truth)
   - [x] Curated main nav (9 items mapped to buyer's journey)
   - [x] Fat footer with pages grouped by category (About, Services, Resources)
   - [x] Skip link, aria-current, aria-expanded for accessibility
9. [x] Build homepage with new design
   - [x] Hero section with value proposition and dual CTAs (Contact, Why?)
   - [x] Company overview with airfoil group image and Eppler Code link
   - [x] Capabilities cards (Airfoil Design, Wind-Tunnel Testing, Applications)
   - [x] Credentials section with client references and aircraft image
   - [x] Contact CTA section
   - [x] Full-width layout support (`fullWidth` front-matter flag in base.njk)
   - [x] Key legacy images copied to `src/images/` (optimization deferred to step 12)
10. [x] Build one interior page to validate design system
    - [x] Installed `@tailwindcss/typography` for Markdown prose styling
    - [x] Created `page.njk` content layout (extends base, prose wrapper, h2 header bars)
    - [x] Ported "Why?" page from legacy HTML to `src/why.md` (pure Markdown)
    - [x] Blue section header bars on h2 elements (matching legacy design)
    - [x] Added `/why/` to `.pa11yci.json` for accessibility testing

### Content Import (after design is solid)

11. [x] Import all remaining pages (batch import)
    - [x] Contact (`src/contact.md`)
    - [x] Resume (`src/resume.md`)
    - [x] Applications (`src/applications.njk` — HTML table)
    - [x] Clients (`src/clients.njk` — HTML table)
    - [x] Airfoil Design (`src/airfoil-design.md`)
    - [x] Eppler Code (`src/eppler-code.md`)
    - [x] Publications (`src/publications.md` — consolidated from 5 sub-pages)
    - [x] Links (`src/links.md`)
    - [x] Wind Tunnels (`src/wind-tunnels.md`)
    - [x] Design Integration (`src/design-integration.md`)
    - [x] Specifications (`src/specifications.njk` — HTML with image)
    - [x] Add all new URLs to `.pa11yci.json` for accessibility testing
12. [ ] Migrate images and assets
    - [x] Copied 7 content images to `src/images/` (sailplane, tunnel, designint, eppler, turbine, chauvin, spec_chart)
    - [x] Copied 3 PDFs to `src/pdf/` (design.pdf, eppler.pdf, specifications.pdf)
    - [x] Added passthrough copy for `src/pdf` in `eleventy.config.js`
    - [ ] Optimize images (modern formats, responsive sizes)
    - [x] Convert GIF nav buttons to CSS (no longer needed as images — new site uses CSS nav)
13. [x] Handle multi-page articles
    - [x] Consolidated publications 5 sub-pages into single `src/publications.md` with anchor navigation
    - [x] Airfoil Design and Eppler Code papers linked via PDF; legacy multi-page HTML versions deferred

### Modernization Checklist

- [ ] Responsive design (mobile-first, test at 320px, 768px, 1024px+)
- [ ] Accessibility (WCAG 2.1 AA target)
  - Proper heading hierarchy (h1 → h2 → h3)
  - Alt text for all images
  - Sufficient color contrast
  - Keyboard navigation
  - Skip links
- [x] Remove legacy JavaScript (image rollovers → CSS :hover) — new site has no legacy JS
- [x] Semantic HTML (no tables for layout) — new site uses CSS Grid/Flexbox throughout
- [ ] Review/update external links (many 2000-era links may be broken)
- [ ] Verify contact info is current

### Validation

14. [ ] Add link checker to CI
15. [ ] Responsive testing across devices
16. [ ] Final accessibility audit

### Consider Adding to Build/Lint

- **Broken link checker** - `linkinator` or html-validate plugin (after content)
- **Image optimization** - `eleventy-img` or build script (when importing)
- **Visual regression** - Playwright or Percy screenshots (optional)

## Go Live Checklist

When ready to deploy to production at `airfoils.com`:

1. [ ] Remove `PATH_PREFIX: /airfoils.com/` from `.github/workflows/ci.yml`
2. [ ] Add `CNAME` file to `src/` containing `airfoils.com`
3. [ ] Update `eleventy.config.js` to copy CNAME to dist
4. [ ] Point `airfoils.com` DNS to GitHub Pages (185.199.108-111.153)
5. [ ] Enable custom domain in GitHub repo settings
6. [ ] Verify site works at `https://airfoils.com/`

## Wishlist

- Responsive design refinements
- SEO optimization (meta tags, structured data)
- AI optimization (llms.txt, etc.)
- Performance tuning (image optimization, etc.)
