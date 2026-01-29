import { Users, ThumbsUp, HeartHandshake, TrendingUp } from 'lucide-react';
import blueArrow from '../../assets/whoweare/bluearrow.png';
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
            <Users className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: COLORS.brandBlue }} />
          </div>

          <p
            className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl"
            style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.brandBlue }}
          >
            We are a managed office and coworking workspace provider focused on creating flexible, professional environments for startups, enterprises, and growing teams. iSprout partners with businesses that value reliability, scalability, and well-managed infrastructure. Our spaces are designed to evolve with your business, whether you’re a small team or a large organization
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
            <ThumbsUp className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: COLORS.brandBlue }} />
          </div>

          <p
            className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl"
            style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.brandBlue }}
          >
            We design, build, and manage premium workspaces that support how modern businesses operate. From flexible coworking environments to fully managed offices, iSprout delivers thoughtfully designed spaces equipped with modern infrastructure, premium amenities, and seamless support. Our workspaces are built to adapt to different team sizes, industries, and growth stages, making it easy for businesses to scale without friction. 
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
            <HeartHandshake className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: COLORS.brandBlue }} />
          </div>

          <p
            className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl"
            style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.brandBlue }}
          >
            We take care of everything that goes into running a workspace, so your team can stay focused on core business goals. From daily operations and utilities to workspace maintenance and on-site support, iSprout ensures smooth, hassle-free operations. Our approach removes operational complexity, improves productivity, and creates an environment where teams can work efficiently and innovate with confidence. 
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
            <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: COLORS.brandBlue }} />
          </div>

          <p
            className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl"
            style={{ fontFamily: 'Outfit, sans-serif', color: COLORS.brandBlue }}
          >
           Every iSprout workspace is built with real business journeys in mind. Over the years, we’ve supported startups as they scale, enterprises as they expand, and teams as they grow stronger together. By combining flexibility, design, and operational excellence, we help businesses create success stories that are worth celebrating
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhoWeAre;
