import smileIcon from '../../../assets/amenities/smileicon.png';
import bgGradient from '../../../assets/amenities/amenities_bg_gradient.png';
import amenityCircle from '../../../assets/amenities/amenities_circle.png';
import internetAccess from '../../../assets/amenities/internet (2).png';
import customSpace from '../../../assets/amenities/customspace.png';
import dailyCleaning from '../../../assets/amenities/dailycleaning.png';
import frontDesk from '../../../assets/amenities/frontdesk.png';
import ambience from '../../../assets/amenities/ambience.png';
import security from '../../../assets/amenities/security (2).png';
import phoneBooth from '../../../assets/amenities/phonebooth.png';
import printers from '../../../assets/amenities/printers.png';
import parking from '../../../assets/amenities/parking.png';
import cafeteria from '../../../assets/amenities/cafeteria.png';

interface Amenity {
  image: string;
  label: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

const amenities: Amenity[] = [
  { image: internetAccess, label: 'Internet Access', position: { top: '5%', left: '2%' } },
  { image: customSpace, label: 'Custom Build Space', position: { top: '35%', left: '15%' } },
  { image: dailyCleaning, label: 'Daily Cleaning', position: { bottom: '5%', left: '2%' } },
  { image: frontDesk, label: 'Front Desk Service', position: { top: '5%', left: '42%' } },
  { image: ambience, label: 'Great Ambience', position: { top: '35%', right: '15%' } },
  { image: security, label: '24/7 Security', position: { bottom: '35%', left: '15%' } },
  { image: phoneBooth, label: 'Phone Booth', position: { bottom: '5%', left: '42%' } },
  { image: printers, label: 'Printer & Scanners', position: { bottom: '5%', right: '15%' } },
  { image: parking, label: 'Parking', position: { top: '5%', right: '2%' } },
  { image: cafeteria, label: 'Cafeteria', position: { bottom: '5%', right: '2%' } },
];

const Amenities: React.FC = () => {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading with Smile Icon */}
        <div className="relative mb-12 sm:mb-16 md:mb-20">
            {/* Absolutely positioned smile icon (moved separately) */}
            <div className="absolute top-2 -left-2 sm:top-4 sm:-left-4 md:top-6 md:-left-6">
                <img
                    src={smileIcon}
                    alt=""
                    className="w-16 h-16 sm:w-14 sm:h-14 md:w-24 md:h-16 ml-100"
                />
            </div>

            {/* Centered heading (iSprout Amenities) */}
            <div className="flex items-center justify-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                    iSprout Amenities
                </h2>
            </div>
        </div>

        {/* Amenities Container with Background Gradient */}
        <div className="relative w-full flex items-center justify-center py-16 sm:py-20 md:py-24">
          {/* Background Gradient */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={bgGradient} 
              alt="" 
              className="w-full h-full max-w-6xl object-contain"
            />
          </div>

          {/* Amenities Cards Grid Layout */}
          <div className="relative w-full max-w-6xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-8">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex justify-center">
                  {/* Amenity Card */}
                  <div className="relative flex flex-col items-center">
                    {/* Card Background */}
                    <div className="relative w-32 sm:w-36 md:w-40 lg:w-44 h-40 sm:h-44 md:h-48 lg:h-52 bg-white rounded-3xl shadow-lg border-2 border-gray-200">
                      
                      {/* Circle with Amenity Image - Positioned inside card at top */}
                      <div className="absolute top-2 sm:top-3 md:top-4 left-1/2 -translate-x-1/2 z-10">
                        <div className="relative">
                          {/* Circle Background */}
                          <img 
                            src={amenityCircle} 
                            alt="" 
                            className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto"
                          />
                          
                          {/* Amenity Image */}
                          <div className="absolute inset-0 flex items-center justify-center p-2">
                            <img 
                              src={amenity.image} 
                              alt={amenity.label} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Label Text */}
                      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-0 right-0 text-center px-2">
                        <p className="text-xs sm:text-sm md:text-base font-medium text-gray-800 leading-tight">
                          {amenity.label}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
