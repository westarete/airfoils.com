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
12. [x] Migrate images and assets
    - [x] Copied 7 content images to `src/images/` (sailplane, tunnel, designint, eppler, turbine, chauvin, spec_chart)
    - [x] Copied 3 PDFs to `src/pdf/` (design.pdf, eppler.pdf, specifications.pdf)
    - [x] Added passthrough copy for `src/pdf` in `eleventy.config.js`
    - [x] Convert GIF nav buttons to CSS (no longer needed as images — new site uses CSS nav)
13. [x] Handle multi-page articles
    - [x] Consolidated publications 5 sub-pages into single `src/publications.md` with anchor navigation
    - [x] Airfoil Design and Eppler Code papers linked via PDF; legacy multi-page HTML versions deferred

### Modernization Checklist

- [x] Responsive design (mobile-first via Tailwind, hamburger nav on mobile, Flexbox/Grid layout)
  - [x] QA pass: tested at 320px, 768px, 1024px+ — no issues found
- [x] Accessibility (WCAG 2.1 AA) — pa11y-ci runs on all 14 pages with 0 errors
  - [x] Proper heading hierarchy (h1 in header, h2 section bars, enforced by layouts)
  - [x] Skip link in `base.njk`
  - [x] Keyboard navigation (aria-expanded on hamburger, aria-current on nav)
  - [x] Color contrast (selected during style guide phase)
  - [x] Review alt text quality — all 10 images have descriptive, contextual alt text
  - [x] Links underlined by default (WCAG 1.4.1 — no reliance on color alone)
  - [x] Added "grayscale test" principle to style guide for perceptual review
- [x] Remove legacy JavaScript (image rollovers → CSS :hover) — new site has no legacy JS
- [x] Semantic HTML (no tables for layout) — new site uses CSS Grid/Flexbox throughout
- [x] Review/update external links (many 2000-era links may be broken)
  - [x] Publications page: all legacy links replaced with DOIs and current NTRS citations
  - [x] Publications page: replaced 2 broken DOIs with direct OSTI links
  - [x] Links page: updated 6 broken URLs (LM Wind Power, GAMA, Lancair, Beechcraft, NASA LTPT, Penn State)
  - [x] Clients page: updated NAWCAD URL
- [x] Verify contact info is current

### Validation

14. [x] Add link checker to CI
    - [x] Installed `linkinator` (Google-maintained broken-link checker)
    - [x] Added `.linkinator.config.json` — recurse site, internal links only in CI
    - [x] Added `.linkinator.external.json` and `check:links-external` script for manual external link checking (too many sites block datacenter IPs for CI)
    - [x] Added `lint:links` npm script, wired into `lint` pipeline
    - [x] Added "Check links" step to CI `build-and-lint` job
    - [x] Consolidated separate `a11y` CI job into `build-and-lint` — all four linters now run together with one server
15. [x] Responsive testing across devices
16. [x] Final accessibility audit (manual screen reader walkthrough)
    - [x] VoiceOver walkthrough: footer landmark needed `aria-label`
    - [x] VoiceOver walkthrough: removed comma from "Airfoils, Incorporated" to fix awkward pause

### SEO & AI Optimization

- [x] SEO fundamentals
  - [x] Add `<meta name="robots" content="index, follow">` to base layout
  - [x] Add canonical URLs (`<link rel="canonical">`)
  - [x] Add Open Graph meta tags (og:title, og:description, og:type, og:url, og:site_name)
  - [x] Generate a `sitemap.xml` (Nunjucks template using `collections.all`)
  - [x] Add `robots.txt` allowing all crawlers (Nunjucks template with sitemap link)
  - [x] Structured data (JSON-LD) for Organization, Person (Dan), WebSite, and WebPage schemas
  - [x] Verify heading hierarchy is clean on every page (h1 > h2 > h3) — confirmed, no issues
  - [x] Ensure all images have descriptive alt text — all 10 images verified
  - [x] Created `src/_data/site.js` with site-wide metadata (name, URL, author, address, phone)
  - [x] Homepage title uses `{{ site.name }} — Airfoil Design, Analysis, and Testing` for better SEO
- [x] AI discoverability
  - [x] Add `llms.txt` — plain-text summary following llmstxt.org format (company, Dan, capabilities, clients, pages)
  - [x] Add `llms-full.txt` — extended version with publication list, client list, technical background, and page inventory
  - [x] Structured data (JSON-LD) covers AI-parseable markup
- [x] Content quality for search
  - [x] Review page titles and meta descriptions for keyword relevance — all 13 pages have descriptive, keyword-rich titles and descriptions
  - [x] Ensure the homepage has enough indexable text — 5 sections with substantial prose content
  - [x] Add internal cross-links between related pages
    - [x] Airfoil Design ↔ Eppler Code ↔ Publications
    - [x] Design Integration → Airfoil Design, Applications, Specifications (+ DOI for reference)
    - [x] Why? → Applications, Design Integration, Contact
    - [x] Wind Tunnels → Airfoil Design, Publications
    - [x] Resume → Publications, Contact
    - [x] Applications → Airfoil Design, Clients, Publications (also removed raw-image links)

## Go Live Checklist

