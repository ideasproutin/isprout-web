import { COLORS } from '../../helpers/constants/Colors';

interface Benefit {
  title: string;
  description: string;
}

const WhyManagedOffice = () => {
  const benefits: Benefit[] = [
    {
      title: 'End-to-End Management',
      description: 'No hassle design, setup, daily operations, and maintenance—zero operational stress for you.'
    },
    {
      title: 'Designed for Your Team',
      description: 'Layouts, branding, furniture, meeting rooms, and collaboration spaces tailored to your needs.'
    },
    {
      title: 'Scalable & Flexible',
      description: 'Easily expand or optimize your space as your team grows or changes.'
    },
    {
      title: 'Premium Infrastructure',
      description: 'High-speed internet, power backups, security, meeting rooms, and modern amenities.'
    },
    {
      title: 'Cost & Time Savings',
      description: 'No upfront capex, predictable costs, and faster move-in timelines.'
    },
    {
      title: 'Prime Locations',
      description: 'Strategically located offices with excellent connectivity and accessibility.'
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12" style={{ color: COLORS.brandBlueDark }}>
          Why Choose Managed Office at iSprout?
        </h2>

        {/* Benefits List */}
        <div className="space-y-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: COLORS.brandBlueDark }}>
                {benefit.title}
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyManagedOffice;