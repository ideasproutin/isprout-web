import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import isproutLogo from "../../assets/subnavbar/isprout_logo.png";
import flyersClubLogo from "../../assets/subnavbar/flyers_club_logo.png";
import ourLocations from "../../content/ourLocations";

const SubNavbar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const isNewsPage = location.pathname.startsWith("/news");
	const isCentrePage = location.pathname.startsWith("/centre/");
	const textColor =
		isNewsPage || isCentrePage ? "!text-white" : "text-gray-900";
	const hoverColor =
		isNewsPage || isCentrePage
			? "hover:!text-gray-200"
			: "hover:text-gray-600";
	const [showLocationsPopup, setShowLocationsPopup] = useState(false);
	const [selectedCity, setSelectedCity] = useState(ourLocations[0].city);
	
	// Animated underline state
	const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
	const navItemsRef = useRef<{ [key: string]: HTMLElement | null }>({});

	const currentCityData =
		ourLocations.find((loc) => loc.city === selectedCity) ||
		ourLocations[0];

	const onClickCityNavigate = (cityRedirect: string) => {
		navigate(cityRedirect);
		setShowLocationsPopup(false);
	};

	const onClickCentreNavigate = (centreRedirect: string) => {
		navigate(centreRedirect);
		setShowLocationsPopup(false);
	};

	// Disable background scroll when popup is open
	useEffect(() => {
		if (showLocationsPopup) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [showLocationsPopup]);

	// Handler for animated underline
	const handleNavItemHover = (key: string | null) => {
		if (key && navItemsRef.current[key]) {
			const element = navItemsRef.current[key];
			if (element) {
				setUnderlineStyle({
					left: element.offsetLeft,
					width: element.offsetWidth,
					opacity: 1
				});
			}
		} else {
			setUnderlineStyle(prev => ({ ...prev, opacity: 0 }));
		}
	};
	// fake commit

	return (
		<nav className='w-full bg-transparent pb-2 sm:pb-3 md:pb-4 px-2 sm:px-4 md:px-6 overflow-x-auto relative z-40'>
			<div className='w-full flex flex-wrap items-center justify-between gap-2 min-w-max  '>
				{/* iSprout Logo on the left */}
				<Link
					to='/'
					className='flex items-center shrink-0 ml-1 sm:ml-2 md:ml-8 lg:ml-12 relative top-1'
				>
					<img
						src={isproutLogo}
						alt='iSprout Logo'
						className='h-7 sm:h-8 md:h-9 lg:h-10 xl:h-12'
					/>
				</Link>

				{/* Navigation headings in the center */}
				<div
					className='flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-12 relative z-50'
					style={{ fontFamily: "Outfit, sans-serif" }}
				>
					<Link
						to='/about'
						ref={el => { navItemsRef.current['about'] = el; }}
						onMouseEnter={() => handleNavItemHover('about')}
						onMouseLeave={() => handleNavItemHover(null)}
						className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${textColor} ${hoverColor} whitespace-nowrap cursor-pointer bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0`}
						style={{ WebkitTapHighlightColor: 'transparent' }}
					>
						About Us
					</Link>
					<div
						ref={el => { navItemsRef.current['locations'] = el; }}
						className='relative z-50'
						onMouseEnter={() => { setShowLocationsPopup(true); handleNavItemHover('locations'); }}
						onMouseLeave={() => { setShowLocationsPopup(false); handleNavItemHover(null); }}
					>
						<span
							className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${textColor} ${hoverColor} whitespace-nowrap cursor-pointer bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0`}
							style={{ WebkitTapHighlightColor: 'transparent' }}
						>
							Our Locations
						</span>

						{/* Invisible bridge to prevent popup from closing */}
						{showLocationsPopup && (
							<div
								className='fixed left-0 right-0'
								style={{
									top: "60px",
									height: "60px",
									zIndex: 9998,
								}}
								onMouseEnter={() => setShowLocationsPopup(true)}
							/>
						)}

						{/* Locations Popup */}
						{showLocationsPopup && (
							<div
								className='fixed left-1/2 transform -translate-x-1/2 rounded-3xl shadow-2xl border-2 overflow-hidden'
								style={{
									backgroundColor: '#F5F5F5',
									borderColor: "#E0E0E0",
									width: "90vw",
									maxWidth: "1200px",
									maxHeight: "75vh",
									top: "120px",
									zIndex: 9999,
								}}
								onMouseEnter={() => setShowLocationsPopup(true)}
								onMouseLeave={() =>
									setShowLocationsPopup(false)
								}
							>
								<div className='flex flex-col md:flex-row h-full'>
									{/* Left Panel - City List */}
									<div 
										className='w-full md:w-52 bg-white p-3 border-r border-gray-200 overflow-y-auto'
										style={{ maxHeight: '75vh' }}
									>
										<h3 
											className='text-base font-bold mb-3 text-gray-500'
											style={{ fontFamily: 'Outfit, sans-serif' }}
										>
											Inspiring Workspaces
										</h3>
										<div className='flex flex-col gap-2'>
											{ourLocations.map((cityData, index) => (
												<button
													key={index}
													onClick={() => {
														setSelectedCity(cityData.city);
														onClickCityNavigate(cityData.cityRedirect);
													}}
													onMouseEnter={() =>
														setSelectedCity(cityData.city)
													}
													className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
														selectedCity === cityData.city
															? 'text-white font-semibold'
															: 'text-gray-700 hover:bg-gray-50'
													}`}
													style={
														selectedCity === cityData.city
															? {
																	backgroundColor: '#00275c',
																	fontFamily: 'Outfit, sans-serif',
															  }
															: {
																	fontFamily: 'Outfit, sans-serif',
															  }
													}
												>
													<span className='text-sm'>{cityData.city}</span>
													<svg
														width='18'
														height='18'
														viewBox='0 0 20 20'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'
													>
														<path
															d='M7.5 15l5-5-5-5'
															stroke='currentColor'
															strokeWidth='2'
															strokeLinecap='round'
															strokeLinejoin='round'
														/>
													</svg>
												</button>
											))}
										</div>
									</div>

									{/* Right Panel - Center Cards */}
									<div className='flex-1 p-6 overflow-y-auto' style={{ maxHeight: '75vh' }}>
										{/* Location Cards Grid - Show max 6 centers */}
										<div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
											{currentCityData.centers.slice(0, 6).map(
												(location, index) => (
													<div
														key={index}
														className='relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group'
														style={{ height: '160px' }}
														onClick={() =>
															onClickCentreNavigate(
																location.centreRedirect
															)
														}
													>
														<img
															src={location.image}
															alt={location.center_name}
															className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
														/>
														<div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent' />
														<div className='absolute bottom-0 left-0 right-0 p-3 text-white'>
															<h3
																className='text-sm font-bold mb-1 line-clamp-1'
																style={{
																	fontFamily: 'Outfit, sans-serif',
																}}
															>
																{location.center_name}
															</h3>
															<div className='flex items-start gap-1'>
																<svg
																	width='12'
																	height='12'
																	viewBox='0 0 16 16'
																	fill='none'
																	xmlns='http://www.w3.org/2000/svg'
																	className='shrink-0 mt-0.5'
																>
																	<path
																		d='M8 1C5.243 1 3 3.243 3 6c0 3.375 5 9 5 9s5-5.625 5-9c0-2.757-2.243-5-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z'
																		fill='white'
																	/>
																</svg>
																<span
																	className='text-xs line-clamp-1'
																	style={{
																		fontFamily: 'Outfit, sans-serif',
																	}}
																>
																	{location.location}
																</span>
															</div>
														</div>
													</div>
												)
											)}
										</div>

										{/* View More Link */}
										{currentCityData.centers.length > 6 && (
											<button
												onClick={() => onClickCityNavigate(currentCityData.cityRedirect)}
												className='flex items-center gap-2 text-base font-semibold hover:gap-3 transition-all'
												style={{ fontFamily: 'Outfit, sans-serif', color: '#00275c' }}
											>
												View More
												<svg
													width='20'
													height='20'
													viewBox='0 0 20 20'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														d='M7.5 15l5-5-5-5'
														stroke='currentColor'
														strokeWidth='2'
														strokeLinecap='round'
														strokeLinejoin='round'
													/>
												</svg>
											</button>
										)}
									</div>
								</div>
							</div>
						)}
					</div>
					<Link
						to='/managed'
						ref={el => { navItemsRef.current['managed'] = el; }}
						onMouseEnter={() => handleNavItemHover('managed')}
						onMouseLeave={() => handleNavItemHover(null)}
						className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${textColor} ${hoverColor} whitespace-nowrap cursor-pointer bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0`}
						style={{ WebkitTapHighlightColor: 'transparent' }}
					>
						Managed Office
					</Link>
					<Link
						to='/virtual-office'
						ref={el => { navItemsRef.current['virtual'] = el; }}
						onMouseEnter={() => handleNavItemHover('virtual')}
						onMouseLeave={() => handleNavItemHover(null)}
						className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${textColor} ${hoverColor} whitespace-nowrap cursor-pointer bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0`}
						style={{ WebkitTapHighlightColor: 'transparent' }}
					>
						Virtual Office
					</Link>
					<Link
						to='/meeting-rooms'
						ref={el => { navItemsRef.current['meeting'] = el; }}
						onMouseEnter={() => handleNavItemHover('meeting')}
						onMouseLeave={() => handleNavItemHover(null)}
						className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${textColor} ${hoverColor} whitespace-nowrap cursor-pointer bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0`}
						style={{ WebkitTapHighlightColor: 'transparent' }}
					>
						Meeting Rooms
					</Link>
					
					{/* Animated underline */}
					<div
						className='absolute bottom-0 h-0.5 transition-all duration-300 ease-out'
						style={{
							left: `${underlineStyle.left}px`,
							width: `${underlineStyle.width}px`,
							opacity: underlineStyle.opacity,
							backgroundColor: isNewsPage || isCentrePage ? '#ffffff' : '#000000'
						}}
					/>
				</div>

				{/* Flyers Club Button on the right */}
				<a
					href="https://flyersclub.isprout.in/"
					target="_blank"
					rel="noopener noreferrer"
					className='flex items-center gap-1 sm:gap-2 md:gap-3 px-2 sm:px-3 md:px-4 lg:px-4 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg transition-colors shrink-0 mt-2 border border-black no-underline'
					style={{ backgroundColor: "#FFDE00" }}
					onMouseEnter={(e) =>
						(e.currentTarget.style.backgroundColor = "#FFD000")
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.backgroundColor = "#FFDE00")
					}
				>
					<div className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 rounded-full bg-gray-900 flex items-center justify-center shrink-0'>
						<img
							src={flyersClubLogo}
							alt='Flyers Club Logo'
							className='w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5'
						/>
					</div>
					<span
						className='text-xs sm:text-sm md:text-base lg:text-lg font-semibold whitespace-nowrap pr-1 sm:pr-2'
						style={{
							fontFamily: "Otomanopee One, sans-serif",
							color: "#00275c",
						}}
					>
						Flyers Club
					</span>
				</a>
			</div>
		</nav>
	);
};

export default SubNavbar;
