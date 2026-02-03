import { useNavigate } from "react-router-dom";
import { homePageImages } from "../../assets";
import { COLORS } from "../../helpers/constants/Colors";

interface Blog {
	id: string;
	image: string;
	date: string;
	title: string;
	category: string;
	keywords?: string[];
	content: string;
}

interface RecentPostsProps {
	blogs: Blog[];
	currentBlogId?: string;
	animated?: boolean;
	animationVisible?: boolean;
	showHeading?: boolean;
	backgroundColor?: string;
	sortByDate?: boolean;
}

const RecentPosts = ({ blogs, currentBlogId, animated = false, animationVisible = true, showHeading = true, backgroundColor, sortByDate = false }: RecentPostsProps) => {
	const navigate = useNavigate();

	// Get image source - use API URL if it starts with http, otherwise use static images
	const getImageSource = (imageName: string) => {
		if (imageName && (imageName.startsWith('http://') || imageName.startsWith('https://'))) {
			return imageName;
		}
		// Fallback to static images if needed
		const imageMap: { [key: string]: string } = {
			blog1: homePageImages.blog1,
			blog2: homePageImages.blog2,
			blog3: homePageImages.blog3,
			blogpage1: homePageImages.blogpage1,
			featuredBlog: homePageImages.featuredBlog,
		};
		return imageMap[imageName] || homePageImages.blog1;
	};

	// Logic for recent posts
	let recentBlogs: Blog[];
	
	// Return early if blogs array is empty
	if (!blogs || blogs.length === 0) {
		return null;
	}
	
	if (currentBlogId) {
		// For blog detail pages - show other blogs excluding current one
		recentBlogs = blogs
			.filter((blog) => blog && blog.id !== currentBlogId)
			.slice(0, 3);
	} else {
		// For blog intro page or homepage - show first 3 blogs
		if (sortByDate) {
			// Sort by date (most recent first)
			const sortedBlogs = [...blogs].sort((a, b) => {
				const dateA = new Date(a.date).getTime();
				const dateB = new Date(b.date).getTime();
				return dateB - dateA;
			});
			recentBlogs = sortedBlogs.slice(0, 3);
		} else {
			recentBlogs = blogs.slice(0, 3);
		}
	}

	return (
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
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
					{recentBlogs.map((blog) => (
						<div
							key={blog.id}
							className={`rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow ${animated ? `recent-card ${animationVisible ? 'visible' : ''}` : ''}`}
							style={{ backgroundColor: COLORS.white }}
						>
							<div className='relative'>
								<img
									src={getImageSource(blog.image)}
									alt={blog.title}
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
									{blog.title}
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
	);
};

export default RecentPosts;
