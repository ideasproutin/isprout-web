import { homePageImages } from '../../../assets';
import { COLORS } from '../../../helpers/constants/Colors';

const BlogsNews = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Blogs & News
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Blog 1 */}
          <div className="rounded-xl border border-[#e8e8ea] overflow-hidden shadow-lg" style={{ backgroundColor: COLORS.white }}>
            <img alt="Office Space Trends" className="w-full h-60 object-cover" src={homePageImages.blog1} />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Office Space Trends</h3>
              <p className="text-gray-600 text-sm mb-4">Discover the latest trends shaping modern office spaces and how they impact productivity and collaboration.</p>
              <span className="text-yellow-500 text-xs font-semibold">Read More →</span>
            </div>
          </div>

          {/* Blog 2 */}
          <div className="rounded-xl border border-[#e8e8ea] overflow-hidden shadow-lg" style={{ backgroundColor: COLORS.white }}>
            <img alt="Location Checklist" className="w-full h-60 object-cover" src={homePageImages.blog2} />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Location Checklist</h3>
              <p className="text-gray-600 text-sm mb-4">Essential factors to consider when choosing the perfect location for your business workspace.</p>
              <span className="text-yellow-500 text-xs font-semibold">Read More →</span>
            </div>
          </div>

          {/* Blog 3 */}
          <div className="rounded-xl border border-[#e8e8ea] overflow-hidden shadow-lg" style={{ backgroundColor: COLORS.white }}>
            <img alt="Virtual Office Features" className="w-full h-60 object-cover" src={homePageImages.blog3} />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Virtual Office Features</h3>
              <p className="text-gray-600 text-sm mb-4">Explore key features and benefits of virtual office solutions for remote and hybrid teams.</p>
              <span className="text-yellow-500 text-xs font-semibold">Read More →</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button
            aria-label="View more"
            style={{ backgroundColor: '#00275c' }}
            className="px-8 py-3 sm:py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full transition-colors text-base sm:text-lg"
          >
            View more
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogsNews;
