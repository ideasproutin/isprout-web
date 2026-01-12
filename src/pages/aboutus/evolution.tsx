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
			title: "iSprout Nexus",
			description:
				"The connection point! Nexus brought together innovation and collaboration in 45,000 sqft of pure creative energy. This is where communities formed, ideas collided, and workspace culture got a serious upgrade. The future of work was taking shape.",
			image: evolution2019,
			imageStyle: "rounded-3xl",
		},
		{
			year: "2020",
			title: "iSprout Adapt",
			description:
				"Rising to the challenge! 2020 taught us resilience, and Adapt became our answer. We reimagined flexible workspaces for a changing world, proving that great design can thrive anywhere. Safety met style, and hybrid work found its home.",
			image: evolution2020,
			imageStyle: "rounded-3xl",
		},
		{
			year: "2021",
			title: "iSprout Elevate",
			description:
				"Taking it up a notch! With 62,000 sqft of premium workspace, Elevate redefined luxury coworking. Premium amenities, world-class design, and an atmosphere that inspires excellence. This is where ambition meets opportunity.",
			image: evolution2021,
			imageStyle: "rounded-3xl",
		},
		{
			year: "2022",
			title: "iSprout Connect",
			description:
				"Building bridges! Connect wasn't just about space – it was about bringing people together. With smart technology and thoughtful design across 55,000 sqft, we created environments where collaboration happens naturally and innovation thrives.",
			image: evolution2022,
			imageStyle: "rounded-3xl",
		},
		{
			year: "2023",
			title: "iSprout Vertex",
			description:
				"The pinnacle of design! Vertex represented our most ambitious vision yet. Spanning 80,000 sqft, this architectural marvel combined sustainability with sophistication. Green spaces, cutting-edge tech, and workspace reimagined for tomorrow.",
			image: evolution2023,
			imageStyle: "rounded-3xl",
		},
		{
			year: "2024",
			title: "iSprout Horizon",
			description:
				"Looking forward! Horizon expanded our reach with 70,000 sqft of forward-thinking workspace. Innovation labs, wellness zones, and spaces designed for the future of work. The horizon isn't a limit – it's an invitation.",
			image: evolution2024,
			imageStyle: "rounded-3xl",
		},
		{
			year: "2025",
			title: "iSprout Infinity",
			description:
				"The journey continues! Infinity represents endless possibilities. With 100,000 sqft of next-generation workspace, we're writing the next chapter. This is where dreams scale, businesses flourish, and the future unfolds. The best is yet to come!",
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
		<section className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-white overflow-hidden'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='text-center mb-12 sm:mb-14 md:mb-16'>
					<h2
						className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.textGray900,
						}}
					>
						The Evolution Of Excellence
					</h2>
					<p
						className='text-base sm:text-lg mt-4'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.textGray700,
						}}
					>
						Our Journey Through Time
					</p>
				</div>

				{/* Timeline */}
				<div className='relative'>
					{/* Vertical timeline line */}
					<div className='absolute left-12 sm:left-16 top-4 bottom-4 w-[2px] bg-black hidden md:block' />

					{/* Up Arrow Circle at top */}
					<div
						className='absolute left-6 sm:left-10 -top-8 hidden md:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer hover:scale-105 transition-transform z-20'
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
								className='space-y-16 md:space-y-20'
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
										className='relative mb-16 sm:mb-20 md:mb-24'
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
										<div className='absolute left-[54px] sm:left-[70px] top-1/2 -translate-y-1/2 hidden md:block z-10'>
											<div
												className='inline-block px-3 py-1 rounded-full'
												style={{
													backgroundColor:
														COLORS.brandYellow,
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
										<div className='md:hidden mb-4'>
											<div
												className='inline-block px-4 py-1.5 rounded-full'
												style={{
													backgroundColor:
														COLORS.brandYellow,
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
														className={`w-[300px] h-[180px] sm:w-[320px] sm:h-[200px] ${milestone.imageStyle} shadow-lg object-cover`}
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
						className='absolute left-6 sm:left-10 -bottom-8 hidden md:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer hover:scale-105 transition-transform z-20'
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
