import { Link } from 'react-router-dom';
import logo from "../../assets/footer/isprout_logo.png";
import instagram from "../../assets/footer/Instagram.png";
import facebook from "../../assets/footer/Facebook.png";
import twitter from "../../assets/footer/Twitter.png";
import youtube from "../../assets/footer/Youtube.png";
import linkedin from "../../assets/footer/Linkedin.png";

const Footer = () => {
  return (
    <footer className="w-full bg-[#c4c4c4] font-tertiary">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16">
        {/* Top Section - Logo and Get In Touch */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 sm:mb-16">
          {/* Logo */}
          <div>
            <img
              src={logo}
              alt="iSprout"
              className="h-16 sm:h-20 md:h-24 w-auto"
            />
          </div>

          {/* Ready to get started + Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-black">
              Ready to get started?
            </p>
            <button
              style={{ backgroundColor: "#204758" }}
              className="px-8 py-3 sm:py-4 text-white font-semibold transition-colors text-base sm:text-lg"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Company Column */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-4 text-black">
              COMPANY
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  About iSprout
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Career
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Managed Office
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Virtual Office
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Meeting Rooms
                </a>
              </li>
            </ul>
          </div>

          {/* Locations Column */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-4 text-black">
              LOCATIONS
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Hyderabad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Bangalore
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Pune
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Chennai
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Vijayawada
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Gurugram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Ahmedabad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Kolkata
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-4 text-black">
              RESOURCES
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Blogs
                </a>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Spotlight
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Awards
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors"
                >
                  Terms and conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Contact Column */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-4 text-black">
              QUICK CONTACT
            </h3>

            {/* Social Media Icons */}
            <div className="flex gap-3 sm:gap-4 mb-6">
              <a href="#" className="hover:opacity-70 transition-opacity">
                <img
                  src={instagram}
                  alt="Instagram"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <img
                  src={facebook}
                  alt="Facebook"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <img
                  src={twitter}
                  alt="Twitter"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <img
                  src={youtube}
                  alt="YouTube"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <img
                  src={linkedin}
                  alt="LinkedIn"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
              </a>
            </div>

            {/* Phone Button */}
            <button
              style={{ backgroundColor: "#204758" }}
              className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full transition-colors text-sm sm:text-base"
            >
              +91 987654321
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Black Bar */}
      <div className="w-full bg-black h-8 sm:h-10"></div>
    </footer>
  );
};

export default Footer;
