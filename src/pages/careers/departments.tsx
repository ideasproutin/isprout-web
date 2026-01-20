import { COLORS } from "../../helpers/constants/Colors";

const Departments = () => {
	const jobs = [
		{
			title: "Software Developer",
			openings: 2,
		},
		{
			title: "Real Estate Manager",
			openings: 1,
		},
		{
			title: "Digital Marketing",
			openings: 2,
		},
		{
			title: "Sales / Operations",
			openings: 2,
		},
	];

	return (
		<section
			className='px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-20'
			style={{ backgroundColor: COLORS.white }}
		>
			<div className='max-w-7xl mx-auto'>
				{/* Section Header with Yellow Background */}
				<div className='flex justify-center mb-8 sm:mb-10 md:mb-12 lg:mb-16'>
					<div className='relative'>
						{/* Yellow pill shape with custom border radius */}
						<div
							className='rounded-tl-[30px] rounded-br-[30px] sm:rounded-tl-[40px] sm:rounded-br-[40px] md:rounded-tl-[50px] md:rounded-br-[50px] px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6'
							style={{
								backgroundColor: COLORS.brandYellow,
								boxShadow: COLORS.shadowColor,
							}}
						>
							<h2
								className='text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl text-center capitalize'
								style={{
									color: COLORS.textBlack,
									fontFamily: "Outfit, sans-serif",
								}}
							>
								Departments hiring at{" "}
								<span className='font-medium'>iSprout</span>
							</h2>
						</div>
					</div>
				</div>

				{/* Job Cards Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
					{jobs.map((job, index) => (
						<div
							key={index}
							className='rounded-[15px] sm:rounded-[20px] p-4 sm:p-5 md:p-6 flex flex-col justify-between hover:shadow-xl hover:scale-105 transition-all duration-300'
							style={{
								backgroundColor: COLORS.grayCardBg,
								boxShadow: COLORS.shadowColor,
							}}
						>
							<div>
								<h3
									className='font-semibold text-sm sm:text-base lg:text-lg mb-2 capitalize min-h-10 sm:min-h-12'
									style={{
										color: COLORS.textBlack,
										fontFamily: "Poppins, sans-serif",
									}}
								>
									{job.title}
								</h3>
								<p
									className='capitalize mb-4 sm:mb-6 text-sm sm:text-base'
									style={{
										color: COLORS.textBlack,
										fontFamily: "Poppins, sans-serif",
									}}
								>
									openings {job.openings}
								</p>
							</div>

							{/* Apply Button */}
							<button
								className='text-white rounded-[8px] sm:rounded-[10px] py-2 px-3 sm:px-4 text-sm sm:text-base font-semibold capitalize w-full shadow-sm transition-colors'
								style={{
									backgroundColor: COLORS.brandBlueAlpha,
									fontFamily: "Poppins, sans-serif",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor =
										COLORS.brandBlue;
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor =
										COLORS.brandBlueAlpha;
								}}
							>
								Apply Here
							</button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Departments;
