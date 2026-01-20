import { useNavigate } from "react-router-dom";
import { homePageImages } from "../../assets";
import { COLORS } from "../../helpers/constants/Colors";
const BlogsGrid = () => {
	const navigate = useNavigate();

	const blogs = [
		{
			id: "1",
			image: homePageImages.blog1,
			date: "30 Oct 2025",
			title: "Office Space Trends 2026: The Future of Workspaces",
			category: "Office Tips",
		},
		{
			id: "2",
			image: homePageImages.blog2,
			date: "30 Oct 2025",
			title: "Top Virtual Office Features That Boost Business Success",
			category: "Virtual Office",
		},
		{
			id: "3",
			image: homePageImages.blog3,
			date: "30 Oct 2025",
			title: "Why Managed Offices Are the Smart Choice for Startups",
			category: "Managed Office",
		},
		{
			id: "4",
			image: homePageImages.blog1,
			date: "30 Oct 2025",
			title: "Office Space Trends 2026: The Future of Workspaces",
			category: "Office Tips",
		},
		{
			id: "5",
			image: homePageImages.blog2,
			date: "30 Oct 2025",
			title: "Top Virtual Office Features That Boost Business Success",
			category: "Virtual Office",
		},
		{
			id: "6",
			image: homePageImages.blog3,
			date: "30 Oct 2025",
			title: "Why Managed Offices Are the Smart Choice for Startups",
			category: "Managed Office",
		},
		{
			id: "7",
			image: homePageImages.blog1,
			date: "30 Oct 2025",
			title: "Office Space Trends 2026: The Future of Workspaces",
			category: "Office Tips",
		},
		{
			id: "8",
			image: homePageImages.blog2,
			date: "30 Oct 2025",
			title: "Top Virtual Office Features That Boost Business Success",
			category: "Virtual Office",
		},
		{
			id: "9",
			image: homePageImages.blog3,
			date: "30 Oct 2025",
			title: "Why Managed Offices Are the Smart Choice for Startups",
			category: "Managed Office",
		},
	];

	return (
		<section
			className='py-8 sm:py-10 md:py-12 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16'
			style={{ backgroundColor: COLORS.white }}
		>
			<div className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
					{blogs.map((blog) => (
						<div
							key={blog.id}
							className='rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer'
							style={{ backgroundColor: COLORS.white }}
							onClick={() => navigate(`/blogs/${blog.id}`)}
						>
							<div className='relative'>
								<img
									src={blog.image}
									alt={blog.title}
									className='w-full h-48 sm:h-56 md:h-64 object-cover'
								/>
								{/* <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#FFDE00', color: '#00275c', fontFamily: 'Outfit, sans-serif' }}>
                  {blog.category}
                </div> */}
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

export default BlogsGrid;
