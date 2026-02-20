import { COLORS } from "../../helpers/constants/Colors";
import { MetaTags } from "../../hooks/useMetaTags";
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
			<MetaTags
				title='iSprout Awards | Recognitions and Achievements'
				description='Explore iSprout awards and recognitions for excellence in coworking, managed offices, and flexible workspace solutions.'
				keywords='iSprout awards, workspace excellence, coworking recognition, managed office awards, workplace innovation'
			/>
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
