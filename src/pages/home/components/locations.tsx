import React, { useState } from 'react';
import headingImage from '../../../assets/locations/Inspiring Workspaces for Visionary Teams.png';
import yellowCircle from '../../../assets/locations/Ellipse 24.png';
import orbitImage from '../../../assets/locations/hyd-orbit.png';
import orbitName from '../../../assets/locations/Orbit Knowledge City Hyderabad.png';
import rectangleOverlay from '../../../assets/locations/Rectangle 13.png';
import ogmImage from '../../../assets/locations/hyd-ogm.png';
import ogmName from '../../../assets/locations/One Golden Mile Kokapet Hyderabad.png';
import twizaImage from '../../../assets/locations/hyd-twitza.png';
import twizaName from '../../../assets/locations/My Home Twiza Hitec City Hyderabad.png';

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
      name: orbitName,
      title: 'Orbit'
    },
    {
      image: ogmImage,
      name: ogmName,
      title: 'One Golden Mile'
    },
    {
      image: twizaImage,
      name: twizaName,
      title: 'My Home Twiza'
    }
  ];

  const centreCount = activeCity === 'Hyderabad' ? 11 : 0;

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-br from-yellow-50 to-white overflow-hidden">
      {/* Yellow Circle Decoration */}
      <img 
        src={yellowCircle} 
        alt="" 
        className="absolute -top-8 -left-8 sm:-top-12 sm:-left-12 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 opacity-80"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
          <img 
            src={headingImage} 
            alt="Inspiring Workspaces for Visionary Teams" 
            className="max-w-full h-auto w-full sm:w-4/5 md:w-3/4 lg:w-2/3"
          />
        </div>

        {/* City Tabs */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`text-sm sm:text-base md:text-lg font-medium transition-all duration-300 relative pb-1 ${
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
              {/* Location Image */}
              <div className="relative w-full">
                <img
                  src={location.image}
                  alt={location.title}
                  className="w-full h-auto object-cover"
                />
                {/* Rectangle Overlay */}
                <img
                  src={rectangleOverlay}
                  alt=""
                  className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
                />
                
                {/* Location Name - Positioned on Image */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                  <img
                    src={location.name}
                    alt={location.title}
                    className="max-w-full h-auto"
                  />
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
