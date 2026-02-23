// Script to generate routes from API for pre-rendering
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your API base URL
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://cloud.isprout.in';
const API_VERSION = '/api/v2';

async function generateRoutes() {
   try {
      console.log('📝 Generating routes for pre-rendering...');

      // Static routes
      const staticRoutes = [
         '/',
         '/about/',
         '/managed-office-space/',
         '/virtual-office/',
         '/meeting-rooms/',
         '/awards/',
         '/blogs/',
         '/careers/',
         '/testimonials/',
         '/news/',
         '/faq/',
         '/contact/',
         '/teams/',
         '/privacy-policy/',
         '/terms-conditions/',
         '/refund-policy/',
         '/cancellation-policy/',
      ];

      // Fetch blog routes from API
      let blogRoutes = [];
      try {
         const blogsUrl = `${API_BASE_URL}${API_VERSION}/core/static/website/blogs/index.json`;
         console.log(`🌐 Fetching blogs from API...`);

         const blogsResponse = await fetch(blogsUrl);

         if (blogsResponse.ok) {
            const blogs = await blogsResponse.json();
            blogRoutes = blogs.map(blog => `/blogs/${blog.url || blog.id}/`);
            console.log(`  ✓ Fetched ${blogRoutes.length} blog routes`);
         } else {
            console.warn(`  ⚠ Could not fetch blogs (${blogsResponse.status}), using static list`);
            blogRoutes = getStaticBlogRoutes();
         }
      } catch (error) {
         console.warn('  ⚠ API fetch failed, using static blog list:', error.message);
         blogRoutes = getStaticBlogRoutes();
      }

      // Fetch news routes from API
      let newsRoutes = [];
      try {
         const newsUrl = `${API_BASE_URL}${API_VERSION}/core/static/website/news/index.json`;
         console.log(`📰 Fetching news from API...`);

         const newsResponse = await fetch(newsUrl);

         if (newsResponse.ok) {
            const news = await newsResponse.json();
            newsRoutes = news.map(article => `/news/${article.url || article.id}/`);
            console.log(`  ✓ Fetched ${newsRoutes.length} news routes`);
         } else {
            console.warn(`  ⚠ Could not fetch news (${newsResponse.status})`);
         }
      } catch (error) {
         console.warn('  ⚠ Failed to fetch news:', error.message);
      }

      // Fetch city and office routes from API
      let cityRoutes = [];
      let officeRoutes = [];
      try {
         const cityCentersUrl = `${API_BASE_URL}${API_VERSION}/core/static/website/cities-centers/index.json`;
         console.log(`🏙️  Fetching cities and centers from API...`);

         const cityCentersResponse = await fetch(cityCentersUrl);

         if (cityCentersResponse.ok) {
            const cityCenters = await cityCentersResponse.json();

            cityCenters.forEach(city => {
               const cityId = city.id || city.name?.toLowerCase();
               if (cityId) {
                  cityRoutes.push(`/city/${cityId}/`);
               }

               if (city.centers && Array.isArray(city.centers)) {
                  city.centers.forEach(center => {
                     if (center.id) {
                        officeRoutes.push(`/office/${center.id}/`);
                     }
                  });
               }
            });

            console.log(`  ✓ Fetched ${cityRoutes.length} city routes`);
            console.log(`  ✓ Fetched ${officeRoutes.length} office routes`);
         } else {
            console.warn(`  ⚠ Could not fetch cities/centers (${cityCentersResponse.status}), using static list`);
            cityRoutes = getStaticCityRoutes();
            officeRoutes = getStaticOfficeRoutes();
         }
      } catch (error) {
         console.warn('  ⚠ Failed to fetch cities/centers, using static list:', error.message);
         cityRoutes = getStaticCityRoutes();
         officeRoutes = getStaticOfficeRoutes();
      }

      // Combine all routes
      const allRoutes = [
         ...staticRoutes,
         ...cityRoutes,
         ...officeRoutes,
         ...blogRoutes,
         ...newsRoutes,
      ];

      // Write routes to a file
      const routesFilePath = path.join(__dirname, '..', 'generated-routes.json');
      fs.writeFileSync(routesFilePath, JSON.stringify(allRoutes, null, 2));

      console.log(`\n✅ Generated ${allRoutes.length} routes`);
      console.log(`  📄 ${staticRoutes.length} static pages`);
      console.log(`  🏙️  ${cityRoutes.length} city pages`);
      console.log(`  🏢 ${officeRoutes.length} office pages`);
      console.log(`  📝 ${blogRoutes.length} blog pages`);
      console.log(`  📰 ${newsRoutes.length} news pages`);
      console.log(`📁 Routes saved to: generated-routes.json\n`);

      return allRoutes;
   } catch (error) {
      console.error('❌ Error generating routes:', error);
      process.exit(1);
   }
}

