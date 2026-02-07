# AGENTS.md for airfoils.com static website

Static website for airfoils.com, the aerodynamic consulting firm of Dan Somers.

## About This Project

- Static site built with Eleventy (11ty) and Tailwind CSS
- Hosted on GitHub Pages, deployed via GitHub Actions
- See `README.md` for setup and commands
- See `TODO.md` for current tasks and wishlist
- See `STYLE_GUIDE.md` for design principles, colors, typography, and patterns

## Working With the Developer

The developer has a background in test-driven development, CI/CD, and
infrastructure automation. They value accessibility, schema validation,
linting, and robust development processes. Work step by step, catch issues
early, and keep things simple and well-documented.

The developer is using this project to learn Cursor and find the right balance
between rapid AI-assisted development and robust, tested, mission-critical
practices. Help them develop good habits—explain trade-offs, suggest best
practices, and coach on process when relevant.

## Principles

- Choose the best tools that are coherent and native to the environment, that
  emphasize simplicity and craft, and are popular and stable.
- Build the feedback loop before adding complexity. Establish checks (linting,
  tests, CI) on a minimal working state, then introduce changes incrementally.
  Catch issues when context is small and causes are obvious.
- Be proactive about warnings and errors. When npm, linters, or other tools
  emit warnings, investigate them immediately. Explain what's causing them,
  whether they're actionable, and recommend a course of action—don't wait for
  the developer to notice and ask.
- Test real behavior, not assumptions. Smoke tests should verify what the
  page actually requests, not hardcoded paths.
- Minimize environment differences between local dev, CI, and production.
  When differences are necessary (like path prefixes), make them explicit
  and configurable.

## Design Approach

We're modernizing a site that's been unchanged since ~2000. The philosophy is
**evolution, not revolution**:

- Honor the legacy blue/orange palette as inspiration
- Apply classic design principles (color theory, typography, grids)
- Prioritize readability and professionalism over trendiness
- Ensure accessibility (WCAG 2.1 AA minimum)
- Dan should recognize his site instantly; a designer should approve too

### Design System Files

Keep these in sync when making visual changes:

1. **`STYLE_GUIDE.md`** — Design rationale, color theory, typography choices.
   Explains the "why" behind decisions. Read this for context.

2. **`tailwind.config.js`** — Source of truth for actual values (colors,
   fonts, spacing). This is what the code uses.

3. **`src/style-guide.njk`** — Rendered page showing design tokens and
   components. Use this for visual review during development.

When changing colors, fonts, or spacing: update `tailwind.config.js` first,
then update `STYLE_GUIDE.md` to reflect the rationale, then verify visually
on the style guide page.

## Git Workflow

- Small, frequent commits.
- Follow Tim Pope's 50/72 commit message style: subject line ≤50 characters
  (imperative mood, capitalized, no trailing period), blank line, then body
  wrapped at 72 characters explaining what and why.
- Always check with the developer before committing so they can review and edit
  the commit message.
- Keep `.gitignore` up to date when adding new tools or dependencies.
- Keep `TODO.md` up to date as tasks are completed or plans change.
- Keep `README.md` up to date with developer instructions and documentation.
- Keep `STYLE_GUIDE.md` up to date when design decisions change. 