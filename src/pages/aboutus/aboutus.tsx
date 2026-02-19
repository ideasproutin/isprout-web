import React from "react";
import { MetaTags } from "../../hooks/useMetaTags";
import IntroSection from "./introsection";
// import InfoStrip from "../careers/info-strip";
import AboutiSprout from "./aboutisprout";
// import WhoWeAre from "./whoweare";
import Innovators from "../../components/innovators/innovators";
import MissionAndVision from "./missionandvision";
import Visionaries from "../home/components/visionaries";
import Evolution from "./evolution";
import BlogsNews from "../home/components/blogs_news";
// import YouTubeVideo from "../home/components/youtubevideo";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { COLORS } from "../../helpers/constants/Colors";

const AboutUs: React.FC = () => {
	return (
		<div className='min-h-screen' style={{ backgroundColor: COLORS.white }}>
			<MetaTags
				title='iSprout: Redefining Workspaces Across India | About Us'
				description="Discover iSprout's journey in revolutionizing coworking and managed office spaces. Learn how we're shaping the future of work across India's major cities."
			/>

			<IntroSection />
			{/* <InfoStrip /> */}
			<AboutiSprout />
			{/* <WhoWeAre /> */}
			<Evolution />
			<MissionAndVision />
			<Visionaries />
			<Innovators />
			<BlogsNews />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default AboutUs;
