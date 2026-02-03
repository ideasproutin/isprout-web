import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { homePageImages } from "../../assets";
import { COLORS } from "../../helpers/constants/Colors";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import BlogsShare from "./blogsshare";
import RecentPosts from "./recentposts";
import { useBlogs, useBlog } from "../../hooks/useBlogs";

const BlogDetail = () => {
	const { blogId } = useParams();

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	}, [blogId]);

	const { blogs } = useBlogs();
	console.log("All blogs:", blogs);
	const { blog: currentBlog, loading, error } = useBlog(blogId);

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center' style={{ backgroundColor: COLORS.white }}>
				<p style={{ fontFamily: "Outfit, sans-serif", color: COLORS.brandBlue }}>Loading blog...</p>
			</div>
		);
	}

	if (error || !currentBlog) {
		return (
			<div className='min-h-screen flex items-center justify-center' style={{ backgroundColor: COLORS.white }}>
				<p style={{ fontFamily: "Outfit, sans-serif", color: COLORS.brandBlue }}>{error || "Blog not found"}</p>
			</div>
		);
	}

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

	const currentBlogUrl = `${window.location.origin}/blogs/${currentBlog.id}`;

	return (
		<div className='min-h-screen' style={{ backgroundColor: COLORS.white }}>
			{/* Hero Section with Date, Title, and Image */}
			<section className='py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 lg:px-auto'>
				<div className='max-w-7xl mx-auto'>
					{/* Date */}
					<p
						className='text-sm sm:text-base mb-3 sm:mb-4 text-center'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.textGray,
						}}
					>
						{currentBlog.date}
					</p>

					{/* Title */}
					<h1
						className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-center'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.brandBlue,
						}}
					>
						{currentBlog.title}
					</h1>

					{/* Featured Image - Centered */}
					<div className='mb-4 sm:mb-6'>
						<img
							src={getImageSource(currentBlog.image)}
							alt={currentBlog.title}
							className='w-full rounded-2xl shadow-lg object-cover'
							style={{ maxHeight: '500px' }}
						/>
					</div>
				</div>
			</section>
			<section className='py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8'>
				<div className='max-w-7xl mx-auto'>
					<div
						className='prose prose-sm sm:prose-base lg:prose-lg max-w-none blog-content'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.textGray,
						}}
						dangerouslySetInnerHTML={{
							__html: currentBlog.content,
						}}
					/>
				</div>
			</section>

			{/* Blog Share Section */}
			<BlogsShare
				keywords={currentBlog.keywords?.slice(0, 2) || []}
				blogTitle={currentBlog.title}
				blogUrl={currentBlogUrl}
			/>

			{/* Recent Posts Section */}
			<RecentPosts blogs={blogs} currentBlogId={blogId} />

			{/* Footer */}
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default BlogDetail;
