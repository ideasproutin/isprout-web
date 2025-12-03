import aBitText from '../../assets/aboutus_intro/A BIT.png';
import aboutUsText from '../../assets/aboutus_intro/ABOUT US.png';
import aboutusImg1 from '../../assets/aboutus_intro/aboutus_img1.png';
import aboutusImg2 from '../../assets/aboutus_intro/aboutus_img2.png';
import aboutusImg3 from '../../assets/aboutus_intro/aboutus_img3.png';
import aboutusRing from '../../assets/aboutus_intro/aboutus_ring.png';
import wing1 from '../../assets/aboutus_intro/aboutus_wing1.png';
import wing2 from '../../assets/aboutus_intro/aboutus_wing2.png';
import wing3 from '../../assets/aboutus_intro/aboutus_wing3.png';
import wing4 from '../../assets/aboutus_intro/aboutus_wing4.png';
import exploreMoreBg from '../../assets/aboutus_intro/exploremorebg.png';
import exploreMoreText from '../../assets/aboutus_intro/Explore More_text.png';
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
              <img src={aBitText} alt="A BIT" className="h-4 sm:h-5 mb-2" />
              <img src={aboutUsText} alt="ABOUT US" className="h-12 sm:h-16 lg:h-20" />
            </div>
            
            <p className="font-['Inter:Regular',sans-serif] text-base sm:text-lg leading-[29px] text-gray-700">
              At iSprout, we're a bunch of dreamers and doers who believe that workspaces should be anything but not boring. 
              We're on a mission to create offices that people actually look forward to come to every day.
            </p>

            <button className="relative hover:opacity-90 transition-opacity bg-transparent border-0 p-0">
              <img 
                src={exploreMoreBg} 
                alt="" 
                className="h-14 sm:h-16 md:h-[70px] w-auto"
              />
              <img 
                src={exploreMoreText} 
                alt="Explore More" 
                className="absolute inset-0 m-auto h-5 sm:h-6 w-auto"
              />
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