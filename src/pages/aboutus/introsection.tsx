import React, { useState, useEffect } from "react";
import aboutUsData from "../../content/aboutus.json";
import { useAboutUs } from "../../hooks/useAboutUs"; 


const IntroSection: React.FC = () => {
  const { data: aboutUsApiData } = useAboutUs();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides: string[] = aboutUsApiData ? aboutUsApiData.introSection.slides : aboutUsData.introSection.slides;
  

  // Auto-play carousel every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);


  return (
    <section className='relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden flex items-end mt-20 sm:mt-16 md:mt-20 lg:mt-24'>
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
      </div>
    </section>
  );
};
 
export default IntroSection;
 
 
