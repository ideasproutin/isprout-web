import spotlightImage1 from '../../assets/spotlight_section/spotlightimage1.png';
import spotlightImage2 from '../../assets/spotlight_section/spotlightimage2.png';
import spotlightImage3 from '../../assets/spotlight_section/spotlightimage3.png';
import Footer from '../../components/footer/footer';

const SpotlightIntro = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full py-12 lg:py-20 overflow-hidden">
        {/* Yellow Ellipse Background - sized to wrap around image */}
        <div className="absolute right-0 lg:right-4 top-8 lg:top-12 w-[320px] h-[320px] lg:w-[500px] lg:h-[500px] pointer-events-none">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-[50%]" style={{ backgroundColor: '#FFDE00', boxShadow: '0px 5px 4px 0px rgba(0,0,0,0.25)' }}></div>
          </div>
        </div>

        {/* Image in circle */}
        <div className="absolute right-4 lg:right-8 top-12 lg:top-16 w-[280px] h-[280px] lg:w-[460px] lg:h-[460px] pointer-events-none z-10">
          <img alt="Leading brand professional" className="w-full h-full object-cover rounded-full" src={spotlightImage1} />
        </div>

        {/* Blue dot accent */}
        <div className="absolute right-[35%] lg:right-[38%] top-[280px] lg:top-[400px] w-12 h-12 lg:w-[63px] lg:h-[63px] z-20">
          <div className="w-full h-full rounded-full border-[3px] border-white" style={{ backgroundColor: '#204758' }}></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl pt-8 lg:pt-12">
            <h1 className="text-4xl lg:text-[64px] text-black text-center lg:text-left mb-8 lg:mb-12" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <span className="font-semibold block">Leading Brands</span>
              <span className="font-semibold">at </span>
              <span style={{ fontFamily: 'Otomanopee One, sans-serif', color: '#FFDE00' }}>iSprout</span>
            </h1>
            <div className="text-lg lg:text-[24px] text-black space-y-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <p>Celebrating the companies that grow with us.</p>
              <p>At iSprout, we&apos;re honored to host industry leaders, innovators, and high-growth teams who bring energy and excellence to our workspaces. Here&apos;s a glimpse of the companies shaping remarkable journeys with us.</p>
            </div>
          </div>
        </div>
      </div>

      {/* DELL Spotlight Section */}
      <div className="relative w-full py-12 lg:py-16 overflow-hidden">
        {/* Background Ellipse */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[40%] top-0 w-[600px] h-[500px] lg:w-[650px] lg:h-[550px] pointer-events-none">
          <div className="w-full h-full rounded-[50%]" style={{ backgroundColor: '#D2E6F5' }}></div>
        </div>

        {/* Right side accent */}
        <div className="hidden lg:block absolute right-0 top-0 w-[350px] h-[550px]" style={{ backgroundColor: '#D2E6F5' }}></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 justify-center">
            {/* Left Content Card */}
            <div className="relative w-full lg:w-[500px]">
              <div className="bg-white p-6 lg:p-10" style={{ boxShadow: '0px -2px 4px 0px rgba(0,0,0,0.25), 0px 4px 4px 0px rgba(0,0,0,0.25)' }}>
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'rgba(255,222,0,0.27)' }}></div>
                <div className="relative z-10">
                  <h2 className="font-extrabold text-2xl lg:text-[28px] text-black mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    DELL
                  </h2>
                  <p className="font-semibold text-lg lg:text-[20px] text-black mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    &quot;Scaling tech hubs faster with iSprout&apos;s flexible workspace solutions.&quot;
                  </p>
                  <p className="font-bold text-sm mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#a4a4a4' }}>
                    Global Brand
                  </p>
                  <div className="flex items-start gap-2">
                    <span className="text-xl">📍</span>
                    <p className="font-bold text-black text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      &quot;iSprout – Financial District&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Circle */}
            <div className="relative w-[240px] h-[240px] lg:w-[380px] lg:h-[380px]">
              <div className="absolute inset-0 rounded-full" style={{ backgroundColor: '#FFDE00', boxShadow: '5px 5px 4px 0px rgba(0,0,0,0.25)' }}></div>
              <div className="absolute top-[20px] left-[20px] w-[200px] h-[200px] lg:top-[40px] lg:left-[40px] lg:w-[300px] lg:h-[300px]">
                <img alt="Dell team member" className="w-full h-full object-cover rounded-full" src={spotlightImage2} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adobe Spotlight Section */}
      <div className="relative w-full py-12 lg:py-16 overflow-hidden">
        {/* Background Ellipse */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[3%] top-0 w-[600px] h-[500px] lg:w-[650px] lg:h-[550px] pointer-events-none">
          <div className="w-full h-full rounded-[50%]" style={{ backgroundColor: '#D2E6F5' }}></div>
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
              <div className="bg-white p-6 lg:p-10" style={{ boxShadow: '0px -2px 4px 0px rgba(0,0,0,0.25), 0px 4px 4px 0px rgba(0,0,0,0.25)' }}>
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'rgba(255,222,0,0.27)' }}></div>
                <div className="relative z-10">
                  <h2 className="font-extrabold text-2xl lg:text-[28px] text-black mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Adobe
                  </h2>
                  <p className="font-semibold text-lg lg:text-[20px] text-black mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    &quot;Enabling fluid teams with iSprout&apos;s flexible workspace solutions.&quot;
                  </p>
                  <p className="font-bold text-sm mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#a4a4a4' }}>
                    Global Brand
                  </p>
                  <div className="flex items-start gap-2">
                    <span className="text-xl">📍</span>
                    <p className="font-bold text-black text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
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
