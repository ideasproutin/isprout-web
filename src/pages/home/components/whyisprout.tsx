import React, { useState } from "react";
import { LayoutGrid, Users, MapPin, Settings } from "lucide-react";
import { COLORS } from "../../../helpers/constants/Colors";

// Import background images
import flexibleSolutionsImg from "../../../assets/homepage/home_hero5.jpg";
import collaborativeImg from "../../../assets/homepage/home_hero4.jpg";
import primeLocationsImg from "../../../assets/homepage/home_hero3.jpg";
import tailoredServicesImg from "../../../assets/homepage/home_hero2.jpg";

interface FeatureCard {
	icon: React.ReactNode;
	title: string;
	description: string;
	backgroundImage: string;
}

const WhyiSprout: React.FC = () => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const features: FeatureCard[] = [
		{
			icon: <LayoutGrid className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: COLORS.brandBlue }} />,
			title: "Flexible Solutions",
			description:
				"Workspaces that scale with your team, whether you are growing fast or stabilizing operations.",
			backgroundImage: flexibleSolutionsImg,
		},
		{
			icon: <Users className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: COLORS.brandBlue }} />,
			title: "Collaborative Environment",
			description:
				"Thoughtfully designed spaces that encourage focus, teamwork, and idea exchange.",
			backgroundImage: collaborativeImg,
		},
		{
			icon: <MapPin className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: COLORS.brandBlue }} />,
			title: "Prime Locations",
			description:
				"Offices situated in well-connected commercial and IT hubs across major cities.",
			backgroundImage: primeLocationsImg,
		},
		{
			icon: <Settings className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: COLORS.brandBlue }} />,
			title: "Tailored Services",
			description:
				"End-to-end operational support designed around how your team works.",
			backgroundImage: tailoredServicesImg,
		},
	];

	return (
		<section
			className='relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-linear-to-b from-yellow-50 via-white to-yellow-50'
			style={{ fontFamily: "Outfit, sans-serif" }}
		>
			<div className='max-w-7xl mx-auto'>
				{/* Heading */}
				<div className='flex justify-center mb-12 sm:mb-16 md:mb-20'>
					<h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center max-w-5xl px-4'>
						Why{" "}
						<span
							style={{
								fontFamily: "Otomanopee One, sans-serif",
								color: "#FFDE00",
							}}
						>
							iSprout
						</span>
						? Because You Deserve a Space That Inspires.
					</h2>
				</div>

				{/* Feature Cards Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
					{features.map((feature, index) => (
						<div 
							key={index} 
							className='relative'
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
						>
							{/* Card with CSS background */}
							<div
								className='relative h-full rounded-3xl shadow-lg border-2 border-gray-200 overflow-hidden transition-all duration-500 ease-in-out'
								style={{ backgroundColor: COLORS.white }}
							>
								{/* Background Image - shown on hover */}
								<div 
									className='absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out'
									style={{
										backgroundImage: `url(${feature.backgroundImage})`,
										opacity: hoveredIndex === index ? 1 : 0,
									}}
								/>
								
								{/* Dark overlay for readability on hover */}
								<div 
									className='absolute inset-0 bg-gray-800 transition-opacity duration-500 ease-in-out'
									style={{
										opacity: hoveredIndex === index ? 0.6 : 0,
									}}
								/>

								<div className='relative pt-8 px-6 pb-6 sm:pt-10 sm:px-8 sm:pb-8 flex flex-col items-center text-center h-full z-10'>
									{/* Icon with circle background */}
									<div className='relative mb-4 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-transform duration-500 ease-in-out'
										style={{
											transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
										}}
									>
										<svg
											className='absolute inset-0 w-full h-full'
											viewBox='0 0 100 100'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<circle
												cx='50'
												cy='50'
												r='48'
												fill='#FFDE00'
											/>
										</svg>
										<div className='relative z-10'>
											{feature.icon}
										</div>
									</div>

									{/* Title */}
									<h3
										className='text-base sm:text-lg font-bold mb-2 sm:mb-3 whitespace-nowrap transition-colors duration-500'
										style={{ 
											color: hoveredIndex === index ? '#FFFFFF' : COLORS.textBlack 
										}}
									>
										{feature.title}
									</h3>

									{/* Description */}
									<p 
										className='text-xs sm:text-sm leading-relaxed transition-colors duration-500'
										style={{
											color: hoveredIndex === index ? '#FFFFFF' : '#374151'
										}}
									>
										{feature.description}
									</p>
								</div>
							</div>

							{/* Number overlay at bottom */}
							<div className='absolute -bottom-12 left-4 transform -translate-x-1/2 z-10'>
								<div className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center'>
									<span
										className='text-5xl sm:text-6xl md:text-7xl font-bold'
										style={{
											color: "#FFDE00",
											textShadow:
												"2px 2px 4px rgba(0, 0, 0, 0.1)",
											fontFamily: "Outfit, sans-serif",
										}}
									>
										{String(index + 1).padStart(2, "0")}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Extra spacing for numbers */}
				<div className='h-12 sm:h-16'></div>
			</div>
		</section>
	);
};

export default WhyiSprout;
