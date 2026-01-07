import { COLORS } from '../../helpers/constants/Colors';

const WhyMeetingRoom = () => {
  return (
    <div className="py-12 md:py-20 px-4 md:px-8 lg:px-16" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto">
        {/* Why Choose Section */}
        <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
          Why Choose Meeting Rooms at iSprout?
        </h2>

        <div className="space-y-6 text-base md:text-lg mb-16" style={{ fontFamily: 'Outfit, sans-serif' }}>
          <div>
            <h3 className="mb-2 font-semibold" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
              Premium, Fully-Furnished Spaces
            </h3>
            <p style={{ fontFamily: 'Outfit, sans-serif' }}>
              Elegant meeting rooms with ergonomic seating, spacious tables, and ambience designed for productivity.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
              Advanced Tech & Connectivity
            </h3>
            <p style={{ fontFamily: 'Outfit, sans-serif' }}>
              High-speed internet, TV screens, video conferencing setup, HDMI support, and AV equipment ready to go.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
              On-Demand Booking
            </h3>
            <p style={{ fontFamily: 'Outfit, sans-serif' }}>
              Choose hourly, half-day, or full-day rentals — perfect for quick stand-ups or day-long sessions.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
              Professional Hospitality
            </h3>
            <p style={{ fontFamily: 'Outfit, sans-serif' }}>
              Front-desk assistance, guest reception, and beverage services to enhance your meeting experience.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
              Prime Business Locations
            </h3>
            <p style={{ fontFamily: 'Outfit, sans-serif' }}>
              Host your meetings at top IT hubs and commercial business centers across major cities.
            </p>
          </div>
        </div>

        {/* Who Is It For Section */}
        <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
          Who Is It For?
        </h2>

        <ul className="space-y-3 text-base md:text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
          <li className="flex items-start gap-3">
            <span className="text-xl mt-1">•</span>
            <span>Startups hosting client presentations</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl mt-1">•</span>
            <span>Freelancers needing occasional meeting space</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl mt-1">•</span>
            <span>Small teams planning brainstorming sessions</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl mt-1">•</span>
            <span>Remote or hybrid teams wanting a focused environment</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl mt-1">•</span>
            <span>Consultants, trainers, interviewers, and business coaches</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl mt-1">•</span>
            <span>Companies wanting premium spaces for board meetings</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WhyMeetingRoom;
