import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import aboutUsData from "../../content/aboutus.json";
import { COLORS } from "../../helpers/constants/Colors";
import { useAboutUs } from "../../hooks/useAboutUs";

interface TimelineItemProps {
    year: string;
    title: string;
    description: string;
    isTop: boolean;
    index: number;
}

interface Milestone {
    year: string;
    title: string;
    description: string;
    image?: string;
}

const STICK_HEIGHT = 80;
const CIRCLE_SIZE = 52;

const TimelineItem = ({ year, description, isTop, index }: Omit<TimelineItemProps, "title">) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    const truncated = description.length > 90 ? description.substring(0, 90) + "…" : description;

    const dot = (
        <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="rounded-full flex-shrink-0"
            style={{ width: 10, height: 10, backgroundColor: COLORS.brandBlue }}
        />
    );

    const stick = (
        <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
            style={{
                width: 2,
                height: STICK_HEIGHT,
                backgroundColor: COLORS.brandBlue,
                transformOrigin: isTop ? "bottom" : "top",
                flexShrink: 0,
            }}
        />
    );

    const circle = (
        <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: "spring", stiffness: 220 }}
            className="flex items-center justify-center rounded-full shadow-lg flex-shrink-0"
            style={{
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
                backgroundColor: "white",
                border: `3px solid ${COLORS.brandBlue}`,
            }}
        >
            <span
                className="text-xs font-bold"
                style={{ fontFamily: "Outfit, system-ui, sans-serif", color: COLORS.brandBlue }}
            >
                {year}
            </span>
        </motion.div>
    );

    const desc = (
        <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            className="text-center text-xs leading-snug w-32 flex-shrink-0"
            style={{ fontFamily: "Outfit, system-ui, sans-serif", color: COLORS.textGray700 }}
        >
            {truncated}
        </motion.p>
    );

    return (
        <div ref={ref} className="relative flex-shrink-0" style={{ width: "140px" }}>
            {isTop ? (
                /* Candy pointing UP — bottom of column sits on the horizontal line */
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
                    style={{ bottom: "50%" }}
                >
                    {desc}
                    <div className="mb-1" />
                    {circle}
                    {stick}
                    {dot}   {/* ← foot of the stick, sits exactly on the horizontal line */}
                </motion.div>
            ) : (
                /* Candy pointing DOWN — top of column sits on the horizontal line */
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
                    style={{ top: "50%" }}
                >
                    {dot}   {/* ← foot of the stick, sits exactly on the horizontal line */}
                    {stick}
                    {circle}
                    <div className="mt-1" />
                    {desc}
                </motion.div>
            )}
        </div>
    );
};

const Timeline4 = () => {
    const { data: aboutUsApiData } = useAboutUs();
    const milestones = aboutUsApiData?.evolution || aboutUsData.evolution;

    const sectionRef = useRef(null);
    const sectionInView = useInView(sectionRef, { once: false, amount: 0.2 });

    return (
        <section
            ref={sectionRef}
            id="timeline4"
            className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-white relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
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
                </motion.div>

                {/* Timeline — horizontally scrollable on mobile/tablet */}
                <div className="overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
                    <div
                        className="relative"
                        style={{ height: "480px", minWidth: `${milestones.length * 140}px` }}
                    >
                        {/* Animated horizontal line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={sectionInView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                            className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 z-0"
                            style={{
                                backgroundColor: COLORS.brandBlue,
                                transformOrigin: "left",
                            }}
                        />

                        {/* Items */}
                        <div className="relative flex items-center justify-center h-full gap-0 z-10">
                            {milestones.map((milestone: Milestone, index: number) => (
                                <TimelineItem
                                    key={milestone.year}
                                    year={milestone.year}
                                    description={milestone.description}
                                    isTop={index % 2 === 0}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline4;
