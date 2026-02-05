import OurTeamHero from "./ourteam-hero";
import Visionaries from "../home/components/visionaries";
import Footer from "../../components/footer/footer";
import YouTubeVideo from "../home/components/youtubevideo";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const OurTeam = () => {
	return (
		<div className='w-full'>
			<OurTeamHero />
			<div className="bg-white py-8 md:py-12"></div>
			<Visionaries />
			{/* <div className="bg-white py-8 md:py-12"></div> */}
			<YouTubeVideo />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default OurTeam;
