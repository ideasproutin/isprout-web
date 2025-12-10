import careersHeroImage from '../../assets/careers/careers_herosection.png';
import isproutLogo from '../../assets/careers/isprout_logo.png';
import Footer from '../../components/footer/footer';
import Overview from './overview';
import Departments from './departments';

const CareersIntro = () => {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-4 lg:px-16 py-12 lg:py-20 overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Hero Image with Yellow Circle */}
            <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-full max-w-[500px]">
                {/* Yellow Circle Background */}
                <div className="absolute -left-8 lg:-left-16 top-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] rounded-full shadow-lg" style={{ backgroundColor: '#FFDE00' }} />
                
                {/* Hero Image */}
                <div className="relative z-10 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] mx-auto">
                  <img 
                    src={careersHeroImage} 
                    alt="Career at iSprout" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Small Blue Dot Accent */}
                <div className="absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 w-[40px] h-[40px] lg:w-[54px] lg:h-[54px] border-2 lg:border-[3px] border-white rounded-full" style={{ backgroundColor: '#204758' }} />
              </div>
            </div>

            {/* Hero Text */}
            <div className="text-center lg:text-left order-1 lg:order-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <div className="mb-2">COME BUILD</div>
                <div className="mb-2" style={{ fontFamily: 'Otomanopee One, sans-serif', color: '#FFDE00' }}>FUTURE</div>
                <div>WITH US!</div>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* iSprout Job Board Section */}
      <section className="px-4 lg:px-16 py-12 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 justify-center">
            {/* Left - iSprout Logo Card */}
            <div className="relative w-[200px] h-[200px] lg:w-[250px] lg:h-[250px]">
              <div className="w-full h-full rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center" style={{ backgroundColor: '#FFFBF0' }}>
                <img 
                  src={isproutLogo} 
                  alt="iSprout Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Right - Job Categories */}
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Tech', 'Digital Marketing', 'Sales', 'HR', 'Operations', 'Real Estate Manager'].map((category, index) => (
                  <div 
                    key={index}
                    className="px-6 py-3 rounded-full text-center font-semibold cursor-pointer transition-all"
                    style={{ 
                      backgroundColor: '#E8E8E8',
                      fontFamily: 'Outfit, sans-serif',
                      color: '#333'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFDE00';
                      e.currentTarget.style.color = '#204758';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#E8E8E8';
                      e.currentTarget.style.color = '#333';
                    }}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Overview Section */}
      <Overview />

      {/* Departments Section */}
      <Departments />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CareersIntro;
