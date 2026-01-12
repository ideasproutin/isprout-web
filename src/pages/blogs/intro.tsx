import { useEffect } from "react";
import heroImage from "../../assets/blogs_section/blogs_herosection.png";
import blogImage from "../../assets/blogs_section/blog_image.png";
import blog1 from "../../assets/blogs_section/blogs1.png";
import blog2 from "../../assets/blogs_section/blogs2.png";
import blog3 from "../../assets/blogs_section/blogs3.png";
import { COLORS } from "../../helpers/constants/Colors";
import BlogsGrid from "./blogsgrid";
import Footer from "../../components/footer/footer";

const BlogsIntro = () => {
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, []);

	return (
		<div className='min-h-screen' style={{ backgroundColor: COLORS.white }}>
			{/* Hero Section - Yellow Background */}
			<section className='relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-28 px-4 md:px-8 lg:px-16 overflow-hidden -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-32'>
				{/* Yellow curved background - left half with sharp inward curve */}
				<div className='absolute left-0 top-0 bottom-0 w-[40%] pointer-events-none'>
					<svg
						className='absolute inset-0 w-full h-full'
						viewBox='0 0 100 100'
						preserveAspectRatio='none'
					>
						<path
							d='M 0 0 L 100 0 Q 70 50 100 100 L 0 100 Z'
							fill={COLORS.brandYellow}
						/>
					</svg>
				</div>

				<div className='max-w-7xl mx-auto relative z-10'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
						{/* Left Side - Circular Image */}
						<div className='flex justify-center lg:justify-start'>
							<div className='relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px]'>
								{/* White ring border */}
								<div
									className='absolute inset-0 rounded-full shadow-2xl'
									style={{ backgroundColor: COLORS.white }}
								></div>

								{/* Inner image */}
								<div className='absolute inset-[20px] rounded-full overflow-hidden'>
									<img
										src={heroImage}
										alt='iSprout Blogs Workspace'
										className='w-full h-full object-cover'
									/>
								</div>
							</div>
						</div>

						{/* Right Side - Text Content */}
						<div className='text-center lg:text-left'>
							<h1
								className='text-4xl md:text-5xl lg:text-6xl mb-6'
								style={{
									fontFamily: "Outfit, sans-serif",
									color: COLORS.brandBlue,
								}}
							>
								iSprout{" "}
								<span style={{ color: COLORS.brandBlue }}>
									BLOGS
								</span>
							</h1>
							<p
								className='text-lg md:text-xl lg:text-2xl'
								style={{
									fontFamily: "Outfit, sans-serif",
									color: COLORS.brandBlue,
								}}
							>
								Your go-to space for workplace inspiration,
								industry insights, and growth stories.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Blog Section */}
			<section className='py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-50'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-0 items-center'>
						{/* Left - Content */}
						<div className='text-center lg:text-left lg:pr-12'>
							<h2
								className='text-3xl md:text-4xl mb-6'
								style={{
									fontFamily: "Outfit, sans-serif",
									color: COLORS.brandBlue,
								}}
							>
								Office Space Trends 2026: The Future of
								Workspaces
							</h2>
							<p
								className='text-base md:text-lg mb-8'
								style={{
									fontFamily: "Outfit, sans-serif",
									color: COLORS.textGray,
								}}
							>
								As 2026 is approaching, the concept of shared
								office is fast evolving. Managed office spaces
								and flexible offices are reshaping how
								businesses operate.
							</p>
							<button
								className='px-8 py-3 rounded-full text-lg font-semibold transition-colors'
								style={{
									backgroundColor: COLORS.brandBlue,
									color: COLORS.textWhite,
									fontFamily: "Outfit, sans-serif",
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

						{/* Right - Yellow background with image */}
						<div
							className='h-[300px] md:h-[380px] rounded-xl overflow-hidden flex items-center justify-center'
							style={{ backgroundColor: COLORS.brandYellow }}
						>
							<div className='w-[90%] h-[90%] rounded-lg overflow-hidden shadow-lg'>
								<img
									src={blogImage}
									alt='Office Space Trends 2026'
									className='w-full h-full object-cover'
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Recent Blogs Grid */}
			<section
				className='py-12 md:py-20 px-4 md:px-8 lg:px-16'
				style={{ backgroundColor: COLORS.white }}
			>
				<div className='max-w-7xl mx-auto'>
					<h2
						className='text-3xl md:text-4xl mb-12 text-center'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.brandBlue,
						}}
					>
						Recent Articles
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{/* Blog Card 1 */}
						<div
							className='rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow'
							style={{ backgroundColor: COLORS.white }}
						>
							<img
								src={blog1}
								alt='Blog 1'
								className='w-full h-64 object-cover'
							/>
							<div className='p-6'>
								<h3
									className='text-xl font-semibold mb-3'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.brandBlue,
									}}
								>
									Flexible Workspace Solutions
								</h3>
								<p
									className='text-base mb-4'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.textGray,
									}}
								>
									Discover how flexible workspaces are
									transforming business operations in 2026.
								</p>
								<button
									className='text-base font-semibold'
									style={{
										color: COLORS.brandBlue,
										fontFamily: "Outfit, sans-serif",
									}}
								>
									Read More →
								</button>
							</div>
						</div>

						{/* Blog Card 2 */}
						<div
							className='rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow'
							style={{ backgroundColor: COLORS.white }}
						>
							<img
								src={blog2}
								alt='Blog 2'
								className='w-full h-64 object-cover'
							/>
							<div className='p-6'>
								<h3
									className='text-xl font-semibold mb-3'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.brandBlue,
									}}
								>
									Hybrid Work Model Success
								</h3>
								<p
									className='text-base mb-4'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.textGray,
									}}
								>
									Learn the strategies behind successful
									hybrid workplace implementations.
								</p>
								<button
									className='text-base font-semibold'
									style={{
										color: COLORS.brandBlue,
										fontFamily: "Outfit, sans-serif",
									}}
								>
									Read More →
								</button>
							</div>
						</div>

						{/* Blog Card 3 */}
						<div
							className='rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow'
							style={{ backgroundColor: COLORS.white }}
						>
							<img
								src={blog3}
								alt='Blog 3'
								className='w-full h-64 object-cover'
							/>
							<div className='p-6'>
								<h3
									className='text-xl font-semibold mb-3'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.brandBlue,
									}}
								>
									Productivity in Modern Offices
								</h3>
								<p
									className='text-base mb-4'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.textGray,
									}}
								>
									Explore how modern office design impacts
									team productivity and collaboration.
								</p>
								<button
									className='text-base font-semibold'
									style={{
										color: COLORS.brandBlue,
										fontFamily: "Outfit, sans-serif",
									}}
								>
									Read More →
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Blogs Grid Component */}
			<BlogsGrid />

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default BlogsIntro;
