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

// Reveal content now that CSS is loaded and hydration has started
document.documentElement.classList.add("ssr-ready");
