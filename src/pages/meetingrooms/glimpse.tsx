import img1 from '../../assets/meetingroom/meetingroom_glimpse1.png';
import img2 from '../../assets/meetingroom/meetingroom_glimpse2.png';
import img3 from '../../assets/meetingroom/meetingroom_glimpse3.png';
import img4 from '../../assets/meetingroom/meetingroom_glimpse4.png';

const MeetingRoomGlimpse = () => {
  return (
    <div className="bg-white py-12 md:py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Badge */}
        <div className="flex justify-center mb-8">
          <div className="rounded-full px-8 py-3" style={{ backgroundColor: '#FFDE00' }}>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
              A Quick Glimpse Inside
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-center text-base md:text-lg mb-12 max-w-4xl mx-auto" style={{ fontFamily: 'Outfit, sans-serif' }}>
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
              color: '#204758',
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
