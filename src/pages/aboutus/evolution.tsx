import evolution1 from '../../assets/evolution/evolution1.png';
import evolution2 from '../../assets/evolution/evolution2.png';

const Evolution = () => {
  const milestones = [
    {
      year: '2017',
      title: 'iSprout Profound',
      description: 'Where it all began! Our cozy 12,500 sqft launchpad proved that big dreams start in small spaces. This is where we first sprinkled our workspace magic, setting the stage for an incredible journey. Profound by name, and profound by nature – this center kickstarted our mission to revolutionize work life.',
      image: evolution1,
      imageStyle: 'rounded-3xl'
    },
    {
      year: '2018',
      title: 'iSprout Summit',
      description: 'Summit by name, summit by ambition! This 97,996 sqft powerhouse took us to new heights. With stunning views and even more stunning workspaces, Summit proved we were serious about scaling up. It\'s not just an office – it\'s a peak performance zone!',
      image: evolution2,
      imageStyle: 'rounded-3xl',
      imageSize: '264 × 176'
    }
  ];

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl ml-4 sm:ml-6 lg:ml-12 mr-auto">

        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16 relative">
          <div className="inline-block px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-2xl mb-4" style={{ backgroundColor: '#204758' }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white break-words" style={{ fontFamily: 'Outfit, sans-serif' }}>
              The Evolution Of Excellence
            </h2>
          </div>
          <p className="text-base sm:text-lg text-gray-700 mt-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Our Journey Through Time
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-12 sm:space-y-16 md:space-y-24">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-300 hidden md:block" 
               style={{ 
                 backgroundImage: 'linear-gradient(to bottom, #E5E7EB 50%, transparent 50%)',
                 backgroundSize: '1px 20px'
               }}
          />
          {/* Up Arrow Circle at top */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 hidden md:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full" style={{ backgroundColor: '#FFDE00' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6">
              <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="#204758" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {milestones.map((milestone, index) => (
            <div key={index} className="relative px-2 sm:px-4 md:pl-[5%] md:pr-[10%]">
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-400" />
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center max-w-5xl">
                {/* Left side - Year badge */}
                <div className="md:text-right md:pr-8">
                  {/* Year badge */}
                  <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full mb-4 md:ml-auto" style={{ backgroundColor: '#FFDE00' }}>
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                      {milestone.year}
                    </span>
                  </div>
                </div>

                {/* Right side - Image and content */}
                <div className="md:pl-8">
                  <div className="space-y-3 sm:space-y-4">
                    {/* Image */}
                    <div className="relative">
                      <img 
                        src={milestone.image} 
                        alt={milestone.title}
                        className={`w-full max-w-full sm:max-w-md ${milestone.imageStyle} shadow-lg object-cover`}
                      />
                      {milestone.imageSize && (
                        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 px-2 sm:px-3 py-1 rounded bg-blue-500 text-white text-xs font-medium">
                          {milestone.imageSize}
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 break-words" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed break-words" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Down Arrow Circle at bottom */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8 hidden md:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full" style={{ backgroundColor: '#FFDE00' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#204758" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Evolution;
