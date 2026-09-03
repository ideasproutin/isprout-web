import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import isproutLogo from "../../assets/subnavbar/iSprout-Logo.svg";
import profileIcon from "../../assets/navbar/profileicon.png";
// import flyersClubLogo from "../../assets/subnavbar/flyers_club_logo.png";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { useCityCenters } from "../../hooks/useCityCentre";
import { useProfile } from "../../hooks/useProfile";
import AuthModal from "../../pages/auth/auth";

const SubNavbar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { data: cityCentersData = [] } = useCityCenters();
	const { profile } = useProfile();

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
	const mobileMenuRef = useRef<HTMLDivElement | null>(null);
	const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);
	const [isCityDropdownClosing, setIsCityDropdownClosing] = useState(false);

	// Auth modal state
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(
		() =>
			typeof window !== "undefined" &&
			localStorage.getItem("isLoggedIn") === "true",
	);
	const [userName, setUserName] = useState<string | null>(() => {
		if (typeof window === "undefined") return null;
		try {
			const raw = localStorage.getItem("authUser");
			const u = raw ? JSON.parse(raw) : null;
			return u?.fullName ?? null;
		} catch {
			return null;
		}
	});

	// Delay portal rendering until after hydration to avoid SSR mismatch
	const [isMounted, setIsMounted] = useState(false);

	// Check login status after mount and on route changes to avoid SSR mismatch
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsMounted(true);
			// Check login status from localStorage
			if (typeof window !== "undefined") {
				const loggedIn = localStorage.getItem("isLoggedIn") === "true";
				setIsLoggedIn(loggedIn);

				if (loggedIn) {
					let name = null;

					// First try authUser
					try {
						const authUserRaw = localStorage.getItem("authUser");
						if (authUserRaw) {
							const authUser = JSON.parse(authUserRaw);
							name = authUser?.fullName || null;
						}
					} catch {
						// Continue to next source
					}

					// If not found, try userData
					if (!name) {
						try {
							const userDataRaw =
								localStorage.getItem("userData");
							if (userDataRaw) {
								const userData = JSON.parse(userDataRaw);
								name =
									userData?.fullName ||
									userData?.name ||
									null;
							}
						} catch {
							// Ignore parse errors
						}
					}

					setUserName(name);
				} else {
					setUserName(null);
				}
			}
		}, 0);
		return () => clearTimeout(timer);
	}, [location.pathname]);

	// Listen for storage changes (including from auth modal)
	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleStorageChange = () => {
			const loggedIn = localStorage.getItem("isLoggedIn") === "true";
			setIsLoggedIn(loggedIn);

			if (loggedIn) {
				let name = null;

				try {
					const authUserRaw = localStorage.getItem("authUser");
					if (authUserRaw) {
						const authUser = JSON.parse(authUserRaw);
						name = authUser?.fullName || null;
					}
				} catch {
					// Continue to next source
				}

				if (!name) {
					try {
						const userDataRaw = localStorage.getItem("userData");
						if (userDataRaw) {
							const userData = JSON.parse(userDataRaw);
							name = userData?.fullName || userData?.name || null;
						}
					} catch {
						// Ignore parse errors
					}
				}

				setUserName(name);
			} else {
				setUserName(null);
			}
		};

		window.addEventListener("storage", handleStorageChange);
		window.addEventListener("auth:stateChanged", handleStorageChange);
		return () => {
			window.removeEventListener("storage", handleStorageChange);
			window.removeEventListener(
				"auth:stateChanged",
				handleStorageChange,
			);
		};
	}, []);

	// Remove shared animated underline state (now using individual underlines)
	// const navItemsRef = useRef<{ [key: string]: HTMLElement | null }>({});

	const isActive = (path: string) => location.pathname.startsWith(path);

	const currentCityData = cityCentersData?.find(
		(loc: (typeof cityCentersData)[number]) => loc.name === selectedCity,
	) ||
		cityCentersData?.[0] || { centers: [] };

	const onClickCityNavigate = (cityRedirect: string) => {
		navigate(`${cityRedirect}/`);
		setShowLocationsPopup(false);
	};

	const onClickCentreNavigate = (centreRedirect: string) => {
		navigate(`${centreRedirect}/`);
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

	// Handle closing mobile menu with animation
	const closeMobileMenu = useCallback(() => {
		setIsMobileMenuClosing(true);
		if (isMobileCityDropdownOpen) {
			setIsCityDropdownClosing(true);
			setTimeout(() => {
				setIsMobileCityDropdownOpen(false);
				setIsCityDropdownClosing(false);
			}, 200);
		}
		setTimeout(() => {
			setIsMobileMenuOpen(false);
			setIsMobileMenuClosing(false);
		}, 300);
	}, [isMobileCityDropdownOpen]);

	// Handle city dropdown toggle with animation
	const toggleCityDropdown = useCallback(() => {
		if (isMobileCityDropdownOpen) {
			setIsCityDropdownClosing(true);
			setTimeout(() => {
				setIsMobileCityDropdownOpen(false);
				setIsCityDropdownClosing(false);
			}, 200);
		} else {
			setIsMobileCityDropdownOpen(true);
		}
	}, [isMobileCityDropdownOpen]);

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
		if (isMobileMenuOpen || isMobileMenuClosing) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen, isMobileMenuClosing]);

	// Close mobile menu on click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			if (
				isMobileMenuOpen &&
				mobileMenuRef.current &&
				!mobileMenuRef.current.contains(target)
			) {
				const hamburgerButton = document.querySelector(
					'[aria-label*="navigation menu"]',
				);
				if (hamburgerButton && !hamburgerButton.contains(target)) {
					closeMobileMenu();
				}
			}
		};

		if (isMobileMenuOpen) {
			const timeoutId = setTimeout(() => {
				document.addEventListener("mousedown", handleClickOutside);
			}, 100);

			return () => {
				clearTimeout(timeoutId);
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}
	}, [isMobileMenuOpen, closeMobileMenu]);

	// Close mobile menu on Esc key
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isMobileMenuOpen) {
				closeMobileMenu();
			}
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, [isMobileMenuOpen, closeMobileMenu]);

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
		setIsMobileMenuClosing(true);
		if (isMobileCityDropdownOpen) {
			setIsCityDropdownClosing(true);
		}
		setTimeout(() => {
			setIsMobileMenuOpen(false);
			setIsMobileMenuClosing(false);
			setIsMobileCityDropdownOpen(false);
			setIsCityDropdownClosing(false);
			navigate(path);
		}, 300);
	};

	return (
		<>
			{/* Preload logo so the browser fetches it before JS executes — eliminates LCP element render delay */}
			<link
				rel='preload'
				as='image'
				href={isproutLogo}
				fetchPriority='high'
			/>
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

				@keyframes slideDown {
					from {
						opacity: 0;
						transform: translateY(-10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes slideUp {
					from {
						opacity: 1;
						transform: translateY(0);
					}
					to {
						opacity: 0;
						transform: translateY(-10px);
					}
				}

				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}

				@keyframes fadeOut {
					from {
						opacity: 1;
					}
					to {
						opacity: 0;
					}
				}

				@keyframes slideDownDropdown {
					from {
						opacity: 0;
						transform: translateY(-5px);
						max-height: 0;
					}
					to {
						opacity: 1;
						transform: translateY(0);
						max-height: 500px;
					}
				}

				@keyframes slideUpDropdown {
					from {
						opacity: 1;
						transform: translateY(0);
						max-height: 500px;
					}
					to {
						opacity: 0;
						transform: translateY(-5px);
						max-height: 0;
					}
				}
				
				html, body {
					overflow-x: hidden !important;
					max-width: 100vw;
				}
			`}</style>

			{/* Mobile Navbar - visible on small and medium screens */}
			<div className='fixed left-0 z-40 flex items-center justify-between w-full max-w-full px-3 py-3 bg-white shadow-md lg:hidden top-10'>
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
					<img
						src={isproutLogo}
						alt='iSprout Logo'
						className='h-8'
						fetchPriority='high'
					/>
				</div>

				<div className='flex items-center gap-2'>
					{/* Flyers Club Button */}
					{/* <a
						href='https://flyersclub.isprout.in/'
						target='_blank'
						rel='noopener noreferrer'
						className='relative flex items-center gap-2 px-3 py-2 overflow-hidden no-underline transition-all duration-300 border-2 rounded-lg border-brand-blue hover:border-brand-blue hover:scale-105 hover:shadow-lg group'
						style={{
							backgroundColor: "#00275c",
							transition: "all 0.3s ease",
						}}
					>
						<div className='relative z-10 flex items-center justify-center w-5 h-5 transition-all duration-300 bg-white rounded-full shrink-0 group-hover:rotate-12'>
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
							className='relative z-10 text-xs font-semibold text-white transition-colors duration-300 whitespace-nowrap group-hover:text-brand-blue'
							style={{
								fontFamily: "Outfit, sans-serif",
							}}
						>
							Flyers Club
						</span>
					</a> */}

					{/* Login / Profile Icon (Mobile) */}
					{isLoggedIn ? (
						<div
							className='flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity'
							onClick={() => navigate("/dashboard")}
						>
							<div
								style={{
									width: "24px",
									height: "24px",
									borderRadius: "50%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									background: profile?.profilePicture
										? "transparent"
										: "#00275c",
									border: "2px solid #00275c",
									overflow: "hidden",
									flexShrink: 0,
								}}
							>
								{profile?.profilePicture ? (
									<img
										src={profile.profilePicture}
										alt='Profile'
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
											borderRadius: "50%",
										}}
									/>
								) : (
									<img
										src={profileIcon}
										alt='Profile'
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
											filter: "brightness(0) invert(1)",
										}}
									/>
								)}
							</div>
							{userName && (
								<span
									className='text-xs font-semibold max-w-[80px] truncate'
									style={{ color: "#00275c" }}
								>
									{userName.split(" ")[0]}
								</span>
							)}
						</div>
					) : (
						<button
							onClick={() => setShowAuthModal(true)}
							className='text-sm font-semibold text-white bg-[#00275c] px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity'
						>
							Login
						</button>
					)}

					{/* Hamburger Menu */}
					<button
						onClick={(e) => {
							e.stopPropagation();
							if (isMobileMenuOpen) {
								closeMobileMenu();
							} else {
								setIsMobileMenuOpen(true);
							}
						}}
						className='relative z-50 flex items-center justify-center w-10 h-10 p-2 focus:outline-none'
						aria-label={
							isMobileMenuOpen
								? "Close navigation menu"
								: "Open navigation menu"
						}
					>
						<div className='flex flex-col justify-between w-6 h-5'>
							<span
								className={`block h-0.5 w-full bg-[#00275c] transition-all duration-300 ease-in-out origin-center ${
									isMobileMenuOpen
										? "rotate-45 translate-y-2"
										: ""
								}`}
							/>
							<span
								className={`block h-0.5 w-full bg-[#00275c] transition-all duration-300 ease-in-out ${
									isMobileMenuOpen ? "opacity-0" : ""
								}`}
							/>
							<span
								className={`block h-0.5 w-full bg-[#00275c] transition-all duration-300 ease-in-out origin-center ${
									isMobileMenuOpen
										? "-rotate-45 -translate-y-2"
										: ""
								}`}
							/>
						</div>
					</button>
				</div>
			</div>

			{/* Mobile Dropdown Menu */}
			{(isMobileMenuOpen || isMobileMenuClosing) && (
				<>
					<div
						className='fixed inset-0 bg-black lg:hidden'
						style={{
							zIndex: 35,
							backgroundColor: "rgba(0, 0, 0, 0.2)",
							animation: isMobileMenuClosing
								? "fadeOut 0.3s ease-out forwards"
								: "fadeIn 0.3s ease-out forwards",
						}}
					/>

					<div
						ref={mobileMenuRef}
						role='dialog'
						aria-modal='false'
						aria-label='Mobile navigation menu'
						className='fixed top-[70px] left-0 w-full bg-white shadow-2xl lg:hidden overflow-y-auto rounded-b-2xl'
						style={{
							zIndex: 36,
							maxHeight: "calc(100vh - 70px)",
							animation: isMobileMenuClosing
								? "slideUp 0.3s ease-out forwards"
								: "slideDown 0.3s ease-out forwards",
						}}
					>
						<nav
							className='flex flex-col px-6 py-8 pt-12 space-y-4'
							style={{ fontFamily: "Outfit, sans-serif" }}
						>
							<div className='flex flex-col pb-3 border-b border-gray-100'>
								<button
									onClick={toggleCityDropdown}
									className='flex items-center justify-between py-2 text-base font-medium text-left text-gray-900 transition-colors hover:text-brand-blue'
								>
									Our Locations
									<svg
										width='14'
										height='14'
										viewBox='0 0 12 12'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										className={`transition-transform duration-300 ${
											isMobileCityDropdownOpen
												? "rotate-180"
												: ""
										}`}
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

								{(isMobileCityDropdownOpen ||
									isCityDropdownClosing) && (
									<div
										className='flex flex-col mt-2 ml-4 space-y-1 overflow-hidden'
										style={{
											animation: isCityDropdownClosing
												? "slideUpDropdown 0.2s ease-out forwards"
												: "slideDownDropdown 0.2s ease-out forwards",
										}}
									>
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
														setIsMobileMenuClosing(
															true,
														);
														setIsCityDropdownClosing(
															true,
														);
														setTimeout(() => {
															setIsMobileMenuOpen(
																false,
															);
															setIsMobileMenuClosing(
																false,
															);
															setIsMobileCityDropdownOpen(
																false,
															);
															setIsCityDropdownClosing(
																false,
															);
														}, 300);
													}}
													className='px-3 py-2 text-sm font-normal text-left text-gray-700 transition-colors rounded-lg hover:text-brand-blue hover:bg-gray-50'
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
									handleMobileNavClick(
										"/managed-office-space",
									)
								}
								className='py-2 pb-3 text-base font-medium text-left text-gray-900 transition-colors border-b border-gray-100 hover:text-brand-blue'
							>
								Managed Offices
							</button>

							<button
								onClick={() =>
									handleMobileNavClick("/virtual-office")
								}
								className='py-2 pb-3 text-base font-medium text-left text-gray-900 transition-colors border-b border-gray-100 hover:text-brand-blue'
							>
								Virtual Office
							</button>

							<button
								onClick={() =>
									handleMobileNavClick("/meeting-rooms")
								}
								className='py-2 pb-3 text-base font-medium text-left text-gray-900 transition-colors border-b border-gray-100 hover:text-brand-blue'
							>
								Meeting Rooms
							</button>
						</nav>
					</div>
				</>
			)}

			{/* Desktop Navbar - visible only on large screens and above */}
			<nav className='hidden lg:block w-full text-black bg-white py-1.5 sm:py-2 md:py-2.5 px-2 sm:px-4 md:px-6 fixed top-10 left-0 z-40 shadow-md max-w-full'>
				<div className='flex flex-wrap items-center justify-between w-full max-w-full gap-2'>
					{/* iSprout Logo on the left */}
					<div
						onClick={() => {
							if (location.pathname === "/") {
								window.scrollTo({ top: 0, behavior: "smooth" });
							} else {
								navigate("/");
							}
						}}
						className='flex items-center ml-1 cursor-pointer shrink-0 sm:ml-2 md:ml-8 lg:ml-12'
					>
						<img
							src={isproutLogo}
							alt='iSprout Logo'
							className='h-7 sm:h-8 md:h-9 lg:h-10 xl:h-12'
							fetchPriority='high'
						/>
					</div>

					{/* Navigation headings in the center */}
					<div
						className='z-50 flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-12'
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						<div
							ref={(el) => {
								locationsButtonRef.current = el;
							}}
							className='relative z-50 group'
							onMouseEnter={handleLocationsMouseEnter}
						>
							<span
								className='relative flex items-center gap-1 text-xs font-medium text-gray-900 bg-transparent cursor-pointer sm:text-sm md:text-base lg:text-lg whitespace-nowrap hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0'
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

							{/* Locations Popup - rendered in portal to escape navbar stacking context */}
							{isMounted &&
								showLocationsPopup &&
								createPortal(
									<div
										ref={locationsPopupRef}
										className='fixed p-4 overflow-hidden border-2 shadow-2xl pointer-events-auto rounded-3xl'
										style={{
											backgroundColor: "#F5F5F5",
											borderColor: "#E0E0E0",
											width: "90vw",
											maxWidth: "1200px",
											maxHeight: "75vh",
											top: "120px",
											left: "50%",
											transform: "translateX(-50%)",
											zIndex: 10001,
											animation:
												"popupScale 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
										}}
										onMouseLeave={handleLocationsMouseLeave}
									>
										<div className='flex flex-col h-full md:flex-row'>
											{/* Left Panel - City List */}
											<div
												className='w-full p-3 overflow-y-auto bg-white border-r border-gray-200 md:w-52 rounded-2xl'
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
																	{
																		cityData.name
																	}
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
												<div className='grid grid-cols-2 gap-4 mb-4 lg:grid-cols-3'>
													{currentCityData.centers
														.slice(0, 6)
														.map(
															(
																location: (typeof currentCityData.centers)[number],
																index: number,
															) => (
																<div
																	key={index}
																	className='relative overflow-hidden transition-all shadow-lg cursor-pointer rounded-xl hover:shadow-xl group'
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
																		className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
																	/>
																	<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent' />
																	<div className='absolute bottom-0 left-0 right-0 p-3 text-white'>
																		<h3
																			className='mb-1 text-sm font-bold line-clamp-1'
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
												{currentCityData.centers
													.length > 6 && (
													<button
														onClick={() =>
															onClickCityNavigate(
																currentCityData.cityRedirect,
															)
														}
														className='flex items-center gap-2 text-base font-semibold transition-all hover:gap-3'
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
									</div>,
									document.body,
								)}
						</div>
						<Link
							to='/managed-office-space/'
							onMouseEnter={() => {
								setShowLocationsPopup(false);
							}}
							className='relative text-xs font-medium text-gray-900 bg-transparent cursor-pointer group sm:text-sm md:text-base lg:text-lg whitespace-nowrap hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0'
							style={{ WebkitTapHighlightColor: "transparent" }}
						>
							Managed Offices
							<span
								className={`absolute left-0 bottom-0 h-0.5 bg-black transition-all duration-300 ease-out ${isActive("/managed") ? "w-full" : "w-0 group-hover:w-full"}`}
							/>
						</Link>
						<Link
							to='/virtual-office/'
							onMouseEnter={() => {
								setShowLocationsPopup(false);
							}}
							className='relative text-xs font-medium text-gray-900 bg-transparent cursor-pointer group sm:text-sm md:text-base lg:text-lg whitespace-nowrap hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0'
							style={{ WebkitTapHighlightColor: "transparent" }}
						>
							Virtual Office
							<span
								className={`absolute left-0 bottom-0 h-0.5 bg-black transition-all duration-300 ease-out ${isActive("/virtual-office") ? "w-full" : "w-0 group-hover:w-full"}`}
							/>
						</Link>
						<Link
							to='/meeting-rooms/'
							onMouseEnter={() => {
								setShowLocationsPopup(false);
							}}
							className='relative text-xs font-medium text-gray-900 bg-transparent cursor-pointer group sm:text-sm md:text-base lg:text-lg whitespace-nowrap hover:bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0'
							style={{ WebkitTapHighlightColor: "transparent" }}
						>
							Meeting Rooms
							<span
								className={`absolute left-0 bottom-0 h-0.5 bg-black transition-all duration-300 ease-out ${isActive("/meeting-rooms") ? "w-full" : "w-0 group-hover:w-full"}`}
							/>
						</Link>
					</div>

					{/* Right side actions with reduced gap */}
					<div className='flex items-center gap-2'>
						{/* Flyers Club Button */}
						{/*<a
							href='https://flyersclub.isprout.in/'
							target='_blank'
							rel='noopener noreferrer'
							className='relative flex items-center gap-1 px-4 py-2 overflow-hidden no-underline transition-all duration-300 border-2 rounded-lg sm:gap-2 md:gap-3 shrink-0 border-brand-blue hover:border-brand-blue hover:scale-105 hover:shadow-lg group'
							style={{
								backgroundColor: "#00275c",
								transition: "all 0.3s ease",
							}}
						>
							<div className='relative z-10 flex items-center justify-center w-5 h-5 transition-all duration-300 bg-white rounded-full sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 shrink-0 group-hover:rotate-12'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='#000000'
									className='w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors duration-300'
								>
									<path d='M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z' />
								</svg>
							</div>
							<span
								className='relative z-10 pr-1 text-xs font-semibold text-white transition-colors duration-300 sm:text-sm md:text-base lg:text-base whitespace-nowrap sm:pr-2 group-hover:text-brand-blue'
								style={{
									fontFamily: "Outfit, sans-serif",
								}}
							>
								Flyers Club
							</span>
						</a>*/}

						{/* Login / Profile Icon (Desktop) */}
						{isLoggedIn ? (
							<div
								className='flex items-center gap-2 transition-opacity cursor-pointer hover:opacity-70'
								onClick={() => navigate("/dashboard")}
							>
								<div
									style={{
										width: "32px",
										height: "32px",
										borderRadius: "50%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										background: profile?.profilePicture
											? "transparent"
											: "#00275c",
										border: "2px solid #00275c",
										overflow: "hidden",
										flexShrink: 0,
									}}
								>
									{profile?.profilePicture ? (
										<img
											src={profile.profilePicture}
											alt='Profile'
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
												borderRadius: "50%",
											}}
										/>
									) : (
										<img
											src={profileIcon}
											alt='Profile'
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
												filter: "brightness(0) invert(1)",
											}}
										/>
									)}
								</div>
								{userName && (
									<span
										className='text-sm font-semibold max-w-[120px] truncate'
										style={{ color: "#00275c" }}
									>
										{userName.split(" ")[0]}
									</span>
								)}
							</div>
						) : (
							<button
								onClick={() => setShowAuthModal(true)}
								className='text-sm font-semibold text-white bg-[#00275c] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap border border-white/30'
							>
								Login
							</button>
						)}
					</div>
				</div>
			</nav>
			<ScrollToTop />

			{/* Auth Modal */}
			<AuthModal
				isOpen={showAuthModal}
				onClose={() => setShowAuthModal(false)}
				onLoginSuccess={() => {
					// Close the modal first
					setShowAuthModal(false);

					// Update state immediately
					setIsLoggedIn(true);

					// Use setTimeout to ensure localStorage is updated
					setTimeout(() => {
						if (typeof window !== "undefined") {
							// Mark as logged in
							localStorage.setItem("isLoggedIn", "true");
							setIsLoggedIn(true);

							// Try to get user name from multiple sources
							let name = null;

							// First try authUser
							try {
								const authUserRaw =
									localStorage.getItem("authUser");
								if (authUserRaw) {
									const authUser = JSON.parse(authUserRaw);
									name = authUser?.fullName || null;
								}
							} catch {
								// Continue to next source
							}

							// If not found, try userData
							if (!name) {
								try {
									const userDataRaw =
										localStorage.getItem("userData");
									if (userDataRaw) {
										const userData =
											JSON.parse(userDataRaw);
										name =
											userData?.fullName ||
											userData?.name ||
											null;
									}
								} catch {
									// Ignore parse errors
								}
							}

							setUserName(name);
						}
					}, 100);
				}}
			/>
		</>
	);
};

export default SubNavbar;