// Static fallback blog routes (all 104 blogs)
function getStaticBlogRoutes() {
   return [
      '/blogs/workspace-as-a-service',
      '/blogs/what-exceptional-managed-office-design-truly-delivers',
      '/blogs/customized-vs-plug-and-play-offices',
      '/blogs/how-gccs-are-influencing-future-of-workspaces',
      '/blogs/why-managed-offices-are-the-top-choice-for-corporates-today',
      '/blogs/operational-excellence-in-modern-workspaces',
      '/blogs/lease-terms-differ-between-traditional-and-managed-offices',
      '/blogs/how-do-virtual-offices-improve-scale-for-startups',
      '/blogs/thinking-of-upgrading-your-workspace',
      '/blogs/are-virtual-offices-a-sustainable-choice',
      '/blogs/why-flexible-meeting-rooms-are-ideal',
      '/blogs/office-space-trends-2026',
      '/blogs/location-checklist-before-you-rent-an-office',
      '/blogs/top-virtual-office-features',
      '/blogs/why-managed-offices-are-the-smart-choice-for-startups',
      '/blogs/smart-way-to-choose-your-office-location',
      '/blogs/why-managed-office-spaces-are-redefining-workplaces-in-india',
      '/blogs/top-5-reasons-why-corporates-are-heading-to-coworking-spaces',
      '/blogs/12-reasons-to-work-from-isprout',
      '/blogs/why-are-us-offices-expanding-to-indian-coworking-spaces',
      '/blogs/how-to-find-the-right-coworking-space-for-you',
      '/blogs/why-are-virtual-meetings-not-working-what-is-the-alternative',
      '/blogs/the-future-of-collaboration-in-coworking-spaces',
      '/blogs/coworking-space-for-entrepreneurs',
      '/blogs/why-co-working-spaces-are-important-for-andhrapradesh',
      '/blogs/hyderabads-best-co-working-spaces-for-the-cool-creative',
      '/blogs/the-science-of-smart-office-design',
      '/blogs/how-can-a-remote-team-be-managed-in-a-managed-office-space',
      '/blogs/coworking-space-for-freelancers',
      '/blogs/what-is-a-satellite-office-why-should-you-set-up-one-in-hyderabad',
      '/blogs/how-to-improve-your-networking-skills-in-coworking-spaces-in-pune',
      '/blogs/level-up-your-business-with-an-upscale-office-environment-rent-a-spot-in-isprouts-corporate-coworking-spaces',
      '/blogs/why-are-indian-startups-choosing-coworking-spaces-over-traditional-offices',
      '/blogs/from-solopreneur-to-community-why-managed-office-space-thrives',
      '/blogs/4-office-design-perks-that-will-attract-and-inspire-millennial-workers',
      '/blogs/why-are-larger-companies-now-opting-for-coworking-spaces',
      '/blogs/top-5-coworking-spaces-in-pune',
      '/blogs/why-are-enterprises-moving-to-coworking-spaces',
      '/blogs/how-to-boost-creativity-and-productivity-in-coworking-spaces',
      '/blogs/from-tradition-to-innovation-managed-office-spaces-reshaping-bangalore',
      '/blogs/pros-and-cons-of-working-from-a-creative-space',
      '/blogs/shared-office-space-a-new-age-concept-adopted-by-many-corporate-giants',
      '/blogs/how-can-co-working-spaces-help-small-businesses-operate-hassle-free',
      '/blogs/6-factors-to-remember-before-selecting-a-coworking-space',
      '/blogs/importance-of-coworking-spaces-in-an-era-of-remote-work',
      '/blogs/tips-to-start-your-small-business',
      '/blogs/4-brilliant-coworking-space-types-to-suit-your-business-needs',
      '/blogs/the-rise-of-coworking-spaces-in-india-from-concept-to-household-term',
      '/blogs/how-does-coworking-space-benefit-entrepreneurs-in-terms-of-networking',
      '/blogs/why-should-you-choose-a-managed-office-space-as-a-start-up-owner',
      '/blogs/advantages-of-co-working-spaces-in-2020',
      '/blogs/why-are-pune-business-owners-shifting-to-coworking-spaces',
      '/blogs/events-and-lifestyle-of-isprout',
      '/blogs/coworking-space-for-interior-designers-are-ideal',
      '/blogs/how-do-businesses-save-money-with-shared-office-spaces',
      '/blogs/5-top-brands-that-used-co-working-spaces-to-grow-and-expand',
      '/blogs/hyderabads-office-scene-to-focus-on-flex-hybrid-and-green-in-2023',
      '/blogs/coworking-spaces-for-it-industries',
      '/blogs/back-to-office-hitting-your-pockets-bad',
      '/blogs/why-should-freelancers-choose-a-coworking-space-rather-than-working-remotely',
      '/blogs/office-space-standards-and-guidelines',
      '/blogs/economic-benefits-of-opting-for-a-shared-office-space',
      '/blogs/how-to-practice-self-care-at-workplace',
      '/blogs/cost-effective-business-growth-leveraging-managed-office-spaces',
      '/blogs/the-future-of-workspace-flexibility-adapting-to-today-and-tomorrow',
      '/blogs/common-workplace-challenges-and-how-to-overcome-them',
      '/blogs/top-4-strategies-to-protect-your-company-culture-in-a-coworking-space',
      '/blogs/how-to-avoid-loneliness-when-youre-working-from-home',
      '/blogs/differentiate-between-coworking-space-and-traditional-space',
      '/blogs/rent-office-space-for-filming',
      '/blogs/why-are-modern-coworking-spaces-great-for-cutting-your-business-expenses',
      '/blogs/how-to-choose-the-right-coworking-space-for-your-working-needs',
      '/blogs/7-reasons-why-corporates-are-getting-inclined-towards-coworking-space',
      '/blogs/benefits-of-dedicated-desks-and-why-you-should-use-one',
      '/blogs/the-giants-that-emerged-from-co-working-spaces',
      '/blogs/unveiling-the-advantages-of-managed-office-space-in-hyderabad',
      '/blogs/future-of-coworking-spaces-in-india',
      '/blogs/6-ways-how-coworking-spaces-can-improve-your-mental-health',
      '/blogs/why-managed-office-spaces-are-gaining-more-attention-over-coworking-spaces',
      '/blogs/why-choosing-the-right-location-for-your-office-space-is-vital',
      '/blogs/types-of-services-coworking-spaces-can-offer',
      '/blogs/coworking-spaces-in-india-a-sustainable-solution-for-the-future',
      '/blogs/coworking-spaces-future-of-millennial-startups',
      '/blogs/debunking-5-myths-about-coworking-spaces-in-india',
      '/blogs/the-ultimate-guide-to-office-relocation',
      '/blogs/will-coworking-spaces-remain-relevant-in-2023',
      '/blogs/3-tips-for-home-office-how-to-make-your-workspace-more-efficient-comfortable',
      '/blogs/the-location-advantage-best-neighborhoods-for-renting-office-space-in-hyderabad',
      '/blogs/top-4-things-to-look-for-in-a-coworking-space',
      '/blogs/life-at-isprout-and-why-it-is-different-from-other-working-spaces',
      '/blogs/how-innovative-office-spaces-improve-employee-engagement',
      '/blogs/top-5-things-to-consider-while-buying-office-space-in-vijayawada',
      '/blogs/5-ways-a-business-virtual-office-can-benefit-your-startup',
      '/blogs/the-power-of-flexible-workspaces',
      '/blogs/is-wfh-set-to-continue-in-2022-how-can-coworking-spaces-help',
      '/blogs/everything-you-need-to-know-about-a-coworking-space',
      '/blogs/when-is-it-the-right-time-to-rent-private-office-space',
      '/blogs/how-coworking-spaces-are-evolving-with-hybrid-work-facilities',
      '/blogs/debunking-top-3-most-popular-entrepreneurial-myths',
      '/blogs/how-coworking-can-help-businesses-reduce-costs',
      '/blogs/how-co-working-spaces-can-impact-the-real-estate-industry',
      '/blogs/top-5-work-tools-for-your-remote',
      '/blogs/what-is-the-new-normal-for-coworking-spaces-in-2021',
      '/blogs/what-are-the-pros-and-cons-of-co-working-spaces',
   ].map(r => r.endsWith('/') ? r : r + '/');
}

