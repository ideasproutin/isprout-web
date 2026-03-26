import "./index.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
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

	hydrateRoot(
		document.getElementById("root"),
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<HydrationBoundary state={dehydratedState}>
					<RouterProvider router={router} />
				</HydrationBoundary>
			</QueryClientProvider>
		</StrictMode>,
	);

	// Reveal content after CSS is painted (double-rAF ensures styles are applied)
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			document.documentElement.classList.add("ssr-ready");
		});
	});
}

hydrate();
