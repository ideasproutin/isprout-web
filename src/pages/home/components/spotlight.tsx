import spotlightBg from '../../../assets/spotlight/spotlight_bg.png';
import headingBg from '../../../assets/spotlight/spotlight_h1_bg.png';
import spotlightCard from '../../../assets/spotlight/spotlightcard.png';
import dellBg from '../../../assets/spotlight/dell_bg.png';
import dellLogo from '../../../assets/spotlight/spotlight_dell.png';
import adobeLogo from '../../../assets/spotlight/spotlight_adobe.png';
import greyArrow1 from '../../../assets/spotlight/greyarrow1.png';
import greyArrow2 from '../../../assets/spotlight/greyarrow2.png';
import readMoreBg from '../../../assets/spotlight/readmorebg.png';
import readMoreText from '../../../assets/spotlight/Read more →.png';

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
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={spotlightBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading with Background */}
        <div className="flex justify-center mb-12 sm:mb-16 md:mb-20">
          <div className="relative inline-block">
            <img 
              src={headingBg} 
              alt="" 
              className="w-auto h-16 sm:h-20 md:h-24 lg:h-28"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                In the Spotlight
              </h2>
            </div>
          </div>
        </div>

        {/* Spotlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 max-w-5xl mx-auto">
          {spotlights.map((spotlight, index) => (
            <div key={index} className="relative">
              {/* Card Background */}
              <div className="relative">
                <img 
                  src={spotlightCard} 
                  alt="" 
                  className="w-full h-auto"
                />

                {/* Card Content Overlay */}
                <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col">
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
                  <div className="flex-grow flex items-center mb-6">
                    <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed">
                      {spotlight.title}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-end justify-between">
                    {/* Read More Button */}
                    <div className="relative">
                      <img 
                        src={readMoreBg} 
                        alt="" 
                        className="w-32 h-auto sm:w-36 md:w-40"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                          src={readMoreText} 
                          alt="Read more" 
                          className="w-24 h-auto sm:w-28 md:w-32"
                        />
                      </div>
                    </div>

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
