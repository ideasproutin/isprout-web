import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import aboutUsData from "../../content/aboutus.json";
import { COLORS } from "../../helpers/constants/Colors";
import { useAboutUs } from "../../hooks/useAboutUs";
 
const Evolution = () => {
    const { data: aboutUsApiData } = useAboutUs();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const milestones = aboutUsApiData?.evolution || aboutUsData.evolution;
 
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
       
        checkMobile();
        window.addEventListener('resize', checkMobile);
       
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
 
    const getCurrentEntries = () => {
        const entries = [];
        entries.push(milestones[currentIndex]);
        // Only show 2 entries on desktop (md and up)
        if (!isMobile) {
            if (currentIndex + 1 < milestones.length) {
                entries.push(milestones[currentIndex + 1]);
            }
        }
        return entries;
    };
 
    const handleNext = () => {
        setDirection(1);
        const step = isMobile ? 1 : 2;
 
        if (currentIndex + step >= milestones.length) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + step);
        }
    };
 
    const handlePrev = () => {
        setDirection(-1);
        const step = isMobile ? 1 : 2;
 
        if (currentIndex === 0) {
            setCurrentIndex(Math.max(0, milestones.length - step));
        } else {
            setCurrentIndex(Math.max(0, currentIndex - step));
        }
    };
 
    const currentEntries = getCurrentEntries();
 
    const variants = {
        enter: (direction: number) => ({
            y: direction > 0 ? 60 : -60,
            opacity: 0,
        }),
        center: {
            y: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            y: direction > 0 ? -60 : 60,
            opacity: 0,
        }),
    };
 
    return (
        <section
            id='evolution'
            className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-white overflow-visible'
        >
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-12 sm:mb-14 md:mb-16'>
                    <h2 className='mb-3 sm:mb-4'>
                        <span
                            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
                            style={{
                                fontFamily: "Outfit, sans-serif",
                                color: COLORS.brandBlue,
                                fontWeight: 800,
                                lineHeight: 1,
                            }}
                        >
                            The Evolution Of Excellence
                        </span>
                    </h2>
                    <p
                        className='text-base sm:text-lg mt-4'
                        style={{
                            fontFamily: "Outfit, sans-serif",
                            color: COLORS.textGray700,
                        }}
                    >
                        From a single workspace to a growing national presence,
                        iSprout’s journey reflects steady expansion and
                        thoughtful growth.
                    </p>
                </div>
 
                {/* Timeline */}
                <div className='relative overflow-visible'>
                    {/* Vertical timeline line - Desktop only */}
                    <div className='absolute left-12 sm:left-16 top-12 bottom-12 w-px bg-black hidden md:block' />
 
                    {/* Up Arrow Circle at top - Desktop only */}
                    <div
                        className='absolute left-12 sm:left-16 top-0 -translate-x-1/2 hidden md:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 z-20'
                        style={{ backgroundColor: COLORS.brandYellow }}
                        onClick={handlePrev}
                    >
                        <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-5 h-5 sm:w-6 sm:h-6'
                        >
                            <path
                                d='M12 19V5M12 5L5 12M12 5L19 12'
                                stroke={COLORS.brandBlue}
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </div>
 
                    <div className='pt-0 pb-0 md:pt-20 md:pb-20'>
                        <AnimatePresence mode='wait' custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial='enter'
                                animate='center'
                                exit='exit'
                                transition={{
                                    duration: 0.45,
                                    ease: [0.25, 0.1, 0.25, 1],
                                }}
                                className='space-y-16 md:space-y-20 overflow-visible'
                            >
                                {currentEntries.map((milestone, idx) => (
                                    <motion.div
                                        key={milestone.year}
                                        initial={{
                                            opacity: 0,
                                            y: direction > 0 ? 40 : -40,
                                        }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: idx * 0.12,
                                            duration: 0.45,
                                            ease: [0.25, 0.1, 0.25, 1],
                                        }}
                                        className='relative mb-16 sm:mb-20 md:mb-24 overflow-visible'
                                    >
                                        {/* Timeline dot - on the line */}
                                        <div className='absolute left-[46.5px] sm:left-[62px] top-1/2 -translate-y-1/2 hidden md:block z-10'>
                                            <div
                                                className='w-3 h-3 rounded-full'
                                                style={{
                                                    backgroundColor:
                                                        COLORS.brandYellow,
                                                }}
                                            />
                                        </div>
 
                                        {/* Year pill - positioned close to line */}
                                        <div className='absolute left-[54px] sm:left-[70px] top-1/2 -translate-y-1/2 hidden md:block z-10 overflow-visible'>
                                            <div
                                                className='inline-block px-5 py-2'
                                                style={{
                                                    backgroundColor:
                                                        COLORS.brandYellow,
                                                    borderRadius:
                                                        "999px 0 999px 0",
                                                    ///clipPath:
                                                    //"polygon(0 0, 93% 0, 100% 50%, 93% 100%, 0 100%, 0 0)",
                                                }}
                                            >
                                                <span
                                                    className='text-base font-bold whitespace-nowrap'
                                                    style={{
                                                        fontFamily:
                                                            "Outfit, sans-serif",
                                                        color: COLORS.brandBlue,
                                                    }}
                                                >
                                                    {milestone.year}
                                                </span>
                                            </div>
                                        </div>
 
                                        {/* Content - Desktop and Mobile */}
                                        <div className='md:ml-[180px]'>
                                            {/* Desktop View */}
                                            <div className='hidden md:flex flex-row gap-4 md:gap-6 items-start'>
                                                {/* Image */}
                                                <motion.div
                                                    className='shrink-0'
                                                    initial={{
                                                        opacity: 0,
                                                        y:
                                                            direction > 0
                                                                ? 30
                                                                : -30,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        delay:
                                                            idx * 0.12 + 0.15,
                                                        duration: 0.45,
                                                        ease: [
                                                            0.25, 0.1, 0.25, 1,
                                                        ],
                                                    }}
                                                >
                                                    <div className='relative'>
                                                        <img
                                                            src={
                                                                milestone.image
                                                            }
                                                            alt={
                                                                milestone.title
                                                            }
                                                            className='w-[300px] h-[180px] sm:w-[320px] sm:h-[200px] shadow-lg object-cover rounded-lg'
                                                        />
                                                    </div>
                                                </motion.div>
 
                                                {/* Text Content */}
                                                <motion.div
                                                    className='flex-1'
                                                    initial={{
                                                        opacity: 0,
                                                        x: -25,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay: idx * 0.12 + 0.2,
                                                        duration: 0.45,
                                                        ease: [
                                                            0.25, 0.1, 0.25, 1,
                                                        ],
                                                    }}
                                                >
                                                    <div className='space-y-2 sm:space-y-3'>
                                                        {/* Title */}
                                                        <h3
                                                            className='text-xl sm:text-2xl lg:text-3xl font-bold wrap-break-word'
                                                            style={{
                                                                fontFamily:
                                                                    "Outfit, sans-serif",
                                                                color: COLORS.textGray900,
                                                            }}
                                                        >
                                                            {milestone.title}
                                                        </h3>
 
                                                        {/* Description */}
                                                        <p
                                                            className='text-sm sm:text-base lg:text-lg leading-relaxed wrap-break-word'
                                                            style={{
                                                                fontFamily:
                                                                    "Outfit, sans-serif",
                                                                color: COLORS.textGray700,
                                                            }}
                                                        >
                                                            {
                                                                milestone.description
                                                            }
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            </div>
 
                                            {/* Mobile View */}
                                            <div className='md:hidden flex flex-col items-center text-center'>
                                                {/* Image with Navigation Arrows */}
                                                <motion.div
                                                    className='relative w-full max-w-sm mb-6'
                                                    initial={{
                                                        opacity: 0,
                                                        y:
                                                            direction > 0
                                                                ? 30
                                                                : -30,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        delay: 0.15,
                                                        duration: 0.45,
                                                        ease: [
                                                            0.25, 0.1, 0.25, 1,
                                                        ],
                                                    }}
                                                >
                                                    <img
                                                        src={milestone.image}
                                                        alt={milestone.title}
                                                        className='w-full h-[240px] shadow-lg object-cover rounded-2xl'
                                                    />
 
                                                    {/* Left Arrow */}
                                                    <div
                                                        className='absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-all duration-300 bg-white/90 shadow-md z-10'
                                                        onClick={handlePrev}
                                                    >
                                                        <svg
                                                            width='20'
                                                            height='20'
                                                            viewBox='0 0 24 24'
                                                            fill='none'
                                                            xmlns='http://www.w3.org/2000/svg'
                                                        >
                                                            <path
                                                                d='M15 18L9 12L15 6'
                                                                stroke={
                                                                    COLORS.brandBlue
                                                                }
                                                                strokeWidth='2'
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                            />
                                                        </svg>
                                                    </div>
 
                                                    {/* Right Arrow */}
                                                    <div
                                                        className='absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-all duration-300 bg-white/90 shadow-md z-10'
                                                        onClick={handleNext}
                                                    >
                                                        <svg
                                                            width='20'
                                                            height='20'
                                                            viewBox='0 0 24 24'
                                                            fill='none'
                                                            xmlns='http://www.w3.org/2000/svg'
                                                        >
                                                            <path
                                                                d='M9 18L15 12L9 6'
                                                                stroke={
                                                                    COLORS.brandBlue
                                                                }
                                                                strokeWidth='2'
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                            />
                                                        </svg>
                                                    </div>
                                                </motion.div>
 
                                                {/* Text Content */}
                                                <motion.div
                                                    className='w-full px-4'
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        delay: 0.2,
                                                        duration: 0.45,
                                                        ease: [
                                                            0.25, 0.1, 0.25, 1,
                                                        ],
                                                    }}
                                                >
                                                    {/* Year */}
                                                    <div className='mb-4'>
                                                        <span
                                                            className='text-4xl font-bold'
                                                            style={{
                                                                fontFamily:
                                                                    "Outfit, sans-serif",
                                                                color: COLORS.brandBlue,
                                                            }}
                                                        >
                                                            {milestone.year}
                                                        </span>
                                                    </div>
 
                                                    {/* Title */}
                                                    <h3
                                                        className='text-2xl font-bold mb-3'
                                                        style={{
                                                            fontFamily:
                                                                "Outfit, sans-serif",
                                                            color: COLORS.textGray900,
                                                        }}
                                                    >
                                                        {milestone.title}
                                                    </h3>
 
                                                    {/* Description */}
                                                    <p
                                                        className='text-base leading-relaxed'
                                                        style={{
                                                            fontFamily:
                                                                "Outfit, sans-serif",
                                                            color: COLORS.textGray700,
                                                        }}
                                                    >
                                                        {milestone.description}
                                                    </p>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
 
                    {/* Down Arrow Circle at bottom - Desktop only */}
                    <div
                        className='absolute left-12 sm:left-16 bottom-0 -translate-x-1/2 hidden md:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 z-20'
                        style={{ backgroundColor: COLORS.brandYellow }}
                        onClick={handleNext}
                    >
                        <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-5 h-5 sm:w-6 sm:h-6'
                        >
                            <path
                                d='M12 5V19M12 19L19 12M12 19L5 12'
                                stroke={COLORS.brandBlue}
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};
 
export default Evolution;
 
 
