import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import {
	createStaticHandler,
	createStaticRouter,
	StaticRouterProvider,
} from "react-router";
import { routes } from "./routes";
import {
	QueryClient,
	QueryClientProvider,
	dehydrate,
} from "@tanstack/react-query";

// Import API fetch functions for server-side prefetching
import { fetchBlogsIndex, fetchBlogById } from "./services/blogsApi";
import { createNewsQueryKey, fetchNews } from "./services/newsApi";
import { fetchCityCenters } from "./services/cityCenterApi";
import { fetchCentreSeo } from "./services/centreSeoApi";
import { fetchCareers } from "./services/careersApi";
import { aboutUs as fetchAboutUs } from "./services/aboutusApi";
import { fetchFaqs } from "./services/faqApi";
import { fetchPrivacyPolicy } from "./services/privacyPolicyApi";
import { fetchTermsAndConditions } from "./services/termsAndConditionsApi";
import { fetchRefundPolicy } from "./services/refundPolicyApi";
import { fetchCancellationPolicy } from "./services/cancellationPolicyApi";

// Re-export for prerender.js and server.js to use as single source of truth
export { getHeadScriptTags } from "./pages/thankyou/scripts";

/**
 * Match the URL path to known dynamic routes and return
 * an array of prefetch configs { queryKey, queryFn }.
 */
function getPrefetchConfigs(pathname) {
	// Strip trailing slash for consistent matching
	const path = pathname.replace(/\/+$/, "") || "/";

	// blogs/:blogId
	const blogMatch = path.match(/^\/blogs\/(.+)$/);
	if (blogMatch) {
		const blogId = blogMatch[1];
		return [
			{ queryKey: ["blogs"], queryFn: fetchBlogsIndex },
			{
				queryKey: ["blog", blogId],
				queryFn: () => fetchBlogById(blogId),
			},
		];
	}

	// blogs index
	if (path === "/blogs") {
		return [{ queryKey: ["blogs"], queryFn: fetchBlogsIndex }];
	}

	// news/:url
	const newsMatch = path.match(/^\/news\/(.+)$/);
	if (newsMatch) {
		return [
			{
				queryKey: createNewsQueryKey(),
				queryFn: () => fetchNews(),
			},
		];
	}

	// news index
	if (path === "/news") {
		return [
			{
				queryKey: createNewsQueryKey({ pageIndex: 1, pageSize: 6 }),
				queryFn: () => fetchNews({ pageIndex: 1, pageSize: 6 }),
			},
		];
	}

	// office/:centreId
	const centreMatch = path.match(/^\/office\/(.+)$/);
	if (centreMatch) {
		const centreId = centreMatch[1];
		return [
			{ queryKey: ["cityCenters"], queryFn: fetchCityCenters },
			{
				queryKey: ["centreSeo", centreId],
				queryFn: () => fetchCentreSeo(centreId),
			},
		];
	}

	// city/:cityName
	const cityMatch = path.match(/^\/city\/(.+)$/);
	if (cityMatch) {
		return [{ queryKey: ["cityCenters"], queryFn: fetchCityCenters }];
	}

	// careers
	if (path === "/careers") {
		return [{ queryKey: ["careers"], queryFn: fetchCareers }];
	}

	// about
	if (path === "/about") {
		return [{ queryKey: ["aboutus"], queryFn: fetchAboutUs }];
	}

	// faq
	if (path === "/faq") {
		return [{ queryKey: ["faqs"], queryFn: fetchFaqs }];
	}

	// privacy-policy
	if (path === "/privacy-policy") {
		return [{ queryKey: ["privacyPolicy"], queryFn: fetchPrivacyPolicy }];
	}

	// terms-conditions
	if (path === "/terms-conditions") {
		return [
			{
				queryKey: ["termsAndConditions"],
				queryFn: fetchTermsAndConditions,
			},
		];
	}

	// refund-policy
	if (path === "/refund-policy") {
		return [{ queryKey: ["refundPolicy"], queryFn: fetchRefundPolicy }];
	}

	// cancellation-policy
	if (path === "/cancellation-policy") {
		return [
			{
				queryKey: ["cancellationPolicy"],
				queryFn: fetchCancellationPolicy,
			},
		];
	}

	return [];
}

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

	// Prefetch data for dynamic routes so meta tags render during SSR
	const pathname = new URL(`http://localhost${url}`).pathname;
	const prefetchConfigs = getPrefetchConfigs(pathname);

	await Promise.all(
		prefetchConfigs.map((config) =>
			queryClient.prefetchQuery({
				queryKey: config.queryKey,
				queryFn: config.queryFn,
			}),
		),
	);

	const html = renderToString(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<StaticRouterProvider router={router} context={context} />
			</QueryClientProvider>
		</StrictMode>,
	);

	// Dehydrate the query cache so the client can reuse prefetched data
	const dehydratedState = dehydrate(queryClient);
	queryClient.clear();

	// Extract status code from context (for 404s and errors)
	let statusCode = 200;

	// Check if any errors occurred (e.g., loader threw a Response)
	if (context.errors) {
		// Get the first error
		const errorValues = Object.values(context.errors);
		if (errorValues.length > 0) {
			const error = errorValues[0];
			// React Router v7 wraps thrown Responses as ErrorResponse objects
			// with a numeric .status property — check that first, then instanceof
			if (typeof error?.status === "number") {
				statusCode = error.status;
			} else if (error instanceof Response) {
				statusCode = error.status;
			} else {
				// For unexpected errors, default to 500
				statusCode = 500;
			}
		}
	}

	return { html, dehydratedState, statusCode };
}
