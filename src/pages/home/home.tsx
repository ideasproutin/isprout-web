import React from 'react';
import { COLORS } from '../../helpers/constants/Colors';

import HeroSection from './components/herosection';
import Innovators from '../../components/innovators/innovators';
import CityMap from './components/citymap';
import Locations from './components/locations';
import WhyiSprout from './components/whyisprout';
import Visionaries from './components/visionaries';
import FutureOfWork from './components/futureofwork';
import Testimonials from './components/testimonials';
import Amenities from './components/amenities';
import BlogsNews from './components/blogs_news';
import Spotlight from './components/spotlight';
import Awards from './components/awards';
import Footer from '../../components/footer/footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.white }}>
      <HeroSection />
      <Innovators />
      <CityMap />
      <Locations />
      <WhyiSprout />
      <Visionaries />
      <FutureOfWork />
      <Testimonials />
      <Amenities />
      <BlogsNews />
      <Spotlight />
      <Awards />
      <Footer />
    </div>
  );
};

export default Home;