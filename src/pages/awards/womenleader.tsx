import womenLeaderImage from '../../assets/womenleader/womenleader.png';

const WomenLeader = () => {
  return (
    <article className="relative py-16 lg:py-24">
      {/* Dark Teal Side Bar */}
      <div className="hidden lg:block absolute left-0 top-0 w-[375px] h-[729px]" style={{ backgroundColor: '#204758' }} />

      <div className="container mx-auto px-4 lg:px-0 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-[1200px] mx-auto">
          {/* Left: Image Card */}
          <div className="relative lg:pl-[105px]">
            {/* Award Photo Card */}
            <figure className="relative bg-white rounded-[20px] p-8" style={{ boxShadow: '4px 4px 4px 0px rgba(0,0,0,0.25), 0px 4px 4px 0px rgba(0,0,0,0.25)' }}>
              <img 
                alt="Women Leader Award ceremony" 
                className="w-full h-auto object-cover rounded-lg" 
                src={womenLeaderImage} 
              />
            </figure>
          </div>

          {/* Right: Text Content */}
          <div className="relative lg:pr-[100px]">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8" style={{ color: '#FFDE00', fontFamily: 'Outfit, sans-serif' }}>
              Women Leader Award
            </h2>
            <div className="text-black leading-relaxed max-w-[439px] space-y-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <p>
                #dummy-text At iSprout, excellence isn't an act — it's our identity.
              </p>
              <p>
                Our commitment to innovation, service quality, and workspace experience has earned us multiple recognitions across the country.
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
          </div>
        </div>
      </div>
    </article>
  );
};

export default WomenLeader;
