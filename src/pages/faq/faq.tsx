import HeroSection from "./herosection";
import Questions from "./questions";
import Footer from "../../components/footer/footer";
import YouTubeVideo from "../home/components/youtubevideo";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const FAQ = () => {
	return (
		<div className='min-h-screen bg-white'>
			<HeroSection />
			<Questions />
			<YouTubeVideo />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default FAQ;
