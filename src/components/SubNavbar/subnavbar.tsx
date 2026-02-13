import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import isproutLogo from "../../assets/subnavbar/isprout_logo.png";
// import flyersClubLogo from "../../assets/subnavbar/flyers_club_logo.png";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { useCityCenters } from "../../hooks/useCityCentre";

const SubNavbar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { data: cityCentersData = [] } = useCityCenters();

	const [showLocationsPopup, setShowLocationsPopup] = useState(false);
	const [selectedCity, setSelectedCity] = useState(
		cityCentersData?.[0]?.name,
	);
	const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const locationsPopupRef = useRef<HTMLDivElement | null>(null);
	const locationsButtonRef = useRef<HTMLDivElement | null>(null);

	// Mobile menu state
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isMobileCityDropdownOpen, setIsMobileCityDropdownOpen] =
		useState(false);

	// Remove shared animated underline state (now using individual underlines)
	// const navItemsRef = useRef<{ [key: string]: HTMLElement | null }>({});

	const isActive = (path: string) => location.pathname.startsWith(path);

	const currentCityData = cityCentersData?.find(
		(loc: (typeof cityCentersData)[number]) => loc.name === selectedCity,
	) ||
		cityCentersData?.[0] || { centers: [] };

	const onClickCityNavigate = (cityRedirect: string) => {
		navigate(cityRedirect);
		setShowLocationsPopup(false);
	};

	const onClickCentreNavigate = (centreRedirect: string) => {
		navigate(centreRedirect);
		setShowLocationsPopup(false);
	};

	// Remove handler for shared animated underline

	// Handle opening dropdown
	const handleLocationsMouseEnter = () => {
		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}
		setShowLocationsPopup(true);
	};

	// Handle closing dropdown with delay
	const handleLocationsMouseLeave = () => {
		closeTimeoutRef.current = setTimeout(() => {
			setShowLocationsPopup(false);
		}, 200);
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

	// Disable background scroll when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	// Close mobile menu on Esc key
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isMobileMenuOpen) {
				setIsMobileMenuOpen(false);
			}
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, [isMobileMenuOpen]);

	// Close locations popup on click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				showLocationsPopup &&
				locationsPopupRef.current &&
				locationsButtonRef.current &&
				!locationsPopupRef.current.contains(event.target as Node) &&
				!locationsButtonRef.current.contains(event.target as Node)
			) {
				setShowLocationsPopup(false);
			}
		};

		if (showLocationsPopup) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showLocationsPopup]);

	// Close mobile menu and navigate
	const handleMobileNavClick = (path: string) => {
		setIsMobileMenuOpen(false);
		navigate(path);
	};

	return (
		<>
			{/* Add keyframe animations */}
			<style>{`
				@keyframes popupScale {
					from {
						opacity: 0;
						transform: translateX(-50%) scale(0.95);
					}
					to {
						opacity: 1;
						transform: translateX(-50%) scale(1);
					}
				}
				
				@keyframes slideFromLeft {
					from {
						opacity: 0;
						transform: translateX(-30px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}
				
				html, body {
					overflow-x: hidden !important;
					max-width: 100vw;
				}
			`}</style>

			{/* Mobile Navbar - visible on small and medium screens */}
			<div className='lg:hidden w-full px-3 py-3 fixed top-10 left-0 z-40 bg-white shadow-md flex items-center justify-between max-w-full'>
				<div
					onClick={() => {
						if (location.pathname === "/") {
							window.scrollTo({ top: 0, behavior: "smooth" });
						} else {
							navigate("/");
						}
					}}
					className='flex items-center cursor-pointer'
				>
					<img src={isproutLogo} alt='iSprout Logo' className='h-8' />
				</div>

				<div className='flex items-center gap-2'>
					{/* Flyers Club Button */}
					<a
						href='https://flyersclub.isprout.in/'
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 border-2 border-brand-blue no-underline hover:scale-105 hover:shadow-lg group relative overflow-hidden'
						style={{
							backgroundColor: "#00275c",
							boxShadow: "inset 0 0 0 0 transparent",
							transition: "all 0.3s ease",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = "#ffffff";
							e.currentTarget.style.boxShadow =
								"inset 0 0 20px rgba(74, 144, 226, 0.4), inset 0 0 40px rgba(0, 39, 92, 0.2)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "#00275c";
							e.currentTarget.style.boxShadow =
								"inset 0 0 0 0 transparent";
						}}
					>
						<div className='w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover:rotate-12 relative z-10'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='#00275c'
								className='w-3 h-3 transition-colors duration-300'
							>
								<path d='M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z' />
							</svg>
						</div>
						<span
							className='text-xs font-semibold whitespace-nowrap text-white group-hover:text-brand-blue transition-colors duration-300 relative z-10'
							style={{
								fontFamily: "Outfit, sans-serif",
							}}
						>
							Flyers Club
						</span>
					</a>

					{/* Hamburger Menu */}
					<button
						onClick={() => setIsMobileMenuOpen(true)}
						className='p-2 focus:outline-none z-10'
						aria-label='Open navigation menu'
					>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='#00275c'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<line x1='3' y1='12' x2='21' y2='12'></line>
							<line x1='3' y1='6' x2='21' y2='6'></line>
							<line x1='3' y1='18' x2='21' y2='18'></line>
						</svg>
					</button>
				</div>
			</div>

			{/* Mobile Drawer Overlay and Drawer - Use Portal */}
			{typeof document !== "undefined" &&
				createPortal(
					<>
						{/* Mobile Drawer Overlay */}
						<div
							className={`fixed inset-0 bg-black bg-opacity-50 lg:hidden transition-opacity duration-500 ease-in-out ${
								isMobileMenuOpen
									? "z-9998 opacity-100"
									: "-z-10 opacity-0 pointer-events-none"
							}`}
							onClick={() => setIsMobileMenuOpen(false)}
						/>

						{/* Mobile Drawer */}
						<div
							role='dialog'
							aria-modal='true'
							className={`fixed top-0 left-0 h-full w-full bg-white shadow-2xl lg:hidden transition-transform duration-500 ease-in-out overflow-y-auto overflow-x-hidden ${
								isMobileMenuOpen
									? "translate-x-0 z-9999"
									: "-translate-x-full -z-10"
							}`}
						>
							<div className='flex flex-col h-full max-w-full'>
								{/* Header with Logo and Close button */}
								<div className='flex items-center justify-between p-6 border-b border-gray-100'>
									<div
										onClick={() => {
											setIsMobileMenuOpen(false);
											if (location.pathname === "/") {
												window.scrollTo({
													top: 0,
													behavior: "smooth",
												});
											} else {
												navigate("/");
											}
										}}
										className='flex items-center cursor-pointer'
									>
										<img
											src={isproutLogo}
											alt='iSprout Logo'
											className='h-10'
										/>
									</div>
									<button
										onClick={() =>
											setIsMobileMenuOpen(false)
										}
										className='p-2 focus:outline-none transition-all duration-200 hover:opacity-70'
										aria-label='Close navigation menu'
									>
										<svg
											width='28'
											height='28'
											viewBox='0 0 24 24'
											fill='none'
											stroke='#00275c'
											strokeWidth='2.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										>
											<line
												x1='18'
												y1='6'
												x2='6'
												y2='18'
											></line>
											<line
												x1='6'
												y1='6'
												x2='18'
												y2='18'
											></line>
										</svg>
									</button>
								</div>

								{/* Navigation Links */}
								<nav
									className='flex flex-col px-6 py-4 space-y-6'
									style={{ fontFamily: "Outfit, sans-serif" }}
								>
									{/* Our Locations with City Dropdown */}
									<div className='flex flex-col'>
										<button
											onClick={() =>
												setIsMobileCityDropdownOpen(
													!isMobileCityDropdownOpen,
												)
											}
											className='text-left text-lg font-medium text-gray-900 hover:text-gray-600 py-2 flex items-center gap-1 group'
										>
											Our Locations
											<svg
												width='12'
												height='12'
												viewBox='0 0 12 12'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
												className={`transition-transform duration-300 mt-0.5 ${isMobileCityDropdownOpen ? "rotate-180" : ""}`}
											>
												<path
													d='M3 4.5L6 7.5L9 4.5'
													stroke='currentColor'
													strokeWidth='1.5'
													strokeLinecap='round'
													strokeLinejoin='round'
												/>
											</svg>
										</button>

										{/* City Dropdown */}
										{isMobileCityDropdownOpen && (
											<div className='ml-4 mt-2 flex flex-col space-y-2'>
												{cityCentersData.map(
													(
														location: (typeof cityCentersData)[number],
													) => (
														<button
															key={location.id}
															onClick={() => {
																onClickCityNavigate(
																	location.cityRedirect,
																);
																setIsMobileMenuOpen(
																	false,
																);
																setIsMobileCityDropdownOpen(
																	false,
																);
															}}
															className='text-left text-base font-normal text-gray-700 hover:text-brand-blue py-1.5 px-3 rounded hover:bg-gray-50 transition-colors'
														>
															{location.name}
														</button>
													),
												)}
											</div>
										)}
									</div>
									<button
										onClick={() =>
											handleMobileNavClick("/managed")
										}
										className='text-left text-lg font-medium text-gray-900 hover:text-gray-600 py-2'
									>
										Managed Offices
									</button>
									<button
										onClick={() =>
											handleMobileNavClick(
												"/virtual-office",
											)
										}
										className='text-left text-lg font-medium text-gray-900 hover:text-gray-600 py-2'
									>
										Virtual Office
									</button>
									<button
										onClick={() =>
											handleMobileNavClick(
												"/meeting-rooms",
											)
										}
										className='text-left text-lg font-medium text-gray-900 hover:text-gray-600 py-2'
									>
										Meeting Rooms
									</button>

									{/* Flyers Club in mobile menu */}
									<div className='flex justify-center mt-4'>
										<a
											href='https://flyersclub.isprout.in/'
											target='_blank'
											rel='noopener noreferrer'
											className='flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-brand-blue no-underline transition-all duration-300 hover:scale-105 hover:shadow-lg group relative overflow-hidden w-auto'
											style={{
												backgroundColor: "#00275c",
												boxShadow:
													"inset 0 0 0 0 transparent",
												transition: "all 0.3s ease",
											}}
											onMouseEnter={(e) => {
												e.currentTarget.style.backgroundColor =
													"#ffffff";
												e.currentTarget.style.boxShadow =
													"inset 0 0 20px rgba(74, 144, 226, 0.4), inset 0 0 40px rgba(0, 39, 92, 0.2)";
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.backgroundColor =
													"#00275c";
												e.currentTarget.style.boxShadow =
													"inset 0 0 0 0 transparent";
											}}
											onClick={() =>
												setIsMobileMenuOpen(false)
											}
										>
											<div className='w-6 h-6 rounded-full bg-white group-hover:bg-brand-blue flex items-center justify-center shrink-0 transition-all duration-300 group-hover:rotate-12 relative z-10'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 24 24'
													fill='#00275c'
													className='w-3.5 h-3.5 transition-colors duration-300 group-hover:fill-white'
												>
													<path d='M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z' />
												</svg>
											</div>
											<span
												className='text-sm font-semibold text-white group-hover:text-brand-blue transition-colors duration-300 relative z-10'
												style={{
													fontFamily:
														"Outfit, sans-serif",
												}}
											>
												Flyers Club
											</span>
										</a>
									</div>
								</nav>
							</div>
						</div>
					</>,
					document.body,
				)}

			{/* Desktop Navbar - visible only on large screens and above */}
			<nav className='hidden lg:block w-full text-black bg-white py-1.5 sm:py-2 md:py-2.5 px-2 sm:px-4 md:px-6 fixed top-10 left-0 z-40 shadow-md max-w-full'>
				<div className='w-full flex flex-wrap items-center justify-between gap-2 max-w-full'>
					{/* iSprout Logo on the left */}
					<div
						onClick={() => {
							if (location.pathname === "/") {
								window.scrollTo({ top: 0, behavior: "smooth" });
							} else {
								navigate("/");
							}
						}}
						className='flex items-center shrink-0 ml-1 sm:ml-2 md:ml-8 lg:ml-12 cursor-pointer'
					>
						<img
							src={isproutLogo}
							alt='iSprout Logo'
							className='h-7 sm:h-8 md:h-9 lg:h-10 xl:h-12'
						/>
					</div>

					{/* Navigation headings in the center */}
					<div
						className='flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-12 z-50'
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						<div
							ref={(el) => {
								locationsButtonRef.current = el;
							}}
							className='group relative z-50'
							onMouseEnter={handleLocationsMouseEnter}
						>
							<span
								className='text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900 hover:text-gray-600 whitespace-nowrap cursor-pointer bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0 flex items-center gap-1 relative'
								style={{
									WebkitTapHighlightColor: "transparent",
								}}
							>
								Our Locations
								<svg
									width='14'
									height='14'
									viewBox='0 0 12 12'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									className='transition-transform duration-300 mt-0.5'
									style={{
										transform: showLocationsPopup
											? "rotate(180deg)"
											: "rotate(0deg)",
									}}
								>
									<path
										d='M3 4.5L6 7.5L9 4.5'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
								<span
									className={`absolute left-0 bottom-0 h-0.5 bg-black transition-all duration-300 ease-out ${isActive("/locations") || isActive("/city") || isActive("/centre") ? "w-full" : "w-0 group-hover:w-full"}`}
								/>
							</span>

							{/* Locations Popup */}
							{showLocationsPopup && (
								<div
									ref={locationsPopupRef}
									className='fixed rounded-3xl shadow-2xl border-2 overflow-hidden pointer-events-auto p-4'
									style={{
										backgroundColor: "#F5F5F5",
										borderColor: "#E0E0E0",
										width: "90vw",
										maxWidth: "1200px",
										maxHeight: "75vh",
										top: "120px",
										left: "50%",
										transform: "translateX(-50%)",
										zIndex: 9999,
										animation:
											"popupScale 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
									}}
									onMouseLeave={handleLocationsMouseLeave}
								>
									<div className='flex flex-col md:flex-row h-full'>
										{/* Left Panel - City List */}
										<div
											className='w-full md:w-52 bg-white p-3 border-r border-gray-200 overflow-y-auto rounded-2xl'
											style={{
												maxHeight: "75vh",
												animation:
													"slideFromLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards",
												opacity: 0,
											}}
										>
											<div className='flex flex-col gap-2'>
												{cityCentersData.map(
													(
														cityData: (typeof cityCentersData)[number],
														index: number,
													) => (
														<button
															key={index}
															onClick={() => {
																setSelectedCity(
																	cityData.name,
																);
																onClickCityNavigate(
																	cityData.cityRedirect,
																);
															}}
															onMouseEnter={() =>
																setSelectedCity(
																	cityData.name,
																)
															}
															className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
																selectedCity ===
																cityData.name
																	? "text-white font-semibold"
																	: "text-gray-700 hover:bg-gray-50"
															}`}
															style={
																selectedCity ===
																cityData.name
																	? {
																			backgroundColor:
																				"#00275c",
																			fontFamily:
																				"Outfit, sans-serif",
																		}
																	: {
																			fontFamily:
																				"Outfit, sans-serif",
																		}
															}
														>
															<span className='text-sm'>
																{cityData.name}
															</span>
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
													),
												)}
											</div>
										</div>

										{/* Right Panel - Center Cards */}
										<div
											className='flex-1 p-6 overflow-y-auto'
											style={{
												maxHeight: "75vh",
												animation:
													"slideFromLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards",
												opacity: 0,
											}}
										>
											{/* Location Cards Grid - Show max 6 centers */}
											<div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
												{currentCityData.centers
													.slice(0, 6)
													.map(
														(
															location: (typeof currentCityData.centers)[number],
															index: number,
														) => (
															<div
																key={index}
																className='relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group'
																style={{
																	height: "160px",
																}}
																onClick={() =>
																	onClickCentreNavigate(
																		location.explore,
																	)
																}
															>
																<img
																	src={
																		location
																			.cityLevelImages
																			.lobby
																	}
																	alt={
																		location.name
																	}
																	className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
																/>
																<div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent' />
																<div className='absolute bottom-0 left-0 right-0 p-3 text-white'>
																	<h3
																		className='text-sm font-bold mb-1 line-clamp-1'
																		style={{
																			fontFamily:
																				"Outfit, sans-serif",
																		}}
																	>
																		{
																			location.name
																		}
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
																				fontFamily:
																					"Outfit, sans-serif",
																			}}
																		>
																			{
																				location.shortAddress
																			}
																		</span>
																	</div>
																</div>
															</div>
														),
													)}
											</div>

											{/* View More Link */}
											{currentCityData.centers.length >
												6 && (
												<button
													onClick={() =>
														onClickCityNavigate(
															currentCityData.cityRedirect,
														)
													}
													className='flex items-center gap-2 text-base font-semibold hover:gap-3 transition-all'
													style={{
														fontFamily:
															"Outfit, sans-serif",
														color: "#00275c",
													}}
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
							to='/managed-office-space'
							onMouseEnter={() => {
								setShowLocationsPopup(false);
							}}
							className='group text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900 hover:text-gray-600 whitespace-nowrap cursor-pointer bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0 relative'
							style={{ WebkitTapHighlightColor: "transparent" }}
						>
							Managed Offices
							<span
								className={`absolute left-0 bottom-0 h-0.5 bg-black transition-all duration-300 ease-out ${isActive("/managed") ? "w-full" : "w-0 group-hover:w-full"}`}
							/>
						</Link>
						<Link
							to='/virtual-office'
							onMouseEnter={() => {
								setShowLocationsPopup(false);
							}}
							className='group text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900 hover:text-gray-600 whitespace-nowrap cursor-pointer bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0 relative'
							style={{ WebkitTapHighlightColor: "transparent" }}
						>
							Virtual Office
							<span
								className={`absolute left-0 bottom-0 h-0.5 bg-black transition-all duration-300 ease-out ${isActive("/virtual-office") ? "w-full" : "w-0 group-hover:w-full"}`}
							/>
						</Link>
						<Link
							to='/meeting-rooms'
							onMouseEnter={() => {
								setShowLocationsPopup(false);
							}}
							className='group text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900 hover:text-gray-600 whitespace-nowrap cursor-pointer bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0 relative'
							style={{ WebkitTapHighlightColor: "transparent" }}
						>
							Meeting Rooms
							<span
								className={`absolute left-0 bottom-0 h-0.5 bg-black transition-all duration-300 ease-out ${isActive("/meeting-rooms") ? "w-full" : "w-0 group-hover:w-full"}`}
							/>
						</Link>
					</div>

					{/* Flyers Club Button on the right */}
					<a
						href='https://flyersclub.isprout.in/'
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center gap-1 sm:gap-2 md:gap-3 px-4 py-2 rounded-lg transition-all duration-300 shrink-0 border-2 border-brand-blue no-underline hover:scale-105 hover:shadow-lg group relative overflow-hidden'
						style={{
							backgroundColor: "#00275c",
							boxShadow: "inset 0 0 0 0 transparent",
							transition: "all 0.3s ease",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = "#ffffff";
							e.currentTarget.style.boxShadow =
								"inset 0 0 20px 00275c";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "#00275c";
							e.currentTarget.style.boxShadow =
								"inset 0 0 0 0 transparent";
						}}
					>
						<div className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 rounded-full bg-white group-hover:bg-brand-blue flex items-center justify-center shrink-0 transition-all duration-300 group-hover:rotate-12 relative z-10'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='#00275c'
								className='w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors duration-300 group-hover:fill-white'
							>
								<path d='M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z' />
							</svg>
						</div>
						<span
							className='text-xs sm:text-sm md:text-base lg:text-base font-semibold whitespace-nowrap pr-1 sm:pr-2 text-white group-hover:text-brand-blue transition-colors duration-300 relative z-10'
							style={{
								fontFamily: "Outfit, sans-serif",
							}}
						>
							Flyers Club
						</span>
					</a>
				</div>
			</nav>
			<ScrollToTop />
		</>
	);
};

export default SubNavbar;
