import React from 'react';
import { COLORS } from '../../helpers/constants/Colors';

const SuccessStories = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "Marketing Manager",
      image: "https://i.pravatar.cc/150?img=12",
      quote: "iSprout is a fast growing and well operated Managed office provider. Their office staff is very friendly and efficient.",
      quoteColor: "#6B8EFF"
    },
    {
      name: "Emily Smith",
      role: "Project Manager",
      image: "https://i.pravatar.cc/150?img=5",
      quote: "iSprout is a fast growing and well operated Managed office provider. Their office staff is very friendly and efficient.",
      quoteColor: "#7ED957"
    },
    {
      name: "Michael Johnson",
      role: "Sales Head",
      image: "https://i.pravatar.cc/150?img=33",
      quote: "iSprout is a fast growing and well operated Managed office provider. Their office staff is very friendly and efficient.",
      quoteColor: "#FFD166"
    }
  ];

  return (
    <div className="w-full bg-[#F5F5F5] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Headings */}
        <div className="text-center mb-12">
          <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#6B8EFF' }}>
            Our Success Stories
          </h3>
          <h2 className="text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#2C3E50' }}>
            What The People Think About Us
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-COLORS.white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundColor: COLORS.white }}
            >
              {/* Profile Section */}
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#2C3E50' }}>
                    {testimonial.name}
                  </h4>
                  <p className="text-sm" style={{ fontFamily: 'Outfit, sans-serif', color: '#6B7280' }}>
                    {testimonial.role}
                  </p>
                </div>
                {/* Quote Icon */}
                <div className="ml-auto">
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 40 40" 
                    fill="none"
                    style={{ opacity: 0.3 }}
                  >
                    <path 
                      d="M12 8C8.68629 8 6 10.6863 6 14V18C6 21.3137 8.68629 24 12 24H14C15.1046 24 16 23.1046 16 22V16C16 14.8954 15.1046 14 14 14H10V14C10 12.8954 10.8954 12 12 12H14C15.1046 12 16 11.1046 16 10C16 8.89543 15.1046 8 14 8H12ZM28 8C24.6863 8 22 10.6863 22 14V18C22 21.3137 24.6863 24 28 24H30C31.1046 24 32 23.1046 32 22V16C32 14.8954 31.1046 14 30 14H26V14C26 12.8954 26.8954 12 28 12H30C31.1046 12 32 11.1046 32 10C32 8.89543 31.1046 8 30 8H28Z"
                      fill={testimonial.quoteColor}
                    />
                  </svg>
                </div>
              </div>

              {/* Quote Text */}
              <p 
                className="text-base leading-relaxed" 
                style={{ fontFamily: 'Outfit, sans-serif', color: '#6B7280' }}
              >
                {testimonial.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
