import { COLORS } from "../../helpers/constants/Colors";
import { Helmet } from "react-helmet-async";
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
			<Helmet>
				<title>iSprout Awards | Recognitions & Achievements</title>
				<meta
					name='description'
					content='Explore iSprout awards and recognitions for excellence in coworking, managed offices, and flexible workspace solutions.'
				/>
			</Helmet>
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
