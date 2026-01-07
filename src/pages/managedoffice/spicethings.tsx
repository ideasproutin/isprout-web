import icon1 from '../../assets/spicethings/mo-icon1.png';
import icon2 from '../../assets/spicethings/mo-icon2.png';
import icon3 from '../../assets/spicethings/mo-icon3.png';
import icon4 from '../../assets/spicethings/mo-icon4.png';
import { COLORS } from '../../helpers/constants/Colors';

interface Feature {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  iconBgColor: string;
  titleColor: string;
}

const SpiceThings = () => {
  const features: Feature[] = [
    {
      icon: icon1,
      title: 'Vibe Check Passed',
      description: 'Spaces that spark joy and inspiration.',
      bgColor: '#F3F4F6',
      iconBgColor: '#1F2937',
      titleColor: '#1F2937'
    },
    {
      icon: icon2,
      title: 'Work Your Way',
      description: 'Flexible options for every style and budget.',
      bgColor: '#F3F4F6',
      iconBgColor: '#FFDE00',
      titleColor: '#FFDE00'
    },
    {
      icon: icon3,
      title: 'Connect And Collab',
      description: 'Meet like-minded folks and expand your network.',
      bgColor: '#F3F4F6',
      iconBgColor: '#1F2937',
      titleColor: '#1F2937'
    },
    {
      icon: icon4,
      title: 'Vibe Check Passed',
      description: 'Spaces that spark joy and inspiration.',
      bgColor: '#F3F4F6',
      iconBgColor: '#FFDE00',
      titleColor: '#FFDE00'
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Heading */}
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Cause We're Here To Spice Things Up!
            </h2>
          </div>

          {/* Right Side - Description */}
          <div>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Say goodbye to the boring old office and hello to iSprout's Co-working Spaces - where creativity, 
              collaboration, and community collide! We've got everything you need to unleash your inner genius, 
              whether you're flying solo or part of a dream team.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="rounded-3xl p-6 sm:p-8 flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundColor: feature.bgColor }}
            >
              {/* Icon Circle */}
              <div 
                className="w-20 h-20 sm:w-24 sm:h-24 -mt-4 sm:-mt-18 rounded-full flex items-center justify-center mb-6 mx-auto"
                style={{ backgroundColor: feature.iconBgColor }}
              >
                <img 
                  src={feature.icon} 
                  alt={feature.title}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
              </div>

              {/* Title */}
              <h3 
                className="text-lg sm:text-xl font-bold mb-3 text-center"
                style={{ color: feature.titleColor }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpiceThings;
