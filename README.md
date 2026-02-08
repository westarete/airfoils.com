# airfoils.com

Static website for Airfoils, Incorporated, the aerodynamic consulting firm of Dan Somers.

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

# Build + lint (all three linters — run before committing)
npm run check

# Lint only (skip build, useful during dev)
npm run lint

# Build for production (no linting)
npm run build
```

**Note**: `lint` and `check` require the dev server to be running (`npm run dev`)
because pa11y-ci tests against `http://localhost:8080`. Start the dev server in a
separate terminal first.

Linting mirrors CI to catch issues before commit:

- **html-validate** — HTML validation
- **Stylelint** — CSS linting
- **pa11y-ci** — Accessibility testing
- **linkinator** — Broken link checking (internal links only)

## Project Structure

```
src/
├── _includes/          # Shared templates (layouts, partials)
├── css/
│   └── input.css       # Tailwind directives
├── images/             # Static images
├── index.njk           # Homepage
├── style-guide.njk     # Design system reference (dev only)
└── *.njk               # Other pages

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
