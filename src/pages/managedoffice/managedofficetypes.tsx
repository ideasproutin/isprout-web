import office1 from '../../assets/managedoffice/managedoffice1.png';
import office2 from '../../assets/managedoffice/managedoffice2.png';
import office3 from '../../assets/managedoffice/managedoffice3.png';
import office4 from '../../assets/managedoffice/managedoffice4.png';

interface OfficeType {
  image: string;
  title: string;
  description: string;
}

const ManagedOfficeTypes = () => {
  const officeTypes: OfficeType[] = [
    {
      image: office1,
      title: 'Private Office',
      description: 'Dedicated spaces for teams that value privacy and focus. Fully customizable to match your brand and workflow.'
    },
    {
      image: office2,
      title: 'Open Workspace',
      description: 'Collaborative environments designed to foster creativity and teamwork. Flexible seating arrangements for dynamic teams.'
    },
    {
      image: office3,
      title: 'Meeting Rooms',
      description: 'Professional meeting spaces equipped with modern technology. Perfect for client meetings and team discussions.'
    },
    {
      image: office4,
      title: 'Executive Suite',
      description: 'Premium office spaces for leadership teams. Enhanced amenities and services for executive-level requirements.'
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Office Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {officeTypes.map((office, index) => (
            <div 
              key={index} 
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img 
                src={office.image} 
                alt={office.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Text Overlay at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-black/30 backdrop-blur-sm shadow-md">
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
