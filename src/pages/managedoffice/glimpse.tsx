import glimpse1 from '../../assets/glimpse/glimpse1.png';
import glimpse2 from '../../assets/glimpse/glimpse2.png';
import glimpse3 from '../../assets/glimpse/glimpse3.png';
import glimpse4 from '../../assets/glimpse/glimpse4.png';
import { COLORS } from '../../helpers/constants/Colors';

const Glimpse = () => {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Yellow Heading Badge */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-[#ffde00] border border-[rgba(0,0,0,0.12)] border-solid rounded-tl-[40px] rounded-br-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-[65px] py-[17.5px]">
            <h2 className="text-[48px] leading-normal text-[rgba(0,0,0,0.83)] whitespace-nowrap">
              A Quick Glimpse Inside
            </h2>
          </div>
        </div>

        {/* Description Text */}
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-12 max-w-4xl">
          Imagine walking into a zone where sparks fly, minds meet, and work turns into something you genuinely enjoy. That's iSprout's Co-working magic!
        </p>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
  
  {/* Top Left – Narrow */}
  <div className="md:col-span-1 rounded-2xl overflow-hidden shadow-lg">
    <img
      src={glimpse1}
      alt="Office space 1"
      className="w-full h-64 sm:h-72 object-cover"
    />
  </div>

  {/* Top Right – Wide */}
  <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg">
    <img
      src={glimpse2}
      alt="Office space 2"
      className="w-full h-64 sm:h-72 object-cover"
    />
  </div>

  {/* Bottom Left */}
  <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg">
    <img
      src={glimpse3}
      alt="Office space 3"
      className="w-full h-64 sm:h-72 object-cover"
    />
  </div>

  {/* Bottom Right */}
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
