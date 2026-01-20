import { useState, useEffect } from "react";
import careersTeamImage from "../../assets/careers/weareiSprout.png";
import sundariImage from "../../assets/careers/sundari patibandla.png";
import sreenivasImage from "../../assets/careers/sreenivas tridala.png";
import vasumathiImage from "../../assets/careers/Vasumathi_Krishnan.jpg";
import vijayImage from "../../assets/careers/vijaypasupulati.jpg";
import rectangleMask from "../../assets/careers/rectangle_mask.png";
import rectangleMask2 from "../../assets/careers/rectanglemask.png";
import testimonialIcon from "../../assets/careers/testimonial_icon.png";
import testimonialIcon2 from "../../assets/careers/testimonialicon2.png";
import testimonialIcon3 from "../../assets/careers/testimonialicon.png";
import Jobs from "./jobs";
import { Highlights } from "./highlights";
import { WhyISprout as WhyISproutComponent } from "./whyisprout";
import Departments from "./departments";
import { COLORS } from "../../helpers/constants/Colors";

// OverviewContent Component - Contains team intro, visionaries, and testimonials with highlights sidebar
const OverviewContent = () => {
	const [visionaryPage, setVisionaryPage] = useState(0);
	const [currentTestimonial, setCurrentTestimonial] = useState(0);
	const [slideDirection, setSlideDirection] = useState<"left" | "right">(
		"right",
	);

	const visionaries = [
		[
			{
				name: "Sundari Patibandla",
				role: "CEO & Co-Founder",
				image: sundariImage,
				mask: rectangleMask,
			},
			{
				name: "Sreenivas Tirdhala",
				role: "CSO & Co-Founder",
				image: sreenivasImage,
				mask: rectangleMask2,
			},
			{
				name: "Vasumathi Krishnan",
				role: "Chief Business Officer",
				image: vasumathiImage,
				mask: rectangleMask,
			},
		],
		[
			{
				name: "Vijay Pasupulati",
				role: "Chief Technology Officer",
				image: vijayImage,
				mask: rectangleMask,
			},
		],
	];

	const testimonials = [
		{
			text: "iSprout is a fast growing and well operated Managed office provider. Their office staff is very friendly and efficient.",
			name: "Dinesh Singh",
			location: "iSprout Orbit",
			image: testimonialIcon3,
		},
		{
			text: "iSprout is a fast growing and well operated Managed office provider.",
			name: "Ramesh Sood",
			location: "iSprout Orbit",
			image: testimonialIcon2,
		},
		{
			text: "iSprout is a fast growing and well operated Managed office provider.",
			name: "Mayank Das",
			location: "iSprout Orbit",
			image: testimonialIcon,
		},
	];

	// Auto-play testimonials
	useEffect(() => {
		const interval = setInterval(() => {
			setSlideDirection("right");
			setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [testimonials.length]);

	return (
		<div className='flex gap-8'>
			{/* Main Content */}
			<div className='flex-1'>
				{/* Team Intro Section */}
				<div className='mb-12'>
					<div className='flex gap-6 items-stretch'>
						{/* Team Image */}
						<div className='w-[45%]'>
							<img
								src={careersTeamImage}
								alt='Team iSprout'
								className='w-full h-full object-cover rounded-lg'
							/>
						</div>

						{/* Description Box */}
						<div
							className='w-[55%] rounded-lg p-8 flex flex-col justify-center'
							style={{ backgroundColor: COLORS.backgroundCream }}
						>
							<p
								className='text-lg leading-relaxed mb-4'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								We are team iSprout. we're a bunch of dreamers
								and doers who believe that workspaces should be
								anything but not boring. We're on a mission to
								create offices that people actually look forward
								to come to every day.
							</p>
							<button
								className='text-lg self-start hover:underline'
								style={{
									color: COLORS.textBlack,
									fontFamily: "Outfit, sans-serif",
								}}
							>
								Read More →
							</button>
						</div>
					</div>
				</div>

				{/* Visionaries Section */}
				<div className='mb-12'>
					<h2
						className='text-4xl text-center mb-12'
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						Meet the{" "}
						<span
							style={{ fontFamily: "Otomanopee One, sans-serif" }}
						>
							Visionaries
						</span>
					</h2>

					<div className='relative'>
						<div className='grid grid-cols-3 gap-8'>
							{visionaries[visionaryPage].map(
								(visionary, idx) => (
									<div
										key={idx}
										className='flex flex-col items-center'
									>
										<div className='relative w-[220px] h-[250px] mb-4'>
											<img
												src={visionary.image}
												alt={visionary.name}
												className='w-full h-full object-cover'
												style={{
													maskImage: `url(${visionary.mask})`,
													maskSize: "contain",
													maskRepeat: "no-repeat",
													maskPosition: "center",
												}}
											/>
										</div>
										<h3
											className='text-xl font-semibold text-center mb-1'
											style={{
												fontFamily: "Inter, sans-serif",
												color: COLORS.textGray564,
											}}
										>
											{visionary.name}
										</h3>
										<p
											className='text-base text-center'
											style={{
												fontFamily: "Inter, sans-serif",
												color: COLORS.textGrayAD,
											}}
										>
											{visionary.role}
										</p>
									</div>
								),
							)}
						</div>

						{/* Navigation Arrow */}
						{visionaryPage === 0 && visionaries[1].length > 0 && (
							<button
								onClick={() => setVisionaryPage(1)}
								className='absolute right-0 top-1/3 w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-colors'
								style={{ backgroundColor: COLORS.brandBlue }}
							>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke={COLORS.brandYellow}
									strokeWidth='3'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<polyline points='9 18 15 12 9 6'></polyline>
								</svg>
							</button>
						)}

						{visionaryPage === 1 && (
							<button
								onClick={() => setVisionaryPage(0)}
								className='absolute left-0 top-1/3 w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-colors'
								style={{ backgroundColor: COLORS.brandBlue }}
							>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke={COLORS.brandYellow}
									strokeWidth='3'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='rotate-180'
								>
									<polyline points='9 18 15 12 9 6'></polyline>
								</svg>
							</button>
						)}
					</div>
				</div>

				{/* Testimonials Section */}
				<div className='mb-12 overflow-hidden z-0'>
					<h2
						className='text-2xl mb-12 text-center'
						style={{
							color: COLORS.textBlack,
							fontFamily: "Outfit, sans-serif",
						}}
					>
						Hear What Employees Say About{" "}
						<span
							style={{
								fontFamily: "Irish Grover, sans-serif",
								color: COLORS.brandYellow,
							}}
						>
							iSprout
						</span>
					</h2>

					<div className='relative w-full overflow-hidden z-0'>
						{/* Decorative yellow blob */}
						<div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[450px] h-80 -z-10'>
							<svg
								viewBox='0 0 450 320'
								fill='none'
								className='w-full h-full'
							>
								<ellipse
									cx='225'
									cy='160'
									rx='210'
									ry='150'
									fill={COLORS.brandYellow}
									opacity='0.9'
									transform='rotate(-5 225 160)'
								/>
							</svg>
						</div>

						{/* Testimonial Cards Container */}
						<div className='relative w-full max-w-[380px] mx-auto pl-8 overflow-hidden z-0'>
							{/* Decorative Star Elements */}
							<div className='absolute left-2 top-12 w-6 h-6 z-1'>
								<svg
									viewBox='0 0 24 24'
									fill={COLORS.brandBlue}
									className='w-full h-full'
								>
									<path d='M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z' />
								</svg>
							</div>
							<div className='absolute left-4 top-40 w-5 h-5 z-1'>
								<svg
									viewBox='0 0 24 24'
									fill={COLORS.brandBlue}
									className='w-full h-full'
								>
									<path d='M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z' />
								</svg>
							</div>
							<div className='relative h-60 overflow-hidden'>
								{testimonials.map((testimonial, index) => (
									<div
										key={index}
										className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
											index === currentTestimonial
												? "opacity-100 z-2"
												: "opacity-0 pointer-events-none"
										}`}
										style={{
											transform:
												index === currentTestimonial
													? "translateX(0)"
													: slideDirection === "right"
														? "translateX(-50px)"
														: "translateX(50px)",
										}}
									>
										{/* Main Card */}
										<div
											className='relative rounded-[20px] p-5 w-full h-[200px]'
											style={{
												backgroundColor: COLORS.white,
												boxShadow: `0px 4px 15px ${COLORS.shadowMedium}`,
											}}
										>
											<div className='flex gap-3 mb-3'>
												<img
													src={testimonial.image}
													alt={testimonial.name}
													className='w-12 h-12 rounded-full object-cover shrink-0'
												/>
												<p
													className='text-xs leading-normal text-gray-800 flex-1'
													style={{
														fontFamily:
															"Poppins, sans-serif",
													}}
												>
													{testimonial.text}
												</p>
											</div>
											<div className='mt-4'>
												<p
													className='text-sm font-semibold capitalize'
													style={{
														color: COLORS.textBlack,
														fontFamily:
															"Poppins, sans-serif",
													}}
												>
													{testimonial.name}
												</p>
												<p
													className='text-xs text-gray-600'
													style={{
														fontFamily:
															"Poppins, sans-serif",
													}}
												>
													{testimonial.location}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Highlights Sidebar */}
			<div className='w-[320px] shrink-0 relative'>
				<Highlights />
			</div>
		</div>
	);
};

// Main Overview Component with Tab Navigation
const Overview = () => {
	const [activeTab, setActiveTab] = useState<"overview" | "why" | "jobs">(
		"overview",
	);

	return (
		<section className='px-4 lg:px-16 py-12 lg:py-16'>
			<div className='max-w-7xl mx-auto'>
				{/* Tab Navigation */}
				<div className='flex gap-8 mb-12 border-b-2 border-gray-200 sticky top-0 bg-white z-10'>
					<button
						onClick={() => setActiveTab("overview")}
						className={`text-2xl pb-4 transition-all ${
							activeTab === "overview"
								? "border-b-4 border-black font-semibold"
								: "text-gray-600"
						}`}
						style={{ fontFamily: "Outfit, sans-serif" }}
						onMouseEnter={(e) => {
							if (activeTab !== "overview")
								e.currentTarget.style.color = COLORS.textBlack;
						}}
						onMouseLeave={(e) => {
							if (activeTab !== "overview")
								e.currentTarget.style.color = "";
						}}
					>
						Overview
					</button>
					<button
						onClick={() => setActiveTab("why")}
						className={`text-2xl pb-4 transition-all ${
							activeTab === "why"
								? "border-b-4 border-black font-semibold"
								: "text-gray-600"
						}`}
						style={{ fontFamily: "Outfit, sans-serif" }}
						onMouseEnter={(e) => {
							if (activeTab !== "why")
								e.currentTarget.style.color = COLORS.textBlack;
						}}
						onMouseLeave={(e) => {
							if (activeTab !== "why")
								e.currentTarget.style.color = "";
						}}
					>
						Why iSprout
					</button>
					<button
						onClick={() => setActiveTab("jobs")}
						className={`text-2xl pb-4 transition-all ${
							activeTab === "jobs"
								? "border-b-4 border-black font-semibold"
								: "text-gray-600"
						}`}
						style={{ fontFamily: "Outfit, sans-serif" }}
						onMouseEnter={(e) => {
							if (activeTab !== "jobs")
								e.currentTarget.style.color = COLORS.textBlack;
						}}
						onMouseLeave={(e) => {
							if (activeTab !== "jobs")
								e.currentTarget.style.color = "";
						}}
					>
						Jobs
					</button>
				</div>

				{/* Tab Content */}
				{activeTab === "overview" && <OverviewContent />}
				{activeTab === "why" && <WhyISproutComponent />}
				{activeTab === "jobs" && (
					<Jobs onTabChange={(tab) => setActiveTab(tab)} />
				)}
			</div>

			{/* Departments Section - Always visible */}
			<Departments />
		</section>
	);
};

export default Overview;
