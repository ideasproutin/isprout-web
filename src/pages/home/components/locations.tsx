import React, { useState } from 'react';
import orbitImage from '../../../assets/locations/hyd-orbit.png';
import rectangleOverlay from '../../../assets/locations/Rectangle 13.png';
import ogmImage from '../../../assets/locations/hyd-ogm.png';
import twizaImage from '../../../assets/locations/hyd-twitza.png';

interface LocationCard {
  image: string;
  name: string;
  title: string;
}

const Locations: React.FC = () => {
  const [activeCity, setActiveCity] = useState('Hyderabad');

  const cities = [
    'Hyderabad',
    'Bengaluru',
    'Pune',
    'Chennai',
    'Vijayawada',
    'Kolkata',
    'Ahmedabad',
    'Gurugram'
  ];

  // Sample location cards for Hyderabad - using the available image
  const locations: LocationCard[] = [
    {
      image: orbitImage,
      name: 'Orbit Knowledge City Hyderabad',
      title: 'Orbit'
    },
    {
      image: ogmImage,
      name: 'One Golden Mile Kokapet Hyderabad',
      title: 'One Golden Mile'
    },
    {
      image: twizaImage,
      name: 'My Home Twiza Hitec City Hyderabad',
      title: 'My Home Twiza'
    }
  ];

  const centreCount = activeCity === 'Hyderabad' ? 11 : 0;

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden" style={{ fontFamily: 'Outfit, sans-serif' }}>
  <div className="max-w-7xl mx-auto relative z-10">
    
    {/* Heading */}
    <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center max-w-5xl px-4">
        Inspiring <span style={{ fontFamily: 'Otomanopee One, sans-serif', color: '#FFDE00' }}>Workspaces</span> for Visionary Teams
      </h2>
    </div>

    {/* City Tabs */}
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => setActiveCity(city)}
          style={{ backgroundColor: "#ffffff" }}
          className={`text-sm sm:text-base md:text-lg font-medium transition-all duration-300 relative pb-1
                      bg-transparent border-none outline-none appearance-none
                      ${
                        activeCity === city
                          ? 'text-black font-bold'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
        >
          {city}
          {activeCity === city && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
          )}
        </button>
      ))}
    </div>

    {/* Centre Count */}
    <div className="flex justify-between items-center mb-6 sm:mb-8">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
        {activeCity} - {centreCount} centres
      </h3>
      <button className="text-sm sm:text-base text-gray-700 hover:text-black font-medium transition-colors">
        View More
      </button>
    </div>

    {/* Location Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {locations.map((location, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative w-full">
            <img
              src={location.image}
              alt={location.title}
              className="w-full h-auto object-cover"
            />

            <img
              src={rectangleOverlay}
              alt=""
              className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
            />

            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 max-w-[80%]">
              <p className="text-white text-sm sm:text-base md:text-lg font-bold leading-tight drop-shadow-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {location.name}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default Locations;
