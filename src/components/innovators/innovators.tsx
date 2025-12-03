import React from 'react';
import adobeLogo from '../../assets/innovators/Adobe.png';
import indeedLogo from '../../assets/innovators/indeed.png';
import phonepeLogo from '../../assets/innovators/Phonepe.png';
import sonyLogo from '../../assets/innovators/Sony.png';
import hitachiLogo from '../../assets/innovators/Hitachi.png';
import lenskartLogo from '../../assets/innovators/Lenskart.png';
import deliverooLogo from '../../assets/innovators/Deliveroo.png';
import boschLogo from '../../assets/innovators/Bosch.png';
import drReddysLogo from '../../assets/innovators/Dr.Reddys.png';
import viLogo from '../../assets/innovators/Vi.png';
import dellLogo from '../../assets/innovators/Dell.png';
import hyundaiLogo from '../../assets/innovators/Hyundai.png';
import arcelorMittalLogo from '../../assets/innovators/Arcelor Mittal.png';
import cars24Logo from '../../assets/innovators/Cars24.png';
import siemensLogo from '../../assets/innovators/Siemens.png';
import yellowArrow from '../../assets/innovators/yellow arrow.png';
import rectangleBg from '../../assets/innovators/Rectangle 763.png';
import rectangleContainer from '../../assets/innovators/Rectangle.png';
import companyOutline from '../../assets/innovators/companyoutline.png';

const Innovators: React.FC = () => {
  const companies = [
    // Row 1
    [
      { logo: adobeLogo, name: 'Adobe' },
      { logo: indeedLogo, name: 'Indeed' },
      { logo: phonepeLogo, name: 'PhonePe' },
      { logo: sonyLogo, name: 'Sony' },
      { logo: hitachiLogo, name: 'Hitachi' }
    ],
    // Row 2
    [
      { logo: lenskartLogo, name: 'Lenskart' },
      { logo: deliverooLogo, name: 'Deliveroo' },
      { logo: boschLogo, name: 'Bosch' },
      { logo: drReddysLogo, name: "Dr. Reddy's" },
      { logo: viLogo, name: 'Vi' }
    ],
    // Row 3
    [
      { logo: dellLogo, name: 'Dell' },
      { logo: hyundaiLogo, name: 'Hyundai Transys' },
      { logo: arcelorMittalLogo, name: 'ArcelorMittal' },
      { logo: cars24Logo, name: 'Cars24' },
      { logo: siemensLogo, name: 'Siemens' }
    ]
  ];

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gray-50">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 text-center">
        {/* Title Badge */}
        <div 
          className="inline-block px-8 py-4 mb-6 rounded-lg"
          style={{ 
            backgroundImage: `url(${rectangleBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
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
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${rectangleContainer})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          
          {/* Yellow Arrow positioned on the line */}
          <img 
            src={yellowArrow} 
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
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    backgroundImage: `url(${companyOutline})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
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
