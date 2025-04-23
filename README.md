# Astro Starter Kit: Portfolio

```sh
npm create astro@latest -- --template portfolio
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/portfolio)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/portfolio)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/portfolio/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![portfolio](https://user-images.githubusercontent.com/357379/210779178-a98f0fb7-6b1a-4068-894c-8e1403e26654.jpg)

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# Nikhil Nagpure Portfolio Website

This is the repository for Nikhil Nagpure's professional portfolio website, showcasing cybersecurity expertise, development projects, and professional services.

## 🚀 Deployment Instructions (Vercel)

This project is configured for optimal deployment on Vercel with built-in SEO optimizations.

### One-Click Deployment

The easiest way to deploy is using the Vercel Deploy Button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F5h4d0wn1k%2Fportfolioweb)

### Manual Deployment Steps

1. **Connect your GitHub repository to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Vercel will automatically detect the project as an Astro project

2. **Configure deployment settings**
   - Build Command: `npm run vercel-build` (This is automatically set by vercel.json)
   - Output Directory: `dist` (This is automatically set by vercel.json)
   - Install Command: `npm install` (default)

3. **Environment Variables**
   - No custom environment variables are required for basic deployment

4. **Deploy**
   - Click "Deploy" and wait for the build to complete

## 📊 SEO Optimizations

This project includes several SEO optimizations that are automatically applied during the build process:

- Structured data using JSON-LD for improved search engine visibility
- Dynamic sitemap generation
- Enhanced meta tags
- Optimized robots.txt
- Security headers for better ranking

### Post-Deployment SEO Tasks

After deploying the site, you should:

1. **Submit your sitemaps to search engines**:
   - Google Search Console: https://search.google.com/search-console
   - Bing Webmaster Tools: https://www.bing.com/webmasters

2. **Verify ownership in Google Search Console**:
   - Add your site to Google Search Console
   - Follow instructions to verify ownership (usually through a meta tag)
   - Replace the placeholder verification code in `src/layouts/BaseLayout.astro` with the real one

3. **Check console for any SEO warnings or errors**

## 🧰 Development Commands

| Command                | Action                                                  |
| :--------------------- | :------------------------------------------------------ |
| `npm install`          | Install dependencies                                    |
| `npm run dev`          | Start local dev server at `localhost:3000`              |
| `npm run build`        | Build your production site to `./dist/`                 |
| `npm run preview`      | Preview your build locally before deploying             |
| `npm run build:seo`    | Build with SEO optimizations + notify search engines    |
| `npm run notify`       | Manually notify search engines about sitemap updates    |

## 📝 SEO Checklist

A comprehensive SEO checklist is available in the `SEO-CHECKLIST.md` file to help maintain and improve your site's search visibility. Refer to this file for ongoing SEO maintenance.
