import heroImage from '../../assets/blogs_section/blogs_herosection.png';
import blogImage from '../../assets/blogs_section/blog_image.png';
import blog1 from '../../assets/blogs_section/blogs1.png';
import blog2 from '../../assets/blogs_section/blogs2.png';
import blog3 from '../../assets/blogs_section/blogs3.png';
import BlogsGrid from './blogsgrid';
import Footer from '../../components/footer/footer';

const BlogsIntro = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Yellow Background */}
      <section className="relative py-16 md:py-20 lg:py-28 px-4 md:px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: '#FFDE00' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Circular Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px]">
                {/* White ring border */}
                <div className="absolute inset-0 rounded-full bg-white shadow-2xl"></div>
                
                {/* Inner image */}
                <div className="absolute inset-[20px] rounded-full overflow-hidden">
                  <img 
                    src={heroImage} 
                    alt="iSprout Blogs Workspace"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                iSprout <span style={{ color: '#204758' }}>BLOGS</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                Your go-to space for workplace inspiration, industry insights, and growth stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="rounded-3xl overflow-hidden shadow-xl" style={{ backgroundColor: '#FFDE00' }}>
              <img 
                src={blogImage} 
                alt="Office Space Trends 2026"
                className="w-full h-auto"
              />
            </div>

            {/* Right - Content */}
            <div>
              <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                Office Space Trends 2026: The Future of Workspaces
              </h2>
              <p className="text-base md:text-lg mb-8" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                As 2026 is approaching, the concept of shared office is fast evolving. Managed office spaces and flexible offices are reshaping how businesses operate.
              </p>
              <button 
                className="px-8 py-3 rounded-full text-lg font-semibold transition-colors"
                style={{ 
                  backgroundColor: '#204758',
                  color: '#FFFFFF',
                  fontFamily: 'Outfit, sans-serif'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#163644'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#204758'}
              >
                Read More →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blogs Grid */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-12 text-center" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
            Recent Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Card 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
              <img src={blog1} alt="Blog 1" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                  Flexible Workspace Solutions
                </h3>
                <p className="text-base mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                  Discover how flexible workspaces are transforming business operations in 2026.
                </p>
                <button 
                  className="text-base font-semibold"
                  style={{ 
                    color: '#204758',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  Read More →
                </button>
              </div>
            </div>

            {/* Blog Card 2 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
              <img src={blog2} alt="Blog 2" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                  Hybrid Work Model Success
                </h3>
                <p className="text-base mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                  Learn the strategies behind successful hybrid workplace implementations.
                </p>
                <button 
                  className="text-base font-semibold"
                  style={{ 
                    color: '#204758',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  Read More →
                </button>
              </div>
            </div>

            {/* Blog Card 3 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
              <img src={blog3} alt="Blog 3" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                  Productivity in Modern Offices
                </h3>
                <p className="text-base mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                  Explore how modern office design impacts team productivity and collaboration.
                </p>
                <button 
                  className="text-base font-semibold"
                  style={{ 
                    color: '#204758',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                >
                  Read More →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Grid Component */}
      <BlogsGrid />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogsIntro;
