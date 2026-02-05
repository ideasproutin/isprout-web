import React from 'react';
import contactUsHero from "../../assets/contactus/contactus-hero.jpg";

const ContactUsHero: React.FC = () => {
  return (
    <section
      className='relative w-full min-h-[400px] md:min-h-[480px] lg:min-h-[540px] bg-cover bg-center flex items-end mt-20 sm:mt-16 md:mt-20 lg:mt-24'
      style={{ backgroundImage: `url(${contactUsHero})` }}
    >
      <div className='absolute bottom-0 left-0 right-0 z-10 bg-black/20 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24'>
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-['Inter',sans-serif] tracking-tight leading-none">
          Contact Us
        </h1>
      </div>
    </section>
  );
};

export default ContactUsHero;
