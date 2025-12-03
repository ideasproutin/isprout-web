import React from 'react';
import IntroSection from './introsection';
import WhoWeAre from './whoweare';
import Innovators from '../../components/innovators/innovators';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <IntroSection />
      <WhoWeAre />
      <Innovators />
    </div>
  );
};

export default AboutUs;