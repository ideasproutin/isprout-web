import React, { Suspense, lazy, useRef } from "react";
import { COLORS } from "../../helpers/constants/Colors";
import { MetaTags } from "../../hooks/useMetaTags";

import HeroSection from "./components/herosection";
// import Visionaries from "./components/visionaries";
// import FutureOfWork from "./components/futureofwork";
// import Spotlight from "./components/spotlight";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const LazyInnovators = lazy(() => import("../../components/innovators/innovators"));
const LazyCityMap = lazy(() => import("./components/citymap"));
const LazyLocations = lazy(() => import("./components/locations"));
const LazyWhyiSprout = lazy(() => import("./components/whyisprout"));
const LazyTestimonials = lazy(() => import("./components/testimonials"));
const LazyAmenities = lazy(() => import("./components/amenities"));
const LazyAwards = lazy(() => import("./components/awards"));
const LazyBlogsNews = lazy(() => import("./components/blogs_news"));
const LazyYouTubeVideo = lazy(() => import("./components/youtubevideo"));

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
			<Suspense fallback={<div className='min-h-[160px]' />}>
				<LazyInnovators />
			</Suspense>
			<Suspense fallback={<div className='min-h-[640px]' />}>
				<LazyCityMap />
			</Suspense>
			<div ref={locationsRef}>
				<Suspense fallback={<div className='min-h-[760px]' />}>
					<LazyLocations />
				</Suspense>
			</div>
			<Suspense fallback={<div className='min-h-[640px]' />}>
				<LazyWhyiSprout />
			</Suspense>
			{/* <Visionaries /> */}
			<Suspense fallback={<div className='min-h-[320px]' />}>
				<LazyTestimonials />
			</Suspense>
			<Suspense fallback={<div className='min-h-[240px]' />}>
				<LazyAmenities />
			</Suspense>
			<Suspense fallback={<div className='min-h-[260px]' />}>
				<LazyAwards />
			</Suspense>
			<Suspense fallback={<div className='min-h-[420px]' />}>
				<LazyBlogsNews />
			</Suspense>
			{/* <Spotlight /> */}
			{/* <FutureOfWork /> */}
			<Suspense fallback={<div className='min-h-[360px]' />}>
				<LazyYouTubeVideo />
			</Suspense>
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default Home;
