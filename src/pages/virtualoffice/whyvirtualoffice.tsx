import img1 from '../../assets/virtualoffice/virtualoffice.png';
import img2 from '../../assets/virtualoffice/minaas.png';
import img3 from '../../assets/virtualoffice/Mailroom Workspace and Packaging Setup.png';
import { COLORS } from '../../helpers/constants/Colors';

const WhyVirtualOffice = () => {
  return (
    <div className="bg-COLORS.white w-full">
      {/* Virtual Office At iSprout Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
            Virtual Office At iSprout
          </h2>
          <p className="text-base md:text-lg mb-12 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
            A Virtual Office gives your business a premium address, professional mail handling, and essential support without the cost of a physical workspace. Build credibility, expand to new cities, and operate from anywhere — effortlessly.
          </p>

          {/* Image Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl overflow-hidden shadow-xl relative">
              <img alt="Premium business address" className="w-full h-80 object-cover" src={img2} />
              <div className="absolute bottom-0 left-0 right-0 p-4 rounded-b-3xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(8px)' }}>
                <p className="text-white text-center text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Premium & credible business address
                </p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl relative">
              <img alt="Govt-compliant documentation" className="w-full h-80 object-cover" src={img1} />
              <div className="absolute bottom-0 left-0 right-0 p-4 rounded-b-3xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(8px)' }}>
                <p className="text-white text-center text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Govt-compliant documentation
                </p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl relative">
              <img alt="Professional mail & package handling" className="w-full h-80 object-cover" src={img3} />
              <div className="absolute bottom-0 left-0 right-0 p-4 rounded-b-3xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(8px)' }}>
                <p className="text-white text-center text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Professional mail & package handling
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
            Why Choose Virtual Office at iSprout?
          </h2>
          <div className="space-y-6 text-lg md:text-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <div>
              <h3 className="mb-2 font-semibold" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
                Premium Business Addresses
              </h3>
              <p style={{ fontFamily: 'Outfit, sans-serif' }}>
                Get exclusive access to iSprout&apos;s high-value locations across major cities — instantly boosting your brand&apos;s credibility.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
                Professional Mail & Package Handling
              </h3>
              <p style={{ fontFamily: 'Outfit, sans-serif' }}>
                Our team securely receives, sorts, and notifies you about every document or parcel that arrives.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
                On-Demand Workspace Access
              </h3>
              <p style={{ fontFamily: 'Outfit, sans-serif' }}>
                Need to meet a client or team? Book meeting rooms or day passes whenever you need them.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
                Easy GST Registration Support
              </h3>
              <p style={{ fontFamily: 'Outfit, sans-serif' }}>
                Get smooth GST compliance with proper documentation and verified business addresses.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
                Cost-Efficient Business Expansion
              </h3>
              <p style={{ fontFamily: 'Outfit, sans-serif' }}>
                Scale across multiple cities without renting physical offices — perfect for startups and growing companies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyVirtualOffice;
