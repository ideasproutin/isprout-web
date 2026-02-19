import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import indiaMapSvg from "../../../assets/homepage/india_map.svg";
import { useCityCenters } from "../../../hooks/useCityCentre";

const CountUpStat = ({
	stat,
	isVisible,
}: {
	stat: { number: string; label: string };
	isVisible: boolean;
}) => {
	const [count, setCount] = useState(0);

	// Parse the number to extract numeric value and suffix
	const parseNumber = (str: string) => {
		const match = str.match(/^(\d+)(k\+|\+)?$/i);
		if (match) {
			const value = parseInt(match[1]);
			const suffix = match[2] || "";
			return { value, suffix };
		}
		return { value: parseInt(str) || 0, suffix: "" };
	};

	const { value: targetValue, suffix } = parseNumber(stat.number);

	useEffect(() => {
		if (!isVisible) return;

		const duration = 2000; // 2 seconds
		const steps = 60;
		const increment = targetValue / steps;
		let current = 0;
		let frame = 0;

		const timer = setInterval(() => {
			frame++;
			current += increment;

			if (frame >= steps) {
				setCount(targetValue);
				clearInterval(timer);
			} else {
				setCount(Math.floor(current));
			}
		}, duration / steps);

		return () => clearInterval(timer);
	}, [isVisible, targetValue]);

	return (
		<div className='text-center'>
			<p className='text-3xl sm:text-4xl md:text-5xl font-bold mb-2'>
				{count}
				{suffix}
			</p>
			<p className='text-sm sm:text-base md:text-lg'>{stat.label}</p>
		</div>
	);
};

