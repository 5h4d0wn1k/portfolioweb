// Vercel Build Script with SEO Optimizations
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Log with timestamps for debugging in Vercel
const log = (message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
};

// Main build function
async function main() {
  try {
    log('🚀 Starting Vercel build with SEO optimizations...');
    
    // Run the standard build
    log('📦 Building the site...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Check if dist directory exists
    const distDir = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distDir)) {
      throw new Error('Build output directory not found!');
    }
    
    // Vercel doesn't allow outgoing HTTP requests during builds, so we'll skip the notification
    // But we'll log a reminder to manually submit sitemaps
    log('⚠️ Remember to submit your sitemaps to Google and Bing after deployment!');
    log('🔗 Google: https://search.google.com/search-console');
    log('🔗 Bing: https://www.bing.com/webmasters');
    
    // Verify the sitemap exists
    const sitemapPath = path.join(distDir, 'sitemap-extended.xml');
    if (fs.existsSync(sitemapPath)) {
      log('✅ Sitemap generated successfully!');
    } else {
      log('⚠️ WARNING: Extended sitemap not found. SEO may be affected.');
    }
    
    log('🎉 Build completed successfully with SEO optimizations!');
    
  } catch (error) {
    log(`❌ Build failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the build
main(); 