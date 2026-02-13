import { COLORS } from "../../../helpers/constants/Colors";
import { Link } from "react-router-dom";
import { useBlogs } from "../../../hooks/useBlogs";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { sortBlogsByDate } from "../../../utils/dateUtils";

interface Blog {
	id: string;
	image_url: string;
	heading: string;
	date: string;
	[key: string]: unknown;
}

const BlogsNews = () => {
	const { data: blogs = [], isLoading } = useBlogs();
	const navigate = useNavigate();
	const [scrollProgress, setScrollProgress] = useState(0);
	const [showProgressBar, setShowProgressBar] = useState(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const scrollTimeoutRef = useRef<number | null>(null);

	const handleScroll = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } =
				scrollContainerRef.current;
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

	if (isLoading) {
		return null; // or a loading spinner
	}

	// Sort blogs by date and take first 3 (most recent)
	const sortedBlogs: Blog[] = sortBlogsByDate(blogs as Blog[]).slice(0, 3);

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
			<section className='w-full pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 bg-gray-100'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					{/* Heading */}
					<div className='text-center mb-8 lg:mb-12'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900'>
							Blogs & News
						</h2>
					</div>

					{/* Mobile View - Horizontal Scroll */}
					<div className='lg:hidden'>
						<div
							ref={scrollContainerRef}
							onScroll={handleScroll}
							className='flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-6'
						>
							{sortedBlogs.map((blog) => (
								<div
									key={blog.id}
									className='snap-start shrink-0 w-[85%] sm:w-[45%]'
								>
									<div
										className='rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow h-full cursor-pointer'
										style={{
											backgroundColor: COLORS.white,
										}}
										onClick={() =>
											navigate(`/blogs/${blog.id}`)
										}
									>
										<div className='relative'>
											<img
												src={blog.image_url}
												alt={blog.heading}
												className='w-full h-48 object-cover'
											/>
										</div>
										<div className='p-5 bg-gray-50'>
											<p
												className='text-sm mb-2'
												style={{
													fontFamily:
														"Outfit, sans-serif",
													color: COLORS.textGray,
												}}
											>
												{blog.date}
											</p>
											<h3
												className='text-lg font-semibold mb-3 line-clamp-2'
												style={{
													fontFamily:
														"Outfit, sans-serif",
													color: COLORS.textGray900,
												}}
											>
												{blog.heading}
											</h3>
											<button
												className='text-sm font-semibold px-6 py-2 rounded-full'
												style={{
													backgroundColor:
														COLORS.brandYellow,
													color: COLORS.textBlack,
												}}
											>
												See More
											</button>
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
					<div className='hidden lg:grid grid-cols-3 gap-8 mb-10'>
						{sortedBlogs.map((blog) => (
							<div
								key={blog.id}
								className='rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer'
								style={{ backgroundColor: COLORS.white }}
								onClick={() => navigate(`/blogs/${blog.id}`)}
							>
								<div className='relative'>
									<img
										src={blog.image_url}
										alt={blog.heading}
										className='w-full h-64 object-cover'
									/>
								</div>
								<div className='p-6 bg-gray-50'>
									<p
										className='text-sm mb-3'
										style={{
											fontFamily: "Outfit, sans-serif",
											color: COLORS.textGray,
										}}
									>
										{blog.date}
									</p>
									<h3
										className='text-lg font-semibold mb-4 line-clamp-2'
										style={{
											fontFamily: "Outfit, sans-serif",
											color: COLORS.textGray900,
										}}
									>
										{blog.heading}
									</h3>
									<button
										className='text-sm font-semibold px-6 py-2 rounded-full'
										style={{
											backgroundColor: COLORS.brandYellow,
											color: COLORS.textBlack,
										}}
									>
										See More
									</button>
								</div>
							</div>
						))}
					</div>

					{/* View More Button */}
					<div className='flex justify-center mt-10 sm:mt-12'>
						<Link
							to='/blogs'
							aria-label='View more'
							style={{
								backgroundColor: "#FFDE00",
								color: "#000000",
							}}
							className='px-8 py-3 sm:py-4 font-semibold rounded-full transition hover:opacity-90 text-base sm:text-lg inline-flex items-center justify-center'
						>
							View more
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default BlogsNews;
