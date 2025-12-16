import React from 'react';
import { homePageImages } from '../../../assets';

interface Visionary {
  image: string;
  name: string;
  title: string;
}

const Visionaries: React.FC = () => {
  const visionaries: Visionary[] = [
    {
      image: homePageImages.sundari,
      name: 'Sundari Patibandla',
      title: 'CEO & Co-Founder'
    },
    {
      image: homePageImages.sreenivas,
      name: 'Sreenivas Tirdhala',
      title: 'CSO & Co-Founder'
    },
    {
      image: homePageImages.vasumathi,
      name: 'Vasumathi Krishnan',
      title: 'Chief Business Officer'
    },
    {
      image: homePageImages.vijay,
      name: 'Vijay Pasupulati',
      title: 'Chief Experience Officer'
    }
  ];

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-b from-yellow-50 to-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Meet The <span style={{ fontFamily: 'Otomanopee One, sans-serif', color: '#FFDE00' }}>Visionaries</span>
          </h2>
        </div>

        {/* Description */}
        <p className="text-center text-sm sm:text-base md:text-lg text-gray-700 max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20 leading-relaxed px-4">
          iSprout's leadership team is dedicated to creating a transformative impact in the workspace industry. Through their 
          guidance and unwavering commitment to client success, they empower businesses to optimize their workspaces, 
          foster collaboration, and achieve their goals.
        </p>

        {/* Visionaries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {visionaries.map((visionary, index) => (
            <div key={index} className={`flex flex-col items-center ${index === 1 || index === 3 ? '-mt-8 sm:-mt-12 md:-mt-16' : ''}`}>
              {/* Image with curved container */}
              <div className="mb-6 w-full max-w-xs">
                <img 
                  src={visionary.image} 
                  alt={visionary.name}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Name */}
              <h3 className="text-lg sm:text-xl font-bold text-center mb-2 text-gray-900">
                {visionary.name}
              </h3>

              {/* Title */}
              <p className="text-sm sm:text-base text-center text-gray-500">
                {visionary.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Visionaries;
