import React from 'react';
import contactUsHero from "../../assets/contactus/contactus-hero.jpg";

const ContactUsHero: React.FC = () => {
  return (
    <section
      className='relative w-full min-h-[400px] md:min-h-[480px] lg:min-h-[540px] bg-cover bg-center flex items-end'
      style={{ backgroundImage: `url(${contactUsHero})` }}
    >
      <div className='absolute bottom-0 left-0 right-0 z-10 bg-black/20 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24'>
        <h1 className="text-white text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-bold font-['Inter',sans-serif] tracking-tight leading-none">
          Contact Us
        </h1>
      </div>
    </section>
  );
};

export default ContactUsHero;
