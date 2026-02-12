import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "leaflet/dist/leaflet.css";
import router from "./routes";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

const rootElement = document.getElementById("root")!;

const app = (
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);

// Check if the page was prerendered by react-snap
if (rootElement.hasChildNodes()) {
	hydrateRoot(rootElement, app);
} else {
	createRoot(rootElement).render(app);
}
