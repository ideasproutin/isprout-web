import spotlightImage1 from '../../assets/spotlight_section/spotlightimage1.png';
import spotlightImage2 from '../../assets/spotlight_section/spotlightimage2.png';
import spotlightImage3 from '../../assets/spotlight_section/spotlightimage3.png';
import { COLORS } from '../../helpers/constants/Colors';


import Footer from '../../components/footer/footer';
import { homePageImages } from '../../assets';
const SpotlightIntro = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.white }}>
      {/* Hero Section */}
      <div className="relative w-full pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 lg:pb-20 overflow-hidden -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-32">
        {/* Yellow Ellipse Background - sized to wrap around image */}
        <div className="absolute right-0 top-0 w-[400px] h-[400px] lg:w-[650px] lg:h-[650px] pointer-events-none">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-[50%]" style={{ backgroundColor: '#FFDE00', boxShadow: '0px 5px 4px 0px rgba(0,0,0,0.25)' }}></div>
          </div>
        </div>

        {/* Image in circle */}
        <div className="absolute right-6 top-4 w-[360px] h-[360px] lg:right-8 lg:top-4 lg:w-[600px] lg:h-[600px] pointer-events-none z-10">
          <img alt="Leading brand professional" className="w-full h-full object-cover rounded-full" src={spotlightImage1} />
        </div>

        {/* Blue dot accent */}
        <div className="absolute right-[30%] top-[340px] lg:right-[36%] lg:top-[560px] w-12 h-12 lg:w-[63px] lg:h-[63px] z-20">
          <div className="w-full h-full rounded-full border-[3px] border-white" style={{ backgroundColor: '#204758' }}></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl pt-8 lg:pt-12">
            <h1 className="text-4xl lg:text-[64px] text-center lg:text-left mb-8 lg:mb-12" style={{ color: COLORS.textBlack, fontFamily: 'Outfit, sans-serif' }}>
              <span className="font-semibold block">Leading Brands</span>
              <span className="font-semibold">at </span>
              <span style={{ fontFamily: 'Otomanopee One, sans-serif', color: '#FFDE00' }}>iSprout</span>
            </h1>
            <div className="text-lg lg:text-[24px] space-y-4" style={{ color: COLORS.textBlack, fontFamily: 'Outfit, sans-serif' }}>
              <p>Celebrating the companies that grow with us.</p>
              <p>At iSprout, we&apos;re honored to host industry leaders, innovators, and high-growth teams who bring energy and excellence to our workspaces. Here&apos;s a glimpse of the companies shaping remarkable journeys with us.</p>
            </div>
          </div>
        </div>
      </div>

      {/* DELL Spotlight Section */}
      <div className="relative w-full py-12 lg:py-16 mt-12 lg:mt-20 overflow-hidden">
  {/* Background Ellipse */}
  <div className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[40%] top-0 w-[600px] h-[500px] lg:w-[650px] lg:h-[550px] pointer-events-none">
    <div className="w-full h-full rounded-[50%]" style={{ backgroundColor: '#D2E6F5' }}></div>
  </div>
  
        <div className="absolute right-12 lg:right-140 top-8 z-30 w-20 h-20 lg:w-28 lg:h-28 flex items-center justify-center pointer-events-none">
            <img
                alt="Dell logo"
                className="w-full h-full object-contain"
                src={homePageImages.dellLogo}
            />
        </div>

  {/* Right side accent */}
  <div className="hidden lg:block absolute right-0 top-0 w-[350px] h-[550px]" style={{ backgroundColor: '#D2E6F5' }}></div>

  <div className="container mx-auto px-4 lg:px-8 relative z-10">
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 justify-center">
      
      {/* Left Content Card */}
      <div className="relative w-full lg:w-[500px]">
        <div
                className="p-6 lg:p-10 border-[10px] border-gray-300"
                style={{ boxShadow: '0px -2px 4px 0px rgba(0,0,0,0.25), 0px 4px 4px 0px rgba(0,0,0,0.25)', backgroundColor: COLORS.white }}
              >
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'rgba(255,222,0,0.27)' }}></div>
          <div className="relative z-10">
            <h2 className="font-extrabold text-2xl lg:text-[28px] mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textBlack }}>
              DELL
            </h2>
            <p className="font-semibold text-lg lg:text-[20px] mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textBlack }}>
              &quot;Scaling tech hubs faster with iSprout's flexible workspace solutions.&quot;
            </p>
            <p className="font-bold text-sm mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#a4a4a4' }}>
              Global Brand
            </p>
            <div className="flex items-start gap-2">
              <span className="text-xl">📍</span>
              <p className="font-bold text-sm" style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textBlack }}>
                &quot;iSprout – Financial District&quot;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image Circle */}
      <div className="relative w-[240px] h-[240px] lg:w-[380px] lg:h-[380px]">
        
        {/* UPDATED: Added 2px white border */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: '#FFDE00', boxShadow: '5px 5px 4px 0px rgba(0,0,0,0.25)' }}
        ></div>

        <div className="absolute top-[20px] left-[20px] w-[200px] h-[200px] lg:top-[40px] lg:left-[40px] lg:w-[300px] lg:h-[300px]">
          <img
            alt="Dell team member"
            className="w-full h-full object-cover rounded-full"
            src={spotlightImage2}
          />
        </div>
      </div>

    </div>
  </div>
