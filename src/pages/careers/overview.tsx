import { useState } from "react";
import isproutLogo from '../../assets/careers/isprout_logo.png';
import careersHeroImage from '../../assets/careers/careers_herosection.png';
import sundariImage from '../../assets/visionaries/sundari.png';
import sreenivasImage from '../../assets/visionaries/sreenivas.png';
import vasumathiImage from '../../assets/visionaries/vasumathi.png';
import testimonial1 from '../../assets/testimonials/testimonial1.png';
import testimonial2 from '../../assets/testimonials/testimonial2.png';
import testimonial3 from '../../assets/testimonials/testimonial3.png';
import Jobs from './jobs';

const Overview = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tags = [
    { text: "Tech" },
    { text: "Digital Marketing" },
    { text: "Sales" },
    { text: "HR" },
    { text: "Operations" },
    { text: "Real Estate Manager" },
  ];

  const awards = [
    { year: "2025", title: "Women Leader Award" },
    { year: "2024", title: "SIBA Awards" },
    { year: "2024", title: "Managed office Brand Of The Year" },
    { year: "2021", title: "Outlook Business Spotlight Awards" },
    { year: "2019", title: "Times Business Award" },
  ];

  const team = [
    {
      name: "Sundari Patibandla",
      role: "CEO & Co-Founder",
      image: sundariImage,
      bgColor: "#FEDDC0"
    },
    {
      name: "Sreenivas Tirdhala",
      role: "CSO & Co-Founder",
      image: sreenivasImage,
      bgColor: "#F9BEBA"
    },
    {
      name: "Vasumathi Krishnan",
      role: "Chief Business Officer",
      image: vasumathiImage,
      bgColor: "#D2E6F5"
    }
  ];

  const testimonials = [
    {
      text: "iSprout is a fast growing and well operated Managed office provider. Their office staff is very friendly and efficient.",
      name: "Dinesh singh",
      location: "iSprout Orbit",
      image: testimonial3
    },
    {
      text: "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
      name: "Ramesh sood",
      location: "Lahore, Pakistan",
      image: testimonial2
    },
    {
      text: "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
      name: "Mayank das",
      location: "Lahore, Pakistan",
      image: testimonial1
    }
  ];

  return (
    <>
      {/* Company Info Section */}
      <section className="px-4 lg:px-16 py-12 lg:py-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="lg:col-span-7">
              {/* Company Logo and Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Logo Card */}
                <div className="relative">
                  <div className="rounded-[20px] p-6" style={{ background: 'linear-gradient(to bottom, rgba(217,217,217,0.31), rgba(255,222,0,0.31))' }}>
                    <div className="w-full aspect-square mb-4">
                      <img 
                        src={isproutLogo} 
                        alt="iSprout Office" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <h2 className="text-3xl lg:text-4xl" style={{ fontFamily: 'Poppins, sans-serif' }}>iSprout</h2>
                  </div>
                </div>

                {/* Tags Column */}
                <div>
                  <h3 className="text-3xl lg:text-4xl mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>iSprout</h3>
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="rounded-[20px] px-4 py-2 cursor-pointer transition-colors"
                        style={{ 
                          backgroundColor: 'rgba(217,217,217,0.62)',
                          border: '1px solid #ffde00'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255,222,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(217,217,217,0.62)';
                        }}
                      >
                        <span className="text-base lg:text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>{tag.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex gap-6 lg:gap-8 mb-8 border-b-2 border-transparent">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`text-xl lg:text-2xl pb-2 transition-all ${
                    activeTab === "overview"
                      ? "border-b-2 border-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("why")}
                  className={`text-xl lg:text-2xl pb-2 transition-all ${
                    activeTab === "why"
                      ? "border-b-2 border-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Why iSprout
                </button>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className={`text-xl lg:text-2xl pb-2 transition-all ${
                    activeTab === "jobs"
                      ? "border-b-2 border-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Jobs
                </button>
              </div>

              {/* Overview Content */}
              {activeTab === "overview" && (
                <div className="rounded-[20px] p-6 lg:p-8" style={{ backgroundColor: 'rgba(255,222,0,0.09)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Office Image */}
                    <div className="rounded-[20px] overflow-hidden h-[200px] md:h-auto">
                      <img 
                        src={careersHeroImage} 
                        alt="iSprout Office" 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col justify-center">
                      <p className="text-base lg:text-lg text-gray-800 leading-relaxed mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        We are team iSprout. we&apos;re a bunch of dreamers and doers who believe that workspaces 
                        should be anything but not boring. We&apos;re on a mission to create offices that people 
                        actually look forward to come to every day.
                      </p>
                      <button className="text-lg text-black self-start hover:underline" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "why" && (
                <div className="rounded-[20px] p-6 lg:p-8" style={{ backgroundColor: 'rgba(255,222,0,0.09)' }}>
                  <p className="text-lg text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Content for Why iSprout section...
                  </p>
                </div>
              )}

              {activeTab === "jobs" && (
                <Jobs onTabChange={setActiveTab} />
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-5">
              {/* Key Highlights */}
              <div className="mb-12">
                <h4 className="text-xl lg:text-2xl mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>Key Highlights at iSprout</h4>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="relative w-[90px] h-[90px] lg:w-[100px] lg:h-[100px] flex-shrink-0">
                      <div className="absolute inset-0 rounded-full blur-sm translate-y-1" style={{ backgroundColor: '#FFDE00' }} />
                      <div className="relative w-full h-full rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: '#FFDE00' }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#204758" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                      </div>
                    </div>
                    <span className="text-lg lg:text-xl xl:text-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Company Culture</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative w-[90px] h-[90px] lg:w-[100px] lg:h-[100px] flex-shrink-0">
                      <div className="absolute inset-0 rounded-full blur-sm translate-y-1" style={{ backgroundColor: '#FFDE00' }} />
                      <div className="relative w-full h-full rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: '#FFDE00' }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#204758" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                      </div>
                    </div>
                    <span className="text-lg lg:text-xl xl:text-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Work Life</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative w-[90px] h-[90px] lg:w-[100px] lg:h-[100px] flex-shrink-0">
                      <div className="absolute inset-0 rounded-full blur-sm translate-y-1" style={{ backgroundColor: '#FFDE00' }} />
                      <div className="relative w-full h-full rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: '#FFDE00' }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#204758" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                    </div>
                    <span className="text-lg lg:text-xl xl:text-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>All over India</span>
                  </div>
                </div>
              </div>

              {/* Awards Section */}
              <div>
                <h4 className="text-xl lg:text-2xl mb-6 flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFDE00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                  Awards & Recognition
                </h4>

                <div className="space-y-6">
                  {awards.map((award, index) => (
                    <div key={index} className="relative pl-10">
                      <div className="absolute left-0 top-2">
                        <div className="w-4 h-3.5 bg-black rounded-full" />
                        {index < awards.length - 1 && (
                          <div className="absolute left-1/2 -translate-x-1/2 top-4 w-[1px] h-[52px] bg-black" />
                        )}
                      </div>
                      <div>
                        <p className="text-lg lg:text-xl mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{award.year}</p>
                        <p className="text-sm lg:text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#a4a4a4' }}>{award.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visionaries Section */}
      <section className="px-4 lg:px-16 py-12 lg:py-20">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center mb-12 lg:mb-16" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Meet the{" "}
            <span className="relative inline-block">
              <span className="relative z-10" style={{ fontFamily: 'Otomanopee One, sans-serif' }}>Visionaries</span>
              <span className="absolute bottom-0 left-0 right-0 h-3 lg:h-4 -z-0" style={{ backgroundColor: '#ffde00' }} />
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-8">
            {team.map((member, index) => (
              <div key={index} className="flex flex-col items-center relative">
                {index === 1 && (
                  <div className="absolute -right-2 top-1/3 w-3 h-3 bg-black rounded-full shadow-md hidden lg:block" />
                )}

                <div className="relative w-[200px] h-[230px] lg:w-[220px] lg:h-[250px] mb-6">
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundColor: member.bgColor,
                      clipPath: "polygon(0 0, 7.5% 2.7%, 37.4% 13.3%, 71% 12.3%, 100% 0, 100% 87.3%, 71.8% 102.5%, 36% 106.3%, 6.8% 90.4%, 0 87.3%)"
                    }}
                  />
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      clipPath: "polygon(0 0, 7.5% 2.7%, 37.4% 13.3%, 71% 12.3%, 100% 0, 100% 87.3%, 71.8% 102.5%, 36% 106.3%, 6.8% 90.4%, 0 87.3%)"
                    }}
                  >
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-lg lg:text-xl font-semibold text-center capitalize mb-2" style={{ fontFamily: 'Inter, sans-serif', color: '#564f4f' }}>
                  {member.name}
                </h3>
                <p className="text-sm lg:text-base text-center capitalize" style={{ fontFamily: 'Inter, sans-serif', color: '#adadad' }}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button 
              className="w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-md transition-colors"
              style={{ backgroundColor: '#204758' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2d5a6f';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#204758';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFDE00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative px-4 lg:px-16 py-12 lg:py-20 overflow-hidden" style={{ background: 'linear-gradient(to bottom, white, rgba(255,222,0,0.02), white)' }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="absolute left-0 lg:left-20 top-1/2 -translate-y-1/2 w-[300px] h-[280px] lg:w-[500px] lg:h-[400px] opacity-50 -z-10 hidden md:block">
            <svg viewBox="0 0 627 437" fill="none" className="w-full h-full">
              <ellipse cx="300" cy="200" rx="280" ry="180" fill="#FFDE00" opacity="0.7" transform="rotate(-15 300 200)" />
            </svg>
          </div>

          <div className="absolute right-12 lg:right-24 top-1/4 opacity-30 hidden lg:block">
            <svg width="100" height="150" viewBox="0 0 100 150" fill="none">
              <line x1="10" y1="10" x2="80" y2="50" stroke="#4F4F4F" strokeWidth="2" strokeLinecap="round" />
              <line x1="15" y1="60" x2="90" y2="90" stroke="#4F4F4F" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="110" x2="85" y2="140" stroke="#4F4F4F" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <div className="absolute left-8 lg:left-16 bottom-12 opacity-40 hidden lg:block">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
              <path d="M25 0 L27 20 L47 22 L27 24 L25 44 L23 24 L3 22 L23 20 Z" fill="#4F4F4F" />
            </svg>
          </div>

          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl inline-flex items-center gap-2 flex-wrap justify-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span>Hear what employees say about</span>
              <span className="relative inline-block">
                <span className="relative z-10" style={{ fontFamily: 'Irish Grover, sans-serif' }}>iSprout</span>
                <span className="absolute bottom-0 left-0 right-0 h-2 -z-0" style={{ backgroundColor: '#ffde00' }} />
              </span>
            </h2>
            
            <div className="flex justify-center mt-6">
              <div className="p-3 rounded-lg shadow-md cursor-pointer transition-colors" style={{ backgroundColor: '#204758' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2d5a6f';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#204758';
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="17 1 21 5 17 9"></polyline>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                  <polyline points="7 23 3 19 7 15"></polyline>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className="absolute -inset-2 bg-white rounded-[10px] opacity-30 transform rotate-2 shadow-sm" />
                <div className="absolute -inset-1 bg-white rounded-[10px] opacity-50 transform -rotate-1 shadow-sm" />
                
                <div className="relative bg-white rounded-[10px] p-6 transform group-hover:scale-105 transition-transform duration-300" style={{ boxShadow: '0px 4px 16px rgba(0,0,0,0.18)' }}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-[68px] h-[68px] rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 pt-2">
                      <p className="leading-relaxed text-sm lg:text-base" style={{ fontFamily: 'Poppins, sans-serif', color: '#5e6282' }}>
                        {testimonial.text}
                      </p>
                    </div>
                  </div>

                  <div className="ml-[84px]">
                    <p className="font-semibold mb-1 capitalize" style={{ fontFamily: 'Poppins, sans-serif', color: '#5e6282' }}>
                      {testimonial.name}
                    </p>
                    <p className="text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#5e6282' }}>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Overview;
