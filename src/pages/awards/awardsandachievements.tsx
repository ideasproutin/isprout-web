import { COLORS } from "../../helpers/constants/Colors";
import AwardsHero from "./awards-hero";
// import SibaAwards from "./sibaawards";
// import SpotlightAward from "./spotlightaward";
// import ManagedOfficeBrand from "./managedofficebrand";
// import TimesBusiness from "./timesbusiness";
// import WomenLeader from "./womenleader";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import Awards from "./awards";	
import YouTubeVideo from "../home/components/youtubevideo";
// Update the import path and/or filename casing/extension as needed


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

			{/* SIBA Awards Section */}
			{/* <SibaAwards /> */}

			{/* Spotlight Award Section */}
			{/* <SpotlightAward /> */}

			{/* Managed Office Brand Section */}
			{/* <ManagedOfficeBrand /> */}

			{/* Times Business Awards Section */}
			{/* <TimesBusiness /> */}

			{/* Women Leader Award Section */}
			{/* <WomenLeader /> */}

			{/* Footer */}
			{/* YouTube Video Section */}
				<YouTubeVideo />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default AwardsAndAchievements;
