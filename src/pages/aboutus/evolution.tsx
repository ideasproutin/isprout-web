import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import evolution2017 from "../../assets/evolution/evolution2017.jpg";
import evolution2018 from "../../assets/evolution/evolution2018.jpeg";
import evolution2019 from "../../assets/evolution/evolution2019.jpg";
import evolution2020 from "../../assets/evolution/evolution2020.png";
import evolution2021 from "../../assets/evolution/evolution2021.jpg";
import evolution2022 from "../../assets/evolution/evolution2022.jpg";
import evolution2023 from "../../assets/evolution/evolution2023.png";
import evolution2024 from "../../assets/evolution/evolution2024.png";
import evolution2025 from "../../assets/evolution/evolution2025.jpg";
import { COLORS } from "../../helpers/constants/Colors";

const Evolution = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const milestones = [
    {
      year: "2017",
      title: "iSprout Profound",
      description:
        "Where it all began! Our cozy 12,500 sqft launchpad proved that big dreams start in small spaces. This is where we first sprinkled our workspace magic, setting the stage for an incredible journey. Profound by name, and profound by nature – this center kickstarted our mission to revolutionize work life.",
      image: evolution2017,
      imageStyle: "rounded-3xl",
    },
    {
      year: "2018",
      title: "iSprout Summit",
      description:
        "Summit by name, summit by ambition! This 97,996 sqft powerhouse took us to new heights. With stunning views and even more stunning workspaces, Summit proved we were serious about scaling up. It's not just an office – it's a peak performance zone!",
      image: evolution2018,
      imageStyle: "rounded-3xl",
    },
    {
      year: "2019",
      title: "iSprout Amaravathi, Sohini, Jade ",
      description:
        "Triple the centres, triple the awesome! Amaravathi, Sohini, and Jade brought 1,95,826 sqft of workspace wonder to the table. Each with its own flavour, these centres showed that iSprout could adapt and thrive in different environments. It's not just growth – it's evolution! ",
      image: evolution2019,
      imageStyle: "rounded-3xl",
    },
    {
      year: "2020",
      title: "iSprout SMT ",
      description:
        "In a year when the world slowed down, we sped up! SMT added another 2,43,472 sqft to our portfolio, proving that not even a global pandemic could stop the iSprout revolution. This centre is a testament to resilience, innovation, and our commitment to providing amazing workspaces, come what may. ",
      image: evolution2020,
      imageStyle: "rounded-3xl",
    },
    {
      year: "2021",
      title: "Teck Park Hinjewadi ",
      description:
        "Hello, 2,65,004 sqft of tech-tastic workspace goodness! Teck Park Hinjewadi isn't just an office – it's a launchpad for the next big tech breakthrough. With cutting-edge facilities and a buzzing community of innovators, this center is where tech dreams become reality. ",
      image: evolution2021,
      imageStyle: "rounded-3xl",
    },
    {
      year: "2022",
      title: "iSprout Twitza and Trinity ",
      description:
        "Double trouble, double awesome! Twitza and Trinity brought 4,44,766 sqft of workspace wonder to the iSprout family. These twin towers of productivity offer double the opportunities, double the networking and double the success potential. Two centers, one mission: to make work life extraordinary! ",
      image: evolution2022,
      imageStyle: "rounded-3xl",
    },
    {
      year: "2023",
      title: "iSprout Tech Park One, Shilpitha, Shresta, Orbit ",
      description:
        "Four fantastic additions totalling a whopping 9,89,905 sqft! Tech Park One, Shilpitha, Shresta, and Orbit aren't just offices – they're entire ecosystems of innovation. From tech titans to creative geniuses, these centres cater to every work style and ambition. ",
      image: evolution2023,
      imageStyle: "rounded-3xl",
    },
    {
      year: "2024",
      title:
        "SAS Tower, NR Enclave, Greystone, Trendset, One Golden Mile, HQ-27 ",
      description:
        "The future is here, and it spans 15,54,163 sqft! Our 2024 lineup isn't just impressive – it's galaxy-brain-level awesome. With six unique centres, we're not just changing the workspace game; we're rewriting the rules. Welcome to the next evolution of work life! ",
      image: evolution2024,
      imageStyle: "rounded-3xl",
    },
    {
      year: "2025",
      title:
        "iSprout Pranava One, PSA, Minaas, Medha Towers, Godrej Waterside, Sigapi Achi, Aurelien, Lansum Square ",
      description:
        "A milestone worth celebrating! With 23,80,588 sqft. Added to our expanding network of workspaces in 2025, iSprout is pushing boundaries like never before. These new centres aren’t just offices, they’re vibrant communities where entrepreneurs rise, businesses scale, and teams thrive. This expansion reflects our commitment to creating work environments that inspire excellence every single day. !",
      image: evolution2025,
      imageStyle: "rounded-3xl",
    },
  ];

  const getCurrentEntries = () => {
    const entries = [];
    entries.push(milestones[currentIndex]);
    if (currentIndex + 1 < milestones.length) {
      entries.push(milestones[currentIndex + 1]);
    }
    return entries;
  };

  const handleNext = () => {
    setDirection(1);
    if (currentIndex + 2 >= milestones.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 2);
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    if (currentIndex === 0) {
      setCurrentIndex(Math.max(0, milestones.length - 2));
    } else {
      setCurrentIndex(Math.max(0, currentIndex - 2));
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
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-white overflow-visible">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <h2 className="mb-3 sm:mb-4">
            <span
              className="inline-block rounded-2xl px-6 py-3 sm:px-8 sm:py-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              style={{
                fontFamily: "Outfit, sans-serif",
                backgroundColor: COLORS.brandBlue,
                border: `6px solid ${COLORS.brandYellow}`,
                color: COLORS.textWhite,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              The Evolution Of Excellence
            </span>
          </h2>
          <p
            className="text-base sm:text-lg mt-4"
            style={{
              fontFamily: "Outfit, sans-serif",
              color: COLORS.textGray700,
            }}
          >
            Our Journey Through Time
          </p>
        </div>

        {/* Timeline */}
        <div className="relative overflow-visible">
          {/* Vertical timeline line */}
          <div className="absolute left-12 sm:left-16 top-4 bottom-4 w-[1px] bg-black hidden md:block" />

          {/* Up Arrow Circle at top */}
          <div
            className="absolute left-12 sm:left-16 -top-8 -translate-x-1/2 hidden md:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer hover:scale-105 transition-transform z-20"
            style={{ backgroundColor: COLORS.brandYellow }}
            onClick={handlePrev}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                d="M12 19V5M12 5L5 12M12 5L19 12"
                stroke={COLORS.brandBlue}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="pt-16 pb-16">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.45,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="space-y-16 md:space-y-20 overflow-visible"
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
                    className="relative mb-16 sm:mb-20 md:mb-24 overflow-visible"
                  >
                    {/* Timeline dot - on the line */}
                    <div className="absolute left-[46.5px] sm:left-[62px] top-1/2 -translate-y-1/2 hidden md:block z-10">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: COLORS.brandYellow,
                        }}
                      />
                    </div>

                    {/* Year pill - positioned close to line */}
                    <div className="absolute left-[54px] sm:left-[70px] top-1/2 -translate-y-1/2 hidden md:block z-10 overflow-visible">
                      <div
                        className="inline-block px-5 py-2"
                        style={{
                          backgroundColor: COLORS.brandYellow,
                          borderRadius: "999px 0 999px 0",
                          ///clipPath:
                          //"polygon(0 0, 93% 0, 100% 50%, 93% 100%, 0 100%, 0 0)",
                        }}
                      >
                        <span
                          className="text-base font-bold whitespace-nowrap"
                          style={{
                            fontFamily: "Outfit, sans-serif",
                            color: COLORS.brandBlue,
                          }}
                        >
                          {milestone.year}
                        </span>
                      </div>
                    </div>

                    {/* Mobile year badge */}
                    <div className="md:hidden mb-4 overflow-visible">
                      <div
                        className="inline-block px-5 py-2"
                        style={{
                          backgroundColor: COLORS.brandYellow,
                          borderRadius: "999px 0 999px 0",
                          clipPath:
                            "polygon(0 0, 93% 0, 100% 50%, 93% 100%, 0 100%, 0 0)",
                        }}
                      >
                        <span
                          className="text-lg font-bold"
                          style={{
                            fontFamily: "Outfit, sans-serif",
                            color: COLORS.brandBlue,
                          }}
                        >
                          {milestone.year}
                        </span>
                      </div>
                    </div>

                    {/* Content - Image and Text (moved to accommodate year pill) */}
                    <div className="md:ml-[180px] flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <img
                            src={milestone.image}
                            alt={milestone.title}
                            className={`w-[300px] h-[180px] sm:w-[320px] sm:h-[200px] ${milestone.imageStyle} shadow-lg object-cover`}
                          />
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <div className="space-y-2 sm:space-y-3">
                          {/* Title */}
                          <h3
                            className="text-xl sm:text-2xl lg:text-3xl font-bold break-words"
                            style={{
                              fontFamily: "Outfit, sans-serif",
                              color: COLORS.textGray900,
                            }}
                          >
                            {milestone.title}
                          </h3>

                          {/* Description */}
                          <p
                            className="text-sm sm:text-base lg:text-lg leading-relaxed break-words"
                            style={{
                              fontFamily: "Outfit, sans-serif",
                              color: COLORS.textGray700,
                            }}
                          >
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Down Arrow Circle at bottom */}
          <div
            className="absolute left-12 sm:left-16 -bottom-8 -translate-x-1/2 hidden md:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer hover:scale-105 transition-transform z-20"
            style={{ backgroundColor: COLORS.brandYellow }}
            onClick={handleNext}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                d="M12 5V19M12 19L19 12M12 19L5 12"
                stroke={COLORS.brandBlue}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Evolution;
