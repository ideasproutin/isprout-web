import headingBg from '../../../assets/awards/awards_h1_bg.png';
import headingText from '../../../assets/awards/Awards That Define Us.png';
import bg1 from '../../../assets/awards/bg1.png';
import bg2 from '../../../assets/awards/bg2.png';
import bg3 from '../../../assets/awards/bg3.png';
import award1 from '../../../assets/awards/award1.png';
import award2 from '../../../assets/awards/award2.png';
import award3 from '../../../assets/awards/award3.png';
import award4 from '../../../assets/awards/award4.png';
import award5 from '../../../assets/awards/award5.png';

const Awards = () => {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading with Background */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="relative inline-block">
            <img 
              src={headingBg} 
              alt="" 
              className="w-auto h-14 sm:h-18 md:h-22 lg:h-22"
            />
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <img 
                src={headingText} 
                alt="Awards That Define Us" 
                className="h-6 sm:h-8 md:h-10 lg:h-8 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Subheading Text */}
        <p className="text-center text-sm sm:text-base md:text-lg text-gray-700 mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto px-4">
          From workspace design to service excellence, our awards highlight the standards we strive for and the values we stand by.
        </p>

        {/* Awards Display - Honeycomb Pattern */}
        <div className="relative max-w-5xl mx-auto min-h-[600px] sm:min-h-[700px] md:min-h-[800px]">
          {/* Background Images Layer */}
          <div className="absolute inset-0 z-0">
            {/* BG1 - Left */}
            <img 
              src={bg1} 
              alt="" 
              className="absolute top-[15%] left-[5%] w-56 sm:w-64 md:w-72 lg:w-80 h-auto"
            />
            {/* BG2 - Center */}
            <img 
              src={bg2} 
              alt="" 
              className="absolute top-[25%] left-1/2 -translate-x-1/2 w-64 sm:w-72 md:w-80 lg:w-96 h-auto"
            />
            {/* BG3 - Right */}
            <img 
              src={bg3} 
              alt="" 
              className="absolute top-[15%] right-[5%] w-56 sm:w-64 md:w-72 lg:w-80 h-auto"
            />
          </div>

          {/* Awards Layer - Positioned over backgrounds */}
          <div className="relative z-10 min-h-[600px] sm:min-h-[700px] md:min-h-[800px]">
            {/* Top Row - 3 Awards */}
            <div className="absolute top-0 left-0 right-0 flex justify-center items-start gap-4 sm:gap-6 md:gap-8">
              {/* Award 1 - Top Left */}
              <div className="relative translate-y-0">
                <img 
                  src={award1} 
                  alt="Award 1" 
                  className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto"
                />
              </div>
              
              {/* Award 2 - Top Center */}
              <div className="relative translate-y-0">
                <img 
                  src={award2} 
                  alt="Award 2" 
                  className="w-36 sm:w-44 md:w-52 lg:w-60 h-auto"
                />
              </div>
              
              {/* Award 3 - Top Right */}
              <div className="relative translate-y-0">
                <img 
                  src={award3} 
                  alt="Award 3" 
                  className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto"
                />
              </div>
            </div>

            {/* Bottom Row - 2 Awards */}
            <div className="absolute bottom-40 sm:bottom-48 md:bottom-56 lg:bottom-64 left-0 right-0 flex justify-center items-end gap-8 sm:gap-12 md:gap-16 lg:gap-20">
              {/* Award 4 - Bottom Left */}
              <div className="relative translate-y-0">
                <img 
                  src={award4} 
                  alt="Award 4" 
                  className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto"
                />
              </div>
              
              {/* Award 5 - Bottom Right */}
              <div className="relative translate-y-0">
                <img 
                  src={award5} 
                  alt="Award 5" 
                  className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
