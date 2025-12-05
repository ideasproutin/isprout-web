import heading from '../../../assets/blogs/Blogs & News.png';
import blog1 from '../../../assets/blogs/blog1.png';
import blog2 from '../../../assets/blogs/blog2.png';
import blog3 from '../../../assets/blogs/blog3.png';

const BlogsNews = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex justify-center mb-12">
          <img 
            src={heading} 
            alt="Blogs & News" 
            className="h-8 sm:h-10 md:h-10 lg:h-12 w-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Blog 1 */}
          <div className="bg-white rounded-xl border border-[#e8e8ea] overflow-hidden shadow-lg">
            <img alt="Office Space Trends" className="w-full h-60 object-cover" src={blog1} />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Office Space Trends</h3>
              <p className="text-gray-600 text-sm mb-4">Discover the latest trends shaping modern office spaces and how they impact productivity and collaboration.</p>
              <span className="text-yellow-500 text-xs font-semibold">Read More →</span>
            </div>
          </div>

          {/* Blog 2 */}
          <div className="bg-white rounded-xl border border-[#e8e8ea] overflow-hidden shadow-lg">
            <img alt="Location Checklist" className="w-full h-60 object-cover" src={blog2} />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Location Checklist</h3>
              <p className="text-gray-600 text-sm mb-4">Essential factors to consider when choosing the perfect location for your business workspace.</p>
              <span className="text-yellow-500 text-xs font-semibold">Read More →</span>
            </div>
          </div>

          {/* Blog 3 */}
          <div className="bg-white rounded-xl border border-[#e8e8ea] overflow-hidden shadow-lg">
            <img alt="Virtual Office Features" className="w-full h-60 object-cover" src={blog3} />
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
            style={{ backgroundColor: '#204758' }}
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
