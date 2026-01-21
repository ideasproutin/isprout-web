import { COLORS } from "../../helpers/constants/Colors";

const MissionAndVision = () => {
	return (
		<section
			className='relative w-full py-12 sm:py-16 lg:py-20'
			style={{ backgroundColor: COLORS.brandBlue }}
		>
			{/* Decorative circles */}
			<div
				className='absolute -top-6 sm:-top-8 right-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full'
				style={{ backgroundColor: COLORS.brandYellow }}
			/>
			<div
				className='absolute -bottom-6 sm:-bottom-8 left-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full z-10'
				style={{ backgroundColor: COLORS.brandYellow }}
			/>

			{/* ✅ SINGLE SOURCE OF HORIZONTAL ALIGNMENT */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12'>
					{/* MISSION CARD */}
					<div className='relative'>
						<div
							className='absolute inset-0 rounded-3xl translate-y-3 sm:translate-y-4'
							style={{ backgroundColor: COLORS.brandYellow }}
						/>

						<div
							className='relative rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg h-full flex items-center'
							style={{ backgroundColor: COLORS.white }}
						>
							<div
								className='absolute -top-4 sm:-top-6 right-6 sm:right-8 w-12 sm:w-16 h-10 sm:h-12'
								style={{
									clipPath:
										"polygon(0 0, 100% 0, 100% 50%, 70% 50%, 50% 100%, 30% 50%, 0 50%)",
									backgroundColor: COLORS.brandYellow,
								}}
							/>

							<div className='space-y-3 sm:space-y-4 w-full'>
								<h3
									className='text-xl sm:text-2xl lg:text-3xl font-bold text-center'
									style={{ fontFamily: "Outfit, sans-serif" }}
								>
									MISSION
								</h3>

								<div className='flex justify-center'>
									<svg
										className='w-10 h-10 sm:w-12 sm:h-12'
										viewBox='0 0 48 48'
										fill='none'
									>
										<circle
											cx='24'
											cy='24'
											r='22'
											stroke={COLORS.brandBlue}
											strokeWidth='2'
										/>
										<circle
											cx='24'
											cy='24'
											r='16'
											stroke={COLORS.brandBlue}
											strokeWidth='2'
										/>
										<circle
											cx='24'
											cy='24'
											r='10'
											stroke={COLORS.brandBlue}
											strokeWidth='2'
										/>
										<circle
											cx='24'
											cy='24'
											r='4'
											fill={COLORS.brandBlue}
										/>
									</svg>
								</div>

								<p
									className='text-sm sm:text-base text-center leading-relaxed'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.textGray800,
									}}
								>
									Our mission is simple — to create workspaces
									that inspire, energize, and empower. We
									believe that when you love where you work,
									amazing things happen.
								</p>
							</div>
						</div>
					</div>

					{/* VISION CARD */}
					<div className='relative'>
						<div
							className='absolute inset-0 rounded-3xl translate-y-3 sm:translate-y-4'
							style={{ backgroundColor: COLORS.brandYellow }}
						/>

						<div
							className='relative rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg h-full flex items-center'
							style={{ backgroundColor: COLORS.white }}
						>
							<div
								className='absolute -top-4 sm:-top-6 right-6 sm:right-8 w-12 sm:w-16 h-10 sm:h-12'
								style={{
									clipPath:
										"polygon(0 0, 100% 0, 100% 50%, 70% 50%, 50% 100%, 30% 50%, 0 50%)",
									backgroundColor: COLORS.brandYellow,
								}}
							/>

							<div className='space-y-3 sm:space-y-4 w-full'>
								<h3
									className='text-xl sm:text-2xl lg:text-3xl font-bold text-center'
									style={{ fontFamily: "Outfit, sans-serif" }}
								>
									VISION
								</h3>

								<div className='flex justify-center'>
									<svg
										className='w-10 h-10 sm:w-12 sm:h-12'
										viewBox='0 0 48 48'
										fill='none'
									>
										<path
											d='M24 6C18.477 6 14 10.477 14 16C14 19.5 15.5 22.6 18 24.5V30C18 31.1 18.9 32 20 32H28C29.1 32 30 31.1 30 30V24.5C32.5 22.6 34 19.5 34 16C34 10.477 29.523 6 24 6Z'
											stroke={COLORS.brandBlue}
											strokeWidth='2'
										/>
										<path
											d='M20 35H28'
											stroke={COLORS.brandBlue}
											strokeWidth='2'
											strokeLinecap='round'
										/>
										<path
											d='M22 38H26'
											stroke={COLORS.brandBlue}
											strokeWidth='2'
											strokeLinecap='round'
										/>
									</svg>
								</div>

								<p
									className='text-sm sm:text-base text-center leading-relaxed'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.textGray800,
									}}
								>
									Our vision is to be the go-to partner for
									businesses that want to take their workspace
									game to the next level — creating offices
									that are hubs of creativity, collaboration,
									and community.
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
