import aboutusImg1 from '../../assets/aboutus_intro/aboutus_img1.png';
import aboutusImg2 from '../../assets/aboutus_intro/aboutus_img2.png';
import aboutusImg3 from '../../assets/aboutus_intro/aboutus_img3.png';
import aboutusRing from '../../assets/aboutus_intro/aboutus_ring.png';
import wing1 from '../../assets/aboutus_intro/aboutus_wing1.png';
import wing2 from '../../assets/aboutus_intro/aboutus_wing2.png';
import wing3 from '../../assets/aboutus_intro/aboutus_wing3.png';
import wing4 from '../../assets/aboutus_intro/aboutus_wing4.png';
import { COLORS } from '../../helpers/constants/Colors';

const IntroSection = () => {
  return (
    <section className="relative pt-4 pb-2 lg:pt-6 lg:pb-4 px-4 sm:px-6 lg:px-8 pl-6 sm:pl-10 lg:pl-16 overflow-hidden">

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-start">
          {/* Left Column - Text */}
          <div className="space-y-4 z-10 relative">
            <div>
              <p className="text-xs sm:text-sm font-medium mb-2 tracking-widest" style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textGray600 }}>A BIT</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textGray900 }}>ABOUT US</h1>
            </div>
            
            <p className="font-['Inter:Regular',sans-serif] text-base sm:text-lg leading-relaxed" style={{ color: COLORS.textGray700 }}>
              At iSprout, we're a bunch of dreamers and doers who believe that workspaces should be anything but not boring. 
              We're on a mission to create offices that people actually look forward to come to every day.
            </p>

            <button 
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base lg:text-lg transition-colors"
              style={{ backgroundColor: COLORS.brandBlue, fontFamily: 'Outfit, sans-serif', color: COLORS.textWhite }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.brandBlue}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.brandBlue}
            >
              EXPLORE MORE 
            </button>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 max-w-md lg:max-w-none">
              <div className="relative">
                <img src={wing1} alt="" className="w-full h-auto" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-['Outfit:Bold',sans-serif] text-xl sm:text-2xl lg:text-3xl">8</p>
                  <p className="font-['Inter:Regular',sans-serif] text-xs sm:text-sm lg:text-base">Cities</p>
                </div>
              </div>
              <div className="relative">
                <img src={wing2} alt="" className="w-full h-auto" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-['Outfit:Bold',sans-serif] text-xl sm:text-2xl lg:text-3xl">26</p>
                  <p className="font-['Inter:Regular',sans-serif] text-xs sm:text-sm lg:text-base">Centers</p>
                </div>
              </div>
              <div className="relative">
                <img src={wing3} alt="" className="w-full h-auto" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-['Outfit:Bold',sans-serif] text-xl sm:text-2xl lg:text-3xl">39k+</p>
                  <p className="font-['Inter:Regular',sans-serif] text-xs sm:text-sm lg:text-base">Workstations</p>
                </div>
              </div>
              <div className="relative">
                <img src={wing4} alt="" className="w-full h-auto" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-['Outfit:Bold',sans-serif] text-xl sm:text-2xl lg:text-3xl">2.4Mn</p>
                  <p className="font-['Inter:Regular',sans-serif] text-xs sm:text-sm lg:text-base">Square feet</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="relative h-full flex items-center justify-center min-h-[400px] lg:min-h-[900px]">
            {/* Container for the overlapping images */}
            <div className="relative w-full max-w-[500px] lg:max-w-[700px] h-[500px] sm:h-[600px] lg:h-[900px]">
              {/* Top Left Image - Behind others */}
              <div className="absolute top-0 bottom-2 left-8 sm:left-14 w-[85%] z-10">
                <img 
                  alt="iSprout Office" 
                  className="w-full h-auto rounded-[20px] shadow-xl object-cover" 
                  src={aboutusImg1} 
                />
              </div>

              {/* Middle Right Image - Center layer */}
              <div className="absolute top-[20%] sm:top-[26%] right-[10%] sm:right-[20%] w-[45%] sm:w-[50%] z-20">
                <img 
                  alt="iSprout Team" 
                  className="w-full h-auto rounded-[20px] shadow-xl object-cover" 
                  src={aboutusImg2} 
                />
              </div>

              {/* Bottom Left Image with Badge - Front layer */}
              <div className="absolute bottom-[30%] sm:bottom-[35%] lg:bottom-80 left-[0%] w-[35%] z-30">
                <img 
                  alt="iSprout Workspace" 
                  className="w-full h-auto rounded-[20px] shadow-xl object-cover" 
                  src={aboutusImg3} 
                />
                
                {/* 17k+ Places Badge - Code instead of image */}
                <div className="absolute -bottom-3 sm:-bottom-4 -right-8 sm:-right-10 z-40">
                  <div 
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg"
                    style={{ backgroundColor: COLORS.brandYellow }}
                  >
                    <div className="text-center">
                      <p 
                        className="text-2xl sm:text-3xl font-bold leading-tight"
                        style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textPrimary }}
                      >
                        17k+
                      </p>
                      <p 
                        className="text-base sm:text-lg font-semibold"
                        style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textPrimary }}
                      >
                        Places
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Ring - Bottom right of images */}
                <div className="hidden lg:block absolute bottom-90 -right-0 z-10 opacity-100 pointer-events-none">
                  <svg
                  className="w-48 lg:w-64 h-48 lg:h-64"
                  viewBox="0 0 192 192"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  >
                  <circle cx="96" cy="96" r="72" stroke={COLORS.brandYellow} strokeWidth="22" fill="none" />
                  </svg>
                </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;