import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import profileIcon from "../../assets/navbar/profileicon.png";
import search from "../../assets/navbar/search.png";
import ourLocations from "../../content/ourLocations";

// Search data structure
interface SearchItem {
	title: string;
	category: string;
	route: string;
}

const Navbar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	
	// Animated underline state
	const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
	const navItemsRef = useRef<{ [key: string]: HTMLElement | null }>({});
	
	// Search state
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const searchRef = useRef<HTMLDivElement | null>(null);

	// Build search index from all content
	const searchIndex: SearchItem[] = [
		// Cities
		...ourLocations.map(loc => ({
			title: loc.city,
			category: "City",
			route: loc.cityRedirect
		})),
		// Centers
		...ourLocations.flatMap(loc => 
			loc.centers.map(center => ({
				title: center.center_name,
				category: "Office",
				route: center.centreRedirect
			}))
		),
		// Blogs
		{
			title: "Flyers Club",
			category: "Office",
			route: "https://flyersclub.isprout.in/"
		},
		{
			title: "Benz Circle",
			category: "Office",
			route: "/centre/benz-circle"
		},
		{
			title: "Javabheri Trendset Connect",
			category: "Office",
			route: "/centre/jayabheri-trendset"
		},
		{
			title: "Chennai",
			category: "City",
			route: "/city/chennai"
		},
		{
			title: "Hyderabad's Best Co-Working Spaces for the Cool & Creative",
			category: "Blogs",
			route: "/blogs"
		},
		{
			title: "How Coworking Can Help Businesses Reduce Costs",
			category: "Blogs",
			route: "/blogs"
		},
		{
			title: "Top 4 Strategies to Protect Your Company Culture in a Coworking Space",
			category: "Blogs",
			route: "/blogs"
		},
		{
			title: "How can co-working spaces help small businesses operate hassle-free?",
			category: "Blogs",
			route: "/blogs"
		},
		{
			title: "How Co-working Spaces Can Impact the Real Estate Industry?",
			category: "Blogs",
			route: "/blogs"
		},
	];

	const isActive = (path: string) => location.pathname.startsWith(path);
	
	// Filter search results
	const searchResults = searchQuery.trim()
		? searchIndex.filter(item =>
			item.title.toLowerCase().includes(searchQuery.toLowerCase())
		)
		: [];
	
	// Handle search item click
	const handleSearchItemClick = (route: string) => {
		if (route.startsWith("http")) {
			window.open(route, "_blank");
		} else {
			navigate(route);
		}
		setIsSearchOpen(false);
		setSearchQuery("");
	};
	
	// Close search on click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
				setIsSearchOpen(false);
			}
		};

		if (isSearchOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isSearchOpen]);
	
	// Close search on Esc key
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isSearchOpen) {
				setIsSearchOpen(false);
				setSearchQuery("");
			}
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, [isSearchOpen]);
	
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

	return (
		<nav
			className='sticky top-0 w-full h-10 sm:h-10 md:h-10 mb-0 overflow-x-auto z-100'
			style={{ backgroundColor: "#00275c" }}
		>
			<div className='relative w-full h-full flex items-center justify-end px-2 sm:px-4 md:px-6 min-w-max'>
				{/* Navigation links */}
				<div
					className='flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 mr-1 sm:mr-4 lg:mr-22 relative'
					style={{ fontFamily: "Outfit, sans-serif" }}
				>
					<Link
						to='/blogs'
						ref={el => { navItemsRef.current['blogs'] = el; }}
						onMouseEnter={() => handleNavItemHover('blogs')}
						onMouseLeave={() => handleNavItemHover(null)}
						className={`text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap ${
							isActive("/blogs") ? "border-b-2 border-white" : ""
						}`}
					>
						Blogs
					</Link>
					<Link
						to='/awards'
						ref={el => { navItemsRef.current['awards'] = el; }}
						onMouseEnter={() => handleNavItemHover('awards')}
						onMouseLeave={() => handleNavItemHover(null)}
						className={`text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap ${
							isActive("/awards") ? "border-b-2 border-white" : ""
						}`}
					>
						Awards
					</Link>
					{/* <Link
						to='/spotlight'
						ref={el => { navItemsRef.current['spotlight'] = el; }}
						onMouseEnter={() => handleNavItemHover('spotlight')}
						onMouseLeave={() => handleNavItemHover(null)}
						className={`text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap ${
							isActive("/spotlight")
								? "border-b-2 border-white"
								: ""
						}`}
					>
						Spotlight
					</Link> */}
					<Link
						to='/careers'
						ref={el => { navItemsRef.current['careers'] = el; }}
						onMouseEnter={() => handleNavItemHover('careers')}
						onMouseLeave={() => handleNavItemHover(null)}
						className={`text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap ${
							isActive("/careers")
								? "border-b-2 border-white"
								: ""
						}`}
					>
						Careers
					</Link>
					<Link
						to='/about'
						ref={el => { navItemsRef.current['about'] = el; }}
						onMouseEnter={() => handleNavItemHover('about')}
						onMouseLeave={() => handleNavItemHover(null)}
						className={`text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap ${
							isActive("/about")
								? "border-b-2 border-white"
								: ""
						}`}
					>
						About Us
					</Link>
					
					{/* Animated underline */}
					<div
						className='absolute bottom-0 h-0.5 transition-all duration-300 ease-out'
						style={{
							left: `${underlineStyle.left}px`,
							width: `${underlineStyle.width}px`,
							opacity: underlineStyle.opacity,
							backgroundColor: '#ffffff'
						}}
					/>
				</div>

				{/* Right side icons */}
				<div className='flex items-center gap-2 sm:gap-4 mr-3 sm:mr-4'>
					<div className='relative' ref={searchRef}>
						<img
							src={search}
							alt='Search'
							className='cursor-pointer w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 mr-2'
							onClick={() => setIsSearchOpen(!isSearchOpen)}
						/>
						
						{/* Search Dropdown */}
						{isSearchOpen && (
							<div 
								className='fixed right-4 top-12 w-[90vw] sm:w-96 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden z-10000'
								style={{ maxHeight: "70vh" }}
							>
								{/* Search Input */}
								<div className='p-4 border-b border-gray-200'>
									<input
										type='text'
										placeholder='Search'
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className='w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00275c]'
										style={{ fontFamily: "Outfit, sans-serif" }}
										autoFocus
									/>
								</div>
								
								{/* Search Results */}
								<div className='overflow-y-auto' style={{ maxHeight: "calc(70vh - 80px)" }}>
									{searchQuery.trim() === "" ? (
										<div className='p-6 text-center text-gray-400' style={{ fontFamily: "Outfit, sans-serif" }}>
											No results found.
										</div>
									) : searchResults.length === 0 ? (
										<div className='p-6 text-center text-gray-400' style={{ fontFamily: "Outfit, sans-serif" }}>
											No results found.
										</div>
									) : (
										<div className='p-2'>
											{searchResults.map((item, index) => (
												<div
													key={index}
													className='flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors'
													onClick={() => handleSearchItemClick(item.route)}
												>
													<span 
														className='text-sm text-gray-800 flex-1'
														style={{ fontFamily: "Outfit, sans-serif" }}
													>
														{item.title}
													</span>
													<span 
														className='px-3 py-1 rounded-full text-xs font-semibold ml-2 whitespace-nowrap'
														style={{ 
															backgroundColor: "#FFDE00",
															color: "#00275c",
															fontFamily: "Outfit, sans-serif"
														}}
													>
														{item.category}
													</span>
												</div>
											))}
										</div>
									)}
								</div>
							</div>
						)}
					</div>
					{/* <img
						src={profileIcon}
						alt='Profile'
						className='cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-6 lg:h-6'
					/> */}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
