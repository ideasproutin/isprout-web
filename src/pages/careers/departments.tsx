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
		<section className='px-4 lg:px-16 py-12 lg:py-20 bg-white'>
			<div className='max-w-[1280px] mx-auto'>
				{/* Section Header with Yellow Background */}
				<div className='flex justify-center mb-12 lg:mb-16'>
					<div className='relative'>
						{/* Yellow pill shape with custom border radius */}
						<div
							className='rounded-tl-[50px] rounded-br-[50px] px-8 lg:px-12 py-5 lg:py-6'
							style={{
								backgroundColor: "#FFDE00",
								boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
							}}
						>
							<h2
								className='text-2xl sm:text-3xl lg:text-4xl text-black text-center capitalize whitespace-nowrap'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								Departments hiring at{" "}
								<span className='font-medium'>iSprout</span>
							</h2>
						</div>
					</div>
				</div>

				{/* Job Cards Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
					{jobs.map((job, index) => (
						<div
							key={index}
							className='rounded-[20px] p-6 flex flex-col justify-between hover:shadow-xl hover:scale-105 transition-all duration-300'
							style={{
								backgroundColor: "rgba(217,217,217,0.32)",
								boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
							}}
						>
							<div>
								<h3
									className='font-semibold text-black text-base lg:text-lg mb-2 capitalize min-h-[3rem]'
									style={{
										fontFamily: "Poppins, sans-serif",
									}}
								>
									{job.title}
								</h3>
								<p
									className='text-black capitalize mb-6'
									style={{
										fontFamily: "Poppins, sans-serif",
									}}
								>
									openings {job.openings}
								</p>
							</div>

							{/* Apply Button */}
							<button
								className='text-white rounded-[10px] py-2 px-4 font-semibold capitalize w-full shadow-sm transition-colors'
								style={{
									backgroundColor: "rgba(32,71,88,0.79)",
									fontFamily: "Poppins, sans-serif",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor =
										"#204758";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor =
										"rgba(32,71,88,0.79)";
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
