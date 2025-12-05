import aboutusImg1 from '../../assets/aboutus_intro/aboutus_img1.png';
import aboutusImg2 from '../../assets/aboutus_intro/aboutus_img2.png';
import aboutusImg3 from '../../assets/aboutus_intro/aboutus_img3.png';
import aboutusRing from '../../assets/aboutus_intro/aboutus_ring.png';
import wing1 from '../../assets/aboutus_intro/aboutus_wing1.png';
import wing2 from '../../assets/aboutus_intro/aboutus_wing2.png';
import wing3 from '../../assets/aboutus_intro/aboutus_wing3.png';
import wing4 from '../../assets/aboutus_intro/aboutus_wing4.png';
import places17kBg from '../../assets/aboutus_intro/17kplaces_bg.png';
import places17kText from '../../assets/aboutus_intro/17k+text.png';
import placesText from '../../assets/aboutus_intro/Places text.png';

const IntroSection = () => {
  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2 tracking-widest" style={{ fontFamily: 'Outfit, sans-serif' }}>A BIT</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>ABOUT US</h1>
            </div>
            
            <p className="font-['Inter:Regular',sans-serif] text-base sm:text-lg leading-[29px] text-gray-700">
              At iSprout, we're a bunch of dreamers and doers who believe that workspaces should be anything but not boring. 
              We're on a mission to create offices that people actually look forward to come to every day.
            </p>

            <button 
              className="px-8 py-4 rounded-full font-semibold text-base sm:text-lg transition-colors"
              style={{ backgroundColor: '#FFDE00', fontFamily: 'Outfit, sans-serif', color: '#000000' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFD000'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFDE00'}
            >
              Explore More →
            </button>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="relative">
                <img src={wing1} alt="" className="w-full h-auto" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-['Outfit:Bold',sans-serif] text-2xl sm:text-3xl">8</p>
                  <p className="font-['Inter:Regular',sans-serif] text-sm sm:text-base">Cities</p>
                </div>
              </div>
              <div className="relative">
                <img src={wing2} alt="" className="w-full h-auto" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-['Outfit:Bold',sans-serif] text-2xl sm:text-3xl">26</p>
                  <p className="font-['Inter:Regular',sans-serif] text-sm sm:text-base">Centers</p>
                </div>
              </div>
              <div className="relative">
                <img src={wing3} alt="" className="w-full h-auto" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-['Outfit:Bold',sans-serif] text-2xl sm:text-3xl">39k+</p>
                  <p className="font-['Inter:Regular',sans-serif] text-sm sm:text-base">Workstations</p>
                </div>
              </div>
              <div className="relative">
                <img src={wing4} alt="" className="w-full h-auto" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-['Outfit:Bold',sans-serif] text-2xl sm:text-3xl">2.4Mn</p>
                  <p className="font-['Inter:Regular',sans-serif] text-sm sm:text-base">Square feet</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="relative space-y-4">
            <div className="relative">
              <img alt="" className="w-full rounded-[20px] shadow-lg" src={aboutusImg1} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img alt="" className="w-full rounded-[20px] shadow-lg" src={aboutusImg2} />
              <div className="relative">
                <img alt="" className="w-full rounded-[22px] shadow-lg" src={aboutusImg3} />
                <div className="absolute bottom-4 right-4">
                  <div className="relative">
                    <img src={places17kBg} alt="" className="w-32 sm:w-36 md:w-40 h-auto" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <img src={places17kText} alt="17k+" className="h-8 sm:h-10 w-auto mb-1" />
                      <img src={placesText} alt="Places" className="h-6 sm:h-8 w-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Ring */}
      <div className="absolute top-0 right-0 -z-10 opacity-50">
        <img src={aboutusRing} alt="" className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64" />
      </div>
    </section>
  );
};

export default IntroSection;