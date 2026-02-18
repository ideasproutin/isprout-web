/**
 * Custom pre-render script using Puppeteer directly.
 *
 * How it works:
 *  1. Starts a static Express server on port 8002 serving dist/
 *  2. Launches headless Chrome (Puppeteer)
 *  3. Visits every route, waits for:
 *       - networkidle0  → all API calls finished
 *       - #root > *     → React actually rendered content
 *  4. Saves the resulting HTML back into dist/
 *
 * Why this is better than vite-plugin-prerender:
 *  - waitForSelector('#root > *') guarantees content is present
 *  - networkidle0 ensures API data is fully loaded before snapshot
 *  - Clear per-route success/failure logging
 */

import puppeteer from "puppeteer";
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import os from "os";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "..", "dist");
const PORT = 8002;
const CONCURRENCY = 25;
const NETWORK_TIMEOUT = 30000; // 30s per route
const RENDER_TIMEOUT = 20000;  // 20s for #root > * to appear

// ─── Kill any process on PORT before starting ────────────────────────────────
function killPort(port) {
   try {
      if (os.platform() === "win32") {
         const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf-8" });
         const pids = new Set();
         for (const line of out.trim().split("\n")) {
            const parts = line.trim().split(/\s+/);
            const pid = parts[parts.length - 1];
            if (pid && pid !== "0") pids.add(pid);
         }
         for (const pid of pids) {
            try { execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" }); } catch { }
         }
         if (pids.size) console.log(`🔪 Killed ${pids.size} process(es) on port ${port}`);
      } else {
         execSync(`lsof -ti:${port} | xargs kill -9 2>/dev/null || true`, { stdio: "ignore" });
      }
   } catch {
      // Port not in use — nothing to kill
   }
}

// ─── Find Chrome executable ──────────────────────────────────────────────────
function findChrome() {
   // 1. Explicit env override (used in CI)
   if (process.env.PUPPETEER_EXECUTABLE_PATH) {
      return process.env.PUPPETEER_EXECUTABLE_PATH;
   }
   // 2. Common Windows paths
   if (os.platform() === "win32") {
      const candidates = [
         "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
         "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
         `${os.homedir()}\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe`,
      ];
      for (const p of candidates) {
         if (fs.existsSync(p)) return p;
      }
   }
   // 3. Common Linux paths (CI servers)
   const linuxCandidates = [
      "/usr/bin/google-chrome",
      "/usr/bin/chromium-browser",
      "/usr/bin/chromium",
      "/usr/local/bin/chromium",
   ];
   for (const p of linuxCandidates) {
      if (fs.existsSync(p)) return p;
   }
   // 4. Let Puppeteer use its own bundled Chrome
   return undefined;
}

// ─── Load routes ────────────────────────────────────────────────────────────
const routesFile = path.join(__dirname, "..", "generated-routes.json");
let routes = ["/"];
try {
   routes = JSON.parse(fs.readFileSync(routesFile, "utf-8"));
   console.log(`📋 Loaded ${routes.length} routes from generated-routes.json`);
} catch {
   console.warn("⚠️  generated-routes.json not found — only rendering /");
}

// ─── Static server ───────────────────────────────────────────────────────────
function startServer() {
   return new Promise((resolve, reject) => {
      const app = express();
      app.use(express.static(distDir));
      // SPA fallback — every unknown path returns index.html so React Router works
      app.get("*", (_req, res) => {
         res.sendFile(path.join(distDir, "index.html"));
      });
      const server = app.listen(PORT, () => {
         console.log(`🚀 Prerender server → http://localhost:${PORT}`);
         resolve(server);
      });
      server.on("error", reject);
   });
}

// ─── Render one route ────────────────────────────────────────────────────────
async function renderRoute(browser, route) {
   const url = `http://localhost:${PORT}${route}`;
   const page = await browser.newPage();

   // Suppress noisy console from the page (optional — remove to debug)
   page.on("pageerror", (err) =>
      console.warn(`  [page error] ${route}: ${err.message}`)
   );

   try {
      // 1. Navigate and wait until all network activity has settled (API done)
      await page.goto(url, {
         waitUntil: "networkidle0",
         timeout: NETWORK_TIMEOUT,
      });

      // 2. Confirm React actually rendered something inside #root
      await page.waitForSelector("#root > *", { timeout: RENDER_TIMEOUT });

      // 3. Grab the full serialised HTML
      const html = await page.content();

      // 4. Work out where to write it
      const routePath =
         route === "/" ? "index.html" : `${route.replace(/^\//, "")}/index.html`;
      const filePath = path.join(distDir, routePath);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, html, "utf-8");

      console.log(`  ✓ ${route}`);
   } catch (err) {
      console.error(`  ✗ ${route} — ${err.message}`);
   } finally {
      await page.close();
   }
}

// ─── Batch runner ────────────────────────────────────────────────────────────
async function runConcurrent(browser, allRoutes) {
   let done = 0;
   for (let i = 0; i < allRoutes.length; i += CONCURRENCY) {
      const batch = allRoutes.slice(i, i + CONCURRENCY);
      await Promise.all(batch.map((r) => renderRoute(browser, r)));
      done += batch.length;
      console.log(`  [${done}/${allRoutes.length}] routes rendered`);
   }
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
   if (!fs.existsSync(distDir)) {
      console.error("❌ dist/ not found. Run `vite build` first.");
      process.exit(1);
   }

   // Free port before starting our server
   killPort(PORT);

   const server = await startServer();

   const chromePath = findChrome();
   if (chromePath) {
      console.log(`🌐 Using Chrome: ${chromePath}`);
   } else {
      console.log(`🌐 Using Puppeteer bundled Chrome`);
   }

   const browser = await puppeteer.launch({
      headless: true,
      executablePath: chromePath, // system Chrome (Windows) or CI Chrome
      args: [
         "--no-sandbox",
         "--disable-setuid-sandbox",
         "--disable-dev-shm-usage",
         "--no-first-run",
         "--disable-extensions",
         "--blink-settings=imagesEnabled=false", // skip images → faster
      ],
   });

   console.log(`\n⚙️  Pre-rendering ${routes.length} routes (concurrency=${CONCURRENCY})…\n`);
   const t0 = Date.now();

   try {
      await runConcurrent(browser, routes);
   } finally {
      await browser.close();
      server.close();
   }

   const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
   console.log(`\n✅ Pre-rendering done in ${elapsed}s`);
}

main().catch((err) => {
   console.error("Pre-render failed:", err);
   process.exit(1);
});
