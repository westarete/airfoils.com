# airfoils.com

Static website for Airfoils Incorporated, the aerodynamic consulting firm of Dan Somers.

**Live site:** https://westarete.github.io/airfoils.com/

## Tech Stack

- **[Eleventy (11ty)](https://www.11ty.dev/)** - Static site generator
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Hosting

## Why Eleventy?

- Simple mental model: HTML templates with includes and layouts
- Zero client-side JavaScript in output
- Great Tailwind integration
- Markdown support if content editing is needed later
- Stable, active community

## Prerequisites

- Node.js (v18 or later recommended)

## Development

```bash
# Install dependencies
npm install

# Start development server (with live reload)
npm run dev
# Then open http://localhost:8080

# Build + lint (all four linters — run before committing)
npm run check

# Lint only (skip build, useful during dev)
npm run lint

# Build for production (no linting)
npm run build
```

**Note**: `lint` and `check` require the dev server to be running (`npm run dev`)
because pa11y-ci and linkinator test against `http://localhost:8080`. Start the
dev server in a separate terminal first.

Linting mirrors CI to catch issues before commit:

- **html-validate** — HTML validation
- **Stylelint** — CSS linting
- **pa11y-ci** — Accessibility testing
- **linkinator** — Broken link checking (internal links in CI; see below for external)

### External Link Checking

CI only checks internal links (pages, images, PDFs) because too many
external sites block requests from datacenter IPs, causing false failures.
The skip list is in `.linkinator.external.json`.

**Run external link checks periodically** (with the dev server running):

```bash
npm run check:links-external
```

This should be done before any release and occasionally during development
to catch links that have gone stale. When a link fails, verify it in a
browser first — a `[0]` status usually means the site blocks automated
requests, not that the link is broken.

## Project Structure

```
src/
├── _data/
│   ├── nav.js          # Navigation data (single source of truth for pages)
│   └── site.js         # Site-wide metadata (name, URL, author, address)
├── _includes/          # Shared templates (layouts, partials)
│   ├── base.njk        # Base layout (head, header, footer, SEO tags)
│   └── page.njk        # Interior page layout (extends base)
├── css/
│   └── input.css       # Tailwind directives and design tokens
├── images/             # Static images
├── pdf/                # PDF documents (publications, specs)
├── index.njk           # Homepage
├── style-guide.njk     # Design system reference (dev only)
├── sitemap.njk         # Generated sitemap.xml
├── robots.txt.njk      # Generated robots.txt
├── llms.txt.njk        # AI discoverability (llmstxt.org format)
├── llms-full.txt.njk   # Extended AI context (publications, clients)
└── *.md / *.njk        # Content pages

dist/                   # Built output (generated, not committed)
legacy/                 # Archived copy of original airfoils.com
```

## Design System

The site's visual design is documented in two places:

1. **`src/css/input.css`** — The source of truth for actual values (colors,
   fonts, spacing) defined in the `@theme` block. This project uses Tailwind
   CSS v4's CSS-based configuration.

2. **`/style-guide/`** — A self-documenting page showing all design tokens,
   components, and the rationale behind them. Run `npm run dev` and visit
   http://localhost:8080/style-guide/ to see the design system in action.

### Design Philosophy

We're modernizing a site that's been unchanged since ~2000. The goal is
**evolution, not revolution**—honor the legacy blue/orange palette and
professional tone while applying modern design principles and accessibility
standards. Dan should recognize his site instantly; a designer should approve
of the craftsmanship.

## SEO and AI Discoverability

The base layout (`src/_includes/base.njk`) includes SEO tags on every page:

- **Meta tags**: `robots`, `description`, `canonical` URL, Open Graph
  (`og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`)
- **Structured data**: JSON-LD with `Organization`, `Person`, `WebPage`,
  and `WebSite` (homepage only) schemas
- **Title**: Homepage uses `Site Name — tagline` format; other pages use
  `Page Title | Site Name`

Site-wide metadata is centralized in `src/_data/site.js` (company name, URL,
author, address, phone). The URL is derived from `PATH_PREFIX` for the current
deployment; when going live on the custom domain, set `SITE_URL` or update
the default in `site.js`.

Generated files (built from Nunjucks templates, not static):

- `/robots.txt` — allows all crawlers, links to sitemap
- `/sitemap.xml` — auto-generated from `collections.all`
- `/llms.txt` — AI-readable summary ([llmstxt.org](https://llmstxt.org/) format)
- `/llms-full.txt` — extended version with publications, clients, and
  technical background

## Internal Links and Path Prefix

The site is deployed to GitHub Pages under a path prefix (`/airfoils.com/`).
**All internal links must use the Liquid `url` filter** so the prefix is
applied correctly in every environment:

```markdown
<!-- Correct — works locally and on GitHub Pages -->
[Publications]({{ '/publications/' | url }})

<!-- Wrong — works locally but breaks on the deployed site -->
[Publications](/publications/)
```

This applies everywhere: cross-links, PDF downloads, image `src` attributes,
etc. The `.njk` files use the same pattern in raw HTML:
`href="{{ '/contact/' | url }}"`.

## Legacy Site

A mirror of the original http://airfoils.com/ is preserved in `legacy/` for
historical reference. To view it locally:

```bash
open legacy/index.html
```

## Deployment

Push to `main` triggers GitHub Actions which:
1. Builds the site
2. Runs linters
3. Deploys to GitHub Pages

## Git Workflow

- Small, frequent commits
- Follow [Tim Pope's commit message style](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html):
  subject line ≤50 characters (imperative mood, capitalized, no trailing
  period), blank line, then body wrapped at 72 characters
- Keep these files in sync when making changes:
  - `.gitignore` — when adding new tools or dependencies
  - `TODO.md` — as tasks are completed or plans change
  - `README.md` — developer instructions and documentation
  - `src/style-guide.njk` — when design decisions change

## Contact

- **Owner**: Dan Somers <dan@airfoils.com>
- **Developer**: Scott Woods <scott@westarete.com>

For questions about this project, please reach out via email.
