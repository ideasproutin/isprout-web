import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Testimonials: React.FC = () => {
	const [currentTestimonial, setCurrentTestimonial] = useState(0);
	const navigate = useNavigate();

	const testimonials = [
		{
			name: "Sanda Anilvarma",
			location: "iSprout - SRESHTA MARVEL",
			text: "Solid coworking space with all of the essentials. Reliable internet, plenty of meeting rooms with flexible membership options and 24/7 access are much appreciated. The atmosphere is generally pleasant, though I wish there were more private phone booths. Overall, a fantastic place to get work done.",
			rating: 5,
		},
		{
			name: "Mukeshwaran Selvam",
			location: "iSprout",
			text: "Great Place to plug in, wonderful administrative and team. Fun, Friendly, Engaging, Rewarding, Collaborative, Flexible, Supportive, Exciting, and Professional. 100% recommended place for teams who's looking for office.",
			rating: 5,
		},
		{
			name: "Pavan Popuri",
			location: "iSprout - OGM",
			text: "We've had a great experience working from Isprout OGM. The interior is beautiful, modern, and very well designed. Facilities are excellent and thoughtfully maintained. A comfortable and inspiring environment for daily business work.",
			rating: 5,
		},
		{
			name: "Jayakumar Immanuel",
			location: "iSprout",
			text: "We appreciate the ongoing support and professionalism demonstrated by the Customer Experience (CX) team. Their regular engagement and prompt responsiveness reflect a strong commitment to service excellence. The team has been consistently accessible and proactive in addressing both routine operational needs and long-term issues, contributing to a smooth and efficient workplace environment.",
			rating: 5,
		},
		{
			name: "Arnab Pattanayak",
			location: "iSprout",
			text: "iSprout also stands out for its prime locations with easy accessibility and secure premises with proper access control. Overall, it provides a comfortable, safe, and highly productive environment for teams of all sizes, and I would highly recommend it to anyone looking for a quality managed office space.",
			rating: 5,
		},
		{
			name: "Mohit Dadhich",
			location: "iSprout",
			text: "Excellent workspace, service and overall coordination between the staff, which makes the work environment smooth, comfortable and highly professional...",
			rating: 5,
		},
		{
			name: "Garv puggal",
			location: "iSprout",
			text: "Had a great experience with iSprout as a managed office operator. The team is highly professional, responsive, and always willing to go the extra mile to ensure smooth operations. The office spaces are well‑designed, modern, and equipped with everything needed for a productive work environment.",
			rating: 5,
		},
	];

	// const nextTestimonial = () => {
	// 	setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
	// };

	// const prevTestimonial = () => {
	// 	setCurrentTestimonial(
	// 		(prev) => (prev - 1 + testimonials.length) % testimonials.length,
	// 	);
	// };

	// Auto-advance carousel every 5 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [testimonials.length]);

	return (
		<section className='relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-white overflow-hidden'>
			<div className='max-w-6xl mx-auto'>
				{/* Testimonials Heading */}
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

				{/* Testimonial Card with Stacked Cards */}
				<div className='relative flex items-center justify-center mb-8'>
					{/* Stacked Cards Container */}
					<div
						className='relative w-full max-w-4xl'
						style={{ height: "420px" }}
					>
						{/* Background Stacked Cards */}
						{testimonials.map((_, index) => {
							const diff = index - currentTestimonial;
							const normalizedDiff =
								Math.abs(diff) > 3
									? diff > 0
										? diff - testimonials.length
										: diff + testimonials.length
									: diff;

							// show only a few cards (current + 2 on each side)
							if (Math.abs(normalizedDiff) > 2) return null;

							// Horizontal stacking: cards layer left and right
							const transforms: Record<string, string> = {
								"-1": "translateX(-50px) scale(0.96)",
								"0": "translateX(0px) scale(1)",
								"1": "translateX(50px) scale(0.96)",
								"2": "translateX(100px) scale(0.92)",
							};

							const opacities: Record<string, number> = {
								"-2": 0.4,
								"-1": 0.7,
								"0": 1,
								"1": 0.7,
								"2": 0.4,
							};

							const zIndexes: Record<string, number> = {
								"-2": 10,
								"-1": 20,
								"0": 40,
								"1": 20,
								"2": 10,
							};

							return (
								<div
									key={index}
									className='absolute inset-0 bg-white rounded-3xl transition-all duration-500 ease-in-out'
									style={{
										transform:
											transforms[
												normalizedDiff.toString()
											] ?? transforms["0"],
										opacity:
											opacities[
												normalizedDiff.toString()
											] ?? 0.3,
										zIndex:
											zIndexes[
												normalizedDiff.toString()
											] ?? 10,
										boxShadow:
											normalizedDiff === 0
												? "0 25px 60px rgba(0,0,0,0.18)"
												: "0 18px 45px rgba(0,0,0,0.10)",
										border: "1px solid rgba(0,0,0,0.06)",
										padding: "48px",
										display: "flex",
										flexDirection: "column",
									}}
								>
									{/* Yellow Circle with Quote Icon (front card only) */}
									{normalizedDiff === 0 && (
										<div
											className='absolute left-10 -top-8 w-20 h-20 rounded-full flex items-center justify-center'
											style={{
												backgroundColor: "#FFDE00",
												boxShadow:
													"0 12px 28px rgba(0,0,0,0.15)",
											}}
										>
											<svg
												className='w-10 h-10'
												viewBox='0 0 24 24'
												fill='#00275c'
											>
												<path d='M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z' />
											</svg>
										</div>
									)}

									{/* Testimonial Text */}
									<div className='flex-1 pt-4'>
										<p
											className='text-lg leading-relaxed'
											style={{
												fontFamily:
													"Outfit, sans-serif",
												color: "#374151",
											}}
										>
											{testimonials[index].text}
										</p>
									</div>

									{/* Divider */}
									<div className='w-full h-px bg-gray-200 my-8' />

									{/* Author Info */}
									<div className='flex items-center gap-4'>
										<div
											className='w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl'
											style={{
												backgroundColor: "#FEF3C7",
												color: "#92400E",
											}}
										>
											{testimonials[index].name.charAt(0)}
										</div>

										<div>
											<h4
												className='font-semibold text-xl'
												style={{
													fontFamily:
														"Outfit, sans-serif",
													color: "#1F2937",
												}}
											>
												{testimonials[index].name}
											</h4>
											<p
												className='text-base'
												style={{
													fontFamily:
														"Outfit, sans-serif",
													color: "#9CA3AF",
												}}
											>
												{testimonials[index].location}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* View More Button */}
				<div className='flex justify-center'>
					<button
						onClick={() => navigate("/testimonials")}
						className='px-10 py-3 sm:px-12 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:opacity-90'
						style={{
							backgroundColor: "#2C3E50",
							color: "#ffffff",
							fontFamily: "Outfit, sans-serif",
						}}
					>
						View More
					</button>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
