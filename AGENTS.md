# AGENTS.md for airfoils.com static website

Static website for airfoils.com, the aerodynamic consulting firm of Dan Somers.

## About This Project

- Static site built with Eleventy (11ty) and Tailwind CSS
- Hosted on GitHub Pages, deployed via GitHub Actions
- See `README.md` for setup and commands
- See `TODO.md` for current tasks and wishlist

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