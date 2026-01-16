import img1 from '../../assets/meetingroom/meetingroom_glimpse1.png';
import img2 from '../../assets/meetingroom/meetingroom_glimpse2.png';
import img3 from '../../assets/meetingroom/meetingroom_glimpse3.png';
import img4 from '../../assets/meetingroom/meetingroom_glimpse4.png';
import { COLORS } from '../../helpers/constants/Colors';

const MeetingRoomGlimpse = () => {
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
          iSprout Meeting Rooms are designed to help teams collaborate, present, and create with complete focus. From boardrooms to discussion rooms, every space is equipped with premium amenities to deliver a smooth and professional meeting experience.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
  
          {/* Top Left – Narrow */}
          <div className="md:col-span-1 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={img1}
              alt="Meeting Room 1"
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>

          {/* Top Right – Wide */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={img2}
              alt="Meeting Room 2"
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>

          {/* Bottom Left – Wide */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={img3}
              alt="Meeting Room 3"
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>

          {/* Bottom Right – Narrow */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={img4}
              alt="Meeting Room 4"
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>

        </div>

        {/* Book Meeting Room Button */}
        <div className="flex justify-center mt-12">
          <button 
            className="flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold transition-colors"
            style={{ 
              backgroundColor: '#FFDE00',
              color: '#00275c',
              fontFamily: 'Outfit, sans-serif'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6c900'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFDE00'}
          >
            <span className="text-2xl">💻</span>
            <span>Book Meeting Room Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoomGlimpse;

