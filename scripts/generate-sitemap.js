// Script to generate dynamic sitemap from API
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://cloud.isprout.in';
const API_VERSION = '/api/v2';
const SITE_URL = 'https://isprout.in';

// Fetch data from API
async function fetchAPI(endpoint) {
   try {
      const url = `${API_BASE_URL}${API_VERSION}${endpoint}`;
      const response = await fetch(url);
      if (response.ok) {
         return await response.json();
      }
      console.warn(`⚠ Failed to fetch ${endpoint}: ${response.status}`);
      return null;
   } catch (error) {
      console.warn(`⚠ Error fetching ${endpoint}:`, error.message);
      return null;
   }
}

// Generate sitemap XML
function generateSitemapXML(urls) {
   const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

   return xml;
}

async function generateSitemap() {
   console.log('🗺️  Generating dynamic sitemap...\n');

   const today = new Date().toISOString().split('T')[0];
   const urls = [];

   // Helper to add URL
   const addUrl = (loc, lastmod, changefreq, priority) => {
      urls.push({ loc: `${SITE_URL}${loc}`, lastmod, changefreq, priority });
   };

   // 1. Static Pages
   console.log('📄 Adding static pages...');
   const staticPages = [
      { path: '/', changefreq: 'weekly', priority: '1.0' },
      { path: '/about', changefreq: 'monthly', priority: '0.8' },
      { path: '/managed-office-space', changefreq: 'weekly', priority: '0.9' },
      { path: '/virtual-office', changefreq: 'monthly', priority: '0.8' },
      { path: '/meeting-rooms', changefreq: 'monthly', priority: '0.8' },
      { path: '/awards', changefreq: 'monthly', priority: '0.6' },
      { path: '/blogs', changefreq: 'weekly', priority: '0.7' },
      { path: '/careers', changefreq: 'monthly', priority: '0.6' },
      { path: '/testimonials', changefreq: 'monthly', priority: '0.6' },
      { path: '/news', changefreq: 'weekly', priority: '0.6' },
      { path: '/faq', changefreq: 'monthly', priority: '0.5' },
      { path: '/contact', changefreq: 'monthly', priority: '0.7' },
      { path: '/teams', changefreq: 'monthly', priority: '0.5' },
      { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
      { path: '/terms-conditions', changefreq: 'yearly', priority: '0.3' },
      { path: '/refund-policy', changefreq: 'yearly', priority: '0.3' },
      { path: '/cancellation-policy', changefreq: 'yearly', priority: '0.3' },
   ];

   staticPages.forEach(page => {
      addUrl(page.path, today, page.changefreq, page.priority);
   });
   console.log(`  ✓ Added ${staticPages.length} static pages`);

   // 2. Blogs - Dynamic from API
   console.log('📝 Fetching blogs from API...');
   const blogs = await fetchAPI('/core/static/website/blogs/index.json');
   if (blogs && Array.isArray(blogs)) {
      blogs.forEach(blog => {
         const blogUrl = blog.url || blog.id;
         const blogDate = blog.date || blog.updated_at || today;
         addUrl(`/blogs/${blogUrl}`, blogDate, 'monthly', '0.6');
      });
      console.log(`  ✓ Added ${blogs.length} blog pages`);
   }

   // 3. News - Dynamic from API
   console.log('📰 Fetching news from API...');
   const news = await fetchAPI('/core/static/website/news/index.json');
   if (news && Array.isArray(news)) {
      news.forEach(article => {
         const newsUrl = article.url || article.id;
         const newsDate = article.date || article.published_date || today;
         addUrl(`/news/${newsUrl}`, newsDate, 'monthly', '0.6');
      });
      console.log(`  ✓ Added ${news.length} news pages`);
   }

   // 4. Cities & Centers - Dynamic from API
   console.log('🏙️  Fetching cities and centers from API...');
   const cityCenters = await fetchAPI('/core/static/website/cities-centers/index.json');

   if (cityCenters && Array.isArray(cityCenters)) {
      const cities = new Set();
      let centerCount = 0;

      cityCenters.forEach(city => {
         // Add city page
         const cityId = city.id || city.name?.toLowerCase();
         if (cityId) {
            cities.add(cityId);
            addUrl(`/city/${cityId}`, today, 'weekly', '0.9');
         }

         // Add center pages
         if (city.centers && Array.isArray(city.centers)) {
            city.centers.forEach(center => {
               const centerId = center.id;
               if (centerId) {
                  addUrl(`/office/${centerId}`, today, 'monthly', '0.8');
                  centerCount++;
               }
            });
         }
      });

      console.log(`  ✓ Added ${cities.size} city pages`);
      console.log(`  ✓ Added ${centerCount} office/center pages`);
   }

   // 5. Careers - Dynamic from API
   console.log('💼 Fetching careers from API...');
   const careers = await fetchAPI('/core/static/website/careers/index.json');
   if (careers && careers.positions && Array.isArray(careers.positions)) {
      // Careers page already added in static, but count positions
      console.log(`  ✓ Careers page with ${careers.positions.length} positions`);
   }

   // 6. FAQs - Dynamic from API
   console.log('❓ Fetching FAQs from API...');
   const faqs = await fetchAPI('/core/static/website/faqs/index.json');
   if (faqs && Array.isArray(faqs)) {
      // FAQ page already added in static, but count questions
      console.log(`  ✓ FAQ page with ${faqs.length} questions`);
   }

   // Generate sitemap XML
   const sitemapXML = generateSitemapXML(urls);

   // Write to public folder
   const publicDir = path.join(__dirname, '..', 'public');
   const sitemapPath = path.join(publicDir, 'sitemap.xml');

   fs.writeFileSync(sitemapPath, sitemapXML, 'utf-8');

   console.log(`\n✅ Sitemap generated successfully!`);
   console.log(`📍 Total URLs: ${urls.length}`);
   console.log(`📁 Saved to: public/sitemap.xml\n`);

   return urls;
}

// Generate robots.txt
function generateRobotsTxt() {
   console.log('🤖 Generating robots.txt...');

   const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin/internal paths
Disallow: /thankyou
Disallow: /api/
`;

   const publicDir = path.join(__dirname, '..', 'public');
   const robotsPath = path.join(publicDir, 'robots.txt');

   fs.writeFileSync(robotsPath, robotsTxt, 'utf-8');
   console.log('✅ robots.txt generated successfully!');
   console.log(`📁 Saved to: public/robots.txt\n`);
}

// Run
async function run() {
   await generateSitemap();
   generateRobotsTxt();
}

run().catch(error => {
   console.error('❌ Error generating sitemap/robots:', error);
   process.exit(1);
});
