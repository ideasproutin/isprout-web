import React from 'react';
import getInTouchBtn from '../../../assets/hero_section/getintouch_button.png';
import locationBtn from '../../../assets/hero_section/location_button.png';
import logo from '../../../assets/hero_section/logo.png';
import yellowGradient from '../../../assets/hero_section/hero_yellowgradient.png';
import blueGradient from '../../../assets/hero_section/hero_bluegradient.png';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-visible -mt-20 pb-32">
      {/* Yellow Gradient - Left */}
      <img 
        src={yellowGradient} 
        alt="" 
        className="absolute left-0 top-0 h-[calc(100%+20rem)] w-120 object-cover -mt-30 z-0"
      />
      
      {/* Blue Gradient - Right */}
      <img 
        src={blueGradient} 
        alt="" 
        className="absolute right-0 top-0 h-[calc(100%+20rem)] w-120 object-cover -mt-4 z-0"
      />

      {/* Hero Content */}
    <div className="relative z-10 max-w-2xl ml-20 sm:ml-24 md:ml-32 lg:ml-40 mt-24 sm:mt-32 md:mt-40 lg:mt-48">
        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 sm:mb-12 leading-tight">
            Creative
            <br />
            W<img src={logo} alt="Logo" className="inline-block h-8 sm:h-8 md:h-8" />rkspaces
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* View Locations Button */}
            <img 
                src={locationBtn} 
                alt="View Locations" 
                className="h-14 sm:h-16 md:h-18 cursor-pointer hover:opacity-90 transition-opacity"
            />
            
            {/* Get In Touch Button */}
            <img 
                src={getInTouchBtn} 
                alt="Get In Touch" 
                className="h-14 sm:h-16 md:h-18 cursor-pointer hover:opacity-90 transition-opacity"
            />
        </div>
    </div>
    </section>
  );
};

export default HeroSection;
