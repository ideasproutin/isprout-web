import { useState, useEffect } from 'react';
import testimonial1 from '../../assets/testimonials/testimonial1.png';
import testimonial2 from '../../assets/testimonials/testimonial2.png';
import testimonial3 from '../../assets/testimonials/testimonial3.png';
import testimonialsHeading from '../../assets/testimonials/testimonialsHeading.png';import { COLORS } from '../../helpers/constants/Colors';
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Vinay Varma',
    role: 'CEO',
    company: 'iSprout Purva Summit',
    text: "iSprout is a fast growing and well operated Managed office provider. Their office staff is very friendly and efficient. Unique office themes, clean and well-maintained premises, top class amenities offer a very productive ambience. Our team loves it.",
    image: testimonial1
  },
  {
    id: 2,
    name: 'Sahil Dutt',
    role: 'Manager',
    company: 'Tech Innovations',
    text: 'Outstanding workspace solutions that have transformed how our team collaborates. The attention to detail and commitment to excellence is evident in every aspect of their service.',
    image: testimonial2
  },
  {
    id: 3,
    name: 'Dilip Smith',
    role: 'Developer',
    company: 'Creative Studios',
    text: 'The perfect blend of professional environment and creative inspiration. Facilities are top-notch, the community is vibrant, and the flexibility they offer is exactly what modern businesses need.',
    image: testimonial3
  },
  {
    id: 4,
    name: 'Emily Chen',
    role: 'Founder',
    company: 'StartUp Hub',
    text: 'From day one, the experience has been exceptional. The modern amenities, responsive management team, and inspiring workspace design have made this the ideal location for our startup to thrive.',
    image: testimonial1
  }
];

// Arc positions scaled down for laptop screens - images positioned ON the ring
const arcPositions = [
  { left: '60px', top: '70px', size: 100, opacity: 1 },        // Top position on arc
  { left: '155px', top: '280px', size: 133, opacity: 1 },       // Center position on arc (active)
  { left: '60px', top: '515px', size: 100, opacity: 1 },       // Bottom position on arc
  { left: '60px', top: '650px', size: 80, opacity: 0 }         // Hidden below arc
];

