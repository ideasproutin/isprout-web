import React from "react";
import IntroSection from "./introsection";
import WhoWeAre from "./whoweare";
import Innovators from "../../components/innovators/innovators";
import MissionAndVision from "./missionandvision";
import Visionaries from "../home/components/visionaries";
import Evolution from "./evolution";
import BlogsNews from "../home/components/blogs_news";
import FutureOfWork from "../home/components/futureofwork";
import YouTubeVideo from "../home/components/youtubevideo";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { COLORS } from "../../helpers/constants/Colors";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.white }}>
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