</div>


      {/* Adobe Spotlight Section */}
      <div className="relative w-full py-12 lg:py-16 mb-12 lg:mb-20 overflow-hidden">
        {/* Background Ellipse */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[3%] top-0 w-[600px] h-[500px] lg:w-[650px] lg:h-[550px] pointer-events-none">
          <div className="w-full h-full rounded-[50%]" style={{ backgroundColor: '#D2E6F5' }}></div>
        </div>
       

        <div className="absolute right-12 lg:right-160 top-0 z-30 w-20 h-20 lg:w-28 lg:h-28 flex items-center justify-center pointer-events-none">
            <img
                alt="Adobe logo"
                className="w-full h-full object-contain"
                src={homePageImages.adobeLogo}
            />
        </div>

        {/* Left side accent */}
        <div className="hidden lg:block absolute left-0 top-0 w-[350px] h-[550px]" style={{ backgroundColor: '#D2E6F5' }}></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12 justify-center">
            {/* Left Image Circle */}
            <div className="relative w-[240px] h-[240px] lg:w-[380px] lg:h-[380px]">
              <div className="absolute inset-0 rounded-full" style={{ backgroundColor: '#FFDE00', boxShadow: '5px 5px 4px 0px rgba(0,0,0,0.25)' }}></div>
              <div className="absolute top-[20px] left-[20px] w-[200px] h-[200px] lg:top-[40px] lg:left-[40px] lg:w-[300px] lg:h-[300px]">
                <img alt="Adobe team member" className="w-full h-full object-cover rounded-full" src={spotlightImage3} />
              </div>
            </div>

            {/* Right Content Card */}
            <div className="relative w-full lg:w-[500px]">
              <div
                className="p-6 lg:p-10 border-[10px] border-gray-300"
                style={{ boxShadow: '0px -2px 4px 0px rgba(0,0,0,0.25), 0px 4px 4px 0px rgba(0,0,0,0.25)', backgroundColor: COLORS.white }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'rgba(255,222,0,0.27)' }}></div>
                <div className="relative z-10">
                  <h2 className="font-extrabold text-2xl lg:text-[28px] mb-4" style={{ color: COLORS.textBlack, fontFamily: 'Outfit, sans-serif' }}>
                    Adobe
                  </h2>
                  <p className="font-semibold text-lg lg:text-[20px] mb-4" style={{ color: COLORS.textBlack, fontFamily: 'Outfit, sans-serif' }}>
                    &quot;Scaling their India teams with iSprout's flexible workspace solutions.&quot;
                  </p>
                  <p className="font-bold text-sm mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#a4a4a4' }}>
                    Global Brand
                  </p>
                  <div className="flex items-start gap-2">
                    <span className="text-xl">📍</span>
                    <p className="font-bold text-sm" style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textBlack }}>
                      &quot;iSprout – Financial District&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SpotlightIntro;
