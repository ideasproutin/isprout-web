/**
 * Route-specific head scripts configuration
 * These scripts are injected into the <head> section during SSR
 */

// IMPORTANT: keep routes lowercase for consistency
const routeScripts = {
  "/city/hyderabad/thankyou": [
    `<script>
  gtag('event', 'conversion', {'send_to': 'AW-780522802/2qdnCPTbnv8bELKql_QC'});
</script>`,
  ],
};

/**
 * Normalize URL:
 * - remove query params
 * - remove trailing slashes
 * - lowercase
 */
function normalizeUrl(url: string): string {
  if (!url) return "";
  return url
    .split("?")[0] // remove query params
    .replace(/\/+$/, "") // remove trailing slashes
    .toLowerCase(); // lowercase
}

/**
 * Get head scripts for a specific route
 * @param {string} url - The current route URL
 * @returns {string[]} Array of script strings to inject into head
 */
export function getRouteScripts(url: string): string[] {
  const normalizedUrl = normalizeUrl(url);

  // strict matching (best for accuracy)
  if (routeScripts[normalizedUrl as keyof typeof routeScripts]) {
    return routeScripts[normalizedUrl as keyof typeof routeScripts];
  }

  return [];
}

export { routeScripts };