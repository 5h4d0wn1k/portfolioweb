# Nikhil Nagpure — Portfolio Website

![Deploy](https://github.com/5h4d0wn1k/portfolioweb/actions/workflows/deploy.yml/badge.svg)
![GitHub stars](https://img.shields.io/github/stars/5h4d0wn1k/portfolioweb)
![Last commit](https://img.shields.io/github/last-commit/5h4d0wn1k/portfolioweb)

A professional **portfolio website built with Astro** — showcasing cybersecurity expertise, development projects, and professional services with built-in SEO: JSON-LD structured data, dynamic sitemaps, enhanced meta tags, and optimized `robots.txt`.

## Why

Your portfolio is your storefront. This Astro site is engineered for **personal-brand SEO**: every page ships structured data, security headers, and sitemaps so search engines — and recruiters — can discover projects, certifications, and services fast. Zero custom environment variables needed to deploy, with one-click Vercel deployment and a Netlify-ready config included.

## Features

- **Astro + TypeScript** — fast static output in `dist/`, minimal JavaScript.
- **SEO auto-build** — `build:seo` builds the site *and* notifies search engines; manual `notify` command included.
- **JSON-LD structured data**, dynamic sitemap generation, enhanced meta tags, optimized `robots.txt`.
- **Security headers** (X-Frame-Options, CSP, XSS protection) via `netlify.toml`/`vercel.json`.
- **Vercel & Netlify deploy configs**, one-click deploy button.

## Quickstart

```bash
npm install
npm run dev          # local dev server (localhost:4321)
npm run build        # production build to ./dist/
npm run preview      # preview build locally
npm run build:seo    # build + notify search engines
npm run notify       # re-notify search engines about sitemap updates
```

### Deploy

- **Vercel** — one-click: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F5h4d0wn1k%2Fportfolioweb). Build command `npm run vercel-build`, output `dist`.
- **Netlify** — `npm run build:seo`, publish `dist`.

After deploying: submit sitemaps to Google Search Console / Bing Webmaster Tools and replace the placeholder verification meta tag in `src/layouts/BaseLayout.astro`.

## Project structure

```
portfolioweb/
├── src/            # Astro pages, layouts, components, content collections
├── public/         # static assets, robots.txt, sitemaps
├── scripts/        # notify-search-engines.js, optimize-images.js, vercel-build.js
├── astro.config.mjs
├── netlify.toml, vercel.json
└── SEO-CHECKLIST.md
```

## Documentation

- [SEO-CHECKLIST.md](SEO-CHECKLIST.md) — ongoing SEO maintenance checklist

## Contributing

Fork, make your changes, and submit a pull request. Keep the SEO build pipeline intact.

## License

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

