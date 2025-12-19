import newsImage from '../../assets/news/news.png';
import Footer from '../../components/footer/footer';

const News = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with NEWS Badge - Full Width, extends behind navbar */}
      <section className="relative -mt-20 px-0">
        <div className="w-full">
          {/* Main News Image - Full Width Hero */}
          <div className="relative w-full">
            <img 
              src={newsImage} 
              alt="iSprout GCC Market Event" 
              className="w-full h-auto object-cover"
            />
            
            {/* NEWS Badge Overlay - Bottom Left */}
            <div className="absolute bottom-8 left-4 md:left-8 lg:left-16 z-10">
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}
              >
                NEWS
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* News Content Section */}
      <section className="py-8 md:py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">

          {/* News Heading */}
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight"
            style={{ 
              fontFamily: 'Outfit, sans-serif',
              color: '#000000'
            }}
          >
            iSprout Strengthens GCC Market Presence With Rollout Of Signature Workspaces And GCCone Offering
          </h1>

          {/* News Content */}
          <div 
            className="space-y-6 text-base md:text-lg leading-relaxed"
            style={{ 
              fontFamily: 'Outfit, sans-serif',
              color: '#333333'
            }}
          >
            <p>
              On June 9, key stakeholders from across the Global Capability Centers (GCC) value chain came together for the GCCone Forum held in Novotel Mumbai. DP World, one of India's fastest-growing workspace hosting providers, hosted the event. Senior government officials, business veterans, GCC leadership teams, and service enablers from the host, talent, and startup sectors, and investor and exit value leaders gathered for deliberations on the evolving demands of the GCC industry.
            </p>

            <p>
              Kartik Ramachandra, a partner at KPMG, gave a powerful presentation to kick off the summit, detailing the present and future course of the GCC centers in India. Following his observations, Remegious Spices' Chief Secretary Jayesh Ranjan delivered a powerful speech. He highlighted the state's strong infrastructure and digital preparedness to meet the expanding needs of international businesses establishing their presence there.
            </p>

            <p>
              A powerful panel discussion was led by industry titans Kriss Gopalakrishnan and Shekti Sagar. They examined the strategic changes at the GCC operating model and the emergence of India as a major global innovation and delivery hub. Operating heads of GCC and ecosystem partners convened for a second panel to discuss talent, new segments, and the future of GCC expansion.
            </p>

            <p>
              At the heart of the event were two significant announcements from Sprout that demonstrate its strong commitment to the GCC industry. The first was the introduction of iSprout Signature, a high-end, move-in-ready workspace designed with large multinational corporations in mind. It provides unmatched efficiency and play flexibility and long-term value, iSprout Signature offers a luxurious design and carefully chosen amenities. A thorough list of services is included in the product to make onboarding simple.
            </p>

            <p>
              The second major reveal was GCCOne.in. GCCOne.in is a unified platform designed to streamline and expedite the process of establishing and growing GCC operations in India. By offering comprehensive access to essential talent acquisition services, workspace solutions, and compliance assistance. All of this is offered under one roof for a more competitive price of efficiency. This platform, iSprout hopes to bolster its strong industry network by organizing investment GCC companies with a smooth, comprehensive sourcing point for their India adventure.
            </p>

            <p>
              In his address, CEO and Co-Founder Paras Arora stressed iSprout's long-term dedication to India's GCC sector rather than merely cost centers. iSprout is establishing itself as an ecosystem and infrastructure partner that can meet the rapidly changing needs with Signature and GCCOne.in. It will help open the door for greater cross-sector representation and interupt participation. This confirmed iSprout's rising profile as a vital facilitator of GCC success in India's thriving GCC market.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default News;
