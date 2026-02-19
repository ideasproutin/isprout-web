import React, { useRef } from "react";
import { COLORS } from "../../helpers/constants/Colors";
import { MetaTags } from "../../hooks/useMetaTags";

import HeroSection from "./components/herosection";
import Innovators from "../../components/innovators/innovators";
import CityMap from "./components/citymap";
import Locations from "./components/locations";
import WhyiSprout from "./components/whyisprout";
import Visionaries from "./components/visionaries";
// import FutureOfWork from "./components/futureofwork";
import YouTubeVideo from "./components/youtubevideo";
import Testimonials from "./components/testimonials";
import Amenities from "./components/amenities";
import BlogsNews from "./components/blogs_news";
// import Spotlight from "./components/spotlight";
import Awards from "./components/awards";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const Home: React.FC = () => {
	const locationsRef = useRef<HTMLDivElement | null>(null);

	const handleScrollToLocations = () => {
		if (locationsRef.current) {
			const navbarHeight = 100; // Adjust this value to match your navbar + subnavbar height
			const elementPosition =
				locationsRef.current.getBoundingClientRect().top;
			const offsetPosition =
				elementPosition + window.pageYOffset - navbarHeight;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};

	return (
		<div className='min-h-screen' style={{ backgroundColor: COLORS.white }}>
			<MetaTags
				title='iSprout: Inspiring Workspaces, Fueling Your Productivity'
				description="iSprout's coworking spaces across India ignite creativity and boost productivity. Our designed offices empower professionals nationwide."
			/>
			<HeroSection onViewLocations={handleScrollToLocations} />
			<Innovators />
			<CityMap />
			<div ref={locationsRef}>
				<Locations />
			</div>
			<WhyiSprout />
			<Visionaries />
			<Testimonials />
			<Amenities />
			<Awards />
			<BlogsNews />
			{/* <Spotlight /> */}
			{/* <FutureOfWork /> */}
			<YouTubeVideo />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default Home;
