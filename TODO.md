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

## Current Phase: Design & Content Import

### Design System (do first, on 1-2 pages)

6. [ ] Analyze legacy site structure and content inventory
7. [ ] Create base layout (header, nav, footer)
8. [ ] Establish Tailwind theme (colors, typography, spacing)
9. [ ] Build homepage with new design
10. [ ] Build one interior page to validate design system

### Content Import (after design is solid)

11. [ ] Import remaining pages one at a time
12. [ ] Migrate images and assets

### Validation

13. [ ] Add link checker to CI
14. [ ] Responsive testing across devices
15. [ ] Final accessibility audit

Consider Adding to Build/Lint:

- **Broken link checker** - `linkinator` or html-validate plugin (after content import)
- **Image optimization** - `eleventy-img` or build script (when importing images)
- **Visual regression** - Playwright or Percy screenshots (optional)

## Go Live Checklist

When ready to deploy to production at `airfoils.com`:

1. [ ] Remove `PATH_PREFIX: /airfoils.com/` from `.github/workflows/ci.yml`
2. [ ] Add `CNAME` file to `src/` containing `airfoils.com`
3. [ ] Update `eleventy.config.js` to copy CNAME to dist
4. [ ] Point `airfoils.com` DNS to GitHub Pages (185.199.108-111.153)
5. [ ] Enable custom domain in GitHub repo settings
6. [ ] Verify site works at `https://airfoils.com/`

## Wishlist

- Responsive design refinements
- SEO optimization (meta tags, structured data)
- AI optimization (llms.txt, etc.)
- Performance tuning (image optimization, etc.)
