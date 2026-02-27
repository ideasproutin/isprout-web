import { Navigate, redirect } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home";
import AboutUs from "../pages/aboutus/aboutus";
import ManagedOffice from "../pages/managedoffice/managedoffice";
import AwardsAndAchievements from "../pages/awards/awardsandachievements";
import VirtualOfficeIntro from "../pages/virtualoffice/intro";
import MeetingRoomsIntro from "../pages/meetingrooms/intro";
import BlogsIntro from "../pages/blogs/intro";
import BlogDetail from "../pages/blogs/blogdetail";
import CareersIntro from "../pages/careers/intro";
import Testimonials from "../pages/testimonials/testimonials";
import NewsHomepage from "../pages/news/news_homepage";
import NewsArticle from "../pages/news/article";
import FAQ from "../pages/faq/faq";
import ContactUs from "../pages/contactus/contactus";
import OurTeam from "../pages/ourteam/ourteam";
import ThankYou from "../pages/thankyou/thankyou";
import PrivacyPolicy from "../pages/privacypolicy/privacypolicy";
import TermsAndConditions from "../pages/termsandconditions/termsandconditions";
import RefundPolicy from "../pages/refundpolicy/refundpolicy";
import CancellationPolicy from "../pages/cancellation_policy/cancellation";
import Hero from "../pages/city/hero";
import Centre from "../pages/centre/Centre";
import PageNotFound from "../pages/404pagenotfound/pagenotfound";
import { fetchCityCenters } from "../services/cityCenterApi";
import ExternalRedirect from "../components/ExternalRedirect.tsx";
import ManagedOfficeLegacyRoute from "../components/ManagedOfficeLegacyRoute";

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

// City validation loader
const cityLoader = async ({ params }: { params: { cityName?: string } }) => {
	const rawCityName = params.cityName;
	if (!rawCityName) {
		throw new Response("City not found", {
			status: 404,
			statusText: "Not Found",
		});
	}

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

// Redirect lowercase city thank-you URLs to canonical casing
const cityThankYouLoader = ({ params }: { params: { cityName?: string } }) => {
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
				element: <Home />,
			},
			{
				path: "about/",
				element: <AboutUs />,
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
				element: <ManagedOffice />,
			},
			{
				path: "managed-office-space/thankyou/",
				element: <ThankYou />,
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
				element: <AwardsAndAchievements />,
			},
			{
				path: "city/:cityName/",
				element: <Hero />,
				loader: cityLoader,
				errorElement: <PageNotFound />,
			},
			{
				path: "city/:cityName/thankyou/",
				element: <ThankYou />,
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
				element: <Centre />,
				errorElement: <PageNotFound />,
			},
			{
				path: "office/:centreId/thankyou/",
				element: <ThankYou />,
				errorElement: <PageNotFound />,
			},
			{
				path: "virtual-office/",
				element: <VirtualOfficeIntro />,
			},
			{
				path: "virtual-office/thankyou/",
				element: <ThankYou />,
			},
			{
				path: "meeting-rooms/",
				element: <MeetingRoomsIntro />,
			},
			{
				path: "meeting-rooms/thankyou/",
				element: <ThankYou />,
			},
			{
				path: "blogs/",
				element: <BlogsIntro />,
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
				element: <BlogDetail />,
			},
			{
				path: "careers/",
				element: <CareersIntro />,
			},
			{
				path: "careers/thankyou/",
				element: <ThankYou />,
			},
			{
				path: "testimonials/",
				element: <Testimonials />,
			},
			{
				path: "news/",
				element: <NewsHomepage />,
			},
			{
				path: "news/:url/",
				element: <NewsArticle />,
			},
			{
				path: "faq/",
				element: <FAQ />,
			},
			{
				path: "contact/",
				element: <ContactUs />,
			},
			{
				path: "contact/thankyou/",
				element: <ThankYou />,
			},
			{
				path: "teams/",
				element: <OurTeam />,
			},
			{
				path: "privacy",
				element: <Navigate to='/privacy-policy/' replace />,
			},
			{
				path: "privacy-policy/",
				element: <PrivacyPolicy />,
			},
			{
				path: "terms-conditions/",
				element: <TermsAndConditions />,
			},
			{
				path: "refund-policy/",
				element: <RefundPolicy />,
			},
			{
				path: "cancellation-policy/",
				element: <CancellationPolicy />,
			},
			{
				path: "thankyou/",
				element: <ThankYou />,
			},
			{
				path: "*",
				element: <PageNotFound />,
			},
		],
	},
];
