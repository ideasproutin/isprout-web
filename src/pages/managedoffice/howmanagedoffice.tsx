import { COLORS } from '../../helpers/constants/Colors';

interface Step {
  number: string;
  title: string;
  description: string;
  gradient: string;
  bgColor: string;
}

const HowManagedOffice = () => {
  const steps: Step[] = [
    {
      number: '01',
      title: 'Consultation',
      description: 'Share your team size, culture, and workspace requirements.',
      gradient: 'paint0_linear_step1',
      bgColor: '#FFDE00'
    },
    {
      number: '02',
      title: 'Design & Planning',
      description: 'We create a customized office layout and plan aligned to your brand.',
      gradient: 'paint0_linear_step2',
      bgColor: '#00275c'
    },
    {
      number: '03',
      title: 'Build & Setup',
      description: 'iSprout executes interiors, IT, and infrastructure end-to-end.',
      gradient: 'paint0_linear_step3',
      bgColor: '#FFDE00'
    },
    {
      number: '04',
      title: 'Move In & Operate',
      description: 'Walk into a fully functional office; we manage daily operations.',
      gradient: 'paint0_linear_step4',
      bgColor: '#00275c'
    },
    {
      number: '05',
      title: 'Scale with Ease',
      description: 'Upgrade, expand, or reconfigure whenever your business needs it.',
      gradient: 'paint0_linear_step5',
      bgColor: '#FFDE00'
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-[#00275c] mb-4">How Does It Work?</h2>
          <p className="text-lg md:text-xl text-[#8d8d8d]">Get your fully managed office ready in just a few simple steps.</p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="relative mb-6 flip-container">
                <div className="flip-inner">
                  {/* Front Face - Step Number */}
                  <div className="flip-front">
                    <svg className="w-60 h-60" fill="none" viewBox="0 0 240 240">
                      <circle cx="120" cy="120" fill="white" r="118.5" stroke={`url(#${step.gradient})`} strokeWidth="3" />
                      <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id={step.gradient} x1="120" x2="120" y1="0" y2="240">
                          {step.bgColor === '#FFDE00' ? (
                            <>
                              <stop stopColor="#FFDE00" />
                              <stop offset="1" stopColor="#998500" />
                            </>
                          ) : (
                            <>
                              <stop stopColor="#00275c" />
                              <stop offset="1" stopColor="#4599BE" />
                            </>
                          )}
                        </linearGradient>
                      </defs>
                    </svg>
                    <svg className="absolute inset-4 w-52 h-52" fill="none" viewBox="0 0 208 208">
                      <circle cx="104" cy="104" fill={step.bgColor} r="104" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full w-32 h-32 shadow-lg flex flex-col items-center justify-center" style={{ backgroundColor: COLORS.white }}>
                        <p className="text-4xl text-[#2e2e2e]">{step.number}</p>
                        <p className="text-sm text-[#2e2e2e] uppercase">Step</p>
                      </div>
                    </div>
                  </div>

                  {/* Back Face - Title */}
                  <div className="flip-back">
                    <svg className="w-60 h-60" fill="none" viewBox="0 0 240 240">
                      <circle cx="120" cy="120" fill="white" r="118.5" stroke={`url(#${step.gradient}_back)`} strokeWidth="3" />
                      <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id={`${step.gradient}_back`} x1="120" x2="120" y1="0" y2="240">
                          {step.bgColor === '#FFDE00' ? (
                            <>
                              <stop stopColor="#FFDE00" />
                              <stop offset="1" stopColor="#998500" />
                            </>
                          ) : (
                            <>
                              <stop stopColor="#00275c" />
                              <stop offset="1" stopColor="#4599BE" />
                            </>
                          )}
                        </linearGradient>
                      </defs>
                    </svg>
                    <svg className="absolute inset-4 w-52 h-52" fill="none" viewBox="0 0 208 208">
                      <circle cx="104" cy="104" fill={step.bgColor} r="104" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full w-32 h-32 shadow-lg flex items-center justify-center px-4" style={{ backgroundColor: COLORS.white }}>
                        <p className="text-lg font-bold text-[#2e2e2e] text-center leading-tight">{step.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl text-[#e4a321] mb-4 text-center">{step.title}</h3>
              <p className="text-center text-[#8d8d8d]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

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
    </section>
  );
};

export default HowManagedOffice;