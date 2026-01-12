import React, { useState } from 'react';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO",
      company: "Tech Innovations Inc.",
      text: "iSprout has transformed the way we work. The flexible workspace solutions and professional environment have significantly boosted our team's productivity.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Founder",
      company: "StartUp Hub",
      text: "The amenities and support services at iSprout are exceptional. It's more than just a workspace - it's a community that fosters growth and collaboration.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Director",
      company: "Global Solutions Ltd.",
      text: "Choosing iSprout was one of the best decisions for our business. The premium locations and state-of-the-art facilities have impressed both our team and clients.",
      rating: 5
    }
  ];

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="relative z-10">
            {/* Testimonials Label */}
            <p className="text-sm sm:text-base uppercase tracking-wide mb-4" style={{ color: '#00275c' }}>
              TESTIMONIALS
            </p>

            {/* Heading */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ fontFamily: 'Otomanopee One, sans-serif', color: '#00275c' }}>
                What People Say<br />About Us
              </h2>
            </div>

            {/* Dots Navigation */}
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className="bg-transparent border-0 p-0 cursor-pointer"
                >
                  <div 
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentTestimonial === index 
                        ? 'scale-125' 
                        : 'hover:bg-gray-400'
                    }`}
                    style={{ backgroundColor: currentTestimonial === index ? '#00275c' : '#D1D5DB' }}
                  />
                </button>
              ))}
            </div>

            {/* View More Button */}
            <button 
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
              style={{ 
                backgroundColor: '#FFDE00', 
                color: '#00275c',
                fontFamily: 'Outfit, sans-serif',
                border: '2px solid #00275c'
              }}
            >
              View More
            </button>

            {/* Decorative Spark SVG */}
            <svg 
              className="absolute bottom-20 left-10 w-8 h-8 sm:w-10 sm:h-10" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path 
                d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" 
                fill="#FFDE00"
                stroke="#00275c"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Right Side - Testimonial Card */}
          <div className="relative">
            {/* Yellow Blob Background */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-0"
              style={{
                width: '500px',
                height: '500px',
                backgroundColor: '#FFDE00',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                opacity: 0.3,
                filter: 'blur(20px)'
              }}
            />

            {/* Decorative Sparks SVG */}
            <svg 
              className="absolute top-16 left-8 w-6 h-6 sm:w-8 sm:h-8 z-20" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path 
                d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" 
                fill="#FFDE00"
                stroke="#00275c"
                strokeWidth="1"
              />
            </svg>
            <svg 
              className="absolute bottom-20 right-12 w-8 h-8 sm:w-10 sm:h-10 z-20" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path 
                d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" 
                fill="#FFDE00"
                stroke="#00275c"
                strokeWidth="1"
              />
            </svg>

            {/* Decorative Lines SVG */}
            <svg 
              className="absolute top-0 right-0 w-20 sm:w-24 md:w-28 z-10" 
              viewBox="0 0 100 100"
              fill="none"
            >
              <path 
                d="M10 10 Q 50 30 90 10" 
                stroke="#FFDE00" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              <path 
                d="M10 30 Q 50 50 90 30" 
                stroke="#FFDE00" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              <path 
                d="M10 50 Q 50 70 90 50" 
                stroke="#FFDE00" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
            </svg>

            {/* Testimonial Card */}
            <div 
              className="relative z-10 transition-all duration-500 p-8 sm:p-10 rounded-3xl shadow-2xl"
              style={{ backgroundColor: 'white', border: '3px solid #FFDE00' }}
            >
              {/* Quote Icon */}
              <svg 
                className="w-12 h-12 mb-4" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M4.58341 17.3211C3.55316 16.2274 3 15 3 13.0104C3 9.51092 5.45651 6.37372 9.03059 4.82324L9.92328 6.20085C6.58804 8.00545 5.93618 10.3461 5.67564 11.8221C6.21263 11.5444 6.91558 11.4467 7.60471 11.5106C9.40908 11.6778 10.8312 13.159 10.8312 15C10.8312 16.933 9.26416 18.5 7.33116 18.5C6.2581 18.5 5.23196 18.0095 4.58341 17.3211ZM14.5834 17.3211C13.5532 16.2274 13 15 13 13.0104C13 9.51092 15.4565 6.37372 19.0306 4.82324L19.9233 6.20085C16.588 8.00545 15.9362 10.3461 15.6756 11.8221C16.2126 11.5444 16.9156 11.4467 17.6047 11.5106C19.4091 11.6778 20.8312 13.159 20.8312 15C20.8312 16.933 19.2642 18.5 17.3312 18.5C16.2581 18.5 15.232 18.0095 14.5834 17.3211Z" 
                  fill="#FFDE00"
                />
              </svg>

              {/* Testimonial Text */}
              <p 
                className="text-base sm:text-lg mb-6 leading-relaxed"
                style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}
              >
                {testimonials[currentTestimonial].text}
              </p>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <svg 
                    key={i}
                    className="w-5 h-5" 
                    viewBox="0 0 24 24" 
                    fill="#FFDE00"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                ))}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {/* Avatar Circle */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                  style={{ backgroundColor: '#FFDE00', color: '#00275c' }}
                >
                  {testimonials[currentTestimonial].name.charAt(0)}
                </div>

                {/* Name and Role */}
                <div>
                  <h4 
                    className="font-bold text-lg"
                    style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}
                  >
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p 
                    className="text-sm"
                    style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}
                  >
                    {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
