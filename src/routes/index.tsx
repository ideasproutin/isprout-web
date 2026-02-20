import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import Home from "../pages/home/home";
import AboutUs from "../pages/aboutus/aboutus";
import ManagedOffice from "../pages/managedoffice/managedoffice";
import AwardsAndAchievements from "../pages/awards/awardsandachievements";
import VirtualOfficeIntro from "../pages/virtualoffice/intro";
import MeetingRoomsIntro from "../pages/meetingrooms/intro";
import BlogsIntro from "../pages/blogs/intro";
import BlogDetail from "../pages/blogs/blogdetail";
// import SpotlightIntro from "../pages/spotlight/intro";
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
import App from "../App";
import Hero from "../pages/city/hero";
import Centre from "../pages/centre/Centre";
import PageNotFound from "../pages/404pagenotfound/pagenotfound";
import { useEffect } from "react";

// External redirect component
const ExternalRedirect = ({ url }: { url: string }) => {
	useEffect(() => {
		window.location.href = url;
	}, [url]);
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
			// {
			// 	path: "locations",
			// 	element: <Locations />,
			// },
			{
				path: "city/:cityName/",
				element: <Hero />,
			},
			{
				path: "office/flyers-club/",
				element: (
					<ExternalRedirect url='https://flyersclub.isprout.in/' />
				),
			},
			{
				path: "office/:centreId/",
				element: <Centre />,
			},
			{
				path: "virtual-office/",
				element: <VirtualOfficeIntro />,
			},
			{
				path: "meeting-rooms/",
				element: <MeetingRoomsIntro />,
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
			// {
			// 	path: "spotlight",
			// 	element: <SpotlightIntro />,
			// },
			{
				path: "careers/",
				element: <CareersIntro />,
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
