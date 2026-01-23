import { COLORS } from '../../helpers/constants/Colors';

const VirtualOfficeProcess = () => {
  return (
    <div style={{ backgroundColor: COLORS.white }}>
      {/* Who Is It For Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
            Who Is It For?
          </h2>
          <ul className="space-y-3 text-base md:text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <li className="flex items-start gap-3">
              <span className="text-xl mt-1">•</span>
              <span>Startups and freelancers looking to build credibility with a professional business address</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl mt-1">•</span>
              <span>Remote teams that need a registered business address without a physical office</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl mt-1">•</span>
              <span>Businesses expanding into new cities at a lower cost</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl mt-1">•</span>
              <span>Founders who need GST registration without setting up a physical workspace</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl mt-1">•</span>
              <span>Professionals who want reliable mail handling with optional access to meeting rooms or workspaces </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Virtual Office - Process Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-[#00275c] mb-4">Virtual Office - Process</h2>
            <p className="text-lg md:text-xl text-[#8d8d8d]">Set up your virtual office in just a few simple steps.</p>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Step 1 */}
            <div className="flex flex-col items-center group">
              <div className="relative mb-6 transition-transform duration-300 hover:scale-110">
                <svg className="w-60 h-60" fill="none" viewBox="0 0 240 240">
                  <circle cx="120" cy="120" fill="white" r="118.5" stroke="url(#paint0_linear_step1)" strokeWidth="3" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_step1" x1="120" x2="120" y1="0" y2="240">
                      <stop stopColor="#FFDE00" />
                      <stop offset="1" stopColor="#998500" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg className="absolute inset-4 w-52 h-52" fill="none" viewBox="0 0 208 208">
                  <circle cx="104" cy="104" fill="#FFDE00" r="104" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full w-32 h-32 shadow-lg flex flex-col items-center justify-center" style={{ backgroundColor: COLORS.white }}>
                    <p className="text-4xl text-[#2e2e2e]">01</p>
                    <p className="text-sm text-[#2e2e2e] uppercase">Step</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl text-[#e4a321] mb-4">Choose Location</h3>
              <p className="text-center text-[#8d8d8d]">Pick an iSprout virtual office address from any city.</p>
            </div>
 
            {/* Step 2 */}
            <div className="flex flex-col items-center group">
              <div className="relative mb-6 transition-transform duration-300 hover:scale-110">
                <svg className="w-60 h-60" fill="none" viewBox="0 0 240 240">
                  <circle cx="120" cy="120" fill="white" r="118.5" stroke="url(#paint0_linear_step2)" strokeWidth="3" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_step2" x1="120" x2="120" y1="0" y2="240">
                      <stop stopColor="#00275c" />
                      <stop offset="1" stopColor="#4599BE" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg className="absolute inset-4 w-52 h-52" fill="none" viewBox="0 0 208 208">
                  <circle cx="104" cy="104" fill="#00275c" r="104" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full w-32 h-32 shadow-lg flex flex-col items-center justify-center" style={{ backgroundColor: COLORS.white }}>
                    <p className="text-4xl text-[#2e2e2e]">02</p>
                    <p className="text-sm text-[#2e2e2e] uppercase">Step</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl text-[#e4a321] mb-4 text-center">Share KYC Documents & Sign Agreement</h3>
              <p className="text-center text-[#8d8d8d]">Submit your verification documents and sign the service agreement.</p>
            </div>
 
            {/* Step 3 */}
            <div className="flex flex-col items-center group">
              <div className="relative mb-6 transition-transform duration-300 hover:scale-110">
                <svg className="w-60 h-60" fill="none" viewBox="0 0 240 240">
                  <circle cx="120" cy="120" fill="white" r="118.5" stroke="url(#paint0_linear_step3)" strokeWidth="3" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_step3" x1="120" x2="120" y1="0" y2="240">
                      <stop stopColor="#FFDE00" />
                      <stop offset="1" stopColor="#998500" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg className="absolute inset-4 w-52 h-52" fill="none" viewBox="0 0 208 208">
                  <circle cx="104" cy="104" fill="#FFDE00" r="104" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full w-32 h-32 shadow-lg flex flex-col items-center justify-center" style={{ backgroundColor: COLORS.white }}>
                    <p className="text-4xl text-[#2e2e2e]">03</p>
                    <p className="text-sm text-[#2e2e2e] uppercase">Step</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl text-[#e4a321] mb-4">Make Payment</h3>
              <p className="text-center text-[#8d8d8d]">Complete the secure payment to activate your virtual office plan.</p>
            </div>
 
            {/* Step 4 */}
            <div className="flex flex-col items-center group">
              <div className="relative mb-6 transition-transform duration-300 hover:scale-110">
                <svg className="w-60 h-60" fill="none" viewBox="0 0 240 240">
                  <circle cx="120" cy="120" fill="white" r="118.5" stroke="url(#paint0_linear_step4)" strokeWidth="3" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_step4" x1="120" x2="120" y1="0" y2="240">
                      <stop stopColor="#00275c" />
                      <stop offset="1" stopColor="#4599BE" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg className="absolute inset-4 w-52 h-52" fill="none" viewBox="0 0 208 208">
                  <circle cx="104" cy="104" fill="#00275c" r="104" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full w-32 h-32 shadow-lg flex flex-col items-center justify-center" style={{ backgroundColor: COLORS.white }}>
                    <p className="text-4xl text-[#2e2e2e]">04</p>
                    <p className="text-sm text-[#2e2e2e] uppercase">Step</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl text-[#e4a321] mb-4 text-center">Receive Documentation Kit</h3>
              <p className="text-center text-[#8d8d8d]">Get your NOC, business address proof, and GST-compliant documents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
            FAQs
          </h2>
          <div className="space-y-6">
            {/* FAQ 1 */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
                1. What is a Virtual Office?
              </h3>
              <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                A virtual office gives you a premium business address, mail handling, and support services without needing a physical workspace.
              </p>
            </div>

            {/* FAQ 2 */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
                2. Can I use an iSprout Virtual Office for GST Registration?
              </h3>
              <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                Yes — iSprout provides GST-compliant documentation and NOC to complete your registration.
              </p>
            </div>

            {/* FAQ 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
                3.How is mail and package handling managed?
              </h3>
              <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                All mail and packages are securely received at your chosen location, and you are notified when something arrives.
              </p>
            </div>

            {/* FAQ 4 */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
                4. Can I access meeting rooms or workspaces if needed?
              </h3>
              <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                Yes, you can book meeting rooms or access workspaces at iSprout locations whenever required
              </p>
            </div>

            {/* FAQ 5 */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
                5.  Can I choose the city for my virtual office?
              </h3>
              <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                Yes, you can select from multiple iSprout locations across cities based on your business needs.
              </p>
            </div>

            {/* FAQ 6 */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
                6. Is a physical presence required for a Virtual Office?
              </h3>
              <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                No, you can operate fully remotely while still having a credible business address.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VirtualOfficeProcess;
