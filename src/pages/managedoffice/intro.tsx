import managedOfficeImg from '../../assets/managedofficeintro/managedofficeimg.png';
import profileIcon from '../../assets/managedofficeintro/profileicon1.png';

const IntroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        
        {/* Left Side - Text Content */}
        <div className="relative z-10 max-w-xl">
          {/* Large Yellow Circle with Main Text */}
          <div 
            className="relative rounded-full p-12 sm:p-16 md:p-20 mb-8"
            style={{ backgroundColor: '#FFDE00', width: 'fit-content' }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Managed Office
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-900">
              Work where ideas spark fast.
            </p>
          </div>

          {/* Innovation Badge */}
          <div className="flex items-center gap-3 mb-6 bg-white rounded-full shadow-lg px-6 py-4 w-fit">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#FFDE00' }}
            >
              <img 
                src={profileIcon} 
                alt="Innovation" 
                className="w-7 h-7"
              />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">Innovation</p>
              <p className="text-sm text-gray-600">stands out</p>
            </div>
          </div>

          {/* Flexibility Badge */}
          <div className="flex items-center gap-3 mb-6 bg-white rounded-full shadow-lg px-6 py-4 w-fit ml-12">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#FFDE00' }}
            >
              <img 
                src={profileIcon} 
                alt="Flexibility" 
                className="w-7 h-7"
              />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">Flexibility</p>
              <p className="text-sm text-gray-600">& Comfort</p>
            </div>
          </div>

          {/* Vibrant Community Badge */}
          <div className="flex items-center gap-3 bg-white rounded-full shadow-lg px-6 py-4 w-fit ml-24">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#FFDE00' }}
            >
              <img 
                src={profileIcon} 
                alt="Vibrant Community" 
                className="w-7 h-7"
              />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">Vibrant</p>
              <p className="text-sm text-gray-600">Community</p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <div className="relative w-full h-full">
            <img 
              src={managedOfficeImg} 
              alt="Managed Office" 
              className="absolute top-0 right-0 w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Decorative Yellow Circle - Bottom Right */}
        <div 
          className="absolute bottom-12 right-12 w-24 h-24 rounded-full opacity-80"
          style={{ backgroundColor: '#FFDE00' }}
        />
      </div>
    </section>
  );
};

export default IntroSection;
