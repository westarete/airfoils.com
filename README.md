# airfoils.com

Static website for Airfoils, the aerodynamic consulting firm of Dan Somers.

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

# Build for production
npm run build
```

## Project Structure

```
src/
├── _includes/          # Shared templates (layouts, partials)
├── css/
│   └── input.css       # Tailwind directives
├── images/             # Static images
├── index.njk           # Homepage
└── *.njk               # Other pages

dist/                   # Built output (generated, not committed)
legacy/                 # Archived copy of original airfoils.com
```

## Legacy Site

A mirror of the original http://airfoils.com/ is preserved in `legacy/` for
historical reference. To view it locally:

```bash
npx serve legacy/airfoils.com
```

Then open http://localhost:3000 in your browser.

## Linting

Local linting mirrors CI to catch issues before commit:

- **html-validate** - HTML validation
- **Stylelint** - CSS linting
- **pa11y-ci** - Accessibility testing

Run all checks: `npm run lint` *(not yet implemented)*

## Deployment

Push to `main` triggers GitHub Actions which:
1. Builds the site
2. Runs linters
3. Deploys to GitHub Pages

## Contact

- **Owner**: Dan Somers <dan@airfoils.com>
- **Developer**: Scott Woods <scott@westarete.com>

For questions about this project, please reach out via email.
