import glimpse1 from '../../assets/glimpse/glimpse1.png';
import glimpse2 from '../../assets/glimpse/glimpse2.png';
import glimpse3 from '../../assets/glimpse/glimpse3.png';
import glimpse4 from '../../assets/glimpse/glimpse4.png';

const Glimpse = () => {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Yellow Heading Badge */}
        <div className="flex items-start mb-8 sm:mb-12">
          <div 
            className="relative px-8 sm:px-12 py-4 sm:py-5 rounded-r-full"
            style={{ backgroundColor: '#FFDE00' }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              A Quick Glimpse Inside
            </h2>
            {/* Arrow Pointer on Right */}
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0"
              style={{
                borderTop: '30px solid transparent',
                borderBottom: '30px solid transparent',
                borderLeft: '30px solid #FFDE00'
              }}
            />
          </div>
        </div>

        {/* Description Text */}
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-12 max-w-4xl">
          Imagine walking into a zone where sparks fly, minds meet, and work turns into something you genuinely enjoy. That's iSprout's Co-working magic!
        </p>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Top Left - Small Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={glimpse1} 
                alt="Office space 1" 
                className="w-full h-64 sm:h-72 object-cover"
              />
            </div>
          </div>

          {/* Top Right - Large Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={glimpse2} 
              alt="Office space 2" 
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>

          {/* Bottom Left - Large Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={glimpse3} 
              alt="Office space 3" 
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>

          {/* Bottom Right - Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={glimpse4} 
              alt="Office space 4" 
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Glimpse;
