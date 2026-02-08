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
      - [x] Restored all external links from legacy 5 sub-pages
      - [x] Replaced broken 2000-era OSTI/NTRS URLs with DOIs and current NTRS citation links
      - [x] Added DOI links for 18 OSTI publications (wind turbines, SERI)
      - [x] Added NTRS citation links for 12 NASA publications
      - [x] Added DOI links for 2 AIAA journal articles
      - [x] Verified all NTRS IDs via API report-number search
      - [x] Downloaded 27 freely-available PDFs (114 MB) to `src/pdf/publications/`
      - [x] Self-hosting 27 PDFs (81 MB after Acrobat optimization) in `src/pdf/publications/`
      - [x] Each publication has dual links: self-hosted PDF + external DOI or NTRS citation
      - [x] Uses `{{ '...' | url }}` filter for path prefix compatibility
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

- [x] Responsive design (mobile-first via Tailwind, hamburger nav on mobile, Flexbox/Grid layout)
  - [ ] QA pass: test at 320px, 768px, 1024px+ and fix edge cases
- [x] Accessibility (WCAG 2.1 AA) — pa11y-ci runs on all 14 pages with 0 errors
  - [x] Proper heading hierarchy (h1 in header, h2 section bars, enforced by layouts)
  - [x] Skip link in `base.njk`
  - [x] Keyboard navigation (aria-expanded on hamburger, aria-current on nav)
  - [x] Color contrast (selected during style guide phase)
  - [ ] Review alt text quality (present on all images, but review for descriptiveness)
  - [ ] Final manual audit (screen reader walkthrough)
- [x] Remove legacy JavaScript (image rollovers → CSS :hover) — new site has no legacy JS
- [x] Semantic HTML (no tables for layout) — new site uses CSS Grid/Flexbox throughout
- [ ] Review/update external links (many 2000-era links may be broken)
  - [x] Publications page: all legacy links replaced with DOIs and current NTRS citations
  - [ ] Links page (`src/links.md`): check and update 2000-era URLs
- [ ] Verify contact info is current (need to confirm with Dan)

### Validation

14. [ ] Add link checker to CI
15. [ ] Responsive testing across devices
16. [ ] Final accessibility audit

### Consider Adding to Build/Lint

- **Broken link checker** - `linkinator` or html-validate plugin (after content)
- **Image optimization** - `eleventy-img` or build script (when importing)
- **Visual regression** - Playwright or Percy screenshots (optional)

### SEO & AI Optimization

- [ ] SEO fundamentals
  - [ ] Add `<meta name="robots" content="index, follow">` to base layout
  - [ ] Add canonical URLs (`<link rel="canonical">`)
  - [ ] Add Open Graph meta tags (og:title, og:description, og:type, og:url)
  - [ ] Generate a `sitemap.xml` (eleventy-plugin-sitemap or build script)
  - [ ] Add `robots.txt` allowing all crawlers
  - [ ] Structured data (JSON-LD) for Organization, Person (Dan), and Article schemas
  - [ ] Verify heading hierarchy is clean on every page (h1 > h2 > h3)
  - [ ] Ensure all images have descriptive alt text (not just present, but useful)
- [ ] AI discoverability
  - [ ] Add `llms.txt` — a plain-text summary of who Dan is, what Airfoils Inc. does, key capabilities, and how to contact (see llmstxt.org)
  - [ ] Add `llms-full.txt` — extended version with publication list, client list, and technical background
  - [ ] Consider structured data markup that AI systems can parse (JSON-LD covers this)
- [ ] Content quality for search
  - [ ] Review page titles and meta descriptions for keyword relevance (airfoil design, wind tunnel testing, Eppler code, etc.)
  - [ ] Ensure the homepage has enough indexable text (not just images/cards)
  - [ ] Add internal cross-links between related pages (e.g., Publications ↔ Resume, Eppler Code ↔ Airfoil Design)

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
- Performance tuning (image optimization, etc.)
