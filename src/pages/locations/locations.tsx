import orbit from '../../assets/ourlocations/orbit.png';
import ogm from '../../assets/ourlocations/ogm.png';
import myhometwitza from '../../assets/ourlocations/myhometwitza.png';
import jayabheri from '../../assets/ourlocations/jayabheri.png';
import sohini from '../../assets/ourlocations/sohini.png';
import divyasree from '../../assets/ourlocations/divyasree.png';
import Innovators from '../../components/innovators/innovators';
import CityMap from '../home/components/citymap';
import LocationsHome from '../home/components/locations';
import WhyiSprout from '../home/components/whyisprout';
import Visionaries from '../home/components/visionaries';
import FutureOfWork from '../home/components/futureofwork';
import Testimonials from '../home/components/testimonials';
import Amenities from '../home/components/amenities';
import BlogsNews from '../home/components/blogs_news';
import Spotlight from '../home/components/spotlight';
import Awards from '../home/components/awards';
import Footer from '../../components/footer/footer';

const Locations = () => {
  const cities = [
    'Hyderabad',
    'Bengaluru',
    'Pune',
    'Chennai',
    'Vijayawada',
    'Kolkata',
    'Ahmedabad',
    'Gurugram'
  ];

  const locations = [
    { name: 'Orbit', location: 'Knowledge city, Hyderabad', image: orbit },
    { name: 'One Golden Mile', location: 'Kokapet', image: ogm },
    { name: 'My Home Twitza', location: 'Hitec City, Hyderabad', image: myhometwitza },
    { name: 'Jayabheri Trendset Connect', location: 'Kondapur Village, Hyderabad', image: jayabheri },
    { name: 'Sohini Tech Park', location: 'Financial District, Hyderabad', image: sohini },
    { name: 'Divyasree Trinity', location: 'Madhapur Village', image: divyasree }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* City Navigation */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-4 border-2" style={{ borderColor: '#204758' }}>
          <div className="flex items-center gap-3 overflow-x-auto">
            {cities.map((city, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-colors ${
                  index === 0
                    ? 'text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
                style={
                  index === 0
                    ? { backgroundColor: '#204758', fontFamily: 'Outfit, sans-serif' }
                    : { fontFamily: 'Outfit, sans-serif' }
                }
              >
                {city}
              </button>
            ))}
            <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 shrink-0">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Location Badge */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
            ISprout Centers In Hyderabad
          </h2>
          <div className="px-4 py-2 rounded-lg text-white font-semibold" style={{ backgroundColor: '#00A8E8' }}>
            1046 × 67
          </div>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {locations.map((location, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
              style={{ height: '250px' }}
            >
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {location.name}
                </h3>
                <div className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 1C5.243 1 3 3.243 3 6c0 3.375 5 9 5 9s5-5.625 5-9c0-2.757-2.243-5-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z"
                      fill="white"
                    />
                  </svg>
                  <span className="text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {location.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-start">
          <button
            className="flex items-center gap-2 text-lg font-semibold hover:gap-3 transition-all"
            style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}
          >
            See More
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15l5-5-5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Additional Sections */}
      <Innovators />
      <CityMap />
      <LocationsHome />
      <WhyiSprout />
      <Visionaries />
      <FutureOfWork />
      <Testimonials />
      <Amenities />
      <BlogsNews />
      <Spotlight />
      <Awards />
      <Footer />
    </div>
  );
};

export default Locations;
