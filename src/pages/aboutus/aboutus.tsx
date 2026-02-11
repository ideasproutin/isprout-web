import React from "react";
import { Helmet } from "react-helmet-async";
import IntroSection from "./introsection";
import WhoWeAre from "./whoweare";
import Innovators from "../../components/innovators/innovators";
import MissionAndVision from "./missionandvision";
import Visionaries from "../home/components/visionaries";
import Evolution from "./evolution";
import BlogsNews from "../home/components/blogs_news";
import YouTubeVideo from "../home/components/youtubevideo";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { COLORS } from "../../helpers/constants/Colors";


const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.white }}>
      <Helmet>
        <title>iSprout: Redefining Workspaces Across India | About Us</title>
        <meta
          name='description'
          content="Discover iSprout's journey in revolutionizing coworking and managed office spaces. Learn how we're shaping the future of work across India's major cities."
          key='description'
        />
      </Helmet>
      <IntroSection />
      <WhoWeAre />
      <Innovators />
      <MissionAndVision />
      <Visionaries />
      <Evolution />
      <BlogsNews />
      {/* <FutureOfWork /> */}
      <YouTubeVideo />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default AboutUs;
