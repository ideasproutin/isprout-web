import React, { useState } from "react";
import indiaMapSvg from "../../assets/homepage/india_map.svg";
import locationIconMaps from "../../assets/centers/locationicon_maps.png";
import ourLocations from "../../content/ourLocations";
import { COLORS } from "../../helpers/constants/Colors";

const VirtualOfficeMap: React.FC = () => {
	const [selectedCity, setSelectedCity] = useState<string | null>(null);

	const cities = [
		{
			name: "Hyderabad",
			state: "HYDERABAD",
			top: "62%",
			left: "36%",
		},
		{
			name: "Bengaluru",
			state: "BENGALURU",
			top: "78%",
			left: "30%",
		},
		{
			name: "Chennai",
			state: "CHENNAI",
			top: "82%",
			left: "39%",
		},
		{
			name: "Pune",
			state: "PUNE",
			top: "61%",
			left: "20%",
		},
		{
			name: "Vijayawada",
			state: "VIJAYAWADA",
			top: "68%",
			left: "44%",
		},
		{
			name: "Vizag",
			state: "VIZAG",
			top: "62%",
			left: "50%",
		},
		{
			name: "Kolkata",
			state: "KOLKATA",
			top: "45%",
			left: "68%",
		},
		{
			name: "Ahmedabad",
			state: "AHMEDABAD",
			top: "45%",
			left: "15%",
		},
		{
			name: "Gurugram",
			state: "GURUGRAM",
			top: "27%",
			left: "30%",
		},
	];

	const handleCityClick = (cityName: string) => {
		setSelectedCity(cityName);
	};

	// Get centers for selected city
	const selectedCityData = ourLocations.find(
		(loc) => loc.city.toLowerCase() === selectedCity?.toLowerCase(),
	);

	return (
		<section className='relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-white'>
			{/* Main Content */}
			<div className='max-w-7xl mx-auto'>
				<h2
					className='text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center'
					style={{
						color: COLORS.brandBlueDark,
						fontFamily: "Outfit, sans-serif",
					}}
				>
					Our Locations
				</h2>

				<div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
					{/* Left Side - India Map */}
					<div className='flex-1 flex justify-center items-start'>
						<div className='relative inline-block w-full max-w-2xl'>
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
										selectedCity === city.name
											? "scale-125"
											: ""
									}`}
									style={{
										top: city.top,
										left: city.left,
										transform: "translate(-50%, -50%)",
									}}
									onClick={() => handleCityClick(city.name)}
								>
									{/* State Label */}
									<div
										className={`px-2 py-1 rounded-xl text-white text-xs font-semibold whitespace-nowrap ${
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

					{/* Right Side - Center Details */}
					<div className='flex-1'>
						{!selectedCity ? (
							<div className='flex items-center justify-center h-full'>
								<div className='text-center'>
									<p
										className='text-xl font-semibold mb-2'
										style={{
											color: COLORS.brandBlueDark,
											fontFamily: "Outfit, sans-serif",
										}}
									>
										Select a city to view centers
									</p>
									<p
										className='text-gray-600'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									>
										Click on any location marker on the map
									</p>
								</div>
							</div>
						) : (
							<div>
								<h3
									className='text-2xl sm:text-3xl font-bold mb-6'
									style={{
										color: COLORS.brandBlueDark,
										fontFamily: "Outfit, sans-serif",
									}}
								>
									{selectedCity} Centers
								</h3>

								{selectedCityData &&
								selectedCityData.centers.length > 0 ? (
									<div className='space-y-4 max-h-[600px] overflow-y-auto pr-4'>
										{selectedCityData.centers.map(
											(center, index) => (
												<div
													key={index}
													className='p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow'
													style={{
														fontFamily:
															"Outfit, sans-serif",
													}}
												>
													<h4
														className='text-lg font-semibold mb-2'
														style={{
															color: COLORS.brandBlueDark,
														}}
													>
														{center.center_name}
													</h4>
													<p className='text-gray-600 flex items-start gap-2'>
														<svg
															className='w-5 h-5 mt-0.5 flex-shrink-0'
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
														{center.location}
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
													"Outfit, sans-serif",
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
