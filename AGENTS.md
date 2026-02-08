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

## Running Commands

Some commands require specific permissions:

- **`npm run lint:a11y`** (pa11y-ci) — Requires `["all"]` permissions because
  it launches a headless browser. The sandbox blocks browser process spawning.
- **`npm run dev`** — Can run in background with `is_background: true`
- **`git push`** — Requires `["full_network"]` permissions

When running the full lint suite, run `lint:html` and `lint:css` first (they
work in the sandbox), then run `lint:a11y` separately with full permissions.

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

The design philosophy is **evolution, not revolution**. See `STYLE_GUIDE.md`
for full details on colors, typography, and component patterns.

When changing colors, fonts, or spacing:
1. Update `src/css/input.css` first (source of truth for values in `@theme`)
2. Update `STYLE_GUIDE.md` to reflect the rationale
3. Verify visually on the style guide page (`/style-guide/`)

**Note:** This project uses Tailwind CSS v4, which uses CSS-based configuration
with `@theme` in `input.css` instead of the JavaScript `tailwind.config.js` file.
The config.js file is kept for reference but is not used by Tailwind v4.

## Git Workflow

See `README.md` for commit message style and files to keep in sync.

Additional guidance for agents:
- Always check with the developer before committing so they can review and
  edit the commit message.
- When making changes, proactively update related documentation files.
- When you encounter a new constraint, gotcha, or learn something about the
  development environment (e.g., a command needs special permissions, a tool
  has quirks), update AGENTS.md immediately so you don't repeat the mistake. 