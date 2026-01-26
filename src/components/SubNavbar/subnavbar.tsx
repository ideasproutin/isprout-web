import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import isproutLogo from "../../assets/subnavbar/isprout_logo.png";
// import flyersClubLogo from "../../assets/subnavbar/flyers_club_logo.png";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import ourLocations from "../../content/ourLocations";

const SubNavbar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const textColor = "text-gray-900";
	const hoverColor = "hover:text-gray-600";
	const [showLocationsPopup, setShowLocationsPopup] = useState(false);
	const [selectedCity, setSelectedCity] = useState(ourLocations[0].city);
	const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const locationsPopupRef = useRef<HTMLDivElement | null>(null);
	const locationsButtonRef = useRef<HTMLDivElement | null>(null);

	// Mobile menu state
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Animated underline state
	const [underlineStyle, setUnderlineStyle] = useState({
		left: 0,
		width: 0,
		opacity: 0,
	});
	const navItemsRef = useRef<{ [key: string]: HTMLElement | null }>({});

	const isActive = (path: string) => location.pathname.startsWith(path);

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

	// Handler for animated underline
	const handleNavItemHover = (key: string | null) => {
		if (key && navItemsRef.current[key]) {
			const element = navItemsRef.current[key];
			if (element) {
				setUnderlineStyle({
					left: element.offsetLeft,
					width: element.offsetWidth,
					opacity: 1,
				});
			}
		} else {
			setUnderlineStyle((prev) => ({ ...prev, opacity: 0 }));
		}
	};

	// Handle opening dropdown
	const handleLocationsMouseEnter = () => {
		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}
		setShowLocationsPopup(true);
		handleNavItemHover("locations");
	};

	// Handle closing dropdown with delay
	const handleLocationsMouseLeave = () => {
		closeTimeoutRef.current = setTimeout(() => {
			setShowLocationsPopup(false);
			handleNavItemHover(null);
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
				handleNavItemHover(null);
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
			`}</style>
			
			{/* Mobile Navbar - visible only on small screens */}
			<div className='md:hidden w-full px-4 py-2 sticky top-10 z-99 bg-white shadow-md'>
				<div
					className='flex items-center justify-between px-4 py-3 rounded-full shadow-lg'
					style={{ backgroundColor: "#ffffff" }}
				>
					<Link to='/' className='flex items-center'>
						<img
							src={isproutLogo}
							alt='iSprout Logo'
							className='h-8'
						/>
					</Link>

					<button
						onClick={() => setIsMobileMenuOpen(true)}
						className='p-2 focus:outline-none z-10 relative'
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
							className={`fixed inset-0 bg-black bg-opacity-50 md:hidden transition-opacity duration-300 ${
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
							className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl md:hidden transition-transform duration-300 ease-in-out overflow-y-auto ${
								isMobileMenuOpen
									? "translate-x-0 z-9999"
									: "translate-x-full -z-10"
							}`}
						>
							<div className='flex flex-col h-full'>
								{/* Close button */}
								<div className='flex justify-end p-4'>
									<button
										onClick={() =>
											setIsMobileMenuOpen(false)
										}
										className='p-2 hover:bg-gray-100 rounded-full'
										aria-label='Close navigation menu'
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
									<button
										onClick={() =>
											handleMobileNavClick("/locations")
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
											className='transition-transform duration-300 group-hover:rotate-180 mt-0.5'
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
									<button
										onClick={() =>
											handleMobileNavClick("/managed")
										}
										className='text-left text-lg font-medium text-gray-900 hover:text-gray-600 py-2'
									>
										Managed Office
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
									<a
										href='https://flyersclub.isprout.in/'
										target='_blank'
										rel='noopener noreferrer'
										className='flex items-center gap-3 px-4 py-2 rounded-lg border-2 border-[#00275c] no-underline mt-4 transition-all duration-300 hover:scale-105 hover:shadow-lg group relative overflow-hidden'
										style={{ 
											backgroundColor: "#00275c",
											boxShadow: "inset 0 0 0 0 transparent",
											transition: "all 0.3s ease"
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.backgroundColor = "#ffffff";
											e.currentTarget.style.boxShadow = "inset 0 0 20px rgba(74, 144, 226, 0.4), inset 0 0 40px rgba(0, 39, 92, 0.2)";
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.backgroundColor = "#00275c";
											e.currentTarget.style.boxShadow = "inset 0 0 0 0 transparent";
										}}
										onClick={() =>
											setIsMobileMenuOpen(false)
										}
									>
										<div className='w-7 h-7 rounded-full bg-white group-hover:bg-[#00275c] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:rotate-12 relative z-10'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 24 24'
												fill='#00275c'
												className='w-4 h-4 transition-colors duration-300 group-hover:fill-white'
											>
												<path d='M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z' />
											</svg>
										</div>
										<span
											className='text-base font-semibold text-white group-hover:text-[#00275c] transition-colors duration-300 relative z-10'
											style={{
												fontFamily:
													"Otomanopee One, sans-serif",
											}}
										>
											Flyers Club
										</span>
									</a>
								</nav>
							</div>
						</div>
					</>,
					document.body,
				)}

			{/* Desktop Navbar - hidden on small screens */}
			<nav className='hidden md:block w-full text-black bg-white py-1.5 sm:py-2 md:py-2.5 px-2 sm:px-4 md:px-6 overflow-x-auto sticky top-10 z-99 shadow-md'>
				<div className='w-full flex flex-wrap items-center justify-between gap-2 min-w-max'>
					{/* iSprout Logo on the left */}
					<Link
						to='/'
						className='flex items-center shrink-0 ml-1 sm:ml-2 md:ml-8 lg:ml-12'
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
						<div
							ref={(el) => {
								navItemsRef.current["locations"] = el;
								locationsButtonRef.current = el;
							}}
							className='relative z-50'
							onMouseEnter={handleLocationsMouseEnter}
						>
							<span
								className='text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900 hover:text-gray-600 whitespace-nowrap cursor-pointer bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0 flex items-center gap-1 group'
								style={{
									WebkitTapHighlightColor: "transparent",
								}}
							>
								<span className={`${
									isActive("/locations") ||
									isActive("/city") ||
									isActive("/centre")
										? "border-b-2 border-black"
										: ""
								}`}>
									Our Locations
								</span>
								<svg
									width='14'
									height='14'
									viewBox='0 0 12 12'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									className='transition-transform duration-300 mt-0.5'
									style={{
										transform: showLocationsPopup ? 'rotate(180deg)' : 'rotate(0deg)'
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
							</span>

							{/* Locations Popup */}
							{showLocationsPopup && (
								<div
									ref={locationsPopupRef}
									className='fixed rounded-3xl shadow-2xl border-2 overflow-hidden pointer-events-auto'
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
										animation: "popupScale 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
									}}
									onMouseLeave={handleLocationsMouseLeave}
								>
									<div className='flex flex-col md:flex-row h-full'>
										{/* Left Panel - City List */}
										<div
											className='w-full md:w-52 bg-white p-3 border-r border-gray-200 overflow-y-auto'
											style={{ 
												maxHeight: "75vh",
												animation: "slideFromLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards",
												opacity: 0,
											}}
										>
											<h3
												className='text-base font-bold mb-3 text-gray-500'
												style={{
													fontFamily:
														"Outfit, sans-serif",
												}}
											>
												Inspiring Workspaces
											</h3>
											<div className='flex flex-col gap-2'>
												{ourLocations.map(
													(cityData, index) => (
														<button
															key={index}
															onClick={() => {
																setSelectedCity(
																	cityData.city,
																);
																onClickCityNavigate(
																	cityData.cityRedirect,
																);
															}}
															onMouseEnter={() =>
																setSelectedCity(
																	cityData.city,
																)
															}
															className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
																selectedCity ===
																cityData.city
																	? "text-white font-semibold"
																	: "text-gray-700 hover:bg-gray-50"
															}`}
															style={
																selectedCity ===
																cityData.city
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
																{cityData.city}
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
												animation: "slideFromLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards",
												opacity: 0,
											}}
										>
											{/* Location Cards Grid - Show max 6 centers */}
											<div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
												{currentCityData.centers
													.slice(0, 6)
													.map((location, index) => (
														<div
															key={index}
															className='relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group'
															style={{
																height: "160px",
															}}
															onClick={() =>
																onClickCentreNavigate(
																	location.centreRedirect,
																)
															}
														>
															<img
																src={
																	location.image
																}
																alt={
																	location.center_name
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
																		location.center_name
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
																			location.location
																		}
																	</span>
																</div>
															</div>
														</div>
													))}
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
							to='/managed'
							ref={(el) => {
								navItemsRef.current["managed"] = el;
							}}
							onMouseEnter={() => {
								setShowLocationsPopup(false);
								handleNavItemHover("managed");
							}}
							onMouseLeave={() => handleNavItemHover(null)}
							className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${textColor} ${hoverColor} whitespace-nowrap cursor-pointer bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0 ${
								isActive("/managed") && !showLocationsPopup
									? "border-b-2 border-black"
									: ""
							}`}
							style={{ WebkitTapHighlightColor: "transparent" }}
						>
							Managed Office
						</Link>
						<Link
							to='/virtual-office'
							ref={(el) => {
								navItemsRef.current["virtual"] = el;
							}}
							onMouseEnter={() => {
								setShowLocationsPopup(false);
								handleNavItemHover("virtual");
							}}
							onMouseLeave={() => handleNavItemHover(null)}
							className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${textColor} ${hoverColor} whitespace-nowrap cursor-pointer bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0 ${
								isActive("/virtual-office") &&
								!showLocationsPopup
									? "border-b-2 border-black"
									: ""
							}`}
							style={{ WebkitTapHighlightColor: "transparent" }}
						>
							Virtual Office
						</Link>
						<Link
							to='/meeting-rooms'
							ref={(el) => {
								navItemsRef.current["meeting"] = el;
							}}
							onMouseEnter={() => {
								setShowLocationsPopup(false);
								handleNavItemHover("meeting");
							}}
							onMouseLeave={() => handleNavItemHover(null)}
							className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${textColor} ${hoverColor} whitespace-nowrap cursor-pointer bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0 ${
								isActive("/meeting-rooms") &&
								!showLocationsPopup
									? "border-b-2 border-black"
									: ""
							}`}
							style={{ WebkitTapHighlightColor: "transparent" }}
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
								backgroundColor: "#000000",
							}}
						/>
					</div>

					{/* Flyers Club Button on the right */}
					<a
						href='https://flyersclub.isprout.in/'
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center gap-1 sm:gap-2 md:gap-3 px-4 py-2 rounded-lg transition-all duration-300 shrink-0 border-2 border-[#00275c] no-underline hover:scale-105 hover:shadow-lg group relative overflow-hidden'
						style={{ 
							backgroundColor: "#00275c",
							boxShadow: "inset 0 0 0 0 transparent",
							transition: "all 0.3s ease"
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = "#ffffff";
							e.currentTarget.style.boxShadow = "inset 0 0 20px 00275c";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "#00275c";
							e.currentTarget.style.boxShadow = "inset 0 0 0 0 transparent";
						}}
					>
						<div className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 rounded-full bg-white group-hover:bg-[#00275c] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:rotate-12 relative z-10'>
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
							className='text-xs sm:text-sm md:text-base lg:text-base font-semibold whitespace-nowrap pr-1 sm:pr-2 text-white group-hover:text-[#00275c] transition-colors duration-300 relative z-10'
							style={{
								fontFamily: "Otomanopee One, sans-serif",
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
