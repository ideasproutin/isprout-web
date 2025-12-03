import React, { useState } from 'react';
import headingImage from '../../../assets/testimonials/testimonialsHeading.png';
import subheadingImage from '../../../assets/testimonials/testimonialsSubheading.png';
import testimonial1 from '../../../assets/testimonials/testimonial1.png';
import testimonial2 from '../../../assets/testimonials/testimonial2.png';
import testimonial3 from '../../../assets/testimonials/testimonial3.png';
import yellowBlob from '../../../assets/testimonials/yellowblob.png';
import spark from '../../../assets/testimonials/spark.png';
import dots from '../../../assets/testimonials/dots.png';
import viewMoreBtn from '../../../assets/testimonials/View More (1).png';
import line1 from '../../../assets/testimonials/Line 1.png';
import line2 from '../../../assets/testimonials/Line 2.png';
import line3 from '../../../assets/testimonials/Line 3.png';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { image: testimonial1, line: line1 },
    { image: testimonial2, line: line2 },
    { image: testimonial3, line: line3 }
  ];

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="relative z-10">
            {/* Testimonials Label */}
            <p className="text-sm sm:text-base text-gray-500 uppercase tracking-wide mb-4">
              TESTIMONIALS
            </p>

            {/* Heading */}
            <div className="mb-6 sm:mb-8">
              <img 
                src={headingImage} 
                alt="What People Say About Us" 
                className="max-w-full h-auto w-full sm:w-11/12 md:w-10/12"
              />
            </div>

            {/* Dots Navigation */}
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className="bg-transparent border-0 p-0"
                >
                  <div 
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentTestimonial === index 
                        ? 'bg-gray-900 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* View More Button */}
            <button className="hover:opacity-80 transition-opacity">
              <img 
                src={viewMoreBtn} 
                alt="View More" 
                className="h-10 sm:h-12 w-auto"
              />
            </button>

            {/* Decorative Spark */}
            <img 
              src={spark} 
              alt="" 
              className="absolute bottom-20 left-10 w-8 h-8 sm:w-10 sm:h-10"
            />
          </div>

          {/* Right Side - Testimonial Card */}
          <div className="relative">
            {/* Yellow Blob Background */}
            <img 
              src={yellowBlob} 
              alt="" 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-0"
            />

            {/* Decorative Sparks */}
            <img 
              src={spark} 
              alt="" 
              className="absolute top-16 left-8 w-6 h-6 sm:w-8 sm:h-8 z-20"
            />
            <img 
              src={spark} 
              alt="" 
              className="absolute bottom-20 right-12 w-8 h-8 sm:w-10 sm:h-10 z-20"
            />

            {/* Decorative Lines */}
            <img 
              src={testimonials[currentTestimonial].line} 
              alt="" 
              className="absolute top-0 right-0 w-20 sm:w-24 md:w-28 z-10"
            />

            {/* Testimonial Card */}
            <div className="relative z-10 transition-all duration-500">
              <img 
                src={testimonials[currentTestimonial].image} 
                alt="Testimonial" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
