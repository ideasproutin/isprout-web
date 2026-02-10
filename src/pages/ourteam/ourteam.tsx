import { Helmet } from "react-helmet";
import OurTeamHero from "./ourteam-hero";
import Visionaries from "../home/components/visionaries";
import Footer from "../../components/footer/footer";
import YouTubeVideo from "../home/components/youtubevideo";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const OurTeam = () => {
	return (
		<div className='w-full'>
			<Helmet>
				<title>Meet the Visionaries Behind iSprout's Workspace Revolution</title>
				<meta
					name='description'
					content="Get to know the passionate team driving iSprout's mission to transform coworking spaces. Our experts are dedicated to enhancing your work experience."
				/>
			</Helmet>
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
