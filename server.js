import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'

async function createServer() {
   const app = express()

   let vite

   if (!isProduction) {
      // DEV MODE: Create Vite server in middleware mode
      const { createServer: createViteServer } = await import('vite')
      vite = await createViteServer({
         server: { middlewareMode: true },
         appType: 'custom'
      })
      app.use(vite.middlewares)
   } else {
      // PRODUCTION MODE: Serve static assets from dist/ (client bundle)
      // Explicitly exclude the server bundle from public access
      app.use('/server', (_req, res) => res.status(404).end())
      app.use(express.static(path.resolve(__dirname, 'dist'), { index: false }))
   }

   app.use('*all', async (req, res, next) => {
      const url = req.originalUrl

      try {
         let template, render

         if (!isProduction) {
            // DEV: Read and transform index.html on the fly
            template = fs.readFileSync(
               path.resolve(__dirname, 'index.html'),
               'utf-8',
            )
            template = await vite.transformIndexHtml(url, template)
            const mod = await vite.ssrLoadModule('/src/entry-server.jsx')
            render = mod.render
            var getHeadScriptTags = mod.getHeadScriptTags
         } else {
            // PRODUCTION: Use the client bundle template from dist/
            const fallbackPath = path.resolve(__dirname, 'dist/index.html');
            template = fs.readFileSync(fallbackPath, 'utf-8')
            const mod = await import('./dist/server/entry-server.js')
            render = mod.render
            var getHeadScriptTags = mod.getHeadScriptTags
         }

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

         // 4d. Extract StaticRouterProvider hydration script from body so it
         //     doesn't live inside #root (which would cause a DOM mismatch
         //     during hydrateRoot and result in doubled page content).
         let routerHydrationScript = ''
         const routerScriptRegex = /<script[^>]*>window\.__staticRouterHydrationData[\s\S]*?<\/script>/
         const routerScriptMatch = appHtml.match(routerScriptRegex)
         if (routerScriptMatch) {
            routerHydrationScript = routerScriptMatch[0]
            appHtml = appHtml.replace(routerScriptRegex, '')
         }

         // 5. Inject dehydrated react-query state for client hydration
         let dehydratedScript = ''
         if (result.dehydratedState) {
            dehydratedScript = `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(result.dehydratedState).replace(/</g, '\\u003c')}</script>`
         }

         // 6. Inject head tags and route-specific scripts into the template.
         const extraScripts = getHeadScriptTags ? getHeadScriptTags(url) : []
         const allHeadTags = [...headTags, ...extraScripts]
         let html = template
         if (allHeadTags.length > 0) {
            html = html.replace('<!--ssr-head-->', allHeadTags.join('\n  '))
         }
         html = html.replace(`<!--ssr-outlet-->`, () => appHtml)

         // Inject hydration scripts before the module entry so they execute first.
         // Router hydration data + react-query state must be available before
         // entry-client.jsx reads them.
         const hydrationScripts = [routerHydrationScript, dehydratedScript].filter(Boolean).join('\n')
         if (hydrationScripts) {
            html = html.replace('<script type="module"', `${hydrationScripts}\n<script type="module"`)
         }

         // 7. Send the rendered HTML back with proper status code.
         const statusCode = result.statusCode || 200;
         res.status(statusCode).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e) {
         // If an error is caught, let Vite fix the stack trace in dev mode
         if (!isProduction && vite) {
            vite.ssrFixStacktrace(e)
         }
         next(e)
      }
   })

   const port = process.env.PORT || 5173
   app.listen(port, () => {
      console.log(`Server running in ${isProduction ? 'production' : 'development'} mode at http://localhost:${port}`)
   })
}

createServer()