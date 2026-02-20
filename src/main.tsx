/**
 * @deprecated This file is NOT the active entry point.
 * The active SSR entry is src/entry-client.jsx (referenced by index.html).
 * This file is kept only as a fallback and uses hydrateRoot to stay SSR-compatible.
 */
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
	QueryClient,
	QueryClientProvider,
	HydrationBoundary,
	type DehydratedState,
} from "@tanstack/react-query";
import "./index.css";
import { routes } from "./routes";

const router = createBrowserRouter(routes);
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

const dehydratedState =
	typeof window !== "undefined"
		? ((window as unknown as Record<string, unknown>)
				.__REACT_QUERY_STATE__ as DehydratedState | undefined)
		: undefined;

hydrateRoot(
	document.getElementById("root")!,
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
