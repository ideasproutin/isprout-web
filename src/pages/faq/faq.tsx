import HeroSection from "./herosection";
import Questions from "./questions";
import Footer from "../../components/footer/footer";
import FutureOfWork from "../home/components/futureofwork";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const FAQ = () => {
	return (
		<div className='min-h-screen bg-white'>
			<HeroSection />
			<Questions />
			<FutureOfWork />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default FAQ;
