import React from 'react';
import { homePageImages } from '../../../assets';
import { COLORS } from '../../../helpers/constants/Colors';
interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

const WhyiSprout: React.FC = () => {
  const features: FeatureCard[] = [
    {
      icon: homePageImages.flexibleSolutions,
      title: 'Flexible Solutions',
      description: 'iSprout adapts to your unique business needs with customizable workspaces.'
    },
    {
      icon: homePageImages.collaborativeEnvironment,
      title: 'Collaborative Environment',
      description: "Foster teamwork and synergy in iSprout's workspaces designed for collaboration."
    },
    {
      icon: homePageImages.primeLocations,
      title: 'Prime Locations',
      description: 'Explore convenient office spaces situated in key areas across major cities.'
    },
    {
      icon: homePageImages.tailoredServices,
      title: 'Tailored Services',
      description: 'Experience personalized support and services that cater to your specific requirements.'
    }
  ];

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-linear-to-b from-yellow-50 via-white to-yellow-50" style={{ fontFamily: 'Outfit, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex justify-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center max-w-5xl px-4">
            Why <span style={{ fontFamily: 'Otomanopee One, sans-serif', color: '#FFDE00' }}>iSprout</span>? Because You Deserve a Space That Inspires.
          </h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative">
              {/* Card with CSS background */}
              <div className="relative h-full rounded-3xl shadow-lg border-2 border-gray-200" style={{ backgroundColor: COLORS.white }}>
                <div className="relative pt-8 px-6 pb-6 sm:pt-10 sm:px-8 sm:pb-8 flex flex-col items-center text-center h-full">
                  {/* Icon with circle background */}
                  <div className="relative mb-4 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                    <svg 
                      className="absolute inset-0 w-full h-full" 
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="50" cy="50" r="48" fill="#FFDE00" />
                    </svg>
                    <img 
                      src={feature.icon} 
                      alt={feature.title}
                      className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 whitespace-nowrap" style={{ color: COLORS.textBlack }}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Number overlay at bottom */}
              <div className="absolute -bottom-12 left-4 transform -translate-x-1/2 z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
                  <span 
                    className="text-5xl sm:text-6xl md:text-7xl font-bold"
                    style={{ 
                      color: '#FFDE00',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                      fontFamily: 'Outfit, sans-serif'
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Extra spacing for numbers */}
        <div className="h-12 sm:h-16"></div>
      </div>
    </section>
  );
};

export default WhyiSprout;
