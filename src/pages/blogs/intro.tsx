import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { homePageImages } from "../../assets";
import { COLORS } from "../../helpers/constants/Colors";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import RecentPosts from "./recentposts";
import { useBlogs } from "../../hooks/useBlogs";

interface BlogIndex {
	id: string;
	image_url: string;
	heading: string;
	tags?: unknown[];
	date: string;
	meta_data?: string;
	[key: string]: unknown; // Allow any additional fields from API
}

const BlogsIntro = () => {
	const navigate = useNavigate();
	const [titleVisible, setTitleVisible] = useState(false);
	const [recentPostsVisible, setRecentPostsVisible] = useState(true);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const recentPostsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });

		// IntersectionObserver for Featured Section Title
		const titleObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					setTitleVisible(entry.isIntersecting);
				});
			},
			{ threshold: 0.3 }
		);

		// IntersectionObserver for Recent Posts section
		const recentObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					setRecentPostsVisible(entry.isIntersecting);
				});
			},
			{ threshold: 0.2 }
		);

		const currentTitleRef = titleRef.current;
		const currentRecentRef = recentPostsRef.current;

		if (currentTitleRef) {
			titleObserver.observe(currentTitleRef);
		}
		if (currentRecentRef) {
			recentObserver.observe(currentRecentRef);
		}

		return () => {
			if (currentTitleRef) {
				titleObserver.unobserve(currentTitleRef);
			}
			if (currentRecentRef) {
				recentObserver.unobserve(currentRecentRef);
			}
		};
	}, []);

	const { data: blogs = [], isLoading, isError } = useBlogs();
	// Use the first blog as featured (plug-and-play)
	const featuredBlog = blogs.find((blog: BlogIndex) => blog.id === "plug-and-play") || blogs[0];

	// Debug logging
	console.log("Blogs loaded:", blogs);
	console.log("Featured blog:", featuredBlog);
	console.log("Loading state:", isLoading);
	console.log("Error state:", isError);

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center' style={{ backgroundColor: COLORS.white }}>
				<p style={{ fontFamily: "Outfit, sans-serif", color: COLORS.brandBlue }}>Loading blogs...</p>
			</div>
		);
	}

	if (isError || blogs.length === 0) {
		return (
			<div className='min-h-screen flex items-center justify-center' style={{ backgroundColor: COLORS.white }}>
				<p style={{ fontFamily: "Outfit, sans-serif", color: COLORS.brandBlue }}>{isError ? "Failed to load blogs" : "No blogs available"}</p>
			</div>
		);
	}

	// Get image source - use API URL if it starts with http, otherwise use static images
	const getImageSource = (imageName: string) => {
		if (imageName && (imageName.startsWith('http://') || imageName.startsWith('https://'))) {
			return imageName;
		}
		// Fallback to static images
		return homePageImages.featuredBlog;
	};

	// Get excerpt from meta_data (first 200 characters)
	const getExcerpt = (metaData: string) => {
		if (!metaData) return '';
		// Get first 200 characters
		return metaData.length > 200 ? metaData.substring(0, 200) + '...' : metaData;
	};

	return (
		<div className='min-h-screen' style={{ backgroundColor: COLORS.white }}>
			<style>
				{`
					.featured-section {
						cursor: pointer;
						transition: transform 0.4s ease, opacity 0.4s ease;
					}
					
					.featured-section:hover {
						transform: scale(0.98);
						opacity: 0.9;
					}

					.title-reveal {
						opacity: 0;
						transform: translateX(-30px);
						transition: opacity 0.8s ease-out, transform 0.8s ease-out;
					}

					.title-reveal.visible {
						opacity: 1;
						transform: translateX(0);
					}

					.recent-card {
						opacity: 0;
						transform: translateY(30px);
						transition: opacity 0.6s ease-out, transform 0.6s ease-out;
					}

					.recent-card.visible {
						opacity: 1;
						transform: translateY(0);
					}

					.recent-card:nth-child(1).visible {
						transition-delay: 0.1s;
					}

					.recent-card:nth-child(2).visible {
						transition-delay: 0.3s;
					}

					.recent-card:nth-child(3).visible {
						transition-delay: 0.5s;
					}

.blogs-heading-bg {
					background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
					border-radius: 12px;
					padding: 16px 32px;
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
					}

					.blogs-heading-bg-desktop {
						background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
						border-radius: 12px;
						padding: 16px 32px;
						box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
						opacity: 0;
						transform: scale(0.9);
						animation: revealBlogsText 1s ease-out forwards;
					}

					.blogs-text-reveal {
						opacity: 0;
						transform: scale(0.9);
						animation: none;
					}

					.blogs-text-reveal.visible {
						animation: revealBlogsText 1s ease-out forwards;
					}

					@keyframes revealBlogsText {
						0% {
							opacity: 0;
							transform: scale(0.9) rotateX(10deg);
						}
						50% {
							opacity: 0.5;
							transform: scale(0.95) rotateX(5deg);
						}
						100% {
							opacity: 1;
							transform: scale(1) rotateX(0deg);
						}
					}
				`}
			</style>

			{/* Featured Blog Section */}
			<section className='relative py-8 sm:py-10 md:py-16 lg:py-20 mt-20 sm:mt-16 md:mt-20 lg:mt-24'>
				{/* BLOGS Heading */}
				<div 
					className='text-center lg:absolute lg:top-24 lg:left-16 z-30 mb-6 lg:mb-0'
				>
					<h1
						className='text-xl sm:text-2xl lg:text-6xl font-bold lg:blogs-heading-bg-desktop'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.brandBlue,
						}}
					>
						BLOGS
					</h1>
				</div>

				<div 
					className='grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[350px] sm:min-h-[400px] md:min-h-[500px] featured-section mt-16 sm:mt-20'
					onClick={() => navigate(`/blogs/${featuredBlog.id}`)}
				>
					{/* Mobile-only Heading - Shows first on mobile, hidden on desktop */}
					<div className='block lg:hidden text-center px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 bg-white'>
						<h2
							ref={titleRef}
							className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-6 title-reveal ${titleVisible ? 'visible' : ''}`}
							style={{
								fontFamily: "Outfit, sans-serif",
								color: COLORS.brandBlue,
							}}
						>
							{featuredBlog.heading}
						</h2>
					</div>

					{/* Image - Shows second on mobile, right side on desktop */}
					<div
						className='order-2 lg:order-2 h-[350px] sm:h-[400px] md:h-[500px] lg:h-full flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10'
						style={{ backgroundColor: '#eaf4fb' }}
					>
						<div className='premium-frame w-full max-w-[500px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[650px]'>
							<div className='relative w-full rounded-xl overflow-hidden' style={{ paddingBottom: '75%' }}>
								<img
								src={getImageSource(featuredBlog.image_url)}
								alt={featuredBlog.heading}
									className='absolute top-0 left-0 w-full h-full object-cover'
								/>
							</div>
						</div>
					</div>

					{/* Content - Shows third on mobile (description + button), left side on desktop */}
					<div className='order-3 lg:order-1 text-center lg:text-left px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 bg-white'>
						{/* Desktop-only Heading */}
						<h2
							className={`hidden lg:block text-lg sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-6 title-reveal ${titleVisible ? 'visible' : ''}`}
							style={{
								fontFamily: "Outfit, sans-serif",
								color: COLORS.brandBlue,
							}}
						>
							{featuredBlog.heading}
						</h2>
						<p
							className='text-xs sm:text-base md:text-lg mb-4 sm:mb-8'
							style={{
								fontFamily: "Outfit, sans-serif",
								color: COLORS.textGray,
							}}
						>
							{getExcerpt(featuredBlog.meta_data)}
						</p>
						<button
							className='px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-colors'
							style={{
								backgroundColor: COLORS.brandBlue,
								color: COLORS.textWhite,
								fontFamily: "Outfit, sans-serif",
							}}
							onClick={(e) => {
								e.stopPropagation();
								navigate(`/blogs/${featuredBlog.id}`);
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.backgroundColor =
									COLORS.brandBlueDark)
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.backgroundColor =
									COLORS.brandBlue)
							}
						>
							Read More →
						</button>
					</div>
				</div>
			</section>

			{/* Recent Posts Section */}
			<div ref={recentPostsRef} className={recentPostsVisible ? 'visible' : ''}>
			<RecentPosts blogs={blogs} currentBlogId={featuredBlog.id} animated={true} animationVisible={recentPostsVisible} />
		</div>

			{/* Blogs Grid Component */}
			{/* <BlogsGrid /> */}

			{/* Footer */}
			<Footer />

			{/* Scroll to Top Button */}
			<ScrollToTop />
		</div>
	);
};

export default BlogsIntro;



