import { homePageImages } from '../../../assets';

const svgPaths = {
  p1e772e00: "M6 60C6 27.7142 32.1766 1.53778 64.4624 1.53778C96.7482 1.53778 122.925 27.7142 122.925 60C122.925 92.2858 96.7482 118.462 64.4624 118.462C32.1766 118.462 6 92.2858 6 60Z",
  pd2f1d00: "M618.055 60.8572C826.915 60.8572 996.109 230.051 996.109 438.911C996.109 647.771 826.915 816.965 618.055 816.965C409.195 816.965 240.001 647.771 240.001 438.911C240.001 230.051 409.195 60.8572 618.055 60.8572Z",
  p15767200: "M0 10C0 4.47715 4.47715 0 10 0H86C91.5228 0 96 4.47715 96 10V66C96 71.5228 91.5228 76 86 76H10C4.47715 76 0 71.5228 0 66V10Z",
  pe493280: "M48 38L20 58V18L48 38Z"
};

interface AmenityCardProps {
  image: string;
  label: string;
}

function AmenityCard({ image, label }: AmenityCardProps) {
  return (
    <div className="bg-white border-2 border-[#c4c4c4] rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-4 flex flex-col items-center justify-center w-full h-[185px] overflow-visible">
      <div className="relative w-[120px] h-[120px] mb-3 flex items-center justify-center">
        <svg
          className="w-full h-full"
          fill="none"
          viewBox="0 0 130 130"
        >
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="130"
              id={`filter-${label}`}
              width="130"
              x="0"
              y="0"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="3" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
              <feBlend in2="shape" mode="normal" result="effect1_innerShadow" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="-4" />
              <feGaussianBlur stdDeviation="3" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="effect1_innerShadow" mode="normal" result="effect2_innerShadow" />
            </filter>
          </defs>
          <g filter={`url(#filter-${label})`}>
            <circle cx="65" cy="65" r="58" fill="#F2C94C" />
          </g>
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85px] h-[85px] flex items-center justify-center">
          <img alt={label} className="w-full h-full object-contain" src={image} />
        </div>
      </div>
      <p className="text-[14px] text-[rgba(0,0,0,0.83)] text-center leading-tight">{label}</p>
    </div>
  );
}

export default function Amenities() {
  const amenities = [
    { image: homePageImages.internet, label: "Internet Access" },
    { image: homePageImages.customspace, label: "Custom Build Space" },
    { image: homePageImages.frontdesk, label: "Front Desk Service" },
    { image: homePageImages.ambience, label: "Great Ambience" },
    { image: homePageImages.parking, label: "Parking" },
    { image: homePageImages.dailycleaning, label: "Daily Cleaning" },
    { image: homePageImages.security, label: "24/7 Security" },
    { image: homePageImages.phonebooth, label: "Phone Booth" },
    { image: homePageImages.printers, label: "Printer & Scanners" },
    { image: homePageImages.cafeteria, label: "Cafeteria" },
  ];

  return (
    <div className="relative w-full py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      {/* Background gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] pointer-events-none opacity-70">
        <svg
          className="w-full h-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1236 1048"
        >
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="1047.71"
              id="filter0_f"
              width="1235.69"
              x="0"
              y="0"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="140.5" />
            </filter>
          </defs>
          <g filter="url(#filter0_f)" opacity="0.7">
            <path d={svgPaths.pd2f1d00} fill="#FFDE00" />
          </g>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-12 md:mb-16 lg:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl">
            <span className="text-[#ffde00]">iSprout</span>
            <span className="text-black"> Amenities</span>
          </h1>
        </div>

        {/* 5-column wave pattern grid */}
        <div className="hidden xl:grid xl:grid-cols-5 gap-6 max-w-[1200px] mx-auto px-8">
          {/* Column 1 - Top aligned */}
          <div className="flex flex-col gap-8">
            <AmenityCard image={amenities[0].image} label={amenities[0].label} />
            <AmenityCard image={amenities[5].image} label={amenities[5].label} />
          </div>

          {/* Column 2 - Offset down */}
          <div className="flex flex-col gap-8 mt-24">
            <AmenityCard image={amenities[1].image} label={amenities[1].label} />
            <AmenityCard image={amenities[6].image} label={amenities[6].label} />
          </div>

          {/* Column 3 - Top aligned */}
          <div className="flex flex-col gap-8">
            <AmenityCard image={amenities[2].image} label={amenities[2].label} />
            <AmenityCard image={amenities[7].image} label={amenities[7].label} />
          </div>

          {/* Column 4 - Offset down */}
          <div className="flex flex-col gap-8 mt-24">
            <AmenityCard image={amenities[3].image} label={amenities[3].label} />
            <AmenityCard image={amenities[8].image} label={amenities[8].label} />
          </div>

          {/* Column 5 - Top aligned */}
          <div className="flex flex-col gap-8">
            <AmenityCard image={amenities[4].image} label={amenities[4].label} />
            <AmenityCard image={amenities[9].image} label={amenities[9].label} />
          </div>
        </div>

        {/* Responsive grid for smaller screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:hidden gap-6 lg:gap-8">
          {amenities.map((amenity, index) => (
            <AmenityCard key={index} image={amenity.image} label={amenity.label} />
          ))}
        </div>
      </div>
    </div>
  );
}
