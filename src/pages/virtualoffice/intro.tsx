import heroImage from '../../virtualoffice/virtualoffice_herosection.png';
import officeImage from '../../virtualoffice/virtualoffice.png';
import WhyVirtualOffice from './whyvirtualoffice';
import Locations from '../home/components/locations';
import VirtualOfficeProcess from './virtualoffice_process';
import FutureOfWork from '../home/components/futureofwork';
import Footer from '../../components/footer/footer';

const VirtualOfficeIntro = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - LIGHT YELLOW BACKGROUND ONLY FOR HERO */}
      <section className="relative py-16 md:py-20 lg:py-28 px-4 md:px-8 lg:px-16 overflow-visible" style={{ backgroundColor: '#FFFBF0' }}>
        <div className="max-w-[1400px] mx-auto relative" style={{ minHeight: '750px' }}>
          
          {/* Large Circular Photo with Thick Black Ring - Right Side - MOVED UP */}
          <div className="absolute right-0 top-[60px] md:top-[80px] lg:top-[100px] z-10">
            <div className="relative w-[420px] h-[420px] md:w-[600px] md:h-[600px] lg:w-[750px] lg:h-[750px]">
              {/* Black ring border - CODED SHAPE */}
              <div className="absolute inset-0 rounded-full border-[12px] md:border-[14px] border-black shadow-2xl"></div>
              
              {/* Inner white background */}
              <div className="absolute inset-[12px] md:inset-[14px] rounded-full bg-white overflow-hidden">
                {/* Hero photo - ONLY IMAGE */}
                <img 
                  src={heroImage} 
                  alt="Modern office workspace with laptop"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Small yellow decorative dot on right edge - CODED SHAPE */}
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full border-[3px] border-black shadow-lg z-20" style={{ backgroundColor: '#FFDE00' }}></div>
            </div>
          </div>

          {/* Yellow Pill with Text - Overlapping Left Side - CODED SHAPE */}
          <div className="absolute left-0 top-[120px] md:top-[160px] lg:top-[200px] z-20">
            <div className="relative w-[320px] h-[280px] md:w-[420px] md:h-[320px] lg:w-[480px] lg:h-[350px] rounded-full flex flex-col justify-center px-8 md:px-10 lg:px-14" style={{ backgroundColor: '#FFDE00', boxShadow: '0px 20px 60px rgba(0,0,0,0.15)' }}>
              {/* Main headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                Virtual Office
              </h1>
              
              {/* Tagline */}
              <p className="text-base md:text-lg lg:text-xl leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                Your Business, Anywhere. Instantly
              </p>

              {/* Decorative smile curve - CODED with SVG */}
              <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12" aria-hidden="true">
                <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                  <path d="M 5 5 Q 30 35, 55 5" stroke="#204758" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                </svg>
                {/* Decorative dots - CODED */}
                <div className="absolute left-0 top-0 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#204758' }}></div>
                <div className="absolute right-0 top-0 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#204758' }}></div>
              </div>
            </div>
          </div>

          {/* Three Floating Feature Badges - LOWER POSITION - Overlapping ONLY bottom of circle - ALL CODED SHAPES */}
          
          {/* Badge 1: Flexible - Bottom Left */}
          <div className="absolute left-8 md:left-12 lg:left-16 bottom-[120px] md:bottom-[140px] lg:bottom-[160px] z-30 transform hover:scale-105 transition-transform duration-300">
            <div className="w-[180px] md:w-[220px] lg:w-[247px] h-[90px] md:h-[95px] lg:h-[104px] bg-white rounded-3xl flex items-center gap-4 px-5 py-5" style={{ boxShadow: '0px 24px 50px rgba(0,0,0,0.15)' }}>
              {/* Yellow icon circle - CODED */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-3xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFDE00' }}>
                <span className="text-2xl">💼</span>
              </div>
              {/* Text */}
              <div className="flex-1">
                <p className="text-lg md:text-xl lg:text-2xl mb-0" style={{ fontFamily: 'Outfit, sans-serif', color: '#333333' }}>Flexible</p>
                <p className="text-sm md:text-base lg:text-lg" style={{ fontFamily: 'Outfit, sans-serif', color: '#909090' }}>Cost-Effective</p>
              </div>
            </div>
          </div>

          {/* Badge 2: Secure - Middle Bottom */}
          <div className="absolute left-[200px] md:left-[280px] lg:left-[310px] bottom-[60px] md:bottom-[70px] lg:bottom-[80px] z-30 transform hover:scale-105 transition-transform duration-300">
            <div className="w-[190px] md:w-[230px] lg:w-[262px] h-[90px] md:h-[95px] lg:h-[104px] bg-white rounded-3xl flex items-center gap-4 px-5 py-5" style={{ boxShadow: '0px 24px 50px rgba(0,0,0,0.15)' }}>
              {/* Yellow icon circle - CODED */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-3xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFDE00' }}>
                <span className="text-2xl">🔒</span>
              </div>
              {/* Text */}
              <div className="flex-1">
                <p className="text-lg md:text-xl lg:text-2xl mb-0" style={{ fontFamily: 'Outfit, sans-serif', color: '#333333' }}>Secure</p>
                <p className="text-sm md:text-base lg:text-lg" style={{ fontFamily: 'Outfit, sans-serif', color: '#909090' }}>Verified Handling</p>
              </div>
            </div>
          </div>

          {/* Badge 3: Hassle-Free - Lower Right */}
          <div className="absolute left-[360px] md:left-[520px] lg:left-[600px] bottom-[0px] md:bottom-[10px] lg:bottom-[20px] z-30 transform hover:scale-105 transition-transform duration-300">
            <div className="w-[190px] md:w-[230px] lg:w-[260px] h-[90px] md:h-[95px] lg:h-[104px] bg-white rounded-3xl flex items-center gap-4 px-5 py-5" style={{ boxShadow: '0px 24px 50px rgba(0,0,0,0.15)' }}>
              {/* Yellow icon circle - CODED */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-3xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFDE00' }}>
                <span className="text-2xl">⚡</span>
              </div>
              {/* Text */}
              <div className="flex-1">
                <p className="text-lg md:text-xl lg:text-2xl mb-0" style={{ fontFamily: 'Outfit, sans-serif', color: '#333333' }}>Hassle-Free</p>
                <p className="text-sm md:text-base lg:text-lg" style={{ fontFamily: 'Outfit, sans-serif', color: '#909090' }}>Quick Setup</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Set Up Your Virtual Office Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                <span>Set Up Your </span>
                <span style={{ color: '#FFDE00' }}>Virtual Office</span>
                <span> Today</span>
              </h2>
              <p className="text-lg md:text-xl mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Submit your details to activate your virtual workspace, business address and mail services.
              </p>
              <div className="rounded-xl shadow-xl overflow-hidden max-w-md">
                <img alt="Virtual Office Space" className="w-full h-auto" src={officeImage} />
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl">
              <form className="space-y-6">
                <div>
                  <label className="block text-lg mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>Full Name:</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-full px-12 py-3 focus:outline-none"
                      style={{ border: '2px solid #204758', fontFamily: 'Outfit, sans-serif' }}
                      required
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black">👤</span>
                  </div>
                </div>

                <div>
                  <label className="block text-lg mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>Your Email:</label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full rounded-full px-12 py-3 focus:outline-none"
                      style={{ border: '2px solid #204758', fontFamily: 'Outfit, sans-serif' }}
                      required
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black">✉️</span>
                  </div>
                </div>

                <div>
                  <label className="block text-lg mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>Phone Number:</label>
                  <div className="relative">
                    <input
                      type="tel"
                      className="w-full rounded-full px-12 py-3 focus:outline-none"
                      style={{ border: '2px solid #204758', fontFamily: 'Outfit, sans-serif' }}
                      required
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black">📞</span>
                  </div>
                </div>

                <div>
                  <label className="block text-lg mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>Preferred City:</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-full px-12 py-3 focus:outline-none"
                      style={{ border: '2px solid #204758', fontFamily: 'Outfit, sans-serif' }}
                      required
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black">📍</span>
                  </div>
                </div>

                <div>
                  <label className="block text-lg mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>Company Name:</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-full px-4 py-3 focus:outline-none"
                      style={{ border: '2px solid #204758', fontFamily: 'Outfit, sans-serif' }}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-5 h-5"
                    required
                  />
                  <label htmlFor="terms" className="text-sm italic" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    I agree to the <span className="underline">terms & policy</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="px-12 py-3 rounded-xl transition-colors"
                  style={{ 
                    backgroundColor: '#FFDE00',
                    color: '#204758',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6c900'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFDE00'}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Why Virtual Office Component */}
      <WhyVirtualOffice />

      {/* Locations Component */}
      <Locations />

      {/* Virtual Office Process and FAQs */}
      <VirtualOfficeProcess />

      {/* Future of Work Component */}
      <FutureOfWork />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VirtualOfficeIntro;
