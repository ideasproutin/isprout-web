import React from "react";
import { useNavigate } from "react-router-dom";

const Testimonials: React.FC = () => {
	const navigate = useNavigate();

	const testimonials = [
		{
			name: "Sanda Anilvarma",
			text: "Solid coworking space with all of the essentials. Reliable internet, plenty of meeting rooms with flexible membership options and 24/7 access are much appreciated.",
			rating: 5,
		},
		{
			name: "Mukeshwaran Selvam",
			text: "Great Place to plug in, wonderful administrative and team. Fun, Friendly, Engaging, Rewarding, Collaborative, Flexible, Supportive, Exciting, and Professional.",
			rating: 5,
		},
		{
			name: "Pavan Popuri",
			text: "We've had a great experience working from Isprout OGM. The interior is beautiful, modern, and very well designed. Facilities are excellent and thoughtfully maintained.",
			rating: 5,
		},
		{
			name: "Jayakumar Immanuel",
			text: "We appreciate the ongoing support and professionalism demonstrated by the Customer Experience team. Their regular engagement reflects a strong commitment to service excellence.",
			rating: 5,
		},
		{
			name: "Arnab Pattanayak",
			text: "iSprout stands out for its prime locations with easy accessibility and secure premises. It provides a comfortable, safe, and highly productive environment for teams of all sizes.",
			rating: 5,
		},
		{
			name: "Mohit Dadhich",
			text: "Excellent workspace, service and overall coordination between the staff, which makes the work environment smooth, comfortable and highly professional.",
			rating: 5,
		},
		{
			name: "Garv Puggal",
			text: "Had a great experience with iSprout as a managed office operator. The team is highly professional, responsive, and always willing to go the extra mile.",
			rating: 5,
		},
	];

	// Duplicate testimonials for seamless infinite scroll
	const duplicatedTestimonials = [...testimonials, ...testimonials];

	// Testimonial Card Component
	const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
		<div className='bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 shrink-0 w-[280px] sm:w-[320px] md:w-[350px] mx-2 sm:mx-3'>
			{/* Quote Icon */}
			<div
				className='w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4'
				style={{ backgroundColor: "#FFDE00" }}
			>
				<svg className='w-5 h-5 sm:w-6 sm:h-6' viewBox='0 0 24 24' fill='#00275c'>
					<path d='M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z' />
				</svg>
			</div>

			{/* Testimonial Text */}
			<p
				className='text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 min-h-[100px] sm:min-h-[120px]'
				style={{
					fontFamily: "Outfit, sans-serif",
					color: "#374151",
				}}
			>
				{testimonial.text}
			</p>

			{/* Author Info */}
			<div className='flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200'>
				<div
					className='w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg'
					style={{
						backgroundColor: "#FEF3C7",
						color: "#92400E",
					}}
				>
					{testimonial.name.charAt(0)}
				</div>
				<div>
					<h4
						className='font-semibold text-base sm:text-lg'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: "#1F2937",
						}}
					>
						{testimonial.name}
					</h4>
					<div className='flex gap-1 mt-1'>
						{[...Array(testimonial.rating)].map((_, i) => (
							<svg key={i} className='w-4 h-4' viewBox='0 0 20 20' fill='#FFDE00'>
								<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
							</svg>
						))}
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<>
			<style>{`
				@keyframes scroll-left {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}

				@keyframes scroll-right {
					0% {
						transform: translateX(-50%);
					}
					100% {
						transform: translateX(0);
					}
				}

				.animate-scroll-left {
					animation: scroll-left 30s linear infinite;
				}

				.animate-scroll-right {
					animation: scroll-right 30s linear infinite;
				}

				.scroll-container:hover .animate-scroll-left,
				.scroll-container:hover .animate-scroll-right {
					animation-play-state: paused;
				}
			`}</style>

			<section className='relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-white overflow-hidden'>
				<div className='max-w-7xl mx-auto'>
					{/* Heading */}
					<div className='text-center mb-12'>
						<p
							className='text-sm sm:text-base uppercase tracking-wide mb-4'
							style={{
								color: "#00275c",
								fontFamily: "Outfit, sans-serif",
							}}
						>
							TESTIMONIALS
						</p>
						<h2
							className='text-3xl sm:text-4xl md:text-5xl font-bold'
							style={{
								fontFamily: "Otomanopee One, sans-serif",
								color: "#00275c",
							}}
						>
							What People Say About Us
						</h2>
					</div>

					{/* Scrolling Row */}
					<div className='mb-12 relative'>
						
						{/* Scrolling Container */}
						<div className='scroll-container overflow-x-hidden overflow-y-visible flex items-start'>
							<div className='flex animate-scroll-left'>
								{duplicatedTestimonials.map((testimonial, index) => (
									<TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
								))}
							</div>
						</div>
					</div>

					{/* View More Button */}
					<div className='flex justify-center'>
						<button
							onClick={() => navigate("/testimonials")}
							className='px-10 py-3 sm:px-12 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:opacity-90'
							style={{
								backgroundColor: "#00275c",
								color: "#ffffff",
								fontFamily: "Outfit, sans-serif",
							}}
						>
							View More
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export default Testimonials;
