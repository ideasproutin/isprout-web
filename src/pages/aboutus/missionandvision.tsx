import { COLORS } from "../../helpers/constants/Colors";
import aboutUsData from "../../content/aboutus";

const MissionAndVision = () => {
	const { mission, vision } = aboutUsData.missionAndVision;
	return (
		<section className='w-full py-16 sm:py-20 lg:py-24 bg-gray-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
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
								MISSION
							</h3>
						</div>

							<div className='space-y-3 sm:space-y-4 w-full'>
								<h3
									className='text-xl sm:text-2xl lg:text-3xl font-bold text-center'
									style={{ fontFamily: "Outfit, sans-serif" }}
								>
									{mission.title}
								</h3>

								<div className='flex justify-center'>
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

								<p
									className='text-sm sm:text-base text-center leading-relaxed'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.textGray800,
									}}
								>
									{mission.description}
								</p>
							</div>
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
								VISION
							</h3>
						</div>

							<div className='space-y-3 sm:space-y-4 w-full'>
								<h3
									className='text-xl sm:text-2xl lg:text-3xl font-bold text-center'
									style={{ fontFamily: "Outfit, sans-serif" }}
								>
									{vision.title}
								</h3>

								<div className='flex justify-center'>
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

								<p
									className='text-sm sm:text-base text-center leading-relaxed'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.textGray800,
									}}
								>
									{vision.description}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MissionAndVision;
