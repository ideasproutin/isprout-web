import { Navigate, redirect } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import type { ComponentType } from "react";
import App from "../App";
import PageNotFound from "../pages/404pagenotfound/pagenotfound";
import { fetchCityCenters } from "../services/cityCenterApi";
import ExternalRedirect from "../components/ExternalRedirect.tsx";
import ManagedOfficeLegacyRoute from "../components/ManagedOfficeLegacyRoute";

type LazyRouteModule = { default: ComponentType };
const asLazyRoute = (importer: () => Promise<LazyRouteModule>) =>
	async () => ({ Component: (await importer()).default });

const lazyHome = asLazyRoute(() => import("../pages/home/home"));
const lazyAboutUs = asLazyRoute(() => import("../pages/aboutus/aboutus"));
const lazyManagedOffice = asLazyRoute(
	() => import("../pages/managedoffice/managedoffice"),
);
const lazyAwardsAndAchievements = asLazyRoute(
	() => import("../pages/awards/awardsandachievements"),
);
const lazyVirtualOfficeIntro = asLazyRoute(
	() => import("../pages/virtualoffice/intro"),
);
const lazyMeetingRoomsIntro = asLazyRoute(
	() => import("../pages/meetingrooms/intro"),
);
const lazyBlogsIntro = asLazyRoute(() => import("../pages/blogs/intro"));
const lazyBlogDetail = asLazyRoute(
	() => import("../pages/blogs/blogdetail"),
);
const lazyCareersIntro = asLazyRoute(
	() => import("../pages/careers/intro"),
);
const lazyTestimonials = asLazyRoute(
	() => import("../pages/testimonials/testimonials"),
);
const lazyNewsHomepage = asLazyRoute(
	() => import("../pages/news/news_homepage"),
);
const lazyNewsArticle = asLazyRoute(() => import("../pages/news/article"));
const lazyFAQ = asLazyRoute(() => import("../pages/faq/faq"));
const lazyContactUs = asLazyRoute(
	() => import("../pages/contactus/contactus"),
);
const lazyOurTeam = asLazyRoute(() => import("../pages/ourteam/ourteam"));
const lazyThankYou = asLazyRoute(() => import("../pages/thankyou/thankyou"));
const lazyPrivacyPolicy = asLazyRoute(
	() => import("../pages/privacypolicy/privacypolicy"),
);
const lazyTermsAndConditions = asLazyRoute(
	() => import("../pages/termsandconditions/termsandconditions"),
);
const lazyRefundPolicy = asLazyRoute(
	() => import("../pages/refundpolicy/refundpolicy"),
);
const lazyCancellationPolicy = asLazyRoute(
	() => import("../pages/cancellation_policy/cancellation"),
);
const lazyHero = asLazyRoute(() => import("../pages/city/hero"));
const lazyCentre = asLazyRoute(() => import("../pages/centre/Centre"));

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
				lazy: lazyAwardsAndAchievements,
			},
			{
				path: "city/:cityName/",
				lazy: lazyHero,
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
				lazy: lazyVirtualOfficeIntro,
			},
			{
				path: "virtual-office/thankyou/",
				lazy: lazyThankYou,
			},
			{
				path: "meeting-rooms/",
				lazy: lazyMeetingRoomsIntro,
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
				lazy: lazyCareersIntro,
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
				lazy: lazyNewsHomepage,
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
				lazy: lazyTermsAndConditions,
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
