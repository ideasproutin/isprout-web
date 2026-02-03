import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { COLORS } from "../../helpers/constants/Colors";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import BlogsShare from "./blogsshare";
import RecentPosts from "./recentposts";
import { useBlogs, useBlog } from "../../hooks/useBlogs";

interface PointDescription {
	title: string;
	description: string[];
}

interface BlogDetail {
	heading: string;
	date: string;
	tags: string[];
	image_url: string;
	meta_descritpion: string[];
	points_description: PointDescription[];
	conclusion: string[];
}

const BlogDetail = () => {
	const { blogId } = useParams();

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	}, [blogId]);

	const { data: blogs = [] } = useBlogs();
	console.log("All blogs:", blogs);
	const { data: currentBlog, isLoading, isError } = useBlog(blogId);

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center' style={{ backgroundColor: COLORS.white }}>
				<p style={{ fontFamily: "Outfit, sans-serif", color: COLORS.brandBlue }}>Loading blog...</p>
			</div>
		);
	}

	if (isError || !currentBlog) {
		return (
			<div className='min-h-screen flex items-center justify-center' style={{ backgroundColor: COLORS.white }}>
				<p style={{ fontFamily: "Outfit, sans-serif", color: COLORS.brandBlue }}>{isError ? "Failed to load blog" : "Blog not found"}</p>
			</div>
		);
	}

	// Build HTML content from API structure
	const buildBlogContent = () => {
		let htmlContent = "";

		// Add meta description paragraphs
		if (currentBlog.meta_descritpion && currentBlog.meta_descritpion.length > 0) {
			currentBlog.meta_descritpion.forEach((para: string) => {
				htmlContent += `<p>${para}</p>`;
			});
		}

		// Add points with titles and descriptions
		if (currentBlog.points_description && currentBlog.points_description.length > 0) {
			currentBlog.points_description.forEach((point: PointDescription) => {
				htmlContent += `<h2>${point.title}</h2>`;
				if (point.description && point.description.length > 0) {
					point.description.forEach((desc: string) => {
						htmlContent += `<p>${desc}</p>`;
					});
				}
			});
		}

		// Add conclusion section
		if (currentBlog.conclusion && currentBlog.conclusion.length > 0) {
			htmlContent += `<h2>Final Thought</h2>`;
			currentBlog.conclusion.forEach((para: string) => {
				htmlContent += `<p>${para}</p>`;
			});
		}

		return htmlContent;
	};

	const currentBlogUrl = `${window.location.origin}/blogs/${blogId}`;

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
						{currentBlog.heading}
					</h1>

					{/* Featured Image - Centered */}
					<div className='mb-4 sm:mb-6'>
						<img
							src={currentBlog.image_url}
							alt={currentBlog.heading}
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
							__html: buildBlogContent(),
						}}
					/>
				</div>
			</section>

			{/* Blog Share Section */}
			<BlogsShare
				keywords={currentBlog.tags?.slice(0, 2) || []}
				blogTitle={currentBlog.heading}
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

