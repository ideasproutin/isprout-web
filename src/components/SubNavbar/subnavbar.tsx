import React from "react";
import { Link } from "react-router-dom";
import isproutLogo from "../../assets/subnavbar/isprout_logo.png";
import flyersClubLogo from "../../assets/subnavbar/flyers_club_logo.png";

const SubNavbar: React.FC = () => {
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
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-12 relative z-20" style={{ fontFamily: 'Outfit, sans-serif' }}>
          <Link
            to="/about"
            className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900 hover:text-gray-600 whitespace-nowrap cursor-pointer"
          >
            About Us
          </Link>
          <Link
            to="/locations"
            className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900 hover:text-gray-600 whitespace-nowrap cursor-pointer"
          >
            Our Locations
          </Link>
          <Link
            to="/managed"
            className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900 hover:text-gray-600 whitespace-nowrap cursor-pointer"
          >
            Managed Office
          </Link>
          <Link
            to="/virtual-office"
            className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900 hover:text-gray-600 whitespace-nowrap cursor-pointer"
          >
            Virtual Office
          </Link>
          <Link
            to="/meeting-rooms"
            className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900 hover:text-gray-600 whitespace-nowrap cursor-pointer"
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
