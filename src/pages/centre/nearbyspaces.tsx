import { useState } from "react";
import { useNavigate } from "react-router-dom";
import nearbyImage1 from "../../assets/centers/nearbyspaces1.png";
import nearbyImage2 from "../../assets/centers/nearbyspaces2.png";
import nearbyImage3 from "../../assets/centers/nearbyspaces3.png";
import circleLogo from "../../assets/awards_achievements/awards_circlelogo.png";
import { COLORS } from "../../helpers/constants/Colors";

const NearbySpaces = () => {
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState(0);

	const spaces = [
		{
			name: "Orbit",
			location: "Knowledge City, Hyderabad",
			image: nearbyImage1,
			redirect: "/centre/orbit",
		},
		{
			name: "My Home Twitza",
			location: "Hitec City, Hyderabad",
			image: nearbyImage2,
			redirect: "/centre/my-home-twitza",
		},
		{
			name: "Sohini Tech Park",
			location: "Financial District, Hyderabad",
			image: nearbyImage3,
			redirect: "/centre/sohini-tech-park",
		},
	];

	const handlePrevious = () => {
		setCurrentIndex((prev) => (prev === 0 ? spaces.length - 3 : prev - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prev) => (prev >= spaces.length - 3 ? 0 : prev + 1));
	};

	const handleViewOffice = (redirect: string) => {
		navigate(redirect);
	};

	return (
		<div className='w-full bg-[#f2f3c8] py-16 px-4 relative'>
			{/* Logo with black line in top left corner */}
			<div className='absolute top-8 left-8 flex items-center'>
				<div className='w-1 h-24 bg-black mr-4'></div>
				<img src={circleLogo} alt='Circle Logo' className='h-20' />
			</div>

			<div className='max-w-6xl mx-auto'>
				{/* Title */}
				<h2
					className='text-4xl font-bold mb-12 text-center'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: "#2C3E50",
					}}
				>
					Spaces That Inspire: Explore iSprout's Stunning Offices
				</h2>

				{/* Nearby Spaces Label - Left corner above first card */}
				<h3
					className='text-2xl font-bold mb-6'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: "#2C3E50",
					}}
				>
					Nearby Spaces
				</h3>

				{/* Cards Container */}
				<div className='relative'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{spaces
							.slice(currentIndex, currentIndex + 3)
							.map((space, index) => (
								<div key={index} className='group'>
									{/* Image Card */}
									<div className='relative rounded-2xl overflow-hidden shadow-lg h-64'>
										<img
											src={space.image}
											alt={space.name}
											className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
										/>
										{/* Dimensions badge (only for first card as per image) */}

										{/* View Office Button */}
										<button
											onClick={() =>
												handleViewOffice(space.redirect)
											}
											className='absolute bottom-4 right-4 px-6 py-2 rounded-full font-semibold text-sm transition-colors'
											style={{
												fontFamily:
													"Outfit, sans-serif",
												backgroundColor: "#F2C94C",
												color: COLORS.textBlack,
											}}
											onMouseEnter={(e) =>
												(e.currentTarget.style.backgroundColor =
													"#E5B945")
											}
											onMouseLeave={(e) =>
												(e.currentTarget.style.backgroundColor =
													"#F2C94C")
											}
										>
											view office
										</button>
									</div>

									{/* Text Content Below Image */}
									<div className='mt-4'>
										<h3
											className='text-xl font-bold mb-2'
											style={{
												fontFamily:
													"Outfit, sans-serif",
												color: "#2C3E50",
											}}
										>
											{space.name}
										</h3>
										<div className='flex items-center text-gray-600 text-sm'>
											<span className='mr-2'>📍</span>
											<span
												style={{
													fontFamily:
														"Outfit, sans-serif",
												}}
											>
												{space.location}
											</span>
										</div>
									</div>
								</div>
							))}
					</div>

					{/* Navigation Arrows */}
					<div className='flex items-center justify-center mt-12 space-x-4'>
						<button
							onClick={handlePrevious}
							className='w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors'
							aria-label='Previous'
							style={{ backgroundColor: COLORS.white }}
						>
							<span className='text-gray-600 text-xl'>‹</span>
						</button>

						{/* Progress bar */}
						<div className='w-64 h-2 bg-gray-300 rounded-full overflow-hidden'>
							<div
								className='h-full bg-[#00A8E8] transition-all duration-300'
								style={{
									width: `${((currentIndex + 1) / (spaces.length - 2)) * 100}%`,
								}}
							></div>
						</div>

						<button
							onClick={handleNext}
							className='w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors'
							aria-label='Next'
							style={{ backgroundColor: COLORS.white }}
						>
							<span className='text-gray-600 text-xl'>›</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NearbySpaces;
