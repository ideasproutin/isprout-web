import { Navigate, redirect } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import App from "../App";
// PageNotFound kept eager — used as errorElement (must be synchronously available)
import PageNotFound from "../pages/404pagenotfound/pagenotfound";
import { fetchCityCenters } from "../services/cityCenterApi";
import ExternalRedirect from "../components/ExternalRedirect.tsx";
// ManagedOfficeLegacyRoute kept eager — tiny redirect component used in many legacy routes
import ManagedOfficeLegacyRoute from "../components/ManagedOfficeLegacyRoute";

// ─── Route-level lazy loading ──────────────────────────────────────────────
// Using React Router v7's built-in `lazy` property instead of React.lazy.
// This is SSR-safe: createStaticHandler.fetch() resolves each lazy() before
// renderToString is called, so the server always renders real content.
// On the client, each page gets its own chunk — only downloaded when visited.
const lazyHome = () =>
	import("../pages/home/home").then((m) => ({ Component: m.default }));
const lazyAboutUs = () =>
	import("../pages/aboutus/aboutus").then((m) => ({ Component: m.default }));
const lazyManagedOffice = () =>
	import("../pages/managedoffice/managedoffice").then((m) => ({
		Component: m.default,
	}));
const lazyAwards = () =>
	import("../pages/awards/awardsandachievements").then((m) => ({
		Component: m.default,
	}));
const lazyVirtualOffice = () =>
	import("../pages/virtualoffice/intro").then((m) => ({
		Component: m.default,
	}));
const lazyMeetingRooms = () =>
	import("../pages/meetingrooms/intro").then((m) => ({
		Component: m.default,
	}));
const lazyBlogsIntro = () =>
	import("../pages/blogs/intro").then((m) => ({ Component: m.default }));
const lazyBlogDetail = () =>
	import("../pages/blogs/blogdetail").then((m) => ({ Component: m.default }));
const lazyCareers = () =>
	import("../pages/careers/intro").then((m) => ({ Component: m.default }));
const lazyTestimonials = () =>
	import("../pages/testimonials/testimonials").then((m) => ({
		Component: m.default,
	}));
const lazyNews = () =>
	import("../pages/news/news_homepage").then((m) => ({
		Component: m.default,
	}));
const lazyNewsArticle = () =>
	import("../pages/news/article").then((m) => ({ Component: m.default }));
const lazyFAQ = () =>
	import("../pages/faq/faq").then((m) => ({ Component: m.default }));
const lazyContactUs = () =>
	import("../pages/contactus/contactus").then((m) => ({
		Component: m.default,
	}));
const lazyOurTeam = () =>
	import("../pages/ourteam/ourteam").then((m) => ({ Component: m.default }));
const lazyThankYou = () =>
	import("../pages/thankyou/thankyou").then((m) => ({
		Component: m.default,
	}));
const lazyPrivacyPolicy = () =>
	import("../pages/privacypolicy/privacypolicy").then((m) => ({
		Component: m.default,
	}));
const lazyTerms = () =>
	import("../pages/termsandconditions/termsandconditions").then((m) => ({
		Component: m.default,
	}));
const lazyRefundPolicy = () =>
	import("../pages/refundpolicy/refundpolicy").then((m) => ({
		Component: m.default,
	}));
const lazyCancellationPolicy = () =>
	import("../pages/cancellation_policy/cancellation").then((m) => ({
		Component: m.default,
	}));
const lazyCityHero = () =>
	import("../pages/city/hero").then((m) => ({ Component: m.default }));
const lazyCentre = () =>
	import("../pages/centre/Centre").then((m) => ({ Component: m.default }));

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

// City validation loader — runs on SSR only.
// On the client, React Router skips the API validation because:
//   - All app-generated links already use the canonical casing from API data.
//   - Running the full validation (redirect + API call) client-side causes a double
//     navigation flash and keeps the router in a "loading" state while the API is in-flight.
const cityLoader = async ({ params }: { params: { cityName?: string } }) => {
	const rawCityName = params.cityName;
	if (!rawCityName) {
		throw new Response("City not found", {
			status: 404,
			statusText: "Not Found",
		});
	}

	// CLIENT-SIDE: skip — SSR (server.js) handles casing redirects on direct URL access.
	// useCityCenters() inside Hero handles city data fetching on the client.
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

// Redirect lowercase city thank-you URLs to canonical casing — SSR only.
// On the client, direct URL access is handled by server.js; links always use canonical casing.
const cityThankYouLoader = ({ params }: { params: { cityName?: string } }) => {
	// CLIENT-SIDE: skip — server.js handles casing redirects on direct URL access
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
				lazy: lazyHome,
			},
			{
				path: "about/",
				lazy: lazyAboutUs,
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
				lazy: lazyManagedOffice,
			},
			{
				path: "managed-office-space/thankyou/",
				lazy: lazyThankYou,
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
				lazy: lazyAwards,
			},
			{
				path: "city/:cityName/",
				lazy: lazyCityHero,
				loader: cityLoader,
				errorElement: <PageNotFound />,
			},
			{
				path: "city/:cityName/thankyou/",
				lazy: lazyThankYou,
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
				lazy: lazyCentre,
				errorElement: <PageNotFound />,
			},
			{
				path: "office/:centreId/thankyou/",
				lazy: lazyThankYou,
				errorElement: <PageNotFound />,
			},
			{
				path: "virtual-office/",
				lazy: lazyVirtualOffice,
			},
			{
				path: "virtual-office/thankyou/",
				lazy: lazyThankYou,
			},
			{
				path: "meeting-rooms/",
				lazy: lazyMeetingRooms,
			},
			{
				path: "meeting-rooms/thankyou/",
				lazy: lazyThankYou,
			},
			{
				path: "blogs/",
				lazy: lazyBlogsIntro,
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
				lazy: lazyBlogDetail,
			},
			{
				path: "careers/",
				lazy: lazyCareers,
			},
			{
				path: "careers/thankyou/",
				lazy: lazyThankYou,
			},
			{
				path: "testimonials/",
				lazy: lazyTestimonials,
			},
			{
				path: "news/",
				lazy: lazyNews,
			},
			{
				path: "news/:url/",
				lazy: lazyNewsArticle,
			},
			{
				path: "faq/",
				lazy: lazyFAQ,
			},
			{
				path: "contact/",
				lazy: lazyContactUs,
			},
			{
				path: "contact/thankyou/",
				lazy: lazyThankYou,
			},
			{
				path: "teams/",
				lazy: lazyOurTeam,
			},
			{
				path: "privacy",
				element: <Navigate to='/privacy-policy/' replace />,
			},
			{
				path: "privacy-policy/",
				lazy: lazyPrivacyPolicy,
			},
			{
				path: "terms-conditions/",
				lazy: lazyTerms,
			},
			{
				path: "refund-policy/",
				lazy: lazyRefundPolicy,
			},
			{
				path: "cancellation-policy/",
				lazy: lazyCancellationPolicy,
			},
			{
				path: "thankyou/",
				lazy: lazyThankYou,
			},
			{
				path: "*",
				element: <PageNotFound />,
			},
		],
	},
];
