# TODO

## Project Goals

- Import the current https://airfoils.com/ website into a static website
- Modernize the code and style while preserving the original content and general layout
- Make the website responsive and mobile-friendly
- Continually check for HTML and CSS validation, accessibility, and security issues
- Optimize the website for SEO and AI
- Provide complete documentation for easy maintenance

## Current Phase: Build the Feedback Loop

1. [x] Archive legacy site to `legacy/` for historical reference
2. [ ] Scaffold Eleventy + Tailwind (minimal "hello world" that builds)
3. [ ] Add local linting (HTML, CSS, a11y) that passes on hello world
4. [ ] Set up GitHub Actions (CI runs same checks, deploys to Pages)
5. [ ] Verify full loop: push → CI passes → site deploys

## Next Phase: Import Content

6. [ ] Analyze legacy site structure
7. [ ] Import content one page at a time, each passing checks

## Wishlist

- Responsive design refinements
- SEO optimization (meta tags, structured data)
- AI optimization (llms.txt, etc.)
- Performance tuning (image optimization, etc.)
