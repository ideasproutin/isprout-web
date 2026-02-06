import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import profileIcon from "../../assets/navbar/profileicon.png";
import search from "../../assets/navbar/search.png";
import ourLocations from "../../content/ourLocations";
import newsData from "../../content/News.json";
import { nearbyLocationsData } from "../../content/nearbyLocations";
import careersData from "../../content/careersData.json";
import aboutUsData from "../../content/aboutus.json";
import faqData from "../../content/faq's.json";
import { useBlogs } from "../../hooks/useBlogs";

// Search data structure
interface SearchItem {
	title: string;
	category: string;
	route: string;
	searchableContent?: string; // Additional content for matching
}

const Navbar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// Fetch blogs from API
	const { data: blogsFromApi = [] } = useBlogs();

	// Animated underline state
	const [underlineStyle, setUnderlineStyle] = useState({
		left: 0,
		width: 0,
		opacity: 0,
	});
	const navItemsRef = useRef<{ [key: string]: HTMLElement | null }>({});

	// Search state
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const searchRef = useRef<HTMLDivElement | null>(null);

	// Build search index from all content using useMemo to recompute when blogs data changes
	const searchIndex: SearchItem[] = useMemo(
		() => [
			// Main Pages
			{
				title: "Home",
				category: "Page",
				route: "/",
			},
			{
				title: "About Us",
				category: "Page",
				route: "/about",
			},
			{
				title: "Managed Office",
				category: "Service",
				route: "/managed",
			},
			{
				title: "Virtual Office",
				category: "Service",
				route: "/virtual-office",
			},
			{
				title: "Meeting Rooms",
				category: "Service",
				route: "/meeting-rooms",
			},
			{
				title: "Coworking Space",
				category: "Service",
				route: "/",
			},
			{
				title: "Our Team",
				category: "Page",
				route: "/ourteam",
			},
			{
				title: "Leadership",
				category: "Page",
				route: "/#visionaries",
			},
			{
				title: "Careers",
				category: "Page",
				route: "/careers",
			},
			{
				title: "Contact Us",
				category: "Page",
				route: "/contactus",
			},
			{
				title: "FAQ",
				category: "Page",
				route: "/faq",
			},
			{
				title: "Testimonials",
				category: "Page",
				route: "/testimonials",
			},
			{
				title: "Blogs",
				category: "Page",
				route: "/blogs",
			},
			{
				title: "News",
				category: "Page",
				route: "/news",
			},
			{
				title: "Awards",
				category: "Page",
				route: "/awards#awards",
			},
			{
				title: "Awards and Achievements",
				category: "Page",
				route: "/awards#awards",
				searchableContent:
					"awards achievements recognition managed office brand outlook business spotlight SIBA times business women leader",
			},
			{
				title: "Meeting Rooms",
				category: "Service",
				route: "/meeting-rooms#meeting-rooms",
			},
			{
				title: "Book Meeting Room",
				category: "Service",
				route: "/meeting-rooms#meeting-rooms",
				searchableContent:
					"meeting rooms book conference rooms hourly booking capacity seating projector whiteboard",
			},
			// Cities
			...ourLocations.map((loc) => ({
				title: loc.city,
				category: "City",
				route: loc.cityRedirect,
			})),
			// Centers with location details
			...ourLocations.flatMap((loc) =>
				loc.centers.map((center) => ({
					title: center.center_name,
					category: "Office",
					route: center.centreRedirect,
				})),
			),
			// Add center locations as searchable terms (e.g., "Gachibowli", "Kondapur")
			...ourLocations.flatMap((loc) =>
				loc.centers.flatMap((center) => {
					const locationParts = center.location
						.split(",")
						.map((part) => part.trim());
					return locationParts.map((locationName) => ({
						title: `${center.center_name} - ${locationName}`,
						category: "Location",
						route: center.centreRedirect,
					}));
				}),
			),
			// Add nearby locations (areas like Gachibowli, etc.)
			...Object.entries(nearbyLocationsData).flatMap(
				([centerKey, categories]) => {
					// Find the matching center
					const center = ourLocations
						.flatMap((loc) => loc.centers)
						.find(
							(c) =>
								c.center_name
									.toLowerCase()
									.replace(/\s+/g, "-") ===
								centerKey.toLowerCase(),
						);

					if (!center) return [];

					// Extract all nearby location names
					const nearbyItems: SearchItem[] = [];
					Object.values(categories).forEach((locations) => {
						if (Array.isArray(locations)) {
							locations.forEach((loc) => {
								nearbyItems.push({
									title: `${center.center_name} near ${loc.name}`,
									category: "Near",
									route: center.centreRedirect,
								});
							});
						}
					});
					return nearbyItems;
				},
			),
			// Blogs - from API with full content
			...(blogsFromApi || []).map((blog: any) => {
				// Strip HTML tags from content for searching
				const stripHtml = (html: string) =>
					html
						?.replace(/<[^>]*>/g, " ")
						.replace(/\s+/g, " ")
						.trim() || "";
				const content = stripHtml(
					blog.content || blog.description || "",
				);

				// Use 'id' field which is what the API returns
				const blogId = blog.id || blog.blog_id;

				return {
					title: blog.heading || blog.title,
					category: "Blog",
					route: `/blogs/${blogId}`,
					searchableContent: `${blog.heading || blog.title} ${content} ${(blog.tags || blog.keywords || []).join(" ")}`,
				};
			}),
			// News with full paragraphs
			...newsData.flatMap((news, index) => {
				const allParagraphs = (news.paragraph || []).join(" ");
				return [
					{
						title: news.title,
						category: "News",
						route: `/news/article/${index + 1}`,
						searchableContent: `${news.title} ${allParagraphs}`,
					},
				];
			}),
			// About Us content
			...aboutUsData.evolution.map((item) => ({
				title: `${item.year} - ${item.title}`,
				category: "About",
				route: "/about#evolution",
				searchableContent: `${item.year} ${item.title} ${item.description} evolution`,
			})),
			{
				title: aboutUsData.missionAndVision.mission.title,
				category: "About",
				route: "/about#mission-vision",
				searchableContent: `Mission ${aboutUsData.missionAndVision.mission.description}`,
			},
			{
				title: aboutUsData.missionAndVision.vision.title,
				category: "About",
				route: "/about#mission-vision",
				searchableContent: `Vision ${aboutUsData.missionAndVision.vision.description}`,
			},
			{
				title: aboutUsData.missionAndVision.values.title,
				category: "About",
				route: "/about#mission-vision",
				searchableContent: `Values ${aboutUsData.missionAndVision.values.description}`,
			},
			...aboutUsData.whoWeAre.map((item) => ({
				title: item.title,
				category: "About",
				route: "/about#who-we-are",
				searchableContent: `${item.title} ${item.description}`,
			})),
			// FAQs
			...faqData.map((faq) => ({
				title: faq.question,
				category: "FAQ",
				route: "/faq",
				searchableContent: `${faq.question} ${faq.answer}`,
			})),
			// Team Members
			{
				title: "Sundari Patibandla - CEO & Co-Founder",
				category: "Team",
				route: "/#visionaries",
			},
			{
				title: "Sreenivas Tirdhala - Co-Founder & CSO",
				category: "Team",
				route: "/#visionaries",
			},
			{
				title: "Vijay Pasupulati - Chief Experience Officer",
				category: "Team",
				route: "/#visionaries",
			},
			{
				title: "Vasumathi Krishnan - Chief Business Officer",
				category: "Team",
				route: "/#visionaries",
			},
			{
				title: "Adhithya Srinivasan - Chief Financial Officer",
				category: "Team",
				route: "/#visionaries",
			},
			// Job Listings with full descriptions
			...careersData.careersData.jobListingsByStep.flatMap((step) =>
				step.jobs.map((job) => ({
					title: job.title,
					category: "Job",
					route: "/careers#jobs",
					searchableContent: `${job.title} ${job.location} ${job.experience} ${job.type} ${job.industry} ${job.qualification} ${job.description} ${(job.keyResponsibilities || []).join(" ")}`,
				})),
			),
			// Generic Jobs search term
			{
				title: "Jobs",
				category: "Careers",
				route: "/careers#jobs",
			},
			{
				title: "All Jobs",
				category: "Careers",
				route: "/careers#jobs",
			},
			{
				title: "Life at iSprout",
				category: "Careers",
				route: "/careers#life-at-isprout",
				searchableContent:
					"life at isprout culture work environment team photos gallery",
			},
			// Virtual Office sections
			{
				title: "Why Virtual Office",
				category: "Service",
				route: "/virtual-office#why-virtual-office",
				searchableContent:
					"why virtual office benefits premium business address mail handling government compliant documentation",
			},
			// Managed Office sections
			{
				title: "Why Managed Office",
				category: "Service",
				route: "/managed#why-managed-office",
				searchableContent:
					"why managed office benefits end to end management scalable flexible premium infrastructure cost savings prime locations",
			},
			// Home page sections
			{
				title: "Why iSprout",
				category: "Page",
				route: "/#why-isprout",
				searchableContent:
					"why isprout flexible solutions collaborative spaces prime locations tailored services",
			},
			{
				title: "Locations",
				category: "Page",
				route: "/#locations",
				searchableContent:
					"locations cities centers offices hyderabad bangalore chennai pune",
			},
		],
		[blogsFromApi],
	); // Recompute when blogs data changes

	const isActive = (path: string) => location.pathname.startsWith(path);

	// Enhanced filter to search through all content
	const searchResults = searchQuery.trim()
		? searchIndex.filter((item) => {
				const query = searchQuery.toLowerCase();
				const titleMatch = item.title.toLowerCase().includes(query);
				const contentMatch = item.searchableContent
					?.toLowerCase()
					.includes(query);
				return titleMatch || contentMatch;
			})
		: [];

	// Handle search item click
	const handleSearchItemClick = (route: string) => {
		if (route.startsWith("http")) {
			window.open(route, "_blank");
		} else if (route.includes("#")) {
			// Handle hash navigation (e.g., /#visionaries)
			const [path, hash] = route.split("#");
			navigate(path || "/");
			// Scroll to the section after a short delay to ensure page loads
			setTimeout(() => {
				const element = document.getElementById(hash);
				if (element) {
					element.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});
				}
			}, 100);
		} else {
			navigate(route);
		}
		setIsSearchOpen(false);
		setSearchQuery("");
	};

	// Close search on click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
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
					opacity: 1,
				});
			}
		} else {
			setUnderlineStyle((prev) => ({ ...prev, opacity: 0 }));
		}
	};

	return (
		<nav
			className='fixed top-0 left-0 w-full h-10 sm:h-10 md:h-10 mb-0 z-50 max-w-full'
			style={{ backgroundColor: "#00275c" }}
		>
			<div className='relative w-full h-full flex items-center justify-between md:justify-end px-2 sm:px-4 md:px-6'>
				{/* Navigation links */}
				<div
					className='flex items-center gap-6 sm:gap-9 md:gap-8 lg:gap-6 xl:gap-8 relative px-3 sm:px-0 mx-auto md:mx-0 mr-1 sm:mr-8 lg:mr-22'
					style={{ fontFamily: "Outfit, sans-serif" }}
				>
					<Link
						to='/blogs'
						ref={(el) => {
							navItemsRef.current["blogs"] = el;
						}}
						onMouseEnter={() => handleNavItemHover("blogs")}
						onMouseLeave={() => handleNavItemHover(null)}
						className={`text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap ${
							isActive("/blogs") ? "border-b-2 border-white" : ""
						}`}
					>
						Blogs
					</Link>
					<Link
						to='/awards'
						ref={(el) => {
							navItemsRef.current["awards"] = el;
						}}
						onMouseEnter={() => handleNavItemHover("awards")}
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
						ref={(el) => {
							navItemsRef.current["careers"] = el;
						}}
						onMouseEnter={() => handleNavItemHover("careers")}
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
						ref={(el) => {
							navItemsRef.current["about"] = el;
						}}
						onMouseEnter={() => handleNavItemHover("about")}
						onMouseLeave={() => handleNavItemHover(null)}
						className={`text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap ${
							isActive("/about") ? "border-b-2 border-white" : ""
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
							backgroundColor: "#ffffff",
						}}
					/>
				</div>

				{/* Search icon */}
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
										onChange={(e) =>
											setSearchQuery(e.target.value)
										}
										className='w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
										autoFocus
									/>
								</div>

								{/* Search Results */}
								<div
									className='overflow-y-auto'
									style={{ maxHeight: "calc(70vh - 80px)" }}
								>
									{searchQuery.trim() === "" ? (
										<div
											className='p-6 text-center text-gray-400'
											style={{
												fontFamily:
													"Outfit, sans-serif",
											}}
										>
											No results found.
										</div>
									) : searchResults.length === 0 ? (
										<div
											className='p-6 text-center text-gray-400'
											style={{
												fontFamily:
													"Outfit, sans-serif",
											}}
										>
											No results found.
										</div>
									) : (
										<div className='p-2'>
											{searchResults.map(
												(item, index) => (
													<div
														key={index}
														className='flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors'
														onClick={() =>
															handleSearchItemClick(
																item.route,
															)
														}
													>
														<span
															className='text-sm text-gray-800 flex-1'
															style={{
																fontFamily:
																	"Outfit, sans-serif",
															}}
														>
															{item.title}
														</span>
														<span
															className='px-3 py-1 rounded-full text-xs font-semibold ml-2 whitespace-nowrap'
															style={{
																backgroundColor:
																	"#FFDE00",
																color: "#00275c",
																fontFamily:
																	"Outfit, sans-serif",
															}}
														>
															{item.category}
														</span>
													</div>
												),
											)}
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
