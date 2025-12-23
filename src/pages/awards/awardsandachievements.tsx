import award1 from "../../assets/awards_achievements/awards_achievements1.png";
import award2 from "../../assets/awards_achievements/awards_achievements2.png";
import award3 from "../../assets/awards_achievements/awards_achievements3.png";
import logo from "../../assets/awards_achievements/awards_circlelogo.png";
import SibaAwards from "./sibaawards";
import SpotlightAward from "./spotlightaward";
import ManagedOfficeBrand from "./managedofficebrand";
import TimesBusiness from "./timesbusiness";
import WomenLeader from "./womenleader";
import Footer from "../../components/footer/footer";

const AwardsAndAchievements = () => {
  return (
    <div className="relative w-full bg-white overflow-x-hidden">
      {/* Hero Section Container */}
      <div className="relative w-full h-[600px] overflow-hidden bg-[rgba(255,222,0,0.16)]">
        {/* Yellow/Beige Background Overlay - Increased Height */}
        {/* <div className="absolute left-0 top-0 w-full h-[600px]  z-0" /> */}

        {/* Large Dark Ellipse Background - Extended Width */}
        <div className="absolute left-[-150px] top-[-250px] w-[1000px] h-[700px] z-0">
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ transform: "rotate(351.673deg)" }}
          >
            <svg
              className="w-full h-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 1221.22 995.709"
            >
              <g filter="url(#filter0_i_1_29)">
                <ellipse
                  cx="610.609"
                  cy="497.855"
                  fill="#204758"
                  rx="610.609"
                  ry="497.855"
                />
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="1007.709"
                  id="filter0_i_1_29"
                  width="1233.22"
                  x="-8"
                  y="-8"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dx="0" dy="4" />
                  <feGaussianBlur stdDeviation="4" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
                  />
                  <feBlend
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="effect1_dropShadow_1_29"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1_29"
                    mode="normal"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="absolute left-[60px] top-[50px] z-10">
          <h1
            className="text-[36px] leading-tight text-[#ffde00]"
            style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
          >
            Awards &<br />
            Achievements
          </h1>
        </div>

        {/* Description Text */}
        <p className="absolute left-[60px] top-[170px] w-[520px] text-[17px] text-white leading-relaxed z-10">
          At iSprout, excellence isn't an act — it's our identity. Our
          commitment to innovation, service quality, and workspace experience
          has earned us multiple recognitions across the country. These awards
          reflect our journey of transforming offices into dynamic, future-ready
          work environments.
        </p>

        {/* Bottom Left Award Circle - On the curve, split between teal and beige */}
        <div className="absolute left-[100px] top-[360px] w-[180px] h-[180px] z-20">
          {/* White Circle Background with Shadow */}
          <div className="absolute inset-[0_-1.74%_-3.48%_-1.74%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 238 238"
            >
              <g filter="url(#filter0_dd_circle1)">
                <circle cx="119" cy="115" fill="#F5F5F5" r="115" />
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="238"
                  id="filter0_dd_circle1"
                  width="238"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="effect1_dropShadow_1_27"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    in2="effect1_dropShadow_1_27"
                    mode="normal"
                    result="effect2_dropShadow_1_27"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect2_dropShadow_1_27"
                    mode="normal"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          {/* Image */}
          <div className="absolute flex items-center justify-center left-[8px] top-[8px] w-[164px] h-[164px]">
            <div className="w-[150px] h-[150px]">
              <img
                src={award3}
                alt="Award"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Center Award Circle - On the curve, split between teal and beige */}
        <div className="absolute left-[420px] top-[320px] w-[180px] h-[180px] z-20">
          {/* White Circle Background with Shadow */}
          <div className="absolute inset-[0_-1.74%_-3.48%_-1.74%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 238 238"
            >
              <g filter="url(#filter0_dd_circle2)">
                <circle cx="119" cy="115" fill="#F5F5F5" r="115" />
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="238"
                  id="filter0_dd_circle2"
                  width="238"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="effect1_dropShadow_1_27"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    in2="effect1_dropShadow_1_27"
                    mode="normal"
                    result="effect2_dropShadow_1_27"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect2_dropShadow_1_27"
                    mode="normal"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          {/* Image */}
          <div className="absolute flex items-center justify-center left-[6px] top-[6px] w-[168px] h-[168px]">
            <div className="w-[150px] h-[150px]">
              <img
                src={award2}
                alt="Award"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Top Right Award Circle - On the curve, split between teal and beige */}
        <div className="absolute left-[680px] top-[190px] w-[180px] h-[180px] z-20">
          {/* White Circle Background with Shadow */}
          <div className="absolute inset-[0_-1.74%_-3.48%_-1.74%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 238 238"
            >
              <g filter="url(#filter0_dd_circle3)">
                <circle cx="119" cy="115" fill="#F5F5F5" r="115" />
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="238"
                  id="filter0_dd_circle3"
                  width="238"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="effect1_dropShadow_1_27"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    in2="effect1_dropShadow_1_27"
                    mode="normal"
                    result="effect2_dropShadow_1_27"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect2_dropShadow_1_27"
                    mode="normal"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          {/* Rotated Image */}
          <div className="absolute flex items-center justify-center left-[-6px] top-[-6px] w-[192px] h-[192px]">
            <div className="w-[150px] h-[150px]">
              <img
                src={award1}
                alt="Award"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Black Divider Line with Logo - positioned immediately after hero */}
      <div className="relative w-full h-[10px] flex items-center justify-end">
        <div
          className="absolute left-0 h-[10px] bg-black"
          style={{ width: "calc(100% - 107px)" }}
        />
        {/* Logo - positioned at far right, center aligned to divider */}
        <div className="flex-shrink-0 w-[130px] h-[130px] flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* SIBA Awards Section */}
      <SibaAwards />

      {/* Spotlight Award Section */}
      <SpotlightAward />

      {/* Managed Office Brand Section */}
      <ManagedOfficeBrand />

      {/* Times Business Awards Section */}
      <TimesBusiness />

      {/* Women Leader Award Section */}
      <WomenLeader />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AwardsAndAchievements;
