import { Link } from 'react-router-dom';
import newsHeroImage from '../../assets/news/news_herosection.png';
import article1 from '../../assets/news/article1.png';
import article2 from '../../assets/news/article2.png';
import Footer from '../../components/footer/footer';

function IntroText() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-24 py-8 md:py-12 lg:py-16">
      <p className="font-['Outfit',sans-serif] font-semibold text-black text-xl md:text-2xl lg:text-[32px] capitalize leading-relaxed">
        Discover what's new, what's next, and what's making noise in our workspace ecosystem.
      </p>
    </div>
  );
}

function NewsArticle({ 
  date, 
  title, 
  image, 
  imagePosition = 'left' 
}: { 
  date: string; 
  title: string; 
  image: string; 
  imagePosition?: 'left' | 'right';
}) {
  return (
    <div className={`flex flex-col ${imagePosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16 xl:gap-20 relative`}>
      {/* Blue background element that creates an even border around the image */}
      <div className={`relative flex-shrink-0`}>
        {/* Blue border background */}
        <div className={`w-full sm:w-[calc(100vw-3rem)] lg:w-[714px] h-[330px] md:h-[381px] lg:h-[481px] bg-[#204758] ${imagePosition === 'left' ? 'rounded-tr-[165px] rounded-br-[165px] sm:rounded-tr-[200px] sm:rounded-br-[200px] lg:rounded-tr-[400px] lg:rounded-br-[400px]' : 'rounded-tl-[165px] rounded-bl-[165px] sm:rounded-tl-[200px] sm:rounded-bl-[200px] lg:rounded-tl-[400px] lg:rounded-bl-[400px]'}`} />
        
        {/* Image positioned on top of blue element with even spacing */}
        <div className={`absolute top-[15px] ${imagePosition === 'left' ? 'left-[15px] lg:left-[19px]' : 'right-[15px] lg:right-[19px]'} w-[calc(100%-30px)] sm:w-[calc(100vw-6rem)] lg:w-[676px] h-[300px] md:h-[350px] lg:h-[443px] ${imagePosition === 'left' ? 'rounded-tr-[150px] rounded-br-[150px] sm:rounded-tr-[185px] sm:rounded-br-[185px] lg:rounded-tr-[370px] lg:rounded-br-[370px]' : 'rounded-tl-[150px] rounded-bl-[150px] sm:rounded-tl-[185px] sm:rounded-bl-[185px] lg:rounded-tl-[370px] lg:rounded-bl-[370px]'} overflow-hidden shadow-[0px_8px_4px_0px_rgba(0,0,0,0.25),0px_4px_4px_0px_rgba(0,0,0,0.25)]`}>
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1 px-4 lg:px-0 relative z-10">
        <p className="font-['Outfit',sans-serif] font-semibold text-[#a4a4a4] text-lg md:text-[20px] capitalize mb-4">
          {date}
        </p>
        <h3 className="font-['Outfit',sans-serif] font-semibold text-black text-2xl md:text-3xl lg:text-[32px] capitalize leading-tight mb-6 max-w-[453px]">
          {title}
        </h3>
        <Link to="/news/article">
          <button className="bg-[#ffde00] border-2 border-[#ffde00] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-6 py-3 inline-flex items-center gap-2 hover:bg-white hover:border-[#ffde00] hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <span className="font-['Outfit',sans-serif] font-semibold text-[#204758] text-lg md:text-[20px] capitalize whitespace-nowrap">
              read Article →
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}

function NewsSection() {
  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-24 py-12 md:py-16 lg:py-24 space-y-24 md:space-y-32 lg:space-y-48">
      <NewsArticle 
        date="04 Jul 2025"
        title="iSprout Strengthens GCC Momentum with Launch of Signature Workspaces and GCCXprss Platform"
        image={article1}
        imagePosition="left"
      />
      
      <NewsArticle 
        date="04 Jul 2025"
        title="iSprout Strengthens GCC Momentum with Launch of Signature Workspaces and GCCXprss Platform"
        image={article2}
        imagePosition="right"
      />
    </section>
  );
}

const NewsHomepage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Width */}
      <section className="relative -mt-20 px-0">
        <div className="w-full">
          <div className="relative w-full">
            <img 
              src={newsHeroImage} 
              alt="iSprout News" 
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            
            {/* NEWS Text Overlay - Bottom Left */}
            <div className="absolute bottom-12 left-4 md:left-8 lg:left-16 z-10">
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}
              >
                NEWS
              </h1>
              <p 
                className="text-xl md:text-2xl text-white"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}
              >
                All The Buzz From iSprout
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Text */}
      <IntroText />

      {/* News Section */}
      <NewsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NewsHomepage;
