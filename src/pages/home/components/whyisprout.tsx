import React from 'react';
import headingImage from '../../../assets/whyisprout/Why iSprout_ Because You Deserve a Space That Inspires..png';
import flexibleIcon from '../../../assets/whyisprout/flexible_solutions.png';
import collaborativeIcon from '../../../assets/whyisprout/collaborative_environment.png';
import primeIcon from '../../../assets/whyisprout/prime_locations.png';
import tailoredIcon from '../../../assets/whyisprout/tailored_services.png';
import cardBg from '../../../assets/whyisprout/whyisp_card.png';
import circle from '../../../assets/whyisprout/whyisp_circle.png';
import number1 from '../../../assets/whyisprout/whyisp_1.png';
import number2 from '../../../assets/whyisprout/whyisp_2.png';
import number3 from '../../../assets/whyisprout/whyisp_3.png';
import number4 from '../../../assets/whyisprout/whyisp_4.png';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  number: string;
}

const WhyiSprout: React.FC = () => {
  const features: FeatureCard[] = [
    {
      icon: flexibleIcon,
      title: 'Flexible Solutions',
      description: 'iSprout adapts to your unique business needs with customizable workspaces.',
      number: number1
    },
    {
      icon: collaborativeIcon,
      title: 'Collaborative Environment',
      description: "Foster teamwork and synergy in iSprout's workspaces designed for collaboration.",
      number: number2
    },
    {
      icon: primeIcon,
      title: 'Prime Locations',
      description: 'Explore convenient office spaces situated in key areas across major cities.',
      number: number3
    },
    {
      icon: tailoredIcon,
      title: 'Tailored Services',
      description: 'Experience personalized support and services that cater to your specific requirements.',
      number: number4
    }
  ];

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-b from-yellow-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex justify-center mb-12 sm:mb-16 md:mb-20">
          <img 
            src={headingImage} 
            alt="Why iSprout? Because You Deserve a Space That Inspires." 
            className="max-w-full h-auto w-full sm:w-4/5 md:w-3/4 lg:w-2/3"
          />
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative">
              {/* Card with background image */}
              <div className="relative h-full">
                <img 
                  src={cardBg} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-fill"
                />
                <div className="relative pt-8 px-6 pb-6 sm:pt-10 sm:px-8 sm:pb-8 flex flex-col items-center text-center h-full">
                  {/* Icon with circle background */}
                  <div className="relative mb-4 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                    <img 
                      src={circle} 
                      alt="" 
                      className="absolute inset-0 w-full h-full"
                    />
                    <img 
                      src={feature.icon} 
                      alt={feature.title}
                      className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-black whitespace-nowrap">
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
                <img 
                  src={feature.number} 
                  alt={`0${index + 1}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                />
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
