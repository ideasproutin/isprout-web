import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { homePageImages } from "../../assets";
import { COLORS } from "../../helpers/constants/Colors";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const BlogDetail = () => {
	const { blogId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	}, [blogId]);

	// Sample blog data - in real app, fetch based on blogId
	const blogs = [
		{
			id: "1",
			image: homePageImages.blog1,
			date: "30 Oct 2025",
			title: "Office Space Trends 2026: The Future of Workspaces",
			category: "Office Tips",
			content: `
				<p>The office space isn't what it used to be. The era of fixed cubicles and rigid 9-to-5 routines has long passed. As 2026 is approaching, the concept of shared office is fast evolving. Managed office spaces and flexible offices are reshaping how businesses operate.</p>
				
				<p>Let's explore the office space trends for 2026. These trends focus on flexible offices and smart technology. It also highlights designs that prioritize the client's well-being.</p>
				
				<h2>1. Flexibility Becomes the Baseline</h2>
				<p>A workspace isn't "future-ready" if it can't adapt. More companies want to scale up or down every few months. These companies can't comply with decade-long leases.</p>
				
				<p><strong>Example:</strong> A Bangalore-based tech startup uses a managed office space for its first year. As it grows, it shifts to a flexible office model. Such a model allows the startup to add more desks without renegotiating a lease.</p>
				
				<p><strong>Data:</strong> According to Cushman & Wakefield (2025 Global Flexible Office Trends Report), about 55% of occupiers now use flexible office solutions. Also, 17% plan to increase their usage in the coming years.</p>
				
				<p>This shift is pushing landlords and workspace providers to design modular layouts. Furthermore, they now offer plug-and-play infrastructure and scalable membership plans.</p>
				
				<h2>2. Shared Offices Move Beyond Big Cities</h2>
				<p>Until a few years back, shared offices were mostly found in urban business districts. This scenario is changing quickly.</p>
				
				<p><strong>Example:</strong> XYZ group owned a warehouse in the suburbs of Pune. They convert this space into a shared office. Remote workers who moved out of the city now have access to flexible office space closer to home.</p>
				
				<p>This shift brings shared office space closer to where employees live. It reduces their commute stress. Additionally, it makes "office time" more convenient and productive.</p>
				
				<h2>3. Hybrid Work Means Office Space Reimagined</h2>
				<p>Hybrid work is now an expectation. Work happens everywhere, be it in offices, at home, or on the go.</p>
				
				<p><strong>Example:</strong> A marketing firm redesigns its workspace into flexible office space. They offer quiet pods for focused work and open collaboration zones for brainstorming. In addition, they also have "drop-in" desks for hybrid employees.</p>
				
				<p>The next phase is all about activity-based workspaces (ABW). ABW allows employees to choose where to work based on their tasks. arXiv (2025) even reports ongoing projects on robotic partitions that automatically reshape open spaces. These systems can quickly create areas for impromptu meetings or team huddles.</p>
				
				<p>The message is clear: the modern office must be dynamic and tech-driven.</p>
				
				<h2>4. Vacancy Pressures Force Smarter Use of Space</h2>
				<p>The commercial real estate market is under pressure. Unused office space is now seen as a financial liability rather than a safety net.</p>
				
				<p>Moody's Analytics projects office vacancy rates to rise between 22% and 28% by 2026 (BDC Network, 2025). On the other hand, CFO Dive (2025) states an average 24% commercial vacancy rate expected by 2026.</p>
				
				<p>So what can companies do? Well, they can repurpose and turn empty zones into shared offices. Moreover, they can convert them into rentable pods or creative amenities like content studios and event lounges. Every square foot must now justify its cost.</p>
			`,
		},
		{
			id: "2",
			image: homePageImages.blog2,
			date: "30 Oct 2025",
			title: "Top Virtual Office Features That Boost Business Success",
			category: "Virtual Office",
			content: `
				<p>Virtual offices have revolutionized the way businesses operate, offering flexibility and cost-effectiveness without compromising on professionalism.</p>
				
				<h2>Essential Virtual Office Features</h2>
				<p>A good virtual office provides more than just an address. It offers a complete business solution that helps you maintain a professional image while working remotely.</p>
				
				<h2>Professional Business Address</h2>
				<p>Having a prestigious business address in a prime location enhances your company's credibility and reputation, even if you're working from anywhere in the world.</p>
				
				<h2>Mail Handling Services</h2>
				<p>Virtual offices provide mail receiving, sorting, and forwarding services, ensuring you never miss important correspondence.</p>
			`,
		},
		{
			id: "3",
			image: homePageImages.blog3,
			date: "30 Oct 2025",
			title: "Why Managed Offices Are the Smart Choice for Startups",
			category: "Managed Office",
			content: `
				<p>Startups face unique challenges when it comes to office space. Managed offices offer the perfect solution, combining flexibility with professional infrastructure.</p>
				
				<h2>Cost-Effective Solution</h2>
				<p>Managed offices eliminate the need for large upfront investments in furniture, equipment, and long-term leases. This allows startups to allocate resources to core business activities.</p>
				
				<h2>Flexibility to Scale</h2>
				<p>As your team grows, managed offices make it easy to expand your space without the hassle of relocating or renegotiating leases.</p>
				
				<h2>Professional Infrastructure</h2>
				<p>From high-speed internet to meeting rooms and reception services, managed offices provide everything you need to run a professional operation from day one.</p>
			`,
		},
		{
			id: "4",
			image: homePageImages.blog1,
			date: "30 Oct 2025",
			title: "Office Space Trends 2026: The Future of Workspaces",
			category: "Office Tips",
			content: `
				<p>The office space isn't what it used to be. The era of fixed cubicles and rigid 9-to-5 routines has long passed. As 2026 is approaching, the concept of shared office is fast evolving. Managed office spaces and flexible offices are reshaping how businesses operate.</p>
				
				<p>Let's explore the office space trends for 2026. These trends focus on flexible offices and smart technology. It also highlights designs that prioritize the client's well-being.</p>
				
				<h2>1. Flexibility Becomes the Baseline</h2>
				<p>A workspace isn't "future-ready" if it can't adapt. More companies want to scale up or down every few months. These companies can't comply with decade-long leases.</p>
				
				<p><strong>Example:</strong> A Bangalore-based tech startup uses a managed office space for its first year. As it grows, it shifts to a flexible office model. Such a model allows the startup to add more desks without renegotiating a lease.</p>
				
				<p><strong>Data:</strong> According to Cushman & Wakefield (2025 Global Flexible Office Trends Report), about 55% of occupiers now use flexible office solutions. Also, 17% plan to increase their usage in the coming years.</p>
				
				<p>This shift is pushing landlords and workspace providers to design modular layouts. Furthermore, they now offer plug-and-play infrastructure and scalable membership plans.</p>
				
				<h2>2. Shared Offices Move Beyond Big Cities</h2>
				<p>Until a few years back, shared offices were mostly found in urban business districts. This scenario is changing quickly.</p>
				
				<p><strong>Example:</strong> XYZ group owned a warehouse in the suburbs of Pune. They convert this space into a shared office. Remote workers who moved out of the city now have access to flexible office space closer to home.</p>
				
				<p>This shift brings shared office space closer to where employees live. It reduces their commute stress. Additionally, it makes "office time" more convenient and productive.</p>
				
				<h2>3. Hybrid Work Means Office Space Reimagined</h2>
				<p>Hybrid work is now an expectation. Work happens everywhere, be it in offices, at home, or on the go.</p>
				
				<p><strong>Example:</strong> A marketing firm redesigns its workspace into flexible office space. They offer quiet pods for focused work and open collaboration zones for brainstorming. In addition, they also have "drop-in" desks for hybrid employees.</p>
				
				<p>The next phase is all about activity-based workspaces (ABW). ABW allows employees to choose where to work based on their tasks. arXiv (2025) even reports ongoing projects on robotic partitions that automatically reshape open spaces. These systems can quickly create areas for impromptu meetings or team huddles.</p>
				
				<p>The message is clear: the modern office must be dynamic and tech-driven.</p>
				
				<h2>4. Vacancy Pressures Force Smarter Use of Space</h2>
				<p>The commercial real estate market is under pressure. Unused office space is now seen as a financial liability rather than a safety net.</p>
				
				<p>Moody's Analytics projects office vacancy rates to rise between 22% and 28% by 2026 (BDC Network, 2025). On the other hand, CFO Dive (2025) states an average 24% commercial vacancy rate expected by 2026.</p>
				
				<p>So what can companies do? Well, they can repurpose and turn empty zones into shared offices. Moreover, they can convert them into rentable pods or creative amenities like content studios and event lounges. Every square foot must now justify its cost.</p>
			`,
		},
	];

	const recentBlogs = [
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
	];

	const currentBlog = blogs.find((blog) => blog.id === blogId) || blogs[0];

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
								<div className='absolute inset-5 rounded-full overflow-hidden'>
									<img
										src={currentBlog.image}
										alt={currentBlog.title}
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
							<h2
								className='text-2xl md:text-3xl lg:text-4xl mb-4'
								style={{
									fontFamily: "Outfit, sans-serif",
									color: COLORS.brandBlue,
								}}
							>
								{currentBlog.title}
							</h2>
							<p
								className='text-base md:text-lg'
								style={{
									fontFamily: "Outfit, sans-serif",
									color: COLORS.textGray,
								}}
							>
								{currentBlog.date}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Blog Content */}
			<section className='py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-16'>
				<div className='max-w-4xl mx-auto'>
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

			{/* Recent Posts Section */}
			<section
				className='py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-16'
				style={{ backgroundColor: COLORS.backgroundCream }}
			>
				<div className='max-w-7xl mx-auto'>
					<h2
						className='text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 md:mb-12 text-center'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.brandBlue,
						}}
					>
						RECENT POSTS
					</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
						{recentBlogs
							.filter((blog) => blog.id !== blogId)
							.slice(0, 3)
							.map((blog) => (
								<div
									key={blog.id}
									className='rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow'
									style={{ backgroundColor: COLORS.white }}
								>
									<div className='relative'>
										<img
											src={blog.image}
											alt={blog.title}
											className='w-full h-48 sm:h-56 md:h-64 object-cover'
										/>
									</div>
									<div className='p-4 sm:p-5 md:p-6 bg-gray-50'>
										<p
											className='text-xs sm:text-sm mb-2 sm:mb-3'
											style={{
												fontFamily:
													"Outfit, sans-serif",
												color: COLORS.textGray,
											}}
										>
											{blog.date}
										</p>
										<h3
											className='text-base sm:text-lg font-semibold mb-3 sm:mb-4'
											style={{
												fontFamily:
													"Outfit, sans-serif",
												color: COLORS.brandBlue,
											}}
										>
											{blog.title}
										</h3>
										<button
											className='px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors'
											style={{
												backgroundColor:
													COLORS.brandYellow,
												color: COLORS.brandBlue,
												fontFamily:
													"Outfit, sans-serif",
											}}
											onClick={() =>
												navigate(`/blogs/${blog.id}`)
											}
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

			{/* Footer */}
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default BlogDetail;
