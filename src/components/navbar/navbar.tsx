import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import profileIcon from "../../assets/navbar/profileicon.png";
import search from "../../assets/navbar/search.png";
import { nearbyLocationsData } from "../../content/nearbyLocations";
import { useCityCenters } from "../../hooks/useCityCentre";
import { useBlogs } from "../../hooks/useBlogs";
import { useNews } from "../../hooks/useNews";
import { useAboutUs } from "../../hooks/useAboutUs";
import { useFaqs } from "../../hooks/useFAQ";
import { useCareers } from "../../hooks/useCareers";
// Search data structure
interface SearchItem {
	title: string;
	category: string;
	route: string;
	location?: string; // Location information to display
	searchableContent?: string; // Additional content for matching
}

const Navbar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// Search state
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const searchRef = useRef<HTMLDivElement | null>(null);

	// Fetch data using hooks
	const { data: blogsFromApi } = useBlogs();
	const { data: newsData } = useNews();
	const { data: aboutUsData } = useAboutUs();
	const { data: faqData } = useFaqs();
	const { data: careersData } = useCareers();
	const { data: cityCentersData = [] } = useCityCenters();

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
				title: "Managed Offices",
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
				route: "/teams",
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
				route: "/contact",
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
			...cityCentersData.map((city: any) => ({
				title: city.name,
				category: "City",
				route: city.cityRedirect,
				searchableContent: `${city.name} ${city.centers.map((c: any) => c.name + " " + c.shortAddress).join(" ")} coworking office workspace city location`,
			})),
			// Centers with location details
			...cityCentersData.flatMap((city: any) =>
				city.centers.map((center: any) => {
					// Get nearby locations for this center to make them searchable
					const centerKey = center.name
						.toLowerCase()
						.replace(/\s+/g, "-");
					const nearbyLocs = nearbyLocationsData[centerKey];
					let nearbyNames = "";
					if (nearbyLocs) {
						Object.values(nearbyLocs).forEach((locations) => {
							if (Array.isArray(locations)) {
								nearbyNames +=
									" " +
									locations.map((l) => l.name).join(" ");
							}
						});
					}
					return {
						title: center.name,
						category: "Office",
						route: center.explore,
						location: `${center.shortAddress}, ${city.name}`,
						searchableContent: `${center.name} ${center.shortAddress} ${city.name}${nearbyNames} coworking office workspace center`,
					};
				}),
			),
			// Add center locations as searchable terms (e.g., "Gachibowli", "Kondapur")
			...cityCentersData.flatMap((city: any) =>
				city.centers.flatMap((center: any) => {
					const locationParts = center.shortAddress
						.split(",")
						.map((part: string) => part.trim());
					// Get all other centers in the same city for cross-referencing
					const otherCenters = city.centers
						.filter((c: any) => c.name !== center.name)
						.map((c: any) => c.name)
						.join(" ");
					return locationParts.map((locationName: string) => ({
						title: `${locationName} - ${center.name}`,
						category: "Location",
						route: center.explore,
						searchableContent: `${locationName} ${center.name} ${city.name} ${center.shortAddress} ${otherCenters} office center location coworking workspace near area`,
					}));
				}),
			),
			// Add nearby locations (areas like Gachibowli, etc.)
			...Object.entries(nearbyLocationsData).flatMap(
				([centerKey, categories]) => {
					// Find the matching center
					const center = cityCentersData
						.flatMap((city: any) => city.centers)
						.find(
							(c: any) =>
								c.name.toLowerCase().replace(/\s+/g, "-") ===
								centerKey.toLowerCase(),
						);

					if (!center) return [];

					// Extract all nearby location names
					const nearbyItems: SearchItem[] = [];
					Object.values(categories).forEach((locations) => {
						if (Array.isArray(locations)) {
							locations.forEach((loc) => {
								nearbyItems.push({
									title: `${loc.name} - ${center.name}`,
									category: "Near",
									route: center.explore,
									searchableContent: `${loc.name} ${center.name} near nearby location area office workspace coworking center`,
								});
							});
						}
					});
					return nearbyItems;
				},
			),
			// Create aggregated location entries (e.g., "Gachibowli" shows all centers in/near Gachibowli)
			...(() => {
				const locationMap = new Map<
					string,
					Set<{ center: string; route: string }>
				>();

				// Collect all location names and their centers
				cityCentersData.forEach((city: any) => {
					city.centers.forEach((center: any) => {
						const locationParts = center.shortAddress
							.split(",")
							.map((part: string) => part.trim());
						locationParts.forEach((locationName: string) => {
							if (!locationMap.has(locationName.toLowerCase())) {
								locationMap.set(
									locationName.toLowerCase(),
									new Set(),
								);
							}
							locationMap.get(locationName.toLowerCase())?.add({
								center: center.name,
								route: center.explore,
							});
						});

						// Add nearby locations
						const centerKey = center.name
							.toLowerCase()
							.replace(/\s+/g, "-");
						const nearbyLocs = nearbyLocationsData[centerKey];
						if (nearbyLocs) {
							Object.values(nearbyLocs).forEach((locations) => {
								if (Array.isArray(locations)) {
									locations.forEach((nearbyLoc) => {
										const locName =
											nearbyLoc.name.toLowerCase();
										if (!locationMap.has(locName)) {
											locationMap.set(locName, new Set());
										}
										locationMap.get(locName)?.add({
											center: center.name,
											route: center.explore,
										});
									});
								}
							});
						}
					});
				});

				// Create search entries for each location
				const locationEntries: SearchItem[] = [];
				locationMap.forEach((centers, locationName) => {
					const centerNames = Array.from(centers)
						.map((c) => c.center)
						.join(", ");
					const firstCenter = Array.from(centers)[0];
					if (centers.size > 0) {
						locationEntries.push({
							title: `${locationName.charAt(0).toUpperCase() + locationName.slice(1)} Area`,
							category: "Area",
							route: firstCenter.route,
							searchableContent: `${locationName} ${centerNames} area location coworking office workspace centers`,
						});
					}
				});

				return locationEntries;
			})(),
			// Blogs - from API with full content
			...(blogsFromApi || []).map(
				(blog: {
					title: string;
					slug: string;
					image: string;
					content?: string;
					description?: string;
					id?: string;
					blog_id?: string;
					heading?: string;
					tags?: string[];
					keywords?: string[];
				}) => {
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
				},
			),
			// News with full paragraphs
			...(newsData || []).flatMap(
				(
					news: {
						title: string;
						slug: string;
						head_image: string;
						paragraph?: string[];
					},
					index: number,
				) => {
					const allParagraphs = (news.paragraph || []).join(" ");
					return [
						{
							title: news.title,
							category: "News",
							route: `/news/article/${index + 1}`,
							searchableContent: `${news.title} ${allParagraphs}`,
						},
					];
				},
			),
			// About Us content
			...(aboutUsData?.evolution || []).map(
				(item: {
					title: string;
					subtitle?: string;
					year?: string;
					description?: string;
				}) => ({
					title: `${item.year} - ${item.title}`,
					category: "About",
					route: "/about#evolution",
					searchableContent: `${item.year} ${item.title} ${item.description} evolution`,
				}),
			),
			{
				title:
					aboutUsData?.missionAndVision?.mission?.title || "Mission",
				category: "About",
				route: "/about#mission-vision",
				searchableContent: `Mission ${aboutUsData?.missionAndVision?.mission?.description || ""}`,
			},
			{
				title: aboutUsData?.missionAndVision?.vision?.title || "Vision",
				category: "About",
				route: "/about#mission-vision",
				searchableContent: `Vision ${aboutUsData?.missionAndVision?.vision?.description || ""}`,
			},
			{
				title: aboutUsData?.missionAndVision?.values?.title || "Values",
				category: "About",
				route: "/about#mission-vision",
				searchableContent: `Values ${aboutUsData?.missionAndVision?.values?.description || ""}`,
			},
			...(aboutUsData?.whoWeAre || []).map(
				(item: { title: string; description?: string }) => ({
					title: item.title,
					category: "About",
					route: "/about#who-we-are",
					searchableContent: `${item.title} ${item.description}`,
				}),
			),
			// FAQs
			...(faqData || []).map(
				(faq: { question: string; answer: string }) => ({
					title: faq.question,
					category: "FAQ",
					route: "/faq",
					searchableContent: `${faq.question} ${faq.answer}`,
				}),
			),
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
			...(careersData?.careersData?.jobListingsByStep || []).flatMap(
				(step: {
					jobs: Array<{
						title: string;
						location: string;
						slug: string;
						experience?: string;
						type?: string;
						industry?: string;
						qualification?: string;
						description?: string;
						keyResponsibilities?: string[];
					}>;
				}) =>
					step.jobs.map(
						(job: {
							title: string;
							location: string;
							slug: string;
							experience?: string;
							type?: string;
							industry?: string;
							qualification?: string;
							description?: string;
							keyResponsibilities?: string[];
						}) => ({
							title: job.title,
							category: "Job",
							route: "/careers#jobs",
							searchableContent: `${job.title} ${job.location} ${job.experience} ${job.type} ${job.industry} ${job.qualification} ${job.description} ${(job.keyResponsibilities || []).join(" ")}`,
						}),
					),
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
		[blogsFromApi, newsData, aboutUsData, faqData, careersData],
	);
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
			// Handle hash navigation (e.g., /about#evolution)
			const [path, hash] = route.split("#");
			const currentPath = location.pathname;

			// If already on the target page, just scroll
			if (currentPath === (path || "/")) {
				const element = document.getElementById(hash);
				if (element) {
					element.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});
				}
			} else {
				// Navigate to the page first, then scroll
				navigate(path || "/");
				// Use a longer delay and retry mechanism to ensure page loads
				let attempts = 0;
				const scrollInterval = setInterval(() => {
					const element = document.getElementById(hash);
					if (element) {
						element.scrollIntoView({
							behavior: "smooth",
							block: "start",
						});
						clearInterval(scrollInterval);
					}
					attempts++;
					if (attempts > 20) clearInterval(scrollInterval); // Stop after 2 seconds
				}, 100);
			}
		} else {
			navigate(route);
			// Scroll to top when navigating to a page without hash
			window.scrollTo({ top: 0, behavior: "smooth" });
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

	return (
		<nav
			className='fixed top-0 left-0 w-full h-10 sm:h-10 md:h-10 mb-0 z-50 max-w-full'
			style={{ backgroundColor: "#00275c", color: "white" }}
		>
			<div className='relative w-full h-full flex items-center justify-between md:justify-end px-2 sm:px-4 md:px-6'>
				{/* Navigation links */}
				<div
					className='flex items-center gap-6 sm:gap-9 md:gap-6 lg:gap-6 xl:gap-8 px-3 sm:px-0 mx-auto md:mx-0 md:mr-6 lg:mr-8 xl:mr-22'
					style={{ fontFamily: "Outfit, sans-serif" }}
				>
					<Link
						to='/blogs'
						className='group hidden sm:inline-block text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-white! whitespace-nowrap relative'
					>
						Blogs
						<span
							className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ease-out ${isActive("/blogs") ? "w-full" : "w-0 group-hover:w-full"}`}
						/>
					</Link>
					<Link
						to='/awards'
						className='group text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-white! whitespace-nowrap relative'
					>
						Awards
						<span
							className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ease-out ${isActive("/awards") ? "w-full" : "w-0 group-hover:w-full"}`}
						/>
					</Link>
					<Link
						to='/careers'
						className='group text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-white! whitespace-nowrap relative'
					>
						Careers
						<span
							className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ease-out ${isActive("/careers") ? "w-full" : "w-0 group-hover:w-full"}`}
						/>
					</Link>
					<Link
						to='/about'
						className='group text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-white! whitespace-nowrap relative'
					>
						About Us
						<span
							className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ease-out ${isActive("/about") ? "w-full" : "w-0 group-hover:w-full"}`}
						/>
					</Link>
					<Link
						to='/contact'
						className='group text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-white! whitespace-nowrap relative'
					>
						Contact Us
						<span
							className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ease-out ${isActive("/contact") ? "w-full" : "w-0 group-hover:w-full"}`}
						/>
					</Link>
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
										className='w-full px-4 py-2 text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue'
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
									{searchResults.length === 0 ? (
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
														<div className='flex-1'>
															<span
																className='text-sm text-gray-800 block'
																style={{
																	fontFamily:
																		"Outfit, sans-serif",
																}}
															>
																{item.title}
															</span>
															{item.location && (
																<span
																	className='text-xs text-gray-500 block mt-1'
																	style={{
																		fontFamily:
																			"Outfit, sans-serif",
																	}}
																>
																	{
																		item.location
																	}
																</span>
															)}
														</div>
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
