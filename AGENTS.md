# AGENTS.md for airfoils.com static website

Static website for airfoils.com, the aerodynamic consulting firm of Dan Somers.

## About This Project

- Static site built with Eleventy (11ty) and Tailwind CSS
- Hosted on GitHub Pages, deployed via GitHub Actions
- See `README.md` for setup and commands
- See `TODO.md` for current tasks and wishlist
- See `/style-guide/` page for design principles, colors, typography, and patterns

## Working With the Developer

The developer has a background in test-driven development, CI/CD, and
infrastructure automation. They value accessibility, schema validation,
linting, and robust development processes. Work step by step, catch issues
early, and keep things simple and well-documented.

The developer is using this project to learn Cursor and find the right balance
between rapid AI-assisted development and robust, tested, mission-critical
practices. Help them develop good habits—explain trade-offs, suggest best
practices, and coach on process when relevant.

When referring to pages the developer should look at, always provide a
clickable markdown link (e.g., `[http://localhost:8080/style-guide/](http://localhost:8080/style-guide/)`)
— not just a URL in bold or backticks. The developer should be able to click
to get there, not copy-paste.

## Running Commands

Use `npm run check` (build + lint) or `npm run lint` (lint only) as a single
command instead of running individual linters separately. Don't `cd` into the
project directory — use the Shell tool's `working_directory` parameter instead.

Some commands require specific permissions:

- **`npm install`** — Requires `["all"]` permissions because the sandbox
  blocks writes to `~/.npm` cache outside the workspace.
- **`npm run check`** and **`npm run lint`** — Require `["all"]` permissions
  because pa11y-ci launches a headless browser that the sandbox blocks.
  **Known issue:** Cursor's sandbox injects a `PUPPETEER_CACHE_DIR` env var
  pointing to a temp sandbox directory. Chrome is installed in the default
  location (`~/.cache/puppeteer/`) but Puppeteer can't find it because the
  env var redirects the lookup. Even `["all"]` permissions don't clear the
  env var. **Workaround:** Prefix with `unset PUPPETEER_CACHE_DIR &&`, e.g.
  `unset PUPPETEER_CACHE_DIR && npm run lint` or
  `unset PUPPETEER_CACHE_DIR && npm run check`.
- **`npm run dev`** — Can run in background with `is_background: true`
- **`git push`** — Requires `["full_network"]` permissions

The dev server (`npm run dev`) must be running before `lint` or `check`
because pa11y-ci and linkinator test against `http://localhost:8080`.

All dev tools (linkinator, pa11y-ci, html-validate, etc.) are local
dependencies — run them with `npx` (e.g., `npx linkinator ...`), not as
bare commands. The npm scripts handle this automatically, but when running
ad-hoc commands in the terminal, always use `npx`.

**Never run `sudo` or commands that require elevated privileges.** If a
command truly requires root access (e.g., npm cache ownership needing
`chown`), explain the problem and let the developer fix it in their own
terminal.

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
- Prioritize clarity and cohesion over micro-optimizations. If something
  is logically a lint check, it belongs with the other lint checks — not
  shoved into an unrelated CI job because that job happens to have a
  running server. A few extra seconds of build time is always worth clear
  organization.
- Own the coherence of the codebase. You are the one writing the code, so
  keeping it well-factored is your responsibility — not just the current
  task, but everything you touch. If a new change reveals that a previous
  decision no longer makes sense, say so and fix it. Don't defer to
  "someone decided this before" — all decisions are documented, so the
  current context is all the context you need. Scope-creep is the wrong
  frame; coherence is the job.
- Own your environment. When a command fails, **debug it** — check env vars,
  paths, configs, permissions, and error messages before concluding "the
  developer needs to do this manually." The Cursor sandbox adds constraints (env
  vars, filesystem restrictions, network blocks), but most have workarounds
  (unsetting vars, requesting permissions, adjusting paths). Delegating to the
  human is a last resort, not a first instinct. The debugging steps are: (1)
  read the error message carefully, (2) check relevant env vars with `env | grep
  ...`, (3) verify paths and files exist, (4) try the obvious workaround, (5)
  document what you learn in AGENTS.md. Only escalate to the developer when the
  fix genuinely requires privileges or access you cannot obtain.

## Design Approach

The design philosophy is **evolution, not revolution**. See the style guide
page (`/style-guide/`) for full details on colors, typography, and patterns.

When changing colors, fonts, or spacing:
1. Update `src/css/input.css` first (source of truth for values in `@theme`)
2. Update `src/style-guide.njk` to reflect the rationale and examples
3. Verify visually on the style guide page (`/style-guide/`)

**Perceptual review:** Automated accessibility tools (pa11y-ci) catch
structural issues but cannot catch perceptual ones—like whether a link is
distinguishable from surrounding text without relying on color alone (WCAG
1.4.1). When adding or changing interactive elements, apply the grayscale
test: "If I remove all color, can I still tell what's interactive?" If not,
add a non-color affordance (underline, border, icon). See the style guide's
[Accessibility section](http://localhost:8080/style-guide/#accessibility)
for details.

**Note:** This project uses Tailwind CSS v4, which uses CSS-based configuration
with `@theme` in `input.css` instead of the JavaScript `tailwind.config.js` file.
The config.js file is kept for reference but is not used by Tailwind v4.

## Internal Links and Path Prefix

See "Internal Links and Path Prefix" in `README.md`. All internal links
**must** use the Liquid `| url` filter — bare paths like `/publications/`
break on the deployed site.

## Git Workflow

See `README.md` for commit message style and files to keep in sync.

### Pre-commit checklist (mandatory, every time)

Before running `git commit`, verify **all** of these — in order:

1. **TODO.md is up to date.** Every sub-task you completed has a `[x]`
   with detail showing what was done. Do this as you finish each sub-task,
   not in a batch at the end.
2. **Related docs are updated.** If you changed a command, tool, workflow,
   or design decision, check README.md, AGENTS.md, and style-guide.njk.
   README.md is the human-facing documentation and matters most.
3. **Ask the developer** to review the commit message before committing.

If you catch yourself about to commit without having done step 1, stop
and do it first. This has been forgotten repeatedly — the checklist
exists because reminders in prose don't work.

### Other guidance

- When you encounter a new constraint, gotcha, or learn something about the
  development environment (e.g., a command needs special permissions, a tool
  has quirks), update AGENTS.md immediately so you don't repeat the mistake.