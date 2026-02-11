import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
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

const helmetContext = {};

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<HelmetProvider context={helmetContext}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</HelmetProvider>
	</StrictMode>
);
