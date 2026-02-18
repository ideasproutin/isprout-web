import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";

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
		<section className='relative w-full min-h-screen flex items-end justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden -mt-20 sm:-mt-20 md:-mt-20 lg:mt-0 xl:mt-2 pb-16 sm:pb-24 md:pb-32'>
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
				
				<YouTube
					videoId={"TjE_cUGhuJE"}
					opts={{
						width: "100%",
						height: "100%",
						
						playerVars: {
						autoplay: 1,
						controls: 0,
						disablekb: 1,
						fs: 0,
						modestbranding: 1,
						rel: 0,
						iv_load_policy: 3,
						playsinline: 1,
						mute: 1,
						loop: 1,
						playlist: "TjE_cUGhuJE", // required for loop
						},
					}}
					onReady={(e) => {
						const player = e.target;
						e.target.mute();
						e.target.playVideo();
						    // 🔥 Try to force highest quality
						player.setPlaybackQuality("hd1080");

						// Optional fallback (if 1080 not available)
						player.setPlaybackQuality("hd720");
					}}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						marginTop: "30px",
						transform: "scale(1.2)", // acts like object-cover
					}}
					iframeClassName="w-full h-full"
					/>
			</div>

			{/* Black Overlay - 20% Opacity */}
			<div className='absolute inset-0 bg-black opacity-20 z-15'></div>

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

				<div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-start px-2'>
					<button
						className='cta-button w-auto px-3 sm:px-5 md:px-6 lg:px-8 xl:px-9 py-2 sm:py-2.5 md:py-3 lg:py-3 text-sm sm:text-sm md:text-base lg:text-lg font-semibold border-2 border-white'
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
						className='cta-button w-auto px-3 sm:px-5 md:px-6 lg:px-8 xl:px-9 py-2 sm:py-2.5 md:py-3 lg:py-3 text-sm sm:text-sm md:text-base lg:text-lg font-semibold border-2 border-white'
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
