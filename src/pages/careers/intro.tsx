import careersHeroVideo from "../../assets/careers/hero-video.mp4";
import Footer from "../../components/footer/footer";
import Jobs from "./jobs";
import InfoStrip from "./info-strip";
import LifeAtISprout from "./lifeatisprout";
import { COLORS } from "../../helpers/constants/Colors";

const CareersIntro = () => {
	return (
		<div className='min-h-screen' style={{ backgroundColor: COLORS.white }}>
			{/* Hero Section with Video */}
			<section className='relative w-full h-[85vh] flex items-center justify-end overflow-hidden'>
				{/* Video Background */}
				<div className='absolute inset-0 w-full h-full'>
					<video
						autoPlay
						loop
						muted
						playsInline
						className='absolute inset-0 w-full h-full object-cover object-center'
					>
						<source src={careersHeroVideo} type='video/mp4' />
						Your browser does not support the video tag.
					</video>
				</div>

				{/* Dark Overlay */}
				<div className='absolute inset-0 bg-black opacity-30'></div>
				{/* Bottom Left Title */}
				<div className='absolute bottom-8 sm:bottom-12 md:bottom-16 left-6 sm:left-8 md:left-12 lg:left-16 z-10'>
					<h1
						className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal'
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						Careers At iSprout
					</h1>
				</div>
				{/* Hero Text - Right Side */}
				<div className='relative z-10 max-w-2xl px-6 sm:px-8 md:px-12 lg:px-16 py-8'>
					<div className='mb-8 sm:mb-12'>
						<h1
							className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase leading-tight mb-6 sm:mb-8'
							style={{ fontFamily: "Outfit, sans-serif" }}
						>
							<div className='mb-2 text-white'>COME BUILD</div>
							<div
								className='mb-2'
								style={{
									fontFamily: "Otomanopee One, sans-serif",
									color: "#FFDE00",
								}}
							>
								FUTURE
							</div>
							<div className='text-white'>WITH US!</div>
						</h1>
					</div>

					<div className='space-y-4'>
						<p
							className='text-base sm:text-lg md:text-xl text-white leading-relaxed'
							style={{ fontFamily: "Outfit, sans-serif" }}
						>
							We are team iSprout. we're a bunch of dreamers and
							doers who believe that workspaces should be anything
							but not boring. We're on a mission to create offices
							that people actually look forward to come to every
							day.
						</p>
					</div>
				</div>
			</section>

			{/* Info Strip - Stats Section */}
			<InfoStrip />

			{/* Jobs Section */}
			<section className='px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16'>
				<div className='max-w-7xl mx-auto'>
					<Jobs />
				</div>
			</section>

			{/* Life At iSprout Section */}
			<LifeAtISprout />

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default CareersIntro;
