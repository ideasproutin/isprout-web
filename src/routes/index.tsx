import React from "react";
import { Navigate, redirect } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import App from "../App";
import PageNotFound from "../pages/404pagenotfound/pagenotfound";
import ProtectedRoute from "./ProtectedRoute.tsx";
import ExternalRedirect from "./ExternalRedirect.tsx";
import { fetchCityCenters } from "../services/cityCenterApi.ts";
import ManagedOfficeLegacyRoute from "../components/ManagedOfficeLegacyRoute.tsx";

// Lazy-loaded page components — each becomes its own JS chunk loaded on demand
const lazyPage =
	<T extends { default: React.ComponentType }>(importFn: () => Promise<T>) =>
	() =>
		importFn().then((m) => ({ Component: m.default }));

// Server-side external redirect loader
const externalRedirectLoader = (url: string) => () => {
	if (typeof window === "undefined") {
		// SSR: return proper HTTP redirect
		throw redirect(url);
	}
	// Client: component's useEffect handles it
	return null;
};

// Canonical form for city URL param: first letter uppercase, rest lowercase
const canonicalCityName = (name: string) =>
	name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

// City validation loader — SSR only
// On the client, Amplify's 301 CDN rules already handle the lowercase→canonical redirect
// before any React code runs. The Hero component handles city data via useCityCenters().
// Running redirect/validation logic client-side causes:
//   1. Double navigation (hyderabad → Hyderabad → load) which flashes the previous page
//   2. Router stuck in "loading" state while the API call is in-flight
const cityLoader = async ({ params }: { params: { cityName?: string } }) => {
	const rawCityName = params.cityName;
	if (!rawCityName) {
		throw new Response("City not found", {
			status: 404,
			statusText: "Not Found",
		});
	}

	// CLIENT-SIDE: skip immediately — Amplify 301 already handles casing redirects at CDN
	// level, and useCityCenters() inside Hero handles city data fetching.
	if (typeof window !== "undefined") {
		return null;
	}

	// SSR-ONLY below this point

	// Redirect non-canonical casing to the capitalized form
	// e.g. /city/bengaluru/ → /city/Bengaluru/
	const canonical = canonicalCityName(rawCityName);
	if (rawCityName !== canonical) {
		return redirect(`/city/${canonical}/`);
	}

	const cityName = rawCityName.toLowerCase();

	// City ID mapping: URL param → API city.id
	// (e.g. /city/visakhapatnam/ looks up "vizag" in the API, /city/bangalore/ looks up "bengaluru")
	const cityIdMap: { [key: string]: string } = {
		visakhapatnam: "vizag",
		bangalore: "bengaluru",
	};

	try {
		const cityCenters = await fetchCityCenters();
		const actualCityId = cityIdMap[cityName] || cityName;

		// Check if city exists in the data
		const cityExists = cityCenters?.some(
			(c: { id?: string; name: string }) =>
				c.id?.toLowerCase() === actualCityId ||
				c.name.toLowerCase() === actualCityId ||
				c.id?.toLowerCase() === cityName ||
				c.name.toLowerCase() === cityName,
		);

		if (!cityExists) {
			throw new Response("City not found", {
				status: 404,
				statusText: "Not Found",
			});
		}

		return null;
	} catch (error) {
		if (error instanceof Response) {
			throw error;
		}
		// If API fails, allow the page to load anyway (fallback behavior)
		return null;
	}
};

