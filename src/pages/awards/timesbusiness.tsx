import timesImage1 from '../../assets/timesbusiness/timesbusiness.png';
import timesImage2 from '../../assets/timesbusiness/timesbusiness1.png';
import { COLORS } from '../../helpers/constants/Colors';

const TimesBusiness = () => {
  return (
    <article className="relative pt-[40px] lg:pt-[60px] pb-[60px]">
      {/* Yellow background strip */}
      <div className="absolute right-0 top-0 w-[375px] h-[550px] hidden lg:block" style={{ backgroundColor: COLORS.brandYellow }} />
     
      {/* Main content container */}
      <div className="container mx-auto px-4 lg:px-0 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center max-w-[1200px] mx-auto">
          {/* Left section - Text content */}
          <div className="relative lg:pl-[80px]">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: COLORS.brandBlue, fontFamily: 'Outfit, sans-serif' }}>
              Times Business Awards 2019
            </h2>
           
            <div className="leading-relaxed max-w-[439px] space-y-3 text-[15px]" style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.textBlack }}>
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
         
          {/* Right section - Award cards */}
          <div className="relative lg:pr-[80px] flex flex-col items-center justify-center">
            {/* Large award card */}
            <figure className="relative rounded-[15px] p-4 mb-4 max-w-[350px]" style={{ backgroundColor: COLORS.white, boxShadow: '4px 4px 4px 0px rgba(0,0,0,0.25), 0px 4px 4px 0px rgba(0,0,0,0.25)' }}>
              <img
                alt="Times Business Award ceremony"
                className="w-full h-[150px] object-cover rounded-lg"
                src={timesImage1}
              />
            </figure>
           
            {/* Small trophy card */}
            <figure className="relative rounded-[15px] p-4 max-w-[280px]" style={{ backgroundColor: COLORS.white, boxShadow: '4px 4px 4px 0px rgba(0,0,0,0.25), 0px 4px 4px 0px rgba(0,0,0,0.25)' }}>
              <img
                alt="Times Business Award trophy"
                className="w-full h-[180px] object-cover rounded-[15px]"
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
