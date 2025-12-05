import timesImage1 from '../../assets/timesbusiness/timesbusiness.png';
import timesImage2 from '../../assets/timesbusiness/timesbusiness1.png';

const TimesBusiness = () => {
  return (
    <article className="relative py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-[1200px] mx-auto">
          {/* Left: Text Content */}
          <div className="relative">
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8"
              style={{ 
                color: '#204758',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Times Business Awards 2019
            </h2>
            
            <div className="space-y-4 text-black leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
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

          {/* Right: Images with Yellow Background */}
          <div className="relative">
            {/* Yellow Background Block */}
            <div 
              className="absolute top-0 right-0 w-[85%] h-full rounded-lg"
              style={{ backgroundColor: '#FFDE00' }}
            />
            
            {/* Main Award Photo Card */}
            <figure className="relative bg-white rounded-[20px] p-6 ml-8 mt-8 mb-8" style={{ boxShadow: '4px 4px 4px 0px rgba(0,0,0,0.25), 0px 4px 4px 0px rgba(0,0,0,0.25)' }}>
              <img 
                alt="Times Business Award ceremony" 
                className="w-full h-auto object-cover rounded-lg" 
                src={timesImage1} 
              />
            </figure>

            {/* Trophy Inset Card */}
            <figure className="relative bg-white rounded-[20px] p-6 max-w-[300px] ml-auto mr-8" style={{ boxShadow: '4px 4px 4px 0px rgba(0,0,0,0.25), 0px 4px 4px 0px rgba(0,0,0,0.25)' }}>
              <img 
                alt="Times Business Award trophy" 
                className="w-full h-auto object-cover rounded-lg" 
                src={timesImage2} 
              />
            </figure>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TimesBusiness;
