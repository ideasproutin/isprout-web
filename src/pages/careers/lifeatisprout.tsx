import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import lifeatisprout1 from "../../assets/lifeatisprout/lifeatisprout1.jpg";
import lifeatisprout2 from "../../assets/lifeatisprout/lifeatisprout2.jpg";
import lifeatisprout3 from "../../assets/lifeatisprout/lifeatisprout3.jpg";
import lifeatisprout4 from "../../assets/lifeatisprout/lifeatisprout4.jpg";
import lifeatisprout5 from "../../assets/lifeatisprout/lifeatisprout5.jpg";
import lifeatisprout6 from "../../assets/lifeatisprout/lifeatisprout6.png";
import lifeatisprout7 from "../../assets/lifeatisprout/lifeatisprout7.png";
import lifeatisprout8 from "../../assets/lifeatisprout/lifeatisprout8.jpg";

const LifeAtISprout: React.FC = () => {
	const [currentSet, setCurrentSet] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const [direction, setDirection] = useState<"next" | "prev">("next");

	// Group images into sets of 4
	const imageSets = [
		[lifeatisprout1, lifeatisprout2, lifeatisprout3, lifeatisprout4],
		[lifeatisprout5, lifeatisprout6, lifeatisprout7, lifeatisprout8],
	];

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
		const interval = setInterval(handleNext, 5000);
		return () => clearInterval(interval);
	}, [isHovered]);

	const currentImages = imageSets[currentSet];

	return (
		<section className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden'>
			<div className='max-w-7xl mx-auto'>
				{/* Heading with Navigation */}
				<div className='flex items-center justify-between mb-12 sm:mb-16'>
					<div className='flex items-center gap-4'>
						<span
							className='w-1 h-16 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full'
							style={{ backgroundColor: "#FFDE00" }}
						></span>
						<h2
							className='text-4xl sm:text-5xl md:text-6xl font-bold'
							style={{
								fontFamily: "Otomanopee One, sans-serif",
								color: "#00275c",
							}}
						>
							Life At iSprout
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
							<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
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
							<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
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
							<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
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
							<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
						</div>
					</div>
				</div>

				{/* Indicator Dots */}
				<div className='flex justify-center gap-3 mt-12'>
					{imageSets.map((_, index) => (
						<button
							key={index}
							onClick={() => {
								setDirection(
									index > currentSet ? "next" : "prev",
								);
								setCurrentSet(index);
							}}
							className={`h-3 rounded-full transition-all duration-300 ${
								index === currentSet
									? "w-8 bg-gradient-to-r from-yellow-400 to-yellow-500"
									: "w-3 bg-gray-300 hover:bg-gray-400"
							}`}
							aria-label={`Go to set ${index + 1}`}
						/>
					))}
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
