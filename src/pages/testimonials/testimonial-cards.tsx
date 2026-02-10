import { COLORS } from "../../helpers/constants/Colors";

interface Testimonial {
	id: number;
	name: string;
	rating: number;
	review: string;
}

const testimonials: Testimonial[] = [
	{
		id: 1,
		name: "Arnab Pattanayak",
		rating: 5,
		review:
			"iSprout also stands out for its prime locations with easy accessibility and secure premises with proper access control. Overall, it provides a comfortable, safe, and highly productive environment for teams of all sizes, and I would highly recommend it to anyone looking for a quality managed office space.",
	},
	{
		id: 2,
		name: "Mohit Dadhich",
		rating: 5,
		review:
			"Excellent workspace, service and overall coordination between the staff, which makes the work environment smooth, comfortable and highly professional...",
	},
	{
		id: 3,
		name: "Garv Puggal",
		rating: 5,
		review:
			"Had a great experience with iSprout as a managed office operator. The team is highly professional, responsive, and always willing to go the extra mile to ensure smooth operations. The office spaces are well‑designed, modern, and equipped with everything needed for a productive work environment.",
	},
	{
		id: 4,
		name: "Jayakumar Immanuel",
		rating: 5,
		review:
			"We appreciate the ongoing support and professionalism demonstrated by the Customer Experience (CX) team. Their regular engagement and prompt responsiveness reflect a strong commitment to service excellence. The team has been consistently accessible and proactive in addressing both routine operational needs and long-term issues, contributing to a smooth and efficient workplace environment.",
	},
	{
		id: 5,
		name: "Poulomi Goswami",
		rating: 5,
		review:
			"Our experience has been very good. The office space is well maintained, professional, and comfortable. The support staff is helpful and responsive, and the overall working environment is positive and corporate-friendly. Highly recommended coworking space.",
	},
	{
		id: 6,
		name: "Divyansh Dubey",
		rating: 5,
		review:
			"The office building offers an exceptional balance of functionality and modern design. The spacious, well-lit interiors provide a conducive environment for productivity, while the thoughtful layout fosters collaboration across teams. The building is equipped with state-of-the-art amenities, including high-speed elevators, eco-friendly lighting, and a comfortable break area that helps employees recharge.",
	},
	{
		id: 7,
		name: "Vinay Varma",
		rating: 5,
		review:
			"After almost 5 years at iSprout, what continues to impress is operational reliability and a genuinely supportive on site team. The workspace mix, dedicated desks, meeting rooms, and informal breakout areas with games works well for both focus and collaboration. Resource booking is straightforward thanks to the app for conference rooms and so on, which helps us plan time and costs better.",
	},
	{
		id: 8,
		name: "Abdul Rahim",
		rating: 5,
		review:
			"The facilities were top-notch and the ambience was great, providing a comfortable and productive work environment. The space was well-lit and had a good amount of seating options, making it easy to find a spot to work. Overall, I had a fantastic experience and would highly recommend this coworking space to anyone looking for a professional and welcoming work environment.",
	},
];

const TestimonialCards = () => {
	return (
		<section
			className='py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16'
			style={{ backgroundColor: COLORS.white }}
		>
			<div className='max-w-7xl mx-auto'>
				{/* Section Header */}
				<div className='text-center mb-12 md:mb-16'>
					<p
						className='text-lg md:text-xl mb-2'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.brandBlue,
							fontWeight: 500,
						}}
					>
						Our Success Stories
					</p>
					<h2
						className='text-3xl md:text-4xl lg:text-5xl font-bold'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.brandBlue,
						}}
					>
						What The People Think About Us
					</h2>
				</div>

				{/* Testimonials Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
					{testimonials.map((testimonial) => (
						<div
							key={testimonial.id}
							className='bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 border border-gray-100'
							style={{
								fontFamily: "Outfit, sans-serif",
							}}
						>
							{/* Header with Avatar and Info */}
							<div className='flex items-center gap-4 mb-4'>
								{/* Avatar - First Letter */}
								<div className='shrink-0'>
									<div
										className='w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl'
										style={{
											backgroundColor: "#FEF3C7",
											color: "#92400E",
										}}
									>
										{testimonial.name.charAt(0)}
									</div>
								</div>

								{/* Name */}
								<div className='flex-1'>
									<h3
										className='font-bold text-lg mb-1'
										style={{ color: COLORS.brandBlue }}
									>
										{testimonial.name}
									</h3>
								</div>

								{/* Quote Icon */}
								<div className='shrink-0'>
									<svg
										className='w-8 h-8 opacity-30'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M10 8C10 5.79086 8.20914 4 6 4C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12C6.34764 12 6.68389 11.9543 7.00303 11.8699C6.93524 12.5498 6.72602 13.1964 6.34164 13.7803C5.70823 14.7186 4.66667 15.4544 3 15.9999L3.72108 18C7.5 16.5 10 14.5 10 11V8Z'
											fill={COLORS.brandYellow}
										/>
										<path
											d='M22 8C22 5.79086 20.2091 4 18 4C15.7909 4 14 5.79086 14 8C14 10.2091 15.7909 12 18 12C18.3476 12 18.6839 11.9543 19.003 11.8699C18.9352 12.5498 18.726 13.1964 18.3416 13.7803C17.7082 14.7186 16.6667 15.4544 15 15.9999L15.7211 18C19.5 16.5 22 14.5 22 11V8Z'
											fill={COLORS.brandYellow}
										/>
									</svg>
								</div>
							</div>

							{/* Rating Stars */}
							<div className='flex gap-1 mb-4'>
								{[...Array(testimonial.rating)].map((_, index) => (
									<svg
										key={index}
										className='w-5 h-5'
										fill={COLORS.brandYellow}
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>
								))}
							</div>

							{/* Review Text */}
							<p
								className='text-sm leading-relaxed'
								style={{ color: COLORS.brandBlue, opacity: 0.8 }}
							>
								{testimonial.review}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TestimonialCards;
