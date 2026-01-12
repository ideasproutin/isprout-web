import { COLORS } from '../../helpers/constants/Colors';

const MeetingRoomFAQ = () => {
  return (
    <div className="py-12 md:py-20 px-4 md:px-8 lg:px-16" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
          FAQs
        </h2>

        <div className="space-y-6">
          {/* FAQ 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
              1. Can I book a meeting room for just one hour?
            </h3>
            <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
              Yes, iSprout offers flexible hourly, half-day, and full-day bookings.
            </p>
          </div>

          {/* FAQ 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
              2. Do the rooms include video conferencing facilities?
            </h3>
            <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
              Yes, most rooms include TV screens, HDMI ports, cameras, and conferencing tools. Check the room specs while booking.
            </p>
          </div>

          {/* FAQ 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
              3. Can guests be hosted at the location?
            </h3>
            <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
              Absolutely. Our front-desk team welcomes your guests professionally.
            </p>
          </div>

          {/* FAQ 4 */}
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
              4. Is high-speed Wi-Fi included?
            </h3>
            <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
              Yes, all meeting rooms come with secure, high-speed internet.
            </p>
          </div>

          {/* FAQ 5 */}
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
              5. Can I book a room on the same day?
            </h3>
            <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
              Yes — subject to availability. Many rooms can be booked instantly.
            </p>
          </div>

          {/* FAQ 6 */}
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
              6. Are refreshments available?
            </h3>
            <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
              Yes, tea, coffee, and water can be arranged on request.
            </p>
          </div>

          {/* FAQ 7 */}
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
              7. Can we rearrange the seating?
            </h3>
            <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
              Depending on the room type, certain setups can be customized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoomFAQ;
