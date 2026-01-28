import dedicatedDesks from '../../assets/managedoffice/Dedicated-desks.jpg';
import managerCabin from '../../assets/managedoffice/Manager-Cabin.jpg';
import privateOffices from '../../assets/managedoffice/Private-Offices.jpg';
import virtualOffice from '../../assets/managedoffice/Virtual-office.jpg';
import { COLORS } from '../../helpers/constants/Colors';

interface OfficeType {
  image: string;
  title: string;
  description: string;
}

const ManagedOfficeTypes = () => {
  const officeTypes: OfficeType[] = [
    {
      image: dedicatedDesks,
      title: 'Dedicated Desks',
      description: 'Dedicated spaces for teams that value privacy and focus. Fully customizable to match your brand and workflow.'
    },
    {
      image: managerCabin,
      title: 'Manager Cabins',
      description: 'Collaborative environments designed to foster creativity and teamwork. Flexible seating arrangements for dynamic teams.'
    },
    {
      image: privateOffices,
      title: 'Private Offices',
      description: 'Professional meeting spaces equipped with modern technology. Perfect for client meetings and team discussions.'
    },
    {
      image: virtualOffice,
      title: 'Virtual Office',
      description: 'Premium office spaces for leadership teams. Enhanced amenities and services for executive-level requirements.'
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: COLORS.brandBlueDark }}>
            Managed Office At iSprout
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-4xl leading-relaxed">
            iSprout's Managed Office solutions are designed for teams that want a ready-to-move, fully furnished office space without the hassle of day-to-day management. From seamless operations and IT to facilities and support, we take care of everything—so you can focus on growing your business.
          </p>
        </div>

        {/* Office Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {officeTypes.map((office, index) => (
            <div 
              key={index} 
              className="relative rounded-3xl overflow-hidden shadow-lg"
            >
              <img 
                src={office.image} 
                alt={office.title}
                className="w-full aspect-square object-cover"
              />
              {/* Text Overlay at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-black/30 shadow-md">
                <h3 className="text-lg sm:text-xl font-bold text-white text-center drop-shadow-lg">
                  {office.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManagedOfficeTypes;
