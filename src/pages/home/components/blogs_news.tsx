import { COLORS } from "../../../helpers/constants/Colors";
import { Link } from "react-router-dom";
import blogsData from "../../../content/blogs.json";
import RecentPosts from "../../blogs/recentposts";

interface Blog {
	id: string;
	image: string;
	date: string;
	title: string;
	category: string;
	keywords: string[];
	content: string;
}

const BlogsNews = () => {
	const blogs: Blog[] = blogsData as Blog[];

	return (
		<section
			className='w-full pt-0 pb-12 sm:pb-16 lg:pb-20'
			style={{ backgroundColor: COLORS.white }}
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Heading */}
				<div className='text-center mb-4'>
					<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900'>
						Blogs & News
					</h2>
				</div>
			</div>

			{/* Recent Posts Component - sorted by date */}
			<RecentPosts 
				blogs={blogs} 
				showHeading={false} 
				backgroundColor={COLORS.white}
				sortByDate={true}
			/>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

				{/* View More Button */}
				<div className='flex justify-center mt-10 sm:mt-12'>
					<Link
						to='/blogs'
						aria-label='View more'
						style={{ backgroundColor: "#FFDE00", color: "#000000" }}
						className='px-8 py-3 sm:py-4 font-semibold rounded-full transition hover:opacity-90 text-base sm:text-lg inline-flex items-center justify-center'
					>
						View more
					</Link>
				</div>
			</div>
		</section>
	);
};

export default BlogsNews;
