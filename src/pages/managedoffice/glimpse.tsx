import { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import glimpse1 from '../../assets/managedoffice/managedoffice (1).jpg';
import glimpse2 from '../../assets/managedoffice/managedoffice (2).jpg';
import glimpse3 from '../../assets/managedoffice/managedoffice (3).jpg';
import glimpse4 from '../../assets/managedoffice/managedoffice (4).jpg';
import glimpse5 from '../../assets/managedoffice/managedoffice (5).jpg';
import glimpse6 from '../../assets/managedoffice/managedoffice (6).jpg';
import glimpse7 from '../../assets/managedoffice/managedoffice (7).jpg';
import glimpse8 from '../../assets/managedoffice/managedoffice (8).jpg';
import { COLORS } from '../../helpers/constants/Colors';

const Glimpse = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isHovered, setIsHovered] = useState(false);

  // Group images into pages of 4
  const pages = [
    [glimpse1, glimpse2, glimpse3, glimpse4],
    [glimpse5, glimpse6, glimpse7, glimpse8],
  ];

  const totalPages = pages.length;

  const handleNext = useCallback(() => {
    setDirection('next');
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const handlePrev = useCallback(() => {
    setDirection('prev');
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Auto-play functionality with 3 second delay - pauses on hover
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(handleNext, 3000);
    return () => clearInterval(timer);
  }, [isHovered, handleNext]);

  const currentImages = pages[currentPage];

  return (
    <div className="py-8 md:py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="px-8 py-3" style={{ backgroundColor: '#FFDE00', borderRadius: '100px 8px 100px 8px' }}>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
              A Quick Glimpse Inside
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-yellow-50 border-2 border-gray-200 hover:border-yellow-400 group"
              aria-label="Previous"
            >
              <FaChevronLeft className="text-gray-700 group-hover:text-yellow-500 transition-colors" size={18} />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-yellow-50 border-2 border-gray-200 hover:border-yellow-400 group"
              aria-label="Next"
            >
              <FaChevronRight className="text-gray-700 group-hover:text-yellow-500 transition-colors" size={18} />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-center text-base md:text-lg mb-12 mx-auto" style={{ fontFamily: 'Outfit, sans-serif' }}>
         Step into a fully managed office that's ready from day one. From private cabins and meeting rooms to collaboration zones and breakout areas, every detail is designed to support focused and flexible work. 
        </p>

        {/* Image Grid with Animation */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {/* Top Left – Narrow */}
            <div 
              className={`md:col-span-1 transition-all duration-700 ease-out transform ${
                direction === 'next' ? 'animate-slide-in-left' : 'animate-slide-in-right'
              }`}
            >
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl group cursor-pointer transition-all duration-300">
                <img
                  src={currentImages[0]}
                  alt={`Office space ${currentPage * 4 + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Top Right – Wide */}
            <div 
              className={`md:col-span-2 transition-all duration-700 ease-out transform ${
                direction === 'next' ? 'animate-slide-in-left-delay' : 'animate-slide-in-right-delay'
              }`}
            >
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl group cursor-pointer transition-all duration-300">
                <img
                  src={currentImages[1]}
                  alt={`Office space ${currentPage * 4 + 2}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Bottom Left – Wide */}
            <div 
              className={`md:col-span-2 transition-all duration-700 ease-out transform ${
                direction === 'next' ? 'animate-slide-in-left-delay-2' : 'animate-slide-in-right-delay-2'
              }`}
            >
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl group cursor-pointer transition-all duration-300">
                <img
                  src={currentImages[2]}
                  alt={`Office space ${currentPage * 4 + 3}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Bottom Right – Narrow */}
            <div 
              className={`transition-all duration-700 ease-out transform ${
                direction === 'next' ? 'animate-slide-in-left-delay-3' : 'animate-slide-in-right-delay-3'
              }`}
            >
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl group cursor-pointer transition-all duration-300">
                <img
                  src={currentImages[3]}
                  alt={`Office space ${currentPage * 4 + 4}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>

          
        </div>

        {/* Animation Styles */}
        <style>{`
          @keyframes slide-in-left {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slide-in-right {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-slide-in-left {
            animation: slide-in-left 0.6s ease-out;
          }

          .animate-slide-in-left-delay {
            animation: slide-in-left 0.6s ease-out 0.1s both;
          }

          .animate-slide-in-left-delay-2 {
            animation: slide-in-left 0.6s ease-out 0.2s both;
          }

          .animate-slide-in-left-delay-3 {
            animation: slide-in-left 0.6s ease-out 0.3s both;
          }

          .animate-slide-in-right {
            animation: slide-in-right 0.6s ease-out;
          }

          .animate-slide-in-right-delay {
            animation: slide-in-right 0.6s ease-out 0.1s both;
          }

          .animate-slide-in-right-delay-2 {
            animation: slide-in-right 0.6s ease-out 0.2s both;
          }

          .animate-slide-in-right-delay-3 {
            animation: slide-in-right 0.6s ease-out 0.3s both;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Glimpse;
