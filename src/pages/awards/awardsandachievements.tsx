import award1 from '../../assets/awards_achievements/awards_achievements1.png';
import award2 from '../../assets/awards_achievements/awards_achievements2.png';
import award3 from '../../assets/awards_achievements/awards_achievements3.png';
import SibaAwards from './sibaawards';
import SpotlightAward from './spotlightaward';
import ManagedOfficeBrand from './managedofficebrand';

const AwardsAndAchievements = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Decorative Teal Band */}
      <header className="relative h-[600px] lg:h-[771px] mt-24" style={{ backgroundColor: 'rgba(255,222,0,0.16)' }}>
        {/* Large Decorative Teal Ellipse */}
        <div className="absolute -left-[27%] -top-[60%] w-[105%] h-[130%] flex items-center justify-center">
          <div className="rotate-[351.673deg] w-[1221px] h-[996px]">
            <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1222 996">
              <ellipse cx="610.609" cy="497.855" fill="#204758" rx="610.609" ry="497.855" />
            </svg>
          </div>
        </div>

        {/* Three Circular Photo Badges */}
        <div className="absolute left-[8%] top-[80%] lg:top-[492px] w-[180px] h-[180px] lg:w-[230px] lg:h-[230px]">
          <div className="absolute -left-[1.74%] -bottom-[3.48%] right-[-1.74%] top-0">
            <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 238 238">
              <circle cx="119" cy="115" fill="#F5F5F5" r="115" filter="drop-shadow(0 4px 4px rgba(0,0,0,0.25))" />
            </svg>
          </div>
          <div className="absolute left-[8px] top-[8px] w-[calc(100%-16px)] h-[calc(100%-16px)] flex items-center justify-center">
            <div className="rotate-[353.531deg] w-[85%] h-[85%]">
              <img alt="Award photo 1" className="block w-full h-full rounded-full object-cover" src={award1} />
            </div>
          </div>
        </div>

        <div className="absolute left-[39%] top-[72%] lg:top-[438px] w-[180px] h-[180px] lg:w-[230px] lg:h-[230px]">
          <div className="absolute -left-[1.74%] -bottom-[3.48%] right-[-1.74%] top-0">
            <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 238 238">
              <circle cx="119" cy="115" fill="#F5F5F5" r="115" filter="drop-shadow(0 4px 4px rgba(0,0,0,0.25))" />
            </svg>
          </div>
          <div className="absolute left-[6px] top-[6px] w-[calc(100%-12px)] h-[calc(100%-12px)] flex items-center justify-center">
            <div className="rotate-[352.691deg] w-[85%] h-[85%]">
              <img alt="Award photo 2" className="block w-full h-full rounded-full object-cover" src={award2} />
            </div>
          </div>
        </div>

        <div className="absolute left-[60%] lg:left-[777px] top-[31%] lg:top-[186px] w-[180px] h-[180px] lg:w-[230px] lg:h-[230px]">
          <div className="absolute -left-[1.74%] -bottom-[3.48%] right-[-1.74%] top-0">
            <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 238 238">
              <circle cx="119" cy="115" fill="#F5F5F5" r="115" filter="drop-shadow(0 4px 4px rgba(0,0,0,0.25))" />
            </svg>
          </div>
          <div className="absolute left-0 top-[-6px] w-full h-full flex items-center justify-center">
            <div className="rotate-[342.983deg] w-[85%] h-[85%]">
              <img alt="Award photo 3" className="block w-full h-full rounded-full object-cover" src={award3} />
            </div>
          </div>
        </div>

        {/* Hero Title */}
        <h1 
          className="absolute left-[5%] lg:left-[100px] top-[130px] lg:top-[162px] text-4xl sm:text-5xl lg:text-6xl font-bold"
          style={{ 
            color: '#FFDE00',
            fontFamily: 'Outfit, sans-serif',
            filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.25))'
          }}
        >
          <span className="block">Awards &</span>
          <span className="block">Achievements</span>
        </h1>

        {/* Hero Description */}
        <p 
          className="absolute left-[5%] lg:left-[95px] top-[220px] lg:top-[277px] w-[90%] max-w-[518px] text-white leading-relaxed"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          At iSprout, excellence isn't an act — it's our identity.
          <br />
          Our commitment to innovation, service quality, and workspace experience has earned us multiple recognitions across the country.
          <br />
          These awards reflect our journey of transforming offices into dynamic, future-ready work environments.
        </p>
      </header>

      {/* Thin Decorative Bar - Positioned below hero, above first award */}
      <div className="relative w-full max-w-[1180px] h-[10px] mx-auto mt-[-10px]" style={{ backgroundColor: '#204758' }} />
      
      {/* SIBA Awards Section */}
      <SibaAwards />
      
      {/* Spotlight Award Section */}
      <SpotlightAward />
      
      {/* Managed Office Brand Section */}
      <ManagedOfficeBrand />
    </div>
  );
};

export default AwardsAndAchievements;
