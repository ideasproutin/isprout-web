import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import careersData from "../../content/careersData.json";
import { useCareers } from "../../hooks/useCareers";
import { COLORS } from "../../helpers/constants/Colors";

const LifeAtISprout: React.FC = () => {
	const [currentSet, setCurrentSet] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const [direction, setDirection] = useState<"next" | "prev">("next");

	// Fetch careers data from API
	const { data: apiCareersData, isLoading, isError } = useCareers();

	// Use API data if available, otherwise fall back to local JSON
	const careersDataSource = apiCareersData || careersData;

	// Get image sets from careersData
	const imageSets = careersDataSource.lifeAtISproutData.imageSets;

	const handleNext = () => {
		setDirection("next");
		setCurrentSet((prev) => (prev + 1) % imageSets.length);
	};

	const handlePrev = () => {
		setDirection("prev");
		setCurrentSet(
			(prev) => (prev - 1 + imageSets.length) % imageSets.length,
		);
	};

	// Auto-rotate every 5 seconds
	useEffect(() => {
		if (isHovered) return;
		const interval = setInterval(
			handleNext,
			careersDataSource.lifeAtISproutData.autoRotateInterval,
		);
		return () => clearInterval(interval);
	}, [isHovered, careersDataSource]);

	const currentImages = imageSets[currentSet];

	if (isLoading) {
		return (
			<section className='py-16 px-4 md:px-8 lg:px-16 bg-white'>
				<div className='max-w-7xl mx-auto'>
					<div className='flex justify-center items-center h-64'>
						<p
							className='text-xl'
							style={{ color: COLORS.textGray }}
						>
							Loading...
						</p>
					</div>
				</div>
			</section>
		);
	}

	if (isError) {
		console.error("Failed to fetch careers data, using local data");
	}

	return (
		<section
			id='life-at-isprout'
			className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-16 bg-linear-to-b from-white via-slate-50 to-white overflow-hidden'
		>
			<div className='max-w-7xl mx-auto'>
				{/* Heading with Navigation */}
				<div className='flex items-center justify-between mb-12 sm:mb-16'>
					<div className='flex items-center gap-4'>
						<span
							className='w-1 h-16 bg-linear-to-b from-yellow-400 to-yellow-500 rounded-full'
							style={{
								backgroundColor:
									careersDataSource.lifeAtISproutData
										.accentColor,
							}}
						></span>
						<h2
							className='text-4xl sm:text-5xl md:text-6xl font-bold'
							style={{
								fontFamily: "Otomanopee One, sans-serif",
								color: "#00275c",
							}}
						>
							{careersDataSource.lifeAtISproutData.title}
						</h2>
					</div>

					{/* Navigation Buttons */}
					<div className='flex gap-3'>
						<button
							onClick={handlePrev}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
							className='w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-yellow-50 border-2 border-gray-200 hover:border-yellow-400 group'
							aria-label='Previous'
						>
							<FaChevronLeft
								className='text-gray-700 group-hover:text-yellow-500 transition-colors'
								size={18}
							/>
						</button>
						<button
							onClick={handleNext}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
							className='w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-yellow-50 border-2 border-gray-200 hover:border-yellow-400 group'
							aria-label='Next'
						>
							<FaChevronRight
								className='text-gray-700 group-hover:text-yellow-500 transition-colors'
								size={18}
							/>
						</button>
					</div>
				</div>

				{/* Image Grid with Carousel Animation */}
				<div
					className='grid grid-cols-12 gap-4 transition-all duration-700 ease-in-out'
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{/* Top Row */}
					<div
						className={`col-span-12 md:col-span-4 transition-all duration-700 ease-out transform ${
							direction === "next"
								? "animate-slide-in-left"
								: "animate-slide-in-right"
						}`}
					>
						<div className='relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl group cursor-pointer transition-all duration-300'>
							<img
								src={currentImages[0]}
								alt='Life at iSprout'
								className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out'
							/>
							<div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
						</div>
					</div>

					<div
						className={`col-span-12 md:col-span-8 transition-all duration-700 ease-out transform ${
							direction === "next"
								? "animate-slide-in-left-delay"
								: "animate-slide-in-right-delay"
						}`}
					>
						<div className='relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl group cursor-pointer transition-all duration-300'>
							<img
								src={currentImages[1]}
								alt='Life at iSprout'
								className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out'
							/>
							<div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
						</div>
					</div>

					{/* Bottom Row */}
					<div
						className={`col-span-12 md:col-span-7 transition-all duration-700 ease-out transform ${
							direction === "next"
								? "animate-slide-in-left-delay-2"
								: "animate-slide-in-right-delay-2"
						}`}
					>
						<div className='relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl group cursor-pointer transition-all duration-300'>
							<img
								src={currentImages[2]}
								alt='Life at iSprout'
								className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out'
							/>
							<div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
						</div>
					</div>

					<div
						className={`col-span-12 md:col-span-5 transition-all duration-700 ease-out transform ${
							direction === "next"
								? "animate-slide-in-left-delay-3"
								: "animate-slide-in-right-delay-3"
						}`}
					>
						<div className='relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl group cursor-pointer transition-all duration-300'>
							<img
								src={currentImages[3]}
								alt='Life at iSprout'
								className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out'
							/>
							<div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
						</div>
					</div>
				</div>
			</div>

			{/* Carousel Animation Styles */}
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
		</section>
	);
};

export default LifeAtISprout;
