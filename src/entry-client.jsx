import "./index.css";
import { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	matchRoutes,
	RouterProvider,
} from "react-router-dom";
import {
	QueryClient,
	QueryClientProvider,
	HydrationBoundary,
} from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { routes } from "./routes";

// Lazy routes must be resolved BEFORE creating the router so the matched
// route already has its Component set.  hydrationData only carries serialisable
// loader/action data — it does NOT include the Component function.  Without
// pre-resolution the router skips its initial navigation (thinks hydration is
// done) but has no Component for the current route, which silently breaks
// every subsequent <Link> click.
async function hydrate() {
	// 1. Find which routes matched the current URL and still have `lazy`
	const lazyMatches = matchRoutes(routes, window.location)?.filter(
		(m) => m.route.lazy,
	);

	// 2. Download + merge each lazy module into the route object
	if (lazyMatches?.length) {
		await Promise.all(
			lazyMatches.map(async (m) => {
				const routeModule = await m.route.lazy();
				Object.assign(m.route, { ...routeModule, lazy: undefined });
			}),
		);
	}

	// 3. Create router — matched route now has Component, other routes stay lazy
	const router = createBrowserRouter(routes, {
		hydrationData: window.__staticRouterHydrationData,
	});

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 1,
				refetchOnWindowFocus: false,
			},
		},
	});

	const dehydratedState = window.__REACT_QUERY_STATE__ || undefined;

	const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
	
	// TODO: Remove this log after verifying Google Client ID
	console.log("🔑 Google Client ID loaded:", googleClientId ? "✅ Present" : "❌ Missing");

	const app = (
		<StrictMode>
			<GoogleOAuthProvider clientId={googleClientId}>
				<QueryClientProvider client={queryClient}>
					<HydrationBoundary state={dehydratedState}>
						<RouterProvider router={router} />
					</HydrationBoundary>
				</QueryClientProvider>
			</GoogleOAuthProvider>
		</StrictMode>
	);

	const rootEl = document.getElementById("root");

	// Detect whether the root contains real SSR content.
	// When running plain `vite dev` (no SSR), the root only has <!--ssr-outlet-->
	// and hydrateRoot on an empty container can cause double-rendering.
	const hasSSRContent =
		window.__staticRouterHydrationData !== undefined &&
		rootEl.childElementCount > 0;

	if (hasSSRContent) {
		hydrateRoot(rootEl, app, {
			onRecoverableError(error) {
				// Suppress noisy hydration-mismatch warnings in console
				if (
					typeof error === "object" &&
					error !== null &&
					String(error.message || "").includes("Hydration")
				) {
					return;
				}
				console.error(error);
			},
		});
	} else {
		// Non-SSR dev mode: clear any stale content and do a fresh render
		rootEl.innerHTML = "";
		createRoot(rootEl).render(app);
	}

	// Reveal content after CSS is painted (double-rAF ensures styles are applied)
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			document.documentElement.classList.add("ssr-ready");
		});
	});
}

hydrate();
