import heroImage from '../../assets/meetingroom/meetingroom_herosection.png';
import MeetingRoomGlimpse from './glimpse';
import WhyMeetingRoom from './whymeetingrom';
import Locations from '../home/components/locations';
import Amenities from '../home/components/amenities';
import SpiceThings from '../managedoffice/spicethings';
import MeetingRoomFAQ from './faq';
import FutureOfWork from '../home/components/futureofwork';
import Footer from '../../components/footer/footer';

const MeetingRoomsIntro = () => {
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
                  alt="Modern meeting room with conference table"
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
                Meeting Rooms
              </h1>
              
              {/* Tagline */}
              <p className="text-base md:text-lg lg:text-xl leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                Where Ideas Meet Excellence.
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
          
          {/* Badge 1: Productive - Bottom Left */}
          <div className="absolute left-8 md:left-12 lg:left-16 bottom-[120px] md:bottom-[140px] lg:bottom-[160px] z-30 transform hover:scale-105 transition-transform duration-300">
            <div className="w-[180px] md:w-[220px] lg:w-[247px] h-[90px] md:h-[95px] lg:h-[104px] bg-white rounded-3xl flex items-center gap-4 px-5 py-5" style={{ boxShadow: '0px 24px 50px rgba(0,0,0,0.15)' }}>
              {/* Yellow icon circle - CODED */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-3xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#FFDE00' }}>
                <span className="text-2xl">👤</span>
              </div>
              {/* Text */}
              <div className="flex-1">
                <p className="text-lg md:text-xl lg:text-2xl mb-0" style={{ fontFamily: 'Outfit, sans-serif', color: '#333333' }}>Productive</p>
                <p className="text-sm md:text-base lg:text-lg" style={{ fontFamily: 'Outfit, sans-serif', color: '#909090' }}>Focus-Driven</p>
              </div>
            </div>
          </div>

          {/* Badge 2: Professional - Middle Bottom */}
          <div className="absolute left-[200px] md:left-[280px] lg:left-[310px] bottom-[60px] md:bottom-[70px] lg:bottom-[80px] z-30 transform hover:scale-105 transition-transform duration-300">
            <div className="w-[190px] md:w-[230px] lg:w-[262px] h-[90px] md:h-[95px] lg:h-[104px] bg-white rounded-3xl flex items-center gap-4 px-5 py-5" style={{ boxShadow: '0px 24px 50px rgba(0,0,0,0.15)' }}>
              {/* Yellow icon circle - CODED */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-3xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#FFDE00' }}>
                <span className="text-2xl">👤</span>
              </div>
              {/* Text */}
              <div className="flex-1">
                <p className="text-lg md:text-xl lg:text-2xl mb-0" style={{ fontFamily: 'Outfit, sans-serif', color: '#333333' }}>Professional</p>
                <p className="text-sm md:text-base lg:text-lg" style={{ fontFamily: 'Outfit, sans-serif', color: '#909090' }}>Client-Ready</p>
              </div>
            </div>
          </div>

          {/* Badge 3: Flexible - Lower Right */}
          <div className="absolute left-[360px] md:left-[520px] lg:left-[600px] bottom-[0px] md:bottom-[10px] lg:bottom-[20px] z-30 transform hover:scale-105 transition-transform duration-300">
            <div className="w-[190px] md:w-[230px] lg:w-[260px] h-[90px] md:h-[95px] lg:h-[104px] bg-white rounded-3xl flex items-center gap-4 px-5 py-5" style={{ boxShadow: '0px 24px 50px rgba(0,0,0,0.15)' }}>
              {/* Yellow icon circle - CODED */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-3xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#FFDE00' }}>
                <span className="text-2xl">👤</span>
              </div>
              {/* Text */}
              <div className="flex-1">
                <p className="text-lg md:text-xl lg:text-2xl mb-0" style={{ fontFamily: 'Outfit, sans-serif', color: '#333333' }}>Flexible</p>
                <p className="text-sm md:text-base lg:text-lg" style={{ fontFamily: 'Outfit, sans-serif', color: '#909090' }}>Hourly / Daily</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Meeting Room Glimpse Component */}
      <MeetingRoomGlimpse />

      {/* Why Meeting Room Component */}
      <WhyMeetingRoom />

      {/* Locations Component */}
      <Locations />

      {/* Amenities Component */}
      <Amenities />

      {/* Spice Things Component */}
      <SpiceThings />

      {/* FAQs Component */}
      <MeetingRoomFAQ />

      {/* Future of Work Component */}
      <FutureOfWork />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MeetingRoomsIntro;
