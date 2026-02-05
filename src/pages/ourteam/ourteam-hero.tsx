import heroImage from '../../assets/ourteam/ourteam-hero.png';

const OurTeamHero = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden mt-20 sm:mt-16 md:mt-20 lg:mt-24">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="iSprout Leadership Team" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Text with Glassy Black Rectangle Background - Full Width at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/20 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-['Inter',sans-serif] tracking-tight leading-none">
          <span className="text-[#FFD700]">iSprout</span> <span className="text-white">Leadership Team</span>
        </h1>
      </div>
    </section>
  );
};

export default OurTeamHero;