import React from 'react';
import IntroSection from './introsection';
import WhoWeAre from './whoweare';
import Innovators from '../../components/innovators/innovators';
import MissionAndVision from './missionandvision';
import Visionaries from '../home/components/visionaries';
import Evolution from './evolution';
import BlogsNews from '../home/components/blogs_news';
import FutureOfWork from '../home/components/futureofwork';
import Footer from '../../components/footer/footer';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <IntroSection />
      <WhoWeAre />
      <Innovators />
      <MissionAndVision />
      <Visionaries />
      <Evolution />
      <BlogsNews />
      <FutureOfWork />
      <Footer />
    </div>
  );
};

export default AboutUs;