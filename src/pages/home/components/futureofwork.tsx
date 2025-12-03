import { useState } from 'react';
import headingImage from '../../../assets/futureofwork/Intro section.png';
import slide1 from '../../../assets/futureofwork/Slide Item — 1.png';
import slide2 from '../../../assets/futureofwork/Slide Item — 2.png';
import slide3 from '../../../assets/futureofwork/Slide Item — 3.png';
import slide4 from '../../../assets/futureofwork/Slide Item — 4.png';
import slide5 from '../../../assets/futureofwork/Slide Item — 5.png';
import leftArrow from '../../../assets/futureofwork/Click Area.png';
import rightArrow from '../../../assets/futureofwork/Click Area (1).png';
import dotIndicator from '../../../assets/futureofwork/Dot indictaor — 3.png';

const slides = [slide1, slide2, slide3, slide4, slide5];

function IntroSection() {
  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10" data-name="Intro section">
      <img 
        src={headingImage} 
        alt="The Future of Work, Built Today!" 
        className="max-w-full h-auto w-full sm:w-4/5 md:w-3/4 lg:w-2/3"
      />
    </div>
  );
}

function SlideItem({ src, position, currentSlide }: { src: string; position: number; currentSlide: number }) {
  const getSlideStyles = () => {
    const diff = position - currentSlide;
    
    // Normalize the difference to handle wrapping
    let normalizedDiff = diff;
    if (Math.abs(diff) > 2) {
      normalizedDiff = diff > 0 ? diff - 5 : diff + 5;
    }
    
    // Hide slides that are too far away
    if (Math.abs(normalizedDiff) > 2) {
      return {
        className: "opacity-0 scale-75 z-0",
        style: { display: "none" }
      };
    }
    
    // Center slide (active)
    if (normalizedDiff === 0) {
      return {
        className: "opacity-100 scale-100 z-30 left-[50%] -translate-x-1/2 inset-y-0 w-[45%] md:w-[55%] sm:w-[70%]",
        style: {}
      };
    }
    
    // Right slide (+1)
    if (normalizedDiff === 1) {
      return {
        className: "opacity-60 scale-75 z-20 left-[60%] md:left-[65%] sm:left-[70%] inset-y-[80px] sm:inset-y-[40px] right-0 w-[28%] md:w-[25%] sm:w-[22%]",
        style: {}
      };
    }
    
    // Far right slide (+2)
    if (normalizedDiff === 2) {
      return {
        className: "opacity-40 scale-50 z-10 left-[78%] sm:left-[83%] inset-y-[80px] sm:inset-y-[40px] right-0 w-[18%] sm:w-[13%]",
        style: {}
      };
    }
    
    // Left slide (-1)
    if (normalizedDiff === -1) {
      return {
        className: "opacity-60 scale-75 z-20 right-[60%] md:right-[65%] sm:right-[70%] inset-y-[80px] sm:inset-y-[40px] left-0 w-[28%] md:w-[25%] sm:w-[22%]",
        style: {}
      };
    }
    
    // Far left slide (-2)
    if (normalizedDiff === -2) {
      return {
        className: "opacity-40 scale-50 z-10 right-[78%] sm:right-[83%] inset-y-[80px] sm:inset-y-[40px] left-0 w-[18%] sm:w-[13%]",
        style: {}
      };
    }
    
    return {
      className: "opacity-0 scale-75 z-0",
      style: { display: "none" }
    };
  };
  
  const slideStyles = getSlideStyles();
  
  return (
    <div 
      className={`absolute bg-white overflow-clip rounded-[40px] sm:rounded-[20px] transition-all duration-500 ease-in-out ${slideStyles.className}`}
      style={slideStyles.style}
      data-name={`Slide Item — ${position + 1}`}
    >
      <img 
        alt={`Slide ${position + 1}`} 
        className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" 
        src={src} 
      />
    </div>
  );
}

