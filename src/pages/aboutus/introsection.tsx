import React, { useState, useEffect } from "react";
import aboutusImg1 from '../../assets/aboutus_intro/aboutus-hero1.jpg';
import aboutusImg2 from '../../assets/aboutus_intro/aboutus-hero2.jpg';
import aboutusImg3 from '../../assets/aboutus_intro/aboutus-hero3.jpg';

const IntroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    aboutusImg1,
    aboutusImg2,
    aboutusImg3,
  ];

  // Auto-play carousel every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className='relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden flex items-end'>
      {/* Carousel Images */}
      <div className='absolute inset-0'>
        {slides.map((slide, index) => (
          <div
            key={index}
            className='absolute inset-0 transition-opacity duration-1000 ease-in-out'
            style={{
              opacity: index === currentSlide ? 1 : 0,
              zIndex: index === currentSlide ? 1 : 0,
            }}
          >
            <img 
              src={slide} 
              alt={`About Us ${index + 1}`}
              className='w-full h-full object-cover'
            />
          </div>
        ))}
        {/* Overlay */}
        <div className='absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent' style={{ zIndex: 5 }} />
      </div>

      {/* Title */}
      <div className='absolute bottom-0 left-0 right-0 bg-black/20 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24' style={{ zIndex: 10 }}>
        <h1 className="text-white text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-bold font-['Inter',sans-serif] tracking-tight leading-none">
          About Us
        </h1>
      </div>
    </section>
  );
};
 
export default IntroSection;
 
 