import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { homePageImages } from "../../../assets";
import homepageVideo from "../../../assets/homepage/homepage-video.mp4";

type HeroSectionProps = {
	onViewLocations?: () => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({ onViewLocations }) => {
	const navigate = useNavigate();
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const [isClosing, setIsClosing] = useState(false);

	const heroTexts = [
		"Creative Workspaces",
		"Innovative Workspaces",
		"Inspiring Workspaces",
		"Stylish Workspaces",
		"Minimalist Workspaces",
		"Vibrant Workspaces",
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setIsClosing(true);
			setTimeout(() => {
				setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
				setIsClosing(false);
			}, 500);
		}, 3000);

		return () => clearInterval(interval);
	}, [heroTexts.length]);

	return (
		<section className='relative w-full min-h-screen flex items-end justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden -mt-20 sm:-mt-20 md:-mt-20 pb-16 sm:pb-24 md:pb-32'>
			{/* Hero Video Background */}
			<div className='absolute inset-0 w-full h-full z-0'>
				<video
					autoPlay
					loop
					muted
					playsInline
					className='absolute inset-0 w-full h-full object-cover'
				>
					<source src={homepageVideo} type='video/mp4' />
					Your browser does not support the video tag.
				</video>
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

			{/* Left Bottom Aligned Heading and CTA */}
			<div className='relative z-20 flex flex-col items-start justify-start max-w-7xl mx-auto w-full'>
				<div className='mb-6 sm:mb-8 md:mb-10 overflow-hidden'>
					<h1
						className='text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-semibold text-left px-2'
						style={{
							fontFamily: "Lateef, sans-serif",
							fontWeight: 600,
							lineHeight: "120%",
							letterSpacing: "0.05em",
							color: "#FFFFFF",
							transform: isClosing
								? "translateX(-100%)"
								: "translateX(0)",
							opacity: isClosing ? 0 : 1,
							transition: "all 500ms ease-in-out",
						}}
					>
						{heroTexts[currentTextIndex]}
						<div
							className='h-1 sm:h-1.5 md:h-2 mt-2 sm:mt-3 md:mt-4'
							style={{
								backgroundColor: "#FFDE00",
								width: "60%",
								borderRadius: "4px",
								transform: isClosing
									? "scaleX(0)"
									: "scaleX(1)",
								transformOrigin: "left",
								transition: "transform 500ms ease-in-out",
							}}
						/>
					</h1>
				</div>

				<div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-start px-2'>
					<button
						className='w-auto px-8 sm:px-14 md:px-18 lg:px-22 xl:px-26 py-3 sm:py-4 md:py-5 lg:py-6 text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold rounded-full shadow-lg border-2'
						style={{
							backgroundColor: "transparent",
							borderColor: "#FFFFFF",
							borderRadius: "9999px",
							transition: "all 0.3s ease-in-out",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor =
								"rgba(200, 200, 200, 0.7)";
							e.currentTarget.style.color = "#000000";
							e.currentTarget.style.transform = "scale(1.05)";
							e.currentTarget.style.boxShadow =
								"0 10px 30px rgba(0, 0, 0, 0.4)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor =
								"transparent";
							e.currentTarget.style.color = "#FFFFFF";
							e.currentTarget.style.transform = "scale(1)";
							e.currentTarget.style.boxShadow =
								"0 4px 6px rgba(0, 0, 0, 0.1)";
						}}
						onClick={onViewLocations}
					>
						View Locations
					</button>

					<button
						className='w-auto px-8 sm:px-14 md:px-18 lg:px-22 xl:px-26 py-3 sm:py-4 md:py-5 lg:py-6 text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold rounded-full shadow-lg border-2'
						style={{
							backgroundColor: "transparent",
							borderColor: "#FFFFFF",
							borderRadius: "9999px",
							transition: "all 0.3s ease-in-out",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor =
								"rgba(200, 200, 200, 0.7)";
							e.currentTarget.style.color = "#000000";
							e.currentTarget.style.transform = "scale(1.05)";
							e.currentTarget.style.boxShadow =
								"0 10px 30px rgba(0, 0, 0, 0.4)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor =
								"transparent";
							e.currentTarget.style.color = "#FFFFFF";
							e.currentTarget.style.transform = "scale(1)";
							e.currentTarget.style.boxShadow =
								"0 4px 6px rgba(0, 0, 0, 0.1)";
						}}
						onClick={() => navigate("/contactus")}
					>
						Get in Touch
					</button>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
