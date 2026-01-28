import { useState, useEffect } from 'react';
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

  // Group images into pages of 4
  const pages = [
    [glimpse1, glimpse2, glimpse3, glimpse4],
    [glimpse5, glimpse6, glimpse7, glimpse8],
  ];

  const totalPages = pages.length;

  // Auto-play functionality with 3 second delay
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection('next');
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentPage, totalPages]);

  const currentImages = pages[currentPage];

  return (
    <div className="py-8 md:py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Badge */}
        <div className="flex justify-center mb-8">
          <div className="px-8 py-3" style={{ backgroundColor: '#FFDE00', borderRadius: '100px 8px 100px 8px' }}>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}>
              A Quick Glimpse Inside
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-center text-base md:text-lg mb-12 mx-auto" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Imagine walking into a zone where sparks fly, minds meet, and work turns into something you genuinely enjoy. That's iSprout's Co-working magic!
        </p>

        {/* Image Grid with Animation */}
        <div className="relative">
          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {/* Top Left – Narrow */}
            <div 
              className={`md:col-span-1 rounded-2xl overflow-hidden shadow-lg transition-all duration-700 ease-out transform ${
                direction === 'next' ? 'animate-slide-in-left' : 'animate-slide-in-right'
              }`}
            >
              <img
                src={currentImages[0]}
                alt={`Office space ${currentPage * 4 + 1}`}
                className="w-full h-64 sm:h-72 object-cover"
              />
            </div>

            {/* Top Right – Wide */}
            <div 
              className={`md:col-span-2 rounded-2xl overflow-hidden shadow-lg transition-all duration-700 ease-out transform ${
                direction === 'next' ? 'animate-slide-in-left' : 'animate-slide-in-right'
              }`}
            >
              <img
                src={currentImages[1]}
                alt={`Office space ${currentPage * 4 + 2}`}
                className="w-full h-64 sm:h-72 object-cover"
              />
            </div>

            {/* Bottom Left – Wide */}
            <div 
              className={`md:col-span-2 rounded-2xl overflow-hidden shadow-lg transition-all duration-700 ease-out transform ${
                direction === 'next' ? 'animate-slide-in-left' : 'animate-slide-in-right'
              }`}
            >
              <img
                src={currentImages[2]}
                alt={`Office space ${currentPage * 4 + 3}`}
                className="w-full h-64 sm:h-72 object-cover"
              />
            </div>

            {/* Bottom Right – Narrow */}
            <div 
              className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-700 ease-out transform ${
                direction === 'next' ? 'animate-slide-in-left' : 'animate-slide-in-right'
              }`}
            >
              <img
                src={currentImages[3]}
                alt={`Office space ${currentPage * 4 + 4}`}
                className="w-full h-64 sm:h-72 object-cover"
              />
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentPage ? 'next' : 'prev');
                  setCurrentPage(index);
                }}
                className="transition-all duration-300"
                style={{
                  width: currentPage === index ? '32px' : '12px',
                  height: '12px',
                  borderRadius: '6px',
                  backgroundColor: currentPage === index ? '#FFDE00' : '#d1d5db',
                }}
              />
            ))}
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

          .animate-slide-in-right {
            animation: slide-in-right 0.6s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Glimpse;
