import React from 'react';
import profileIcon from '../../assets/navbar/profileicon.png';
import search from '../../assets/navbar/search.png';

const Navbar: React.FC = () => {
  return (
    <nav 
      className="relative w-full h-11 sm:h-12 md:h-14 mb-0 rounded-md overflow-x-auto"
      style={{ backgroundColor: '#204758'}}
    >
      <div className="relative w-full h-full flex items-center justify-end px-2 sm:px-4 md:px-6 min-w-max">
        {/* Navigation links */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 mr-2 sm:mr-4 lg:mr-24" style={{ fontFamily: 'Outfit, sans-serif' }}>
          <a href="#blogs" className="text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap">
            Blogs
          </a>
          <a href="#awards" className="text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap">
            Awards
          </a>
          <a href="#spotlight" className="text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap">
            Spotlight
          </a>
          <a href="#careers" className="text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap">
            Careers
          </a>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <img 
            src={search} 
            alt="Search" 
            className="cursor-pointer w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
          />
          <img 
            src={profileIcon} 
            alt="Profile" 
            className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
