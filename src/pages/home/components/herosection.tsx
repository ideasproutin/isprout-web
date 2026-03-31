import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroImage1 from "../../../assets/homepage/home-hero (1).webp";
import heroImage2 from "../../../assets/homepage/home-hero (2).webp";
import heroImage3 from "../../../assets/homepage/home-hero (3).webp";
import heroImage4 from "../../../assets/homepage/home-hero (4).png";
import heroImage5 from "../../../assets/homepage/home-hero (5).png";
import heroImage6 from "../../../assets/homepage/home-hero (6).png";

type HeroSectionProps = {
	onViewLocations?: () => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({ onViewLocations }) => {
	const navigate = useNavigate();
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const [isClosing, setIsClosing] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [prevImageIndex, setPrevImageIndex] = useState(-1);

	const heroTexts = [
		"Creative Workspaces",
		"Inspiring Workspaces",
		"Stylish Workspaces",
		"Minimalist Workspaces",
		"Vibrant Workspaces",
	];

	const heroImages = [
		heroImage1,
		heroImage2,
		heroImage3,
		heroImage4,
		heroImage5,
		heroImage6,
	];

	// Text animation effect
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

	// Image carousel effect — use functional setState to batch both index updates
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prev) => {
				setPrevImageIndex(prev);
				return (prev + 1) % heroImages.length;
			});
		}, 5000);

		return () => clearInterval(interval);
	}, [heroImages.length]);

	return (
		<section className='hero-section relative w-full min-h-screen flex items-end justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden pt-20 sm:pt-20 md:pt-20 lg:mt-0 xl:mt-2 pb-16 sm:pb-24 md:pb-32'>
			<style>{`
				@keyframes slideInFill {
					from {
						transform: scaleX(0);
						transform-origin: left;
					}
					to {
						transform: scaleX(1);
						transform-origin: left;
					}
				}

				@keyframes slideOutFill {
					from {
						transform: scaleX(1);
						transform-origin: left;
					}
					to {
						transform: scaleX(0);
						transform-origin: left;
					}
				}

				.cta-button {
					position: relative;
					overflow: hidden;
					transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
					cursor: pointer;
				}

				.cta-button::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: #00265c;
					z-index: -1;
					transform: scaleX(0);
					transform-origin: left;
					transition: transform 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
				}

				.cta-button:hover {
					transform: scale(1.03);
					box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
				}

				.cta-button:hover::before {
					transform: scaleX(1);
				}

				.cta-button:hover .button-text {
					color: #FFFFFF;
				}

				.button-text {
					position: relative;
					z-index: 1;
					transition: color 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
				}

				@keyframes heroImgFadeIn {
					from { opacity: 0; }
					to   { opacity: 1; }
				}
				.hero-img-fade {
					animation: heroImgFadeIn 1s ease-in-out forwards;
				}

				@media (max-width: 949px) {
					.hero-section {
						min-height: 50vh;
					}

					.hero-image-layer,
					.hero-overlay-layer {
						height: calc(50vh - 5rem);
					}
				}
			`}</style>
			{/* Hero Image Carousel Background — pure CSS crossfade, no framer-motion */}
			<div className='hero-image-layer absolute top-20 sm:top-20 md:top-20 lg:top-0 left-0 right-0 bottom-0 w-full h-auto z-0 overflow-hidden'>
				{/* Outgoing image sits below as background; no animation needed */}
				{prevImageIndex >= 0 && (
					<img
						src={heroImages[prevImageIndex]}
						alt=''
						aria-hidden='true'
						className='absolute inset-0 w-full h-full object-cover'
					/>
				)}
				{/* Incoming image fades in on top; key change restarts CSS animation */}
				<img
					key={currentImageIndex}
					src={heroImages[currentImageIndex]}
					alt={`iSprout Hero Image ${currentImageIndex + 1}`}
					className='absolute inset-0 w-full h-full object-cover hero-img-fade'
				/>
			</div>

			{/* Black Overlay - 20% Opacity */}
			<div className='hero-overlay-layer absolute top-20 sm:top-20 md:top-20 lg:top-0 left-0 right-0 bottom-0 bg-black opacity-20 z-10'></div>

			{/* Left Bottom Aligned Heading and CTA */}
			<div className='relative z-20 flex flex-col items-start justify-start max-w-7xl mx-auto w-full'>
				<div className='mb-6 sm:mb-8 md:mb-10 overflow-hidden'>
					<h1
						className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-left px-2'
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

				<div className='flex flex-row gap-2 sm:gap-6 items-start px-2'>
					<button
						className='cta-button w-auto px-2 sm:px-5 md:px-6 lg:px-8 xl:px-9 py-1.5 sm:py-2.5 md:py-3 lg:py-3 text-xs sm:text-sm md:text-base lg:text-lg font-semibold border sm:border-2 border-white'
						style={{
							backgroundColor: "transparent",
							borderRadius: "24px",
						}}
						onClick={onViewLocations}
					>
						<span
							className='button-text'
							style={{ color: "#FFFFFF" }}
						>
							View Locations
						</span>
					</button>

					<button
						className='cta-button w-auto px-2 sm:px-5 md:px-6 lg:px-8 xl:px-9 py-1.5 sm:py-2.5 md:py-3 lg:py-3 text-xs sm:text-sm md:text-base lg:text-lg font-semibold border sm:border-2 border-white'
						style={{
							backgroundColor: "transparent",
							borderRadius: "24px",
						}}
						onClick={() => navigate("/contact")}
					>
						<span
							className='button-text'
							style={{ color: "#FFFFFF" }}
						>
							Get in Touch
						</span>
					</button>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
