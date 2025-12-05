import imgRectangle4706 from '../../assets/sibaaward/siba1.png';
import imgRectangle4705 from '../../assets/sibaaward/siba2.png';

const SibaAwards = () => {
  return (
    <article className="relative pt-[80px] lg:pt-[120px] pb-[100px]">
      {/* Dark Teal Side Bar */}
      <div className="hidden lg:block absolute left-0 top-0 w-[375px] h-[729px]" style={{ backgroundColor: '#204758' }} />

      <div className="container mx-auto px-4 lg:px-0 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-[1200px] mx-auto">
          {/* Left: Image Cards */}
          <div className="relative lg:pl-[105px]">
            {/* Main Award Photo Card */}
            <figure className="relative bg-white rounded-[20px] p-8 mb-8" style={{ boxShadow: '4px 4px 4px 0px rgba(0,0,0,0.25), 0px 4px 4px 0px rgba(0,0,0,0.25)' }}>
              <img 
                alt="SIBA award ceremony photo" 
                className="w-full h-[226px] object-cover rounded-lg" 
                src={imgRectangle4706} 
              />
            </figure>

            {/* Trophy Inset Card */}
            <figure className="relative bg-white rounded-[20px] p-6 max-w-[414px] ml-auto" style={{ boxShadow: '4px 4px 4px 0px rgba(0,0,0,0.25), 0px 4px 4px 0px rgba(0,0,0,0.25)' }}>
              <img 
                alt="SIBA trophy" 
                className="w-full h-[280px] object-cover rounded-[20px]" 
                src={imgRectangle4705} 
              />
            </figure>
          </div>

          {/* Right: Text Content */}
          <div className="relative lg:pr-[100px]">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8" style={{ color: '#FFDE00', fontFamily: 'Outfit, sans-serif' }}>
              SIBA AWARDS
            </h2>
            <div className="text-black leading-relaxed max-w-[439px] space-y-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <p>
                #dummy-text At iSprout, excellence isn't an act — it's our identity. Our commitment to innovation, service quality, and workspace experience has earned us multiple recognitions across the country.
              </p>
              <p>
                These awards reflect our journey of transforming offices into dynamic, future-ready work environments. At iSprout, excellence isn't an act — it's our identity.
              </p>
              <p>
                Our commitment to innovation, service quality, and workspace experience has earned us multiple recognitions across the country.
              </p>
              <p>
                These awards reflect our journey of transforming offices into dynamic, future-ready work environments.
              </p>
            </div>

            {/* Circular Gold Stamp */}
            <div className="absolute right-0 top-[-40px] w-[156px] h-[156px] hidden lg:block">
              <div className="w-full h-full rounded-full flex items-center justify-center" style={{ 
                background: 'radial-gradient(circle, #FFDE00 0%, #FFDE00 70%, transparent 70%)',
                backgroundSize: '20px 20px'
              }}>
                <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFDE00' }}>
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="35" stroke="#204758" strokeWidth="2" fill="none"/>
                    <circle cx="40" cy="40" r="28" stroke="#204758" strokeWidth="1" fill="none"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SibaAwards;
