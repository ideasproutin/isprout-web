import { createBrowserRouter, Navigate } from "react-router-dom";
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
import App from "../App";
import Hero from "../pages/city/hero";
import Centre from "../pages/centre/Centre";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "about",
				element: <AboutUs />,
			},
			{
				path: "managed",
				element: <Navigate to='/managed-office' replace />,
			},
			{
				path: "/spaces/managed",
				element: <Navigate to='/managed-office' replace />,
			},
			{
				path: "managed-office-spaces",
				element: <Navigate to='/managed-office' replace />,
			},
			{
				path: "managed-office",
				element: <ManagedOffice />,
			},
			{
				path: "awards",
				element: <AwardsAndAchievements />,
			},
			// {
			// 	path: "locations",
			// 	element: <Locations />,
			// },
			{
				path: "city/:cityName",
				element: <Hero />,
			},
			{
				path: "office/:centreId",
				element: <Centre />,
			},
			{
				path: "virtual-office",
				element: <VirtualOfficeIntro />,
			},
			{
				path: "meeting-rooms",
				element: <MeetingRoomsIntro />,
			},
			{
				path: "blogs",
				element: <BlogsIntro />,
			},
			{
				path: "blogs/:blogId",
				element: <BlogDetail />,
			},
			// {
			// 	path: "spotlight",
			// 	element: <SpotlightIntro />,
			// },
			{
				path: "careers",
				element: <CareersIntro />,
			},
			{
				path: "testimonials",
				element: <Testimonials />,
			},
			{
				path: "news",
				element: <NewsHomepage />,
			},
			{
				path: "news/article/:id",
				element: <NewsArticle />,
			},
			{
				path: "faq",
				element: <FAQ />,
			},
			{
				path: "contact",
				element: <ContactUs />,
			},
			{
				path: "teams",
				element: <OurTeam />,
			},
			{
				path: "privacy-policy",
				element: <PrivacyPolicy />,
			},
			{
				path: "thankyou",
				element: <ThankYou />,
			},
		],
	},
]);

export default router;
