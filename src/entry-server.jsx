import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import {
	createStaticHandler,
	createStaticRouter,
	StaticRouterProvider,
} from "react-router";
import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export async function render(url) {
	const handler = createStaticHandler(routes);

	// Create a Fetch API Request from the URL
	const fetchRequest = new Request(`http://localhost${url}`, {
		method: "GET",
		headers: new Headers(),
	});

	const context = await handler.query(fetchRequest);

	// If context is a Response (redirect), return it
	if (context instanceof Response) {
		return {
			html: "",
			redirect: context.headers.get("Location"),
			status: context.status,
		};
	}

	const router = createStaticRouter(handler.dataRoutes, context);
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 1,
				refetchOnWindowFocus: false,
			},
		},
	});

	const html = renderToString(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<StaticRouterProvider router={router} context={context} />
			</QueryClientProvider>
		</StrictMode>,
	);

	return { html };
}