// Redirect lowercase city thank-you URLs to canonical casing — SSR only
// On the client, Amplify 301 rules handle this at CDN level.
const cityThankYouLoader = ({ params }: { params: { cityName?: string } }) => {
	// CLIENT-SIDE: skip — Amplify handles it
	if (typeof window !== "undefined") {
		return null;
	}
	// SSR-ONLY
	const rawCityName = params.cityName;
	if (!rawCityName) return null;
	const canonical = canonicalCityName(rawCityName);
	if (rawCityName !== canonical) {
		return redirect(`/city/${canonical}/thankyou/`);
	}
	return null;
};

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				lazy: lazyPage(() => import("../pages/home/home")),
			},
			{
				path: "about/",
				lazy: lazyPage(() => import("../pages/aboutus/aboutus")),
			},
			{
				path: "managed/",
				element: <ManagedOfficeLegacyRoute />,
			},
			{
				path: "/spaces/managed/",
				element: <ManagedOfficeLegacyRoute />,
			},
			{
				path: "spaces/coworking/",
				element: <ManagedOfficeLegacyRoute />,
			},
			{
				path: "managed-office-space/",
				lazy: lazyPage(
					() => import("../pages/managedoffice/managedoffice"),
				),
			},
			{
				path: "managed-office-space/thankyou/",
				lazy: lazyPage(() => import("../pages/thankyou/thankyou")),
			},
			{
				path: "managed-office/",
				element: <ManagedOfficeLegacyRoute />,
			},
			{
				path: "coworking-space-in-hyderabad/",
				element: <ManagedOfficeLegacyRoute />,
			},
			{
				path: "furnished-office-space-for-rent-in-hyderabad/",
				element: <ManagedOfficeLegacyRoute />,
			},
			{
				path: "feature/business-startup-services/",
				element: <ManagedOfficeLegacyRoute />,
			},
			{
				path: "office-space-for-rent-in-hyderabad/",
				element: <ManagedOfficeLegacyRoute />,
			},
			{
				path: "awards/",
				lazy: lazyPage(
					() => import("../pages/awards/awardsandachievements"),
				),
			},
			{
				path: "city/:cityName/",
				lazy: lazyPage(() => import("../pages/city/hero")),
				loader: cityLoader,
				errorElement: <PageNotFound />,
			},
			{
				path: "city/:cityName/thankyou/",
				lazy: lazyPage(() => import("../pages/thankyou/thankyou")),
				loader: cityThankYouLoader,
			},
			{
				path: "office/flyers-club/",
				loader: externalRedirectLoader(
					"https://flyersclub.isprout.in/",
				),
				element: (
					<ExternalRedirect url='https://flyersclub.isprout.in/' />
				),
			},
			{
				path: "office/:centreId/",
				lazy: lazyPage(() => import("../pages/centre/Centre")),
				errorElement: <PageNotFound />,
			},
			{
				path: "office/:centreId/thankyou/",
				lazy: lazyPage(() => import("../pages/thankyou/thankyou")),
				errorElement: <PageNotFound />,
			},
			{
				path: "virtual-office/",
				lazy: lazyPage(() => import("../pages/virtualoffice/intro")),
			},
			{
				path: "virtual-office/thankyou/",
				lazy: lazyPage(() => import("../pages/thankyou/thankyou")),
			},
			{
				path: "meeting-rooms/",
				lazy: lazyPage(() => import("../pages/meetingrooms/intro")),
			},
			{
				path: "meeting-rooms/thankyou/",
				lazy: lazyPage(() => import("../pages/thankyou/thankyou")),
			},
			{
				path: "blogs/",
				lazy: lazyPage(() => import("../pages/blogs/intro")),
			},
			{
				path: "blogs/introducing-isprout-twitza-hyderabad",
				element: (
					<Navigate
						to='/news/introducing-isprout-twitza-hyderabad'
						replace
					/>
				),
			},
			{
				path: "blogs/isprout-launches-50000-sq-ft-co-working-space-in-gurugram",
				element: (
					<Navigate
						to='/news/isprout-launches-50000-sq-ft-co-working-space-in-gurugram'
						replace
					/>
				),
			},
			{
				path: "blogs/:blogId/",
				lazy: lazyPage(() => import("../pages/blogs/blogdetail")),
			},
			{
				path: "careers/",
				lazy: lazyPage(() => import("../pages/careers/intro")),
			},
			{
				path: "careers/thankyou/",
				lazy: lazyPage(() => import("../pages/thankyou/thankyou")),
			},
			{
				path: "testimonials/",
				lazy: lazyPage(
					() => import("../pages/testimonials/testimonials"),
				),
			},
			{
				path: "news/",
				lazy: lazyPage(() => import("../pages/news/news_homepage")),
			},
			{
				path: "news/:url/",
				lazy: lazyPage(() => import("../pages/news/article")),
			},
			{
				path: "faq/",
				lazy: lazyPage(() => import("../pages/faq/faq")),
			},
			{
				path: "contact/",
				lazy: lazyPage(() => import("../pages/contactus/contactus")),
			},
			{
				path: "contact/thankyou/",
				lazy: lazyPage(() => import("../pages/thankyou/thankyou")),
			},
			{
				path: "teams/",
				lazy: lazyPage(() => import("../pages/ourteam/ourteam")),
			},
			{
				path: "privacy",
				element: <Navigate to='/privacy-policy/' replace />,
			},
			{
				path: "privacy-policy/",
				lazy: lazyPage(
					() => import("../pages/privacypolicy/privacypolicy"),
				),
			},
			{
				path: "terms-conditions/",
				lazy: lazyPage(
					() =>
						import("../pages/termsandconditions/termsandconditions"),
				),
			},
			{
				path: "refund-policy/",
				lazy: lazyPage(
					() => import("../pages/refundpolicy/refundpolicy"),
				),
			},
			{
				path: "cancellation-policy/",
				lazy: lazyPage(
					() => import("../pages/cancellation_policy/cancellation"),
				),
			},
			{
				path: "thankyou/",
				lazy: lazyPage(() => import("../pages/thankyou/thankyou")),
			},
			{
				path: "dashboard/",
				lazy: async () => {
					const { default: Dashboard } =
						await import("../pages/dashboard/dashboard");
					const DashboardRoute = () => (
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					);
					return { Component: DashboardRoute };
				},
			},
			{
				path: "*",
				element: <PageNotFound />,
			},
		],
	},
];
