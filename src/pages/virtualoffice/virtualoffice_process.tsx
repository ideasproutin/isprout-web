const VirtualOfficeProcess = () => {
  return (
    <div className="bg-white">
      {/* Who Is It For Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
            Who Is It For?
          </h2>
          <ul className="space-y-3 text-base md:text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <li className="flex items-start gap-3">
              <span className="text-xl mt-1">•</span>
              <span>Startups and freelancers building credibility</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl mt-1">•</span>
              <span>Remote teams needing a registered business address</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl mt-1">•</span>
              <span>Businesses expanding into new cities at low cost</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl mt-1">•</span>
              <span>Enterprises requiring professional mail and package handling service</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl mt-1">•</span>
              <span>Professionals who want mail handling and occasional workspace access</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Virtual Office - Process Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
            Virtual Office - Process
          </h2>
          <p className="text-center text-base md:text-lg mb-12" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
            Set up your Virtual Office in just a few simple steps.
          </p>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Step 01 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                {/* Yellow outer ring */}
                <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ border: '8px solid #FFDE00' }}>
                  {/* White inner circle */}
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <span className="text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>01</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#FFDE00' }}>
                Choose Location
              </h3>
              <p className="text-sm" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                Pick an iSprout Virtual Office address from our curated list of business-ready locations
              </p>
            </div>

            {/* Step 02 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                {/* Dark teal outer ring */}
                <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ border: '8px solid #204758' }}>
                  {/* White inner circle */}
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <span className="text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>02</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                Share KYC Documents & Sign Agreement
              </h3>
              <p className="text-sm" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                Submit necessary documentation and arrange the service agreement
              </p>
            </div>

            {/* Step 03 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                {/* Yellow outer ring */}
                <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ border: '8px solid #FFDE00' }}>
                  {/* White inner circle */}
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <span className="text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>03</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#FFDE00' }}>
                Make Payment
              </h3>
              <p className="text-sm" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                Complete the secure payment to activate your virtual office plan
              </p>
            </div>

            {/* Step 04 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                {/* Dark teal outer ring */}
                <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ border: '8px solid #204758' }}>
                  {/* White inner circle */}
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <span className="text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>04</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                Receive Documentation Kit
              </h3>
              <p className="text-sm" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                Get your business address proof and GST-compliant documentation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
            FAQs
          </h2>
          <div className="space-y-6">
            {/* FAQ 1 */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                1. What is a Virtual Office?
              </h3>
              <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                A virtual office gives you a premium business address, mail handling, and support services without needing a physical workspace.
              </p>
            </div>

            {/* FAQ 2 */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                2. Can I use an iSprout Virtual Office for GST Registration?
              </h3>
              <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                Yes — iSprout provides GST-compliant documentation and NOC to complete your registration.
              </p>
            </div>

            {/* FAQ 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                3. How fast can I get my Virtual Office?
              </h3>
              <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                Most setups are completed within 24–48 hours, depending on document verification.
              </p>
            </div>

            {/* FAQ 4 */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                4. Will my mail and packages be handled safely?
              </h3>
              <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                Yes — our team sorts, stores, and notifies you whenever you receive mail or parcels.
              </p>
            </div>

            {/* FAQ 5 */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
                5. Can I book meeting rooms even if I only have a Virtual Office?
              </h3>
              <p className="text-base" style={{ fontFamily: 'Outfit, sans-serif', color: '#666' }}>
                Absolutely. You can book meeting rooms, cabins, or day passes on-demand at any iSprout center.
              </p>
            </div>

            {/* FAQ 6 */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
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
