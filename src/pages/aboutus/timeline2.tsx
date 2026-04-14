import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import aboutUsData from "../../content/aboutus.json";
import { COLORS } from "../../helpers/constants/Colors";
import { useAboutUs } from "../../hooks/useAboutUs";

// Icon components for each milestone
const icons = {
    2017: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill={"none"} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    2018: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="white" strokeWidth="2"/>
            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" strokeWidth="2"/>
        </svg>
    ),
    2019: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2"/>
            <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    ),
    2020: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11L12 14L22 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    2021: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    2022: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    2023: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 20V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 20V4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 20V14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    2024: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    2025: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.27002 6.96L12 12.01L20.73 6.96" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22.08V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
};

interface TimelineItemProps {
    year: string;
    title: string;
    description: string;
    isLeft: boolean;
    index: number;
    totalItems: number;
}

interface Milestone {
    year: string;
    title: string;
    description: string;
    image?: string;
}

const TimelineItem = ({ year, title, description, isLeft, index, totalItems }: TimelineItemProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { 
        once: false, 
        amount: 0.3,
        margin: "0px 0px -100px 0px" 
    });

    // Show items when they scroll into view
    const shouldShow = isInView;
    
    // Calculate progressive circle fill dynamically - first item ~25%, last item 100%
    const progressFill = totalItems > 1 
        ? 0.25 + (index / (totalItems - 1)) * 0.75 
        : 0.95;

    return (
        <div ref={ref} className="relative flex items-center justify-center min-h-[200px] my-8 md:my-12">
            {/* Desktop Layout */}
            <div className="hidden md:flex w-full max-w-6xl items-center justify-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={shouldShow && isLeft ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex-1 pr-16 flex justify-end items-center"
                >
                    {isLeft && (
                        <div className="max-w-md space-y-3 text-right">
                            <motion.div 
                                className="flex items-center justify-end gap-3"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={shouldShow ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                            >
                                <div className="p-3 rounded-xl shadow-sm" style={{ backgroundColor: COLORS.brandYellow }}>
                                    {icons[year as unknown as keyof typeof icons] || icons[2025]}
                                </div>
                            </motion.div>
                            <motion.h3 
                                className="text-2xl font-bold"
                                style={{ 
                                    fontFamily: "Outfit, system-ui, sans-serif",
                                    color: COLORS.brandBlue 
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                            >
                                {title}
                            </motion.h3>
                            <motion.p 
                                className="text-base leading-relaxed"
                                style={{ 
                                    fontFamily: "Outfit, system-ui, sans-serif",
                                    color: COLORS.textGray700 
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                            >
                                {description}
                            </motion.p>
                        </div>
                    )}
                </motion.div>

                {/* Center Circle with Year */}
                <div className="relative flex items-center justify-center flex-shrink-0">
                    {/* Dotted connector line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={shouldShow ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="absolute w-16 h-px border-t-2 border-dotted"
                        style={{ 
                            borderColor: COLORS.brandBlue,
                            [isLeft ? 'right' : 'left']: '100%',
                            transformOrigin: isLeft ? 'right' : 'left'
                        }}
                    />

                    {/* Circular node */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={shouldShow ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                        className="relative z-10"
                    >
                        {/* Outer ring with progress arc */}
                        <div className="relative w-24 h-24">
                            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                                {/* Background circle */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="white"
                                    stroke="#E5E7EB"
                                    strokeWidth="3"
                                />
                                {/* Progress arc */}
                                <motion.circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke={COLORS.brandBlue}
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={shouldShow ? { pathLength: progressFill } : { pathLength: 0 }}
                                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                                />
                            </svg>
                            {/* Year text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={shouldShow ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.4, delay: 0.6 }}
                                    className="text-xl font-bold"
                                    style={{ 
                                        fontFamily: "Outfit, system-ui, sans-serif",
                                        color: COLORS.brandBlue 
                                    }}
                                >
                                    {year}
                                </motion.span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={shouldShow && !isLeft ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex-1 pl-16 flex justify-start items-center"
                >
                    {!isLeft && (
                        <div className="max-w-md space-y-3 text-left">
                            <motion.div 
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={shouldShow ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                            >
                                <div className="p-3 rounded-xl shadow-sm" style={{ backgroundColor: COLORS.brandYellow }}>
                                    {icons[year as unknown as keyof typeof icons] || icons[2025]}
                                </div>
                            </motion.div>
                            <motion.h3 
                                className="text-2xl font-bold"
                                style={{ 
                                    fontFamily: "Outfit, system-ui, sans-serif",
                                    color: COLORS.brandBlue 
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                            >
                                {title}
                            </motion.h3>
                            <motion.p 
                                className="text-base leading-relaxed"
                                style={{ 
                                    fontFamily: "Outfit, system-ui, sans-serif",
                                    color: COLORS.textGray700 
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                            >
                                {description}
                            </motion.p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden w-full px-4 flex gap-6">
                {/* Center line and circle */}
                <div className="flex flex-col items-center" style={{ marginLeft: '-24px' }}>
                    {/* Circular node */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={shouldShow ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                        className="relative z-10"
                    >
                        <div className="relative w-20 h-20">
                            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="white"
                                    stroke="#E5E7EB"
                                    strokeWidth="3"
                                />
                                <motion.circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke={COLORS.brandBlue}
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={shouldShow ? { pathLength: progressFill } : { pathLength: 0 }}
                                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={shouldShow ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.4, delay: 0.6 }}
                                    className="text-lg font-bold"
                                    style={{ 
                                        fontFamily: "Outfit, system-ui, sans-serif",
                                        color: COLORS.brandBlue 
                                    }}
                                >
                                    {year}
                                </motion.span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right content */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={shouldShow ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex-1 space-y-3 pt-2"
                >
                    <motion.div 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={shouldShow ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                    >
                        <div className="p-2.5 rounded-xl shadow-sm" style={{ backgroundColor: COLORS.brandYellow }}>
                            {icons[year as unknown as keyof typeof icons] || icons[2025]}
                        </div>
                    </motion.div>
                    <motion.h3 
                        className="text-lg font-bold"
                        style={{ 
                            fontFamily: "Outfit, system-ui, sans-serif",
                            color: COLORS.brandBlue 
                        }}
                        initial={{ opacity: 0, y: 15 }}
                        animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                    >
                        {title}
                    </motion.h3>
                    <motion.p 
                        className="text-sm leading-relaxed"
                        style={{ 
                            fontFamily: "Outfit, system-ui, sans-serif",
                            color: COLORS.textGray700 
                        }}
                        initial={{ opacity: 0, y: 15 }}
                        animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                    >
                        {description}
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};

const Timeline2 = () => {
    const { data: aboutUsApiData } = useAboutUs();
    const milestones = aboutUsApiData?.evolution || aboutUsData.evolution;
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const timelineContentRef = useRef<HTMLDivElement>(null);
    const [lineHeight, setLineHeight] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollContainerRef.current || !timelineContentRef.current) return;
            
            const container = scrollContainerRef.current;
            const scrolled = container.scrollTop;
            const scrollableHeight = container.scrollHeight - container.clientHeight;
            const percentage = scrollableHeight > 0 ? Math.min(Math.max(scrolled / scrollableHeight, 0), 1) : 0;
            
            setLineHeight(percentage * 100);
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial calculation
            
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <section
            id="timeline2"
            className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-white relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="mb-4">
                        <span
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                            style={{
                                fontFamily: "Outfit, system-ui, sans-serif",
                                color: COLORS.brandBlue,
                                fontWeight: 800,
                                lineHeight: 1.2,
                            }}
                        >
                            The Evolution Of Excellence
                        </span>
                    </h2>
                    <p
                        className="text-base sm:text-lg mt-4 max-w-2xl mx-auto"
                        style={{
                            fontFamily: "Outfit, system-ui, sans-serif",
                            color: COLORS.textGray700,
                        }}
                    >
                        From a single workspace to a growing national presence, iSprout's journey reflects steady expansion and thoughtful growth.
                    </p>
                </div>

                {/* Scrollable Timeline Container */}
                <div 
                    ref={scrollContainerRef}
                    className="relative overflow-y-auto overflow-x-hidden rounded-xl shadow-lg"
                    style={{ 
                        height: '600px',
                        scrollbarWidth: 'thin',
                        scrollbarColor: `${COLORS.brandBlue} #E5E7EB`
                    }}
                >
                    {/* Custom scrollbar styles for webkit browsers */}
                    <style>{`
                        #timeline2 .overflow-y-auto::-webkit-scrollbar {
                            width: 8px;
                        }
                        #timeline2 .overflow-y-auto::-webkit-scrollbar-track {
                            background: #E5E7EB;
                            border-radius: 4px;
                        }
                        #timeline2 .overflow-y-auto::-webkit-scrollbar-thumb {
                            background: ${COLORS.brandBlue};
                            border-radius: 4px;
                        }
                        #timeline2 .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                            background: ${COLORS.brandYellow};
                        }
                    `}</style>

                    <div ref={timelineContentRef} className="relative py-12 px-4">
                        {/* Vertical Line - Desktop */}
                        <div className="absolute left-1/2 top-[60px] bottom-[60px] w-1 -translate-x-1/2 hidden md:block">
                            {/* Background line */}
                            <div 
                                className="absolute inset-0 w-full"
                                style={{ backgroundColor: '#E5E7EB' }}
                            />
                            {/* Animated progress line */}
                            <motion.div
                                className="absolute top-0 w-full"
                                style={{ 
                                    backgroundColor: COLORS.brandBlue,
                                    height: `${lineHeight}%`
                                }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        {/* Vertical Line - Mobile */}
                        <div className="absolute top-[40px] bottom-[40px] w-0.5 md:hidden" style={{ left: '50px' }}>
                            <div 
                                className="absolute inset-0 w-full"
                                style={{ backgroundColor: '#E5E7EB' }}
                            />
                            <motion.div
                                className="absolute top-0 w-full"
                                style={{ 
                                    backgroundColor: COLORS.brandBlue,
                                    height: `${lineHeight}%`
                                }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        {/* Timeline Items */}
                        <div className="relative">
                            {milestones.map((milestone: Milestone, index: number) => (
                                <TimelineItem
                                    key={milestone.year}
                                    year={milestone.year}
                                    title={milestone.title}
                                    description={milestone.description}
                                    isLeft={index % 2 === 0}
                                    index={index}
                                    totalItems={milestones.length}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="text-center mt-6">
                    <p
                        className="text-sm animate-pulse"
                        style={{
                            fontFamily: "Outfit, system-ui, sans-serif",
                            color: COLORS.textGray700,
                        }}
                    >
                        ↓ Scroll within the timeline ↓
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Timeline2;
