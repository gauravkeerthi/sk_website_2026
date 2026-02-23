# StrongKeep Website

Marketing website for StrongKeep, built with [Eleventy (11ty)](https://www.11ty.dev/).

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
cd strongkeep-site
npm install
```

## Development

Start the local dev server with live reload:

```bash
npm run dev
```

The site will be available at `http://localhost:8080`.

## Build

Generate the production build:

```bash
npm run build
```

Output is written to the `output/` directory.

## Project Structure

```
strongkeep-site/
├── src/
│   ├── _includes/
│   │   ├── layouts/
│   │   │   └── base.njk          # Main HTML template with navbar, footer, styles
│   │   └── partials/
│   │       ├── navbar.njk        # Site navigation
│   │       └── footer.njk        # Site footer
│   ├── pages/
│   │   ├── index.njk             # Homepage
│   │   ├── features.njk          # Features page
│   │   ├── pricing.njk           # Pricing page
│   │   ├── about.njk             # About page
│   │   ├── faq.njk               # FAQ page
│   │   ├── contact-form.njk      # Contact form
│   │   ├── partners.njk          # Partners page
│   │   ├── news-updates.njk      # News page
│   │   ├── privacy-policy.njk    # Privacy policy
│   │   ├── terms-of-service.njk  # Terms of service
│   │   ├── 404.njk               # 404 error page
│   │   └── solutions/            # Solution pages
│   │       ├── compliance-readiness.njk
│   │       ├── healthcare-clinics.njk
│   │       ├── professional-services.njk
│   │       ├── protection-assurance.njk
│   │       └── starting-your-cybersecurity-journey.njk
│   └── public/
│       └── assets/
│           └── images/           # Site images, GIFs, videos
├── output/                       # Generated site (gitignored)
├── .eleventy.js                  # Eleventy config
└── package.json
```

## Adding/Updating Pages

1. Create or edit `.njk` files in `src/pages/`
2. Use the base layout by adding frontmatter:
   ```yaml
   ---
   layout: base.njk
   title: "Page Title"
   description: "Page description for SEO"
   ---
   ```
3. Run `npm run dev` to preview changes

## Adding Images

Place images in `src/public/assets/images/`. They'll be copied to `/assets/images/` in the build.

## Deployment to GitHub Pages

### Option 1: Manual Deploy

1. Build the site:
   ```bash
   npm run build
   ```
2. Push the `output/` folder contents to the `gh-pages` branch

### Option 2: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: strongkeep-site/package-lock.json

      - name: Install dependencies
        working-directory: strongkeep-site
        run: npm ci

      - name: Build site
        working-directory: strongkeep-site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: strongkeep-site/output

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Then enable GitHub Pages in repo settings:
1. Go to Settings > Pages
2. Set Source to "GitHub Actions"

## Styles

All CSS is embedded in `src/_includes/layouts/base.njk`. Key sections:
- CSS variables for colors/fonts
- Responsive breakpoints at 768px
- Animation classes (`.animate-on-scroll`)

## Key URLs

- Production app: https://app.strongkeep.com
- Free scan tool: https://cyberscan.strongkeep.com
