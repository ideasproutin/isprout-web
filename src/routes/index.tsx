import { Navigate, redirect } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import App from "../App";
import { useEffect } from "react";
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

// External redirect component (client-side fallback)
const ExternalRedirect = ({ url }: { url: string }) => {
	useEffect(() => {
		window.location.href = url;
	}, [url]);
	return null;
};

// Server-side external redirect loader
const externalRedirectLoader = (url: string) => () => {
	if (typeof window === "undefined") {
		// SSR: return proper HTTP redirect
		throw redirect(url);
	}
	// Client: component's useEffect handles it
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
				element: <Navigate to='/managed-office-space/' replace />,
			},
			{
				path: "/spaces/managed/",
				element: <Navigate to='/managed-office-space/' replace />,
			},
			{
				path: "spaces/coworking/",
				element: <Navigate to='/managed-office-space/' replace />,
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
				element: <Navigate to='/managed-office-space/' replace />,
			},
			{
				path: "coworking-space-in-hyderabad/",
				element: <Navigate to='/managed-office-space/' replace />,
			},
			{
				path: "furnished-office-space-for-rent-in-hyderabad/",
				element: <Navigate to='/managed-office-space/' replace />,
			},
			{
				path: "feature/business-startup-services/",
				element: <Navigate to='/managed-office-space/' replace />,
			},
			{
				path: "office-space-for-rent-in-hyderabad/",
				element: <Navigate to='/managed-office-space/' replace />,
			},
			{
				path: "awards/",
				element: <AwardsAndAchievements />,
			},
			{
				path: "city/:cityName/",
				element: <Hero />,
			},
			{
				path: "city/:cityName/thankyou/",
				element: <ThankYou />,
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
			},
			{
				path: "office/:centreId/thankyou/",
				element: <ThankYou />,
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