function SlideList({ currentSlide }: { currentSlide: number }) {
  return (
    <div 
      className="absolute bottom-0 left-10 sm:left-5 right-10 sm:right-5 top-0" 
      data-name="Slide List"
    >
      {slides.map((slide, index) => (
        <SlideItem key={index} src={slide} position={index} currentSlide={currentSlide} />
      ))}
    </div>
  );
}

function SlidesBox({ currentSlide }: { currentSlide: number }) {
  return (
    <div className="grow min-h-px min-w-px relative shrink-0 w-full" data-name="Slides Box">
      <SlideList currentSlide={currentSlide} />
    </div>
  );
}

function ArrowLeft({ onClick }: { onClick: () => void }) {
  return (
    <button 
      className="relative shrink-0 cursor-pointer hover:opacity-70 transition-opacity bg-transparent border-0 p-0" 
      data-name="Arrow Left"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <img 
        src={leftArrow} 
        alt="Previous"
        className="w-6 h-6 sm:w-7 sm:h-7"
      />
    </button>
  );
}

function ArrowRight({ onClick }: { onClick: () => void }) {
  return (
    <button 
      className="relative shrink-0 cursor-pointer hover:opacity-70 transition-opacity bg-transparent border-0 p-0" 
      data-name="Arrow Right"
      onClick={onClick}
      aria-label="Next slide"
    >
      <img 
        src={rightArrow} 
        alt="Next"
        className="w-6 h-6 sm:w-7 sm:h-7"
      />
    </button>
  );
}

function DotIndicator({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  return (
    <button 
      className={`relative shrink-0 cursor-pointer hover:opacity-80 transition-all bg-transparent border-0 p-0 ${
        isActive ? 'scale-110' : 'opacity-50'
      }`}
      data-name="Dot indicator"
      onClick={onClick}
      aria-label={isActive ? "Active slide" : "Navigate to slide"}
    >
      <img 
        src={dotIndicator} 
        alt=""
        className="w-1.5 h-1.5"
      />
    </button>
  );
}

function SlideIndicator({ currentSlide, totalSlides, onDotClick }: { currentSlide: number; totalSlides: number; onDotClick: (index: number) => void }) {
  return (
    <div className="flex gap-px items-center p-2 relative shrink-0" data-name="Slide indicator">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <DotIndicator 
          key={index} 
          isActive={index === currentSlide}
          onClick={() => onDotClick(index)}
        />
      ))}
    </div>
  );
}

function SlidesNavigation({ currentSlide, totalSlides, onPrevious, onNext, onDotClick }: { 
  currentSlide: number; 
  totalSlides: number; 
  onPrevious: () => void; 
  onNext: () => void;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="flex gap-2 items-center justify-center p-2 relative shrink-0" data-name="Slides navigation">
      <ArrowLeft onClick={onPrevious} />
      <SlideIndicator currentSlide={currentSlide} totalSlides={totalSlides} onDotClick={onDotClick} />
      <ArrowRight onClick={onNext} />
    </div>
  );
}

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;
  
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };
  
  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="flex flex-col gap-6 h-[560px] sm:h-[400px] items-center px-16 md:px-8 sm:px-4 py-10 sm:py-5 relative shrink-0 w-full max-w-[1428px]" data-name="Carousel">
      <SlidesBox currentSlide={currentSlide} />
      <SlidesNavigation 
        currentSlide={currentSlide} 
        totalSlides={totalSlides}
        onPrevious={goToPreviousSlide}
        onNext={goToNextSlide}
        onDotClick={goToSlide}
      />
    </div>
  );
}

export default function FutureOfWork() {
  return (
    <div className="bg-white w-full flex flex-col items-center justify-center py-20 sm:py-12" data-name="FutureOfWork">
      <div className="flex flex-col gap-16 sm:gap-8 items-center w-full px-5">
        <IntroSection />
        <Carousel />
      </div>
    </div>
  );
}
