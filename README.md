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

**Why `check` and not `test`?** This project has no test suite — no assertions,
no test framework. What it has are quality checks: HTML validation, accessibility
auditing, link checking, and linting. The script is named `check` to accurately
describe what it does, and to leave `npm test` available if the project ever
needs real tests. The name follows precedent in TypeScript, Rust (`cargo check`),
and SvelteKit.

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
personas/               # Expert personas for AI-assisted development
```

## Working With AI

This project was built with significant AI assistance, and the quality came
from blending the perspectives of different experts — a typographer, an
accessibility specialist, an SEO expert, a software engineer, and someone
who understands Dan's audience. AI is good at channeling these perspectives
when asked, but it forgets them between conversations. The same AI that gave
you exacting typographic advice yesterday will make naive font choices today
unless you re-activate that expertise.

The `personas/` directory solves this. Each file is a prompt that changes
how the AI thinks — not project documentation, but an instruction to adopt
a specific expert's cognitive stance. When you want the AI to evaluate a
change through the eyes of a typographer, or to review content the way Dan's
clients would read it, reference the persona:

> "You are an expert @personas/typographer.md — review this heading scale."
>
> "@personas/audience.md — how does this page land with you?"

The personas don't duplicate project decisions (those live in the style guide,
README, and AGENTS.md). They change the AI's *way of thinking* — what it
notices, what it pushes back on, what it raises unprompted.

Available personas:

- **engineer.md** — Craft, feedback loops, tooling discipline
- **typographer.md** — Type systems, readability, the traditions of technical publishing
- **accessibility.md** — WCAG, perceptual review, the gap between automated and human judgment
- **seo.md** — Search optimization, AI discoverability, internal linking
- **audience.md** — Dan's clients: aerospace engineers who evaluate on substance, not polish

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

### Perceptual Accessibility

Automated tools (pa11y-ci) catch structural accessibility issues—missing alt
text, heading hierarchy, contrast ratios against backgrounds. They **cannot**
catch perceptual issues like whether a link is visually distinguishable from
surrounding text without relying on color alone (WCAG 1.4.1). This is a known
gap in AI-assisted development: AI tends to validate what automated tools can
measure and miss what requires human visual judgment.

**The developer should periodically apply the grayscale test:** look at the
site with color removed and ask, "Can I still tell what's interactive?" See
the [style guide's Accessibility section](/style-guide/#accessibility) for
details on the test and the rationale.

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
