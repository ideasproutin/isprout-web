import { homePageImages } from "../../../assets";
import { COLORS } from "../../../helpers/constants/Colors";
import { Link } from "react-router-dom";

const BlogsNews = () => {
	const blogs = [
		{
			image: homePageImages.blog1,
			title: "Office Space Trends",
			description:
				"Discover the latest trends shaping modern office spaces and how they impact productivity and collaboration.",
		},
		{
			image: homePageImages.blog2,
			title: "Location Checklist",
			description:
				"Essential factors to consider when choosing the perfect location for your business workspace.",
		},
		{
			image: homePageImages.blog3,
			title: "Virtual Office Features",
			description:
				"Explore key features and benefits of virtual office solutions for remote and hybrid teams.",
		},
	];

	return (
		<section
			className='w-full py-12 sm:py-16 lg:py-20'
			style={{ backgroundColor: COLORS.white }}
		>
			{/* ✅ SINGLE SOURCE OF HORIZONTAL ALIGNMENT */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Heading */}
				<div className='text-center mb-10 sm:mb-12'>
					<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900'>
						Blogs & News
					</h2>
				</div>

				{/* Blogs Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
					{blogs.map((blog, index) => (
						<div
							key={index}
							className='rounded-xl border border-[#e8e8ea] overflow-hidden shadow-lg bg-white flex flex-col'
						>
							{/* Image */}
							<div className='w-full aspect-[16/10] overflow-hidden'>
								<img
									src={blog.image}
									alt={blog.title}
									className='w-full h-full object-cover'
								/>
							</div>

							{/* Content */}
							<div className='p-5 sm:p-6 flex flex-col flex-1'>
								<h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-3'>
									{blog.title}
								</h3>

								<p className='text-gray-600 text-sm sm:text-base mb-4 flex-1'>
									{blog.description}
								</p>

								<span className='text-yellow-500 text-sm font-semibold mt-auto'>
									Read More →
								</span>
							</div>
						</div>
					))}
				</div>

				{/* View More Button */}
				<div className='flex justify-center mt-10 sm:mt-12'>
					<Link
						to='/blogs'
						aria-label='View more'
						style={{ backgroundColor: "#204758", color: "#FFFFFF" }}
						className='px-8 py-3 sm:py-4 text-white font-semibold rounded-full transition hover:opacity-90 text-base sm:text-lg inline-flex items-center justify-center'
					>
						View more
					</Link>
				</div>
			</div>
		</section>
	);
};

export default BlogsNews;
