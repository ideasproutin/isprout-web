import dellBg from '../../../assets/spotlight/dell_bg.png';
import dellLogo from '../../../assets/spotlight/spotlight_dell.png';
import adobeLogo from '../../../assets/spotlight/spotlight_adobe.png';
import greyArrow1 from '../../../assets/spotlight/greyarrow1.png';
import greyArrow2 from '../../../assets/spotlight/greyarrow2.png';

const Spotlight = () => {
const spotlights = [
    {
        logoBg: dellBg,
        logo: dellLogo,
        title: 'Dell — Growing stronger with flexible workspace solutions powered by iSprout.',
    },
    {
        logoBg: dellBg,
        logo: adobeLogo,
        title: 'Adobe — Scaling creative teams efficiently through iSprout\'s modern workspace solutions.',
    },
];

// inject a small style once in the browser to nudge the logos slightly left
if (typeof window !== 'undefined' && !document.getElementById('spotlight-logo-shift')) {
    const style = document.createElement('style');
    style.id = 'spotlight-logo-shift';
    style.innerHTML = `
        .spotlight-logo-shift {
            transform: translateX(-12px) !important;
            will-change: transform;
        }
    `;
    document.head.appendChild(style);

    const markLogoImages = () => {
        const imgs = Array.from(document.getElementsByTagName('img'));
        imgs.forEach(img => {
            const src = img.src || '';
            // match bundled URLs that include the original filenames
            if (src.includes('dell_bg') || src.includes('spotlight_dell') || src.includes('spotlight_adobe')) {
                img.classList.add('spotlight-logo-shift');
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', markLogoImages, { once: true });
    } else {
        markLogoImages();
    }
}

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8" style={{ backgroundColor: '#204758' }}>
      <div className="relative max-w-7xl mx-auto">
        {/* Heading with Background */}
        <div className="flex justify-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block px-8 py-4 rounded-lg" style={{ backgroundColor: '#FFDE00' }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              In the Spotlight
            </h2>
          </div>
        </div>

        {/* Spotlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 max-w-5xl mx-auto">
          {spotlights.map((spotlight, index) => (
            <div key={index} className="relative">
              {/* Card Background */}
              <div className="relative bg-linear-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl min-h-[400px] sm:min-h-[450px] md:min-h-[500px]">

                {/* Card Content Overlay */}
                <div className="relative p-6 sm:p-8 md:p-10 flex flex-col h-full">
                  {/* Top Section with Logo */}
                <div className="relative mb-6 -mt-8 sm:-mt-10 md:-mt-12 -ml-4 sm:-ml-5 md:-ml-6">
                    {/* Logo with Background */}
                    <div className="relative inline-block">
                        <img 
                            src={spotlight.logoBg} 
                            alt="" 
                            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
                        />
                        <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-6 md:p-7 lg:p-8">
                            <img 
                                src={spotlight.logo} 
                                alt="" 
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Grey Arrow 1 (moved a little more to the right) */}
                    <img 
                        src={greyArrow1} 
                        alt="" 
                        className="absolute -right-10 -top-6 sm:-right-12 sm:-top-8 md:-right-14 md:-top-10 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                    />
                </div>

                  {/* Title Text */}
                  <div className="grow flex items-center mb-6">
                    <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed">
                      {spotlight.title}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-end justify-between">
                    {/* Read More Button */}
                    <button 
                      className="px-6 py-3 text-gray-900 font-semibold rounded-full transition-colors text-sm sm:text-base"
                      style={{ backgroundColor: '#FFDE00' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFD000'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFDE00'}
                    >
                      Read more →
                    </button>

                    {/* Grey Arrow 2 (Bottom Right) */}
                    <img 
                      src={greyArrow2} 
                      alt="" 
                      className="absolute -right-2 -bottom-6 sm:-right-6 sm:-bottom-8 md:-right-8 md:-bottom-10 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Spotlight;
