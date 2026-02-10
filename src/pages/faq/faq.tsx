import { Helmet } from "react-helmet";
import HeroSection from "./herosection";
import Questions from "./questions";
import Footer from "../../components/footer/footer";
import YouTubeVideo from "../home/components/youtubevideo";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const FAQ = () => {
	return (
		<div className='min-h-screen bg-white'>
			<Helmet>
				<title>iSprout FAQs: Guide to Our Flexible Workspace Solutions</title>
				<meta
					name='description'
					content="Find answers to common questions about iSprout's coworking spaces, managed offices, and workspace solutions. Discover how our flexible options can support your business needs."
				/>
			</Helmet>
			<HeroSection />
			<Questions />
			<YouTubeVideo />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default FAQ;
