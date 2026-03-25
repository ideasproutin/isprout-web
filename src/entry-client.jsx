import "./index.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
	QueryClient,
	QueryClientProvider,
	HydrationBoundary,
} from "@tanstack/react-query";
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

// Pick up dehydrated react-query state from SSR
const dehydratedState = window.__REACT_QUERY_STATE__ || undefined;

// With SSR (Coolify / server.js), every request is rendered server-side for the
// correct route — hydrateRoot is always safe here.
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
