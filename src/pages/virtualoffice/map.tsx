import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import indiaMapSvg from "../../assets/homepage/india_map.svg";
import { COLORS } from "../../helpers/constants/Colors";
import { useCityCenters } from "../../hooks/useCityCentre";

const VirtualOfficeMap: React.FC = () => {
	const [selectedCity, setSelectedCity] = useState<string | null>(null);
	const sectionRef = useRef<HTMLElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const navigate = useNavigate();
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
			left: "44%",
			path: findPathForCity("Vijayawada"),
			delay: "0.5s",
		},
		{
			name: "VIZAG",
			top: "60%",
			left: "56%",
			path: findPathForCity("Visakhapatnam"),
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

	const handleCenterClick = (path: string) => {
		navigate(path);
		window.scrollTo(0, 0);
	};

	// Get centers for selected city
	const selectedCityData = cityCentersData.find(
		(loc: { name?: string }) => loc.name?.toLowerCase() === selectedCity?.toLowerCase(),
	);

	return (
		<section
			ref={sectionRef}
			className='relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-white'
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
			<div className='max-w-7xl mx-auto'>
				<h2
					className='text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center'
					style={{
						color: COLORS.brandBlueDark,
						fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
					}}
				>
					Our Locations
				</h2>

				<div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
					{/* Left Side - India Map */}
					<div className='flex-1 flex justify-center items-start'>
						<div className='relative inline-block w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl'>
							<img
								src={indiaMapSvg}
								alt='India Map'
								className='w-full'
								style={{ display: "block" }}
							/>

							{/* City Markers with Pin Icons */}
							{cities.map((city) => (
								<div
									key={city.name}
									className={`absolute flex flex-col items-center cursor-pointer transition-transform hover:scale-110 ${
										isVisible ? "pin-drop" : ""
									} ${
										selectedCity === city.name
											? "scale-125"
											: ""
									}`}
									style={{
										top: city.top,
										left: city.left,
										animationDelay: isVisible
											? city.delay
											: "0s",
									}}
									onClick={() => setSelectedCity(city.name)}
								>
									{/* State Label */}
									<div
										className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg sm:rounded-xl text-white text-[9px] sm:text-[10px] md:text-xs font-semibold whitespace-nowrap ${
											selectedCity === city.name
												? "bg-yellow-500"
												: "bg-slate-600"
										}`}
										style={
											selectedCity === city.name
												? {
														backgroundColor:
															COLORS.brandYellow,
														color: COLORS.brandBlueDark,
													}
												: {}
										}
									>
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

					{/* Right Side - Center Details */}
					<div className='flex-1'>
						{!selectedCity ? (
							<div className='flex items-center justify-center h-full min-h-[300px]'>
								<div className='text-center px-4'>
									<p
										className='text-lg sm:text-xl font-semibold mb-2'
										style={{
											color: COLORS.brandBlueDark,
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
										}}
									>
										Select a city to view centers
									</p>
									<p
										className='text-gray-600'
										style={{
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
										}}
									>
										Click on any location marker on the map
									</p>
								</div>
							</div>
						) : (
							<div className='px-4 sm:px-0'>
								<h3
									className='text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6'
									style={{
										color: COLORS.brandBlueDark,
										fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
									}}
								>
									{selectedCity} Centers
								</h3>

								{selectedCityData &&
								selectedCityData.centers.length > 0 ? (
									<div className='space-y-3 sm:space-y-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto pr-2 sm:pr-4'>
										{selectedCityData.centers.map(
											(center: { name: string; explore: string; shortAddress: string }, index: number) => (
												<div
													key={index}
													className='p-3 sm:p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer'
													style={{
														fontFamily:
															"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
													}}
													onClick={() =>
														handleCenterClick(
															center.explore,
														)
													}
												>
													<h4
														className='text-base sm:text-lg font-semibold mb-2'
														style={{
															color: COLORS.brandBlueDark,
														}}
													>
														{center.name}
													</h4>
													<p className='text-sm sm:text-base text-gray-600 flex items-start gap-2'>
														<svg
															className='w-4 h-4 sm:w-5 sm:h-5 mt-0.5 shrink-0'
															fill='none'
															stroke='currentColor'
															viewBox='0 0 24 24'
														>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																strokeWidth={2}
																d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
															/>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																strokeWidth={2}
																d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
															/>
														</svg>
														{center.shortAddress}
													</p>
												</div>
											),
										)}
									</div>
								) : (
									<div className='flex items-center justify-center h-64'>
										<p
											className='text-gray-600'
											style={{
												fontFamily:
													"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
											}}
										>
											No centers available in this city
										</p>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default VirtualOfficeMap;
