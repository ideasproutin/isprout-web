import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../helpers/constants/Colors";

interface BlogIndex {
	id: string;
	image_url: string;
	heading: string;
	tags?: unknown[];
	date: string;
	meta_data?: string;
	[key: string]: unknown; // Allow any additional fields from API
}

interface RecentPostsProps {
	blogs: BlogIndex[];
	currentBlogId?: string;
	animated?: boolean;
	animationVisible?: boolean;
	showHeading?: boolean;
	backgroundColor?: string;
	sortByDate?: boolean;
	maxPosts?: number; // Add option to control number of posts shown
}

const RecentPosts = ({ blogs, currentBlogId, animated = false, animationVisible = true, showHeading = true, backgroundColor, sortByDate = false, maxPosts = 3 }: RecentPostsProps) => {
	const navigate = useNavigate();
	const [scrollProgress, setScrollProgress] = useState(0);
	const [showProgressBar, setShowProgressBar] = useState(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const scrollTimeoutRef = useRef<number | null>(null);

	const handleScroll = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
			const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
			setScrollProgress(progress);
			setShowProgressBar(true);

			// Clear existing timeout
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
			}

			// Hide progress bar after 1.5 seconds of no scrolling
			scrollTimeoutRef.current = setTimeout(() => {
				setShowProgressBar(false);
			}, 1500);
		}
	};

	useEffect(() => {
		return () => {
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
			}
		};
	}, []);

	// Logic for recent posts
	let recentBlogs: BlogIndex[];
	
	// Return early if blogs array is empty
	if (!blogs || blogs.length === 0) {
		return null;
	}
	
	if (currentBlogId) {
		// For blog detail pages - show other blogs excluding current one
		recentBlogs = blogs
			.filter((blog) => blog && blog.id !== currentBlogId)
			.slice(0, maxPosts);
	} else {
		// For blog intro page or homepage - show first N blogs
		if (sortByDate) {
			// Sort by date (most recent first)
			const sortedBlogs = [...blogs].sort((a, b) => {
				const dateA = new Date(a.date).getTime();
				const dateB = new Date(b.date).getTime();
				return dateB - dateA;
			});
			recentBlogs = sortedBlogs.slice(0, maxPosts);
		} else {
			recentBlogs = blogs.slice(0, maxPosts);
		}
	}

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
				className='py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-16'
				style={{ backgroundColor: backgroundColor || COLORS.backgroundCream }}
			>
				<div className='max-w-7xl mx-auto'>
					{showHeading && (
						<h2
							className='text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 md:mb-12 text-center'
							style={{
								fontFamily: "Outfit, sans-serif",
								color: COLORS.brandBlue,
							}}
						>
							RECENT POSTS
						</h2>
					)}

					{/* Mobile View - Horizontal Scroll */}
					<div className='lg:hidden'>
						<div
							ref={scrollContainerRef}
							onScroll={handleScroll}
							className='flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-6'
						>
							{recentBlogs.map((blog) => (
								<div
									key={blog.id}
									className={`snap-start shrink-0 w-[85%] sm:w-[45%] ${animated ? `recent-card ${animationVisible ? 'visible' : ''}` : ''}`}
								>
									<div
										className='rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow h-full'
										style={{ backgroundColor: COLORS.white }}
									>
										<div className='relative'>
											<img
												src={blog.image_url}
												alt={blog.heading}
												className='w-full h-48 sm:h-56 md:h-64 object-cover'
											/>
										</div>
										<div className='p-4 sm:p-5 md:p-6 bg-gray-50'>
											<p
												className='text-xs sm:text-sm mb-2 sm:mb-3'
												style={{
													fontFamily: "Outfit, sans-serif",
													color: COLORS.textGray,
												}}
											>
												{blog.date}
											</p>
											<h3
												className='text-base sm:text-lg font-semibold mb-3 sm:mb-4'
												style={{
													fontFamily: "Outfit, sans-serif",
													color: COLORS.brandBlue,
												}}
											>
												{blog.heading}
											</h3>
											<button
												className='px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors'
												style={{
													backgroundColor: COLORS.brandYellow,
													color: COLORS.brandBlue,
													fontFamily: "Outfit, sans-serif",
												}}
												onClick={() => navigate(`/blogs/${blog.id}`)}
												onMouseEnter={(e) =>
													(e.currentTarget.style.backgroundColor =
														COLORS.brandYellowDark)
												}
												onMouseLeave={(e) =>
													(e.currentTarget.style.backgroundColor =
														COLORS.brandYellow)
												}
											>
												Read More →
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
						
						{/* Progress Bar - Only visible when scrolling */}
						<div className={`w-full h-1 bg-gray-300 rounded-full overflow-hidden mb-8 transition-opacity duration-300 ${showProgressBar ? 'opacity-100' : 'opacity-0'}`}>
							<div
								className='h-full bg-gray-600 transition-all duration-300 ease-out'
								style={{ width: `${scrollProgress || 20}%` }}
							/>
						</div>
					</div>

					{/* Desktop View - Grid Layout */}
					<div className='hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
						{recentBlogs.map((blog) => (
							<div
								key={blog.id}
								className={`rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow ${animated ? `recent-card ${animationVisible ? 'visible' : ''}` : ''}`}
								style={{ backgroundColor: COLORS.white }}
							>
								<div className='relative'>
									<img
										src={blog.image_url}
										alt={blog.heading}
										className='w-full h-48 sm:h-56 md:h-64 object-cover'
									/>
								</div>
								<div className='p-4 sm:p-5 md:p-6 bg-gray-50'>
									<p
										className='text-xs sm:text-sm mb-2 sm:mb-3'
										style={{
											fontFamily: "Outfit, sans-serif",
											color: COLORS.textGray,
										}}
									>
										{blog.date}
									</p>
									<h3
										className='text-base sm:text-lg font-semibold mb-3 sm:mb-4'
										style={{
											fontFamily: "Outfit, sans-serif",
											color: COLORS.brandBlue,
										}}
									>
										{blog.heading}
									</h3>
									<button
										className='px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors'
										style={{
											backgroundColor: COLORS.brandYellow,
											color: COLORS.brandBlue,
											fontFamily: "Outfit, sans-serif",
										}}
										onClick={() => navigate(`/blogs/${blog.id}`)}
										onMouseEnter={(e) =>
											(e.currentTarget.style.backgroundColor =
												COLORS.brandYellowDark)
										}
										onMouseLeave={(e) =>
											(e.currentTarget.style.backgroundColor =
												COLORS.brandYellow)
										}
									>
										Read More →
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default RecentPosts;
