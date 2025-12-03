import React from 'react';
import navbarBg from '../../assets/navbar/navbar_background.png';
import profileIcon from '../../assets/navbar/profile_icon.png';
import searchBar from '../../assets/navbar/search.png';

const Navbar: React.FC = () => {
  return (
    <nav 
      className="relative w-full h-11 sm:h-12 md:h-14 bg-cover bg-center bg-no-repeat mb-0"
      style={{ backgroundImage: `url(${navbarBg})` }}
    >
      <div className="relative w-full h-full flex items-center justify-between px-2 sm:px-4 md:px-6">
        {/* Search bar on the left */}
        <div className="flex items-center pl-4 sm:pl-8 md:pl-20 lg:pl-40">
          <img 
            src={searchBar} 
            alt="Search" 
            className="cursor-pointer h-8 sm:h-8 md:h-10"
          />
        </div>

        {/* Navigation links in the center-right */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-14">
          <a href="#blogs" className="text-sm lg:text-base font-medium text-gray-900 hover:text-gray-600">
            Blogs
          </a>
          <a href="#awards" className="text-sm lg:text-base font-medium text-gray-900 hover:text-gray-600">
            Awards
          </a>
          <a href="#spotlight" className="text-sm lg:text-base font-medium text-gray-900 hover:text-gray-600">
            Spotlight
          </a>
        </div>

        {/* Profile icon on the right */}
        <img 
          src={profileIcon} 
          alt="Profile" 
          className="cursor-pointer w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mr-2 sm:mr-4 md:mr-8"
        />
        
      </div>
    </nav>
  );
};

export default Navbar;
