import glimpse1 from '../../assets/glimpse/glimpse1.png';
import glimpse2 from '../../assets/glimpse/glimpse2.png';
import glimpse3 from '../../assets/glimpse/glimpse3.png';
import glimpse4 from '../../assets/glimpse/glimpse4.png';
import { COLORS } from '../../helpers/constants/Colors';

const Glimpse = () => {
  return (
    <div className="py-8 md:py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Badge */}
        <div className="flex justify-center mb-8">
          <div className="px-8 py-3" style={{ backgroundColor: '#FFDE00', borderRadius: '100px 8px 100px 8px' }}>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
              A Quick Glimpse Inside
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-center text-base md:text-lg mb-12 mx-auto" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Imagine walking into a zone where sparks fly, minds meet, and work turns into something you genuinely enjoy. That's iSprout's Co-working magic!
        </p>

        {/* Image Grid */}
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

          {/* Bottom Left – Wide */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={glimpse3}
              alt="Office space 3"
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>

          {/* Bottom Right – Narrow */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={glimpse4}
              alt="Office space 4"
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Glimpse;
