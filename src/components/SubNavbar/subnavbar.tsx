import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import isproutLogo from "../../assets/subnavbar/isprout_logo.png";
import flyersClubLogo from "../../assets/subnavbar/flyers_club_logo.png";
import ourLocations from "../../content/ourLocations";


const SubNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isNewsPage = location.pathname.startsWith('/news');
  const isCentrePage = location.pathname.startsWith('/centre/');
  const textColor = (isNewsPage || isCentrePage) ? '!text-white' : 'text-gray-900';
  const hoverColor = (isNewsPage || isCentrePage) ? 'hover:!text-gray-200' : 'hover:text-gray-600';
  const [showLocationsPopup, setShowLocationsPopup] = useState(false);
  const [selectedCity, setSelectedCity] = useState(ourLocations[0].city);

  const currentCityData = ourLocations.find(loc => loc.city === selectedCity) || ourLocations[0];

  const onClickCityNavigate = (cityRedirect: string) => {
    navigate(cityRedirect);
    setShowLocationsPopup(false);
  }

  const onClickCentreNavigate = (centreRedirect: string) => {
    navigate(centreRedirect);
    setShowLocationsPopup(false);
  }

  // Disable background scroll when popup is open
  React.useEffect(() => {
    if (showLocationsPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showLocationsPopup]);

  return (
    <nav className="w-full bg-transparent pb-2 sm:pb-3 md:pb-4 px-2 sm:px-4 md:px-6 overflow-x-auto relative z-40">
      <div className="w-full flex flex-wrap items-center justify-between gap-2 min-w-max  ">
        {/* iSprout Logo on the left */}
        <Link to="/" className="flex items-center shrink-0 ml-1 sm:ml-2 md:ml-8 lg:ml-12 relative top-1">
            <img
                src={isproutLogo}
                alt="iSprout Logo"
                className="h-7 sm:h-8 md:h-9 lg:h-10 xl:h-12"
            />
        </Link>

        {/* Navigation headings in the center */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-12 relative z-50" style={{ fontFamily: 'Outfit, sans-serif' }}>
          <Link
            to="/about"
            className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${textColor} ${hoverColor} whitespace-nowrap cursor-pointer`}
          >
            About Us
          </Link>
          <div 
            className="relative z-50"
            onMouseEnter={() => setShowLocationsPopup(true)}
            onMouseLeave={() => setShowLocationsPopup(false)}
          >
            <span
              className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${textColor} ${hoverColor} whitespace-nowrap cursor-pointer`}
            >
              Our Locations
            </span>
            
            {/* Invisible bridge to prevent popup from closing */}
            {showLocationsPopup && (
              <div 
                className="fixed left-0 right-0"
                style={{ 
                  top: '60px',
                  height: '60px',
                  zIndex: 9998
                }}
                onMouseEnter={() => setShowLocationsPopup(true)}
              />
            )}
            
            {/* Locations Popup */}
            {showLocationsPopup && (
              <div 
                className="fixed left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-6 border-2"
                style={{ 
                  borderColor: '#204758',
                  width: '90vw',
                  maxWidth: '1600px',
                  maxHeight: '85vh',
                  overflowY: 'auto',
                  top: '100px',
                  zIndex: 9999
                }}
                onMouseEnter={() => setShowLocationsPopup(true)}
                onMouseLeave={() => setShowLocationsPopup(false)}
              >
                {/* City Navigation - Full Row */}
                <div className="mb-4 bg-white rounded-lg shadow-sm p-3 border-2" style={{ borderColor: '#204758' }}>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {ourLocations.map((cityData, index) => (
                      <button
                        key={index}
                        onClick={() => onClickCityNavigate(cityData.cityRedirect)}
                        onMouseEnter={() => setSelectedCity(cityData.city)}
                        className={`px-6 py-2 rounded-full whitespace-nowrap font-medium text-base transition-all ${
                          selectedCity === cityData.city
                            ? 'text-white scale-105'
                            : 'bg-white text-gray-700 hover:scale-105'
                        }`}
                        style={
                          selectedCity === cityData.city
                            ? { backgroundColor: '#204758', fontFamily: 'Outfit, sans-serif' }
                            : { fontFamily: 'Outfit, sans-serif' }
                        }
                      >
                        {cityData.city}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location Badge */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                    iSprout Centers In {selectedCity}
                  </h2>
                  <div className="px-3 py-1.5 rounded-lg text-white font-semibold text-sm" style={{ backgroundColor: '#00A8E8' }}>
                    {currentCityData.centersCount} Centers
                  </div>
                </div>

                {/* Location Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {currentCityData.centers.map((location, index) => (
                    <div
                      key={index}
                      className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
                      style={{ height: '180px' }}
                      onClick={() => onClickCentreNavigate(location.centreRedirect)}
                    >
                      <img
                        src={location.image}
                        alt={location.center_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h3 className="text-sm font-bold mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {location.center_name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 1C5.243 1 3 3.243 3 6c0 3.375 5 9 5 9s5-5.625 5-9c0-2.757-2.243-5-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z"
                              fill="white"
                            />
                          </svg>
                          <span className="text-xs" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {location.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link
            to="/managed"
            className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${textColor} ${hoverColor} whitespace-nowrap cursor-pointer`}
          >
            Managed Office
          </Link>
          <Link
            to="/virtual-office"
            className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${textColor} ${hoverColor} whitespace-nowrap cursor-pointer`}
          >
            Virtual Office
          </Link>
          <Link
            to="/meeting-rooms"
            className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${textColor} ${hoverColor} whitespace-nowrap cursor-pointer`}
          >
            Meeting Rooms
          </Link>
        </div>

        {/* Flyers Club Button on the right */}
        <button 
          className="flex items-center gap-1 sm:gap-2 md:gap-3 px-2 sm:px-3 md:px-4 lg:px-4 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-full transition-colors shrink-0 mt-2 border border-black"
          style={{ backgroundColor: '#FFDE00' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFD000'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFDE00'}
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
            <img
              src={flyersClubLogo}
              alt="Flyers Club Logo"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5"
            />
          </div>
          <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold whitespace-nowrap pr-1 sm:pr-2" style={{ fontFamily: 'Otomanopee One, sans-serif', color: '#204758' }}>
            Flyers Club
          </span>
        </button>
      </div>
    </nav>
  );
};

export default SubNavbar;
