import blueArrow from '../../assets/whoweare/bluearrow.png';
import whoweare1 from '../../assets/whoweare/whoweare1.png';
import whoweare2 from '../../assets/whoweare/whoweare2.png';
import whoweare3 from '../../assets/whoweare/whoweare3.png';
import whoweare4 from '../../assets/whoweare/whoweare4.png';
import { COLORS } from '../../helpers/constants/Colors';

const WhoWeAre = () => {
  return (
    <section className="w-full py-6 sm:py-10 lg:py-12">
      {/* ✅ SAME CONTAINER AS INTRO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Arrow */}
        <div>
          <img
            src={blueArrow}
            alt=""
            className="h-10 sm:h-14 lg:h-20"
          />
        </div>

        {/* CARD 1 */}
        <div
          className="rounded-2xl p-4 sm:p-6 shadow-lg"
          style={{ backgroundColor: COLORS.backgroundCream }}
        >
          <div className="flex items-start justify-between gap-3">
            <h2
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Who we are
            </h2>
            <img src={whoweare1} alt="" className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <p
            className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl"
            style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.brandBlue }}
          >
            iSprout is a community-driven workspace brand that blends creativity,
            comfort, and professionalism. We design environments where people
            love to show up, collaborate, and build meaningful work every day.
          </p>
        </div>

        {/* CARD 2 */}
        <div
          className="rounded-2xl p-4 sm:p-6 shadow-lg"
          style={{ backgroundColor: COLORS.backgroundCream }}
        >
          <div className="flex items-start justify-between gap-3">
            <h2
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              What we do
            </h2>
            <img src={whoweare2} alt="" className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <p
            className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl"
            style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.brandBlue }}
          >
            We transform prime locations into high-performance workspaces equipped
            with modern design, premium amenities, and seamless support. From
            private offices to enterprise solutions, we create flexible spaces
            tailored to every business need.
          </p>
        </div>

        {/* CARD 3 */}
        <div
          className="rounded-2xl p-4 sm:p-6 shadow-lg"
          style={{ backgroundColor: COLORS.backgroundCream }}
        >
          <div className="flex items-start justify-between gap-3">
            <h2
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              How we help
            </h2>
            <img src={whoweare3} alt="" className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <p
            className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl"
            style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.brandBlue }}
          >
            By taking care of operations, utilities, and day-to-day workspace
            management, we free teams to focus on what truly matters — their work.
            Our ecosystem boosts productivity, fosters innovation, and supports
            business growth effortlessly.
          </p>
        </div>

        {/* CARD 4 */}
        <div
          className="rounded-2xl p-4 sm:p-6 shadow-lg"
          style={{ backgroundColor: COLORS.backgroundCream }}
        >
          <div className="flex items-start justify-between gap-3">
            <h2
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Creating success stories
            </h2>
            <img src={whoweare4} alt="" className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <p
            className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl"
            style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.brandBlue }}
          >
            With thousands of members across multiple cities, we've helped
            startups scale, enterprises expand, and teams thrive. Every workspace
            we build is designed to inspire success and create stories worth
            celebrating.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhoWeAre;
