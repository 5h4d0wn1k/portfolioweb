// Script to notify search engines about sitemap updates
import https from 'https';

const SITE_URL = 'https://portfolio.shadownik.tech';
const SITEMAP_URL = `${SITE_URL}/sitemap-extended.xml`;

// Search engines to notify
const SEARCH_ENGINES = [
  {
    name: 'Google',
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  },
  {
    name: 'Bing',
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  }
];

// Function to ping a search engine
function pingSearchEngine(engine) {
  return new Promise((resolve, reject) => {
    https.get(engine.url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`✅ ${engine.name} notified successfully (Status ${res.statusCode})`);
        resolve(true);
      });
      
    }).on('error', (err) => {
      console.error(`❌ Error notifying ${engine.name}:`, err.message);
      reject(err);
    });
  });
}

// Notify all search engines
async function notifyAllSearchEngines() {
  console.log('🔔 Notifying search engines about sitemap update...');
  console.log(`📋 Sitemap URL: ${SITEMAP_URL}`);
  
  try {
    await Promise.all(SEARCH_ENGINES.map(engine => pingSearchEngine(engine)));
    console.log('✅ All search engines notified successfully!');
  } catch (error) {
    console.error('❌ Error during notification process:', error);
  }
}

// Run the notification process
notifyAllSearchEngines(); 