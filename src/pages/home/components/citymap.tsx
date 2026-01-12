import React from 'react';
import { homePageImages } from '../../../assets';

const CityMap: React.FC = () => {
  return (
    <section 
      className="relative w-full min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-[#00275c] overflow-visible"
    >
      {/* Decorative Circles */}
      <div 
        className="absolute -top-8 right-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full "
        style={{ backgroundColor: '#FFDE00' }}
      />
      <div 
        className="absolute -bottom-8 left-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full"
        style={{ backgroundColor: '#FFDE00'}}
      />

      {/* Arrow Decorations */}
      <div className="absolute top-8 left-8">
      <div className="relative w-16 sm:w-20 md:w-24">
        <img 
        src={homePageImages.citymapReversearrow} 
        alt="Arrow" 
        className="w-full"
        />
        {/* <img 
        src={arrowPointer} 
        alt="" 
        className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 sm:w-5 md:w-6"
        /> */}
      </div>
      </div>
      <div className="absolute bottom-8 right-8">
      <div className="relative w-16 sm:w-20 md:w-24">
        <img 
        src={homePageImages.citymapYellowarrow} 
        alt="Arrow" 
        className="w-full"
        />
        {/* <img 
        src={arrowPointer} 
        alt="" 
        className="absolute -right-2 top-10 -translate-y-1/2 w-4 sm:w-5 md:w-6"
        /> */}
      </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      {/* Left Side - India Map */}
      <div className="flex-1 relative">
        <img 
        src={homePageImages.india} 
        alt="India Map" 
        className="w-full max-w-md mx-auto"
        />
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
        Your city.<br />
        Your workspace.<br />
        Your <span style={{ fontFamily: 'Otomanopee One, sans-serif', color: '#FFDE00' }}>iSprout</span> ;
        </h2>

        <p className="text-base sm:text-lg md:text-xl mb-8 max-w-xl">
        iSprout provides office spaces in various key locations within major cities. Find the perfect and convenient workspace situated in your preferred area.
        </p>

        {/* Stats */}
        <div className="flex gap-8 sm:gap-12 md:gap-16">
        <div className="text-center">
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">8</p>
          <p className="text-sm sm:text-base md:text-lg">Cities</p>
        </div>
        <div className="text-center">
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">28</p>
          <p className="text-sm sm:text-base md:text-lg">Centers</p>
        </div>
        <div className="text-center">
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">39k+</p>
          <p className="text-sm sm:text-base md:text-lg">Workstations</p>
        </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default CityMap;
