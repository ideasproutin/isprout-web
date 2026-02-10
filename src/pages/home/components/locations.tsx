import React, { useState, useRef, useEffect, useCallback } from "react";
import { homePageImages } from "../../../assets";
import { locationImages } from "../../../assets";
import { COLORS } from "../../../helpers/constants/Colors";
import { useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

interface LocationCard {
	image: string;
	name: string;
	title: string;
}

const Locations: React.FC = () => {
	const [activeCity, setActiveCity] = useState("Hyderabad");
	const [currentPage, setCurrentPage] = useState<Record<string, number>>({});
	const navigate = useNavigate();

	// Mobile scroll state
	const [scrollProgress, setScrollProgress] = useState(0);
	const [showProgressBar, setShowProgressBar] = useState(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const scrollTimeoutRef = useRef<number | null>(null);

	const cities = ["Hyderabad", "Bengaluru", "Pune", "Chennai", "Vijayawada", "Vizag", "Gurugram", "Kolkata", "Ahmedabad"];

	// Location data by city
	const locationsByCity: Record<string, LocationCard[]> = {
		Hyderabad: [
			{
				image: homePageImages.hydOrbit,
				title: "Orbit",
				name: "Knowledge City, Hyderabad",
			},
			{
				image: homePageImages.hydOgm,
				name: "Kokapet, Hyderabad",
				title: "One Golden Mile",
			},
			{
				image: homePageImages.hydTwitza,
				name: "Hitec City, Hyderabad",
				title: "My Home Twitza",
			},
			{
				image: locationImages.jayabheriLobby,
				name: "Kondapur, Hyderabad",
				title: "Jayabheri Trendset",
			},
			{
				image: locationImages.stpLobby,
				name: "Financial District, Hyderabad",
				title: "Sohini Tech Park",
			},
			{
				image: locationImages.divyasreeLobby,
				name: "Hitec City, Hyderabad",
				title: "Divyasree Trinity",
			},
			{
				image: locationImages.minaasLobby,
				name: "Gachibowli, Hyderabad",
				title: "Minaas Center",
			},
			{
				image: locationImages.profoundLobby,
				name: "Kondapur, Hyderabad",
				title: "Modern Profound",
			},
			{
				image: locationImages.pranavaoneLobby,
				name: "Punjagutta, Hyderabad",
				title: "Pranava One",
			},
			{
				image: locationImages.purvaLobby,
				name: "Hitec City, Hyderabad",
				title: "Purva Summit",
			},
			{
				image: locationImages.sasLobby,
				name: "Nanakramguda, Hyderabad",
				title: "SAS Tower",
			},
			{
				image: locationImages.shreshtaLobby,
				name: "Kondapur, Hyderabad",
				title: "Sreshta Marvel",
			},
		],
		Bengaluru: [
			{
				image: locationImages.nrenclaveLobby,
				name: "Whitefield, Bengaluru",
				title: "NR Enclave",
			},
			{
				image: locationImages.shilpithaLobby,
				name: "Bellandur, Bengaluru",
				title: "Shilpitha Tech Park",
			},
			{
				image: locationImages.psaLobby,
				name: "Infantry Road, Bengaluru",
				title: "Prestige Saleh Ahmed",
			},
		],
		Pune: [
			{
				image: locationImages.greyLobby,
				name: "Baner, Pune",
				title: "Grey Stone",
			},
			{
				image: locationImages.panchasilaLobby,
				name: "Yerwada, Pune",
				title: "Panchshil Tech Park One",
			},
			{
				image: locationImages.panchasila1Lobby,
				name: "Hinjewadi, Pune",
				title: "Panchshil Tech Park",
			},
		],
		Chennai: [
			{
				image: locationImages.smtLobby,
				name: "OMR, Perungudi, Chennai",
				title: "SM Tower",
			},
			{
				image: locationImages.sigapiachiLobby,
				name: "Egmore, Chennai",
				title: "Sigapiachi",
			},
			{
				image: locationImages.jadeLobby,
				name: "Guindy, Chennai",
				title: "Jade",
			},
		],
		Vijayawada: [
			{
				image: locationImages.benzLobby,
				name: "BenZ Circle, Vijayawada",
				title: "Benz Circle",
			},
			{
				image: locationImages.medhaLobby,
				name: "Gannavaram, Vijayawada",
				title: "Medha Towers",
			},
		],
		Kolkata: [
			{
				image: locationImages.godrejLobby,
				name: "Bidhannagar, Kolkata",
				title: "Godrej Waterside",
			},
		],
		Ahmedabad: [
			{
				image: locationImages.aurelienLobby,
				name: "Makarba, Ahmedabad",
				title: "Aurelien",
			},
		],
		Gurugram: [
			{
				image: locationImages.hq27Lobby,
				name: "Gurugram, Haryana",
				title: "HQ27",
			},
		],
		Visakhapatnam: [
			{
				image: locationImages.lansumsquareLobby,
				name: "Visakhapatnam, Andhra Pradesh",
				title: "Lansum Square",
			},
		],
		Vizag: [
			{
				image: locationImages.lansumsquareLobby,
				name: "Vizag, Andhra Pradesh",
				title: "Lansum Square",
			},
		],
	};

	const cityLocations = locationsByCity[activeCity] || [];
	const centreCount = cityLocations.length;

	// Pagination logic for desktop
	const cardsPerPage = 3;
	const currentCityPage = currentPage[activeCity] || 0;
	const totalPages = Math.ceil(cityLocations.length / cardsPerPage);
	const startIndex = currentCityPage * cardsPerPage;
	const visibleLocations = cityLocations.slice(
		startIndex,
		startIndex + cardsPerPage
	);
	
	const canGoPrev = currentCityPage > 0;
	const canGoNext = currentCityPage < totalPages - 1;

	const handlePrev = () => {
		if (canGoPrev) {
			setCurrentPage((prev) => ({
				...prev,
				[activeCity]: currentCityPage - 1,
			}));
		}
	};

	const handleNext = () => {
		if (canGoNext) {
			setCurrentPage((prev) => ({
				...prev,
				[activeCity]: currentCityPage + 1,
			}));
		}
	};

	// Convert center title to slug for navigation
	const getCenterSlug = (centerTitle: string): string => {
		const slugMap: Record<string, string> = {
			orbit: "orbit",
			"one golden mile": "one-golden-mile",
			"my home twiza": "my-home-twitza",
			"jayabheri trendset": "jayabheri-trendset",
			"sohini tech park": "sohini-tech-park",
			"divyasree trinity": "divyasree-trinity",
			"minaas center": "minaas-center",
			"modern profound": "modern-profound",
			"pranava one": "pranava-one",
			"purva summit": "purva-summit",
			"sas tower": "sas-tower",
			"sreshta marvel": "sreshta-marvel",
			"nr enclave": "nr-enclave",
			"shilpitha tech park": "shilpitha-tech-park",
			"prestige saleh ahmed": "prestige-saleh-ahmed",
			"grey stone": "greystone-baner",
			"panchshil tech park one": "panchshil-techpark-one",
			"panchshil tech park": "panchshil-techpark",
			"sm tower": "saravana-matrix",
			sigapiachi: "sigapi-achi",
			jade: "kochar-jade",
			"benz circle": "benz-circle",
			"medha towers": "medha-towers",
			"godrej waterside": "godrej-waterside",
			aurelien: "aurelien",
			hq27: "hq27",
			"lansum square": "lansum-square",
		};

		const normalized = centerTitle.toLowerCase();
		return slugMap[normalized] || normalized.replace(/\s+/g, "-");
	};

	const handleCenterClick = (centerTitle: string) => {
		const slug = getCenterSlug(centerTitle);
		navigate(`/office/${slug}`);
		window.scrollTo(0, 0);
	};

	const navigateCityHandler = (location: string) => {
		navigate(location);
		window.scrollTo(0, 0);
	};

	// Handle scroll for mobile progress bar
	const handleScroll = useCallback(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const scrollLeft = container.scrollLeft;
		const scrollWidth = container.scrollWidth - container.clientWidth;
		const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;

		setScrollProgress(Math.min(progress, 100));
		setShowProgressBar(true);

		// Clear existing timeout
		if (scrollTimeoutRef.current !== null) {
			window.clearTimeout(scrollTimeoutRef.current);
		}

		// Hide progress bar after 1.5 seconds of no scrolling
		scrollTimeoutRef.current = window.setTimeout(() => {
			setShowProgressBar(false);
		}, 1500);
	}, []);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (scrollTimeoutRef.current !== null) {
				window.clearTimeout(scrollTimeoutRef.current);
			}
		};
	}, []);

	// Reset scroll when city changes
	useEffect(() => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollLeft = 0;
		}
	}, [activeCity]);

	return (
		<>
			<style>{`
				.hide-scrollbar::-webkit-scrollbar {
					display: none;
				}
				.hide-scrollbar {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
			`}</style>
			<section
				id='locations'
				className='relative w-full py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden bg-white'
				style={{ fontFamily: "Outfit, sans-serif" }}
			>
				<div className='max-w-7xl mx-auto relative z-10'>
					{/* Heading */}
					<div className='flex justify-center mb-8 sm:mb-10 md:mb-12'>
						<h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center max-w-5xl px-4'>
							Inspiring{" "}
							<span
								style={{
									fontFamily: "Outfit, sans-serif",
									color: "#FFDE00",
								}}
							>
								Workspaces
							</span>{" "}
						</h2>
					</div>

					{/* City Tabs */}
			<div className='relative mb-6 sm:mb-8 border-t border-b border-gray-200 lg:border-t-0 lg:border-b-0'>
					<div 
					className='overflow-x-auto hide-scrollbar relative'
					style={{ fontFamily: "Outfit, Plus Jakarta Sans, sans-serif" }}
				>
					<div
						className='flex flex-nowrap lg:flex-wrap lg:justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-8 min-w-max lg:min-w-0 pl-6 pr-6'
					>
						{cities.map((city) => (
							<button
								key={city}
								data-city={city}
								onClick={() => setActiveCity(city)}
								className='group px-2 py-2 sm:px-3 sm:py-2 lg:px-3 lg:py-2 text-base sm:text-lg md:text-xl lg:text-2xl font-medium transition-all duration-300 whitespace-nowrap'
								style={{
									background: "transparent",
									border: "none",
									margin: "0",
									outline: "none",
									boxShadow: "none",
								}}
							>
								<span
									className='relative inline-block'
									style={{
										color:
											activeCity === city
												? COLORS.textBlack
												: "#9ca3af",
										fontWeight:
											activeCity === city
												? "bold"
												: "normal",
									}}
								>
									{city}
									<span 
										className={`absolute left-0 -bottom-1 h-0.5 bg-black transition-all duration-300 ease-out ${
											activeCity === city ? 'w-full' : 'w-0 group-hover:w-full'
										}`} 
									/>
								</span>
							</button>
						))}
					</div>
				</div>		</div>

		{/* Centre Count with Navigation */}			<div className='flex justify-end items-center mb-6 sm:mb-8'>
				<div className='flex items-center gap-4'>
							<div className='flex items-center gap-2'>
								<MdLocationOn
									size={24}
									style={{ color: COLORS.brandBlue }}
								/>
								<h3 className='text-sm sm:text-base font-medium'>
									{centreCount} {centreCount === 1 ? 'centre' : 'centres'}
								</h3>
							</div>
							<button
								className='text-sm sm:text-base font-medium transition-colors'
								style={{ color: "#4b5563" }}
								onMouseEnter={(e) =>
									(e.currentTarget.style.color =
										COLORS.textBlack)
								}
								onMouseLeave={(e) =>
									(e.currentTarget.style.color = "#4b5563")
								}
								onClick={() =>
									navigateCityHandler(
										`/city/${activeCity}`,
									)
								}
							>
								View More
							</button>
						</div>
					</div>
					{/* Mobile View - Horizontal Scroll */}			
					{/* Mobile View - Horizontal Scroll */}
					<div className='lg:hidden'>
						<div
							ref={scrollContainerRef}
							onScroll={handleScroll}
							className={`flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-6 ${cityLocations.length === 1 ? 'justify-center' : ''}`}
						>
							{cityLocations.map((location, index) => (
								<div
									key={index}
									className={`snap-start shrink-0 ${cityLocations.length === 1 ? 'w-[85%] sm:w-[70%] max-w-md' : 'w-[85%] sm:w-[70%]'}`}
									onClick={() =>
										handleCenterClick(location.title)
									}
								>
									<div className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer'>
										<div className='relative w-full'>
											<img
												src={location.image}
												alt={location.title}
												className='w-full h-[500px] object-cover'
											/>
											<div className='absolute top-0 left-0 w-full h-full bg-linear-to-t from-black via-transparent to-transparent pointer-events-none' />
											<div className='absolute bottom-4 left-4 sm:bottom-6 sm:left-6 max-w-[80%]'>
												<p
													className='text-white text-sm sm:text-base md:text-lg font-bold leading-tight drop-shadow-lg'
													style={{
														fontFamily:
															"Outfit, Plus Jakarta Sans, sans-serif",
													}}
												>
													{location.title}
												</p>
												<div className='flex items-center gap-1 mt-1'>
													<MdLocationOn
														size={16}
														className='text-white shrink-0'
													/>
													<p
														className='text-white text-sm sm:text-base md:text-lg font-bold leading-tight drop-shadow-lg'
														style={{
															fontFamily:
																"Outfit, Plus Jakarta Sans, sans-serif",
														}}
													>
														{location.name}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Progress Bar - Only visible when scrolling */}
						<div
							className={`w-full h-1 bg-gray-300 rounded-full overflow-hidden mb-8 transition-opacity duration-300 ${showProgressBar ? "opacity-100" : "opacity-0"}`}
						>
							<div
								className='h-full bg-gray-600 transition-all duration-300 ease-out'
								style={{ width: `${scrollProgress || 20}%` }}
							/>
						</div>
					</div>

					{/* Desktop View - Grid with Pagination Arrows */}
					<div className='hidden lg:block relative px-4 sm:px-8 md:px-12'>
						{/* Left Arrow */}
						<button
							onClick={handlePrev}
							disabled={!canGoPrev}
							className={`absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full shadow-lg transition-all duration-200 ${
								canGoPrev
									? "bg-white hover:bg-gray-100 text-gray-700 cursor-pointer"
									: "bg-gray-200 text-gray-400 cursor-not-allowed"
							}`}
							aria-label="Previous"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 19.5L8.25 12l7.5-7.5"
								/>
							</svg>
						</button>

						{/* Right Arrow */}
						<button
							onClick={handleNext}
							disabled={!canGoNext}
							className={`absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full shadow-lg transition-all duration-200 ${
								canGoNext
									? "bg-white hover:bg-gray-100 text-gray-700 cursor-pointer"
									: "bg-gray-200 text-gray-400 cursor-not-allowed"
							}`}
							aria-label="Next"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						</button>

						{/* Location Cards Grid */}
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
							{visibleLocations.map((location, index) => (
								<div
									key={`${activeCity}-${startIndex + index}`}
									className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer'
									onClick={() => handleCenterClick(location.title)}
								>
									<div className='relative w-full'>
										<img
											src={location.image}
											alt={location.title}
											className='w-full h-[500px] object-cover'
										/>
										<div className='absolute top-0 left-0 w-full h-full bg-linear-to-t from-black via-transparent to-transparent pointer-events-none' />
										<div className='absolute bottom-4 left-4 sm:bottom-6 sm:left-6 max-w-[80%]'>
											<p
												className='text-white text-sm sm:text-base md:text-lg font-bold leading-tight drop-shadow-lg'
												style={{
													fontFamily: "Outfit, Plus Jakarta Sans, sans-serif",
												}}
											>
												{location.title}
											</p>
											<div className='flex items-center gap-1 mt-1'>
												<MdLocationOn size={16} className='text-white shrink-0' />
												<p
													className='text-white text-sm sm:text-base md:text-lg font-bold leading-tight drop-shadow-lg'
													style={{
														fontFamily: "Outfit, Plus Jakarta Sans, sans-serif",
													}}
												>
													{location.name}
												</p>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Locations;
