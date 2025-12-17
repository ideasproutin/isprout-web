import blueArrow from '../../assets/whoweare/bluearrow.png';
import whoweare1 from '../../assets/whoweare/whoweare1.png';
import whoweare2 from '../../assets/whoweare/whoweare2.png';
import whoweare3 from '../../assets/whoweare/whoweare3.png';
import whoweare4 from '../../assets/whoweare/whoweare4.png';

const WhoWeAre = () => {
  return (
    <section className="py-0 px-4 sm:px-6 lg:px-8 -mt-24 pb-12 md:pb-16">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Blue Arrow */}
        <div className="flex justify-start mb-2">
          <img src={blueArrow} alt="" className="h-12 sm:h-16 md:h-20 w-auto" />
        </div>

        {/* Who we are */}
        <div className="relative rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 shadow-lg" style={{ backgroundColor: '#FFF9E6' }}>
          <div className="flex flex-col justify-between min-h-[150px]">
            <div className="flex justify-between items-start">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>Who we are</h2>
              <img src={whoweare1} alt="" className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12" />
            </div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mt-3" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
              iSprout is a community-driven workspace brand that blends creativity, comfort, and professionalism. 
              We design environments where people love to show up, collaborate, and build meaningful work every day.
            </p>
          </div>
        </div>

        {/* What we do */}
        <div className="relative rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 shadow-lg" style={{ backgroundColor: '#FFF9E6' }}>
          <div className="flex flex-col justify-between min-h-[150px]">
            <div className="flex justify-between items-start">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>What we do</h2>
              <img src={whoweare2} alt="" className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12" />
            </div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mt-3" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
              We transform prime locations into high-performance workspaces equipped with modern design, premium amenities, 
              and seamless support. From private offices to enterprise solutions, we create flexible spaces tailored to every business need.
            </p>
          </div>
        </div>

        {/* How we help */}
        <div className="relative rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 shadow-lg" style={{ backgroundColor: '#FFF9E6' }}>
          <div className="flex flex-col justify-between min-h-[150px]">
            <div className="flex justify-between items-start">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>How we help</h2>
              <img src={whoweare3} alt="" className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12" />
            </div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mt-3" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
              By taking care of operations, utilities, and day-to-day workspace management, we free teams to focus on what truly matters — their work. 
              Our vibrant ecosystem boosts productivity, fosters innovation, and supports business growth effortlessly.
            </p>
          </div>
        </div>

        {/* Creating success stories */}
        <div className="relative rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 shadow-lg" style={{ backgroundColor: '#FFF9E6' }}>
          <div className="flex flex-col justify-between min-h-[150px]">
            <div className="flex justify-between items-start">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>Creating success stories</h2>
              <img src={whoweare4} alt="" className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12" />
            </div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mt-3" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
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