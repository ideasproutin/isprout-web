import heading from '../../../assets/blogs/Blogs & News.png';
import blog1 from '../../../assets/blogs/blog1.png';
import blog2 from '../../../assets/blogs/blog2.png';
import blog3 from '../../../assets/blogs/blog3.png';
import content1 from '../../../assets/blogs/Content1.png';
import content2 from '../../../assets/blogs/Content2.png';
import content3 from '../../../assets/blogs/Content3.png';
import viewMoreButton from '../../../assets/blogs/viewmore_button.png';

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
              <img src={content1} alt="Blog content" className="w-full h-auto" />
            </div>
          </div>

          {/* Blog 2 */}
          <div className="bg-white rounded-xl border border-[#e8e8ea] overflow-hidden shadow-lg">
            <img alt="Location Checklist" className="w-full h-60 object-cover" src={blog2} />
            <div className="p-6">
              <img src={content2} alt="Blog content" className="w-full h-auto" />
            </div>
          </div>

          {/* Blog 3 */}
          <div className="bg-white rounded-xl border border-[#e8e8ea] overflow-hidden shadow-lg">
            <img alt="Virtual Office Features" className="w-full h-60 object-cover" src={blog3} />
            <div className="p-6">
              <img src={content3} alt="Blog content" className="w-full h-auto" />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
        <button
            aria-label="View more"
            className="relative inline-flex items-center justify-center mx-auto hover:opacity-90 transition-opacity outline-none focus:outline-none"
            style={{ background: 'none', border: 'none', padding: 0 }}
        >
            <img
                src={viewMoreButton}
                alt="View More"
                className="h-12 sm:h-14 md:h-16 w-auto block"
            />
            <span className="absolute inset-0 flex items-center justify-center text-center text-white font-medium pointer-events-none z-10 mb-2">
                View more
            </span>
        </button>
        </div>
      </div>
    </section>
  );
};

export default BlogsNews;
