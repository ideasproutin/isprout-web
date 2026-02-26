/**
 * Pre-render all routes to static HTML files.
 *
 * This runs AFTER `vite build` so that dist/index.html (the client template)
 * and dist/server/entry-server.js (the SSR bundle) already exist.
 *
 * For every route in generated-routes.json it:
 *   1. Calls the SSR render() function to produce the HTML
 *   2. Processes the output exactly like server.js (title, meta, canonical, ld+json, dehydrated state)
 *   3. Writes the result to dist/{route}/index.html
 *
 * After this step every route can be served as a plain static file
 * on ANY hosting platform (Amplify, Vercel, Netlify, S3, etc.) – no
 * SPA rewrite rules or a running Node server are required.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

/* ------------------------------------------------------------------ */
/*  HTML post-processing – kept in sync with server.js                */
/* ------------------------------------------------------------------ */
function processSSRResult(template, result) {
   let appHtml = result.html;
   const headTags = [];

   // 1. Extract <title>
   const titleRegex = /<title>[^<]*<\/title>/g;
   let m, firstTitle = null;
   while ((m = titleRegex.exec(appHtml)) !== null) {
      if (!firstTitle) firstTitle = m[0];
   }
   if (firstTitle) {
      headTags.push(firstTitle);
      appHtml = appHtml.replace(/<title>[^<]*<\/title>/g, '');
   }

   // 2. Extract <meta> (deduplicate by name / property)
   const metaRegex = /<meta\s+[^>]*?\/?>/g;
   const seenMeta = new Set();
   while ((m = metaRegex.exec(appHtml)) !== null) {
      const nameAttr = m[0].match(/(?:name|property)="([^"]*)"/);
      const key = nameAttr ? nameAttr[1] : m[0];
      if (!seenMeta.has(key)) {
         seenMeta.add(key);
         headTags.push(m[0]);
      }
   }
   appHtml = appHtml.replace(/<meta\s+[^>]*?\/?>/g, '');

   // 3. Extract <link rel="canonical">
   const canonicalRegex = /<link\s+rel="canonical"[^>]*\/?>/g;
   while ((m = canonicalRegex.exec(appHtml)) !== null) headTags.push(m[0]);
   appHtml = appHtml.replace(/<link\s+rel="canonical"[^>]*\/?>/g, '');

   // 4. Extract <script type="application/ld+json">
   const ldJsonRegex = /<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g;
   while ((m = ldJsonRegex.exec(appHtml)) !== null) headTags.push(m[0]);
   appHtml = appHtml.replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, '');

   // 5. Dehydrated react-query state
   let dehydratedScript = '';
   if (result.dehydratedState) {
      dehydratedScript = `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(result.dehydratedState).replace(/</g, '\\u003c')}</script>`;
   }

   // 6. Assemble final HTML
   let html = template;
   if (headTags.length > 0) {
      html = html.replace('<!--ssr-head-->', headTags.join('\n  '));
   }
   html = html.replace('<!--ssr-outlet-->', () => appHtml);
   if (dehydratedScript) {
      html = html.replace('</body>', `${dehydratedScript}\n</body>`);
   }

   return html;
}

/* ------------------------------------------------------------------ */
/*  Main                                                              */
/* ------------------------------------------------------------------ */
async function prerender() {
   console.log('\n🔄  Pre-rendering pages to static HTML …\n');

   // 1. Read the client template
   const templatePath = path.join(distDir, 'index.html');
   const template = fs.readFileSync(templatePath, 'utf-8');

   // Keep a copy of the un-rendered template so Express SSR can still use it
   fs.writeFileSync(path.join(distDir, '_ssr-template.html'), template, 'utf-8');

   // 2. Read the generated routes
   const routesPath = path.join(__dirname, '..', 'generated-routes.json');
   const routes = JSON.parse(fs.readFileSync(routesPath, 'utf-8'));

   // 3. Import the SSR render function (built by `vite build --ssr`)
   const serverEntry = pathToFileURL(path.join(distDir, 'server', 'entry-server.js')).href;
   const { render } = await import(serverEntry);

   let success = 0, skipped = 0, errors = 0;

   for (const route of routes) {
      try {
         const result = await render(route);

         // Redirects – nothing to write
         if (result.redirect) {
            skipped++;
            continue;
         }

         const html = processSSRResult(template, result);

         // Determine file path
         //   /              → dist/index.html
         //   /about/        → dist/about/index.html
         //   /blogs/foo/    → dist/blogs/foo/index.html
         const normalizedRoute = route === '/' ? '/' : (route.endsWith('/') ? route : route + '/');
         const filePath = normalizedRoute === '/'
            ? path.join(distDir, 'index.html')
            : path.join(distDir, normalizedRoute, 'index.html');

         fs.mkdirSync(path.dirname(filePath), { recursive: true });
         fs.writeFileSync(filePath, html, 'utf-8');

         success++;
         // Print progress every 20 pages to keep output manageable
         if (success % 20 === 0) {
            console.log(`  … ${success} pages rendered so far`);
         }
      } catch (err) {
         errors++;
         console.error(`  ✗ ${route}: ${err.message}`);
      }
   }

   console.log(`\n✅  Pre-rendering complete!`);
   console.log(`   ✓ ${success} pages rendered`);
   if (skipped) console.log(`   ↪ ${skipped} redirects skipped`);
   if (errors) console.log(`   ✗ ${errors} errors`);
   console.log('');
}

prerender().catch(err => {
   console.error('❌ Pre-rendering failed:', err);
   process.exit(1);
});
