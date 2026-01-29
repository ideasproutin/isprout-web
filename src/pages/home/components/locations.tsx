import React, { useState, useEffect } from "react";
import { homePageImages } from "../../../assets";
import { locationImages } from "../../../assets";
import { COLORS } from "../../../helpers/constants/Colors";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowUp, MdLocationOn } from "react-icons/md";

interface LocationCard {
	image: string;
	name: string;
	title: string;
}

const Locations: React.FC = () => {
	const [activeCity, setActiveCity] = useState("Hyderabad");
	const [currentPage, setCurrentPage] = useState<Record<string, number>>({});
	const [showScrollButton, setShowScrollButton] = useState(false);
	const navigate = useNavigate();

	const cities = [
		"Hyderabad",
		"Bengaluru",
		"Pune",
		"Chennai",
		"Vijayawada",
		"Vizag",
		"Gurugram",
		"Kolkata",
		"Ahmedabad",
	];

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
				title: "My Home Twiza",
			},
			{
				image: locationImages.jayabheriLobby,
				name: "Kondapur, Gachibowli, Hyderabad",
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
		Vizag: [
			{
				image: locationImages.godrejLobby,
				name: "Visakhapatnam, Andhra Pradesh",
				title: "Vizag Center",
			},
		],
	};

	const cityLocations = locationsByCity[activeCity] || [];
	const centreCount = cityLocations.length;

	// Pagination logic
	const cardsPerPage = 3;
	const currentCityPage = currentPage[activeCity] || 0;
	const startIndex = currentCityPage * cardsPerPage;
	const visibleLocations = cityLocations.slice(
		startIndex,
		startIndex + cardsPerPage,
	);
	const totalPages = Math.ceil(cityLocations.length / cardsPerPage);
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

	const navigateCityHandler = (location: string) => {
		navigate(location);
		window.scrollTo(0, 0);
	};

	// Scroll to top functionality
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setShowScrollButton(true);
			} else {
				setShowScrollButton(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<section
			id='locations-section'
			className='relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden'
			style={{ fontFamily: "Outfit, sans-serif" }}
		>
			<div className='max-w-7xl mx-auto relative z-10'>
				{/* Heading */}
				<div className='flex justify-center mb-8 sm:mb-10 md:mb-12'>
					<h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center max-w-5xl px-4'>
						Inspiring{" "}
						<span
							style={{
								fontFamily: "Otomanopee One, sans-serif",
								color: "#FFDE00",
							}}
						>
							Workspaces
						</span>{" "}
						for Visionary Teams
					</h2>
				</div>

				{/* City Tabs */}
				<div
					className='flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8'
					style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
				>
					{cities.map((city) => (
						<button
							key={city}
							onClick={() => setActiveCity(city)}
							style={{
								background: "transparent",
								border: "none",
								padding: "8px 12px",
								margin: "0",
								outline: "none",
								boxShadow: "none",
							}}
							className={`text-lg sm:text-xl md:text-2xl font-medium transition-all duration-300`}
						>
							<span
								style={{
									color:
										activeCity === city
											? COLORS.textBlack
											: "#9ca3af",
									fontWeight:
										activeCity === city ? "bold" : "medium",
									textDecoration:
										activeCity === city
											? "underline"
											: "none",
									textDecorationThickness: "2px",
									textUnderlineOffset: "4px",
								}}
							>
								{city}
							</span>
						</button>
					))}
				</div>

				{/* Centre Count with Navigation */}
				<div className='flex justify-end items-center mb-6 sm:mb-8'>
					<div className='flex items-center gap-4'>
						<div className='flex items-center gap-2'>
							<MdLocationOn
								size={28}
								style={{ color: COLORS.brandBlue }}
							/>
							<h3 className='text-lg sm:text-xl md:text-2xl font-bold'>
								{centreCount} centres
							</h3>
						</div>
						<button
							className='text-sm sm:text-base font-medium transition-colors'
							style={{ color: "#4b5563" }}
							onMouseEnter={(e) =>
								(e.currentTarget.style.color = COLORS.textBlack)
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.color = "#4b5563")
							}
							onClick={() =>
								navigateCityHandler(
									`/city/${activeCity.toLowerCase()}`,
								)
							}
						>
							View More
						</button>
					</div>
				</div>

				{/* Location Cards Carousel with Side Arrows */}
				<div className='relative px-4 sm:px-8 md:px-12'>
					{/* Left Arrow */}
					{totalPages > 1 && (
						<button
							onClick={handlePrev}
							disabled={!canGoPrev}
							className={`absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full shadow-lg transition-all duration-200 ${
								canGoPrev
									? "bg-white hover:bg-gray-100 text-gray-700 cursor-pointer"
									: "bg-gray-200 text-gray-400 cursor-not-allowed"
							}`}
							aria-label='Previous'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={2.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15.75 19.5L8.25 12l7.5-7.5'
								/>
							</svg>
						</button>
					)}

					{/* Right Arrow */}
					{totalPages > 1 && (
						<button
							onClick={handleNext}
							disabled={!canGoNext}
							className={`absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full shadow-lg transition-all duration-200 ${
								canGoNext
									? "bg-white hover:bg-gray-100 text-gray-700 cursor-pointer"
									: "bg-gray-200 text-gray-400 cursor-not-allowed"
							}`}
							aria-label='Next'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={2.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M8.25 4.5l7.5 7.5-7.5 7.5'
								/>
							</svg>
						</button>
					)}

					{/* Location Cards Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
						{visibleLocations.map((location, index) => {
							const actualIndex = startIndex + index;
							const shouldAddBorder =
								activeCity === "Hyderabad"
									? actualIndex >= 3
									: [
											"Bengaluru",
											"Pune",
											"Chennai",
											"Vijayawada",
											"Vizag",
											"Kolkata",
											"Ahmedabad",
											"Gurugram",
										].includes(activeCity);

							return (
								<div
									key={actualIndex}
									className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'
									style={
										shouldAddBorder
											? { border: "5px solid #FFDE00" }
											: {}
									}
								>
									<div className='relative w-full'>
										<img
											src={location.image}
											alt={location.title}
											className={`w-full object-cover ${activeCity === "Hyderabad" || activeCity === "Bengaluru" || activeCity === "Pune" || activeCity === "Chennai" || activeCity === "Vijayawada" || activeCity === "Vizag" || activeCity === "Kolkata" || activeCity === "Ahmedabad" || activeCity === "Gurugram" ? "h-[500px]" : "h-auto"}`}
										/>

										<div className='absolute top-0 left-0 w-full h-full bg-linear-to-t from-black via-transparent to-transparent pointer-events-none' />

										<div className='absolute bottom-4 left-4 sm:bottom-6 sm:left-6 max-w-[80%]'>
											<p
												className='text-white text-sm sm:text-base md:text-lg font-bold leading-tight drop-shadow-lg'
												style={{
													fontFamily:
														"Plus Jakarta Sans, sans-serif",
												}}
											>
												{location.title}
												<br />
												{location.name}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Scroll to Top Button */}
			{showScrollButton && (
				<button
					onClick={scrollToTop}
					className='fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110'
					style={{
						backgroundColor: "#FFDE00",
						border: "none",
						cursor: "pointer",
					}}
					aria-label='Scroll to top'
				>
					<MdKeyboardArrowUp size={28} color='#000' />
				</button>
			)}
		</section>
	);
};

export default Locations;
