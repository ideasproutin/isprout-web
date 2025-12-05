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
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 relative">
          <div className="inline-block px-8 py-4 rounded-2xl mb-4" style={{ backgroundColor: '#204758' }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              The Evolution Of Excellence
            </h2>
          </div>
          <p className="text-lg text-gray-700 mt-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Our Journey Through Time
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-16 md:space-y-24">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-300 hidden md:block" 
               style={{ 
                 backgroundImage: 'linear-gradient(to bottom, #E5E7EB 50%, transparent 50%)',
                 backgroundSize: '1px 20px'
               }}
          />
          {/* Up Arrow Circle at top */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 hidden md:flex items-center justify-center w-12 h-12 rounded-full" style={{ backgroundColor: '#FFDE00' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="#204758" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {milestones.map((milestone, index) => (
            <div key={index} className="relative" style={{ paddingLeft: '5%', paddingRight: '10%' }}>
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                <div className="w-4 h-4 rounded-full bg-gray-400" />
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl">
                {/* Left side - Year badge */}
                <div className="md:text-right md:pr-8">
                  {/* Year badge */}
                  <div className="inline-block px-6 py-2 rounded-full mb-4 md:ml-auto" style={{ backgroundColor: '#FFDE00' }}>
                    <span className="text-xl sm:text-2xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                      {milestone.year}
                    </span>
                  </div>
                </div>

                {/* Right side - Image and content */}
                <div className="md:pl-8">
                  <div className="space-y-4">
                    {/* Image */}
                    <div className="relative">
                      <img 
                        src={milestone.image} 
                        alt={milestone.title}
                        className={`w-full max-w-md ${milestone.imageStyle} shadow-lg`}
                      />
                      {milestone.imageSize && (
                        <div className="absolute bottom-4 right-4 px-3 py-1 rounded bg-blue-500 text-white text-xs font-medium">
                          {milestone.imageSize}
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Down Arrow Circle at bottom */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8 hidden md:flex items-center justify-center w-12 h-12 rounded-full" style={{ backgroundColor: '#FFDE00' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#204758" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Evolution;
