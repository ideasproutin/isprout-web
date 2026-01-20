import { useState } from "react";
import { Highlights } from "./highlights";
import leaderImage from "../../assets/careers/sundari patibandla.png";
import lifeImage1 from "../../assets/lifeatisprout/lifeatisprout1.jpg";
import lifeImage2 from "../../assets/lifeatisprout/lifeatisprout2.jpg";
import lifeImage3 from "../../assets/lifeatisprout/lifeatisprout3.jpg";
import lifeImage4 from "../../assets/lifeatisprout/lifeatisprout4.jpg";
import lifeImage5 from "../../assets/lifeatisprout/lifeatisprout5.jpg";
import lifeImage6 from "../../assets/lifeatisprout/lifeatisprout6.png";
import lifeImage7 from "../../assets/lifeatisprout/lifeatisprout7.png";
import lifeImage8 from "../../assets/lifeatisprout/lifeatisprout8.jpg";
import { COLORS } from "../../helpers/constants/Colors";

export function WhyISprout() {
	const [lifeImagesPage, setLifeImagesPage] = useState(0);
	const [benefitsPage, setBenefitsPage] = useState(0);

	const lifeImages = [
		lifeImage1,
		lifeImage2,
		lifeImage3,
		lifeImage4,
		lifeImage5,
		lifeImage6,
		lifeImage7,
		lifeImage8,
	];

	const allBenefits = [
		{
			title: "Health Insurance Coverage",
			icon: () => (
				<svg width='42' height='42' viewBox='0 0 42 42' fill='none'>
					<rect
						x='3'
						y='3'
						width='36'
						height='36'
						rx='4'
						stroke='black'
						strokeWidth='2'
						fill='none'
					/>
					<path
						d='M21 10V32M10 21H32'
						stroke='black'
						strokeWidth='3'
						strokeLinecap='round'
					/>
					<circle cx='21' cy='21' r='6' fill='black' />
				</svg>
			),
			circleColor: "#FFDE00",
		},
		{
			title: "Professional Growth Support",
			icon: () => (
				<svg width='42' height='42' viewBox='0 0 42 42' fill='none'>
					<path
						d='M21 4L25 14L36 16L28 24L30 35L21 30L12 35L14 24L6 16L17 14L21 4Z'
						fill='#353534'
					/>
					<circle cx='21' cy='18' r='4' fill='#FFDE00' />
				</svg>
			),
			circleColor: "#00275c",
		},
		{
			title: "Employee Recognition Programs",
			icon: () => (
				<svg width='42' height='50' viewBox='0 0 42 50' fill='none'>
					<circle
						cx='21'
						cy='12'
						r='10'
						stroke='black'
						strokeWidth='2'
						fill='none'
					/>
					<path
						d='M21 8L23 14L29 15L24 19L25 25L21 22L17 25L18 19L13 15L19 14L21 8Z'
						fill='black'
					/>
					<path d='M8 50L12 32L21 36L30 32L34 50H8Z' fill='black' />
				</svg>
			),
			circleColor: "#00275c",
		},
		{
			title: "Learning & Development",
			icon: () => (
				<svg width='44' height='31' viewBox='0 0 44 31' fill='none'>
					<rect
						x='2'
						y='2'
						width='40'
						height='27'
						rx='2'
						stroke='black'
						strokeWidth='2'
						fill='none'
					/>
					<path
						d='M8 10H36M8 15H36M8 20H28'
						stroke='black'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
			),
			circleColor: "#FFDE00",
		},
		{
			title: "Flexible Work Hours",
			icon: () => (
				<svg width='40' height='40' viewBox='0 0 40 40' fill='none'>
					<circle
						cx='20'
						cy='20'
						r='18'
						stroke='black'
						strokeWidth='2'
						fill='none'
					/>
					<path
						d='M20 8L20 20L28 24'
						stroke='black'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
			),
			circleColor: "#FFDE00",
		},
		{
			title: "Team Building Activities",
			icon: () => (
				<svg width='45' height='35' viewBox='0 0 45 35' fill='none'>
					<circle cx='15' cy='10' r='6' fill='black' />
					<circle cx='30' cy='10' r='6' fill='black' />
					<path d='M8 35Q8 20 15 20Q22 20 22 35Z' fill='black' />
					<path d='M23 35Q23 20 30 20Q37 20 37 35Z' fill='black' />
				</svg>
			),
			circleColor: "#00275c",
		},
		{
			title: "Wellness Programs",
			icon: () => (
				<svg width='36' height='40' viewBox='0 0 36 40' fill='none'>
					<path
						d='M18 38C18 38 4 28 4 16C4 8 10 4 18 8C26 4 32 8 32 16C32 28 18 38 18 38Z'
						fill='black'
					/>
				</svg>
			),
			circleColor: "#00275c",
		},
		{
			title: "Career Advancement",
			icon: () => (
				<svg width='40' height='40' viewBox='0 0 40 40' fill='none'>
					<path d='M8 32L20 8L32 32L20 24L8 32Z' fill='black' />
					<circle cx='20' cy='12' r='3' fill='black' />
				</svg>
			),
			circleColor: "#FFDE00",
		},
	];

	// Get current page items (4 items per page)
	const currentLifeImages = lifeImages.slice(
		lifeImagesPage * 4,
		(lifeImagesPage + 1) * 4,
	);
	const currentBenefits = allBenefits.slice(
		benefitsPage * 4,
		(benefitsPage + 1) * 4,
	);

	const toggleLifeImagesPage = () => {
		setLifeImagesPage(lifeImagesPage === 0 ? 1 : 0);
	};

	const toggleBenefitsPage = () => {
		setBenefitsPage(benefitsPage === 0 ? 1 : 0);
	};

	return (
		<section
			className='py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-16 lg:py-20'
			style={{ backgroundColor: COLORS.white }}
		>
			<div className='max-w-7xl mx-auto'>
				<div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
					{/* Main Content */}
					<div className='flex-1'>
						{/* Message By Leader Section */}
						<div className='mb-10 sm:mb-12 md:mb-16'>
							<h3
								className='text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 font-bold'
								style={{
									color: COLORS.textBlack,
									fontFamily: "Outfit, sans-serif",
								}}
							>
								Message By{" "}
								<span
									className='text-[#FFDE00]'
									style={{
										fontFamily:
											"'Otomanopee One', sans-serif",
									}}
								>
									Leader
								</span>
							</h3>

							<div className='flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-start relative'>
								{/* Leader Image */}
								<div className='shrink-0 rounded-xl shadow-[5px_5px_4px_0px_rgba(0,0,0,0.25)]'>
									<img
										src={leaderImage}
										alt='Leader'
										className='w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-xl'
									/>
								</div>

								{/* Decorative Quote Mark */}
								<div className='hidden sm:block absolute left-[150px] sm:left-[160px] md:left-[180px] -top-2.5 w-[50px] h-[45px] sm:w-[60px] sm:h-[55px] md:w-[69px] md:h-[60px] opacity-50'>
									<svg
										viewBox='0 0 69 60'
										fill='none'
										className='w-full h-full'
									>
										<path
											d='M0 60V30Q0 10 15 5Q10 15 15 25H30V60H0ZM39 60V30Q39 10 54 5Q49 15 54 25H69V60H39Z'
											fill='black'
											fillOpacity='0.5'
										/>
									</svg>
								</div>

								{/* Message Text */}
								<div className='flex-1 pt-4 sm:pt-6 md:pt-8'>
									<p
										className='text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									>
										We are team iSprout. We're a bunch of
										dreamers and doers who believe that
										workspaces should be anything but
										boring. We're on a mission to create
										offices that people actually look
										forward to coming to every day.
									</p>
								</div>
							</div>
						</div>

						{/* Life At iSprout Section */}
						<div className='mb-16 relative'>
							<h3
								className='text-4xl mb-12 font-bold text-center'
								style={{
									color: COLORS.textBlack,
									fontFamily: "Outfit, sans-serif",
								}}
							>
								Life At{" "}
								<span
									className='text-[#FFDE00]'
									style={{
										fontFamily:
											"'Otomanopee One', sans-serif",
									}}
								>
									iSprout
								</span>
							</h3>

							{/* Image Grid with pagination */}
							<div className='relative pr-16'>
								<div className='overflow-hidden'>
									<div
										className='grid grid-cols-2 gap-6 transition-transform duration-500 ease-in-out'
										key={lifeImagesPage}
									>
										{currentLifeImages.map((img, index) => (
											<div
												key={`${lifeImagesPage}-${index}`}
												className={`rounded-xl shadow-[3px_-7px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden ${
													index === 0 || index === 3
														? "h-[199px]"
														: index === 1 ||
															  index === 2
															? "h-48"
															: "h-[199px]"
												}`}
												style={{
													animation:
														"slideIn 0.5s ease-in-out",
												}}
											>
												<img
													src={img}
													alt={`Life at iSprout ${
														index + 1
													}`}
													className='w-full h-full object-cover'
												/>
											</div>
										))}
									</div>
								</div>

								{/* Arrow Navigation on Teal Circle */}
								<button
									onClick={toggleLifeImagesPage}
									className='absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#00275c] rounded-full flex items-center justify-center hover:bg-[#163542] transition-colors shadow-lg'
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
										className={`transition-transform duration-300 ${
											lifeImagesPage === 1
												? "rotate-180"
												: ""
										}`}
									>
										<polyline points='9 18 15 12 9 6'></polyline>
									</svg>
								</button>
							</div>
						</div>

						{/* Benefits At iSprout Section */}
						<div className='mb-12 relative'>
							<h3
								className='text-4xl mb-12 font-bold text-center'
								style={{
									color: COLORS.textBlack,
									fontFamily: "Outfit, sans-serif",
								}}
							>
								Benefits At{" "}
								<span
									className='text-[#FFDE00]'
									style={{
										fontFamily:
											"'Otomanopee One', sans-serif",
									}}
								>
									iSprout
								</span>
							</h3>

							{/* Benefits Grid with pagination */}
							<div className='relative pr-20'>
								<div className='overflow-visible'>
									<div
										className='grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 px-8 transition-transform duration-500 ease-in-out'
										key={benefitsPage}
									>
										{currentBenefits.map(
											(benefit, index) => (
												<div
													key={`${benefitsPage}-${index}`}
													className='relative'
													style={{
														animation:
															"slideIn 0.5s ease-in-out",
													}}
												>
													{/* Benefit Card */}
													<div className='bg-[rgba(217,217,217,0.32)] rounded-[20px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] p-6 h-[180px] flex flex-col items-center justify-center hover:shadow-2xl hover:scale-105 transition-all duration-300'>
														<div className='mb-4'>
															{benefit.icon()}
														</div>
														<p
															className='text-center text-xl font-medium'
															style={{
																fontFamily:
																	"Outfit, sans-serif",
																color: COLORS.textBlack,
															}}
														>
															{benefit.title}
														</p>
													</div>
												</div>
											),
										)}
									</div>
								</div>

								{/* Arrow Navigation on Teal Circle */}
								<button
									onClick={toggleBenefitsPage}
									className='absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#00275c] rounded-full flex items-center justify-center hover:bg-[#163542] transition-colors shadow-lg'
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
										className={`transition-transform duration-300 ${
											benefitsPage === 1
												? "rotate-180"
												: ""
										}`}
									>
										<polyline points='9 18 15 12 9 6'></polyline>
									</svg>
								</button>
							</div>
						</div>
					</div>

					{/* Fixed Highlights Sidebar */}
					<div className='lg:sticky lg:top-8 lg:self-start w-full lg:w-auto relative'>
						<Highlights />
					</div>
				</div>
			</div>

			{/* CSS for slide-in animation */}
			<style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
		</section>
	);
}
