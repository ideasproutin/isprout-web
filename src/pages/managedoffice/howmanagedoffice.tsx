import { COLORS } from '../../helpers/constants/Colors';

interface Step {
  number: string;
  title: string;
  description: string;
}

const HowManagedOffice = () => {
  const steps: Step[] = [
    {
      number: '1.',
      title: 'Consultation',
      description: 'Share your team size, culture, and workspace requirements.'
    },
    {
      number: '2.',
      title: 'Design & Planning',
      description: 'We create a customized office layout and plan aligned to your brand.'
    },
    {
      number: '3.',
      title: 'Build & Setup',
      description: 'iSprout executes interiors, IT, and infrastructure end-to-end.'
    },
    {
      number: '4.',
      title: 'Move In & Operate',
      description: 'Walk into a fully functional office; we manage daily operations.'
    },
    {
      number: '5.',
      title: 'Scale with Ease',
      description: 'Upgrade, expand, or reconfigure whenever your business needs it.'
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12" style={{ color: COLORS.brandBlueDark }}>
          How Does It Work?
        </h2>

        {/* Steps List */}
        <div className="space-y-4 sm:space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-2 sm:gap-3">
              <span className="text-base sm:text-lg font-bold flex-shrink-0" style={{ color: COLORS.brandBlueDark }}>
                {step.number}
              </span>
              <div>
                <span className="text-base sm:text-lg font-bold" style={{ color: COLORS.brandBlueDark }}>
                  {step.title} –{' '}
                </span>
                <span className="text-base sm:text-lg text-gray-700">
                  {step.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowManagedOffice;