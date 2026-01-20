import careersHeroImage from "../../assets/careers/careers_herosection.png";
import isproutLogo from "../../assets/careers/isprout_logo.png";
import Footer from "../../components/footer/footer";
import Overview from "./overview";
import { COLORS } from "../../helpers/constants/Colors";

const CareersIntro = () => {
	return (
		<div className='min-h-screen' style={{ backgroundColor: COLORS.white }}>
			{/* Hero Section */}
			<section className='relative px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-20 overflow-hidden'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center'>
						{/* Hero Image with Yellow Circle */}
						<div className='relative flex justify-center lg:justify-start order-2 lg:order-1'>
							<div className='relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px]'>
								{/* Yellow Circle Background */}
								<div
									className='absolute -left-4 sm:-left-6 md:-left-8 lg:-left-16 top-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[320px] sm:h-80 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] rounded-full shadow-lg'
									style={{
										backgroundColor: COLORS.brandYellow,
									}}
								/>

								{/* Hero Image */}
								<div className='relative z-10 w-[230px] h-[230px] sm:w-[280px] sm:h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] mx-auto'>
									<img
										src={careersHeroImage}
										alt='Career at iSprout'
										className='w-full h-full object-cover rounded-full'
									/>
								</div>

								{/* Small Blue Dot Accent */}
								<div
									className='absolute right-4 sm:right-6 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-10 md:h-10 lg:w-[54px] lg:h-[54px] border-2 lg:border-[3px] border-white rounded-full'
									style={{
										backgroundColor: COLORS.brandBlue,
									}}
								/>
							</div>
						</div>

						{/* Hero Text */}
						<div className='text-center lg:text-left order-1 lg:order-2 px-2'>
							<h1
								className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase leading-tight'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								<div className='mb-2'>COME BUILD</div>
								<div
									className='mb-2'
									style={{
										fontFamily:
											"Otomanopee One, sans-serif",
										color: "#FFDE00",
									}}
								>
									FUTURE
								</div>
								<div>WITH US!</div>
							</h1>
						</div>
					</div>
				</div>
			</section>

			{/* iSprout Job Board Section */}
			<section
				className='px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16'
				style={{ backgroundColor: COLORS.white }}
			>
				<div className='max-w-7xl mx-auto'>
					<div className='flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 justify-center'>
						{/* Left - iSprout Logo Card */}
						<div className='relative w-40 h-40 sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px]'>
							<div
								className='w-full h-full rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col items-center justify-center'
								style={{ backgroundColor: COLORS.lightCream }}
							>
								<img
									src={isproutLogo}
									alt='iSprout Logo'
									className='w-full h-full object-contain'
								/>
							</div>
						</div>

						{/* Right - Job Categories */}
						<div className='flex flex-col gap-4 w-full lg:w-auto'>
							<div className='grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3'>
								{[
									"Tech",
									"Digital Marketing",
									"Sales",
									"HR",
									"Operations",
									"Real Estate Manager",
								].map((category, index) => (
									<div
										key={index}
										className='px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full text-center text-sm sm:text-base font-semibold cursor-pointer transition-all'
										style={{
											backgroundColor: COLORS.lightGrayBg,
											fontFamily: "Outfit, sans-serif",
											color: COLORS.darkGray,
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.backgroundColor =
												COLORS.brandYellow;
											e.currentTarget.style.color =
												COLORS.brandBlue;
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.backgroundColor =
												COLORS.lightGrayBg;
											e.currentTarget.style.color =
												COLORS.darkGray;
										}}
									>
										{category}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Company Info Overview Section */}
			<Overview />

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default CareersIntro;
