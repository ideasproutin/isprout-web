import glimpse1 from '../../assets/glimpse/glimpse1.png';
import glimpse2 from '../../assets/glimpse/glimpse2.png';
import glimpse3 from '../../assets/glimpse/glimpse3.png';
import glimpse4 from '../../assets/glimpse/glimpse4.png';
import { COLORS } from '../../helpers/constants/Colors';

const Glimpse = () => {
  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20"
      style={{ backgroundColor: COLORS.white }}
    >
      {/* ✅ SINGLE SOURCE OF HORIZONTAL ALIGNMENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

        {/* Heading */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-[#ffde00] border border-black/20 rounded-tl-[40px] rounded-br-[40px] shadow-md px-6 sm:px-10 md:px-16 py-3 sm:py-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] text-black/80 text-center whitespace-nowrap">
              A Quick Glimpse Inside
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-12 max-w-4xl">
          Imagine walking into a zone where sparks fly, minds meet, and work turns
          into something you genuinely enjoy. That's iSprout's Co-working magic!
        </p>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">

          {/* Top Left */}
          <div className="md:col-span-1 rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
            <img
              src={glimpse1}
              alt="Office space 1"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top Right */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg aspect-[16/9]">
            <img
              src={glimpse2}
              alt="Office space 2"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Left */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg aspect-[16/9]">
            <img
              src={glimpse3}
              alt="Office space 3"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Right */}
          <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
            <img
              src={glimpse4}
              alt="Office space 4"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Glimpse;
