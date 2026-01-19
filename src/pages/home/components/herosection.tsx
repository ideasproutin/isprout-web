import React, { useState, useEffect } from "react";
import { homePageImages } from "../../../assets";

type HeroSectionProps = {
	onViewLocations?: () => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({ onViewLocations }) => {
	const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

	const heroImages = [
		homePageImages.homeHero1,
		homePageImages.homeHero2,
		homePageImages.homeHero3,
		homePageImages.homeHero4,
	];

	const heroHeadings = [
		"COLLABORATIVE HUBS",
		"CREATIVE CORNERS",
		"VIBRANT WORKSPACES",
		"Smart Spaces",
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentHeroIndex(
				(prevIndex) => (prevIndex + 1) % heroImages.length,
			);
		}, 5000);

		return () => clearInterval(interval);
	}, [heroImages.length]);

	return (
		<section className='relative w-full min-h-screen flex items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden -mt-20 pb-32'>
			{/* Hero Carousel */}
			<div className='absolute inset-0 w-full h-full z-0'>
				<div className='relative w-full h-full overflow-hidden'>
					{heroImages.map((image, index) => (
						<img
							key={index}
							src={image}
							alt={`Hero Background ${index + 1}`}
							style={{
								transform: `translateX(${(index - currentHeroIndex) * 100}%)`,
								transition: "transform 1000ms ease-in-out",
							}}
							className='absolute inset-0 w-full h-full object-cover'
						/>
					))}
				</div>
			</div>

			{/* Yellow Gradient - Left */}
			<img
				src={homePageImages.yellowGradient}
				alt=''
				className='absolute left-0 top-0 h-[calc(100%+20rem)] w-120 object-cover -mt-30 z-10'
			/>

			{/* Blue Gradient - Right */}
			<img
				src={homePageImages.blueGradient}
				alt=''
				className='absolute right-0 top-0 h-[calc(100%+20rem)] w-120 object-cover -mt-4 z-10'
			/>

			{/* Dynamic Heading and CTA */}
			<div className='absolute inset-0 flex flex-col items-center justify-center gap-8 z-20 px-4'>
				<h1
					key={currentHeroIndex}
					className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center tracking-wider animate-fade-in font-lateef'
					style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)" }}
				>
					{heroHeadings[currentHeroIndex]}
				</h1>

				<div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-center'>
					<button
						className='px-18 sm:px-22 md:px-26 py-8 sm:py-9 md:py-10 text-gray-900 text-xl sm:text-2xl md:text-3xl font-bold rounded-full transition-colors shadow-lg'
						style={{
							backgroundColor: "#FFDE00",
							borderRadius: "9999px",
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.backgroundColor = "#FFD000")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.backgroundColor = "#FFDE00")
						}
						onClick={onViewLocations}
					>
						View Locations
					</button>

					<button
						className='px-18 sm:px-22 md:px-26 py-8 sm:py-9 md:py-10 text-gray-900 text-xl sm:text-2xl md:text-3xl font-bold rounded-full transition-colors shadow-lg'
						style={{
							backgroundColor: "#FFDE00",
							borderRadius: "9999px",
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.backgroundColor = "#FFD000")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.backgroundColor = "#FFDE00")
						}
					>
						Get In Touch
					</button>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
