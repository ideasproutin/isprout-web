import { Wand2, Workflow, Package, BarChart3 } from 'lucide-react';
import { COLORS } from '../../helpers/constants/Colors';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  bgColor: string;
  iconBgColor: string;
  titleColor: string;
}

const SpiceThings = () => {
  const features: Feature[] = [
    {
      icon: Wand2,
      title: 'Seamless Setup',
      description: 'Ready-to-use workspaces from day one. ',
      bgColor: '#F3F4F6',
      iconBgColor: '#00275c',
      titleColor: '#1F2937',
    },
    {
      icon: Workflow,
      title: 'Smooth Operations',
      description: ' We handle maintenance and daily support.',
      bgColor: '#F3F4F6',
      iconBgColor: '#FFDE00',
      titleColor: '#FFDE00',
    },
    {
      icon: Package,
      title: 'All-Inclusive Services',
      description: ' IT, security, and housekeeping covered.',
      bgColor: '#F3F4F6',
      iconBgColor: '#00275c',
      titleColor: '#1F2937',
    },
    {
      icon: BarChart3,
      title: 'Focus on Growth',
      description: ' You grow, we manage the rest.',
      bgColor: '#F3F4F6',
      iconBgColor: '#FFDE00',
      titleColor: '#FFDE00',
    },
  ];

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8"
      style={{ backgroundColor: COLORS.white }}
    >
      <div className="max-w-7xl mx-auto">
        {/* TOP CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Heading */}
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Because Work Should Feel Effortless 
            </h2>
          </div>

          {/* Description */}
          <div>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              We take care of the infrastructure, operations, and services so your team can focus on what matters most, getting work done and growing the business. 
            </p>
          </div>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="relative rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300 min-h-[260px]"
                style={{ backgroundColor: feature.bgColor }}
              >
                {/* ICON */}
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: feature.iconBgColor }}
                >
                  <IconComponent 
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.iconBgColor === '#FFDE00' ? 'text-[#00275c]' : 'text-white'}`}
                  />
                </div>

                {/* TITLE */}
                <h3
                  className="text-lg sm:text-xl font-bold mb-3"
                  style={{ color: feature.titleColor }}
                >
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpiceThings;
