import React from 'react';

const MissionAndVision = () => {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#204758' }}>
      {/* Decorative circles */}
      <div 
        className="absolute top-4 right-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full"
        style={{ backgroundColor: '#FFDE00' }}
      />
      <div 
        className="absolute bottom-4 left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full"
        style={{ backgroundColor: '#FFDE00' }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission Card */}
          <div className="relative">
            {/* Yellow base card */}
            <div 
              className="absolute inset-0 rounded-3xl transform translate-y-4"
              style={{ backgroundColor: '#FFDE00' }}
            />
            
            {/* White content card */}
            <div className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-lg">
              {/* Yellow arrow pointer */}
              <div 
                className="absolute -top-6 right-8 w-16 h-12"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 50%, 70% 50%, 50% 100%, 30% 50%, 0 50%)',
                  backgroundColor: '#FFDE00'
                }}
              />

              <div className="space-y-4">
                <h3 
                  className="text-2xl sm:text-3xl font-bold text-center"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  MISSION
                </h3>
                
                {/* Target icon */}
                <div className="flex justify-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="22" stroke="#204758" strokeWidth="2" fill="none"/>
                    <circle cx="24" cy="24" r="16" stroke="#204758" strokeWidth="2" fill="none"/>
                    <circle cx="24" cy="24" r="10" stroke="#204758" strokeWidth="2" fill="none"/>
                    <circle cx="24" cy="24" r="4" fill="#204758"/>
                  </svg>
                </div>

                <p 
                  className="text-sm sm:text-base text-center text-gray-800 leading-relaxed"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Our mission is simple, to create workspaces that inspire, energize, and empower. We believe that when you love where you work, amazing things happen.
                </p>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="relative">
            {/* Yellow base card */}
            <div 
              className="absolute inset-0 rounded-3xl transform translate-y-4"
              style={{ backgroundColor: '#FFDE00' }}
            />
            
            {/* White content card */}
            <div className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-lg">
              {/* Yellow arrow pointer */}
              <div 
                className="absolute -top-6 right-8 w-16 h-12"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 50%, 70% 50%, 50% 100%, 30% 50%, 0 50%)',
                  backgroundColor: '#FFDE00'
                }}
              />

              <div className="space-y-4">
                <h3 
                  className="text-2xl sm:text-3xl font-bold text-center"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  VISION
                </h3>
                
                {/* Lightbulb icon */}
                <div className="flex justify-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 6C18.477 6 14 10.477 14 16C14 19.5 15.5 22.6 18 24.5V30C18 31.1 18.9 32 20 32H28C29.1 32 30 31.1 30 30V24.5C32.5 22.6 34 19.5 34 16C34 10.477 29.523 6 24 6Z" stroke="#204758" strokeWidth="2" fill="none"/>
                    <path d="M20 35H28" stroke="#204758" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M22 38H26" stroke="#204758" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M24 6V2" stroke="#204758" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M38 16H42" stroke="#204758" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M6 16H10" stroke="#204758" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M35 9L38 6" stroke="#204758" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M10 6L13 9" stroke="#204758" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>

                <p 
                  className="text-sm sm:text-base text-center text-gray-800 leading-relaxed"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Our vision is to be the go-to partner for businesses that want to take their workspace game to the next level. We dream of a future where offices are more than just places to work - they're hubs of creativity, collaboration, and community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
