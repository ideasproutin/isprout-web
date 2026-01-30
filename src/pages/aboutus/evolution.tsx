import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import aboutUsData from "../../content/aboutus";
import { COLORS } from "../../helpers/constants/Colors";

const Evolution = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);
	const milestones = aboutUsData.evolution;

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
		<section className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-white overflow-visible'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='text-center mb-12 sm:mb-14 md:mb-16'>
					<h2 className='mb-3 sm:mb-4'>
						<span
							className='inline-block rounded-2xl px-6 py-3 sm:px-8 sm:py-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
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
					{/* Vertical timeline line */}
					<div className='absolute left-12 sm:left-16 top-4 bottom-4 w-[1px] bg-black hidden md:block' />

					{/* Up Arrow Circle at top */}
					<div
						className='absolute left-12 sm:left-16 -top-8 -translate-x-1/2 hidden md:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer hover:scale-105 transition-transform z-20'
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

					<div className='pt-16 pb-16'>
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

										{/* Mobile year badge */}
										<div className='md:hidden mb-4 overflow-visible'>
											<div
												className='inline-block px-5 py-2'
												style={{
													backgroundColor:
														COLORS.brandYellow,
													borderRadius:
														"999px 0 999px 0",
													clipPath:
														"polygon(0 0, 93% 0, 100% 50%, 93% 100%, 0 100%, 0 0)",
												}}
											>
												<span
													className='text-lg font-bold'
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

										{/* Content - Image and Text (moved to accommodate year pill) */}
										<div className='md:ml-[180px] flex flex-col md:flex-row gap-4 md:gap-6 items-start'>
											{/* Image */}
											<div className='flex-shrink-0'>
												<div className='relative'>
													<img
														src={milestone.image}
														alt={milestone.title}
														className='w-[300px] h-[180px] sm:w-[320px] sm:h-[200px] shadow-lg object-cover'
													/>
												</div>
											</div>

											{/* Text Content */}
											<div className='flex-1'>
												<div className='space-y-2 sm:space-y-3'>
													{/* Title */}
													<h3
														className='text-xl sm:text-2xl lg:text-3xl font-bold break-words'
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
														className='text-sm sm:text-base lg:text-lg leading-relaxed break-words'
														style={{
															fontFamily:
																"Outfit, sans-serif",
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
						className='absolute left-12 sm:left-16 -bottom-8 -translate-x-1/2 hidden md:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer hover:scale-105 transition-transform z-20'
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
