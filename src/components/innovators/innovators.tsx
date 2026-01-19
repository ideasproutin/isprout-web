import React from 'react';
import { homePageImages } from '../../assets';
import { COLORS } from '../../helpers/constants/Colors';

const Innovators: React.FC = () => {
  // ✅ FLATTENED DATA (NO ROWS)
  const companies = [
    { logo: homePageImages.adobe, name: 'Adobe' },
    { logo: homePageImages.indeed, name: 'Indeed' },
    { logo: homePageImages.phonepe, name: 'PhonePe' },
    { logo: homePageImages.sony, name: 'Sony' },
    { logo: homePageImages.hitachi, name: 'Hitachi' },

    { logo: homePageImages.lenskart, name: 'Lenskart' },
    { logo: homePageImages.deliveroo, name: 'Deliveroo' },
    { logo: homePageImages.bosch, name: 'Bosch' },
    { logo: homePageImages.drReddys, name: "Dr. Reddy's" },
    { logo: homePageImages.vi, name: 'Vi' },

    { logo: homePageImages.dellLogo, name: 'Dell' },
    { logo: homePageImages.hyundai, name: 'Hyundai Transys' },
    { logo: homePageImages.arcelorMittal, name: 'ArcelorMittal' },
    { logo: homePageImages.cars24, name: 'Cars24' },
    { logo: homePageImages.siemens, name: 'Siemens' },
  ];

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 bg-gray-50"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {/* ✅ SINGLE SOURCE OF HORIZONTAL ALIGNMENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 text-center">
          <div
            className="inline-block px-8 py-4 mb-6 rounded-lg shadow-lg"
            style={{ backgroundColor: '#00275c' }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              <span className="text-yellow-400">iSprout</span> Hall of Innovators
            </h2>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Empowering Fortune 450+ giants and leading GCCs through world-class
            workspace solutions.
          </p>
        </div>

        {/* Divider with Arrow */}
        <div className="mb-12">
          <div className="relative w-full h-12 flex items-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-1 bg-linear-to-r from-gray-300 via-gray-400 to-gray-300 rounded-full" />
            </div>

            <img
              src={homePageImages.yellowArrow}
              alt="Arrow"
              className="relative z-10 w-16 sm:w-20 md:w-24 h-auto"
            />
          </div>
        </div>

        {/* ✅ SINGLE RESPONSIVE GRID (NO GAPS EVER) */}
        <div className="bg-gray-50 rounded-3xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {companies.map((company, index) => (
              <div
                key={index}
                className="rounded-xl border bg-white"
                style={{ borderColor: '#e5e7eb' }}
              >
                <div className="p-4 sm:p-6 flex items-center justify-center min-h-[120px]">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-h-14 sm:max-h-16 md:max-h-20 w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Innovators;
