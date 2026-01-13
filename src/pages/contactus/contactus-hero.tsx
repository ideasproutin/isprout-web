import React from 'react';
import contactHero1 from "../../assets/contactus/contact-hero1.png";
import contactHero2 from "../../assets/contactus/contact-hero2.png";
import contactHero3 from "../../assets/contactus/contact-hero3.png";

const ContactUsHero: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
            {/* Left Building Image */}
            <div className="md:col-span-3">
              <img 
                src={contactHero1} 
                alt="Building" 
                className="w-full h-48 md:h-56 object-cover rounded-lg" 
              />
            </div>

            {/* Center Yellow Section */}
            <div className="md:col-span-6 bg-[#ffde00] rounded-lg flex flex-col items-center justify-center p-6 md:p-8 h-48 md:h-56">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
                CONTACT US
              </h1>
              <p className="text-[#5a5a5a] text-center text-sm md:text-base lg:text-lg max-w-lg">
                Got a question, need a workspace, or just want to say hi?<br />
                Fill out the form and our team will get back to you shortly.
              </p>
            </div>

            {/* Right Building Image */}
            <div className="md:col-span-3">
              <img 
                src={contactHero2} 
                alt="Building" 
                className="w-full h-48 md:h-56 object-cover rounded-lg" 
              />
            </div>
          </div>

          {/* Bottom Interior Image */}
          <div className="mb-4">
            <img 
              src={contactHero3} 
              alt="Interior" 
              className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsHero;
