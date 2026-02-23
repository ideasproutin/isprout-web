import { COLORS } from "../../helpers/constants/Colors";
import RoundedHexagon from "../../components/RoundedHexagon/RoundedHexagon";
import aboutUsData from "../../content/aboutus.json";
import { useAboutUs } from "../../hooks/useAboutUs";

const MissionAndVision = () => {
	const { data: aboutUsApiData } = useAboutUs();
	const { mission, vision, values } =
		aboutUsApiData?.missionAndVision || aboutUsData.missionAndVision;
	return (
		<section
			id='mission-vision'
			className='w-full py-16 sm:py-20 lg:py-24 bg-gray-50'
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Heading */}
				<h2
					className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 lg:mb-20'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.brandBlue,
					}}
				>
					Our Core Values
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12'>
					{/* MISSION CARD */}
					<div className='relative bg-white rounded-2xl shadow-lg overflow-hidden'>
						{/* Top Colored Section with Title */}
						<div
							className='relative h-40 sm:h-48 flex items-center justify-center'
							style={{
								background: `linear-gradient(135deg, ${COLORS.brandBlue} 0%, #003a7d 100%)`,
							}}
						>
							<h3
								className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								{mission.title}
							</h3>
						</div>
						{/* Hexagon Bridge */}
						<div className='absolute left-1/2 transform -translate-x-1/2 top-24 sm:top-32'>
							<RoundedHexagon
								size={112}
								innerColor={COLORS.brandBlue}
								icon={
									<svg
										className='w-12 h-12'
										viewBox='0 0 48 48'
										fill='none'
									>
										<circle
											cx='24'
											cy='24'
											r='20'
											stroke='white'
											strokeWidth='2.5'
										/>
										<circle
											cx='24'
											cy='24'
											r='14'
											stroke='white'
											strokeWidth='2.5'
										/>
										<circle
											cx='24'
											cy='24'
											r='8'
											stroke='white'
											strokeWidth='2.5'
										/>
										<circle
											cx='24'
											cy='24'
											r='3'
											fill='white'
										/>
									</svg>
								}
							/>
						</div>
						{/* Bottom Content Area */}
						<div className='pt-20 sm:pt-16 pb-8 px-6 sm:px-8'>
							<p
								className='text-sm sm:text-base text-center leading-relaxed text-gray-700'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								{mission.description}
							</p>
						</div>
					</div>
					{/* VISION CARD */}
					<div className='relative bg-white rounded-2xl shadow-lg overflow-hidden'>
						{/* Top Colored Section with Title */}
						<div
							className='relative h-40 sm:h-48 flex items-center justify-center'
							style={{
								background: `linear-gradient(135deg, ${COLORS.brandYellow} 0%, #ffd700 100%)`,
							}}
						>
							<h3
								className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								{vision.title}
							</h3>
						</div>
						{/* Hexagon Bridge */}
						<div className='absolute left-1/2 transform -translate-x-1/2 top-24 sm:top-32'>
							<RoundedHexagon
								size={112}
								innerColor={COLORS.brandYellow}
								icon={
									<svg
										className='w-12 h-12'
										viewBox='0 0 48 48'
										fill='none'
									>
										<path
											d='M24 14C15 14 7.73 19.11 4 26.5C7.73 33.89 15 39 24 39C33 39 40.27 33.89 44 26.5C40.27 19.11 33 14 24 14Z'
											stroke='white'
											strokeWidth='2.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<circle
											cx='24'
											cy='26.5'
											r='6'
											stroke='white'
											strokeWidth='2.5'
										/>
										<circle
											cx='24'
											cy='26.5'
											r='3'
											fill='white'
										/>
									</svg>
								}
							/>
						</div>
						{/* Bottom Content Area */}
						<div className='pt-20 sm:pt-16 pb-8 px-6 sm:px-8'>
							<p
								className='text-sm sm:text-base text-center leading-relaxed text-gray-700'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								{vision.description}
							</p>
						</div>
					</div>
					{/* VALUES CARD */}
					<div className='relative bg-white rounded-2xl shadow-lg overflow-hidden'>
						{/* Top Colored Section with Title */}
						<div
							className='relative h-40 sm:h-48 flex items-center justify-center'
							style={{
								background: `linear-gradient(135deg, #10b981 0%, #059669 100%)`,
							}}
						>
							<h3
								className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								{values.title}
							</h3>
						</div>
						{/* Hexagon Bridge */}
						<div className='absolute left-1/2 transform -translate-x-1/2 top-24 sm:top-32'>
							<RoundedHexagon
								size={112}
								innerColor='#10b981'
								icon={
									<svg
										className='w-12 h-12'
										viewBox='0 0 48 48'
										fill='none'
									>
										<path
											d='M24 8L30 20H18L24 8Z'
											stroke='white'
											strokeWidth='2.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M12 24L18 36L6 36L12 24Z'
											stroke='white'
											strokeWidth='2.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M36 24L42 36L30 36L36 24Z'
											stroke='white'
											strokeWidth='2.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<circle
											cx='24'
											cy='28'
											r='4'
											fill='white'
										/>
									</svg>
								}
							/>
						</div>
						{/* Bottom Content Area */}
						<div className='pt-20 sm:pt-16 pb-8 px-6 sm:px-8'>
							<p
								className='text-sm sm:text-base text-center leading-relaxed text-gray-700'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								{values.description}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MissionAndVision;
