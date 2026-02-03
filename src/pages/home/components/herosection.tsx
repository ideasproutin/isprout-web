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
			`}</style>
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
						className='cta-button w-auto px-8 sm:px-14 md:px-18 lg:px-22 xl:px-26 py-3 sm:py-4 md:py-5 lg:py-6 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold border-2 border-white'
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
						className='cta-button w-auto px-8 sm:px-14 md:px-18 lg:px-22 xl:px-26 py-3 sm:py-4 md:py-5 lg:py-6 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold border-2 border-white'
						style={{
							backgroundColor: "transparent",
							borderRadius: "24px",
						}}
						onClick={() => navigate("/contactus")}
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
