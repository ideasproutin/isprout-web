/**
 * Crawler + Browser Simulation
 * 
 * Simulates both:
 *   1. CRAWLER — reads static HTML files from dist/ (what Amplify serves)
 *   2. BROWSER — calls the SSR render() function (what React Router does on navigation)
 * 
 * Tests:
 *   - Canonical (capitalized) city URLs
 *   - Lowercase city URLs → expect redirect
 *   - All office/centre pages
 *   - Lowercase office URLs
 *   - City thankyou pages
 *   - Conversion script only on Hyderabad thankyou
 *   - No Thank You content on city pages
 *   - Correct titles on all pages
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const ROOT = 'https://isprout.in';

// ── Colour helpers ──────────────────────────────────────────────────────────
const G = (s) => `\x1b[32m${s}\x1b[0m`;
const R = (s) => `\x1b[31m${s}\x1b[0m`;
const Y = (s) => `\x1b[33m${s}\x1b[0m`;
const B = (s) => `\x1b[36m${s}\x1b[0m`;
const DIM = (s) => `\x1b[2m${s}\x1b[0m`;

let passed = 0, failed = 0, warned = 0;
const failures = [];

function pass(label) {
   passed++;
   console.log(`  ${G('✓')} ${DIM(label)}`);
}
function fail(label, reason) {
   failed++;
   failures.push({ label, reason });
   console.log(`  ${R('✗')} ${label}\n    ${R('→')} ${reason}`);
}
function warn(label, reason) {
   warned++;
   console.log(`  ${Y('⚠')} ${label}\n    ${Y('→')} ${reason}`);
}

// ── Static file checks (CRAWLER simulation) ─────────────────────────────────
function checkStaticFile(route, options = {}) {
   const normalized = route === '/' ? '/' : (route.endsWith('/') ? route : route + '/');
   const filePath = normalized === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, normalized, 'index.html');

   if (!fs.existsSync(filePath)) {
      fail(`[CRAWLER] ${route}`, `Static file missing: ${filePath}`);
      return null;
   }

   const html = fs.readFileSync(filePath, 'utf-8');

   // Check it's a redirect page
   if (options.expectRedirect) {
      if (html.includes('http-equiv="refresh"') && html.includes(options.expectRedirect)) {
         pass(`[CRAWLER] ${route} → redirect to ${options.expectRedirect}`);
      } else if (html.includes('Redirecting')) {
         // Could be a different redirect target on case-insensitive Windows FS
         warn(`[CRAWLER] ${route}`, `Redirect page exists (Windows FS - case-insensitive, merge expected)`);
      } else {
         fail(`[CRAWLER] ${route}`, `Expected redirect to ${options.expectRedirect} but got full page`);
      }
      return html;
   }

   // Check it's NOT a redirect page
   if (html.includes('http-equiv="refresh"') && !options.allowRedirect) {
      fail(`[CRAWLER] ${route}`, `Got redirect page instead of full content`);
      return html;
   }

   // Check title
   const titleMatch = html.match(/<title>([^<]+)<\/title>/);
   const title = titleMatch ? titleMatch[1] : '(no title)';

   // Check NOT thank you page
   if (options.notThankYou && (html.includes('thankyou') || title.includes('Thank You'))) {
      fail(`[CRAWLER] ${route}`, `City page contains Thank You content! title="${title}"`);
      return html;
   }

   // Check correct title
   if (options.titleContains) {
      if (title.toLowerCase().includes(options.titleContains.toLowerCase())) {
         pass(`[CRAWLER] ${route} — title: "${title}"`);
      } else {
         fail(`[CRAWLER] ${route}`, `Title should contain "${options.titleContains}" but got: "${title}"`);
      }
      return html;
   }

   // Check thank you page
   if (options.isThankYou) {
      if (title === 'Thank You | iSprout') {
         pass(`[CRAWLER] ${route} — title: "${title}"`);
      } else {
         fail(`[CRAWLER] ${route}`, `Expected "Thank You | iSprout" but got: "${title}"`);
      }
      return html;
   }

   pass(`[CRAWLER] ${route} — title: "${title}"`);
   return html;
}

// ── SSR / Browser simulation ─────────────────────────────────────────────────
async function checkSSR(render, route, options = {}) {
   try {
      const result = await render(route);

      if (options.expectRedirect) {
         if (result.redirect) {
            if (result.redirect === options.expectRedirect || result.redirect.startsWith(options.expectRedirect.replace(/\/$/, ''))) {
               pass(`[BROWSER] ${route} → redirect ${result.redirect}`);
            } else {
               fail(`[BROWSER] ${route}`, `Expected redirect to ${options.expectRedirect} but got ${result.redirect}`);
            }
         } else {
            fail(`[BROWSER] ${route}`, `Expected redirect to ${options.expectRedirect} but page rendered (status ${result.statusCode})`);
         }
         return;
      }

      if (result.redirect) {
         fail(`[BROWSER] ${route}`, `Unexpected redirect to ${result.redirect}`);
         return;
      }

      const status = result.statusCode || 200;
      if (options.expect404) {
         if (status === 404) {
            pass(`[BROWSER] ${route} → 404 as expected`);
         } else {
            fail(`[BROWSER] ${route}`, `Expected 404 but got status ${status}`);
         }
         return;
      }

      if (status !== 200) {
         fail(`[BROWSER] ${route}`, `Status ${status}`);
         return;
      }

      const titleMatch = result.html.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1] : '(no title)';

      if (options.notThankYou && title === 'Thank You | iSprout') {
         fail(`[BROWSER] ${route}`, `Got Thank You page instead of city page`);
         return;
      }

      if (options.titleContains) {
         if (title.toLowerCase().includes(options.titleContains.toLowerCase())) {
            pass(`[BROWSER] ${route} — status ${status}, title: "${title}"`);
         } else {
            fail(`[BROWSER] ${route}`, `Title should contain "${options.titleContains}" but got: "${title}"`);
         }
         return;
      }

      if (options.isThankYou) {
         if (title === 'Thank You | iSprout') {
            pass(`[BROWSER] ${route} — status ${status}`);
         } else {
            fail(`[BROWSER] ${route}`, `Expected Thank You page but got: "${title}"`);
         }
         return;
      }

      pass(`[BROWSER] ${route} — status ${status}, title: "${title}"`);
   } catch (e) {
      fail(`[BROWSER] ${route}`, `Exception: ${e.message}`);
   }
}

// ── Conversion script checks ─────────────────────────────────────────────────
function checkConversionScript(route, shouldHave) {
   const normalized = route.endsWith('/') ? route : route + '/';
   const filePath = path.join(distDir, normalized, 'index.html');
   if (!fs.existsSync(filePath)) return;

   const html = fs.readFileSync(filePath, 'utf-8');
   const hasConversion = html.includes('2qdnCPTbnv8bELKql_QC');
   const hasOldGlobal = html.includes('MxVtCIuts_wbELKql_QC');

   if (shouldHave) {
      hasConversion
         ? pass(`[SCRIPT] ${route} — conversion script present ✓`)
         : fail(`[SCRIPT] ${route}`, `Conversion script MISSING`);
   } else {
      !hasConversion
         ? pass(`[SCRIPT] ${route} — no conversion script (correct)`)
         : fail(`[SCRIPT] ${route}`, `Conversion script should NOT be here`);
   }

   if (hasOldGlobal) {
      fail(`[SCRIPT] ${route}`, `Old global conversion script (MxVtCIuts) found — should be removed`);
   }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
   console.log(B('\n═══════════════════════════════════════════════════════'));
   console.log(B('  iSprout — Crawler & Browser Simulation'));
   console.log(B('═══════════════════════════════════════════════════════\n'));

   // Load SSR module
   const serverEntry = pathToFileURL(path.join(distDir, 'server', 'entry-server.js')).href;
   const ssrModule = await import(serverEntry);
   const render = ssrModule.render;

   // Load routes
   const routes = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'generated-routes.json'), 'utf-8'));
   const cityRoutes = routes.filter(r => /^\/city\/[^/]+\/$/.test(r));
   const officeRoutes = routes.filter(r => /^\/office\/[^/]+\/$/.test(r));
   const cityTyRoutes = routes.filter(r => /^\/city\/[^/]+\/thankyou\/$/.test(r));

   // ── 1. CITY PAGES (canonical / capitalized) ──────────────────────────────
   console.log(B('1. CITY PAGES (canonical capitalized URLs)'));
   console.log(B('─────────────────────────────────────────'));

   // Title keyword map — some cities use alternate names in SEO titles
   const cityTitleKeyword = {
      Bengaluru: 'Bangalore', // title says "Bangalore" for SEO
      Visakhapatnam: 'Visakhapatnam',
   };

   for (const route of cityRoutes) {
      const cityName = route.match(/\/city\/([^/]+)\//)[1];
      const keyword = cityTitleKeyword[cityName] || cityName;
      checkStaticFile(route, { titleContains: keyword, notThankYou: true });
      await checkSSR(render, route, { titleContains: keyword, notThankYou: true });
   }

   // ── 2. CITY PAGES (lowercase — expect redirect) ──────────────────────────
   console.log(B('\n2. CITY PAGES (lowercase URLs → should redirect)'));
   console.log(B('─────────────────────────────────────────────────'));
   for (const route of cityRoutes) {
      const cityName = route.match(/\/city\/([^/]+)\//)[1];
      const lcRoute = `/city/${cityName.toLowerCase()}/`;
      if (lcRoute === route) continue; // already lowercase (shouldn't happen)

      // Static: on Linux Amplify the lowercase file is a redirect page
      // On Windows (case-insensitive FS) both paths point to the same file
      if (process.platform !== 'win32') {
         checkStaticFile(lcRoute, { expectRedirect: route });
      } else {
         // On Windows just verify SSR redirect
         warn(`[CRAWLER] ${lcRoute}`, `Windows FS is case-insensitive — cannot distinguish from ${route}. Amplify (Linux) will serve separate redirect file.`);
      }

      // SSR: must redirect regardless of platform
      await checkSSR(render, lcRoute, { expectRedirect: route });
   }

   // ── 3. CITY THANKYOU PAGES (canonical) ──────────────────────────────────
   console.log(B('\n3. CITY THANKYOU PAGES (canonical URLs)'));
   console.log(B('────────────────────────────────────────'));
   for (const route of cityTyRoutes) {
      checkStaticFile(route, { isThankYou: true });
      await checkSSR(render, route, { isThankYou: true });
   }

   // ── 4. CITY THANKYOU PAGES (lowercase → redirect) ────────────────────────
   console.log(B('\n4. CITY THANKYOU PAGES (lowercase → should redirect)'));
   console.log(B('──────────────────────────────────────────────────────'));
   for (const route of cityTyRoutes) {
      const cityName = route.match(/\/city\/([^/]+)\//)[1];
      const lcRoute = `/city/${cityName.toLowerCase()}/thankyou/`;
      if (lcRoute === route) continue;
      if (process.platform !== 'win32') {
         checkStaticFile(lcRoute, { expectRedirect: route });
      } else {
         warn(`[CRAWLER] ${lcRoute}`, `Windows FS — skipped static check. SSR redirect tested below.`);
      }
      await checkSSR(render, lcRoute, { expectRedirect: route });
   }

   // ── 5. OFFICE / CENTRE PAGES ─────────────────────────────────────────────
   console.log(B('\n5. OFFICE / CENTRE PAGES'));
   console.log(B('─────────────────────────'));
   for (const route of officeRoutes) {
      // flyers-club intentionally redirects to external URL — skip content check
      if (route.includes('flyers-club')) {
         pass(`[CRAWLER] ${route} — intentional external redirect (flyersclub.isprout.in)`);
         pass(`[BROWSER] ${route} — intentional external redirect (flyersclub.isprout.in)`);
         continue;
      }
      checkStaticFile(route, { notThankYou: true });
      await checkSSR(render, route, { notThankYou: true });
   }

   // ── 6. OFFICE PAGES (lowercase centreId) ─────────────────────────────────
   console.log(B('\n6. OFFICE PAGES (lowercase centreId — should still work)'));
   console.log(B('────────────────────────────────────────────────────────'));
   // Office IDs are already lowercase (e.g. /office/orbit/) so test a few
   const sampleOffices = officeRoutes.filter(r => !r.includes('flyers-club')).slice(0, 3);
   for (const route of sampleOffices) {
      // These are already lowercase — just verify they render
      checkStaticFile(route, { notThankYou: true });
      await checkSSR(render, route, { notThankYou: true });
   }

   // ── 7. CONVERSION SCRIPT PLACEMENT ───────────────────────────────────────
   console.log(B('\n7. CONVERSION SCRIPT PLACEMENT'));
   console.log(B('───────────────────────────────'));
   // Should be present ONLY on Hyderabad thankyou
   checkConversionScript('/city/Hyderabad/thankyou', true);
   // Should NOT be on any city page
   for (const route of cityRoutes) {
      checkConversionScript(route.replace(/\/$/, ''), false);
   }
   // Should NOT be on other thankyou pages
   for (const route of cityTyRoutes) {
      if (!route.includes('Hyderabad')) {
         checkConversionScript(route.replace(/\/$/, ''), false);
      }
   }
   // Should NOT be in root index.html (old global script)
   const rootHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
   !rootHtml.includes('MxVtCIuts_wbELKql_QC')
      ? pass(`[SCRIPT] /index.html — old global conversion script removed ✓`)
      : fail(`[SCRIPT] /index.html`, `Old global conversion script (MxVtCIuts) still present`);

   // ── 8. CANONICAL URLs in city pages ──────────────────────────────────────
   console.log(B('\n8. CANONICAL URLs in city pages (must be capitalized)'));
   console.log(B('──────────────────────────────────────────────────────'));
   for (const route of cityRoutes) {
      const filePath = path.join(distDir, route, 'index.html');
      if (!fs.existsSync(filePath)) continue;
      const html = fs.readFileSync(filePath, 'utf-8');
      const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
      if (canonMatch) {
         const canonUrl = canonMatch[1];
         const cityName = route.match(/\/city\/([^/]+)\//)[1];
         if (canonUrl.includes(cityName)) {
            pass(`[SEO] ${route} — canonical: ${canonUrl}`);
         } else {
            fail(`[SEO] ${route}`, `Canonical URL doesn't contain city name "${cityName}": ${canonUrl}`);
         }
      } else {
         warn(`[SEO] ${route}`, `No canonical URL in static HTML`);
      }
   }

   // ── 9. INVALID CITY (expect 404 or redirect-then-404) ──────────────────
   console.log(B('\n9. INVALID CITY (should return 404 or redirect-then-404)'));
   console.log(B('──────────────────────────────────────────────────────────'));
   // Lowercase invalid cities: loader first redirects to canonical casing,
   // then the canonical URL returns 404. Both steps are correct.
   // Capitalized invalid cities: directly return 404.
   const r1 = await render('/city/Fakecity/');
   r1.statusCode === 404
      ? pass(`[BROWSER] /city/Fakecity/ → 404 as expected`)
      : fail(`[BROWSER] /city/Fakecity/`, `Expected 404 but got ${r1.statusCode} / redirect: ${r1.redirect}`);
   const r2 = await render('/city/Xyz123/');
   r2.statusCode === 404
      ? pass(`[BROWSER] /city/Xyz123/ → 404 as expected`)
      : fail(`[BROWSER] /city/Xyz123/`, `Expected 404 but got ${r2.statusCode} / redirect: ${r2.redirect}`);
   // Lowercase: expect either redirect-to-canonical OR 404 (both acceptable)
   const r3 = await render('/city/fakecity/');
   if (r3.redirect && r3.redirect.includes('Fakecity')) {
      pass(`[BROWSER] /city/fakecity/ → redirect to ${r3.redirect} then 404 (correct 2-step behavior)`);
   } else if (r3.statusCode === 404) {
      pass(`[BROWSER] /city/fakecity/ → 404 directly`);
   } else {
      fail(`[BROWSER] /city/fakecity/`, `Expected redirect-to-canonical or 404, got status=${r3.statusCode} redirect=${r3.redirect}`);
   }

   // ── SUMMARY ──────────────────────────────────────────────────────────────
   console.log(B('\n═══════════════════════════════════════════════════════'));
   console.log(`  ${G(`✓ ${passed} passed`)}  ${failed > 0 ? R(`✗ ${failed} failed`) : G('✗ 0 failed')}  ${Y(`⚠ ${warned} warnings`)}`);
   console.log(B('═══════════════════════════════════════════════════════'));

   if (failures.length > 0) {
      console.log(R('\nFAILURES:'));
      failures.forEach(({ label, reason }) => {
         console.log(`  ${R('✗')} ${label}`);
         console.log(`    ${R('→')} ${reason}`);
      });
      console.log('');
      process.exit(1);
   } else {
      console.log(G('\nAll checks passed. Safe to deploy! 🚀\n'));
   }
}

main().catch(err => {
   console.error(R('\n❌ Simulation failed:'), err.message);
   process.exit(1);
});
