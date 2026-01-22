import { COLORS } from "../../helpers/constants/Colors";

const InfoStrip = () => {
	const stats = [
		{ number: "9", label: "Cities" },
		{ number: "26", label: "Centres" },
		{ number: "350+", label: "Clients" },
		{ number: "39k+", label: "Workstations" },
	];

	return (
		<section
			className='w-full py-4 sm:py-6 md:py-8'
			style={{ backgroundColor: COLORS.brandBlue }}
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16'>
				<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
					{stats.map((stat, index) => (
						<div key={index} className='text-center'>
							<h2
								className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								{stat.number}
							</h2>
							<p
								className='text-base sm:text-lg md:text-xl text-white font-normal'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								{stat.label}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default InfoStrip;
