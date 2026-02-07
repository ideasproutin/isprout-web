import { useState } from 'react';
import { COLORS } from '../../helpers/constants/Colors';

const VirtualOfficeProcess = () => {
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const toggleQuestion = (id: number) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  const faqData = [
    {
      id: 1,
      question: "What is a Virtual Office?",
      answer: "A virtual office gives you a premium business address, mail handling, and support services without needing a physical workspace."
    },
    {
      id: 2,
      question: "Can I use an iSprout Virtual Office for GST Registration?",
      answer: "Yes — iSprout provides GST-compliant documentation and NOC to complete your registration."
    },
    {
      id: 3,
      question: "How is mail and package handling managed?",
      answer: "All mail and packages are securely received at your chosen location, and you are notified when something arrives."
    },
    {
      id: 4,
      question: "Can I access meeting rooms or workspaces if needed?",
      answer: "Yes, you can book meeting rooms or access workspaces at iSprout locations whenever required"
    },
    {
      id: 5,
      question: "Can I choose the city for my virtual office?",
      answer: "Yes, you can select from multiple iSprout locations across cities based on your business needs."
    },
    {
      id: 6,
      question: "Is a physical presence required for a Virtual Office?",
      answer: "No, you can operate fully remotely while still having a credible business address."
    }
  ];
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
              <span>Get enterprise-level credibility at a fraction of the cost</span>
            </li>
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
              <div className="relative mb-6 flip-container">
                <div className="flip-inner">
                  {/* Front Face - Step Number */}
                  <div className="flip-front">
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

                  {/* Back Face - Title */}
                  <div className="flip-back">
                    <svg className="w-60 h-60" fill="none" viewBox="0 0 240 240">
                      <circle cx="120" cy="120" fill="white" r="118.5" stroke="url(#paint0_linear_step1_back)" strokeWidth="3" />
                      <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_step1_back" x1="120" x2="120" y1="0" y2="240">
                          <stop stopColor="#FFDE00" />
                          <stop offset="1" stopColor="#998500" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <svg className="absolute inset-4 w-52 h-52" fill="none" viewBox="0 0 208 208">
                      <circle cx="104" cy="104" fill="#FFDE00" r="104" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full w-32 h-32 shadow-lg flex items-center justify-center px-4" style={{ backgroundColor: COLORS.white }}>
                        <p className="text-lg font-bold text-[#2e2e2e] text-center leading-tight">Choose Location</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl text-[#e4a321] mb-4">Choose Location</h3>
              <p className="text-center text-[#8d8d8d]">Pick an iSprout virtual office address from any city.</p>
            </div>
 
            {/* Step 2 */}
            <div className="flex flex-col items-center group">
              <div className="relative mb-6 flip-container">
                <div className="flip-inner">
                  {/* Front Face - Step Number */}
                  <div className="flip-front">
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

                  {/* Back Face - Title */}
                  <div className="flip-back">
                    <svg className="w-60 h-60" fill="none" viewBox="0 0 240 240">
                      <circle cx="120" cy="120" fill="white" r="118.5" stroke="url(#paint0_linear_step2_back)" strokeWidth="3" />
                      <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_step2_back" x1="120" x2="120" y1="0" y2="240">
                          <stop stopColor="#00275c" />
                          <stop offset="1" stopColor="#4599BE" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <svg className="absolute inset-4 w-52 h-52" fill="none" viewBox="0 0 208 208">
                      <circle cx="104" cy="104" fill="#00275c" r="104" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full w-32 h-32 shadow-lg flex items-center justify-center px-4" style={{ backgroundColor: COLORS.white }}>
                        <p className="text-base font-bold text-[#2e2e2e] text-center leading-tight">Share KYC & Sign</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl text-[#e4a321] mb-4 text-center">Share KYC Documents & Sign Agreement</h3>
              <p className="text-center text-[#8d8d8d]">Submit your verification documents and sign the service agreement.</p>
            </div>
 
            {/* Step 3 */}
            <div className="flex flex-col items-center group">
              <div className="relative mb-6 flip-container">
                <div className="flip-inner">
                  {/* Front Face - Step Number */}
                  <div className="flip-front">
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

                  {/* Back Face - Title */}
                  <div className="flip-back">
                    <svg className="w-60 h-60" fill="none" viewBox="0 0 240 240">
                      <circle cx="120" cy="120" fill="white" r="118.5" stroke="url(#paint0_linear_step3_back)" strokeWidth="3" />
                      <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_step3_back" x1="120" x2="120" y1="0" y2="240">
                          <stop stopColor="#FFDE00" />
                          <stop offset="1" stopColor="#998500" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <svg className="absolute inset-4 w-52 h-52" fill="none" viewBox="0 0 208 208">
                      <circle cx="104" cy="104" fill="#FFDE00" r="104" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full w-32 h-32 shadow-lg flex items-center justify-center px-4" style={{ backgroundColor: COLORS.white }}>
                        <p className="text-lg font-bold text-[#2e2e2e] text-center leading-tight">Make Payment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl text-[#e4a321] mb-4">Make Payment</h3>
              <p className="text-center text-[#8d8d8d]">Complete the secure payment to activate your virtual office plan.</p>
            </div>
 
            {/* Step 4 */}
            <div className="flex flex-col items-center group">
              <div className="relative mb-6 flip-container">
                <div className="flip-inner">
                  {/* Front Face - Step Number */}
                  <div className="flip-front">
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

                  {/* Back Face - Title */}
                  <div className="flip-back">
                    <svg className="w-60 h-60" fill="none" viewBox="0 0 240 240">
                      <circle cx="120" cy="120" fill="white" r="118.5" stroke="url(#paint0_linear_step4_back)" strokeWidth="3" />
                      <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_step4_back" x1="120" x2="120" y1="0" y2="240">
                          <stop stopColor="#00275c" />
                          <stop offset="1" stopColor="#4599BE" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <svg className="absolute inset-4 w-52 h-52" fill="none" viewBox="0 0 208 208">
                      <circle cx="104" cy="104" fill="#00275c" r="104" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full w-32 h-32 shadow-lg flex items-center justify-center px-4" style={{ backgroundColor: COLORS.white }}>
                        <p className="text-base font-bold text-[#2e2e2e] text-center leading-tight">Receive Docs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl text-[#e4a321] mb-4 text-center">Receive Documentation Kit</h3>
              <p className="text-center text-[#8d8d8d]">Get your NOC, business address proof, and GST-compliant documents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flip Animation Styles */}
      <style>{`
        .flip-container {
          perspective: 1000px;
          width: 240px;
          height: 240px;
        }

        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-container:hover .flip-inner {
          transform: rotateY(180deg);
        }

        .flip-front,
        .flip-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .flip-back {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* FAQs Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16" style={{ backgroundColor: COLORS.white }}>
        <style>{`
          .faq-item-button {
            transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
            border-radius: 12px;
            padding: 20px 24px;
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
          }

          .faq-item-button:focus {
            outline: none !important;
            background-color: rgba(0, 38, 92, 0.05);
            border: none !important;
            box-shadow: none !important;
          }

          .faq-item-button:hover {
            background-color: rgba(0, 38, 92, 0.03);
            border: none !important;
          }

          .faq-item-button.active {
            background-color: rgba(0, 38, 92, 0.08);
            border: none !important;
          }

          .faq-icon {
            transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .faq-item-button.active .faq-icon {
            transform: rotate(180deg);
          }

          .faq-answer {
            overflow: hidden;
            transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
            border: none !important;
          }
        `}</style>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-[36px] md:text-[42px] font-bold font-['Inter',sans-serif] mb-12" style={{ color: COLORS.textPrimary }}>
            Frequently Ask Questions
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - First 3 Questions */}
            <div className="space-y-3">
              {faqData.slice(0, 3).map((faq, index) => (
                <div key={index}>
                  <button
                    onClick={() => toggleQuestion(faq.id)}
                    className={`faq-item-button w-full flex items-center justify-between text-left ${
                      openQuestionId === faq.id ? 'active' : ''
                    }`}
                    style={{
                      backgroundColor: openQuestionId === faq.id ? 'rgba(0, 38, 92, 0.08)' : 'transparent'
                    }}
                  >
                    {/* Question Text */}
                    <p className="text-[16px] md:text-[18px] font-semibold font-['Inter',sans-serif] flex-1 pr-4" style={{ color: COLORS.textPrimary }}>
                      {faq.question}
                    </p>

                    {/* Plus/Minus Icon */}
                    <div className="faq-icon w-6 h-6 flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00275c" strokeWidth="2" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                  </button>

                  {/* Answer */}
                  <div className={`faq-answer ${openQuestionId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-[14px] md:text-[16px] font-['Inter',sans-serif] px-6 py-4" style={{ color: COLORS.textGray }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Last 3 Questions */}
            <div className="space-y-3">
              {faqData.slice(3).map((faq, index) => (
                <div key={faq.id}>
                  <button
                    onClick={() => toggleQuestion(faq.id)}
                    className={`faq-item-button w-full flex items-center justify-between text-left ${
                      openQuestionId === faq.id ? 'active' : ''
                    }`}
                    style={{
                      backgroundColor: openQuestionId === faq.id ? 'rgba(0, 38, 92, 0.08)' : 'transparent'
                    }}
                  >
                    {/* Question Text */}
                    <p className="text-[16px] md:text-[18px] font-semibold font-['Inter',sans-serif] flex-1 pr-4" style={{ color: COLORS.textPrimary }}>
                      {faq.question}
                    </p>

                    {/* Plus/Minus Icon */}
                    <div className="faq-icon w-6 h-6 flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00275c" strokeWidth="2" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                  </button>

                  {/* Answer */}
                  <div className={`faq-answer ${openQuestionId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-[14px] md:text-[16px] font-['Inter',sans-serif] px-6 py-4" style={{ color: COLORS.textGray }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VirtualOfficeProcess;