const CityMap: React.FC = () => {
	const navigate = useNavigate();
	const sectionRef = useRef<HTMLElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const { data: cityCentersData = [] } = useCityCenters();

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.3 },
		);

		const currentSection = sectionRef.current;
		if (currentSection) {
			observer.observe(currentSection);
		}

		return () => {
			if (currentSection) {
				observer.unobserve(currentSection);
			}
		};
	}, []);

	const findPathForCity = (cityName: string) => {
		const cityData = cityCentersData.find(
			(loc: { name: string; cityRedirect: string }) =>
				loc.name.toLowerCase() === cityName.toLowerCase(),
		);
		return cityData ? `${cityData.cityRedirect}` : "#";
	};

	const cities = [
		{
			name: "HYDERABAD",
			top: "62%",
			left: "36%",
			path: findPathForCity("Hyderabad"),
			delay: "0.1s",
		},
		{
			name: "BENGALURU",
			top: "78%",
			left: "30%",
			path: findPathForCity("Bengaluru"),
			delay: "0.2s",
		},
		{
			name: "CHENNAI",
			top: "82%",
			left: "39%",
			path: findPathForCity("Chennai"),
			delay: "0.3s",
		},
		{
			name: "PUNE",
			top: "61%",
			left: "20%",
			path: findPathForCity("Pune"),
			delay: "0.4s",
		},
		{
			name: "VIJAYAWADA",
			top: "68%",
			left: "43%",
			path: findPathForCity("Vijayawada"),
			delay: "0.5s",
		},
		{
			name: "VIZAG",
			top: "61%",
			left: "55%",
			path: findPathForCity("Vizag"),
			delay: "0.55s",
		},
		{
			name: "KOLKATA",
			top: "45%",
			left: "68%",
			path: findPathForCity("Kolkata"),
			delay: "0.6s",
		},
		{
			name: "AHMEDABAD",
			top: "45%",
			left: "15%",
			path: findPathForCity("Ahmedabad"),
			delay: "0.7s",
		},
		{
			name: "GURUGRAM",
			top: "27%",
			left: "30%",
			path: findPathForCity("Gurugram"),
			delay: "0.8s",
		},
	];

	const handleCityClick = (path: string) => {
		navigate(path);
		window.scrollTo(0, 0);
	};

	return (
		<section
			ref={sectionRef}
			className='relative w-full min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-visible'
			style={{ backgroundColor: "#00275c" }}
		>
			<style>{`
                @keyframes pinDrop {
                    0% {
                        opacity: 0;
                        transform: translate(-50%, -150%);
                    }
                    60% {
                        transform: translate(-50%, -45%);
                    }
                    80% {
                        transform: translate(-50%, -55%);
                    }
                    100% {
                        opacity: 1;
                        transform: translate(-50%, -50%);
                    }
                }
               
                .pin-drop {
                    animation: pinDrop 0.9s ease-out forwards;
                    opacity: 0;
                }
            `}</style>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
				
				{/* Left Side - India Map */}
				<div className='flex-1 flex justify-center items-center'>
					<div className='relative inline-block w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl'>
						<img
							src={indiaMapSvg}
							alt='India Map'
							className='w-full'
							style={{ display: "block" }}
						/>

						{/* State Markers with Pin Icons */}
						{cities.map((city) => (
							<div
								key={city.name}
								className={`absolute flex flex-col items-center cursor-pointer transition-transform hover:scale-110 active:scale-95 ${isVisible ? "pin-drop" : ""}`}
								style={{
									top: city.top,
									left: city.left,
									transform: "translate(-50%, -50%)",
									animationDelay: isVisible
										? city.delay
										: "0s",
								}}
								onClick={() => handleCityClick(city.path)}
							>
								{/* State Label */}
								<div className='px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg sm:rounded-xl text-white text-[9px] sm:text-[10px] md:text-xs font-semibold whitespace-nowrap bg-slate-600'>
									{city.name}
								</div>

								{/* Pin Icon */}
								<svg
									width='18'
									height='26'
									viewBox='0 0 18 26'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									className='w-4 h-6 sm:w-5 sm:h-7 md:w-6 md:h-8 -mt-1 sm:-mt-1.5 md:-mt-2'
								>
									<style type='text/css'>{`
                                        .pin-outer { fill: #FFDE00; }
                                        .pin-inner { fill: #30394F; }
                                    `}</style>
									<path
										className='pin-outer'
										d='M9,0C4,0,0,4,0,9c0,0.9,0.1,1.7,0.3,2.5c0.1,0.5,0.3,1,0.5,1.4C2.7,16.3,9,26,9,26
                                        s6.3-9.7,8.1-13.1c0.2-0.4,0.4-0.9,0.5-1.4C17.9,10.7,18,9.9,18,9C18,4,14,0,9,0z'
									/>
									<g className='pin-inner'>
										<path
											d='M3.8,9.1c0,2.8,2.3,5.2,5.2,5.2c2.7,0,4.9-2.1,5.2-4.7h-0.6c-0.2,2.3-2.2,4.2-4.6,4.2c-2.5,0-4.6-2.1-4.6-4.6
                                            c0-2.4,1.8-4.3,4.1-4.6V4C5.9,4.2,3.8,6.4,3.8,9.1z'
										/>
										<path
											d='M8.5,5.6V5.1C6.5,5.3,5,7.1,5,9.1c0,2.2,1.8,4,4,4c2.1,0,3.8-1.6,4-3.6h-0.6c-0.2,1.7-1.7,3-3.5,3
                                            c-1.9,0-3.5-1.6-3.5-3.5C5.5,7.3,6.8,5.9,8.5,5.6z'
										/>
										<path
											d='M15.9,9.6C15.6,13.1,12.7,16,9,16c-3.8,0-6.9-3.1-6.9-6.9c0-3.6,2.8-6.6,6.4-6.9V1.7C4.7,1.9,1.6,5.2,1.6,9.1
                                            c0,4.1,3.3,7.4,7.4,7.4c3.9,0,7.1-3.1,7.4-6.9H15.9z'
										/>
										<path
											d='M2.7,9.1c0,3.5,2.8,6.3,6.3,6.3c3.3,0,6.1-2.6,6.3-5.9h-0.6c-0.2,3-2.7,5.3-5.7,5.3c-3.2,0-5.7-2.6-5.7-5.7
                                            c0-3,2.3-5.5,5.3-5.7V2.8C5.3,3.1,2.7,5.8,2.7,9.1z'
										/>
										<path d='M9.5,5.6c1.6,0.2,2.8,1.4,3,3h3.9c-0.2-3.7-3.2-6.7-6.9-6.9V5.6z' />
										<path d='M10.3,7.1c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8c-0.4,0-0.8-0.4-0.8-0.8C9.5,7.4,9.8,7.1,10.3,7.1z' />
									</g>
								</svg>
							</div>
						))}
					</div>
				</div>

				{/* Right Side - Content */}
				<div
					className='flex-1 text-white text-center lg:text-left'
					style={{ fontFamily: "Outfit, sans-serif" }}
				>
					<h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-6'>
						Your City.
						<br />
						Your Workspace.
						<br />
						Your{" "}
						<span
							style={{
								fontFamily: "Outfit, sans-serif",
							}}
						>
							iSprout.
						</span>
					</h2>

					<p className='text-base sm:text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0'>
						iSprout provides professional managed offices across key
						locations in major cities. Whether you're setting up a
						new office or expanding your footprint, find a
						convenient workspace designed to support how your team
						works every day.
					</p>

					{/* Stats */}
					<div className='flex justify-center lg:justify-start gap-8 sm:gap-12 md:gap-16'>
						<CountUpStat
							stat={{ number: "9", label: "Cities" }}
							isVisible={isVisible}
						/>
						<CountUpStat
							stat={{ number: "28", label: "Centres" }}
							isVisible={isVisible}
						/>
						<CountUpStat
							stat={{ number: "39k+", label: "Workstations" }}
							isVisible={isVisible}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CityMap;
