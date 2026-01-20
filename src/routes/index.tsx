import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home";
import AboutUs from "../pages/aboutus/aboutus";
import ManagedOffice from "../pages/managedoffice/managedoffice";
import AwardsAndAchievements from "../pages/awards/awardsandachievements";
import Locations from "../pages/locations/locations";
import VirtualOfficeIntro from "../pages/virtualoffice/intro";
import MeetingRoomsIntro from "../pages/meetingrooms/intro";
import BlogsIntro from "../pages/blogs/intro";
import SpotlightIntro from "../pages/spotlight/intro";
import CareersIntro from "../pages/careers/intro";
import Testimonials from "../pages/testimonials/testimonials";
import NewsHomepage from "../pages/news/news_homepage";
import NewsArticle from "../pages/news/article";
import FAQ from "../pages/faq/faq";
import ContactUs from "../pages/contactus/contactus";
import OurTeam from "../pages/ourteam/ourteam";
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
				element: <ManagedOffice />,
			},
			{
				path: "awards",
				element: <AwardsAndAchievements />,
			},
			{
				path: "locations",
				element: <Locations />,
			},
			{
				path: "city/:cityName",
				element: <Hero />,
			},
			{
				path: "centre/:centreId",
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
				path: "spotlight",
				element: <SpotlightIntro />,
			},
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
				path: "news/article",
				element: <NewsArticle />,
			},
			{
				path: "faq",
				element: <FAQ />,
			},
			{
				path: "contactus",
				element: <ContactUs />,
			},
			{
				path: "ourteam",
				element: <OurTeam />,
			},
		],
	},
]);

export default router;
