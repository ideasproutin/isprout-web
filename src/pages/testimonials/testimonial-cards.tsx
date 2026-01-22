import { COLORS } from "../../helpers/constants/Colors";
import maleAvatar from "../../assets/testimonial-page/male-avatar.jpg";
import femaleAvatar from "../../assets/testimonial-page/female-avatar.jpg";

interface Testimonial {
	id: number;
	name: string;
	location: string;
	gender: "male" | "female";
	rating: number;
	review: string;
}

const testimonials: Testimonial[] = [
	{
		id: 1,
		name: "Sudhakar Kale",
		location: "iSprout Orbit",
		gender: "male",
		rating: 5,
		review:
			"iSprout is a fast growing and well operated Managed office provider. Their office staff is very friendly and efficient. Unique office themes, clean and well-maintained premises, top class amenities offer a very productive ambience. Our team loves it.",
	},
	{
		id: 2,
		name: "Venkata Narayana Pulumati",
		location: "iSprout Orbit",
		gender: "male",
		rating: 5,
		review:
			"Using the iSprout co-working space near my home has been great. Convenient proximity to my clients, superior security and housekeeping ensuring safety and cleanliness along with excellent interior design and amenities create a comfortable and productive workspace.",
	},
	{
		id: 3,
		name: "Priyanka Bakshi",
		location: "iSprout Orbit",
		gender: "female",
		rating: 5,
		review:
			"Our experience with iSprout in providing managed office space for Ngenue has been nothing short of exceptional! iSprout's grid of services are perfectly suited to the diverse needs of businesses, and their office space management is second to none.",
	},
	{
		id: 4,
		name: "Vinay Varma",
		location: "iSprout Purva Summit",
		gender: "male",
		rating: 5,
		review:
			"We've been working at iSprout for a little more than three years. They have everything you need to work efficiently, from dedicated desks and meeting rooms to comfy breakout areas and a game room for breaks. Plus, the staff is super friendly and helpful.",
	},
	{
		id: 5,
		name: "R Gopalakrishnan",
		location: "iSprout Purva Summit",
		gender: "male",
		rating: 5,
		review:
			"As part of the SLP-Hyderabad 2022 Cohort, we met at the iSprout facility. I am still amazed at the facility layout. It is a beautiful, well-lit, and well-structured facility with various seating configurations. The thought-provoking posters, smiling and helpful staff make it perfect.",
	},
	{
		id: 6,
		name: "Krishna Nag",
		location: "iSprout - SRESHTA MARVEL",
		gender: "male",
		rating: 5,
		review:
			"I've been using this coworking space for the past six months, and it has exceeded my expectations in every way. Top-notch facilities, lightning-fast internet speed makes the atmosphere both professional and welcoming. The community here is incredible – I've made valuable connections.",
	},
	{
		id: 7,
		name: "Lokesh Rahul",
		location: "iSprout - SRESHTA MARVEL",
		gender: "male",
		rating: 5,
		review:
			"The best coworking space I've ever been to! The community managers are always on top of things, ensuring that everyone is comfortable and has everything they require. Smart office layout, lots of natural light, ergonomic furniture also exceptionally clean and well-kept.",
	},
	{
		id: 8,
		name: "Sanda Anilvarma",
		location: "iSprout - SRESHTA MARVEL",
		gender: "male",
		rating: 5,
		review:
			"Solid coworking space with all of the essentials. Reliable internet, plenty of meeting rooms with flexible membership options and 24/7 access are much appreciated. The atmosphere is generally pleasant. Overall, a fantastic place to get work done.",
	},
	{
		id: 9,
		name: "Soumya Brata Sandha",
		location: "iSprout - SRESHTA MARVEL",
		gender: "female",
		rating: 5,
		review:
			"Great coworking space with lot of perks. Inspiring environment, modern and stylish design and the plenty of events and workshops to attend is a welcome bonus. The only downside is that it can get quite noisy during peak hours, but overall, it's a fantastic place to work.",
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
							<div className='flex items-start gap-4 mb-4'>
								{/* Avatar */}
								<div className='shrink-0'>
									<img
										src={
											testimonial.gender === "male"
												? maleAvatar
												: femaleAvatar
										}
										alt={testimonial.name}
										className='w-14 h-14 rounded-full object-cover ring-2 ring-gray-200'
									/>
								</div>

								{/* Name and Location */}
								<div className='flex-1'>
									<h3
										className='font-bold text-lg mb-1'
										style={{ color: COLORS.brandBlue }}
									>
										{testimonial.name}
									</h3>
									<p
										className='text-sm'
										style={{ color: COLORS.brandBlue, opacity: 0.7 }}
									>
										{testimonial.location}
									</p>
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
