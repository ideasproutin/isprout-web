import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { homePageImages } from "../../../assets";

type HeroSectionProps = {
	onViewLocations?: () => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({ onViewLocations }) => {
	const navigate = useNavigate();
	const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
	const [direction, setDirection] = useState<"forward" | "backward">(
		"forward",
	);

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
			setCurrentHeroIndex((prevIndex) => {
				if (direction === "forward") {
					if (prevIndex === heroImages.length - 1) {
						setDirection("backward");
						return prevIndex - 1;
					}
					return prevIndex + 1;
				} else {
					if (prevIndex === 0) {
						setDirection("forward");
						return prevIndex + 1;
					}
					return prevIndex - 1;
				}
			});
		}, 5000);

		return () => clearInterval(interval);
	}, [direction, heroImages.length]);

	return (
		<section className='relative w-full min-h-screen flex items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden -mt-20 sm:-mt-20 md:-mt-20 pb-16 sm:pb-24 md:pb-32'>
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
				className='hidden sm:block absolute left-0 top-0 h-[calc(100%+20rem)] w-120 object-cover -mt-30 z-10'
			/>

			{/* Blue Gradient - Right */}
			<img
				src={homePageImages.blueGradient}
				alt=''
				className='hidden sm:block absolute right-0 top-0 h-[calc(100%+20rem)] w-120 object-cover -mt-4 z-10'
			/>

			{/* Black Overlay - 20% Opacity */}
			<div className='absolute inset-0 bg-black opacity-20 z-15'></div>

			{/* Dynamic Heading and CTA */}
			<div className='absolute inset-0 flex flex-col items-center justify-center z-20 px-4 sm:px-6'>
				<h1
					key={currentHeroIndex}
					className='text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-semibold text-center uppercase px-2 mb-8 sm:mb-10 md:mb-12'
					style={{
						fontFamily: "Lateef, sans-serif",
						fontWeight: 600,
						lineHeight: "150%",
						letterSpacing: "0.1em",
						background:
							"linear-gradient(180deg, #FFFFFF 0%, #DDD5D5 100%)",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
						backgroundClip: "text",
						opacity: 0,
						animation: "fadeIn 1000ms ease-in-out forwards",
					}}
				>
					{heroHeadings[currentHeroIndex]}
				</h1>

				<div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center w-full max-w-md sm:max-w-none px-4'>
					<button
						className='w-full sm:w-auto px-8 sm:px-14 md:px-18 lg:px-22 xl:px-26 py-3 sm:py-6 md:py-8 lg:py-9 xl:py-10 text-gray-900 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold rounded-full transition-colors shadow-lg'
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
						className='w-full sm:w-auto px-8 sm:px-14 md:px-18 lg:px-22 xl:px-26 py-3 sm:py-6 md:py-8 lg:py-9 xl:py-10 text-gray-900 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold rounded-full transition-colors shadow-lg'
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
						onClick={() => navigate("/contactus")}
					>
						Get In Touch
					</button>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
