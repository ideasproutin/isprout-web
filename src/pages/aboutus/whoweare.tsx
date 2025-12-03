import blueArrow from '../../assets/whoweare/bluearrow.png';
import whoweareCard from '../../assets/whoweare/whoweare_card.png';
import whoweare1 from '../../assets/whoweare/whoweare1.png';
import whoweare2 from '../../assets/whoweare/whoweare2.png';
import whoweare3 from '../../assets/whoweare/whoweare3.png';
import whoweare4 from '../../assets/whoweare/whoweare4.png';

const WhoWeAre = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Blue Arrow */}
        <div className="flex justify-start mb-8">
          <img src={blueArrow} alt="" className="h-12 sm:h-16 md:h-20 w-auto" />
        </div>

        {/* Who we are */}
        <div className="relative">
          <img src={whoweareCard} alt="" className="w-full h-auto" />
          <div className="absolute inset-0 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h2 className="font-['Outfit:Bold',sans-serif] text-2xl sm:text-3xl md:text-4xl">Who we are</h2>
              <img src={whoweare1} alt="" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
            </div>
            <p className="font-['Outfit:Regular',sans-serif] text-base sm:text-lg md:text-xl lg:text-2xl text-[#204758] max-w-4xl mt-4">
              iSprout is a community-driven workspace brand that blends creativity, comfort, and professionalism. 
              We design environments where people love to show up, collaborate, and build meaningful work every day.
            </p>
          </div>
        </div>

        {/* What we do */}
        <div className="relative">
          <img src={whoweareCard} alt="" className="w-full h-auto" />
          <div className="absolute inset-0 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h2 className="font-['Outfit:Bold',sans-serif] text-2xl sm:text-3xl md:text-4xl">What we do</h2>
              <img src={whoweare2} alt="" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
            </div>
            <p className="font-['Outfit:Regular',sans-serif] text-base sm:text-lg md:text-xl lg:text-2xl text-[#204758] max-w-4xl mt-4">
              We transform prime locations into high-performance workspaces equipped with modern design, premium amenities, 
              and seamless support. From private offices to enterprise solutions, we create flexible spaces tailored to every business need.
            </p>
          </div>
        </div>

        {/* How we help */}
        <div className="relative">
          <img src={whoweareCard} alt="" className="w-full h-auto" />
          <div className="absolute inset-0 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h2 className="font-['Outfit:Bold',sans-serif] text-2xl sm:text-3xl md:text-4xl">How we help</h2>
              <img src={whoweare3} alt="" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
            </div>
            <p className="font-['Outfit:Regular',sans-serif] text-base sm:text-lg md:text-xl lg:text-2xl text-[#204758] max-w-4xl mt-4">
              By taking care of operations, utilities, and day-to-day workspace management, we free teams to focus on what truly matters — their work. 
              Our vibrant ecosystem boosts productivity, fosters innovation, and supports business growth effortlessly.
            </p>
          </div>
        </div>

        {/* Creating success stories */}
        <div className="relative">
          <img src={whoweareCard} alt="" className="w-full h-auto" />
          <div className="absolute inset-0 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h2 className="font-['Outfit:Bold',sans-serif] text-2xl sm:text-3xl md:text-4xl">Creating success stories</h2>
              <img src={whoweare4} alt="" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
            </div>
            <p className="font-['Outfit:Regular',sans-serif] text-base sm:text-lg md:text-xl lg:text-2xl text-[#204758] max-w-4xl mt-4">
              With thousands of members across multiple cities, we've helped startups scale, enterprises expand, and teams thrive. 
              Every workspace we build is designed to inspire success and create stories worth celebrating.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;