Deploy to production at `airfoils.com`. Steps are ordered to minimize
disruption — the legacy site (on its existing static host) stays live until
the DNS cutover in Phase 5. DNS can be switched back at any time if needed.

References:
- [About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Verifying your custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)

### Phase 0: Prepare infrastructure (developer, no disruption)

These are manual steps by the developer — no code changes, no effect on the
live site.

0a. [ ] Move DNS for `airfoils.com` from ProHosting to Network Solutions (the registrar)
    - Consolidates DNS management; replicate existing records, no changes yet
0b. [x] Create GitHub organization `airfoils` for Dan Somers
0c. [ ] Transfer the `airfoils.com` repo from `westarete` to `airfoils`
    - Update local git remote: `git remote set-url origin git@github.com:airfoils/airfoils.com.git`
    - Verify CI still runs (GitHub preserves Actions workflows on transfer)

### Phase 1: Build redirects (no disruption)

1. [ ] Add legacy URL redirects (GitHub Pages has no server-side redirects)
   - Create a `redirect.njk` layout with `<meta http-equiv="refresh">` and `<link rel="canonical">`
   - Create a data file (`src/_data/redirects.json` or similar) mapping old → new paths
   - Use Eleventy pagination to generate an HTML file at each old path
   - Legacy main pages (12):
     `airfoil.html` → `/airfoil-design/`, `apps.html` → `/applications/`,
     `clients.html` → `/clients/`, `contact.html` → `/contact/`,
     `integration.htm` → `/design-integration/`, `eppler.html` → `/eppler-code/`,
     `links.html` → `/links/`, `pubs.html` → `/publications/`,
     `resume.html` → `/resume/`, `spec.html` → `/specifications/`,
     `why.html` → `/why/`, `tunnel.html` → `/wind-tunnels/`
   - Legacy multi-page articles (~19):
     `airfoil1.html`–`airfoil6.html` → `/airfoil-design/`,
     `eppler1.html`–`eppler8.html` → `/eppler-code/`,
     `pubs1.html`–`pubs5.html` → `/publications/`
   - Add redirect pages to pa11y-ci and html-validate checks

### Phase 2: Verify domain with GitHub (no disruption)

GitHub [recommends verifying](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
the domain *before* adding it to the repo, to prevent takeover attacks.
This only requires a TXT DNS record — it does not affect the live site.

2. [ ] Add DNS TXT record for GitHub domain verification
   - In GitHub account/org Settings → Pages → Add domain → `airfoils.com`
   - Create TXT record at Network Solutions: `_github-pages-challenge-airfoils.airfoils.com`
     with the value GitHub provides
   - Verify with: `dig _github-pages-challenge-airfoils.airfoils.com +nostats +nocomments +nocmd TXT`
   - Click "Verify" in GitHub Settings once DNS propagates

### Phase 3: Local verification (no disruption)

3. [ ] Run `npm run check` locally with path prefix removed to verify all
   links and redirects work at root paths

### Phase 4: Config cutover (one commit, still no disruption to live site)

**Note:** Since the site uses `actions/deploy-pages`, [the CNAME file in the
repo is ignored](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain).
The custom domain must be set via GitHub repo Settings → Pages. We still
include a CNAME file as a safety net (some deploy actions use it), but the
Settings step is authoritative.

4. [ ] Remove `PATH_PREFIX: /airfoils.com/` from `.github/workflows/ci.yml`
5. [ ] Update `src/_data/site.js` default URL to `https://airfoils.com` (or set `SITE_URL` env var)
6. [ ] Add `CNAME` file to `src/` containing `airfoils.com` (safety net for deploy action)
7. [ ] Update `eleventy.config.js` to copy CNAME to dist
8. [ ] Push — CI deploys new config to GitHub Pages
9. [ ] Set custom domain in GitHub repo Settings → Pages → Custom domain → `airfoils.com`
   - GitHub docs say: set this *before* pointing DNS, to prevent subdomain takeover

### Phase 5: DNS cutover (the switch)

Configure apex domain (`airfoils.com`) + `www` subdomain. GitHub Pages will
automatically redirect `www.airfoils.com` → `airfoils.com`.

10. [ ] Add DNS A records for apex domain:
    ```
    185.199.108.153
    185.199.109.153
    185.199.110.153
    185.199.111.153
    ```
11. [ ] Add DNS AAAA records for IPv6 (recommended):
    ```
    2606:50c0:8000::153
    2606:50c0:8001::153
    2606:50c0:8002::153
    2606:50c0:8003::153
    ```
12. [ ] Add DNS CNAME record at Network Solutions: `www.airfoils.com` → `airfoils.github.io`
13. [ ] Wait for DNS propagation (up to 24h) and GitHub Pages SSL provisioning

### Phase 6: Verify

14. [ ] Verify DNS with `dig airfoils.com +noall +answer -t A`
15. [ ] Verify `https://airfoils.com/` serves the new site
16. [ ] Verify `https://www.airfoils.com/` redirects to `https://airfoils.com/`
17. [ ] Verify legacy URL redirects (e.g., `/airfoil.html` → `/airfoil-design/`)
18. [ ] Verify SSL certificate is valid
19. [ ] Enable "Enforce HTTPS" in GitHub repo Settings → Pages (if not auto-enabled)

