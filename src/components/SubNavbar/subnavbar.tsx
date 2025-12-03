import React from "react";
import { Link } from "react-router-dom";
import isproutLogo from "../../assets/subnavbar/isprout_logo.png";
import flyersClubBtn from "../../assets/subnavbar/flyers club btn.png";
import flyersClubLogo from "../../assets/subnavbar/flyers_club_logo.png";

const SubNavbar: React.FC = () => {
  return (
    <nav className="w-full bg-white pb-2 sm:pb-3 md:pb-4 px-2 sm:px-4 md:px-6">
      <div className="w-full flex items-center justify-between gap-2">
        {/* iSprout Logo on the left */}
        <Link to="/" className="flex items-center shrink-0 ml-8 md:ml-16 relative top-1">
            <img
                src={isproutLogo}
                alt="iSprout Logo"
                className="h-9 sm:h-10 md:h-12"
            />
        </Link>

        {/* Navigation headings in the center */}
        <div className="flex items-center gap-4 md:gap-6 xl:gap-12 2xl:gap-12 relative z-20">
          <Link
            to="/about-us"
            className="text-sm md:text-base lg:text-lg font-medium text-gray-900 hover:text-gray-600 whitespace-nowrap cursor-pointer"
          >
            About Us
          </Link>
          <a
            href="#managed-office"
            className="text-sm md:text-base lg:text-lg font-medium text-gray-900 hover:text-gray-600 whitespace-nowrap"
          >
            Managed Office
          </a>
          <a
            href="#our-location"
            className="text-sm md:text-base lg:text-lg font-medium text-gray-900 hover:text-gray-600 whitespace-nowrap"
          >
            Our Location
          </a>
          <a
            href="#careers"
            className="text-sm md:text-base lg:text-lg font-medium text-gray-900 hover:text-gray-600 whitespace-nowrap"
          >
            Careers
          </a>
        </div>

        {/* Flyers Club Button on the right */}
        <div className="relative flex items-center cursor-pointer shrink-0 transform -translate-x-3">
          <img
            src={flyersClubBtn}
            alt="Flyers Club Button"
            className="h-10 sm:h-12 md:h-16 mt-2"
          />
          <div className="absolute left-2 sm:left-2 md:left-3 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-gray-900 flex items-center justify-center">
            <img
              src={flyersClubLogo}
              alt="Flyers Club Logo"
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SubNavbar;
