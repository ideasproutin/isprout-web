import img1 from '../../assets/managedoffice/managedoffice3.png';
import img2 from '../../assets/homepage/minaaslobby.jpg';
import img3 from '../../assets/managedoffice/managedoffice4.png';
import { COLORS } from '../../helpers/constants/Colors';

const WhyVirtualOffice = () => {
  return (
    <div className="w-full" style={{ backgroundColor: COLORS.white }}>
      
      {/* Virtual Office At iSprout Section */}
      <section className="py-10 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          
          <h2
            className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6"
            style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}
          >
            Virtual Office At iSprout
          </h2>

          <p
            className="text-sm sm:text-base md:text-lg mb-8 sm:mb-12 leading-relaxed"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            A Virtual Office gives your business a premium address, professional mail handling,
            and essential support without the cost of a physical workspace. Build credibility,
            expand to new cities, and operate from anywhere — effortlessly.
          </p>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            
            {[ 
              { img: img2, text: 'Premium & credible business address' },
              { img: img1, text: 'Govt-compliant documentation' },
              { img: img3, text: 'Professional mail & package handling' }
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-3xl overflow-hidden shadow-xl relative"
              >
                <img
                  src={item.img}
                  alt={item.text}
                  className="w-full h-64 sm:h-72 md:h-80 object-cover"
                />

                <div
                  className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 rounded-b-3xl"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                >
                  <p
                    className="text-white text-center text-sm sm:text-base md:text-lg"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-10 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">

          <h2
            className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8"
            style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}
          >
            Why Choose Virtual Office at iSprout?
          </h2>

          <div
            className="space-y-5 sm:space-y-6 text-sm sm:text-base md:text-lg"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            {[
              {
                title: 'Premium Business Addresses',
                desc: 'Get exclusive access to iSprout’s high-value locations across major cities — instantly boosting your brand’s credibility.'
              },
              {
                title: 'Professional Mail & Package Handling',
                desc: 'Our team securely receives, sorts, and notifies you about every document or parcel that arrives.'
              },
              {
                title: 'On-Demand Workspace Access',
                desc: 'Need to meet a client or team? Book meeting rooms or day passes whenever you need them.'
              },
              {
                title: 'Easy GST Registration Support',
                desc: 'Get smooth GST compliance with proper documentation and verified business addresses.'
              },
              {
                title: 'Cost-Efficient Business Expansion',
                desc: 'Scale across multiple cities without renting physical offices — perfect for startups and growing companies.'
              }
            ].map((item, index) => (
              <div key={index}>
                <h3
                  className="mb-2 font-semibold text-base sm:text-lg md:text-xl"
                  style={{ color: '#00275c' }}
                >
                  {item.title}
                </h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default WhyVirtualOffice;
