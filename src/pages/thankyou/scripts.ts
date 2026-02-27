/**
 * Route-specific scripts to inject on thank-you pages.
 *
 * ★ THIS IS THE SINGLE SOURCE OF TRUTH ★
 * Add new route scripts here — they'll automatically work in:
 *   1. Client-side React (ThankYou component)
 *   2. Pre-rendered static HTML (prerender.js)
 *   3. SSR mode (server.js)
 *
 * Keys are matched case-insensitively against location.pathname.
 * Each value is an array of { id, code } objects so we can
 * inject them into the DOM and clean up on unmount.
 */
export const routeScripts: Record<string, { id: string; code: string }[]> = {
	"/city/hyderabad/thankyou": [
		{
			id: "gtag-hyderabad-conversion",
			code: `gtag('event', 'conversion', {'send_to': 'AW-780522802/2qdnCPTbnv8bELKql_QC'});`,
		},
	],
};

/**
 * Look up scripts for a given pathname (case-insensitive, ignores trailing slash).
 * Used by the React ThankYou component to inject scripts at runtime.
 */
export function getRouteScripts(
	pathname: string,
): { id: string; code: string }[] {
	const normalized = pathname.replace(/\/+$/, "").toLowerCase();
	for (const [route, scripts] of Object.entries(routeScripts)) {
		if (route.replace(/\/+$/, "").toLowerCase() === normalized) {
			return scripts;
		}
	}
	return [];
}

/**
 * Return raw <script> HTML strings fit for injection into <head>.
 * Used by prerender.js and server.js.
 */
export function getHeadScriptTags(pathname: string): string[] {
	const scripts = getRouteScripts(pathname);
	return scripts.map((s) => `<script>${s.code}</script>`);
}
