import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
   const app = express()

   // Create Vite server in middleware mode and configure the app type as
   // 'custom', disabling Vite's own HTML serving logic so parent server
   // can take control
   const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
   })

   // Use vite's connect instance as middleware. If you use your own
   // express router (express.Router()), you should use router.use
   // When the server restarts (for example after the user modifies
   // vite.config.js), `vite.middlewares` is still going to be the same
   // reference (with a new internal stack of Vite and plugin-injected
   // middlewares). The following is valid even after restarts.
   app.use(vite.middlewares)

   app.use('*all', async (req, res, next) => {
      const url = req.originalUrl

      try {
         // 1. Read index.html
         let template = fs.readFileSync(
            path.resolve(__dirname, 'index.html'),
            'utf-8',
         )

         // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
         //    and also applies HTML transforms from Vite plugins, e.g. global
         //    preambles from @vitejs/plugin-react
         template = await vite.transformIndexHtml(url, template)

         // 3. Load the server entry. ssrLoadModule automatically transforms
         //    ESM source code to be usable in Node.js! There is no bundling
         //    required, and provides efficient invalidation similar to HMR.
         const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')

         // 4. render the app HTML. This assumes entry-server.js's exported
         //     `render` function calls appropriate framework SSR APIs,
         //    e.g. ReactDOMServer.renderToString()
         const result = await render(url)

         // 4a. Handle redirects from React Router
         if (result.redirect) {
            return res.redirect(result.status || 302, result.redirect)
         }

         // 4b. Extract <title> and <meta> tags from rendered HTML
         //     and move them into <head> for proper SEO
         let appHtml = result.html
         const headTags = []

         // Extract all <title>...</title> tags (use only the first for SEO)
         const titleRegex = /<title>[^<]*<\/title>/g
         let titleMatch
         let firstTitle = null
         while ((titleMatch = titleRegex.exec(appHtml)) !== null) {
            if (!firstTitle) firstTitle = titleMatch[0]
         }
         if (firstTitle) {
            headTags.push(firstTitle)
            // Remove ALL title tags from body
            appHtml = appHtml.replace(/<title>[^<]*<\/title>/g, '')
         }

         // Extract all <meta .../> tags, deduplicate by name/property
         const metaRegex = /<meta\s+[^>]*?\/?>/g
         const seenMeta = new Set()
         let metaMatch
         while ((metaMatch = metaRegex.exec(appHtml)) !== null) {
            // Create a dedup key from name or property attribute
            const nameAttr = metaMatch[0].match(/(?:name|property)="([^"]*)"/)
            const key = nameAttr ? nameAttr[1] : metaMatch[0]
            if (!seenMeta.has(key)) {
               seenMeta.add(key)
               headTags.push(metaMatch[0])
            }
         }
         // Remove ALL meta tags from body
         appHtml = appHtml.replace(/<meta\s+[^>]*?\/?>/g, '')

         // Extract <link rel="canonical" ...> tags from body and move to head
         const canonicalRegex = /<link\s+rel="canonical"[^>]*\/?>/g
         let canonicalMatch
         while ((canonicalMatch = canonicalRegex.exec(appHtml)) !== null) {
            headTags.push(canonicalMatch[0])
         }
         appHtml = appHtml.replace(/<link\s+rel="canonical"[^>]*\/?>/g, '')

         // Extract <script type="application/ld+json">...</script> from body to head
         const ldJsonRegex = /<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g
         let ldJsonMatch
         while ((ldJsonMatch = ldJsonRegex.exec(appHtml)) !== null) {
            headTags.push(ldJsonMatch[0])
         }
         appHtml = appHtml.replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, '')

         // 5. Inject dehydrated react-query state for client hydration
         let dehydratedScript = ''
         if (result.dehydratedState) {
            dehydratedScript = `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(result.dehydratedState).replace(/</g, '\\u003c')}</script>`
         }

         // 6. Inject head tags and app HTML into the template.
         let html = template
         if (headTags.length > 0) {
            html = html.replace('<!--ssr-head-->', headTags.join('\n  '))
         }
         html = html.replace(`<!--ssr-outlet-->`, () => appHtml)

         // Inject dehydrated state script before the closing </body> tag
         if (dehydratedScript) {
            html = html.replace('</body>', `${dehydratedScript}\n</body>`)
         }

         // 7. Send the rendered HTML back.
         res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e) {
         // If an error is caught, let Vite fix the stack trace so it maps back
         // to your actual source code.
         vite.ssrFixStacktrace(e)
         next(e)
      }
   })

   app.listen(5173)
}

createServer()