// Static fallback city routes
function getStaticCityRoutes() {
   return [
      '/city/hyderabad',
      '/city/bengaluru',
      '/city/chennai',
      '/city/pune',
      '/city/vijayawada',
      '/city/kolkata',
      '/city/ahmedabad',
      '/city/gurugram',
      '/city/vizag',
   ].map(r => r.endsWith('/') ? r : r + '/');
}

// Static fallback office routes
function getStaticOfficeRoutes() {
   return [
      '/office/pranava-one',
      '/office/jayabheri-trendset',
      '/office/sohini-tech-park',
      '/office/my-home-twitza',
      '/office/divyasree-trinity',
      '/office/modern-profound',
      '/office/orbit',
      '/office/one-golden-mile',
      '/office/purva-summit',
      '/office/minaas-center',
      '/office/sreshta-marvel',
      '/office/sas-tower',
      '/office/nr-enclave',
      '/office/prestige-saleh-ahmed',
      '/office/shilpitha-tech-park',
      '/office/kochar-jade',
      '/office/saravana-matrix',
      '/office/sigapi-achi',
      '/office/greystone-baner',
      '/office/panchshil-techpark',
      '/office/panchshil-techpark-one',
      '/office/benz-circle',
      '/office/medha-towers',
      '/office/godrej-waterside',
      '/office/aurelien',
      '/office/hq27',
      '/office/lansum-square',
   ].map(r => r.endsWith('/') ? r : r + '/');
}

// Run if called directly
generateRoutes().catch(console.error);
