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
	description?: string[];
	points?: string[];
	description_after?: string[];
}

interface BlogDetail {
	heading: string;

	date: string;
	tags?: string[];
	image_url: string;
	meta_descritpion?: string[];
	points_description?: PointDescription[];
	points?: string[];
	conclusion?: string[];
	links?: { [key: string]: string };
	[key: string]: unknown; // Allow any additional fields from API
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

	// Helper function to process text with links
	const processTextWithLinks = (text: string) => {
		let processedText = text;
		
		// Handle {word:'...', link:'...'} syntax in text
		const linkObjectRegex = /\{\s*word\s*:\s*['"]([^'"]+)['"]\s*,\s*link\s*:\s*['"]([^'"]+)['"]\s*\}/gi;
		processedText = processedText.replace(linkObjectRegex, (_match, word, link) => {
			return `<strong><a href="${link}" target="_blank" rel="noopener noreferrer" style="color: #0066cc; text-decoration: underline;">${word}</a></strong>`;
		});
		
		// Handle links object from API
		if (currentBlog.links) {
			Object.keys(currentBlog.links).forEach((keyword) => {
				const link = currentBlog.links![keyword];
				const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
				processedText = processedText.replace(regex, `<strong><a href="${link}" target="_blank" rel="noopener noreferrer" style="color: #0066cc; text-decoration: underline;">$1</a></strong>`);
			});
		}
		
		return processedText;
	};

	// Build HTML content from API structure
	const buildBlogContent = () => {
		let htmlContent = "";

		// Add meta description paragraphs
		if (currentBlog.meta_descritpion && currentBlog.meta_descritpion.length > 0) {
			currentBlog.meta_descritpion.forEach((para: string) => {
				const processedPara = processTextWithLinks(para);
				htmlContent += `<p>${processedPara}</p>`;
			});
		}

		// Add points with titles and descriptions
		if (currentBlog.points_description && currentBlog.points_description.length > 0) {
			currentBlog.points_description.forEach((point: PointDescription) => {
				htmlContent += `<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 1rem;">${point.title}</h2>`;
				
				// Add description paragraphs (before points)
				if (point.description && point.description.length > 0) {
					point.description.forEach((desc: string) => {
						const processedDesc = processTextWithLinks(desc);
						htmlContent += `<p>${processedDesc}</p>`;
					});
				}
				
				// Add bullet points if they exist in this section
				if (point.points && point.points.length > 0) {
					htmlContent += `<ul style="list-style-type: disc; margin-left: 1.5rem; margin-top: 1rem; margin-bottom: 1rem;">`;
					point.points.forEach((bulletPoint: string) => {
						const processedPoint = processTextWithLinks(bulletPoint);
						htmlContent += `<li style="margin-bottom: 0.5rem;">${processedPoint}</li>`;
					});
					htmlContent += `</ul>`;
				}
				
				// Add description paragraphs (after points)
				if (point.description_after && point.description_after.length > 0) {
					point.description_after.forEach((desc: string) => {
						const processedDesc = processTextWithLinks(desc);
						htmlContent += `<p>${processedDesc}</p>`;
					});
				}
			});
		}

		// Add bullet points if available
		if (currentBlog.points && currentBlog.points.length > 0) {
			htmlContent += `<ul style="list-style-type: disc; margin-left: 1.5rem; margin-top: 1rem; margin-bottom: 1rem;">`;
			currentBlog.points.forEach((point: string) => {
				const processedPoint = processTextWithLinks(point);
				htmlContent += `<li style="margin-bottom: 0.5rem;">${processedPoint}</li>`;
			});
			htmlContent += `</ul>`;
		}

		// Add conclusion section
		if (currentBlog.conclusion && currentBlog.conclusion.length > 0) {
			htmlContent += `<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 1rem;">Final Thought</h2>`;
			currentBlog.conclusion.forEach((para: string) => {
				const processedPara = processTextWithLinks(para);
				htmlContent += `<p>${processedPara}</p>`;
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
						className='text-xl sm:text-2xl md:text-2xl font-bold mb-4 sm:mb-6 text-center'
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

