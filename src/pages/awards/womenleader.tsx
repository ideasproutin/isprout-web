import womenLeaderImage1 from '../../assets/womenleader/womenleader.png';
import womenLeaderImage2 from '../../assets/womenleader/managedofficebrand_awardimg.png';
import { COLORS } from '../../helpers/constants/Colors';
 
const WomenLeader = () => {
  return (
    <article className="relative pt-[40px] lg:pt-[60px] pb-[80px] lg:pb-[100px]">
      {/* Dark Teal Side Bar */}
      <div className="hidden lg:block absolute left-0 top-0 w-[375px] h-[550px]" style={{ backgroundColor: COLORS.brandBlue }} />
 
      <div className="container mx-auto px-4 lg:px-0 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center max-w-[1200px] mx-auto">
          {/* Left: Image Cards */}
          <div className="relative lg:pl-[105px] flex flex-col items-center justify-center">
            {/* Main Award Photo Card */}
            <figure className="relative bg-white rounded-[15px] p-4 mb-4 max-w-[350px]" style={{ boxShadow: '4px 4px 4px 0px rgba(0,0,0,0.25), 0px 4px 4px 0px rgba(0,0,0,0.25)' }}>
              <img
                alt="Women Leader Award ceremony"
                className="w-full h-[150px] object-cover rounded-lg"
                src={womenLeaderImage1}
              />
            </figure>
 
            {/* Trophy Inset Card */}
            <figure className="relative bg-white rounded-[15px] p-4 max-w-[280px]" style={{ boxShadow: '4px 4px 4px 0px rgba(0,0,0,0.25), 0px 4px 4px 0px rgba(0,0,0,0.25)' }}>
              <img
                alt="Women Leader Award trophy"
                className="w-full h-[180px] object-cover rounded-[15px]"
                src={womenLeaderImage2}
              />
            </figure>
          </div>
 
          {/* Right: Text Content */}
          <div className="relative lg:pr-[80px]">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: COLORS.brandYellow, fontFamily: 'Outfit, sans-serif' }}>
              Women Leader Award
            </h2>
            <div className="text-black leading-relaxed max-w-[439px] space-y-3 text-[15px]" style={{ fontFamily: 'Outfit, sans-serif' }}>
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
