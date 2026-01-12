import React from 'react';

import { homePageImages } from '../../assets';
import { COLORS } from '../../helpers/constants/Colors';

const Innovators: React.FC = () => {
  const companies = [
    // Row 1
    [
      { logo: homePageImages.adobe, name: 'Adobe' },
      { logo: homePageImages.indeed, name: 'Indeed' },
      { logo: homePageImages.phonepe, name: 'PhonePe' },
      { logo: homePageImages.sony, name: 'Sony' },
      { logo: homePageImages.hitachi, name: 'Hitachi' }
    ],
    // Row 2
    [
      { logo: homePageImages.lenskart, name: 'Lenskart' },
      { logo: homePageImages.deliveroo, name: 'Deliveroo' },
      { logo: homePageImages.bosch, name: 'Bosch' },
      { logo: homePageImages.drReddys, name: "Dr. Reddy's" },
      { logo: homePageImages.vi, name: 'Vi' }
    ],
    // Row 3
    [
      { logo: homePageImages.dellLogo, name: 'Dell' },
      { logo: homePageImages.hyundai, name: 'Hyundai Transys' },
      { logo: homePageImages.arcelorMittal, name: 'ArcelorMittal' },
      { logo: homePageImages.cars24, name: 'Cars24' },
      { logo: homePageImages.siemens, name: 'Siemens' }
    ]
  ];

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gray-50" style={{ fontFamily: 'Outfit, sans-serif' }}>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 text-center">
        {/* Title Badge */}
        <div className="inline-block px-8 py-4 mb-6 rounded-lg shadow-lg" style={{ backgroundColor: '#00275c' }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            <span className="text-yellow-400">iSprout</span> Hall of Innovators
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Empowering Fortune 450+ giants and leading GCCs through world-class workspace solutions.
        </p>
      </div>

      {/* Rectangle line with Arrow */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="relative w-full h-12 flex items-center">
          {/* Rectangle line background */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-1 bg-linear-to-r from-gray-300 via-gray-400 to-gray-300 rounded-full"></div>
          </div>
          
          {/* Yellow Arrow positioned on the line */}
          <img 
            src={homePageImages.yellowArrow} 
            alt="Arrow" 
            className="relative z-10 w-16 sm:w-20 md:w-24 h-auto"
          />
        </div>
      </div>

      {/* Companies Grid */}
      <div className="max-w-7xl mx-auto mt-8 p-6 sm:p-8 md:p-10 bg-gray-50 rounded-3xl">
        <div className="space-y-6">
          {companies.map((row, rowIndex) => (
            <div 
              key={rowIndex}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6"
            >
              {row.map((company, companyIndex) => (
                <div 
                  key={companyIndex}
                  className="relative rounded-xl overflow-hidden" style={{ backgroundColor: COLORS.white, borderColor: '#e5e7eb' }}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Innovators;
