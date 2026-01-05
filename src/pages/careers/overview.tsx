import { useState, useEffect } from "react";
import careersTeamImage from "../../assets/careers/weareiSprout.png";
import sundariImage from "../../assets/careers/sundari patibandla.png";
import sreenivasImage from "../../assets/careers/sreenivas tridala.png";
import vasumathiImage from "../../assets/careers/vasumati krishnan.png";
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

// OverviewContent Component - Contains team intro, visionaries, and testimonials with highlights sidebar
const OverviewContent = () => {
	const [visionaryPage, setVisionaryPage] = useState(0);
	const [currentTestimonial, setCurrentTestimonial] = useState(0);
	const [slideDirection, setSlideDirection] = useState<"left" | "right">(
		"right"
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
			image: testimonialIcon,
		},
		{
			text: "Working at iSprout has been an amazing experience. The culture promotes innovation and growth at every level.",
			name: "Ramesh Sood",
			location: "iSprout Tech Park",
			image: testimonialIcon2,
		},
		{
			text: "The facilities and workspace environment at iSprout are world-class. It's truly a great place to build your career.",
			name: "Mayank Das",
			location: "iSprout Hub",
			image: testimonialIcon3,
		},
	];

	// Auto-play testimonials
	useEffect(() => {
		const interval = setInterval(() => {
			setSlideDirection("right");
			setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	const handleTestimonialNav = (direction: "left" | "right") => {
		setSlideDirection(direction);
		if (direction === "right") {
			setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
		} else {
			setCurrentTestimonial(
				(prev) => (prev - 1 + testimonials.length) % testimonials.length
			);
		}
	};

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
							style={{ backgroundColor: "#FFF9E6" }}
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
								className='text-lg text-black self-start hover:underline'
								style={{ fontFamily: "Outfit, sans-serif" }}
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
												color: "#564f4f",
											}}
										>
											{visionary.name}
										</h3>
										<p
											className='text-base text-center'
											style={{
												fontFamily: "Inter, sans-serif",
												color: "#adadad",
											}}
										>
											{visionary.role}
										</p>
									</div>
								)
							)}
						</div>

						{/* Navigation Arrow */}
						{visionaryPage === 0 && visionaries[1].length > 0 && (
							<button
								onClick={() => setVisionaryPage(1)}
								className='absolute right-0 top-1/3 w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-colors'
								style={{ backgroundColor: "#204758" }}
							>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='#FFDE00'
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
								style={{ backgroundColor: "#204758" }}
							>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='#FFDE00'
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
				<div className='mb-12'>
					<h2
						className='text-3xl text-center mb-8'
						style={{ fontFamily: "Inter, sans-serif" }}
					>
						Hear what employees say about{" "}
						<span
							style={{ fontFamily: "Irish Grover, sans-serif" }}
						>
							iSprout
						</span>
					</h2>

					<div className='relative'>
						<div className='overflow-hidden'>
							<div
								className='transition-transform duration-500'
								style={{
									transform:
										slideDirection === "right"
											? `translateX(-${
													currentTestimonial * 100
											  }%)`
											: `translateX(-${
													currentTestimonial * 100
											  }%)`,
								}}
							>
								<div className='flex'>
									{testimonials.map((testimonial, idx) => (
										<div
											key={idx}
											className='w-full flex-shrink-0 px-4'
										>
											<div className='bg-white rounded-lg p-6 shadow-lg'>
												<div className='flex items-start gap-4 mb-4'>
													<div className='w-[68px] h-[68px] rounded-full overflow-hidden flex-shrink-0'>
														<img
															src={
																testimonial.image
															}
															alt={
																testimonial.name
															}
															className='w-full h-full object-cover'
														/>
													</div>
													<p
														className='text-base leading-relaxed pt-2'
														style={{
															fontFamily:
																"Poppins, sans-serif",
															color: "#5e6282",
														}}
													>
														{testimonial.text}
													</p>
												</div>
												<div className='ml-[84px]'>
													<p
														className='font-semibold mb-1'
														style={{
															fontFamily:
																"Poppins, sans-serif",
															color: "#5e6282",
														}}
													>
														{testimonial.name}
													</p>
													<p
														className='text-sm'
														style={{
															fontFamily:
																"Poppins, sans-serif",
															color: "#5e6282",
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

						{/* Navigation Buttons */}
						<div className='flex justify-center gap-4 mt-6'>
							<button
								onClick={() => handleTestimonialNav("left")}
								className='w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors'
								style={{ backgroundColor: "#204758" }}
							>
								<svg
									width='20'
									height='20'
									viewBox='0 0 24 24'
									fill='none'
									stroke='#FFDE00'
									strokeWidth='3'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='rotate-180'
								>
									<polyline points='9 18 15 12 9 6'></polyline>
								</svg>
							</button>
							<button
								onClick={() => handleTestimonialNav("right")}
								className='w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors'
								style={{ backgroundColor: "#204758" }}
							>
								<svg
									width='20'
									height='20'
									viewBox='0 0 24 24'
									fill='none'
									stroke='#FFDE00'
									strokeWidth='3'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<polyline points='9 18 15 12 9 6'></polyline>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Highlights Sidebar */}
			<div className='w-[320px] flex-shrink-0'>
				<Highlights />
			</div>
		</div>
	);
};

// Main Overview Component with Tab Navigation
const Overview = () => {
	const [activeTab, setActiveTab] = useState<"overview" | "why" | "jobs">(
		"overview"
	);

	return (
		<section className='px-4 lg:px-16 py-12 lg:py-16'>
			<div className='max-w-[1280px] mx-auto'>
				{/* Tab Navigation */}
				<div className='flex gap-8 mb-12 border-b-2 border-gray-200 sticky top-0 bg-white z-10'>
					<button
						onClick={() => setActiveTab("overview")}
						className={`text-2xl pb-4 transition-all ${
							activeTab === "overview"
								? "border-b-4 border-black font-semibold"
								: "text-gray-600 hover:text-black"
						}`}
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						Overview
					</button>
					<button
						onClick={() => setActiveTab("why")}
						className={`text-2xl pb-4 transition-all ${
							activeTab === "why"
								? "border-b-4 border-black font-semibold"
								: "text-gray-600 hover:text-black"
						}`}
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						Why iSprout
					</button>
					<button
						onClick={() => setActiveTab("jobs")}
						className={`text-2xl pb-4 transition-all ${
							activeTab === "jobs"
								? "border-b-4 border-black font-semibold"
								: "text-gray-600 hover:text-black"
						}`}
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						Jobs
					</button>
				</div>

				{/* Tab Content */}
				{activeTab === "overview" && <OverviewContent />}
				{activeTab === "why" && <WhyISproutComponent />}
				{activeTab === "jobs" && (
					<Jobs
						onTabChange={(tab) =>
							setActiveTab(tab as "overview" | "why" | "jobs")
						}
					/>
				)}
			</div>

			{/* Departments Section - Always visible */}
			<Departments />
		</section>
	);
};

export default Overview;
