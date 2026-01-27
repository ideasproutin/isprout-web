import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { homePageImages } from "../../../assets";
import indiaMapSvg from "../../../assets/homepage/india_map.svg";
import locationIconMaps from "../../../assets/centers/locationicon_maps.png";

const CountUpStat = ({ 
	stat, 
	isVisible 
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
				{count}{suffix}
			</p>
			<p className='text-sm sm:text-base md:text-lg'>
				{stat.label}
			</p>
		</div>
	);
};

const CityMap: React.FC = () => {
	const navigate = useNavigate();
	const sectionRef = useRef<HTMLElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.3 }
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

	const cities = [
		{
			name: "Hyderabad",
			state: "HYDERABAD",
			top: "62%",
			left: "36%",
			path: "/city/hyderabad",
			delay: "0.1s",
		},
		{
			name: "Bengaluru",
			state: "BENGALURU",
			top: "78%",
			left: "30%",
			path: "/city/bengaluru",
			delay: "0.2s",
		},
		{
			name: "Chennai",
			state: "CHENNAI",
			top: "82%",
			left: "39%",
			path: "/city/chennai",
			delay: "0.3s",
		},
		{
			name: "Pune",
			state: "PUNE",
			top: "61%",
			left: "20%",
			path: "/city/pune",
			delay: "0.4s",
		},
		{
			name: "Vijayawada",
			state: "VIJAYAWADA",
			top: "68%",
			left: "44%",
			path: "/city/vijayawada",
			delay: "0.5s",
		},
		{
			name: "Kolkata",
			state: "KOLKATA",
			top: "45%",
			left: "68%",
			path: "/city/kolkata",
			delay: "0.6s",
		},
		{
			name: "Ahmedabad",
			state: "AHMEDABAD",
			top: "45%",
			left: "15%",
			path: "/city/ahmedabad",
			delay: "0.7s",
		},
		{
			name: "Gurugram",
			state: "GURUGRAM",
			top: "27%",
			left: "30%",
			path: "/city/gurugram",
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
			className='relative w-full min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-[#00275c] overflow-visible'>
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
			{/* Decorative Circles */}
			<div
				className='absolute -top-8 right-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full '
				style={{ backgroundColor: "#FFDE00" }}
			/>
			<div
				className='absolute -bottom-8 left-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full'
				style={{ backgroundColor: "#FFDE00" }}
			/>

			{/* Arrow Decorations */}
			<div className='absolute top-8 left-8'>
				<div className='relative w-16 sm:w-20 md:w-24'>
					{/* <img
						src={homePageImages.citymapReversearrow}
						alt='Arrow'
						className='w-full'
					/> */}
					{/* <img 
        src={arrowPointer} 
        alt="" 
        className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 sm:w-5 md:w-6"
        /> */}
				</div>
			</div>
			<div className='absolute bottom-8 right-8'>
				<div className='relative w-16 sm:w-20 md:w-24'>
					<img
						src={homePageImages.citymapYellowarrow}
						alt='Arrow'
						className='w-full'
					/>
					{/* <img 
        src={arrowPointer} 
        alt="" 
        className="absolute -right-2 top-10 -translate-y-1/2 w-4 sm:w-5 md:w-6"
        /> */}
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
				{/* Left Side - India Map */}
				<div className='flex-1 flex justify-center items-center'>
					<div className='relative inline-block'>
						<img
							src={indiaMapSvg}
							alt='India Map'
							className='w-full max-w-2xl'
							style={{ display: "block" }}
						/>

						{/* State Markers with Pin Icons */}
						{cities.map((city) => (
							<div
								key={city.name}
								className={`absolute flex flex-col items-center cursor-pointer transition-transform hover:scale-110 ${isVisible ? 'pin-drop' : ''}`}
								style={{
									top: city.top,
									left: city.left,
									transform: "translate(-50%, -50%)",
									animationDelay: isVisible ? city.delay : '0s',
								}}
								onClick={() => handleCityClick(city.path)}
							>
								{/* State Label */}
								<div className='px-2 py-1 rounded-xl text-white text-xs font-semibold whitespace-nowrap bg-slate-600'>
									{city.state}
								</div>

								{/* Pin Icon */}
								<img
									src={locationIconMaps}
									alt='Pin'
									className='w-10 h-10 -mt-2'
								/>
							</div>
						))}
					</div>
				</div>

				{/* Right Side - Content */}
				<div
					className='flex-1 text-white'
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
								fontFamily: "Otomanopee One, sans-serif",
								color: "#FFDE00",
							}}
						>
							iSprout.
						</span>
					</h2>

					<p className='text-base sm:text-lg md:text-xl mb-8 max-w-xl'>
						iSprout provides professional managed offices
						across key locations in major cities. Whether you're
						setting up a new office or expanding your footprint,
						find a convenient workspace designed to support how your
						team works every day.
					</p>

					{/* Stats */}
					<div className='flex gap-8 sm:gap-12 md:gap-16'>
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
