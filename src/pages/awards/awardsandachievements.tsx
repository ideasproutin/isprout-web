import { COLORS } from "../../helpers/constants/Colors";
import AwardsHero from "./awards-hero";

import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import Awards from "./awards";	
import YouTubeVideo from "../home/components/youtubevideo";



const AwardsAndAchievements = () => {
	return (
		<div
			className='relative w-full overflow-x-hidden'
			style={{ backgroundColor: COLORS.white }}
		>
			{/* Hero Section */}
			<AwardsHero />

			{/* Awards Section */}
			<Awards />

			
			{/* YouTube Video Section */}
			<YouTubeVideo />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default AwardsAndAchievements;
