import { useState } from 'react';
import Innovators from '../../components/innovators/innovators';
import CityMap from '../home/components/citymap';
import LocationsHome from '../home/components/locations';
import WhyiSprout from '../home/components/whyisprout';
import Visionaries from '../home/components/visionaries';
import FutureOfWork from '../home/components/futureofwork';
import Testimonials from '../home/components/testimonials';
import Amenities from '../home/components/amenities';
import BlogsNews from '../home/components/blogs_news';
import Spotlight from '../home/components/spotlight';
import Awards from '../home/components/awards';
import Footer from '../../components/footer/footer';
import ourLocations from '../../content/ourLocations';

import { useNavigate } from 'react-router-dom';

const Locations = () => {
    const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(ourLocations[0].city);

  const currentCityData = ourLocations.find(loc => loc.city === selectedCity) || ourLocations[0];

  const onClickCityNavigate = (cityRedirect: string) => {
    navigate(cityRedirect);
  }

  const onClickCentreNavigate = (centreRedirect: string) => {
    navigate(centreRedirect);
  } 

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* City Navigation */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-4 border-2" style={{ borderColor: '#00275c' }}>
          <div className="flex items-center gap-3 overflow-x-auto">
            {ourLocations.map((cityData, index) => (
              <button
                key={index}
                onClick={() => onClickCityNavigate(cityData.cityRedirect)}
                onMouseEnter={() => setSelectedCity(cityData.city)}
                className={`px-6 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-colors ${
                  selectedCity === cityData.city
                    ? 'text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
                style={
                  selectedCity === cityData.city
                    ? { backgroundColor: '#00275c', fontFamily: 'Outfit, sans-serif' }
                    : { fontFamily: 'Outfit, sans-serif' }
                }
              >
                {cityData.city}
              </button>
            ))}
            <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 shrink-0">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Location Badge */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
            iSprout Centers In {selectedCity}
          </h2>
          <div className="px-4 py-2 rounded-lg text-white font-semibold" style={{ backgroundColor: '#00A8E8' }}>
            {currentCityData.centersCount} Centers
          </div>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentCityData.centers.map((location, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
              style={{ height: '250px' }}
              onClick={() => onClickCentreNavigate(location.centreRedirect)}
            >
              <img
                src={location.image}
                alt={location.center_name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {location.center_name}
                </h3>
                <div className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 1C5.243 1 3 3.243 3 6c0 3.375 5 9 5 9s5-5.625 5-9c0-2.757-2.243-5-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z"
                      fill="white"
                    />
                  </svg>
                  <span className="text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {location.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-start">
          <button
            className="flex items-center gap-2 text-lg font-semibold hover:gap-3 transition-all"
            style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}
          >
            See More
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15l5-5-5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Additional Sections */}
      <Innovators />
      <CityMap />
      <LocationsHome />
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

export default Locations;
