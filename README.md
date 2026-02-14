# airfoils.com

Static website for Airfoils Incorporated, the aerodynamic consulting firm of Dan Somers.

**Live site:** https://airfoils.com/

## Relationship with AI

This project is built for AI to be a first-class collaborator with the developer. Before you set up the dev environment, it's good to understand your role as it relates to the AI.

### Direction

You decide what to work on and in what order. At a high level, you do this
through `TODO.md` — it tracks the project's goals, current phase, and
completed work. At a tactical level, you manage direction through your
prompts: what to build, which files to change, which expert perspective to
activate.

Activate the right expertise for each task — the typographer for a font
decision, the audience persona for a content review, the engineer when
evaluating a tool change. The AI executes; you set the course.

### Context

The AI starts every conversation knowing only what's in its persistent files
and whatever you reference. When it makes a mistake because it didn't know
something — the path prefix convention, that Dan's clients are aerospace
engineers, how the build pipeline works — the fix is to put that knowledge
where the AI will find it next time.

Context lives in many places depending on what it is:

- **`README.md`** — Project documentation, conventions, and setup. Both
  humans and AI read this.
- **`src/style-guide.njk`** — The visual source of truth for the design
  system. Run `npm run dev` and visit
  [http://localhost:8080/style-guide/](http://localhost:8080/style-guide/)
  to see it rendered. When the AI needs to understand what the site looks
  like and why, this is where it looks.
- **`src/_data/site.js`** — Centralized site metadata (name, URL, author,
  address). Referenced by templates for SEO tags and structured data.
- **Inline code comments** — Local context about why a specific decision
  was made. When a line of code has a non-obvious reason, a comment keeps
  that context next to the code where it matters.

### Behavior

Sometimes the AI has the right information but the wrong approach. It knows
the font choices but doesn't think typographically. It knows the WCAG rules
but doesn't perceive the page as a screen reader user would. Two files
address this:

**`AGENTS.md`** is auto-loaded by AI tools (Cursor, Claude Code) at the
start of every conversation. It contains project principles, workflow rules,
and environment-specific guidance — things like "build the feedback loop
before adding complexity" and "own the coherence of the codebase." This
shapes the AI's general working behavior on this project.

**`personas/`** contains expert personas that change how the AI *thinks*
about specific domains. Each file is a prompt that activates a cognitive
stance — not project documentation, but an instruction to adopt a specific
expert's perspective. Reference them when you need that expertise:

> "You are an expert @personas/typographer.md — review this heading scale."
>
> "@personas/audience.md — how does this page land with you?"

Available personas:

- **engineer.md** — Craft, feedback loops, tooling discipline
- **typographer.md** — Type systems, readability, the traditions of technical publishing
- **accessibility.md** — WCAG, perceptual review, the gap between automated and human judgment
- **seo.md** — Search optimization, AI discoverability, internal linking
- **audience.md** — Dan's clients: aerospace engineers who evaluate on substance, not polish

### Outputs

You own the quality of everything the AI produces, and that should remain a
high bar. Review across every discipline — not just for correctness, but for
coherence. Does this sound like Dan? Does this page build trust with a senior
engineer at NREL? Does the typography match the authority of the person it
represents?

**Automated checks** catch structural problems. Run `npm run check` before
committing — it builds the site and runs four linters: HTML validation
(html-validate), CSS linting (Stylelint), accessibility testing (pa11y-ci),
and broken link checking (linkinator).

**You catch everything automation cannot:**

- **Perceptual accessibility.** Automated tools cannot catch whether a link
  is visually distinguishable from surrounding text without relying on color
  alone (WCAG 1.4.1). Periodically apply the grayscale test: look at the
  site with color removed and ask, "Can I still tell what's interactive?"
  See the
  [style guide's Accessibility section](/style-guide/#accessibility) for
  details.
- **Dan's voice.** The content was originally written by Dan himself —
  direct, technically precise, confident without being boastful. When the AI
  generates or edits copy, make sure it still sounds like Dan, not like a
  marketing agency.
- **Visual review.** Check the site at different viewport widths (320px,
  768px, 1024px+). The AI can write responsive CSS but cannot see the result.


## Development Setup

This project was developed with [Cursor](https://www.cursor.com/), but
nothing about it is Cursor-specific. Any AI-enabled editor (Claude Code,
Copilot, etc.) will pick up `AGENTS.md` and the personas. Manual coding
works fine too — the README and style guide document everything you need.

The tech stack is [Eleventy](https://www.11ty.dev/) (static site generator)
and [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS), deployed
to GitHub Pages via GitHub Actions. Eleventy was chosen for its simple mental
model (HTML templates with includes and layouts), zero client-side JavaScript
in output, and great Tailwind integration.

Requires **Node.js v18 or later** (install via [Homebrew](https://brew.sh/):
`brew install node`).

### Commands

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

**Note**: `lint` and `check` require the dev server to be running (`npm run
dev`) because pa11y-ci and linkinator test against `http://localhost:8080`.
Start the dev server in a separate terminal first.

**Why `check` and not `test`?** This project has no test suite — no
assertions, no test framework. What it has are quality checks: HTML
validation, accessibility auditing, link checking, and linting. The script is
named `check` to accurately describe what it does, and to leave `npm test`
available if the project ever needs real tests. The name follows precedent in
TypeScript, Rust (`cargo check`), and SvelteKit.

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

## Design System

The site's visual design is documented in two places:

1. **`src/css/input.css`** — The source of truth for actual values (colors,
   fonts, spacing) defined in the `@theme` block. This project uses Tailwind
   CSS v4's CSS-based configuration.

2. **`/style-guide/`** — A self-documenting page showing all design tokens,
   components, and the rationale behind them. Run `npm run dev` and visit
   [http://localhost:8080/style-guide/](http://localhost:8080/style-guide/)
   to see the design system in action.

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
author, address, phone). The URL defaults to `https://airfoils.com` and can
be overridden with the `SITE_URL` environment variable.

Generated files (built from Nunjucks templates, not static):

- `/robots.txt` — allows all crawlers, links to sitemap
- `/sitemap.xml` — auto-generated from `collections.all`
- `/llms.txt` — AI-readable summary ([llmstxt.org](https://llmstxt.org/) format)
- `/llms-full.txt` — extended version with publications, clients, and
  technical background

## Internal Links

**All internal links must use the Liquid `url` filter** so they work
correctly in every environment:

```markdown
[Publications]({{ '/publications/' | url }})
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