const Testimonials = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % testimonials.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const getTestimonialAtPosition = (position: number) => {
    return testimonials[(currentStep + position) % testimonials.length];
  };

  const activeTestimonial = getTestimonialAtPosition(1);

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: COLORS.white }}>
      {/* Header Section */}
      <div className="relative w-full h-[350px] flex items-center justify-start px-8 lg:px-16" style={{ backgroundColor: COLORS.white }}>
        {/* Yellow circular blob background */}
        <div 
          className="absolute right-0 top-0 w-[400px] h-[350px] rounded-l-full"
          style={{ backgroundColor: '#FFDE00' }}
        />
        
        {/* Good It Pay Day image circle */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full overflow-hidden border-8 border-white shadow-xl z-10">
          <img 
            src={testimonialsHeading} 
            alt="Good It Pay Day"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text content */}
        <div className="relative z-20 max-w-xl">
          <h1 
            className="text-5xl lg:text-6xl mb-4"
            style={{ fontFamily: 'Otomanopee One, sans-serif', color: '#000' }}
          >
            TESTIMONIALS
          </h1>
          <p 
            className="text-base lg:text-lg leading-relaxed"
            style={{ fontFamily: 'Outfit, sans-serif', color: '#000' }}
          >
            Purely 10 hear some way talk from the <br />
            iSprout family! Can't take it customers and <br />
            employees alike share their experiences of <br />
            evolving with us.
          </p>
        </div>
      </div>

      {/* Testimonials Carousel Section */}
      <div className="relative w-full flex items-center justify-center py-12 px-8">
        <div className="relative w-full max-w-[1100px] h-[650px]">
          
          {/* Semi-circular Ring */}
          <div className="absolute h-[540px] left-[-75px] top-[70px] w-[320px]">
            <div className="absolute bottom-[-0.99%] left-[-1.88%] right-0 top-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 489 817">
                <g filter="url(#filter0_d_1_31)">
                  <path d="M480.353 4C480.353 155.667 480.353 459 480.353 459C480.353 459 467.686 628.333 393.353 717C319.02 805.667 186.353 809 186.353 809L9.35303 809L13.353 4L480.353 4Z" fill="black" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="817" id="filter0_d_1_31" width="488.353" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dx="-5" dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.870588 0 0 0 0 0 0 0 0 0.44 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_31" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_31" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>

          {/* Animated Profile Images */}
          {[0, 1, 2, 3].map((position) => {
            const testimonial = getTestimonialAtPosition(position);
            const pos = arcPositions[position];
            
            return (
              <div
                key={`${testimonial.id}-${position}`}
                className="absolute transition-all duration-[900ms] ease-in-out rounded-full overflow-hidden shadow-lg"
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: `${pos.size}px`,
                  height: `${pos.size}px`,
                  opacity: pos.opacity,
                  zIndex: position === 1 ? 10 : 5,
                  border: '4px solid white'
                }}
              >
                <img 
                  alt={testimonial.name} 
                  className="w-full h-full object-cover" 
                  src={testimonial.image}
                />
              </div>
            );
          })}

          {/* Yellow Quote Icon */}
          <div className="absolute h-[60px] left-[350px] top-[240px] w-[65px] opacity-25">
            <div className="absolute bottom-[-10.96%] left-[-5%] right-[-5%] top-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 81">
                <g filter="url(#filter0_d_1_27)">
                  <path d="M19 32.76C19 21.24 23.56 12.4 32.68 6.24C27.16 11.12 24.76 17.36 24.76 24.28C24.76 27.88 25.72 30.52 27.64 32.2C25.24 34.36 24.04 36.92 24.04 40.24C24.04 46.96 28.84 51.76 35.56 51.76C42.28 51.76 47.08 46.96 47.08 40.24C47.08 32.68 42.52 25.48 35.56 22.12C25.48 18.52 15.4 24.52 15.4 37.48C15.4 48.28 23.32 56.2 33.88 56.2V49.96C27.88 49.96 19 43.36 19 32.76ZM55.48 32.76C55.48 21.24 60.04 12.4 69.16 6.24C63.64 11.12 61.24 17.36 61.24 24.28C61.24 27.88 62.2 30.52 64.12 32.2C61.72 34.36 60.52 36.92 60.52 40.24C60.52 46.96 65.32 51.76 72.04 51.76C78.76 51.76 83.56 46.96 83.56 40.24C83.56 32.68 79 25.48 72.04 22.12C61.96 18.52 51.88 24.52 51.88 37.48C51.88 48.28 59.8 56.2 70.36 56.2V49.96C64.36 49.96 55.48 43.36 55.48 32.76Z" fill="#FFDE00" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="81" id="filter0_d_1_27" width="88" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_27" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_27" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>

          {/* Testimonial Content - Animated */}
          <div
            key={activeTestimonial.id}
            className="absolute left-[420px] top-[280px]"
            style={{
              animation: 'fadeSlideIn 600ms ease-out'
            }}
          >
            {/* Name */}
            <p className="font-medium leading-[normal] text-black mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {activeTestimonial.name}
            </p>

            {/* Subtitle */}
            <p className="font-medium leading-[normal] text-[11px] mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: '#5a5a5a' }}>
              {activeTestimonial.role}, {activeTestimonial.company}
            </p>

            {/* Stars */}
            <div className="flex gap-[2px] mb-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-[14.2px] w-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 15">
                    <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="#FFDE00" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="font-medium leading-[150%] text-black max-w-[530px]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {activeTestimonial.text}
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial Cards Section */}
      <div className="py-16 px-8" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 
              className="text-3xl lg:text-4xl font-semibold mb-2"
              style={{ fontFamily: 'Outfit, sans-serif', color: '#000' }}
            >
              See Success Stories
            </h2>
            <p 
              className="text-xl"
              style={{ fontFamily: 'Outfit, sans-serif', color: '#000' }}
            >
              What The People Think About Us
            </p>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Sahil Dutt', company: 'Manager', text: 'iSprout is fast growing and well operated Managed office provider. Their office staff is very friendly and efficient.' },
              { name: 'Emily Smith', company: 'Tech Innovations', text: 'iSprout is fast growing and well operated Managed office provider. Their office staff is very friendly and efficient.' },
              { name: 'Michael Johnson', company: 'Developer', text: 'iSprout is fast growing and well operated Managed office provider. Their office staff is very friendly and efficient.' },
              { name: 'Rahul Gupta', company: 'CEO', text: 'iSprout is fast growing and well operated Managed office provider. Their office staff is very friendly and efficient.' },
              { name: 'Dilip Smith', company: 'Manager', text: 'iSprout is fast growing and well operated Managed office provider. Their office staff is very friendly and efficient.' },
              { name: 'Michael Johnson', company: 'Developer', text: 'iSprout is fast growing and well operated Managed office provider. Their office staff is very friendly and efficient.' },
              { name: 'Sahil Dutt', company: 'Manager', text: 'iSprout is fast growing and well operated Managed office provider. Their office staff is very friendly and efficient.' },
              { name: 'Dilip Smith', company: 'Tech Lead', text: 'iSprout is fast growing and well operated Managed office provider. Their office staff is very friendly and efficient.' },
              { name: 'Michael Johnson', company: 'Developer', text: 'iSprout is fast growing and well operated Managed office provider. Their office staff is very friendly and efficient.' }
            ].map((card, idx) => (
              <div 
                key={idx}
                className="rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                style={{ backgroundColor: COLORS.white }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    <img 
                      src={testimonials[idx % 3].image} 
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 
                      className="font-semibold text-sm"
                      style={{ fontFamily: 'Outfit, sans-serif', color: '#000' }}
                    >
                      {card.name}
                    </h4>
                    <p 
                      className="text-xs"
                      style={{ fontFamily: 'Outfit, sans-serif', color: '#5a5a5a' }}
                    >
                      {card.company}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path 
                        d="M7 9L5 7L3 9M7 5C7 7 5 9 3 11M17 15L19 17L21 15M17 19C17 17 19 15 21 13" 
                        stroke="#FFDE00" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: 'Outfit, sans-serif', color: '#5a5a5a' }}
                >
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
